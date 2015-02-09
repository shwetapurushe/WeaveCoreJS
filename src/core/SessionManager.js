if (!this.weavecore)
    this.weavecore = {};

(function() {
    function SessionManager(){
        this.childToParentMap = new Map();
        this.parentToChildMap = new Map();
        this.ownerToChildMap =  new Map();
        this.childToOwnerMap =  new Map();

        this.linkableObjectToCallbackCollectionMap = new Map();
        this.debugBusyTasks = false;
        
       
        
        Object.defineProperty(this,"_disposedObjectsMap", {value:new Map()});

        Object.defineProperty(this,"_treeCallbacks", {value:new weavecore.CallbackCollection()});
}
    
      
    SessionManager.prototype.registerLinkableChild = function(linkableParent,linkableChild,callback,useGroupedCallback){
        //set default values for parameters
        if(useGroupedCallback === undefined)
            useGroupedCallback = false;
        if(!linkableParent instanceof weavecore.ILinkableObject){
            console.log("registerLinkableChild(): Parent does not inherit ILinkableObject.");
            return;
        }
            
        if(!linkableChild instanceof weavecore.ILinkableObject){
            console.log("registerLinkableChild(): child does not inherit ILinkableObject.");
            return;
        }
            
        if (callback !== null && callback !== undefined)
        {
            var cc = this.getCallbackCollection.call(this,linkableChild);	
            if(useGroupedCallback)
                cc.addGroupedCallback(linkableParent,callback);
            else
                cc.addImmediateCallback(linkableParent, callback);
        }
			
        // if the child doesn't have an owner yet, this parent is the owner of the child
        // and the child should be disposed when the parent is disposed.
        // registerDisposableChild() also initializes the required Dictionaries.
        this.registerDisposableChild(linkableParent, linkableChild);
        
        if (this.childToParentMap.get(linkableChild).get(linkableParent) === undefined){
            // remember this child-parent relationship
            this.childToParentMap.get(linkableChild).set(linkableParent,true);
            this.parentToChildMap.get(linkableParent).set(linkableChild,true);

            // make child changes trigger parent callbacks
            var parentCC = this.getCallbackCollection(linkableParent);
            // set alwaysCallLast=true for triggering parent callbacks, so parent will be triggered after all the other child callbacks
            this.getCallbackCollection(linkableChild).addImmediateCallback(linkableParent,parentCC.triggerCallbacks.bind(parentCC),false); // parent-child relationship
        } 
        
        this._treeCallbacks.triggerCallbacks();
        
        return linkableChild;
    }
    
    SessionManager.prototype.registerDisposableChild = function(disposableParent, disposableChild){
        if (this.ownerToChildMap.get(disposableParent) === undefined){
            this.ownerToChildMap.set(disposableParent, new Map()); 
            this.parentToChildMap.set(disposableParent, new Map()); 
        }
        // if this child has no owner yet...
        if (this.childToOwnerMap.get(disposableChild) === undefined){
            // make this first parent the owner
            this.childToOwnerMap.set(disposableChild, disposableParent);
            this.ownerToChildMap.get(disposableParent).set(disposableChild,true);
            // initialize the parent dictionary for this child
            this.childToParentMap.set(disposableChild,new Map()); 
        }
        return disposableChild;
    }
     
    SessionManager.prototype.unregisterLinkableChild = function(parent,child){
        if (this.childToParentMap.get(child))
				this.childToParentMap.get(child).delete(parent);
        if (this.parentToChildMap.get(parent))
            this.parentToChildMap(parent).delete(child);
        this.getCallbackCollection(child).removeCallback(this.getCallbackCollection(parent).triggerCallbacks.bind(parent));
        
        this._treeCallbacks.triggerCallbacks();
    }
    
    SessionManager.prototype.excludeLinkableChildFromSessionState = function(parent,child){
        if(parent === null || child === null || parent === undefined || child === undefined){
            console.log("SessionManager.excludeLinkableChildFromSessionState(): Parameters cannot be null.");
            return;
        }
        if(this.childToParentMap.get(child) !== undefined && this.childToParentMap.get(child).get(parent))
            this.childToParentMap.get(child).set(parent,false);
        if(this.parentToChildMap.get(parent) !== undefined && this.parentToChildMap.get(parent).get(child))
            this.parentToChildMap.get(parent).set(child, false);
    }
    
    /**
     * @private
     * This function will return all the child objects that have been registered with a parent.
     * @param parent A parent object to get the registered children of.
     * @return An Array containing a list of linkable objects that have been registered as children of the specified parent.
     *         This list includes all children that have been registered, even those that do not appear in the session state.
     */
    SessionManager.prototype._getRegisteredChildren = function(parent)
    {
        var result = [];
        if (this.parentToChildMap.get(parent) !== undefined)
            for (var child in this.parentToChildMap.get(parent))
                result.push(child);
        return result;
    }
    
    
    SessionManager.prototype.getLinkableOwner = function(child){
        return this.childToOwnerMap.get(child);
    }
    
    SessionManager.prototype.getSessionStateTree = function(root,objectName,objectTypeFilter){
        var treeItem = new WeaveTreeItem();
        treeItem.label = objectName;
        treeItem.source = root;
        treeItem.children = SessionManager.prototype.getTreeItemChildren;
        treeItem.data = objectTypeFilter;
        return treeItem;
    }
    
    SessionManager.prototype.getTreeItemChildren = function(treeItem){
        var object = treeItem.source;
        var objectTypeFilter = treeItem.data;
        var children = [];
        var names = [];
        var childObject;
        var subtree;
        var ignoreList = new Map();
        if(object instanceof LinkableHashMap){
            names = object.getNames();
            var childObjects = object.getObjects();
            for(var i = 0 ; i < names.length ; i++){
                childObject = childObjects[i];
                if(this.childToParentMap.get(childObject) && this.childToParentMap.get(childObject).get(object)){
                    if(ignoreList.get(childObject) !== undefined)
                        continue;
                    ignoreList.set(childObject,true);
                    
                    subtree = this.getSessionStateTree(childObject, names[i] , objectTypeFilter);
                    if( subtree !== null && subtree !== undefined)
                        children.push(subtree);
                }
            }
        }
        else {
            var deprecatedLookup = null;
            
            console.log("Linkable dynamic object not yet supported - only Linkablehashmap")
        }
        if(children.length === 0)
            children = null;
        if(objectTypeFilter === null || objectTypeFilter === undefined)
            return children;
        if((children === null || children === undefined) && !(object instanceof objectTypeFilter))
            return null;
        return children;
    }
    
    SessionManager.prototype.addTreeCallback = function(relevantContext, groupedCallback, triggerCallbackNow){
			this._treeCallbacks.addGroupedCallback(relevantContext, groupedCallback, triggerCallbackNow);
    }
    
    
    SessionManager.prototype.removeTreeCallback = function(groupedCallback){
        this._treeCallbacks.removeCallback(groupedCallback);
    }
    
    SessionManager.prototype.copySessionState = function(source, destination){
        var sessionState = this.getSessionState(source);
        this.setSessionState(destination, sessionState, true);
    }
   
    
    SessionManager.prototype._applyDiff = function(base, diff){
        if (base === null || base === undefined|| typeof(base) !== 'object')
            return diff;

        for(var key in diff)
            base[key] = this._applyDiff(base[key], diff[key]);

        return base;
    }

    SessionManager.prototype.setSessionState =  function (linkableObject, newState, removeMissingDynamicObjects){
        if (linkableObject === null || linkableObject === undefined){
            console.log("SessionManager.setSessionState(): linkableObject cannot be null.");
            return;
        }

        // special cases:
        if (linkableObject instanceof weavecore.ILinkableObject && linkableObject.setSessionState ){
            var lv = linkableObject;
            if (removeMissingDynamicObjects === false && newState && newState.constructor.name === 'Object'){
                lv.setSessionState.call(lv,this._applyDiff.call(this,Object.create(lv.getSessionState.call(lv)), newState));
            }
            else{
                lv.setSessionState.call(lv,newState);
            }
            return;
        }
        // currently composite object not supported

        if (newState === null || newState === undefined)
            return;


    }
    
      SessionManager.prototype.getSessionState = function(linkableObject)    {
        if (linkableObject === null || linkableObject === undefined)
        {
            console.log("SessionManager.getSessionState(): linkableObject cannot be null.");
            return null;
        }

        var result = null;

        // special cases (explicit session state)
        if (linkableObject instanceof weavecore.ILinkableObject || linkableObject.getSessionState)
        {
            result = linkableObject.getSessionState();
        }
        
        // currently composite sessioned object sessionstate getting is not added

        return result;
    }
      
      SessionManager.prototype.getCallbackCollection = function(linkableObject){
          
          if (linkableObject === null)
				return null;
       if( linkableObject instanceof weavecore.CallbackCollection)
           return linkableObject;
        
        var objectCC = this.linkableObjectToCallbackCollectionMap.get(linkableObject);
        if(objectCC === null || objectCC === undefined){
            objectCC = this.registerDisposableChild(linkableObject, new weavecore.CallbackCollection());
            if (weavecore.CallbackCollection.debug)
					objectCC._linkableObject = linkableObject;
            this.linkableObjectToCallbackCollectionMap.set(linkableObject , objectCC);
        }        
        
        return objectCC;
    }
    
    
    /**
     * @inheritDoc
     */
    SessionManager.prototype.objectWasDisposed = function (object)
    {
        if (object === null || object === undefined)
            return false;
        if (object instanceof weavecore.ILinkableObject)
        {
            var cc = this.getCallbackCollection(object);
            if (cc)
                return cc.wasDisposed;
        }
        return this._disposedObjectsMap.get(object) !== undefined;
    }

    
		
		
    /**
     * @inheritDoc
     */
    SessionManager.prototype.disposeObject = function (object)
    {
        if (object !== null && object !== undefined && !this._disposedObjectsMap.get(object))
        {
            this._disposedObjectsMap.set(object, true);

            // clean up pointers to busy tasks
            //disposeBusyTaskPointers(object as ILinkableObject);

            try
            {
                // if the object implements IDisposableObject, call its dispose() function now
                //if (object instanceof IDisposableObject)
            //	{
                //	object.dispose();
            //	}
                 if (object.hasOwnProperty("dispose"))
                {
                    // call dispose() anyway if it exists, because it is common to forget to implement IDisposableObject.
                    object["dispose"]();
                }
            }
            catch (e)
            {
                console.log(e);
            }

            var linkableObject = object;
            if (linkableObject)
            {
                // dispose the callback collection corresponding to the object.
                // this removes all callbacks, including the one that triggers parent callbacks.
                var objectCC = this.getCallbackCollection(linkableObject);
                if (objectCC !== linkableObject)
                    this.disposeObject(objectCC);
            }

            // unregister from parents
            if (this.childToParentMap.get(object) !== undefined)
            {
                // remove the parent-to-child mappings
                for (var parent in this.childToParentMap.get(object))
                    if (this.parentToChildMap(parent) !== undefined)
                        this.parentToChildMap.get(parent).delete(object);
                // remove child-to-parent mapping
                 this.childToParentMap.delete(object);
            }

            // unregister from owner
            var owner = this.childToOwnerMap.get(object);
            if (owner !== null || owner !== undefined)
            {
                if (this.ownerToChildMap.get(owner) !== undefined)
                    this.ownerToChildMap.get(owner).delete(object);
                this.childToOwnerMap.delete(object);
            }

            // if the object is an ILinkableVariable, unlink it from all bindable properties that were previously linked
            //if (linkableObject instanceof LinkableVariable)
                //for (var bindableParent:* in _watcherMap[linkableObject])
                    //for (var bindablePropertyName:String in _watcherMap[linkableObject][bindableParent])
                        //unlinkBindableProperty(linkableObject as ILinkableVariable, bindableParent, bindablePropertyName);

            // unlink this object from all other linkable objects
            //for (var otherObject in linkFunctionCache.dictionary[linkableObject])
                //unlinkSessionState(linkableObject, otherObject as ILinkableObject);

            // dispose all registered children that this object owns
            var children = this.ownerToChildMap.get(object) ;
            if (children !== null && children !== undefined)
            {
                // clear the pointers to the child dictionaries for this object
                this.ownerToChildMap.delete(object);
                this.parentToChildMap.delete(object);
                // dispose the children this object owned
                for (var child in children)
                    this.disposeObject(child);
            }

            this._treeCallbacks.triggerCallbacks();
        }
    }
    
   
    
    SessionManager.prototype.computeDiff = function(oldState, newState){
        var type = typeof(oldState); // the type of null is 'object'
        var diffValue;

        // special case if types differ
        if (typeof(newState) !== type)
            return newState;


        if (type === 'number')
        {
            if (isNaN(oldState) && isNaN(newState))
                return undefined; // no diff

            if (oldState !== newState)
                return newState;

            return undefined; // no diff
        }
        else if (oldState === null || oldState === undefined || newState === null || newState === undefined || type !== 'object') // other primitive value
        {
            if (oldState !== newState) // no type-casting
                return newState;

            return undefined; // no diff
        }
        else if (Array.isArray(oldState) && Array.isArray(newState))
        {
            // If neither is a dynamic state array, don't compare them as such.
            if (!weavecore.DynamicState.isDynamicStateArray(oldState) && !weavecore.DynamicState.isDynamicStateArray(newState))
            {
                if (weavecore.StandardLib.compare(oldState, newState) === 0)
                    return undefined; // no diff
                return newState;
            }

            // create an array of new DynamicState objects for all new names followed by missing old names
            var i;
            var typedState;
            var changeDetected = false;

            // create oldLookup
            var oldLookup = {};
            var objectName;
            var className;
            var sessionState;
            for (i = 0; i < oldState.length; i++)
            {
                // assume everthing is typed session state
                //note: there is no error checking here for typedState
                typedState = oldState[i];
                objectName = typedState[weavecore.DynamicState.OBJECT_NAME];
                // use '' instead of null to avoid "null"
                oldLookup[objectName || ''] = typedState;
            }
            if (oldState.length !== newState.length)
                changeDetected = true;

            // create new Array with new DynamicState objects
            var result = [];
            for (i = 0; i < newState.length; i++)
            {
                // assume everthing is typed session state
                //note: there is no error checking here for typedState
                typedState = newState[i];
                objectName = typedState[weavecore.DynamicState.OBJECT_NAME];
                className = typedState[weavecore.DynamicState.CLASS_NAME];
                sessionState = typedState[weavecore.DynamicState.SESSION_STATE];
                var oldTypedState = oldLookup[objectName || ''];
                delete oldLookup[objectName || '']; // remove it from the lookup because it's already been handled

                // If the object specified in newState does not exist in oldState, we don't need to do anything further.
                // If the class is the same as before, then we can save a diff instead of the entire session state.
                // If the class changed, we can't save only a diff -- we need to keep the entire session state.
                // Replace the sessionState in the new DynamicState object with the diff.
                if (oldTypedState !== undefined && oldTypedState[weavecore.DynamicState.CLASS_NAME] === className)
                {
                    className = null; // no change
                    diffValue = this.computeDiff(oldTypedState[weavecore.DynamicState.SESSION_STATE], sessionState);
                    if (diffValue === undefined)
                    {
                        // Since the class name is the same and the session state is the same,
                        // we only need to specify that this name is still present.
                        result.push(objectName);

                        if (!changeDetected && oldState[i][weavecore.DynamicState.OBJECT_NAME] != objectName)
                            changeDetected = true;

                        continue;
                    }
                    sessionState = diffValue;
                }

                // save in new array and remove from lookup
                result.push(weavecore.DynamicState.create(objectName || null, className, sessionState)); // convert empty string to null
                changeDetected = true;
            }

            // Anything remaining in the lookup does not appear in newState.
            // Add DynamicState entries with an invalid className ("delete") to convey that each of these objects should be removed.
            for (objectName in oldLookup)
            {
                result.push(weavecore.DynamicState.create(objectName || null, SessionManager.DIFF_DELETE)); // convert empty string to null
                changeDetected = true;
            }

            if (changeDetected)
                return result;

            return undefined; // no diff
        }
        else // nested object
        {
            var diff = undefined; // start with no diff

            // find old properties that changed value
            for (var oldName in oldState)
            {
                diffValue = computeDiff(oldState[oldName], newState[oldName]);
                if (diffValue !== undefined)
                {
                    if (!diff)
                        diff = {};
                    diff[oldName] = diffValue;
                }
            }

            // find new properties
            for (var newName in newState)
            {
                if (oldState[newName] === undefined)
                {
                    if (!diff)
                        diff = {};
                    diff[newName] = newState[newName]; // TODO: same object pointer.. potential problem?
                }
            }

            return diff;
        }
    }
    
    
    SessionManager.prototype.combineDiff = function (baseDiff, diffToAdd){
        var baseType = typeof(baseDiff); // the type of null is 'object'
        var diffType = typeof(diffToAdd);

        // special cases
        if (baseDiff === null || baseDiff === undefined || diffToAdd === null || diffToAdd === undefined || baseType !== diffType || baseType !== 'object')
        {
            if (diffType === 'object') // not a primitive, so make a copy
                baseDiff = Object.create(diffToAdd);
            else
                baseDiff = diffToAdd;
        }
        else if (Array.isArray(baseDiff) && Array.isArray(diffToAdd))
        {
            var i;

            // If either of the arrays look like DynamicState arrays, treat as such
            if (weavecore.DynamicState.isDynamicStateArray(baseDiff) || weavecore.DynamicState.isDynamicStateArray(diffToAdd))
            {
                var typedState;
                var objectName;

                // create lookup: objectName -> old diff entry
                // temporarily turn baseDiff into an Array of object names
                var baseLookup = {};
                for (i = 0; i < baseDiff.length; i++)
                {
                    typedState = baseDiff[i];
                    // note: no error checking for typedState
                    if (typeof typedState === 'string' || typedState instanceof String || typedState === null || typedState === undefined)
                        objectName = typedState;
                    else
                        objectName = typedState[weavecore.DynamicState.OBJECT_NAME] ;
                    baseLookup[objectName] = typedState;
                    // temporarily turn baseDiff into an Array of object names
                    baseDiff[i] = objectName;
                }
                // apply each typedState diff appearing in diffToAdd
                for (i = 0; i < diffToAdd.length; i++)
                {
                    typedState = diffToAdd[i];
                    // note: no error checking for typedState
                    if (typeof typedState === 'string' || typedState instanceof String || typedState === null || typedState === undefined) 
                        objectName = typedState ;
                    else
                        objectName = typedState[weavecore.DynamicState.OBJECT_NAME];

                    // adjust names list so this name appears at the end
                    if (baseLookup.hasOwnProperty(objectName))
                    {
                        for (var j = baseDiff.indexOf(objectName); j < baseDiff.length - 1; j++)
                            baseDiff[j] = baseDiff[j + 1];
                        baseDiff[baseDiff.length - 1] = objectName;
                    }
                    else
                    {
                        baseDiff.push(objectName);
                    }

                    // apply diff
                    var oldTypedState = baseLookup[objectName];
                    if (typeof oldTypedState === 'string' || oldTypedState instanceof String  || oldTypedState === null || oldTypedState === undefined)
                    {
                        if (typeof typedState === 'string' || typedState instanceof String  || typedState === null || typedState === undefined)
                            baseLookup[objectName] = typedState; // avoid unnecessary function call overhead
                        else
                            baseLookup[objectName] = Object.create(typedState);
                    }
                    else if (!(typeof typedState === 'string' || typedState instanceof String || typedState === null || typedState === undefined)) // update dynamic state
                    {
                        var className = typedState[weavecore.DynamicState.CLASS_NAME];
                        // if new className is different and not null, start with a fresh typedState diff
                        if (className && className != oldTypedState[weavecore.DynamicState.CLASS_NAME])
                        {
                            baseLookup[objectName] = Object.create(typedState);
                        }
                        else // className hasn't changed, so combine the diffs
                        {
                            oldTypedState[weavecore.DynamicState.SESSION_STATE] = this.combineDiff(oldTypedState[weavecore.DynamicState.SESSION_STATE], typedState[weavecore.DynamicState.SESSION_STATE]);
                        }
                    }
                }
                // change baseDiff back from names to typed states
                for (i = 0; i < baseDiff.length; i++)
                    baseDiff[i] = baseLookup[baseDiff[i]];
            }
            else // not typed session state
            {
                // overwrite old Array with new Array's values
                i = baseDiff.length = diffToAdd.length;
                while (i--)
                {
                    var value = diffToAdd[i];
                    if (value === null || value === undefined || typeof value !== 'object')
                        baseDiff[i] = value; // avoid function call overhead
                    else
                        baseDiff[i] = this.combineDiff(baseDiff[i], value);
                }
            }
        }
        else // nested object
        {
            for (var newName in diffToAdd)
                baseDiff[newName] = this.combineDiff(baseDiff[newName], diffToAdd[newName]);
        }

        return baseDiff;
    }

Object.defineProperty(SessionManager,'DIFF_DELETE',{value:"delete"});
	
weavecore.SessionManager = SessionManager;
    
}());
