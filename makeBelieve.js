// Definition of the chainable function class __
class __ {
  constructor(query) {
    // Wait for page to load
    window.addEventListener('load', function () {
      // Get all elements with the given query selectors
      const elements = document.querySelectorAll(query);
      // Convert NodeList to Array
      const elementsArr = Array.prototype.slice.call(elements);
      this.elements = elementsArr;

      // Demonstration with testHtml.html, log the first element if found, otherwise undefined
      console.log(this.elements[0])
    });
    return this.elements;
  }

  firstMethod() {
    console.log(`hello ${this.query}`);
    return this;
  }
   
  secondMethod() {
    console.log('This is the Second Method');
      return this;
  }
   
  thirdMethod() {
    console.log('This is the Third Method');
      return this;
  }

}

// Required to get rid of the new keyword for initiating classes
var _old = __;
__ = function(...args) { return new _old(...args) };

// Example of chainable methods
__("test")
  .firstMethod()
  .secondMethod()
  .thirdMethod();

console.log(__("#container"))