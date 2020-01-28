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
__.prototype.append = function(element) {
  // WIP
}

/* Functionality #10 */
__.prototype.prepend = function(element) {
  // WIP
}

/* Functionality #11 */
__.prototype.delete = function() {
  // WIP
}

/* Functionality #12 */
__.prototype.ajax = function(ajax) {
	// WIP
	// Check if required url is provided
	if (Object.is(ajax.url, undefined)) { return; }

	// Check if values are given, if not set default
  	Object.is(ajax.method, undefined) ? 'GET' : ajax.method;
  	Object.is(ajax.timeout, undefined) ? 0 : ajax.timeout;
  	Object.is(ajax.data, undefined) ? {} : ajax.data;
  	Object.is(ajax.headers, undefined) ? [] : ajax.headers;
  	Object.is(ajax.success, undefined) ? null : ajax.success;
  	Object.is(ajax.fail, undefined) ? null : ajax.fail;
  	Object.is(ajax.beforeSend, undefined) ? null : ajax.beforeSend;

  	var xmlHttp = new XMLHttpRequest();
  	ajax.beforeSend(xmlHttp);
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            ajax.success(xmlHttp.response);
        } else if(xmlHttp.readyState == 4) {
        	ajax.fail(xmlHttp.status);
        }
    }
    xmlHttp.open(ajax.method, ajax.url); 
    xmlHttp.send(null);
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
// Er bara að prufa mig áfram og testa
__.prototype.toogleClass = function(someClass) { 
	// Er ekki viss hvort þetta má en þetta virkar.
	Array.from(this.elements).forEach(function (element) {
		element.classList.toggle(someClass);
	});
	
	// ***********************************************************
  /* var ele = document.getElementsByTagName("h2"); // er bara til að testa
    // Wait for document to load.
    window.addEventListener('load', function () {
      // Loop elements of type selected.
      for (var i = 0; i < ele.length; i++) {
        // Split the class into a array.
        var classArry = ele[i].className.split(' '); 
        var found = false
        // Loop all classes that the lements has.
        for(var j = 0; j < classArry.length; j++) {
          if (classArry[j] == someClass) {
            found = true;
          }
        }
        if (found == true) {
          console.log("yes");
          ele[i].className.replace('/\b'+ someClass + '\b/', "");// virkar ekki
        }
        else {
          console.log("no");
          ele[i].className += " " + someClass;
        }
      }
    });*/
}

/* Functionality #15 */
__.prototype.onSubmit = function(callbackFunction) {
	Array.from(this.elements).forEach(function (element) {
		element.onsubmit = callbackFunction;
	});
}

/* Functionality #16 */
__.prototype.onInput = function() {
  // WIP
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
  	__("#hello").insertText("Some text");


  	// AJAX example WIP WIP WIP
  	/* Ekki viss hvernig maður getur losað sig við svigana (). 
  	   Samkvæmt verkefnalýsingu á þetta að vera _.ajax({}); 
	   ### Suggestions?
  	*/
  	__().ajax({
  		url: 'https://serene-island-81305.herokuapp.com/api/204',
  		method: 'GET',
  		timeout: 0,
  		data: {},
  		headers: [
  			{ 'Authorization': 'my-secret-key' }
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
}
