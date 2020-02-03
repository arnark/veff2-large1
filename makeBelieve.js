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
// I was pointed to this https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML for help.
// givenElement is a [object Text]. need to look into this.
// WIP WIP WIP, appendChild not creating new 'element' ex. Should be <p>asf</p> but is "asf"
__.prototype.append = function(givenElement) {
	let isDomObject = isNode(givenElement);
	console.log(givenElement);
	Array.from(this.elements).forEach(function (element) {
		if (isDomObject) {
			element.append(givenElement);
		} else {
			element.innerHTML += givenElement;
		}
    });
}

/* Functionality #10 */
// WIP WIP WIP, appendChild not creating new 'element' ex. Should be <p>asf</p> but is "asf"
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
		ajax.fail({ "Error": "Missing url paramter."});
		return;
	}

	// Check if values are given, if not set default
  	Object.is(ajax.method, undefined) ? 'GET' : ajax.method;
  	Object.is(ajax.timeout, undefined) ? 0 : ajax.timeout;
  	Object.is(ajax.data, undefined) ? {} : ajax.data;
  	Object.is(ajax.headers, undefined) ? [] : ajax.headers;
  	Object.is(ajax.success, undefined) ? null : ajax.success;
  	Object.is(ajax.fail, undefined) ? null : ajax.fail;
  	Object.is(ajax.beforeSend, undefined) ? null : ajax.beforeSend;

  	var xmlHttp = new XMLHttpRequest();
  	xmlHttp.open(ajax.method, ajax.url);

	// Set headers
	// Some problem with xxs
	Array.from(ajax.headers).forEach(function (header) {
		for(let key in header){
			//xmlHttp.setRequestHeader(key, header[key]);
  		}
	});

  	xmlHttp.timeout = ajax.timeout;
  	ajax.beforeSend(xmlHttp);

  	xmlHttp.onload = function () {
  		ajax.success(xmlHttp.response);
  	}

    xmlHttp.onerror = function () {
    	ajax.fail({ "Error": "Failed to send request."});
    };

    xmlHttp.send(ajax.data);

}

/* Functionality #13 */
__.prototype.css = function(cssElement, value) {
	// Iterate through this.elements.
	Array.from(this.elements).forEach(function (element) {
		// Addd to style cssElement with the new value. 
		element.style[cssElement] = value;
	});
}

/* Functionality #14 */
__.prototype.toogleClass = function(someClass) { 
	// classList.toggle is allowed.
	Array.from(this.elements).forEach(function (element) {
		// using classList we toggle the given class.
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


// Wait for DOM to load
window.onload = function(){

  	// Example of general query selector
  	console.log(__("#container"));
  	
  	// Example of the parent function
  	console.log(__("p").parent(".selected"));
  	console.log(__("p").parent("#container"));
  	console.log(__("p").parent("form"));
  	console.log(__("p").parent());
	
  	// Example of the grandParent function
  	console.log(__("#password").grandParent());
  	console.log(__("#password").grandParent("#grandfather"));
  	console.log(__("#password").grandParent("#unknownId"));
	
  	// Example of the ancestor function
  	console.log(__("#password").ancestor(".ancestor"));
  	console.log(__("#password").ancestor(".root"));
  	console.log(__("#password").ancestor(".ancestor-sib"));

  	// Example of the onclick function 
  	__("#password").onClick(function (evt) {
  		console.log(evt.target.value);
  	});

  	// Example of insertText function
  	__("#hello").insertText("Some texting");

  	// AJAX example WIP WIP WIP
  	/* Ekki viss hvernig maður getur losað sig við svigana (). 
  	   Samkvæmt verkefnalýsingu á þetta að vera _.ajax({}); 
	   ### Suggestions?
  	*/
  	__().ajax({
  		url: 'https://serene-island-81305.herokuapp.com/api/200',
  		method: 'DELETE',
  		timeout: 0,
  		data: {},
  		headers: [
  			{ 'Authorization': 'my-secret-key' },
  			{ 'some': 'asdfcret-key' }
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
	__('#container-title').css('font-size','50');

	// Example of toggleClass function
	__('p').toogleClass('newClass');

	// Example of append function
	// Still some bugs with DOM object insert
	__('.the-appender').append('<p>lolololo</p>');
	__('.the-appender').append(
			document.createElement('p')
				.appendChild(
					document.createTextNode('mmmkayyy i am a dom object appended')
				)
			);
			
	var bera = document.createElement("p").appendChild(document.createTextNode("YES"));
	__('.the-appender').append(bera);

	var para = document.createElement("p");
	var node = document.createTextNode("this is new");
	para.appendChild(node);
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

	__("#container h2").delete();
	
	// Example of onSubmit function
	__('#my-form-submit').onSubmit(function (evt) {
		evt.preventDefault(); //prevent the defult submit of the form (dont know if we need this).
		console.log("I'm doing somthing");
		console.log(evt.target.usernames.value);
		console.log(evt.target.passwords.value);
	});

	// Example of onInput function
	__('#passwords').onInput(function (evt) {
		console.log(evt.target.value); // Will log every time a input is made.
	});

	// Chainable
	__('input').parent('form').onInput(function(evt) {
		console.log("Somthing is happending");
	});
}
