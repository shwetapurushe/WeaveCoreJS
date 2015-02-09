if (!this.weavecore)
    this.weavecore = {};

(function() {
    
function ChildListCallbackInterface(){
	
    // specify the preCallback function in super() so list callback
    // variables will be set before each change callback.
	weavecore.CallbackCollection.call(this,this._setCallbackVariables);
	
    this._lastNameAdded = null; // returned by public getter
    this._lastObjectAdded = null; // returned by public getter
	this._lastNameRemoved = null; // returned by public getter
	this._lastObjectRemoved = null; // returned by public getter
	
}
    
     ChildListCallbackInterface.prototype = new weavecore.CallbackCollection();
    ChildListCallbackInterface.prototype.constructor = ChildListCallbackInterface;
    
     
	ChildListCallbackInterface.prototype._setCallbackVariables = function (name, objectAdded, objectRemoved){
		this._lastNameAdded = objectAdded ? name : null;
		this._lastObjectAdded = objectAdded;
		this._lastNameRemoved = objectRemoved ? name : null;
		this._lastObjectRemoved = objectRemoved;
	}
	
	ChildListCallbackInterface.prototype.runCallbacks = function (name, objectAdded, objectRemoved){
        // remember previous values
        var _name = this._lastNameAdded || this._lastNameRemoved;
        var _added = this._lastObjectAdded;
        var _removed = this._lastObjectRemoved;

        this._runCallbacksImmediately(name, objectAdded, objectRemoved);

        // restore previous values (in case an external JavaScript popup caused us to interrupt something else)
        this._setCallbackVariables.call(this,_name, _added, _removed);
    }

	
	ChildListCallbackInterface.prototype.__defineGetter__("lastNameAdded", function(){
        return this._lastNameAdded;
    });
	
	ChildListCallbackInterface.prototype.__defineGetter__("lastObjectAdded", function(){
        return this._lastObjectAdded;
    });
	
	ChildListCallbackInterface.prototype.__defineGetter__("lastNameRemoved", function(){
        return this._lastNameRemoved;
    });
	
	ChildListCallbackInterface.prototype.__defineGetter__("lastObjectRemoved", function(){
        return this._lastObjectRemoved;
	});
    
    weavecore.ChildListCallbackInterface = ChildListCallbackInterface;
    
}());