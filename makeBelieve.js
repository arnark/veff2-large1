/* Definition of the chainable function class __ */
class __ {

  /* The constructor takes in a element query and returns found elements if they exist */
  constructor(query) {
    // Wait for page to load
    window.addEventListener('load', function () {
      // Get all elements with the given query selectors
      const elements = document.querySelectorAll(query);
      this.elements = elements;
    });
  }

  /* Helpers */
  /* Get the element type from selector string (id, class or tagname) */
  elementType(selector) {
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

  /* Get css selector stripped of first char if applicable */
  getClassNameStripped(cssSelector) {
    const elementType = this.elementType(cssSelector);
    if(elementType === 'ID' || elementType === 'CLASS') {
      return cssSelector.substr(1);
    } else {
      return cssSelector;
    }
  }

  /* Main functions */
  parent(cssSelector = undefined) {
    // Get the stripped selector
    cssSelector = this.getClassNameStripped(cssSelector);
    let elementArr = [];
    // Wait for document to load
    window.addEventListener('load', function () {
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
    });
    return elementArr;
  }

  

  css(cssElement, value) {
    // WIP
  }

  // Er bara að prufa mig áfram og testa
  toogleClass(someClass) { 
    var classList = this.className.split(' ');
    for(cl in classList) {
      if(cl == someClass) {
        cl = "";
        return;
      }
    }
    this.className += someClass;
  }

  onSubmit() {
    // WIP
  }

  onInput() {
    // WIP
  }
}

// Required to get rid of the new keyword for initiating the __ class
var _old = __;
__ = function(...args) { return new _old(...args) };


// Example of general query selector
/* Þetta semsagt virkar ekki, vegna þess að constructorar 'returna' ekki. Reyni að finna lausn. */
console.log(__("#container h2"));

// Example of chainable methods and the parent function
console.log(__("p").parent(".selected"));
console.log(__("p").parent("#container"));
console.log(__("p").parent("form"));
console.log(__("p").parent());