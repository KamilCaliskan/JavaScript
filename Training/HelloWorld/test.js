// test.js
const { assert } = require('chai');
const helloWorld = require('./helloWorld');

describe("Tests", () => {
  it("Test for mission 1: should create a function helloWorld", () => {
    assert.isFunction(helloWorld, "function helloWorld is not defined");
  });

  it("Test for mission 2: should define a variable str and set value", () => {
    const funcStr = helloWorld.toString();
    assert.match(funcStr, /(var|let|const) +str/, "variable str is not defined");
  });

  it("Test for mission 3: should use method console.log() to print Hello World!", () => {
    let loggedMessage = "";
    const originalLog = console.log;
    console.log = (message) => { loggedMessage = message; };
    
    helloWorld();
    
    console.log = originalLog;
    assert.strictEqual(loggedMessage, "Hello World!", 'You did not print "Hello World!" to the screen');
  });
});
