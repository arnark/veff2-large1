/* Helpers */
/* Get css selector stripped off first char (#, .), or no change (body, html etc.) */
function getClassNameStripped(cssSelector) {
  if(typeof selector === 'string') {
    const firstChar = selector.charAt(0);
    if(firstChar === '#' || firstChar === '.') {
      return cssSelector.substr(1);
    } else {
      return cssSelector;
    }
  }
  return undefined;
}

/* Main functions */
function __(selectors) {
  // Grab all elements with given selector and convert to array
  this.elements = Array.prototype.slice.call(document.querySelectorAll(selectors));
}

__.prototype.parent = function (cssSelector) {
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

__.prototype.css = function(cssElement, value) {
  // WIP
}

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

__.prototype.onSubmit = function() {
  // WIP
}

__.prototype.onInput = function() {
  // WIP
}

var _old = __;
__ = function(...args) { return new _old(...args) };

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