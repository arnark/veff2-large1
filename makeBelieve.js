/* Helpers */
function elementType(selector) {
  if(typeof selector === 'string') {
    const firstChar = selector.charAt(0);
    if(firstChar === '#') {
      return 'ID';
    } else if(firstChar === '.') {
      return 'CLASS';
    } else {
      return 'TAG';
    }
  }
  return undefined;
}

function getClassNameStripped(cssSelector) {
  const elementType = this.elementType(cssSelector);
  if(elementType === 'ID' || elementType === 'CLASS') {
    return cssSelector.substr(1);
  } else {
    return cssSelector;
  }
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
