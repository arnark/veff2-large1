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
  // Grab all elements with given selector and convert to array
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
__.prototype.onClick = function() {
  // WIP
}

/* Functionality #8 */
__.prototype.insertText = function(text) {
  // WIP
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
__.prototype.ajax = function(ajaxObject) {
  // WIP
}

/* Functionality #13 */
__.prototype.css = function(cssElement, value) {
  // WIP
}

/* Functionality #14 */
// Er bara að prufa mig áfram og testa
__.prototype.toogleClass = function(someClass) { 
  var classList = this.className.split(' ');
  for(cl in classList) {
    if(cl == someClass) {
      cl = "";
      return;
    }
  }
  this.className += someClass;
}

/* Functionality #15 */
__.prototype.onSubmit = function() {
  // WIP
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
}