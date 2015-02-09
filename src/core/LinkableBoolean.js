if (!this.weavecore)
    this.weavecore = {};

(function() {
    function LinkableBoolean(defaultValue,verifier, defaultValueTriggersCallbacks ){    
    
        weavecore.LinkableVariable.call(this,"boolean",verifier,defaultValue,     defaultValueTriggersCallbacks );
    }
    
    LinkableBoolean.prototype = new weavecore.LinkableVariable();
LinkableBoolean.prototype.constructor = LinkableBoolean;
    
    LinkableBoolean.prototype.__defineGetter__("value", function(){
        return this._sessionStateExternal;
    });
    LinkableBoolean.prototype.__defineSetter__("value", function(val){
        this.setSessionState(val);        
    });
    
    LinkableBoolean.prototype.setSessionState = function(val){
        if(typeof(val) === "string"){
            console.log('value came as string, instead of boolean')
           // if(val == null || val === '') val = NaN;
           // else val = Number(val);        
        }
        weavecore.LinkableVariable.prototype.setSessionState.call(this, val ? true : false);
    }
    
    weavecore.LinkableBoolean = LinkableBoolean;
    
}());