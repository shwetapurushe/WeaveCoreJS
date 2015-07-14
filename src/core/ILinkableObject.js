if (!this.weavecore)
    this.weavecore = {};

/**
 * An object that implements this empty interface has an associated CallbackCollection and session state,
 * accessible through the global functions in the WeaveAPI Object. In order for an ILinkableObject to
 * be created dynamically at runtime, it must not require any constructor parameters.
 *
 * @author adufilie
 * @author sanjay1909
 */
(function () {
    function ILinkableObject() {}

    weavecore.ILinkableObject = ILinkableObject;

}());
