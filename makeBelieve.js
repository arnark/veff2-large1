/* Helpers */

/* Get css selector stripped off first char (#, .), or no change (body, html etc.) */
function getClassNameStripped(cssSelector) {
  if(typeof cssSelector === 'string') {
    const firstChar = cssSelector.charAt(0);
    if(firstChar === '#' || firstChar === '.') {
      return cssSelector.substr(1);
    } else {
      return cssSelector;
    }
  }
  return undefined;
}

/* Returns found elements with given family memberType and cssSelector */
function findFamilyMembers(memberType, cssSelector, elements) {
	// Get the stripped selector ('#example' -> 'example')
  	cssSelector = getClassNameStripped(cssSelector);

  	let elementArr = [];
  	// If selector is not provided
  	if(cssSelector == null) {
  		Array.from(elements).forEach(function (element) {
  			if(memberType === 'parent') { 
  				elementArr.push(element.parentNode);
  			} else if(memberType === 'grandParent') {
  				elementArr.push(element.parentNode.parentNode);
  			}
    	});
    } else {
      	// Iterate through the elements, checking if the given selector is the parent / grandparent
      	Array.from(elements).forEach(function (element) {
      	  	// Hacky way to compare selector with id, class and tags. ###suggestions?
      	  	if(memberType === 'parent') { 
      	  		if(element.parentNode.className === cssSelector 
      	  		  || element.parentNode.id === cssSelector
      	  		  || element.parentNode.localName === cssSelector) {
      	  		  elementArr.push(element.parentNode);
      	  		}
      	  	} else if(memberType === 'grandParent') {
      	  		if(element.parentNode.parentNode.className === cssSelector 
      	  		  || element.parentNode.parentNode.id === cssSelector
      	  		  || element.parentNode.parentNode.localName === cssSelector) {
      	  		  elementArr.push(element.parentNode.parentNode);
      	  		}
      	  	}
      	});
    }
    return elementArr;
}

// Check if object is a DOM node
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}


/* Main functions */

/* Functionality #2 */
function __(cssSelectors) {
  // Grab all elements with given selector and insert into array
  this.elements = Array.prototype.slice.call(document.querySelectorAll(cssSelectors));
}

/* Functionality #4 */
__.prototype.parent = function (cssSelector = null) {
  	this.elements = findFamilyMembers('parent', cssSelector, this.elements);
  	return this;
}

/* Functionality #5 */
__.prototype.grandParent = function(cssSelector = null) {
  	this.elements = findFamilyMembers('grandParent', cssSelector, this.elements);
  	return this;
}

/* Functionality #6 */
__.prototype.ancestor = function(cssSelector) {
	let elementArr = [];
	// Iterate through this.elements and find the closes ancestor
	Array.from(this.elements).forEach(function (element) {
		let closestAncestor = element.closest(cssSelector);
		if(closestAncestor) { elementArr.push(closestAncestor); }
    });
  	this.elements = elementArr;
  	return this;
}
    
/* Functionality #7 */
__.prototype.onClick = function(callbackFunction) {
	Array.from(this.elements).forEach(function (element) {
		element.onclick = callbackFunction;
    });
}

/* Functionality #8 */
__.prototype.insertText = function(text) {
	Array.from(this.elements).forEach(function (element) {
		element.textContent = text;
    });
}

/* Functionality #9 */
__.prototype.append = function(givenElement) {
	let isDomObject = isNode(givenElement);
	Array.from(this.elements).forEach(function (element) {
		if (isDomObject) {
			element.append(givenElement);
		} else {
			element.innerHTML += givenElement;
		}
    });
}

/* Functionality #10 */
__.prototype.prepend = function(givenElement) {
	let isDomObject = isNode(givenElement);
	Array.from(this.elements).forEach(function (element) {
		if (isDomObject) {
			element.prepend(givenElement);
		} else {
			element.innerHTML = givenElement + element.innerHTML;
		}
    });
}

/* Functionality #11 */
__.prototype.delete = function() {
	Array.from(this.elements).forEach(function (element) {
		element.parentNode.removeChild(element);
	})
}

/* Functionality #12 */
__.prototype.ajax = function(ajax) {

	// Check if required url is provided
	if (Object.is(ajax.url, undefined)) { 
		ajax.fail({"Error": "Missing url paramter."});
		return;
	}

	// Check if values are given, if not set default
	let nullFunc = function(){};
  	ajax.method = ajax.method || 'GET';
  	ajax.timeout = ajax.timeout || 0;
  	ajax.data = ajax.data || {};
  	ajax.headers = ajax.headers || [];
  	ajax.success = ajax.success || nullFunc;
  	ajax.fail = ajax.fail || nullFunc;
  	ajax.beforeSend = ajax.beforeSend || nullFunc;

  	var xmlHttp = new XMLHttpRequest();
  	xmlHttp.open(ajax.method, ajax.url);

	// Set headers
	if (ajax.headers.length > 0) {
		Array.from(ajax.headers).forEach(function (header) {
			for(let key in header){
				// Some problem with XXS when served locally, no problem when hosted somewhere online
				xmlHttp.setRequestHeader(key, header[key]);
  			}
		});
	}
	
  	xmlHttp.timeout = ajax.timeout;
  	ajax.beforeSend(xmlHttp);

  	xmlHttp.onload = function () {
  		ajax.success(xmlHttp.response);
  	}

    xmlHttp.onerror = function () {
    	ajax.fail({"Error": "Failed to send request."});
    };

    xmlHttp.send(ajax.data);

}

/* Functionality #13 */
__.prototype.css = function(cssElement, value) {
	// Iterate through this.elements.
	Array.from(this.elements).forEach(function (element) {
		// Add to style cssElement with the new value. 
		element.style[cssElement] = value;
	});
}

/* Functionality #14 */
__.prototype.toogleClass = function(someClass) { 
	Array.from(this.elements).forEach(function (element) {
		// Using classList we toggle the given class.
		element.classList.toggle(someClass);
	});
}

/* Functionality #15 */
__.prototype.onSubmit = function(callbackFunction) {
	Array.from(this.elements).forEach(function (element) {
		element.onsubmit = callbackFunction;
	});
}

/* Functionality #16 */
__.prototype.onInput = function(callbackFunction) {
  Array.from(this.elements).forEach(function (element) {
		element.oninput = callbackFunction;
	});
}

/* Functionality #1 */
let _old = __;
__ = function(...args) { return new _old(...args) };
__.ajax = function(a){return __().ajax(a);}

// Documentation / Examples


/*
// Wait for DOM to load
window.onload = function(){

  	// Example of general query selector
  	console.log(__("#container"));
  	
  	// Example of the parent function
  	console.log(__("p").parent(".selected"));
	
  	// Example of the grandParent function
  	console.log(__("#password").grandParent());

  	// Example of the ancestor function
  	console.log(__("#password").ancestor(".ancestor"));

  	// Example of the onclick function 
  	__("#password").onClick(function (evt) {
  		console.log(evt.target.value);
  	});

  	// Example of insertText function
  	__("#hello").insertText("Some text");

  	// Example of AJAX function
  	__.ajax({
  		url: 'https://serene-island-81305.herokuapp.com/api/200',
  		method: 'GET',
  		timeout: 0,
  		data: {},
  		headers: [
  			{ 'Authorization': 'my-secret-key' },
  		],
  		success: function(resp) {
  			console.log(resp);
  		},
  		fail: function(error) {
  			console.log(error);
  		},
  		beforeSend: function(xhr) {
  			console.log(xhr);
  		}
	});

	// Example of css insertion using .css functon.
	__('h2').css('font-size','100');

	// Example of toggleClass function
	__('p').toogleClass('newClass');

	// Example of the append function
	__('.the-appender').append('<p>lolololo</p>');
	__('.the-appender').append(
		document.createElement('p')
			.appendChild(
				document.createTextNode('Dom object appended')
			)
	);

	var para = document.createElement("p");
	para.appendChild(document.createTextNode("this is new1"));
	__('.the-appender').append(para);

	// Example of prepend function
	// Still some bugs with DOM object insert
	__('.the-prepender').prepend('<p>lolololo</p>');
	__('.the-prepender').prepend(
			document.createElement('p')
				.appendChild(
					document.createTextNode('mmmkayyy i am a dom object prepended')
				)
			);
	// Example of the append function
	__('#the-prepender').prepend(document.createElement("p").appendChild(document.createTextNode("YES SIR")));
	__('.the-appender').append(
		document.createElement('p')
			.appendChild(
				document.createTextNode('Dom object prepended')
			)
	);

	// Example of the delete function
	__("#container h2").delete();
	
	// Example of onSubmit function
	__('#my-form-submit').onSubmit(function (evt) {
		alert("Submitted")
	});

	// Example of onInput function
	__('#passwords').onInput(function (evt) {
		console.log(evt.target.value);
	});

}

*/
