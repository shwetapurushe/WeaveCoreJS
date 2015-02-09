// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.core)
    this.weave.core = {};*/

if(!this.weavecore)
    this.weavecore = {};
/**
 * Dynamic state objects have three properties: objectName, className, sessionState
 *
 * @author adufilie
 * @author sanjay1909
 */
(function() {
    // constructor
    function DynamicState() {

    }

    // Static Public Const Properties
    /**
     * The name of the property containing the name assigned to the object when the session state is generated.
     */
    Object.defineProperty(DynamicState, 'OBJECT_NAME', {
            value: "objectName"
        });

    /**
     * The name of the property containing the qualified class name of the original object providing the session state.
     */
    Object.defineProperty(DynamicState, 'CLASS_NAME', {
            value: "className"
        });

    /**
     * The name of the property containing the session state for an object of the type specified by className.
     */
    Object.defineProperty(DynamicState, 'SESSION_STATE', {
            value: "sessionState"
        });

    //static Public Methods
    /**
     * Creates an Object having three properties: objectName, className, sessionState
     * @param objectName The name assigned to the object when the session state is generated.
     * @param className The qualified class name of the original object providing the session state.
     * @param sessionState The session state for an object of the type specified by className.
     */
    DynamicState.create = function(objectName, className, sessionState) {
        var obj = {};
        // convert empty strings ("") to null
        obj[DynamicState.OBJECT_NAME] = objectName || null;
        obj[DynamicState.CLASS_NAME] = className || null;
        obj[DynamicState.SESSION_STATE] = sessionState;
        return obj;
    };

    /**
     * This function can be used to detect dynamic state objects within nested, untyped session state objects.
     * This function will check if the given object has the three properties of a dynamic state object.
     * @param object An object to check.
     * @return true if the object has all three properties and no extras.
     */
    DynamicState.isDynamicState = function(object) {
        var matchCount = 0;
        for (var name in object) {
            if (name === DynamicState.OBJECT_NAME || name === DynamicState.CLASS_NAME || name === DynamicState.SESSION_STATE)
                matchCount++;
            else
                return false;
        }
        return (matchCount == 3); // must match all three properties with no extras
    };

    /**
     * This function checks whether or not a session state is an Array containing at least one
     * object that looks like a DynamicState and has no other non-String items.
     * @return A value of true if the Array looks like a dynamic session state or diff.
     */
    DynamicState.isDynamicStateArray = function(state) {
        if (!Array.isArray(state))
            return false;
        var result = false;
        for (var i = 0; i < state.length; i++) {
            var item = state[i];
            if (typeof item == 'string' || item instanceof String)
                continue; // dynamic state diffs can contain String values.
            if (DynamicState.isDynamicState(item))
                result = true;
            else
                return false;
        }
        return result;
    };

    //weave.core.DynamicState = DynamicState;
    weavecore.DynamicState = DynamicState;

}());