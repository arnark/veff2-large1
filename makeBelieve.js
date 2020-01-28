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


/* Main functions */

/* Functionality #2 */
function __(cssSelectors) {
  // Grab all elements with given selector and convert to array
  this.elements = Array.prototype.slice.call(document.querySelectorAll(cssSelectors));
}

/* Functionality #1 */
let _old = __;
__ = function(...args) { return new _old(...args) };

/* Functionality #4 */
/* Get the parent elements that match given cssSelector.
   If no cssSelector is provided, all parent elements of
   all elements that match __('example') are returned. */
__.prototype.parent = function (cssSelector = null) {
  // Get the stripped selector
  cssSelector = getClassNameStripped(cssSelector);
  let elementArr = [];
    // If selector is not provided
    if(cssSelector == null) {
      Array.from(this.elements).forEach(function (element) {
          elementArr.push(element.parentNode);
      });
    } else {
      // Iterate through the elements, checking if the given selector is the parent
      Array.from(this.elements).forEach(function (element) {
        // Hacky way to compare selector with id, class and tags. ###suggestions?
        if(element.parentNode.className === cssSelector 
          || element.parentNode.id === cssSelector
          || element.parentNode.localName === cssSelector) {
          elementArr.push(element.parentNode);
        }
      });
    }
  this.elements = elementArr;
  return this;
}

/* Functionality #5 */
__.prototype.grandParent = function(cssSelector = null) {
  // WIP
}

/* Functionality #6 */
__.prototype.ancestor = function(cssSelector) {
  // WIP
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


// Wait for DOM to load
window.onload = function(){
  // Example of general query selector
  console.log(__("#container"));
  
  // Example of chainable methods and the parent function
  console.log(__("p").parent(".selected"));
  console.log(__("p").parent("#container"));
  console.log(__("p").parent("form"));
  console.log(__("p").parent());
}