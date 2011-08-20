!function(global) {

  function Expect(objects){
    this.objects = Array.prototype.slice.apply(objects);
    // if (this.objects.length === 0) throw new Error('expect needs and object');
  };

  Expect.prototype.assertors = {
    toEqual: equals,
    toNotEqual: notEqual,
    toBe: strictEqual,
    toNotBe: notStrictEqual,
    toBeA: function(actual, expected, message){
      ok(toBeA(actual, expected), message);
    },
    toNotBeA: function(actual, expected, message){
      ok(!toBeA(actual, expected), message);
    },
    toBeAnInstanceOf: function(actual, expected, message){
      ok(instanceOf(actual, expected), message);
    },
    toNotBeAnInstanceOf: function(actual, expected, message){
      ok(!instanceOf(actual, expected), message);
    },
    toDeepEqual: deepEqual,
    toNotDeepEqual: notDeepEqual,
    toThrowAnError: function(actual, expected, message){
      ok(typeof captureError(actual) !== 'undefined');
    },
    toNotThrowAnError: function(actual, expected, message){
      ok(typeof captureError(actual) === 'undefined');
    },
    toThrow: function(actual, expected, message){
      equals.call(null, captureErrorMessage(actual), expected, message);
    },
    toNotThrow: function(actual, expected, message){
      notEqual.call(null, captureErrorMessage(actual), expected, message);
    },
    toThrowAnInstanceOf: function(actual, expected, message){
      this.toBeAnInstanceOf(captureError(actual), expected, message);
    },
    toNotThrowAnInstanceOf: function(actual, expected, message){
      this.toNotBeAnInstanceOf(captureError(actual), expected, message);
    },
    toThrowA: function(actual, expected, message){
      this.toBeA(captureError(actual), expected, message);
    },
    toNotThrowA: function(actual, expected, message){
      this.toNotBeA(captureError(actual), expected, message);
    },
    toHaveProperty: function(actual, expected, message){
      ok(expected in actual, message);
    },
    toNotHaveProperty: function(actual, expected, message){
      ok(!(expected in actual), message);
    }
  };
  
  function toBeA(actual, expected){
    if (typeof expected !== 'string') throw toString(expected)+' must be a string';
    return typeof actual === expected
  }

  Expect.prototype.each = function(block){
    var self = this;
    self.objects.forEach(function(object){ block.call(self, object); });
    return self;
  };

  function expect(/* objects */){
    return new Expect(arguments);
  };
  global.expect = expect;
  expect.prototype = Expect.prototype;

  expect.addAssertor = function(name, fn, human_name){
    Expect.prototype.assertors[name] = fn;
    human_name || (human_name = humanize(name));
    Expect.prototype[name] = function(expected, message){
      var assertors = this.assertors;
      return this.each(function(actual){
        message || (message = generateMessage(actual, human_name, expected));
        assertors[name](actual, expected, message);
      });
    };
    return this;
  };

  forEachKey(Expect.prototype.assertors, function(name, fn){
    expect.addAssertor(name, fn);
    if (name.match(/A$/)) expect.addAssertor(name+'n', fn);
  });

  function generateMessage(actual, expectation, expected){
    return ''+
      'Expected: '+toString(actual)+' '+expectation+' '+toString(expected)+' '+
      'Source: '+sourceFromStacktrace();
  }

  function humanize(string){
    return string.replace(/[A-Z]/g, function(chr) {
      // print(typeof arguments[0]);
      return chr ? ' '+chr.toLowerCase() : '';
    });
  }

  function toString(object){
    return typeof object === 'function' ? object.toString() : QUnit.jsDump.parse(object);
  }

  function emptyFunction(){}
  function instanceOf(object, func){
    if (typeof func !== 'function'){
      emptyFunction.prototype = func;
      return object instanceof emptyFunction;
    }
    return object instanceof func;
  }

  function captureError(actual){
    if (typeof actual !== "function") throw new Error('actual is not a function');
    try{ actual(); }catch(e){ return e; }
    return;
  }

  function captureErrorMessage(actual){
    var error = captureError(actual);
    return error ? error.message ? error.message : error : '';
  }

  // so far supports only Firefox, Chrome and Opera (buggy)
  // could be extended in the future to use something like https://github.com/csnover/TraceKit
  function sourceFromStacktrace() {
    try {
      throw new Error();
    } catch ( e ) {
      if (e.stacktrace) {
        // Opera
        return e.stacktrace.split("\n")[6];
      } else if (e.stack) {
        // Firefox, Chrome
        // return e.stack;
        return e.stack.split("\n")[8];
      } else if (e.sourceURL) {
        // Safari, PhantomJS
        // TODO sourceURL points at the 'throw new Error' line above, useless
        //return e.sourceURL + ":" + e.line;
      }
    }
  }
  
  function forEachKey(object, fn){
    for (key in object) fn(key, object[key]);
  }

}(this);
