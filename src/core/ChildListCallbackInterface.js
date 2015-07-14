if (!this.weavecore)
    this.weavecore = {};

(function () {

    function ChildListCallbackInterface() {

        // specify the preCallback function in super() so list callback
        // variables will be set before each change callback.
        weavecore.CallbackCollection.call(this, this._setCallbackVariables);

        this._lastNameAdded = null; // returned by public getter
        this._lastObjectAdded = null; // returned by public getter
        this._lastNameRemoved = null; // returned by public getter
        this._lastObjectRemoved = null; // returned by public getter

        /**
         * This is the name of the object that was added prior to running callbacks.
         */
        Object.defineProperty(this, 'lastNameAdded', {
            get: function () {
                return this._lastNameAdded;
            }
        });

        /**
         * This is the object that was added prior to running callbacks.
         */
        Object.defineProperty(this, 'lastObjectAdded', {
            get: function () {
                return this._lastObjectAdded;
            }
        });

        /**
         * This is the name of the object that was removed prior to running callbacks.
         */
        Object.defineProperty(this, 'lastNameRemoved', {
            get: function () {
                return this._lastNameRemoved;
            }
        });

        /**
         * This is the object that was removed prior to running callbacks.
         */
        Object.defineProperty(this, 'lastObjectRemoved', {
            get: function () {
                return this._lastObjectRemoved;
            }
        });

    }

    ChildListCallbackInterface.prototype = new weavecore.CallbackCollection();
    ChildListCallbackInterface.prototype.constructor = ChildListCallbackInterface;

    var p = ChildListCallbackInterface.prototype;
    /**
     * This function will set the list callback variables:
     *     lastNameAdded, lastObjectAdded, lastNameRemoved, lastObjectRemoved, childListChanged
     * @param name This is the name of the object that was just added or removed from the hash map.
     * @param objectAdded This is the object that was just added to the hash map.
     * @param objectRemoved This is the object that was just removed from the hash map.
     */
    p._setCallbackVariables = function (name, objectAdded, objectRemoved) {
        this._lastNameAdded = objectAdded ? name : null;
        this._lastObjectAdded = objectAdded;
        this._lastNameRemoved = objectRemoved ? name : null;
        this._lastObjectRemoved = objectRemoved;
    }

    p.runCallbacks = function (name, objectAdded, objectRemoved) {
        // remember previous values
        var _name = this._lastNameAdded || this._lastNameRemoved;
        var _added = this._lastObjectAdded;
        var _removed = this._lastObjectRemoved;

        this._runCallbacksImmediately(name, objectAdded, objectRemoved);

        // restore previous values (in case an external JavaScript popup caused us to interrupt something else)
        this._setCallbackVariables.call(this, _name, _added, _removed);
    }



    weavecore.ChildListCallbackInterface = ChildListCallbackInterface;

}());
