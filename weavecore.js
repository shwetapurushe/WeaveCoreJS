/*
* Event
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * A collection of Classes that are shared across all the CreateJS libraries.  The classes are included in the minified
 * files of each library and are available on the createsjs namespace directly.
 *
 * <h4>Example</h4>
 *
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @module CreateJS
 * @main CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

// constructor:
	/**
	 * Contains properties and methods shared by all events for use with
	 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
	 * 
	 * Note that Event objects are often reused, so you should never
	 * rely on an event object's state outside of the call stack it was received in.
	 * @class Event
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @constructor
	 **/
	function Event(type, bubbles, cancelable) {
		
	
	// public properties:
		/**
		 * The type of event.
		 * @property type
		 * @type String
		 **/
		this.type = type;
	
		/**
		 * The object that generated an event.
		 * @property target
		 * @type Object
		 * @default null
		 * @readonly
		*/
		this.target = null;
	
		/**
		 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
		 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
		 * is generated from childObj, then a listener on parentObj would receive the event with
		 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
		 * @property currentTarget
		 * @type Object
		 * @default null
		 * @readonly
		*/
		this.currentTarget = null;
	
		/**
		 * For bubbling events, this indicates the current event phase:<OL>
		 * 	<LI> capture phase: starting from the top parent to the target</LI>
		 * 	<LI> at target phase: currently being dispatched from the target</LI>
		 * 	<LI> bubbling phase: from the target to the top parent</LI>
		 * </OL>
		 * @property eventPhase
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		this.eventPhase = 0;
	
		/**
		 * Indicates whether the event will bubble through the display list.
		 * @property bubbles
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.bubbles = !!bubbles;
	
		/**
		 * Indicates whether the default behaviour of this event can be cancelled via
		 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
		 * @property cancelable
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.cancelable = !!cancelable;
	
		/**
		 * The epoch time at which this event was created.
		 * @property timeStamp
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		this.timeStamp = (new Date()).getTime();
	
		/**
		 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
		 * on this event.
		 * @property defaultPrevented
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.defaultPrevented = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
		 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
		 * @property propagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.propagationStopped = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
		 * on this event.
		 * @property immediatePropagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.immediatePropagationStopped = false;
		
		/**
		 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
		 * @property removed
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.removed = false;
	}
	var p = Event.prototype;

	/**
	 * <strong>REMOVED</strong>. Removed in favor of using `MySuperClass_constructor`.
	 * See {{#crossLink "Utility Methods/extend"}}{{/crossLink}} and {{#crossLink "Utility Methods/promote"}}{{/crossLink}}
	 * for details.
	 *
	 * There is an inheritance tutorial distributed with EaselJS in /tutorials/Inheritance.
	 *
	 * @method initialize
	 * @protected
	 * @deprecated
	 */
	// p.initialize = function() {}; // searchable for devs wondering where it is.

// public methods:
	/**
	 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method preventDefault
	 **/
	p.preventDefault = function() {
		this.defaultPrevented = this.cancelable&&true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopPropagation
	 **/
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
	 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopImmediatePropagation
	 **/
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	
	/**
	 * Causes the active listener to be removed via removeEventListener();
	 * 
	 * 		myBtn.addEventListener("click", function(evt) {
	 * 			// do stuff...
	 * 			evt.remove(); // removes this listener.
	 * 		});
	 * 
	 * @method remove
	 **/
	p.remove = function() {
		this.removed = true;
	};
	
	/**
	 * Returns a clone of the Event instance.
	 * @method clone
	 * @return {Event} a clone of the Event instance.
	 **/
	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};
	
	/**
	 * Provides a chainable shortcut method for setting a number of properties on the instance.
	 *
	 * @method set
	 * @param {Object} props A generic object containing properties to copy to the instance.
	 * @return {Event} Returns the instance the method is called on (useful for chaining calls.)
	 * @chainable
	*/
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

	createjs.Event = Event;
}());
/*
* EventDispatcher
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor:
	/**
	 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
	 *
	 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
	 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
	 * 
	 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
	 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
	 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
	 * 
	 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
	 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The 
	 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
	 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
	 * 
	 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
	 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also 
	 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
	 *
	 * <h4>Example</h4>
	 * Add EventDispatcher capabilities to the "MyClass" class.
	 *
	 *      EventDispatcher.initialize(MyClass.prototype);
	 *
	 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
	 *
	 *      instance.addEventListener("eventName", handlerMethod);
	 *      function handlerMethod(event) {
	 *          console.log(event.target + " Was Clicked");
	 *      }
	 *
	 * <b>Maintaining proper scope</b><br />
	 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
	 * method to subscribe to events simplifies this.
	 *
	 *      instance.addEventListener("click", function(event) {
	 *          console.log(instance == this); // false, scope is ambiguous.
	 *      });
	 *      
	 *      instance.on("click", function(event) {
	 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
	 *      });
	 * 
	 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage scope.
	 *      
	 *
	 * @class EventDispatcher
	 * @constructor
	 **/
	function EventDispatcher() {
	
	
	// private properties:
		/**
		 * @protected
		 * @property _listeners
		 * @type Object
		 **/
		this._listeners = null;
		
		/**
		 * @protected
		 * @property _captureListeners
		 * @type Object
		 **/
		this._captureListeners = null;
	}
	var p = EventDispatcher.prototype;

	/**
	 * <strong>REMOVED</strong>. Removed in favor of using `MySuperClass_constructor`.
	 * See {{#crossLink "Utility Methods/extend"}}{{/crossLink}} and {{#crossLink "Utility Methods/promote"}}{{/crossLink}}
	 * for details.
	 *
	 * There is an inheritance tutorial distributed with EaselJS in /tutorials/Inheritance.
	 *
	 * @method initialize
	 * @protected
	 * @deprecated
	 */
	// p.initialize = function() {}; // searchable for devs wondering where it is.


// static public methods:
	/**
	 * Static initializer to mix EventDispatcher methods into a target object or prototype.
	 * 
	 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
	 * 		EventDispatcher.initialize(myObject); // add to a specific instance
	 * 
	 * @method initialize
	 * @static
	 * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
	 * prototype.
	 **/
	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.on = p.on;
		target.removeEventListener = target.off =  p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
		target._dispatchEvent = p._dispatchEvent;
		target.willTrigger = p.willTrigger;
	};
	

// public methods:
	/**
	 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
	 * multiple callbacks getting fired.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.addEventListener("click", handleClick);
	 *      function handleClick(event) {
	 *         // Click happened.
	 *      }
	 *
	 * @method addEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function | Object} Returns the listener for chaining or assignment.
	 **/
	p.addEventListener = function(type, listener, useCapture) {
		var listeners;
		if (useCapture) {
			listeners = this._captureListeners = this._captureListeners||{};
		} else {
			listeners = this._listeners = this._listeners||{};
		}
		var arr = listeners[type];
		if (arr) { this.removeEventListener(type, listener, useCapture); }
		arr = listeners[type]; // remove may have deleted the array
		if (!arr) { listeners[type] = [listener];  }
		else { arr.push(listener); }
		return listener;
	};
	
	/**
	 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
	 * only run once, associate arbitrary data with the listener, and remove the listener.
	 * 
	 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
	 * The created anonymous function is returned for use with .removeEventListener (or .off).
	 * 
	 * <h4>Example</h4>
	 * 
	 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
	 * 		function handleClick(evt, data) {
	 * 			data.count -= 1;
	 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
	 * 			if (data.count == 0) {
	 * 				alert("clicked 3 times!");
	 * 				myBtn.off("click", listener);
	 * 				// alternately: evt.remove();
	 * 			}
	 * 		}
	 * 
	 * @method on
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
	 * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
	 * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
	 * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
	 **/
	p.on = function(type, listener, scope, once, data, useCapture) {
		if (listener.handleEvent) {
			scope = scope||listener;
			listener = listener.handleEvent;
		}
		scope = scope||this;
		return this.addEventListener(type, function(evt) {
				listener.call(scope, evt, data);
				once&&evt.remove();
			}, useCapture);
	};

	/**
	 * Removes the specified event listener.
	 *
	 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
	 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
	 * closure will not work.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.removeEventListener("click", handleClick);
	 *
	 * @method removeEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.removeEventListener = function(type, listener, useCapture) {
		var listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) { return; }
		var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); } // allows for faster checks.
				else { arr.splice(i,1); }
				break;
			}
		}
	};
	
	/**
	 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
	 * .on method.
	 *
	 * @method off
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.off = p.removeEventListener;

	/**
	 * Removes all listeners for the specified type, or all listeners of all types.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Remove all listeners
	 *      displayObject.removeAllEventListeners();
	 *
	 *      // Remove all click listeners
	 *      displayObject.removeAllEventListeners("click");
	 *
	 * @method removeAllEventListeners
	 * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
	 **/
	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = this._captureListeners = null; }
		else {
			if (this._listeners) { delete(this._listeners[type]); }
			if (this._captureListeners) { delete(this._captureListeners[type]); }
		}
	};

	/**
	 * Dispatches the specified event to all listeners.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Use a string event
	 *      this.dispatchEvent("complete");
	 *
	 *      // Use an Event instance
	 *      var event = new createjs.Event("progress");
	 *      this.dispatchEvent(event);
	 *
	 * @method dispatchEvent
	 * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
	 * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
	 * dispatchEvent will construct an Event instance with the specified type.
	 * @return {Boolean} Returns the value of eventObj.defaultPrevented.
	 **/
	p.dispatchEvent = function(eventObj) {
		if (typeof eventObj == "string") {
			// won't bubble, so skip everything if there's no listeners:
			var listeners = this._listeners;
			if (!listeners || !listeners[eventObj]) { return false; }
			eventObj = new createjs.Event(eventObj);
		} else if (eventObj.target && eventObj.clone) {
			// redispatching an active event object, so clone it:
			eventObj = eventObj.clone();
		}
		try { eventObj.target = this; } catch (e) {} // try/catch allows redispatching of native events

		if (!eventObj.bubbles || !this.parent) {
			this._dispatchEvent(eventObj, 2);
		} else {
			var top=this, list=[top];
			while (top.parent) { list.push(top = top.parent); }
			var i, l=list.length;

			// capture & atTarget
			for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
				list[i]._dispatchEvent(eventObj, 1+(i==0));
			}
			// bubbling
			for (i=1; i<l && !eventObj.propagationStopped; i++) {
				list[i]._dispatchEvent(eventObj, 3);
			}
		}
		return eventObj.defaultPrevented;
	};

	/**
	 * Indicates whether there is at least one listener for the specified event type.
	 * @method hasEventListener
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns true if there is at least one listener for the specified event.
	 **/
	p.hasEventListener = function(type) {
		var listeners = this._listeners, captureListeners = this._captureListeners;
		return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
	};
	
	/**
	 * Indicates whether there is at least one listener for the specified event type on this object or any of its
	 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
	 * specified type is dispatched from this object, it will trigger at least one listener.
	 * 
	 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
	 * event flow for a listener, not just this object.
	 * @method willTrigger
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns `true` if there is at least one listener for the specified event.
	 **/
	p.willTrigger = function(type) {
		var o = this;
		while (o) {
			if (o.hasEventListener(type)) { return true; }
			o = o.parent;
		}
		return false;
	};

	/**
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[EventDispatcher]";
	};


// private methods:
	/**
	 * @method _dispatchEvent
	 * @param {Object | String | Event} eventObj
	 * @param {Object} eventPhase
	 * @protected
	 **/
	p._dispatchEvent = function(eventObj, eventPhase) {
		var l, listeners = (eventPhase==1) ? this._captureListeners : this._listeners;
		if (eventObj && listeners) {
			var arr = listeners[eventObj.type];
			if (!arr||!(l=arr.length)) { return; }
			try { eventObj.currentTarget = this; } catch (e) {}
			try { eventObj.eventPhase = eventPhase; } catch (e) {}
			eventObj.removed = false;
			
			arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
			for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
				var o = arr[i];
				if (o.handleEvent) { o.handleEvent(eventObj); }
				else { o(eventObj); }
				if (eventObj.removed) {
					this.off(eventObj.type, o, eventPhase==1);
					eventObj.removed = false;
				}
			}
		}
	};


	createjs.EventDispatcher = EventDispatcher;
}());
/*
* Ticker
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor:
	/**
	 * The Ticker provides a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
	 * event to be notified when a set time interval has elapsed.
	 *
	 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
	 * when under high CPU load. The Ticker class uses a static interface (ex. `Ticker.framerate = 30;`) and
	 * can not be instantiated.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          // Actions carried out each tick (aka frame)
	 *          if (!event.paused) {
	 *              // Actions carried out when the Ticker is not paused.
	 *          }
	 *      }
	 *
	 * @class Ticker
	 * @uses EventDispatcher
	 * @static
	 **/
	function Ticker() {
		throw "Ticker cannot be instantiated.";
	}


// constants:
	/**
	 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
	 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
	 * dispatches the tick when the time is within a certain threshold.
	 *
	 * This mode has a higher variance for time between frames than TIMEOUT, but does not require that content be time
	 * based as with RAF while gaining the benefits of that API (screen synch, background throttling).
	 *
	 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
	 * framerates of 10, 12, 15, 20, and 30 work well.
	 *
	 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
	 * @property RAF_SYNCHED
	 * @static
	 * @type {String}
	 * @default "synched"
	 * @readonly
	 **/
	Ticker.RAF_SYNCHED = "synched";

	/**
	 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
	 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
	 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the tick event object's "delta" properties
	 * to make this easier.
	 *
	 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
	 * @property RAF
	 * @static
	 * @type {String}
	 * @default "raf"
	 * @readonly
	 **/
	Ticker.RAF = "raf";

	/**
	 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
	 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
	 * @property TIMEOUT
	 * @static
	 * @type {String}
	 * @default "timer"
	 * @readonly
	 **/
	Ticker.TIMEOUT = "timeout";


// static events:
	/**
	 * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
	 * {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, event.delta);
	 *      }
	 *
	 * @event tick
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Boolean} paused Indicates whether the ticker is currently paused.
	 * @param {Number} delta The time elapsed in ms since the last tick.
	 * @param {Number} time The total time in ms since Ticker was initialized.
	 * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
	 * 	you could determine the amount of time that the Ticker has been paused since initialization with time-runTime.
	 * @since 0.6.0
	 */


// public static properties:
	/**
	 * Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}, and will be removed in a future version. If true, timingMode will
	 * use {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} by default.
	 * @deprecated Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}.
	 * @property useRAF
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
	Ticker.useRAF = false;

	/**
	 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
	 * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
	 * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
	 * @property timingMode
	 * @static
	 * @type {String}
	 * @default Ticker.TIMEOUT
	 **/
	Ticker.timingMode = null;

	/**
	 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
	 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
	 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
	 * (ex. maxDelta=50 when running at 40fps).
	 * 
	 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
	 * when using both delta and other values.
	 * 
	 * If 0, there is no maximum.
	 * @property maxDelta
	 * @static
	 * @type {number}
	 * @default 0
	 */
	Ticker.maxDelta = 0;
	
	/**
	 * When the ticker is paused, all listeners will still receive a tick event, but the <code>paused</code> property of the event will be false.
	 * Also, while paused the `runTime` will not increase. See {{#crossLink "Ticker/tick:event"}}{{/crossLink}},
	 * {{#crossLink "Ticker/getTime"}}{{/crossLink}}, and {{#crossLink "Ticker/getEventTime"}}{{/crossLink}} for more info.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.paused = true;
	 *      function handleTick(event) {
	 *          console.log(event.paused,
	 *          	createjs.Ticker.getTime(false),
	 *          	createjs.Ticker.getTime(true));
	 *      }
	 *
	 * @property paused
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
	Ticker.paused = false;


// mix-ins:
	// EventDispatcher methods:
	Ticker.removeEventListener = null;
	Ticker.removeAllEventListeners = null;
	Ticker.dispatchEvent = null;
	Ticker.hasEventListener = null;
	Ticker._listeners = null;
	createjs.EventDispatcher.initialize(Ticker); // inject EventDispatcher methods.
	Ticker._addEventListener = Ticker.addEventListener;
	Ticker.addEventListener = function() {
		!Ticker._inited&&Ticker.init();
		return Ticker._addEventListener.apply(Ticker, arguments);
	};


// private static properties:
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
	Ticker._inited = false;

	/**
	 * @property _startTime
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._startTime = 0;

	/**
	 * @property _pausedTime
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._pausedTime=0;

	/**
	 * The number of ticks that have passed
	 * @property _ticks
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._ticks = 0;

	/**
	 * The number of ticks that have passed while Ticker has been paused
	 * @property _pausedTicks
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._pausedTicks = 0;

	/**
	 * @property _interval
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._interval = 50;

	/**
	 * @property _lastTime
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._lastTime = 0;

	/**
	 * @property _times
	 * @static
	 * @type {Array}
	 * @protected
	 **/
	Ticker._times = null;

	/**
	 * @property _tickTimes
	 * @static
	 * @type {Array}
	 * @protected
	 **/
	Ticker._tickTimes = null;

	/**
	 * Stores the timeout or requestAnimationFrame id.
	 * @property _timerId
	 * @static
	 * @type {Number}
	 * @protected
	 **/
	Ticker._timerId = null;
	
	/**
	 * True if currently using requestAnimationFrame, false if using setTimeout. This may be different than timingMode
	 * if that property changed and a tick hasn't fired.
	 * @property _raf
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
	Ticker._raf = true;
	

// static getter / setters:
	/**
	 * Use the {{#crossLink "Ticker/interval:property"}}{{/crossLink}} property instead.
	 * @method setInterval
	 * @static
	 * @param {Number} interval
	 * @deprecated
	 **/
	Ticker.setInterval = function(interval) {
		Ticker._interval = interval;
		if (!Ticker._inited) { return; }
		Ticker._setupTick();
	};

	/**
	 * Use the {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} property instead.
	 * @method getInterval
	 * @static
	 * @return {Number}
	 * @deprecated
	 **/
	Ticker.getInterval = function() {
		return Ticker._interval;
	};

	/**
	 * Use the {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} property instead.
	 * @method setFPS
	 * @static
	 * @param {Number} value
	 * @deprecated
	 **/
	Ticker.setFPS = function(value) {
		Ticker.setInterval(1000/value);
	};

	/**
	 * Use the {{#crossLink "Ticker/interval:property"}}{{/crossLink}} property instead.
	 * @method getFPS
	 * @static
	 * @return {Number}
	 * @deprecated
	 **/
	Ticker.getFPS = function() {
		return 1000/Ticker._interval;
	};

	/**
	 * Indicates the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
	 * Note that actual time between ticks may be more than specified depending on CPU load.
	 * This property is ignored if the ticker is using the `RAF` timing mode.
	 * @property interval
	 * @static
	 * @type {Number}
	 **/
	 
	/**
	 * Indicates the target frame rate in frames per second (FPS). Effectively just a shortcut to `interval`, where
	 * `framerate == 1000/interval`.
	 * @property framerate
	 * @static
	 * @type {Number}
	 **/
	try {
		Object.defineProperties(Ticker, {
			interval: { get: Ticker.getInterval, set: Ticker.setInterval },
			framerate: { get: Ticker.getFPS, set: Ticker.setFPS }
		});
	} catch (e) { console.log(e); }


// public static methods:
	/**
	 * Starts the tick. This is called automatically when the first listener is added.
	 * @method init
	 * @static
	 **/
	Ticker.init = function() {
		if (Ticker._inited) { return; }
		Ticker._inited = true;
		Ticker._times = [];
		Ticker._tickTimes = [];
		Ticker._startTime = Ticker._getTime();
		Ticker._times.push(Ticker._lastTime = 0);
		Ticker.interval = Ticker._interval;
	};
	
	/**
	 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
	 * @method reset
	 * @static
	 **/
	Ticker.reset = function() {
		if (Ticker._raf) {
			var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			f&&f(Ticker._timerId);
		} else {
			clearTimeout(Ticker._timerId);
		}
		Ticker.removeAllEventListeners("tick");
		Ticker._timerId = Ticker._times = Ticker._tickTimes = null;
		Ticker._startTime = Ticker._lastTime = Ticker._ticks = 0;
		Ticker._inited = false;
	};

	/**
	 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
	 * because it only measures the time spent within the tick execution stack. 
	 * 
	 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between 
	 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that 
	 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
	 *
	 * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
	 * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
	 * other than the tick is using ~80ms (another script, DOM rendering, etc).
	 * @method getMeasuredTickTime
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
	 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
	 * @return {Number} The average time spent in a tick in milliseconds.
	 **/
	Ticker.getMeasuredTickTime = function(ticks) {
		var ttl=0, times=Ticker._tickTimes;
		if (!times || times.length < 1) { return -1; }

		// by default, calculate average for the past ~1 second:
		ticks = Math.min(times.length, ticks||(Ticker.getFPS()|0));
		for (var i=0; i<ticks; i++) { ttl += times[i]; }
		return ttl/ticks;
	};

	/**
	 * Returns the actual frames / ticks per second.
	 * @method getMeasuredFPS
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
	 * Defaults to the number of ticks per second.
	 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
	 * from the target frames per second.
	 **/
	Ticker.getMeasuredFPS = function(ticks) {
		var times = Ticker._times;
		if (!times || times.length < 2) { return -1; }

		// by default, calculate fps for the past ~1 second:
		ticks = Math.min(times.length-1, ticks||(Ticker.getFPS()|0));
		return 1000/((times[0]-times[ticks])/ticks);
	};

	/**
	 * Use the {{#crossLink "Ticker/paused:property"}}{{/crossLink}} property instead.
	 * @method setPaused
	 * @static
	 * @param {Boolean} value
	 * @deprecated
	 **/
	Ticker.setPaused = function(value) {
		// TODO: deprecated.
		Ticker.paused = value;
	};

	/**
	 * Use the {{#crossLink "Ticker/paused:property"}}{{/crossLink}} property instead.
	 * @method getPaused
	 * @static
	 * @return {Boolean}
	 * @deprecated
	 **/
	Ticker.getPaused = function() {
		// TODO: deprecated.
		return Ticker.paused;
	};

	/**
	 * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
	 * Returns -1 if Ticker has not been initialized. For example, you could use
	 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
	 * @method getTime
	 * @static
	 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
	 * If false, the value returned will be total time elapsed since the first tick event listener was added.
	 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
	 **/
	Ticker.getTime = function(runTime) {
		return Ticker._startTime ? Ticker._getTime() - (runTime ? Ticker._pausedTime : 0) : -1;
	};

	/**
	 * Similar to getTime(), but returns the time on the most recent tick event object.
	 * @method getEventTime
	 * @static
	 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
	 * @returns {number} The time or runTime property from the most recent tick event or -1.
	 */
	Ticker.getEventTime = function(runTime) {
		return Ticker._startTime ? (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0) : -1;
	};
	
	/**
	 * Returns the number of ticks that have been broadcast by Ticker.
	 * @method getTicks
	 * @static
	 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
	 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
	 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
	 * value. The default value is false.
	 * @return {Number} of ticks that have been broadcast.
	 **/
	Ticker.getTicks = function(pauseable) {
		return  Ticker._ticks - (pauseable ? Ticker._pausedTicks : 0);
	};


// private static methods:
	/**
	 * @method _handleSynch
	 * @static
	 * @protected
	 **/
	Ticker._handleSynch = function() {
		Ticker._timerId = null;
		Ticker._setupTick();

		// run if enough time has elapsed, with a little bit of flexibility to be early:
		if (Ticker._getTime() - Ticker._lastTime >= (Ticker._interval-1)*0.97) {
			Ticker._tick();
		}
	};

	/**
	 * @method _handleRAF
	 * @static
	 * @protected
	 **/
	Ticker._handleRAF = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _handleTimeout
	 * @static
	 * @protected
	 **/
	Ticker._handleTimeout = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _setupTick
	 * @static
	 * @protected
	 **/
	Ticker._setupTick = function() {
		if (Ticker._timerId != null) { return; } // avoid duplicates

		var mode = Ticker.timingMode||(Ticker.useRAF&&Ticker.RAF_SYNCHED);
		if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
			var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if (f) {
				Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
				Ticker._raf = true;
				return;
			}
		}
		Ticker._raf = false;
		Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
	};

	/**
	 * @method _tick
	 * @static
	 * @protected
	 **/
	Ticker._tick = function() {
		var paused = Ticker.paused;
		var time = Ticker._getTime();
		var elapsedTime = time-Ticker._lastTime;
		Ticker._lastTime = time;
		Ticker._ticks++;
		
		if (paused) {
			Ticker._pausedTicks++;
			Ticker._pausedTime += elapsedTime;
		}
		
		if (Ticker.hasEventListener("tick")) {
			var event = new createjs.Event("tick");
			var maxDelta = Ticker.maxDelta;
			event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
			event.paused = paused;
			event.time = time;
			event.runTime = time-Ticker._pausedTime;
			Ticker.dispatchEvent(event);
		}
		
		Ticker._tickTimes.unshift(Ticker._getTime()-time);
		while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }

		Ticker._times.unshift(time);
		while (Ticker._times.length > 100) { Ticker._times.pop(); }
	};

	/**
	 * @method _getTime
	 * @static
	 * @protected
	 **/
	var now = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
	Ticker._getTime = function() {
		return ((now&&now.call(performance))||(new Date().getTime())) - Ticker._startTime;
	};


	createjs.Ticker = Ticker;
}());
// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.compiler)
    this.weave.compiler = {};*/

if(!this.weavecore)
    this.weavecore = {};

/**
 * This provides a set of useful static functions for Object Comparison.
 * All Static functions are Ported from  Apache Flex mx.utils.ObjectUtil - ActionScript Code
 * @author sanjay1909
 */
(function() {
    "use strict";
    //constructor

    function ObjectUtil() {

    }

    /**
     *  Compares two numeric values.
     *  @param a First number.
     *  @param b Second number.
     *  @return 0 is both numbers are NaN.
     *  1 if only <code>a</code> is a NaN.
     *  -1 if only <code>b</code> is a NaN.
     *  -1 if <code>a</code> is less than <code>b</code>.
     *  1 if <code>a</code> is greater than <code>b</code>.
     */
    ObjectUtil.numericCompare = function(a, b) {
        if (isNaN(a) && isNaN(b))
            return 0;

        if (isNaN(a))
            return 1;

        if (isNaN(b))
            return -1;

        if (a < b)
            return -1;

        if (a > b)
            return 1;

        return 0;
    };

    /**
     *  Compares two String values.
     *  @param a First String value.
     *  @param b Second String value.
     *  @param caseInsensitive Specifies to perform a case insensitive compare,
     *  <code>true</code>, or not, <code>false</code>.
     *
     *  @return 0 is both Strings are null.
     *  1 if only <code>a</code> is null.
     *  -1 if only <code>b</code> is null.
     *  -1 if <code>a</code> precedes <code>b</code>.
     *  1 if <code>b</code> precedes <code>a</code>.
     */
    ObjectUtil.stringCompare = function(a, b, caseInsensitive) {
        if ((a === null || a === undefined) && (b === null || b === undefined))
            return 0;

        if (a === null || a === undefined)
            return 1;

        if (b === null || b === undefined)
            return -1;

        // Convert to lowercase if we are case insensitive.
        if (caseInsensitive) {
            a = a.toLocaleLowerCase();
            b = b.toLocaleLowerCase();
        }

        var result = a.localeCompare(b);

        if (result < -1)
            result = -1;
        else if (result > 1)
            result = 1;

        return result;
    };

    /**
     *  Compares the two Date objects and returns an integer value
     *  indicating if the first Date object is before, equal to,
     *  or after the second item.
     *  @param a Date object.
     *  @param b Date object.
     *  @return 0 if <code>a</code> and <code>b</code> are equal
     *  (or both are <code>null</code>);
     *  -1 if <code>a</code> is before <code>b</code>
     *  (or <code>b</code> is <code>null</code>);
     *  1 if <code>a</code> is after <code>b</code>
     *  (or <code>a</code> is <code>null</code>);
     *  0 is both dates getTime's are NaN;
     *  1 if only <code>a</code> getTime is a NaN;
     *  -1 if only <code>b</code> getTime is a NaN.
     */
    ObjectUtil.dateCompare = function(a, b) {
        if ((a === null || a === undefined) && (b === null || b === undefined))
            return 0;

        if (a === null || undefined)
            return 1;

        if (b === null || undefined)
            return -1;

        var na = a.getTime();
        var nb = b.getTime();

        if (na < nb)
            return -1;

        if (na > nb)
            return 1;

        if (isNaN(na) && isNaN(nb))
            return 0;

        if (isNaN(na))
            return 1;

        if (isNaN(nb))
            return -1;

        return 0;
    };

   // weave.compiler.ObjectUtil = ObjectUtil;
    weavecore.ObjectUtil = ObjectUtil;
          
}());
// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.compiler)
    this.weave.compiler = {};*/
if(!this.weavecore)
    this.weavecore = {};

/**
 * This provides a set of useful static functions.
 * All the functions defined in this class are pure functions,
 * meaning they always return the same result with the same arguments, and they have no side-effects.
 *
 * @author adufilie
 * @author sanbalag
 */
(function() {
    //"use strict";
    //constructor

    function StandardLib() {

    }

    /**
     * This compares two dynamic objects or primitive values and is much faster than ObjectUtil.compare().
     * Does not check for circular refrences.
     * @param a First dynamic object or primitive value.
     * @param b Second dynamic object or primitive value.
     * @return A value of zero if the two objects are equal, nonzero if not equal.
     */
    StandardLib.compare = function(a, b) {
        var c;
        var ObjectUtil = weavecore.ObjectUtil;
        if (a === b)
            return 0;
        if (a === null || a === undefined)
            return 1;
        if (b === null || b === undefined)
            return -1;
        var typeA = typeof(a);
        var typeB = typeof(b);
        if (typeA !== typeB)
            return weavecore.ObjectUtil.stringCompare(typeA, typeB);
        if (typeA === 'boolean')
            return weavecore.ObjectUtil.numericCompare(Number(a), Number(b));
        if (typeA === 'number')
            return weavecore.ObjectUtil.numericCompare(a, b);
        if (typeA === 'string')
            return weavecore.ObjectUtil.stringCompare(a, b);

        if (typeA !== 'object')
            return 1;

        if (a instanceof Date && b instanceof Date)
            return weavecore.ObjectUtil.dateCompare(a, b);

        if ((Array.isArray(a) && Array.isArray(b))) {
            var an = a.length;
            var bn = b.length;
            if (an < bn)
                return -1;
            if (an > bn)
                return 1;
            for (var i = 0; i < an; i++) {
                c = StandardLib.compare(a[i], b[i]);
                if (c !== 0)
                    return c;
            }
            return 0;
        }

        var qna = a.constructor.name;
        var qnb = b.constructor.name;

        if (qna != qnb)
            return weavecore.ObjectUtil.stringCompare(qna, qnb);

        var p;

        // test if objects are dynamic
        try {
            a[''];
            b[''];
        } catch (e) {
            return 1; // not dynamic objects
        }

        // if there are properties in a not found in b, return -1
        for (p in a) {
            if (!b.hasOwnProperty(p))
                return -1;
        }
        for (p in b) {
            // if there are properties in b not found in a, return 1
            if (!a.hasOwnProperty(p))
                return 1;

            c = StandardLib.compare(a[p], b[p]);
            if (c !== 0)
                return c;
        }

        return 0;
    }

   // weave.compiler.StandardLib = StandardLib;
    weavecore.StandardLib = StandardLib;
}());
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
if(!this.weavecore)
    this.weavecore = {};
(function(){
    function ILinkableObject(){
    }
    
    weavecore.ILinkableObject = ILinkableObject;
    
}());
// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.core)
    this.weave.core = {};*/

if(!this.weavecore)
    this.weavecore = {};
/**
 * This class manages a list of callback functions.
 *
 * @author adufilie
 * @author sanjay1909
 */

(function() {

    // Static Public Const Properties
    /**
     * The name of the property containing the name assigned to the object when the session state is generated.
     */
    Object.defineProperty(CallbackCollection, 'DEFAULT_TRIGGER_COUNT', {
            value: 1
        });

    // constructor
    /**
     * @param preCallback An optional function to call before each immediate callback.
     * If specified, the preCallback function will be called immediately before running each
     * callback using the parameters passed to _runCallbacksImmediately(). This means if there
     * are five callbacks added, preCallback() gets called five times whenever
     * _runCallbacksImmediately() is called.  An example usage of this is to make sure a relevant
     * variable is set to the appropriate value while each callback is running.  The preCallback
     * function will not be called before grouped callbacks.
     */

    function CallbackCollection(preCallback) {

        //private properties

        /**
         * Set this to true to enable stack traces for debugging.
         */

        /**
         * @interanl
         * @property _linkableObject
         * @type LinkableObject
         **/
        this._linkableObject; // for debugging only... will be set when debug==true

        /**
         * @private
         * @property _lastTriggerStackTrace
         * @type string
         **/
        this._lastTriggerStackTrace; // for debugging only... will be set when debug==true
        /**
         * @private
         * @property _oldEntries
         * @type Array
         **/
        this._oldEntries;

        /**
         * This is a list of CallbackEntry objects in the order they were created.
         * @private
         * @property _callbackEntries
         * @type Array
         **/
        this._callbackEntries = [];

        /**
         * This is the function that gets called immediately before every callback.
         * @protected
         * @property _precallback
         * @type function
         **/
        this._preCallback = preCallback;

        /**
         * If this is true, it means triggerCallbacks() has been called while delayed was true.
         * @private
         * @property _runCallbacksIsPending
         * @type boolean
         **/
        this._runCallbacksIsPending = false;

        /**
         * This is the number of times delayCallbacks() has been called without a matching call to resumeCallbacks().
         * While this is greater than zero, effects of triggerCallbacks() will be delayed.
         * @private
         * @property _delayCount
         * @type number
         **/
        this._delayCount = 0;

        /**
         * This value keeps track of how many times callbacks were triggered, and is returned by the public triggerCounter accessor function.
         * The value starts at 1 to simplify code that compares the counter to a previous value.
         * This allows the previous value to be set to zero so change will be detected the first time the counter is compared.
         * This fixes potential bugs where the base case of zero is not considered.
         * @private
         * @property _runCallbacksIsPending
         * @type boolean
         **/
        this._triggerCounter = CallbackCollection.DEFAULT_TRIGGER_COUNT;

        /**
         * A list of CallbackEntry objects for when dispose() is called.
         */
        this._disposeCallbackEntries = [];
        /**
         * This value is used internally to remember if dispose() was called.
         */
        this._wasDisposed = false;

        this._runCallbacksCompleted;

    }
    
    CallbackCollection.prototype = new weavecore.ILinkableObject();
    CallbackCollection.prototype.constructor = CallbackCollection;



    CallbackCollection.debug = false;



    var p = CallbackCollection.prototype;

    p.addImmediateCallback = function(contextObj, callbackFn, runCallbackNow, alwaysCallLast) {
        if (callbackFn === null || callbackFn === undefined)
            return;

        // set default value for parameters
        if (runCallbackNow === null || runCallbackNow === undefined)
            runCallbackNow = false;

        if (alwaysCallLast === null || alwaysCallLast === undefined)
            alwaysCallLast = false;

        // remove the callback if it was previously added
        this.removeCallback(callbackFn);

        var entry = new CallbackEntry(contextObj, callbackFn);
        if (alwaysCallLast)
            entry.schedule = 1;
        this._callbackEntries.push(entry);

        if (runCallbackNow) {
            // increase the recursion count while the function is running
            entry.recursionCount++;
            callbackFn.call(this);
            entry.recursionCount--;
        }
    };

    p.triggerCallbacks = function() {
        if (CallbackCollection.debug)
            this._lastTriggerStackTrace = new Error(CallbackCollection.STACK_TRACE_TRIGGER).stack();
        if (this._delayCount > 0) {
            // we still want to increase the counter even if callbacks are delayed
            this._triggerCounter++;
            this._runCallbacksIsPending = true;
            return;
        }
        this._runCallbacksImmediately.call(this);
    };


    /**
     * This function runs callbacks immediately, ignoring any delays.
     * The preCallback function will be called with the specified preCallbackParams arguments.
     * @param preCallbackParams The arguments to pass to the preCallback function given in the constructor.
     */	
    p._runCallbacksImmediately = function() {
        var preCallbackParams = arguments;
        //increase the counter immediately
        this._triggerCounter++;
        this._runCallbacksIsPending = false;

        // This flag is set to false before running the callbacks.  When it becomes true, the loop exits.
        this._runCallbacksCompleted = false;

        for (var schedule = 0; schedule < 2; schedule++) {
            // run the callbacks in the order they were added
            for (var i = 0; i < this._callbackEntries.length; i++) {
                // If this flag is set to true, it means a recursive call has finished running callbacks.
                // If _preCallback is specified, we don't want to exit the loop because that cause a loss of information.
                if (this._runCallbacksCompleted && (this._preCallback === undefined || this._preCallback === null))
                    break;

                var entry = this._callbackEntries[i];

                // if we haven't reached the matching schedule yet, skip this callback
                if (entry.schedule != schedule)
                    continue;
                // Remove the entry if the context was disposed by SessionManager.
                var shouldRemoveEntry;
                if (entry.callback === null || entry.callback === undefined)
                    shouldRemoveEntry = true;
                else if (entry.context instanceof CallbackCollection) // special case
                    shouldRemoveEntry = entry.context.wasDisposed;
                else
                    shouldRemoveEntry = WeaveAPI.SessionManager.objectWasDisposed(entry.context);
                if (shouldRemoveEntry) {
                    entry.dispose();
                    // remove the empty callback reference from the list
                    var removed = this._callbackEntries.splice(i--, 1); // decrease i because remaining entries have shifted
                    if (CallbackCollection.debug)
                        this._oldEntries = this._oldEntries ? this._oldEntries.concat(removed) : removed;
                    continue;
                }
                // if _preCallback is specified, we don't want to limit recursion because that would cause a loss of information.
                if (entry.recursionCount === 0 || (this._preCallback !== undefined && this._preCallback !== null)) {
                    entry.recursionCount++; // increase count to signal that we are currently running this callback.

                    if (this._preCallback !== undefined && this._preCallback !== null)
                        this._preCallback.apply(null, preCallbackParams);

                    entry.callback.call();

                    entry.recursionCount--; // decrease count because the callback finished.
                }
            }
        }
        // This flag is now set to true in case this function was called recursively.  This causes the outer call to exit its loop.
        this._runCallbacksCompleted = true;
    };

    p.removeCallback = function(callback) {
        // if the callback was added as a grouped callback, we need to remove the trigger function
        GroupedCallbackEntry.removeGroupedCallback(this, callback);
        // find the matching CallbackEntry, if any
        for (var outerLoop = 0; outerLoop < 2; outerLoop++) {
            var entries = outerLoop === 0 ? this._callbackEntries : this._disposeCallbackEntries;
            for (var index = 0; index < entries.length; index++) {
                var entry = entries[index];
                if (entry !== null && entry !== undefined && callback === entry.callback) {
                    // Remove the callback by setting the function pointer to null.
                    // This is done instead of removing the entry because we may be looping over the _callbackEntries Array right now.
                    entry.dispose();
                }
            }
        }
    };
    
    p.__defineGetter__("triggerCounter", function() {
        return this._triggerCounter;
    });

    p.__defineGetter__("callbacksAreDelayed", function() {
        return this._delayCount > 0;
    });
    
    




    p.delayCallbacks = function() {
        this._delayCount++;
    };

    p.resumeCallbacks = function() {
        if (this._delayCount > 0)
            this._delayCount--;

        if (this._delayCount === 0 && this._runCallbacksIsPending)
            this.triggerCallbacks();
    };


    p.addDisposeCallback = function(relevantContext, callback) {
        // don't do anything if the dispose callback was already added
        for (var i = 0; i < this._disposeCallbackEntries.length; i++) {
            var entry = this._disposeCallbackEntries[i];
            if (entry.callback === callback)
                return;
        }


        this._disposeCallbackEntries.push(new CallbackEntry(relevantContext, callback));
    };



    p.dispose = function() {
        // remove all callbacks
        if (CallbackCollection.debug)
				this._oldEntries = this._oldEntries ? this._oldEntries.concat(this._callbackEntries) : this._callbackEntries.concat();
			
        this._callbackEntries.length = 0;
        this._wasDisposed = true;

        // run & remove dispose callbacks
        while (this._disposeCallbackEntries.length) {
            var entry = this._disposeCallbackEntries.shift();
            if (entry.callback !== null && entry.callback !== undefined && !WeaveAPI.SessionManager.objectWasDisposed(entry.context)){
                entry.callback();
            }
        }
    };



    /**
     * This flag becomes true after dispose() is called.
     */
    p.__defineGetter__("wasDisposed", function() {
        return this._wasDisposed;
    });

    p.addGroupedCallback = function(relevantContext, groupedCallback, triggerCallbackNow) {
        //set default value for parameters
        if (triggerCallbackNow === null || triggerCallbackNow === undefined)
            triggerCallbackNow = false;
        GroupedCallbackEntry.addGroupedCallback(this, relevantContext, groupedCallback, triggerCallbackNow);
    };





   // weave.core.CallbackCollection = CallbackCollection;
    weavecore.CallbackCollection = CallbackCollection;
        
        
         function CallbackEntry(context, callback) {
            /**
             * This is the context in which the callback function is relevant.
             * When the context is disposed, the callback should not be called anymore.
             *
             * Note that the context could be stored using a weak reference in an effort to make the garbage-
             * collector take care of removing the callback, but in most situations this would not work because
             * the callback function is typically a class member of the context object.  This means that as long
             * as you have a strong reference to the callback function, you effectively have a strong reference
             * to the owner of the function.  Storing the callback function as a weak reference would solve this
             * problem, but you cannot create reliable weak references to functions due to a bug in the Flash
             * Player.  Weak references to functions get garbage-collected even if the owner of the function still
             * exists.
             * @public
             * @property context
             * @type Object
             */
            this.context = context;
            /**
             * This is the callback function.
             * @public
             * @property callback
             * @type Function
             */
            this.callback = callback;
            /**
             * This is the current recursion depth.
             * If this is greater than zero, it means the function is currently running.
             * Note that it IS possible for this to go above 1 if an external JavaScript popup interrupts our code.
             * @public
             * @property recursionCount
             * @type number
             */
            this.recursionCount = 0;
            /**
             * This is 0 if the callback was added with alwaysCallLast=false, or 1 for alwaysCallLast=true
             * @public
             * @property schedule
             * @type number
             */
            this.schedule = 0;

            /**
             * This is a stack trace from when the callback was added.
             * @public
             * @property addCallback_stackTrace
             * @type string
             */
            this.addCallback_stackTrace;
            /**
             * This is a stack trace from when the callback was removed.
             * @public
             * @property removeCallback_stackTrace
             * @type string
             */
            this.removeCallback_stackTrace;

            if (CallbackCollection.debug)
                this.addCallback_stackTrace = new Error(CallbackEntry.STACK_TRACE_ADD).stack;
        }

        Object.defineProperty(CallbackEntry, 'STACK_TRACE_TRIGGER', {
                value: "This is the stack trace from when the callbacks were last triggered."
            });
        Object.defineProperty(CallbackEntry, 'STACK_TRACE_ADD', {
                value: "This is the stack trace from when the callback was added."
            });
        Object.defineProperty(CallbackEntry, 'STACK_TRACE_REMOVE', {
                value: "This is the stack trace from when the callback was removed."
            });

        CallbackEntry.prototype.dispose = function() {
            if (CallbackCollection.debug && this.callback !== null && this.callback !== undefined)
                this.removeCallback_stackTrace = new Error(CallbackEntry.STACK_TRACE_REMOVE).stack;

            this.context = null;
            this.callback = null;
        };

        weavecore.CallbackEntry = CallbackEntry;


        /**
         * Constructor
         */

        function GroupedCallbackEntry(groupedCallback) {
             /**
         * This gets set to true when the static _handleGroupedCallbacks() callback has been added as a frame listener.
         */
        GroupedCallbackEntry._initialized = false;
            CallbackEntry.call(this, [],groupedCallback);
            /**
             * If true, the callback was triggered this frame.
             */
            this.triggered = false;

            /**
             * If true, the callback was triggered again from another grouped callback.
             */
            this.triggeredAgain = false;


            if (!GroupedCallbackEntry._initialized) {
                weavecore.StageUtils.addEventCallback("tick", null, GroupedCallbackEntry._handleGroupedCallbacks.bind(this));
                GroupedCallbackEntry._initialized = true;
            }
        }
    
     GroupedCallbackEntry.prototype = new CallbackEntry();
    GroupedCallbackEntry.prototype.constructor = GroupedCallbackEntry;
        /**
         * True while handling grouped callbacks.
         */
        GroupedCallbackEntry._handlingGroupedCallbacks = false;

        /**
         * True while handling grouped callbacks called recursively from other grouped callbacks.
         */
        GroupedCallbackEntry._handlingRecursiveGroupedCallbacks = false;

       

        /**
         * This maps a groupedCallback function to its corresponding GroupedCallbackEntry.
         */
        Object.defineProperty(GroupedCallbackEntry, '_entryLookup', {
                value: new Map()
            });

        /**
         * This is a list of GroupedCallbackEntry objects in the order they were triggered.
         */
        Object.defineProperty(GroupedCallbackEntry, '_triggeredEntries', {
                value: []
            });




        GroupedCallbackEntry.addGroupedCallback = function(callbackCollection, relevantContext, groupedCallback, triggerCallbackNow) {
            // get (or create) the shared entry for the groupedCallback
            var entry = GroupedCallbackEntry._entryLookup.get(groupedCallback);
            if (!entry) {
                entry = new GroupedCallbackEntry(groupedCallback);
                GroupedCallbackEntry._entryLookup.set(groupedCallback,entry );
            }

            // context shouldn't be null because we use it to determine when to clean up the GroupedCallbackEntry.
            if (relevantContext === null || relevantContext === undefined)
                relevantContext = callbackCollection;

            // add this context to the list of relevant contexts
             entry.context.push(relevantContext);
            

            // make sure the actual function is not already added as a callback.
            callbackCollection.removeCallback(groupedCallback);

            // add the trigger function as a callback
            // The relevantContext parameter is set to null for entry.trigger so the same callback can be added multiple times to the same
            // target using different contexts without having the side effect of losing the callback when one of those contexts is disposed.
            // The entry.trigger function will be removed once all contexts are disposed.
            callbackCollection.addImmediateCallback(null, entry.trigger.bind(entry), triggerCallbackNow);
        }

        GroupedCallbackEntry.removeGroupedCallback = function(callbackCollection, groupedCallback) {
            // remove the trigger function as a callback
            var entry = GroupedCallbackEntry._entryLookup.get(groupedCallback);
            if (entry)
                callbackCollection.removeCallback(entry.trigger);
        }

        /**
         * This function gets called once per frame and allows grouped callbacks to run.
         */
        GroupedCallbackEntry._handleGroupedCallbacks = function() {
            var i;
            var entry;
            
            GroupedCallbackEntry._handlingGroupedCallbacks = true; {
                // Handle grouped callbacks in the order they were triggered,
                // anticipating that more may be added to the end of the list in the process.
                // This first pass does not allow grouped callbacks to call each other immediately.
                for (i = 0; i < GroupedCallbackEntry._triggeredEntries.length; i++) {
                    entry = GroupedCallbackEntry._triggeredEntries[i];
                    entry.handleGroupedCallback();
                }

                // after all grouped callbacks have been handled once, run those which were triggered recursively and allow them to call other grouped callbacks immediately.
                GroupedCallbackEntry._handlingRecursiveGroupedCallbacks = true; {
                    // handle grouped callbacks that were triggered recursively
                    for (i = 0; i < GroupedCallbackEntry._triggeredEntries.length; i++) {
                        entry = GroupedCallbackEntry._triggeredEntries[i];
                        if (entry.triggeredAgain)
                            entry.handleGroupedCallback();
                    }
                }
                GroupedCallbackEntry._handlingRecursiveGroupedCallbacks = false;
            }
            GroupedCallbackEntry._handlingGroupedCallbacks = false;

            // reset for next frame
            for (i = 0; i < GroupedCallbackEntry._triggeredEntries.length; i++) {
                entry = GroupedCallbackEntry._triggeredEntries[i];
                entry.triggered = entry.triggeredAgain = false;
            }
            GroupedCallbackEntry._triggeredEntries.length = 0;
            
        };
    
   



        /**
         * Marks the entry to be handled later (unless already triggered this frame).
         * This also takes care of preventing recursion.
         */
        GroupedCallbackEntry.prototype.trigger = function() {
            // if handling recursive callbacks, call now
            if (GroupedCallbackEntry._handlingRecursiveGroupedCallbacks) {
                this.handleGroupedCallback();
            } else if (!this.triggered) {
                // not previously triggered
                GroupedCallbackEntry._triggeredEntries.push(this);
                this.triggered = true;
            } else if (GroupedCallbackEntry._handlingGroupedCallbacks) {
                // triggered recursively - call later
                this.triggeredAgain = true;
            }
        };
    

        /**
         * Checks the context(s) before calling groupedCallback
         */
        GroupedCallbackEntry.prototype.handleGroupedCallback = function() {
            if (!this.context)
                return;

            // first, make sure there is at least one relevant context for this callback.
            var allContexts = this.context;
            // remove the contexts that have been disposed.
            for (var i = 0; i < allContexts.length; i++)
                if (WeaveAPI.SessionManager.objectWasDisposed(allContexts[i]))
                    allContexts.splice(i--, 1);
            // if there are no more relevant contexts for this callback, don't run it.
            if (allContexts.length === 0) {
                this.dispose();
                GroupedCallbackEntry._entryLookup.delete(this.callback);
                return;
            }

            // avoid immediate recursion
            if (this.recursionCount === 0) {
                this.recursionCount++;
                this.callback.apply();
                this.recursionCount--;
            }
            // avoid delayed recursion
            this.triggeredAgain = false;
        };
        
        weavecore.GroupedCallbackEntry = GroupedCallbackEntry;


    

}());
if (!this.weavecore)
    this.weavecore = {};

(function() {
    function SessionManager(){
        this.childToParentMap = new Map();
        this.parentToChildMap = new Map();
        this.ownerToChildMap =  new Map();
        this.childToOwnerMap =  new Map();

        this.linkableObjectToCallbackCollectionMap = new Map();
        this.debugBusyTasks = false;
        
       
        
        Object.defineProperty(this,"_disposedObjectsMap", {value:new Map()});

        Object.defineProperty(this,"_treeCallbacks", {value:new weavecore.CallbackCollection()});
}
    
      
    SessionManager.prototype.registerLinkableChild = function(linkableParent,linkableChild,callback,useGroupedCallback){
        //set default values for parameters
        if(useGroupedCallback === undefined)
            useGroupedCallback = false;
        if(!linkableParent instanceof weavecore.ILinkableObject){
            console.log("registerLinkableChild(): Parent does not inherit ILinkableObject.");
            return;
        }
            
        if(!linkableChild instanceof weavecore.ILinkableObject){
            console.log("registerLinkableChild(): child does not inherit ILinkableObject.");
            return;
        }
            
        if (callback !== null && callback !== undefined)
        {
            var cc = this.getCallbackCollection.call(this,linkableChild);	
            if(useGroupedCallback)
                cc.addGroupedCallback(linkableParent,callback);
            else
                cc.addImmediateCallback(linkableParent, callback);
        }
			
        // if the child doesn't have an owner yet, this parent is the owner of the child
        // and the child should be disposed when the parent is disposed.
        // registerDisposableChild() also initializes the required Dictionaries.
        this.registerDisposableChild(linkableParent, linkableChild);
        
        if (this.childToParentMap.get(linkableChild).get(linkableParent) === undefined){
            // remember this child-parent relationship
            this.childToParentMap.get(linkableChild).set(linkableParent,true);
            this.parentToChildMap.get(linkableParent).set(linkableChild,true);

            // make child changes trigger parent callbacks
            var parentCC = this.getCallbackCollection(linkableParent);
            // set alwaysCallLast=true for triggering parent callbacks, so parent will be triggered after all the other child callbacks
            this.getCallbackCollection(linkableChild).addImmediateCallback(linkableParent,parentCC.triggerCallbacks.bind(parentCC),false); // parent-child relationship
        } 
        
        this._treeCallbacks.triggerCallbacks();
        
        return linkableChild;
    }
    
    SessionManager.prototype.registerDisposableChild = function(disposableParent, disposableChild){
        if (this.ownerToChildMap.get(disposableParent) === undefined){
            this.ownerToChildMap.set(disposableParent, new Map()); 
            this.parentToChildMap.set(disposableParent, new Map()); 
        }
        // if this child has no owner yet...
        if (this.childToOwnerMap.get(disposableChild) === undefined){
            // make this first parent the owner
            this.childToOwnerMap.set(disposableChild, disposableParent);
            this.ownerToChildMap.get(disposableParent).set(disposableChild,true);
            // initialize the parent dictionary for this child
            this.childToParentMap.set(disposableChild,new Map()); 
        }
        return disposableChild;
    }
     
    SessionManager.prototype.unregisterLinkableChild = function(parent,child){
        if (this.childToParentMap.get(child))
				this.childToParentMap.get(child).delete(parent);
        if (this.parentToChildMap.get(parent))
            this.parentToChildMap(parent).delete(child);
        this.getCallbackCollection(child).removeCallback(this.getCallbackCollection(parent).triggerCallbacks.bind(parent));
        
        this._treeCallbacks.triggerCallbacks();
    }
    
    SessionManager.prototype.excludeLinkableChildFromSessionState = function(parent,child){
        if(parent === null || child === null || parent === undefined || child === undefined){
            console.log("SessionManager.excludeLinkableChildFromSessionState(): Parameters cannot be null.");
            return;
        }
        if(this.childToParentMap.get(child) !== undefined && this.childToParentMap.get(child).get(parent))
            this.childToParentMap.get(child).set(parent,false);
        if(this.parentToChildMap.get(parent) !== undefined && this.parentToChildMap.get(parent).get(child))
            this.parentToChildMap.get(parent).set(child, false);
    }
    
    /**
     * @private
     * This function will return all the child objects that have been registered with a parent.
     * @param parent A parent object to get the registered children of.
     * @return An Array containing a list of linkable objects that have been registered as children of the specified parent.
     *         This list includes all children that have been registered, even those that do not appear in the session state.
     */
    SessionManager.prototype._getRegisteredChildren = function(parent)
    {
        var result = [];
        if (this.parentToChildMap.get(parent) !== undefined)
            for (var child in this.parentToChildMap.get(parent))
                result.push(child);
        return result;
    }
    
    
    SessionManager.prototype.getLinkableOwner = function(child){
        return this.childToOwnerMap.get(child);
    }
    
    SessionManager.prototype.getSessionStateTree = function(root,objectName,objectTypeFilter){
        var treeItem = new WeaveTreeItem();
        treeItem.label = objectName;
        treeItem.source = root;
        treeItem.children = SessionManager.prototype.getTreeItemChildren;
        treeItem.data = objectTypeFilter;
        return treeItem;
    }
    
    SessionManager.prototype.getTreeItemChildren = function(treeItem){
        var object = treeItem.source;
        var objectTypeFilter = treeItem.data;
        var children = [];
        var names = [];
        var childObject;
        var subtree;
        var ignoreList = new Map();
        if(object instanceof LinkableHashMap){
            names = object.getNames();
            var childObjects = object.getObjects();
            for(var i = 0 ; i < names.length ; i++){
                childObject = childObjects[i];
                if(this.childToParentMap.get(childObject) && this.childToParentMap.get(childObject).get(object)){
                    if(ignoreList.get(childObject) !== undefined)
                        continue;
                    ignoreList.set(childObject,true);
                    
                    subtree = this.getSessionStateTree(childObject, names[i] , objectTypeFilter);
                    if( subtree !== null && subtree !== undefined)
                        children.push(subtree);
                }
            }
        }
        else {
            var deprecatedLookup = null;
            
            console.log("Linkable dynamic object not yet supported - only Linkablehashmap")
        }
        if(children.length === 0)
            children = null;
        if(objectTypeFilter === null || objectTypeFilter === undefined)
            return children;
        if((children === null || children === undefined) && !(object instanceof objectTypeFilter))
            return null;
        return children;
    }
    
    SessionManager.prototype.addTreeCallback = function(relevantContext, groupedCallback, triggerCallbackNow){
			this._treeCallbacks.addGroupedCallback(relevantContext, groupedCallback, triggerCallbackNow);
    }
    
    
    SessionManager.prototype.removeTreeCallback = function(groupedCallback){
        this._treeCallbacks.removeCallback(groupedCallback);
    }
    
    SessionManager.prototype.copySessionState = function(source, destination){
        var sessionState = this.getSessionState(source);
        this.setSessionState(destination, sessionState, true);
    }
   
    
    SessionManager.prototype._applyDiff = function(base, diff){
        if (base === null || base === undefined|| typeof(base) !== 'object')
            return diff;

        for(var key in diff)
            base[key] = this._applyDiff(base[key], diff[key]);

        return base;
    }

    SessionManager.prototype.setSessionState =  function (linkableObject, newState, removeMissingDynamicObjects){
        if (linkableObject === null || linkableObject === undefined){
            console.log("SessionManager.setSessionState(): linkableObject cannot be null.");
            return;
        }

        // special cases:
        if (linkableObject instanceof weavecore.ILinkableObject && linkableObject.setSessionState ){
            var lv = linkableObject;
            if (removeMissingDynamicObjects === false && newState && newState.constructor.name === 'Object'){
                lv.setSessionState.call(lv,this._applyDiff.call(this,Object.create(lv.getSessionState.call(lv)), newState));
            }
            else{
                lv.setSessionState.call(lv,newState);
            }
            return;
        }
        // currently composite object not supported

        if (newState === null || newState === undefined)
            return;


    }
    
      SessionManager.prototype.getSessionState = function(linkableObject)    {
        if (linkableObject === null || linkableObject === undefined)
        {
            console.log("SessionManager.getSessionState(): linkableObject cannot be null.");
            return null;
        }

        var result = null;

        // special cases (explicit session state)
        if (linkableObject instanceof weavecore.ILinkableObject || linkableObject.getSessionState)
        {
            result = linkableObject.getSessionState();
        }
        
        // currently composite sessioned object sessionstate getting is not added

        return result;
    }
      
      SessionManager.prototype.getCallbackCollection = function(linkableObject){
          
          if (linkableObject === null)
				return null;
       if( linkableObject instanceof weavecore.CallbackCollection)
           return linkableObject;
        
        var objectCC = this.linkableObjectToCallbackCollectionMap.get(linkableObject);
        if(objectCC === null || objectCC === undefined){
            objectCC = this.registerDisposableChild(linkableObject, new weavecore.CallbackCollection());
            if (weavecore.CallbackCollection.debug)
					objectCC._linkableObject = linkableObject;
            this.linkableObjectToCallbackCollectionMap.set(linkableObject , objectCC);
        }        
        
        return objectCC;
    }
    
    
    /**
     * @inheritDoc
     */
    SessionManager.prototype.objectWasDisposed = function (object)
    {
        if (object === null || object === undefined)
            return false;
        if (object instanceof weavecore.ILinkableObject)
        {
            var cc = this.getCallbackCollection(object);
            if (cc)
                return cc.wasDisposed;
        }
        return this._disposedObjectsMap.get(object) !== undefined;
    }

    
		
		
    /**
     * @inheritDoc
     */
    SessionManager.prototype.disposeObject = function (object)
    {
        if (object !== null && object !== undefined && !this._disposedObjectsMap.get(object))
        {
            this._disposedObjectsMap.set(object, true);

            // clean up pointers to busy tasks
            //disposeBusyTaskPointers(object as ILinkableObject);

            try
            {
                // if the object implements IDisposableObject, call its dispose() function now
                //if (object instanceof IDisposableObject)
            //	{
                //	object.dispose();
            //	}
                 if (object.hasOwnProperty("dispose"))
                {
                    // call dispose() anyway if it exists, because it is common to forget to implement IDisposableObject.
                    object["dispose"]();
                }
            }
            catch (e)
            {
                console.log(e);
            }

            var linkableObject = object;
            if (linkableObject)
            {
                // dispose the callback collection corresponding to the object.
                // this removes all callbacks, including the one that triggers parent callbacks.
                var objectCC = this.getCallbackCollection(linkableObject);
                if (objectCC !== linkableObject)
                    this.disposeObject(objectCC);
            }

            // unregister from parents
            if (this.childToParentMap.get(object) !== undefined)
            {
                // remove the parent-to-child mappings
                for (var parent in this.childToParentMap.get(object))
                    if (this.parentToChildMap(parent) !== undefined)
                        this.parentToChildMap.get(parent).delete(object);
                // remove child-to-parent mapping
                 this.childToParentMap.delete(object);
            }

            // unregister from owner
            var owner = this.childToOwnerMap.get(object);
            if (owner !== null || owner !== undefined)
            {
                if (this.ownerToChildMap.get(owner) !== undefined)
                    this.ownerToChildMap.get(owner).delete(object);
                this.childToOwnerMap.delete(object);
            }

            // if the object is an ILinkableVariable, unlink it from all bindable properties that were previously linked
            //if (linkableObject instanceof LinkableVariable)
                //for (var bindableParent:* in _watcherMap[linkableObject])
                    //for (var bindablePropertyName:String in _watcherMap[linkableObject][bindableParent])
                        //unlinkBindableProperty(linkableObject as ILinkableVariable, bindableParent, bindablePropertyName);

            // unlink this object from all other linkable objects
            //for (var otherObject in linkFunctionCache.dictionary[linkableObject])
                //unlinkSessionState(linkableObject, otherObject as ILinkableObject);

            // dispose all registered children that this object owns
            var children = this.ownerToChildMap.get(object) ;
            if (children !== null && children !== undefined)
            {
                // clear the pointers to the child dictionaries for this object
                this.ownerToChildMap.delete(object);
                this.parentToChildMap.delete(object);
                // dispose the children this object owned
                for (var child in children)
                    this.disposeObject(child);
            }

            this._treeCallbacks.triggerCallbacks();
        }
    }
    
   
    
    SessionManager.prototype.computeDiff = function(oldState, newState){
        var type = typeof(oldState); // the type of null is 'object'
        var diffValue;

        // special case if types differ
        if (typeof(newState) !== type)
            return newState;


        if (type === 'number')
        {
            if (isNaN(oldState) && isNaN(newState))
                return undefined; // no diff

            if (oldState !== newState)
                return newState;

            return undefined; // no diff
        }
        else if (oldState === null || oldState === undefined || newState === null || newState === undefined || type !== 'object') // other primitive value
        {
            if (oldState !== newState) // no type-casting
                return newState;

            return undefined; // no diff
        }
        else if (Array.isArray(oldState) && Array.isArray(newState))
        {
            // If neither is a dynamic state array, don't compare them as such.
            if (!weavecore.DynamicState.isDynamicStateArray(oldState) && !weavecore.DynamicState.isDynamicStateArray(newState))
            {
                if (weavecore.StandardLib.compare(oldState, newState) === 0)
                    return undefined; // no diff
                return newState;
            }

            // create an array of new DynamicState objects for all new names followed by missing old names
            var i;
            var typedState;
            var changeDetected = false;

            // create oldLookup
            var oldLookup = {};
            var objectName;
            var className;
            var sessionState;
            for (i = 0; i < oldState.length; i++)
            {
                // assume everthing is typed session state
                //note: there is no error checking here for typedState
                typedState = oldState[i];
                objectName = typedState[weavecore.DynamicState.OBJECT_NAME];
                // use '' instead of null to avoid "null"
                oldLookup[objectName || ''] = typedState;
            }
            if (oldState.length !== newState.length)
                changeDetected = true;

            // create new Array with new DynamicState objects
            var result = [];
            for (i = 0; i < newState.length; i++)
            {
                // assume everthing is typed session state
                //note: there is no error checking here for typedState
                typedState = newState[i];
                objectName = typedState[weavecore.DynamicState.OBJECT_NAME];
                className = typedState[weavecore.DynamicState.CLASS_NAME];
                sessionState = typedState[weavecore.DynamicState.SESSION_STATE];
                var oldTypedState = oldLookup[objectName || ''];
                delete oldLookup[objectName || '']; // remove it from the lookup because it's already been handled

                // If the object specified in newState does not exist in oldState, we don't need to do anything further.
                // If the class is the same as before, then we can save a diff instead of the entire session state.
                // If the class changed, we can't save only a diff -- we need to keep the entire session state.
                // Replace the sessionState in the new DynamicState object with the diff.
                if (oldTypedState !== undefined && oldTypedState[weavecore.DynamicState.CLASS_NAME] === className)
                {
                    className = null; // no change
                    diffValue = this.computeDiff(oldTypedState[weavecore.DynamicState.SESSION_STATE], sessionState);
                    if (diffValue === undefined)
                    {
                        // Since the class name is the same and the session state is the same,
                        // we only need to specify that this name is still present.
                        result.push(objectName);

                        if (!changeDetected && oldState[i][weavecore.DynamicState.OBJECT_NAME] != objectName)
                            changeDetected = true;

                        continue;
                    }
                    sessionState = diffValue;
                }

                // save in new array and remove from lookup
                result.push(weavecore.DynamicState.create(objectName || null, className, sessionState)); // convert empty string to null
                changeDetected = true;
            }

            // Anything remaining in the lookup does not appear in newState.
            // Add DynamicState entries with an invalid className ("delete") to convey that each of these objects should be removed.
            for (objectName in oldLookup)
            {
                result.push(weavecore.DynamicState.create(objectName || null, SessionManager.DIFF_DELETE)); // convert empty string to null
                changeDetected = true;
            }

            if (changeDetected)
                return result;

            return undefined; // no diff
        }
        else // nested object
        {
            var diff = undefined; // start with no diff

            // find old properties that changed value
            for (var oldName in oldState)
            {
                diffValue = computeDiff(oldState[oldName], newState[oldName]);
                if (diffValue !== undefined)
                {
                    if (!diff)
                        diff = {};
                    diff[oldName] = diffValue;
                }
            }

            // find new properties
            for (var newName in newState)
            {
                if (oldState[newName] === undefined)
                {
                    if (!diff)
                        diff = {};
                    diff[newName] = newState[newName]; // TODO: same object pointer.. potential problem?
                }
            }

            return diff;
        }
    }
    
    
    SessionManager.prototype.combineDiff = function (baseDiff, diffToAdd){
        var baseType = typeof(baseDiff); // the type of null is 'object'
        var diffType = typeof(diffToAdd);

        // special cases
        if (baseDiff === null || baseDiff === undefined || diffToAdd === null || diffToAdd === undefined || baseType !== diffType || baseType !== 'object')
        {
            if (diffType === 'object') // not a primitive, so make a copy
                baseDiff = Object.create(diffToAdd);
            else
                baseDiff = diffToAdd;
        }
        else if (Array.isArray(baseDiff) && Array.isArray(diffToAdd))
        {
            var i;

            // If either of the arrays look like DynamicState arrays, treat as such
            if (weavecore.DynamicState.isDynamicStateArray(baseDiff) || weavecore.DynamicState.isDynamicStateArray(diffToAdd))
            {
                var typedState;
                var objectName;

                // create lookup: objectName -> old diff entry
                // temporarily turn baseDiff into an Array of object names
                var baseLookup = {};
                for (i = 0; i < baseDiff.length; i++)
                {
                    typedState = baseDiff[i];
                    // note: no error checking for typedState
                    if (typeof typedState === 'string' || typedState instanceof String || typedState === null || typedState === undefined)
                        objectName = typedState;
                    else
                        objectName = typedState[weavecore.DynamicState.OBJECT_NAME] ;
                    baseLookup[objectName] = typedState;
                    // temporarily turn baseDiff into an Array of object names
                    baseDiff[i] = objectName;
                }
                // apply each typedState diff appearing in diffToAdd
                for (i = 0; i < diffToAdd.length; i++)
                {
                    typedState = diffToAdd[i];
                    // note: no error checking for typedState
                    if (typeof typedState === 'string' || typedState instanceof String || typedState === null || typedState === undefined) 
                        objectName = typedState ;
                    else
                        objectName = typedState[weavecore.DynamicState.OBJECT_NAME];

                    // adjust names list so this name appears at the end
                    if (baseLookup.hasOwnProperty(objectName))
                    {
                        for (var j = baseDiff.indexOf(objectName); j < baseDiff.length - 1; j++)
                            baseDiff[j] = baseDiff[j + 1];
                        baseDiff[baseDiff.length - 1] = objectName;
                    }
                    else
                    {
                        baseDiff.push(objectName);
                    }

                    // apply diff
                    var oldTypedState = baseLookup[objectName];
                    if (typeof oldTypedState === 'string' || oldTypedState instanceof String  || oldTypedState === null || oldTypedState === undefined)
                    {
                        if (typeof typedState === 'string' || typedState instanceof String  || typedState === null || typedState === undefined)
                            baseLookup[objectName] = typedState; // avoid unnecessary function call overhead
                        else
                            baseLookup[objectName] = Object.create(typedState);
                    }
                    else if (!(typeof typedState === 'string' || typedState instanceof String || typedState === null || typedState === undefined)) // update dynamic state
                    {
                        var className = typedState[weavecore.DynamicState.CLASS_NAME];
                        // if new className is different and not null, start with a fresh typedState diff
                        if (className && className != oldTypedState[weavecore.DynamicState.CLASS_NAME])
                        {
                            baseLookup[objectName] = Object.create(typedState);
                        }
                        else // className hasn't changed, so combine the diffs
                        {
                            oldTypedState[weavecore.DynamicState.SESSION_STATE] = this.combineDiff(oldTypedState[weavecore.DynamicState.SESSION_STATE], typedState[weavecore.DynamicState.SESSION_STATE]);
                        }
                    }
                }
                // change baseDiff back from names to typed states
                for (i = 0; i < baseDiff.length; i++)
                    baseDiff[i] = baseLookup[baseDiff[i]];
            }
            else // not typed session state
            {
                // overwrite old Array with new Array's values
                i = baseDiff.length = diffToAdd.length;
                while (i--)
                {
                    var value = diffToAdd[i];
                    if (value === null || value === undefined || typeof value !== 'object')
                        baseDiff[i] = value; // avoid function call overhead
                    else
                        baseDiff[i] = this.combineDiff(baseDiff[i], value);
                }
            }
        }
        else // nested object
        {
            for (var newName in diffToAdd)
                baseDiff[newName] = this.combineDiff(baseDiff[newName], diffToAdd[newName]);
        }

        return baseDiff;
    }

Object.defineProperty(SessionManager,'DIFF_DELETE',{value:"delete"});
	
weavecore.SessionManager = SessionManager;
    
}());




//createjs.Ticker.setFPS(50);
//createjs.Ticker.

// constructor:
	
	this.WeaveAPI = {}
    
    //Object.defineProperty(WeaveAPI, '_sessionManager', {
           // value: new SessionManager()
        //});
    //Object.defineProperty(WeaveAPI, '_stageUtils', {
            //value: new weave.core.StageUtils()
        //});
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_IMMEDIATE', {
            value: 0
        });
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_HIGH', {
            value: 1
        });
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_NORMAL', {
            value: 2
        });
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_LOW', {
            value: 3
        });
    
   
    WeaveAPI.SessionManager = new weavecore.SessionManager();

            

    
    



// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.core)
    this.weave.core = {};*/

if (!this.weavecore)
    this.weavecore = {};

(function() {
    
      // Internal class constructor
    
    Object.defineProperty(EventCallbackCollection, 'eventTypes', {
            value: ['tick']
        });

    function EventCallbackCollection(eventManager, eventType) {
        weavecore.CallbackCollection.call(this,this.setEvent.bind(this));
        this._eventManager = eventManager;
        this._eventType = eventType;

    }
    
    EventCallbackCollection.prototype = new weavecore.CallbackCollection();
    EventCallbackCollection.prototype.constructor = EventCallbackCollection;
    
    /**
	 * This is the _preCallback
	 */
	EventCallbackCollection.prototype.setEvent = function setEvent(event)
	{
		this._eventManager.event = event;
	}

    /**
	 * This function remembers the previous event value, runs callbacks using the new event value,
	 * then restores the previous event value. This is necessary because it is possible for a popup
	 * browser window to interrupt Flash with requests in the middle of an event.
	 */
	EventCallbackCollection.prototype.runEventCallbacks = function (event)
	{
		var previousEvent = this._eventManager.event; // remember previous value
		this._runCallbacksImmediately(event); // make sure event is set before each immediate callback
		this._preCallback(previousEvent); // restore the previous value
	}

    /**
     * Call this when the stage is available to set up event listeners.
     */
    EventCallbackCollection.prototype.listenToStage = function() {
        console.log("listentostage")
        // do not create event listeners for these meta events
        //if (eventType == POINT_CLICK_EVENT || eventType == THROTTLED_MOUSE_MOVE_EVENT)
        //return;

        //if (eventType == KeyboardEvent.KEY_DOWN && Capabilities.playerType == "Desktop")
        //cancelable = false;

        // Add a listener to the capture phase so the callbacks will run before the target gets the event.
        //stage.addEventListener(eventType, captureListener, true, 0, true); // use capture phase

        // If the target is the stage, the capture listener won't be called, so add
        // an additional listener that runs callbacks when the stage is the target.
        createjs.Ticker.addEventListener(this._eventType, this._tickerListener.bind(this)); // do not use capture phase

        // when callbacks are disposed, remove the listeners
         this.addDisposeCallback(null, function() {
        //stage.removeEventListener(eventType, captureListener, true);
            createjs.Ticker.removeEventListener(this._eventType, this._tickerListener.bind(this));
        });
    };

    EventCallbackCollection.prototype._tickerListener = function(event) {
       // console.log(event);
        this._eventManager.eventTime = new Date().getTime();
        if (this._eventType === "tick") {
            if (this._eventManager.userActivity > 0 && !this._eventManager.mouseButtonDown)
                this._eventManager.userActivity--;
            this._eventManager.previousFrameElapsedTime = this._eventManager.eventTime - this._eventManager.currentFrameStartTime;
            this._eventManager.currentFrameStartTime = this._eventManager.eventTime;
            //this._eventManager.triggeredThrottledMouseThisFrame = false;
        }
        // finally, trigger callbacks for non-mouse-move events
		if (this._eventType === "tick")// altered temporarily
            this.runEventCallbacks(event);
        
    };

   
    
    weavecore.EventCallbackCollection = EventCallbackCollection;
    
//constructor
function StageUtils() {
    
    this.averageFrameTime = 0;
    
    Object.defineProperties(this, {
            eventManager: {value: new EventManager() },
			frameTimes: { value: [] },
			_stackTraceMap: { value: new Map() },
            _taskElapsedTime: { value: new Map() },
            _taskStartTime: { value: new Map() },
        
		});
    this._currentTaskStopTime = 0;

    /**
     * This is an Array of "callLater queues", each being an Array of function invocations to be done later.
     * The Arrays get populated by callLater().
     * There are four nested Arrays corresponding to the four priorities (0, 1, 2, 3) defined by static constants in WeaveAPI.
     */
    Object.defineProperties(this, {
			_priorityCallLaterQueues: { value: [      []        , []  , [], [] ] },
			_priorityAllocatedTimes:  { value: [Number.MAX_VALUE, 300 ,200, 100] }
		});
    this._activePriority = WeaveAPI.TASK_PRIORITY_IMMEDIATE + 1;// task priority that is currently being processed
    this._activePriorityElapsedTime = 0;
    this._deactivatedMaxComputationTimePerFrame = 1000;
    this._nextCallLaterPriority = WeaveAPI.TASK_PRIORITY_IMMEDIATE; // private variable to control the priority of the next callLater() internally
    this.addEventCallback("tick", null, this._handleCallLater.bind(this));
    this.maxComputationTimePerFrame = 100;
    this.maxComputationTimePerFrame_noActivity = 250;
    
}
    
StageUtils.prototype.getMaxComputationTimePerFrame = function(){
    return this.maxComputationTimePerFrame;
};
    
StageUtils.prototype.setMaxComputationTimePerFrame = function(value){
   // this.eventManager.throttledMouseMoveInterval = value;
    this.maxComputationTimePerFrame = value;
}

StageUtils.prototype.getTaskPriorityTimeAllocation = function(priority){
    return this._priorityAllocatedTimes[priority];
};
    
StageUtils.prototype.setTaskPriorityTimeAllocation = function(priority,milliseconds){
     this._priorityAllocatedTimes[priority] = Math.max(milliseconds,5);
};

StageUtils._time;
StageUtils._times = [];
    


StageUtils.prototype.callLater = function(relevantContext, method, parameters) {
    if (method === null || method === undefined) {
        console.log('StageUtils.callLater(): received null "method" parameter');
        return;
    }

    this._priorityCallLaterQueues[this._nextCallLaterPriority].push(arguments);
    this._nextCallLaterPriority = WeaveAPI.TASK_PRIORITY_IMMEDIATE;

    //if (this.debug_async_stack)
    //_stackTraceMap[arguments] = new Error("This is the stack trace from when callLater() was called.").getStackTrace();
};

StageUtils.prototype._handleCallLater = function() {
    if (this.maxComputationTimePerFrame == 0)
        this.maxComputationTimePerFrame = 100;

    var maxComputationTime;
    if (this.eventManager.useDeactivatedFrameRate)
        maxComputationTime = this._deactivatedMaxComputationTimePerFrame;
     else if (!this.eventManager.userActivity)
        maxComputationTime = this.maxComputationTimePerFrame_noActivity;
    else
        maxComputationTime = this.maxComputationTimePerFrame;
    if (!this.eventManager.event)
    {
        console.log("StageUtils.handleCallLater(): _event is null. This should never happen.");
        return;
    }
    if (this.eventManager.event.type === "tick")
    {
        //resetDebugTime();

        /*if (debug_fps)
        {
            frameTimes.push(previousFrameElapsedTime);
            if (StandardLib.sum(frameTimes) >= 1000)
            {
                averageFrameTime = StandardLib.mean(frameTimes);
                var fps:Number = StandardLib.roundSignificant(1000 / averageFrameTime, 2);
                trace(fps,'fps; max computation time',maxComputationTime);
                frameTimes.length = 0;
            }
        }*/

        if (this.eventManager.previousFrameElapsedTime > 3000)
            console.log('Previous frame took', this.eventManager.previousFrameElapsedTime, 'ms');
    }
			
    //if (UIComponentGlobals.callLaterSuspendCount > 0)
        //return;

    // The variables countdown and lastPriority are used to avoid running newly-added tasks immediately.
    // This avoids wasting time on async tasks that do nothing and return early, adding themselves back to the queue.

    var args;
    var args2; // this is set to args[2]
    var stackTrace;
    var now;
    var allStop = this.eventManager.currentFrameStartTime + maxComputationTime;

    this._currentTaskStopTime = allStop; // make sure _iterateTask knows when to stop

    // first run the functions that should be called before anything else.
    /*if (pauseForGCIfCollectionImminent != null)
    {
        var t:int = getTimer();
        pauseForGCIfCollectionImminent();
        t = getTimer() - t;
        if (t > maxComputationTimePerFrame)
            trace('paused',t,'ms for GC');
    }*/
    var queue = this._priorityCallLaterQueues[WeaveAPI.TASK_PRIORITY_IMMEDIATE];
    var countdown;
    for (countdown = queue.length; countdown > 0; countdown--)
    {
        /*if (debug_callLater)
            DebugTimer.begin();*/

        now = new Date().getTime();
        // stop when max computation time is reached for this frame
        if (now > allStop)
        {
            /*if (debug_callLater)
                DebugTimer.cancel();*/
            return;
        }

        // args: (relevantContext:Object, method:Function, parameters:Array, priority:uint)
        args = queue.shift();
        stackTrace = this._stackTraceMap[args];

        // don't call the function if the relevantContext was disposed.
        if (!WeaveAPI.SessionManager.objectWasDisposed(args[0]))
        {
            args2 = args[2];
            if (args2 != null && args2.length > 0)
                args[1].apply(null, args2);
            else
                args[1].call();
        }

        /*if (debug_callLater)
            DebugTimer.end(stackTrace);*/
    }
			
//			trace('-------');
			
			var minPriority = WeaveAPI.TASK_PRIORITY_IMMEDIATE + 1;
			var lastPriority = this._activePriority === minPriority ? this._priorityCallLaterQueues.length - 1 : this._activePriority - 1;
			var pStart = new Date().getTime();
			var pAlloc = this._priorityAllocatedTimes[this._activePriority];
			if (this.eventManager.useDeactivatedFrameRate)
				pAlloc = pAlloc * this._deactivatedMaxComputationTimePerFrame / this.maxComputationTimePerFrame;
			else if (!this.eventManager.userActivity)
				pAlloc = pAlloc * this.maxComputationTimePerFrame_noActivity / this.maxComputationTimePerFrame;
			var pStop = Math.min(allStop, pStart + pAlloc - this._activePriorityElapsedTime); // continue where we left off
			queue = this._priorityCallLaterQueues[this._activePriority];
			countdown = queue.length;
			while (true)
			{
				/*if (debug_callLater)
					DebugTimer.begin();*/
				
				now = new Date().getTime();
				if (countdown === 0 || now > pStop)
				{
					// add the time we just spent on this priority
					this._activePriorityElapsedTime += now - pStart;
					
					// if max computation time was reached for this frame or we have visited all priorities, stop now
					if (now > allStop || this._activePriority === lastPriority)
					{
						/*if (debug_callLater)
							DebugTimer.cancel();
						if (debug_fps)
							trace('spent',currentFrameElapsedTime,'ms');*/
						return;
					}
					
					// see if there are any entries left in the queues (except for the immediate queue)
					var remaining = 0;
					for (var i = minPriority; i < this._priorityCallLaterQueues.length; i++)
						remaining += this._priorityCallLaterQueues[i].length;
					// stop if no more entries
					if (remaining === 0)
					{
						/*if (debug_callLater)
							DebugTimer.cancel();*/
						break;
					}
					
					// switch to next priority, reset elapsed time
					this._activePriority++;
					this._activePriorityElapsedTime = 0;
					if (this._activePriority === this._priorityCallLaterQueues.length)
						this._activePriority = minPriority;
					pStart = now;
					pAlloc = this._priorityAllocatedTimes[_activePriority];
					if (this.eventManager.useDeactivatedFrameRate)
						pAlloc = pAlloc * this._deactivatedMaxComputationTimePerFrame / this.maxComputationTimePerFrame;
					else if (!this.eventManager.userActivity)
						pAlloc = pAlloc * this.maxComputationTimePerFrame_noActivity / this.maxComputationTimePerFrame;
					pStop = Math.min(allStop, pStart + pAlloc);
					queue = this._priorityCallLaterQueues[this._activePriority];
					countdown = queue.length;
					
					// restart loop to check stopping condition
					/*if (debug_callLater)
						DebugTimer.cancel();*/
					continue;
				}
				
				countdown--;
				
//				trace('p',_activePriority,pElapsed,'/',pAlloc);
				_currentTaskStopTime = pStop; // make sure _iterateTask knows when to stop
				
				// call the next function in the queue
				// args: (relevantContext:Object, method:Function, parameters:Array, priority:uint)
				args = queue.shift();
				stackTrace = this._stackTraceMap[args]; // check this for debugging where the call came from
				
//				WeaveAPI.SessionManager.unassignBusyTask(args);
				
				// don't call the function if the relevantContext was disposed.
				if (!WeaveAPI.SessionManager.objectWasDisposed(args[0]))
                {
					// TODO: PROFILING: check how long this function takes to execute.
					// if it takes a long time (> 1000 ms), something's wrong...
					args2 = args[2];
					if (args2 != null && args2.length > 0)
						args[1].apply(null, args2);
					else
						args[1].call();
				}
				
				/*if (debug_callLater)
					DebugTimer.end(stackTrace);*/
			}
    
};

StageUtils.prototype.addEventCallback = function(eventType, relevantContext, callback, runCallbackNow) {
    // set default parameter value
    if (runCallbackNow === null || runCallbackNow === undefined) {
        runCallbackNow = false;
    }
    var cc = this.eventManager.callbackCollections[eventType];
    if (cc !== null && cc !== undefined) {
        cc.addImmediateCallback(relevantContext, callback, runCallbackNow);
    } else {
        console.log("(StageUtils) Unsupported event: ", eventType);
    }
};



  weavecore.StageUtils = new StageUtils();
     
    
    function EventManager() {
        Object.defineProperty(this, 'callbackCollections', {
                value: {}
            });
        this.userActivity = 0; // greater than 0 when there was user activity since the last frame.
        this.event = null;
        this.eventTime = 0;
        this.shiftKey = false;
        this.altKey = false;
        this.ctrlKey = false;
        this.mouseButtonDown = false;
    
        this.currentFrameStartTime = new Date().getTime(); // this is the result of getTimer() on the last ENTER_FRAME event.
        this.previousFrameElapsedTime = 0; // this is the amount of time it took to process the previous frame.
        this.pointClicked = false;
        this.deactivated = true;// true when application is deactivated
        this.useDeactivatedFrameRate = false;
        
        this.triggeredThrottledMouseThisFrame = false; // set to false on enterFrame, set to true on throttled mouse move
	   this.nextThrottledMouseMoveTime = 0; // time threshold before triggering throttled mouse move again
	   this.throttledMouseMoveInterval = 100; // time threshold before triggering throttled mouse move again

        // create a new callback collection for each type of event
        for (var j = 0; j < EventCallbackCollection.eventTypes.length; j++) {
            var type = EventCallbackCollection.eventTypes[j]
            this.callbackCollections[type] = new EventCallbackCollection(this, type);
            // this.callbackCollections[type] = WeaveAPI.SessionManager.registerDisposableChild(WeaveAPI.globalHashMap, new EventCallbackCollection(this, type));
        }

        //add event listeners
        for (var eventtype  in this.callbackCollections) {
            this.callbackCollections[eventtype].listenToStage();
        }
        this.event;
    }
    
    
    
    
    weavecore.EventManager = EventManager;



}());
// namespace
/*if (!this.weave)
    this.weave = {};
if (!this.weave.core)
    this.weave.core = {};*/

if (!this.weavecore)
    this.weavecore = {};

(function() {
    /**
     * If a defaultValue is specified, callbacks will be triggered in a later frame unless they have already been triggered before then.
     * This behavior is desirable because it allows the initial value to be handled by the same callbacks that handles new values.
     * @param sessionStateType The type of values accepted for this sessioned property.
     * @param verifier A function that returns true or false to verify that a value is accepted as a session state or not.  The function signature should be  function(value:*):Boolean.
     * @param defaultValue The default value for the session state.
     * @param defaultValueTriggersCallbacks Set this to false if you do not want the callbacks to be triggered one frame later after setting the default value.
     */

    function LinkableVariable(sessionStateType, verifier, defaultValue, defaultValueTriggersCallbacks) {
        if(sessionStateType === undefined)sessionStateType = null;
        if(verifier === undefined)verifier = null;
        if(defaultValueTriggersCallbacks === undefined)defaultValueTriggersCallbacks = true;
        
       // weave.core.CallbackCollection.call(this);
        weavecore.CallbackCollection.call(this);

        this._verifier = verifier;

        /**
         * This is true if the session state has been set at least once.
         */
        this._sessionStateWasSet = false;

        /**
         * This is true if the _sessionStateType is a primitive type.
         */
        this._primitiveType = false;

        /**
         * Type restriction passed in to the constructor.
         */
        this._sessionStateType = null;

        /**
         * Cannot be modified externally because it is not returned by getSessionState()
         */
        this._sessionStateInternal = undefined;

        /**
         * Available externally via getSessionState()
         */
        this._sessionStateExternal = undefined;

        this._locked = false;

        if (sessionStateType !== Object) {
            this._sessionStateType = sessionStateType;
            this._primitiveType = this._sessionStateType === "string" || this._sessionStateType === "number" || this._sessionStateType === "boolean";
        }
        if (typeof defaultValue !== "undefined") {
            this.setSessionState(defaultValue);

            // If callbacks were triggered, make sure callbacks are triggered again one frame later when
            // it is possible for other classes to have a pointer to this object and retrieve the value.
            if (defaultValueTriggersCallbacks && this._triggerCounter > weavecore.CallbackCollection.DEFAULT_TRIGGER_COUNT)
              weavecore.StageUtils.callLater(this, _defaultValueTrigger.bind(this));
        }
    }

        function _defaultValueTrigger() {
            // unless callbacks were triggered again since the default value was set, trigger callbacks now
            if (!this._wasDisposed && this._triggerCounter === weavecore.CallbackCollection.DEFAULT_TRIGGER_COUNT + 1)
                this.triggerCallbacks();

        }


        function verifyValue(value) {
            return this._verifier === null || this._verifier === undefined || this._verifier(value);
        }
    
     LinkableVariable.prototype = new weavecore.CallbackCollection();
    LinkableVariable.prototype.constructor = LinkableVariable;

        /**
         * The type restriction passed in to the constructor.
         */
        LinkableVariable.prototype.getSessionStateType = function() {
            return this._sessionStateType;
        };

        LinkableVariable.prototype.getSessionState = function() {
            return this._sessionStateExternal;
        };

        LinkableVariable.prototype.setSessionState = function(value) {
            if (this._locked)
                return;

            // cast value now in case it is not the appropriate type
            if (this._sessionStateType !== null && this._sessionStateType !== undefined)
                value = value;

            // stop if verifier says it's not an accepted value
            if (this._verifier !== null && this._verifier !== undefined && !this._verifier(value))
                return;

            var wasCopied = false;
            var type = null;
            if (value !== null && value !== undefined) {
                type = typeof(value);

                if (type === 'object' && value.constructor !== Object && value.constructor !== Array) {
                    // convert to dynamic Object prior to sessionStateEquals comparison
                    value = Object.create(value);
                    wasCopied = true;
                }
            }

            // If this is the first time we are calling setSessionState(), including
            // from the constructor, don't bother checking sessionStateEquals().
            // Otherwise, stop if the value did not change.
            if (this._sessionStateWasSet && this.sessionStateEquals(value))
                return;

            // If the value is a dynamic object, save a copy because we don't want
            // two LinkableVariables to share the same object as their session state.
            if (type === 'object') {
                if (!wasCopied)
                    value = Object.create(value);

                // save external copy, accessible via getSessionState()
                this._sessionStateExternal = value;

                // save internal copy
                this._sessionStateInternal = Object.create(value);
            } else {
                // save primitive value
                this._sessionStateExternal = this._sessionStateInternal = value;
            }

            // remember that we have set the session state at least once.
            this._sessionStateWasSet = true;

            this.triggerCallbacks();
        };

        /**
         * This function is used in setSessionState() to determine if the value has changed or not.
         * Classes that extend this class may override this function.
         */
        LinkableVariable.prototype.sessionStateEquals = function(otherSessionState) {
            if (this._primitiveType)
                return this._sessionStateInternal === otherSessionState;

            return weavecore.StandardLib.compare(this._sessionStateInternal, otherSessionState) === 0;
        };


        /**
         * This function may be called to detect change to a non-primitive session state in case it has been modified externally.
         */
        LinkableVariable.prototype.detectChanges = function() {
            if (!this.sessionStateEquals(this._sessionStateExternal))
                this.triggerCallbacks();
        };

        LinkableVariable.prototype.lock = function() {
            this._locked = true;
        };

        LinkableVariable.prototype.__defineGetter__("locked ", function() {
            return this._locked;
        });

        LinkableVariable.prototype.dispose = function() {
            weavecore.CallbackCollection.prototype.dispose.call(this);
            this.setSessionState(null);
        };
    

    //LinkableVariable.prototype = new weave.core.CallbackCollection();
    
    
  //  weave.core.LinkableVariable = LinkableVariable;
    weavecore.LinkableVariable = LinkableVariable;

}());
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
if (!this.weavecore)
    this.weavecore = {};

(function() {
    
function ChildListCallbackInterface(){
	
    // specify the preCallback function in super() so list callback
    // variables will be set before each change callback.
	weavecore.CallbackCollection.call(this,this._setCallbackVariables);
	
    this._lastNameAdded = null; // returned by public getter
    this._lastObjectAdded = null; // returned by public getter
	this._lastNameRemoved = null; // returned by public getter
	this._lastObjectRemoved = null; // returned by public getter
	
}
    
     ChildListCallbackInterface.prototype = new weavecore.CallbackCollection();
    ChildListCallbackInterface.prototype.constructor = ChildListCallbackInterface;
    
     
	ChildListCallbackInterface.prototype._setCallbackVariables = function (name, objectAdded, objectRemoved){
		this._lastNameAdded = objectAdded ? name : null;
		this._lastObjectAdded = objectAdded;
		this._lastNameRemoved = objectRemoved ? name : null;
		this._lastObjectRemoved = objectRemoved;
	}
	
	ChildListCallbackInterface.prototype.runCallbacks = function (name, objectAdded, objectRemoved){
        // remember previous values
        var _name = this._lastNameAdded || this._lastNameRemoved;
        var _added = this._lastObjectAdded;
        var _removed = this._lastObjectRemoved;

        this._runCallbacksImmediately(name, objectAdded, objectRemoved);

        // restore previous values (in case an external JavaScript popup caused us to interrupt something else)
        this._setCallbackVariables.call(this,_name, _added, _removed);
    }

	
	ChildListCallbackInterface.prototype.__defineGetter__("lastNameAdded", function(){
        return this._lastNameAdded;
    });
	
	ChildListCallbackInterface.prototype.__defineGetter__("lastObjectAdded", function(){
        return this._lastObjectAdded;
    });
	
	ChildListCallbackInterface.prototype.__defineGetter__("lastNameRemoved", function(){
        return this._lastNameRemoved;
    });
	
	ChildListCallbackInterface.prototype.__defineGetter__("lastObjectRemoved", function(){
        return this._lastObjectRemoved;
	});
    
    weavecore.ChildListCallbackInterface = ChildListCallbackInterface;
    
}());
if (!this.weavecore)
    this.weavecore = {};

(function() {
    function LinkableHashMap(typeRestriction){
    
    weavecore.CallbackCollection.call(this);
    
	this._typeRestriction; // restricts the type of object that can be stored
	this._typeRestrictionClassName; // qualified class name of _typeRestriction
	
	if (typeRestriction !== null && typeRestriction !== undefined ){
		this._typeRestriction = typeRestriction;
		this._typeRestrictionClassName = typeRestriction.name;
	}
    
    Object.defineProperty(this,'_childListCallbacks',{value:WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.ChildListCallbackInterface())});
	Object.defineProperty(this,'_orderedNames',{value:[]});// an ordered list of names appearing in _nameToObjectMap
	Object.defineProperty(this,'_nameToObjectMap',{value:{}});// maps an identifying name to an object
	
    Object.defineProperty(this,'_objectToNameMap',{value:new Map()}); // maps an object to an identifying name
    Object.defineProperty(this,'_nameIsLocked',{value:{}});// maps an identifying name to a value of true if that name is locked.
    Object.defineProperty(this,'_previousNameMap',{value:{}});// maps a previously used name to a value of true.  used when generating unique names.
}
    
     LinkableHashMap.prototype = new weavecore.CallbackCollection();
    LinkableHashMap.prototype.constructor = LinkableHashMap;
    
    LinkableHashMap.prototype.__defineGetter__("typeRestriction", function(){
        return this._typeRestriction;
    });
	
	
    
    LinkableHashMap.prototype.__defineGetter__("childListCallbacks", function(){
        return this._childListCallbacks;
    });
	

	
	LinkableHashMap.prototype.getNames  = function(filter ){
		var result = [];
		for (var i = 0; i < this._orderedNames.length; i++)
		{
			var name = this._orderedNames[i];
			if (filter === null || filter === undefined || this._nameToObjectMap[name] instanceof filter )
				result.push(name);
		}
		return result;
	}
	
	LinkableHashMap.prototype.getObjects  = function(filter){
		var result = [];
		for (var i = 0; i < this._orderedNames.length; i++)
		{
			var name = this._orderedNames[i];
			var object = this._nameToObjectMap[name];
			if (filter === null || filter === undefined || object instanceof filter )
				result.push(object);
		}
		return result;
	}
	
	LinkableHashMap.prototype.getObject =  function(name){
		return this._nameToObjectMap[name];
	}
	
	LinkableHashMap.prototype.getName = function(object){
		return this._objectToNameMap.get(object);
	}
	
	LinkableHashMap.prototype.setNameOrder =  function(newOrder){
		var changeDetected = false;
		var name;
		var i;
		var originalNameCount = this._orderedNames.length; // remembers how many names existed before appending
		var haveSeen = {}; // to remember which names have been seen in newOrder
		// append each name in newOrder to the end of _orderedNames
		for (i = 0; i < newOrder.length; i++)
		{
			name = newOrder[i] ;
			// ignore bogus names and append each name only once.
			if (this._nameToObjectMap[name] === undefined || haveSeen[name] !== undefined)
				continue;
			haveSeen[name] = true; // remember that this name was appended to the end of the list
			this._orderedNames.push(name); // add this name to the end of the list
		}
		// Now compare the ordered appended items to the end of the original list.
		// If the order differs, set _nameOrderChanged to true.
		// Meanwhile, set old name entries to null so they will be removed in the next pass.
		var appendedCount = this._orderedNames.length - originalNameCount;
		for (i = 0; i < appendedCount; i++)
		{
			var newIndex = originalNameCount + i;
			var oldIndex = this._orderedNames.indexOf(this._orderedNames[newIndex]);
			if (newIndex - oldIndex !== appendedCount)
				changeDetected = true;
			this._orderedNames[oldIndex] = null;
		}
		// remove array items that have been set to null
		var out = 0;
		for (i = 0; i < this._orderedNames.length; i++)
			if (this._orderedNames[i] !== null && this._orderedNames[i] !== undefined)
				this._orderedNames[out++] = this._orderedNames[i];
		this._orderedNames.length = out;
		// if the name order changed, run child list callbacks
		if (changeDetected)
			this._childListCallbacks.runCallbacks(null, null, null);
	}
	
	LinkableHashMap.prototype.requestObject = function(name, classDef, lockObject){
		var className = classDef ? classDef.name : null;
		var result = this._initObjectByClassName.call(this,name, className, lockObject);
		return classDef ? result : null;
	}
	
	LinkableHashMap.prototype.requestObjectCopy = function(name, objectToCopy){
		if (objectToCopy === null || objectToCopy === undefined ){
			this.removeObject(name);
			return null;
		}
		
		this.delayCallbacks(); // make sure callbacks only trigger once
		//var className = getQualifiedClassName(objectToCopy);
		var classDef = objectToCopy.constructor; //ClassUtils.getClassDefinition(className);
		var sessionState = WeaveAPI.SessionManager.getSessionState(objectToCopy);
		var object = requestObject(name, classDef, false);
		if (object !== null && object !== undefined)
			WeaveAPI.SessionManager.setSessionState(object, sessionState);
		this.resumeCallbacks();
		
		return object;
	}
	
	
	LinkableHashMap.prototype.renameObject = function(oldName, newName){
		if (oldName !== newName){
			this.delayCallbacks();
			
			// prepare a name order that will put the new name in the same place the old name was
			var newNameOrder = this._orderedNames.concat();
			var index = newNameOrder.indexOf(oldName);
			if (index >= 0)
				newNameOrder.splice(index, 1, newName);
			
			this.requestObjectCopy(newName, getObject(oldName));
			this.removeObject(oldName);
			this.setNameOrder(newNameOrder);
			
			this.resumeCallbacks();
		}
		return this.getObject(newName);
	}
	
	/**
	 * If there is an existing object associated with the specified name, it will be kept if it
	 * is the specified type, or replaced with a new instance of the specified type if it is not.
	 * @param name The identifying name of a new or existing object.  If this is null, a new one will be generated.
	 * @param className The qualified class name of the desired object type.
	 * @param lockObject If this is set to true, lockObject() will be called on the given name.
	 * @return The object associated with the given name, or null if an error occurred.
	 */
	LinkableHashMap.prototype._initObjectByClassName = function(name, className, lockObject){
		if (className){
			// if no name is specified, generate a unique one now.
			if (!name)
				name = generateUniqueName(className.split("::").pop());
			if ( className !== "delete")
			{
				//try{
					// If this name is not associated with an object of the specified type,
					// associate the name with a new object of the specified type.
					var classDef = eval('weavecore.'+className);//hardcoded weavecore. 
					var object = this._nameToObjectMap[name];
					if (!object || object.constructor !== classDef)
						this._createAndSaveNewObject.call(this,name, classDef, lockObject);
					else if (lockObject)
						this.lockObject(name);
              //  }
				//catch (e){
                    //console.log(e);
//						enterDebugger();
               // }
			}
			else
			{
				this.removeObject(name);
			}
		}
		else{
			this.removeObject(name);
		}
		return this._nameToObjectMap[name] ;
	}
	/**
	 * (private)
	 * @param name The identifying name to associate with a new object.
	 * @param classDef The Class definition used to instantiate a new object.
	 */
	LinkableHashMap.prototype._createAndSaveNewObject = function(name, classDef, lockObject)
	{
		if (this._nameIsLocked[name])
			return;

		// remove any object currently using this name
		this.removeObject(name);
		// create a new object
		var object = new classDef();
		// register the object as a child of this LinkableHashMap
		WeaveAPI.SessionManager.registerLinkableChild(this, object);
		// save the name-object mappings
		this._nameToObjectMap[name] = object;
		this._objectToNameMap.set(object,name);
		// add the name to the end of _orderedNames
		this._orderedNames.push(name);
		// remember that this name was used.
		this._previousNameMap[name] = true;
		
		if (lockObject)
			this.lockObject(name);

		// make sure the callback variables signal that the object was added
		this._childListCallbacks.runCallbacks(name, object, null);
	}
	/**
	 * This function will lock an object in place for a given identifying name.
	 * If there is no object using the specified name, this function will have no effect.
	 * @param name The identifying name of an object to lock in place.
	 */
	LinkableHashMap.prototype.lockObject = function(name){
		if (name !== null && name !== undefined && this._nameToObjectMap[name] !== null && this._nameToObjectMap[name] !== undefined)
			this._nameIsLocked[name] = true;
	}
	
	LinkableHashMap.prototype.objectIsLocked =  function(name){
		return this._nameIsLocked[name] ? true : false;
	}
	
	LinkableHashMap.prototype.removeObject =  function(name){
		if (!name || this._nameIsLocked[name])
			return;
		
		var object = this._nameToObjectMap[name] ;
		if (object === null || object === undefined)
			return; // do nothing if the name isn't mapped to an object.
		
		//trace(LinkableHashMap, "removeObject",name,object);
		// remove name & associated object
		delete this._nameToObjectMap[name];
        this._objectToNameMap.delete(object);
		var index = this._orderedNames.indexOf(name);
		this._orderedNames.splice(index, 1);

		// make sure the callback variables signal that the object was removed
		this._childListCallbacks.runCallbacks(name, null, object);

		// dispose the object AFTER the callbacks know that the object was removed
		WeaveAPI.SessionManager.disposeObject(object);
	}

	
	LinkableHashMap.prototype.removeAllObjects =  function(){
		this.delayCallbacks();
        var orderedNamesCopy = this._orderedNames.concat();
		for (var i = 0; i < orderedNamesCopy.length; i++){
			this.removeObject(orderedNamesCopy[i]);
        }
		this.resumeCallbacks();
	}
	
	/**
	 * This function removes all objects from this LinkableHashMap.
	 * @inheritDoc
	 */
	LinkableHashMap.prototype.dispose =  function dispose(){
	
		CallbackCollection.prototype.dispose.call(this);
		
		// first, remove all objects that aren't locked
		this.removeAllObjects();
		
		// remove all locked objects
         var orderedNamesCopy = this._orderedNames.concat();
		for (var i = 0; i < orderedNamesCopy.length; i++){
            var name = orderedNamesCopy[i];
			this._nameIsLocked[name] = undefined; // make sure removeObject() will carry out its action
			this.removeObject(name);
		}
	}

	
	LinkableHashMap.prototype.generateUniqueName =  function(baseName){
		var count = 1;
		var name = baseName;
		while (this._previousNameMap[name] !== undefined)
			name = baseName + (++count);
		return name;
	}

	/**
	 * @inheritDoc
	 */
	LinkableHashMap.prototype.getSessionState =  function(){
		var result = new Array(this._orderedNames.length);
		for (var i = 0; i < this._orderedNames.length; i++){
			var name = this._orderedNames[i];
			var object = this._nameToObjectMap[name];
			result[i] = weavecore.DynamicState.create(
					name,
					object.constructor.name,
					WeaveAPI.SessionManager.getSessionState(object)
				);
		}
		//trace(LinkableHashMap, "getSessionState LinkableHashMap " + ObjectUtil.toString(result));
		return result;
	}
	
	LinkableHashMap.prototype.setSessionState =  function(newStateArray, removeMissingDynamicObjects){
		// special case - no change
		if (newStateArray === null || newStateArray === undefined)
			return;
		
		this.delayCallbacks();
		
		//trace(LinkableHashMap, "setSessionState "+setMissingValuesToNull, ObjectUtil.toString(newState.qualifiedClassNames), ObjectUtil.toString(newState));
		// first pass: make sure the types match and sessioned properties are instantiated.
		var i;
		var objectName;
		var className;
		var typedState;
		var remainingObjects = removeMissingDynamicObjects ? {} : null; // maps an objectName to a value of true
		var newObjects = {}; // maps an objectName to a value of true if the object is newly created as a result of setting the session state
		var newNameOrder = []; // the order the object names appear in the vector
		if (newStateArray !== null && newStateArray !== undefined){
			// initialize all the objects before setting their session states because they may refer to each other.
			for (i = 0; i < newStateArray.length; i++){
				typedState = newStateArray[i];
				if (!weavecore.DynamicState.isDynamicState(typedState))
					continue;
				objectName = typedState[weavecore.DynamicState.OBJECT_NAME];
				className = typedState[weavecore.DynamicState.CLASS_NAME];
				// ignore objects that do not have a name because they may not load the same way on different application instances.
				if (objectName === null || objectName === undefined)
					continue;
				// if className is not specified, make no change
				if (className === null || className === undefined)
					continue;
				// initialize object and remember if a new one was just created
				if (this._nameToObjectMap[objectName] !== this._initObjectByClassName.call(this,objectName, className))
					newObjects[objectName] = true;
			}
			// second pass: copy the session state for each property that is defined.
			// Also remember the ordered list of names that appear in the session state.
			for (i = 0; i < newStateArray.length; i++){
				typedState = newStateArray[i];
				if (typeof(typedState) === "string")
				{
					objectName = typedState ;
					if (removeMissingDynamicObjects)
						remainingObjects[objectName] = true;
					newNameOrder.push(objectName);
					continue;
				}
				
				if (!weavecore.DynamicState.isDynamicState(typedState))
					continue;
				objectName = typedState[weavecore.DynamicState.OBJECT_NAME];
				if (objectName === null || objectName === undefined)
					continue;
				var object = this._nameToObjectMap[objectName] ;
				if (object === null || object === undefined)
                    continue;
				// if object is newly created, we want to apply an absolute session state
				WeaveAPI.SessionManager.setSessionState(object, typedState[weavecore.DynamicState.SESSION_STATE], newObjects[objectName] || removeMissingDynamicObjects);
				if (removeMissingDynamicObjects)
					remainingObjects[objectName] = true;
				newNameOrder.push(objectName);
			}
		}
		if (removeMissingDynamicObjects){
			// third pass: remove objects based on the Boolean flags in remainingObjects.
            var orderedNamesCopy = this._orderedNames.concat();
            for (var j = 0; j < orderedNamesCopy.length; j++){
                var objectName = torderedNamesCopy[j];
				if (remainingObjects[objectName] !== true){
					//trace(LinkableHashMap, "missing value: "+objectName);
					this.removeObject(objectName);
				}
			}
		}
		// update name order AFTER objects have been added and removed.
		this.setNameOrder(newNameOrder);
		
		this.resumeCallbacks();
	}
    
    weavecore.LinkableHashMap = LinkableHashMap;
   // WeaveAPI.root = new LinkableHashMap();
    
}());
if (!this.weavecore)
    this.weavecore = {};

(function() {
    
    function LogEntry(id, forward, backward, triggerDelay, diffDuration)
	{
		this.id = id;
		this.forward = forward; // the diff for applying redo
		this.backward = backward;// the diff for applying undo
		this.triggerDelay = triggerDelay;// the length of time between the last synchronization and the diff
		this.diffDuration = diffDuration;// the length of time in which the diff took place	
	}

	/**
	 * This will convert an Array of generic objects to an Array of LogEntry objects.
	 * Generic objects are easier to create backwards compatibility for.
	 */
	LogEntry.convertGenericObjectsToLogEntries = function(array,defaultTriggerDelay){
		for (var i = 0; i < array.length; i++){
			var o = array[i];
			if (!(o instanceof LogEntry))
				array[i] = new LogEntry(o.id, o.forward, o.backward, o.triggerDelay || defaultTriggerDelay, o.diffDuration);
		}
		return array;
	}
    function getTimer() {
		var start = new Date().getTime();			
		return start;
	}
    
    function SessionStateLog(subject, syncDelay){
        // set default values
        if(syncDelay === undefined)
            syncDelay = 0;
        this._subject = subject; // the object we are monitoring
        this._syncDelay = syncDelay;// the number of milliseconds to wait before automatically synchronizing
        this._prevState = WeaveAPI.SessionManager.getSessionState(this._subject); // remember the initial state
        this.enableHistoryRewrite = true;
    
    
    
        /**
         * When this is set to true, changes in the session state of the subject will be automatically logged.
         */
        SessionStateLog.prototype.enableLogging = WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), this.synchronizeNow.bind(this));


        WeaveAPI.SessionManager.registerDisposableChild(this._subject, this); // make sure this is disposed when _subject is disposed

        var cc = WeaveAPI.SessionManager.getCallbackCollection(this._subject);
        cc.addImmediateCallback(this, this._immediateCallback.bind(this));
        cc.addGroupedCallback(this, this._groupedCallback.bind(this));




        this._undoHistory = []; // diffs that can be undone
        this._redoHistory = []; // diffs that can be redone
        this._nextId = 0; // gets incremented each time a new diff is created
        this._undoActive = false; // true while an undo operation is active
        this._redoActive = false; // true while a redo operation is active

        this._syncTime = getTimer(); // this is set to getTimer() when synchronization occurs
        this._triggerDelay = -1; // this is set to (getTimer() - _syncTime) when immediate callbacks are triggered for the first time since the last synchronization occurred
        this._saveTime = 0; // this is set to getTimer() + _syncDelay to determine when the next diff should be computed and logged
        this._savePending = false; // true when a diff should be computed
	
       Object.defineProperty(SessionStateLog,'debug',{value:true , writable:true});
	
}
    
    
     /**
	 * @inheritDoc
	 */		
	SessionStateLog.prototype.dispose =  function()
	{
		if (this._undoHistory === null || this._undoHistory === undefined)
			console.log("SessionStateLog.dispose() called more than once");
		
		this._subject = null;
		this._undoHistory = null;
		this._redoHistory = null;
	}
    
    /**
	 * This function will save any pending diff in session state.
	 * Use this function only when necessary (for example, when writing a collaboration service that must synchronize).
	 */
	SessionStateLog.prototype.synchronizeNow = function()
	{
		this._saveDiff.call(this,true);
	}
	
	
	
	/**
	 * This gets called as an immediate callback of the subject.
	 */		
	SessionStateLog.prototype._immediateCallback = function()
	{
		if (!this.enableLogging.value)
			return;
		
		// we have to wait until grouped callbacks are called before we save the diff
		this._saveTime = Number.MAX_VALUE;
		
		// make sure only one call to saveDiff() is pending
		if (!this._savePending)
		{
			this._savePending = true;
			this._saveDiff.call(this);
		}
        
		
		if (SessionStateLog.debug && (this._undoActive || this._redoActive))
		{
			var state = WeaveAPI.SessionManager.getSessionState(this._subject);
			var forwardDiff = WeaveAPI.SessionManager.computeDiff(this._prevState, state);
			console.log('immediate diff:', forwardDiff);
		}
	}
    
    /**
		 * This gets called as a grouped callback of the subject.
		 */
    SessionStateLog.prototype._groupedCallback = function()
    {
        if (!this.enableLogging.value)
            return;

        // Since grouped callbacks are currently running, it means something changed, so make sure the diff is saved.
        this._immediateCallback();
        // It is ok to save a diff some time after the last time grouped callbacks are called.
        // If callbacks are triggered again before the next frame, the immediateCallback will reset this value.
        this._saveTime = getTimer() + this._syncDelay;

        if (SessionStateLog.debug && (this._undoActive || this._redoActive))
        {
            var state = WeaveAPI.SessionManager.getSessionState(this._subject);
            var forwardDiff= WeaveAPI.SessionManager.computeDiff(this._prevState, state);
            console.log('grouped diff:', forwardDiff);
        }
    }
	
	/**
	 * This will save a diff in the history, if there is any.
	 * @param immediately Set to true if it should be saved immediately, or false if it can wait.
	 */
	SessionStateLog.prototype._saveDiff = function(immediately)
	{
        //console.log("save difference is called");
        if(immediately === undefined){
            immediately = false;
        }
		if (!this.enableLogging.value)
		{
			this._savePending = false;
			return;
		}
		
		var currentTime = getTimer();
		
		// remember how long it's been since the last synchronization
		if (this._triggerDelay < 0)
			this._triggerDelay = currentTime - this._rsyncTime;
		
		if (!immediately && getTimer() < this._saveTime)
		{
           // console.log("save difference is Paused");
			// we have to wait until the next frame to save the diff because grouped callbacks haven't finished.
			weavecore.StageUtils.callLater(this, this._saveDiff.bind(this));
            return;
		}
		
		var cc = WeaveAPI.SessionManager.getCallbackCollection(this);
		cc.delayCallbacks.call(cc);
        
        // console.log("save difference is executed");
		
		var state = WeaveAPI.SessionManager.getSessionState(this._subject);
		var forwardDiff = WeaveAPI.SessionManager.computeDiff(this._prevState, state);
		if (forwardDiff !== undefined)
		{
			var diffDuration = currentTime - (this._rsyncTime + this._triggerDelay);
			var backwardDiff = WeaveAPI.SessionManager.computeDiff(state, this._prevState);
			var oldEntry;
			var newEntry;
			if (this._undoActive)
			{
				// To prevent new undo history from being added as a result of applying an undo, overwrite first redo entry.
				// Keep existing delay/duration.
				oldEntry = this._redoHistory[0]; 
				newEntry = new LogEntry(this._nextId++, backwardDiff, forwardDiff, oldEntry.triggerDelay, oldEntry.diffDuration);
				if (this.enableHistoryRewrite)
				{
					this._redoHistory[0] = newEntry;
				}
				else if (StandardLib.compare(oldEntry.forward, newEntry.forward) !== 0)
				{
					this._redoHistory.unshift(newEntry);
				}
			}
			else
			{
				newEntry = new LogEntry(this._nextId++, forwardDiff, backwardDiff, this._triggerDelay, diffDuration);
				if (this._redoActive)
				{
					// To prevent new undo history from being added as a result of applying a redo, overwrite last undo entry.
					// Keep existing delay/duration.
					oldEntry = this._undoHistory.pop();
					newEntry.triggerDelay = oldEntry.triggerDelay;
					newEntry.diffDuration = oldEntry.diffDuration;
					
					if (!this.enableHistoryRewrite && StandardLib.compare(oldEntry.forward, newEntry.forward) === 0)
						newEntry = oldEntry; // keep old entry
				}
				// save new undo entry
				this._undoHistory.push(newEntry);
			}
			
			if (SessionStateLog.debug)
				debugHistory.call(this,newEntry);
			
			this._rsyncTime = currentTime; // remember when diff was saved
			cc.triggerCallbacks.call(cc);
		}
		
		// always reset sync time after undo/redo even if there was no new diff
		if (this._undoActive || this._redoActive)
			this._rsyncTime = currentTime;
		this._prevState = state;
		this._undoActive = false;
		this._redoActive = false;
		this._savePending = false;
		this._triggerDelay = -1;
		
		cc.resumeCallbacks.call(cc);
	}

	
	
	/**
	 * This will undo a number of steps from the saved history.
	 * @param numberOfSteps The number of steps to undo.
	 */
	SessionStateLog.prototype.undo = function(numberOfSteps){
        if(isNaN(numberOfSteps))
            numberOfSteps = 1;
		this.applyDiffs.call(this,-numberOfSteps);
	}
	
	/**
	 * This will redo a number of steps that have been previously undone.
	 * @param numberOfSteps The number of steps to redo.
	 */
	SessionStateLog.prototype.redo = function(numberOfSteps){
        if(isNaN(numberOfSteps))
            numberOfSteps = 1;
		this.applyDiffs.call(this,numberOfSteps);
	}
    
    /**
		 * This will clear all undo and redo history.
		 * @param directional Zero will clear everything. Set this to -1 to clear all undos or 1 to clear all redos.
		 */
		SessionStateLog.prototype.clearHistory= function(directional)
		{
            if(directional === undefined) directional = 0;
			var cc = WeaveAPI.SessionManager.getCallbackCollection(this);
			cc.delayCallbacks();
			
			this.synchronizeNow();
			
			if (directional <= 0)
			{
				if (this._undoHistory.length > 0)
					cc.triggerCallbacks();
				this._undoHistory.length = 0;
			}
			if (directional >= 0)
			{
				if (this._redoHistory.length > 0)
					cc.triggerCallbacks();
				this._redoHistory.length = 0;
			}
			
			cc.resumeCallbacks();
		}
	
	/**
	 * This will apply a number of undo or redo steps.
	 * @param delta The number of steps to undo (negative) or redo (positive).
	 */
	SessionStateLog.prototype.applyDiffs = function (delta)
	{
		var stepsRemaining = Math.min(Math.abs(delta), delta < 0 ? this._undoHistory.length : this._redoHistory.length);
		if (stepsRemaining > 0){
			var logEntry;
			var diff;
			var debug = SessionStateLog.debug && stepsRemaining === 1;
			
			// if something changed and we're not currently undoing/redoing, save the diff now
			if (this._savePending && !this._undoActive && !this._redoActive)
				this.synchronizeNow();
			
			var combine = stepsRemaining > 2;
			var baseDiff = null;
			WeaveAPI.SessionManager.getCallbackCollection(this._subject).delayCallbacks.call(this._subject);
			// when logging is disabled, revert to previous state before applying diffs
			if (!this.enableLogging.value)
			{
				var state = WeaveAPI.SessionManager.getSessionState(this._subject);
				// baseDiff becomes the change that needs to occur to get back to the previous state
				baseDiff = WeaveAPI.SessionManager.computeDiff(state, this._prevState);
				if (baseDiff !== null && baseDiff !== undefined)
					combine = true;
			}
			while (stepsRemaining-- > 0)
			{
				if (delta < 0)
				{
					logEntry = this._undoHistory.pop();
					this._redoHistory.unshift(logEntry);
					diff = logEntry.backward;
				}
				else
				{
					logEntry = this._redoHistory.shift();
					this._undoHistory.push(logEntry);
					diff = logEntry.forward;
				}
				if (debug)
					console.log('apply ' + (delta < 0 ? 'undo' : 'redo'), logEntry.id + ':', diff);
				
				if (stepsRemaining === 0 && this.enableLogging.value)
				{
					// remember the session state right before applying the last step so we can rewrite the history if necessary
					this._prevState = WeaveAPI.SessionManager.getSessionState(this._subject);
				}
				
				if (combine)
				{
					baseDiff = WeaveAPI.SessionManager.combineDiff(baseDiff, diff);
					if (stepsRemaining <= 1)
					{
						WeaveAPI.SessionManager.setSessionState(this._subject, baseDiff, false);
						combine = false;
					}
				}
				else
				{
					WeaveAPI.SessionManager.setSessionState(this._subject, diff, false);
				}
				
				if (debug)
				{
					var newState = WeaveAPI.SessionManager.getSessionState(this._subject);
					var resultDiff = WeaveAPI.SessionManager.computeDiff(this._prevState, newState);
					console.log('resulting diff:', resultDiff);
				}
			}
            
            WeaveAPI.SessionManager.getCallbackCollection(this._subject).resumeCallbacks.call(this._subject);
            //altered by sanjay - this is wrong - what i assumed
            // as globalhashmap callback, will trigger sessionstatelog callback
            // which in turn calls savediff
            
            this._undoActive = delta < 0 && this._savePending;
            this._redoActive = delta > 0 && this._savePending;
			if (!this._savePending){
                
				this._prevState = WeaveAPI.SessionManager.getSessionState(this._subject);
                //console.log("prev state is set");
            }
           // console.log("sessionstatelog clabacks triggered");
			var slcc = WeaveAPI.SessionManager.getCallbackCollection(this);
            slcc.triggerCallbacks.call(slcc);
           // console.log("sessionstatelog clabacks triggered ------ done");
		}
	}
	
	/**
	 * @TODO create an interface for the objects in this Array
	 */
	SessionStateLog.prototype.__defineGetter__("undoHistory",function(){
		return this._undoHistory;
	});
	
	/**
	 * @TODO create an interface for the objects in this Array
	 */
	SessionStateLog.prototype.__defineGetter__("redoHistory", function(){
		return this._redoHistory;
	});

	function debugHistory(logEntry)	{
		var h = this._undoHistory.concat();
		for (var i = 0; i < h.length; i++)
			h[i] = h[i].id;
		var f = this._redoHistory.concat();
		for (i = 0; i < f.length; i++)
			f[i] = f[i].id;
		if (logEntry){
			console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			console.log('NEW HISTORY (backward) ' + logEntry.id + ':',  logEntry.backward);
			console.log("===============================================================");
			console.log('NEW HISTORY (forward) '  + logEntry.id + ':',   logEntry.forward);
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		}
		console.log('undo ['+h+']','redo ['+f+']');
	}
	
	/**
	 * This will generate an untyped session state object that contains the session history log.
	 * @return An object containing the session history log.
	 */		
	SessionStateLog.prototype.getSessionState =  function(){
		var cc = WeaveAPI.SessionManager.getCallbackCollection(this);
		cc.delayCallbacks();
		this.synchronizeNow.call(this);
		
		// The "version" property can be used to detect old session state formats and should be incremented whenever the format is changed.
		var state = {
			"version": 0,
			"currentState": this._prevState,
			"undoHistory": this._undoHistory.concat(),
			"redoHistory": this._redoHistory.concat(),
			"nextId": this._nextId
			// not including enableLogging
		};
		
		cc.resumeCallbacks();
		return state;
	}
	
	/**
	 * This will load a session state log from an untyped session state object.
	 * @param input The ByteArray containing the output from seralize().
	 */
	SessionStateLog.prototype.setSessionState =  function(state){
		// make sure callbacks only run once while we set the session state
		var cc = WeaveAPI.SessionManager.getCallbackCollection(this);
		cc.delayCallbacks();
		this.enableLogging.delayCallbacks();
		try	{
			var version = state.version;
			switch (version){
				case 0:	{
					// note: some states from version 0 may include enableLogging, but here we ignore it					
					this._prevState = state.currentState;
					this._undoHistory = LogEntry.convertGenericObjectsToLogEntries(state.undoHistory, this._syncDelay);
					this._redoHistory = LogEntry.convertGenericObjectsToLogEntries(state.redoHistory, this._syncDelay);
					this._nextId = state.nextId;
					
					break;
				}
				default:
					console.log("Weave history format version " + version + " is unsupported.");
			}
			
			// reset these flags so nothing unexpected happens in later frames
			this._undoActive = false;
			this._redoActive = false;
			this._savePending = false;
			this._saveTime = 0;
			this._triggerDelay = -1;
			this._rsyncTime = getTimer();
		
			WeaveAPI.SessionManager.setSessionState(this._subject, this._prevState);
		}
		finally	{
			this.enableLogging.resumeCallbacks();
			cc.triggerCallbacks();
			cc.resumeCallbacks();
		}
	}
     weavecore.SessionStateLog = SessionStateLog;
   // weavecore.log =  new SessionStateLog(WeaveAPI.root);
    
}());