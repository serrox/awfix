/*
 * Copyright (c) 2008 Chris Phillips <http://>
 * All rights reserved.
 *
 * awfix.js - Authorware Javascript via ReadURL Fix for IE
 *
 * Author: Chris Phillips <cphill02@yahoo.com>
 * Version: 0.1
 * Release: 20080427
 *
 * License:
 *   http://javascript.nwbox.com/NWEvents/MIT-LICENSE
 * Download:
 *   http://code.google.com/p/awfix/
 */


function addEvent(el, eType, fn, uC){
	var listenerFn = fn;
	if (el.addEventListener){
		el.addEventListener(eType, listenerFn, uC);
		return true;
	} else if (el.attachEvent){
			//listenerFn = function(){ fn(window.event); }; // Patch IE to pass the thrown event object to the handler function as a param. --> Not needed and will cause issues as we need to use arguments.callee
			return el.attachEvent('on' + eType, listenerFn);
	} else {
		el['on' + eType] = fn;
	}
return true;
}

function removeEvent(obj, eType, fn) {
	if (obj.detachEvent){
    	obj.detachEvent('on'+eType, fn);
	} else {
  		obj.removeEventListener(eType, fn, false);
	}
}

function awFix(){
	function addObject(ifrm, obj){ // inner function to add an object to an iframe !!creating a closure
		var doc = ifrm.contentWindow ? ifrm.contentWindow.document : ifrm.contentDocument;
		var el = doc.getElementsByTagName('body')[0];
		if (obj.outerHTML) {
			el.innerHTML = obj.outerHTML; // IE [appendChild errors out across frames]
		} else {
			el.appendChild(obj); // W3C
		}
	}
	var objs = document.getElementsByTagName('object'); // get all <object/>'s in the document
	if (objs){
		for(var i=objs.length-1; i>=0; i--){
			if (objs[i].getAttribute('classid') === 'CLSID:15B782AF-55D8-11D1-B477-006097098764'){ // match all Authorware objects
				var ifrm = document.createElement('iframe'); // create an iframe in memory
				ifrm.aware = objs[i].cloneNode(true); // copy the Authorware object and store it as a temp javascript object on the iframe object
				ifrm.width = ifrm.aware.width; // set the iframe to the same dimensions and the Authorware object
				ifrm.height = ifrm.aware.height;
				ifrm.scrolling = 'no'; // hide the iframe styling
				ifrm.marginwidth = '0';
				ifrm.marginheight = '0';
				ifrm.frameBorder = '0';
				ifrm.allowTransparency = true;
				ifrm.src = 'iframe.htm' + document.location.search; // a physical file is required, append any url querystring params
				// !!Asynchronous function call!! when the iframe finishes loading...
				if (ifrm.onreadystatechange === undefined){ //for W3C
					ifrm.onload = function(){
						removeEvent(ifrm, 'load', arguments.callee); // remove the onload listener
						addObject(this, this.aware); // add the Authorware object back to it
						this.aware = null; // cleanup for better memory management
					};
				} else { 
					ifrm.onreadystatechange = function(){  //for IE
						if (/loaded|complete/i.test(this.readyState)){
							removeEvent(ifrm, 'readystatechange', arguments.callee); // remove the onreadystatechange listener
							addObject(this, this.aware);  // add the Authorware object back to it
							this.aware = null; // cleanup for better memory management
						}
					};
				}
				objs[i].parentNode.replaceChild(ifrm, objs[i]); // replace the Authorware object with an iframe 
			}
		}
	//addObject = null; // cleanup closure for better memory management
	}
	
}

// hack because IE doesn't have an onDOMContentLoaded event. From http://dean.edwards.name/weblog/
// window.onload will fire before this hack if the page doesn't contain any images.
function DOMContentLoaded(fn){
	try{
		document.write('<script id=__ie_onload defer src="//:"><\/script>');
		var script = document.getElementById('__ie_onload');
		script.onreadystatechange = function(){
	  		if (/interactive|loaded|complete/i.test(this.readyState)){
	    		fn(); //execute the function
			}
		};
	} catch (e){ // gracefully degrade to document.onreadystatechange to avoid an Operation Aborted error which indicates Internet Explorer’s DOM is locked and it is not ready for DOM manipulations yet 
		addEvent(document, 'readystatechange', function(){	
			if (/interactive|loaded|complete/i.test(document.readyState)) {
				removeEvent(document, 'readystatechange', arguments.callee); // remove this anonymous function from the readystatechange event handler
				fn(); // apply the fix
			}	
		}, false);
	}
}

if (document.onreadystatechange === undefined) { // W3C
	addEvent(document, 'DOMContentLoaded', function(){
		removeEvent(document, 'DOMContentLoaded', arguments.callee); // remove this anonymous function from the DOMContentLoaded event handler
		awFix(); // apply the fix
	}, false);
} else { // IE
	DOMContentLoaded(awFix);
}






