if (typeof window === 'undefined') {
    this.weavecore = this.weavecore || {};
} else {
    window.weavecore = window.weavecore || {};
}

/**
 * This is a LinkableVariable which limits its session state to string values.
 * @author adufilie
 * @author sanjay1909
 */
(function () {
    /**
     * temporary solution to save the namespace for this class/prototype
     * @static
     * @public
     * @property NS
     * @default weavecore
     * @readOnly
     * @type String
     */
    Object.defineProperty(LinkableString, 'NS', {
        value: 'weavecore'
    });

    /**
     * TO-DO:temporary solution to save the CLASS_NAME constructor.name works for window object , but modular based won't work
     * @static
     * @public
     * @property CLASS_NAME
     * @readOnly
     * @type String
     */
    Object.defineProperty(LinkableString, 'CLASS_NAME', {
        value: 'LinkableString'
    });

    function LinkableString(defaultValue, verifier, defaultValueTriggersCallbacks) {
        // set default values for Parameters

        if (defaultValue === undefined) defaultValue = null;
        if (verifier === undefined) verifier = null;
        if (defaultValueTriggersCallbacks === undefined) defaultValueTriggersCallbacks = true;


        weavecore.LinkableVariable.call(this, "string", verifier, arguments.length ? defaultValue : undefined, defaultValueTriggersCallbacks);

        Object.defineProperty(this, 'value', {
            get: function () {
                return this._sessionStateExternal;
            },
            set: function (val) {
                this.setSessionState(val);
            }
        });
        /**
         * temporary solution to save the namespace for this class/prototype
         * @public
         * @property ns
         * @readOnly
         * @type String
         */
        Object.defineProperty(this, 'ns', {
            value: 'weavecore'
        });

        /**
         * temporary solution to save the className for this class/prototype
         * @public
         * @property className
         * @readOnly
         * @type String
         */
        Object.defineProperty(this, 'className', {
            value: 'LinkableString'
        });
    }

    LinkableString.prototype = new weavecore.LinkableVariable();
    LinkableString.prototype.constructor = LinkableString;

    var p = LinkableString.prototype;

    p.setSessionState = function (val) {
        if (val !== null)
            val = String(val);
        weavecore.LinkableVariable.prototype.setSessionState.call(this, val);
    };

    weavecore.LinkableString = LinkableString;

}());
