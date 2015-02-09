if (!this.weavecore)
    this.weavecore = {};

(function() {
    function LinkableString(defaultValue,verifier, defaultValueTriggersCallbacks ){ 
        
    weavecore.LinkableVariable.call(this,"number",verifier,arguments.length ? defaultValue : undefined, defaultValueTriggersCallbacks ); 
      
}
    LinkableString.prototype = new weavecore.LinkableVariable();
    LinkableString.prototype.constructor = LinkableString;
    
    LinkableString.prototype.__defineGetter__("value", function(){
        return this._sessionStateExternal;
    });
    LinkableString.prototype.__defineSetter__("value", function(val){
        this.setSessionState(val);        
    });
    
    LinkableString.prototype.setSessionState = function(val){
        if(val !== null && val !== undefined) 
            val = String(val);   
        weavecore.LinkableVariable.prototype.setSessionState.call(this,val);
    }
     
     weavecore.LinkableString = LinkableString;
    
}());