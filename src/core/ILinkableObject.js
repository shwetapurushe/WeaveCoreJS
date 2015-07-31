/**
 * @module weavecore
 */

//namesapce
if (!this.weavecore)
    this.weavecore = {};

(function () {
    "use strict";

    // constructor:
    /**
     * An object that implements this empty interface has an associated CallbackCollection and session state,
     * accessible through the global functions in the WeaveAPI Object. In order for an ILinkableObject to
     * be created dynamically at runtime, it must not require any constructor parameters.
     * @class ILinkableObject
     * @constructor
     */
    function ILinkableObject() {}

    weavecore.ILinkableObject = ILinkableObject;

}());
