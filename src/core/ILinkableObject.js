/**
 * @module weavecore
 */

//namesapce
if (typeof window === 'undefined') {
    this.weavecore = this.weavecore || {};
} else {
    window.weavecore = window.weavecore || {};
}

(function () {
    "use strict";
    /**
     * temporary solution to save the namespace for this class/prototype
     * @static
     * @public
     * @property NS
     * @default weavecore
     * @readOnly
     * @type String
     */
    Object.defineProperty(ILinkableObject, 'NS', {
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
    Object.defineProperty(ILinkableObject, 'CLASS_NAME', {
        value: 'ILinkableObject'
    });

    // constructor:
    /**
     * An object that implements this empty interface has an associated CallbackCollection and session state,
     * accessible through the global functions in the WeaveAPI Object. In order for an ILinkableObject to
     * be created dynamically at runtime, it must not require any constructor parameters.
     * @class ILinkableObject
     * @constructor
     */
    function ILinkableObject() {
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
            value: 'ILinkableObject'
        });
    }

    weavecore.ILinkableObject = ILinkableObject;

}());
