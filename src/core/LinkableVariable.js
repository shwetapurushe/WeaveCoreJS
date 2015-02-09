// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.core)
    this.weave.core = {};*/

if (!this.weavecore)
    this.weavecore = {};

(function() {
    /**
     * If a defaultValue is specified, callbacks will be triggered in a later frame unless they have already been triggered before then.
     * This behavior is desirable because it allows the initial value to be handled by the same callbacks that handles new values.
     * @param sessionStateType The type of values accepted for this sessioned property.
     * @param verifier A function that returns true or false to verify that a value is accepted as a session state or not.  The function signature should be  function(value:*):Boolean.
     * @param defaultValue The default value for the session state.
     * @param defaultValueTriggersCallbacks Set this to false if you do not want the callbacks to be triggered one frame later after setting the default value.
     */

    function LinkableVariable(sessionStateType, verifier, defaultValue, defaultValueTriggersCallbacks) {
        if(sessionStateType === undefined)sessionStateType = null;
        if(verifier === undefined)verifier = null;
        if(defaultValueTriggersCallbacks === undefined)defaultValueTriggersCallbacks = true;
        
       // weave.core.CallbackCollection.call(this);
        weavecore.CallbackCollection.call(this);

        this._verifier = verifier;

        /**
         * This is true if the session state has been set at least once.
         */
        this._sessionStateWasSet = false;

        /**
         * This is true if the _sessionStateType is a primitive type.
         */
        this._primitiveType = false;

        /**
         * Type restriction passed in to the constructor.
         */
        this._sessionStateType = null;

        /**
         * Cannot be modified externally because it is not returned by getSessionState()
         */
        this._sessionStateInternal = undefined;

        /**
         * Available externally via getSessionState()
         */
        this._sessionStateExternal = undefined;

        this._locked = false;

        if (sessionStateType !== Object) {
            this._sessionStateType = sessionStateType;
            this._primitiveType = this._sessionStateType === "string" || this._sessionStateType === "number" || this._sessionStateType === "boolean";
        }
        if (typeof defaultValue !== "undefined") {
            this.setSessionState(defaultValue);

            // If callbacks were triggered, make sure callbacks are triggered again one frame later when
            // it is possible for other classes to have a pointer to this object and retrieve the value.
            if (defaultValueTriggersCallbacks && this._triggerCounter > weavecore.CallbackCollection.DEFAULT_TRIGGER_COUNT)
              weavecore.StageUtils.callLater(this, _defaultValueTrigger.bind(this));
        }
    }

        function _defaultValueTrigger() {
            // unless callbacks were triggered again since the default value was set, trigger callbacks now
            if (!this._wasDisposed && this._triggerCounter === weavecore.CallbackCollection.DEFAULT_TRIGGER_COUNT + 1)
                this.triggerCallbacks();

        }


        function verifyValue(value) {
            return this._verifier === null || this._verifier === undefined || this._verifier(value);
        }
    
     LinkableVariable.prototype = new weavecore.CallbackCollection();
    LinkableVariable.prototype.constructor = LinkableVariable;

        /**
         * The type restriction passed in to the constructor.
         */
        LinkableVariable.prototype.getSessionStateType = function() {
            return this._sessionStateType;
        };

        LinkableVariable.prototype.getSessionState = function() {
            return this._sessionStateExternal;
        };

        LinkableVariable.prototype.setSessionState = function(value) {
            if (this._locked)
                return;

            // cast value now in case it is not the appropriate type
            if (this._sessionStateType !== null && this._sessionStateType !== undefined)
                value = value;

            // stop if verifier says it's not an accepted value
            if (this._verifier !== null && this._verifier !== undefined && !this._verifier(value))
                return;

            var wasCopied = false;
            var type = null;
            if (value !== null && value !== undefined) {
                type = typeof(value);

                if (type === 'object' && value.constructor !== Object && value.constructor !== Array) {
                    // convert to dynamic Object prior to sessionStateEquals comparison
                    value = Object.create(value);
                    wasCopied = true;
                }
            }

            // If this is the first time we are calling setSessionState(), including
            // from the constructor, don't bother checking sessionStateEquals().
            // Otherwise, stop if the value did not change.
            if (this._sessionStateWasSet && this.sessionStateEquals(value))
                return;

            // If the value is a dynamic object, save a copy because we don't want
            // two LinkableVariables to share the same object as their session state.
            if (type === 'object') {
                if (!wasCopied)
                    value = Object.create(value);

                // save external copy, accessible via getSessionState()
                this._sessionStateExternal = value;

                // save internal copy
                this._sessionStateInternal = Object.create(value);
            } else {
                // save primitive value
                this._sessionStateExternal = this._sessionStateInternal = value;
            }

            // remember that we have set the session state at least once.
            this._sessionStateWasSet = true;

            this.triggerCallbacks();
        };

        /**
         * This function is used in setSessionState() to determine if the value has changed or not.
         * Classes that extend this class may override this function.
         */
        LinkableVariable.prototype.sessionStateEquals = function(otherSessionState) {
            if (this._primitiveType)
                return this._sessionStateInternal === otherSessionState;

            return weavecore.StandardLib.compare(this._sessionStateInternal, otherSessionState) === 0;
        };


        /**
         * This function may be called to detect change to a non-primitive session state in case it has been modified externally.
         */
        LinkableVariable.prototype.detectChanges = function() {
            if (!this.sessionStateEquals(this._sessionStateExternal))
                this.triggerCallbacks();
        };

        LinkableVariable.prototype.lock = function() {
            this._locked = true;
        };

        LinkableVariable.prototype.__defineGetter__("locked ", function() {
            return this._locked;
        });

        LinkableVariable.prototype.dispose = function() {
            weavecore.CallbackCollection.prototype.dispose.call(this);
            this.setSessionState(null);
        };
    

    //LinkableVariable.prototype = new weave.core.CallbackCollection();
    
    
  //  weave.core.LinkableVariable = LinkableVariable;
    weavecore.LinkableVariable = LinkableVariable;

}());