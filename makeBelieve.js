// Definition of the chainable function class __
class __ {
    constructor(query) {
        this.query = query;
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