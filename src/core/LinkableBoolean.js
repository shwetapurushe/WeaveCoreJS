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
