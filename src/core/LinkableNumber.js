if (!this.weavecore)
    this.weavecore = {};

(function() {
    function LinkableNumber(defaultValue,verifier, defaultValueTriggersCallbacks ){ 
        
    weavecore.LinkableVariable.call(this,"number",verifier,arguments.length ? defaultValue : undefined, defaultValueTriggersCallbacks );     
    
      
}
    LinkableNumber.prototype = new weavecore.LinkableVariable();
LinkableNumber.prototype.constructor = LinkableNumber;
    
     LinkableNumber.prototype.__defineGetter__("value", function(){
        return this._sessionStateExternal;
    });
     LinkableNumber.prototype.__defineSetter__("value", function(val){
        this.setSessionState(val);        
    });
    
     LinkableNumber.prototype.setSessionState = function(val){
        if(typeof(val) != "number"){
            if(val === null || val === '' || val === undefined) val = NaN;
            else val = Number(val);        
        }
        weavecore.LinkableVariable.prototype.setSessionState.call(this,val);
    }
    
     LinkableNumber.prototype.sessionStateEquals = function(otherSessionState){
        // We must check for null here because we can't set _sessionStateInternal = NaN in the constructor.
        if (this._sessionStateInternal === null || this._sessionStateInternal === undefined)
            this._sessionStateInternal = this._sessionStateExternal = NaN;
        if (isNaN(this._sessionStateInternal) && isNaN(otherSessionState))
            return true;
        return this._sessionStateInternal === otherSessionState;
    }
     
     weavecore.LinkableNumber = LinkableNumber;
    
}());