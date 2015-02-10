/*
    Weave (Web-based Analysis and Visualization Environment)
    Copyright (C) 2008-2011 University of Massachusetts Lowell
    This file is a part of Weave.
    Weave is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License, Version 3,
    as published by the Free Software Foundation.
    Weave is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with Weave.  If not, see <http://www.gnu.org/licenses/>.
*/

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
