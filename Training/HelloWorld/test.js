// test.js
const { assert } = require('chai');
const helloWorld = require('./helloWorld');

describe("Tests", () => {
  it("test", () => {
    assert.isFunction(helloWorld, "function helloWorld is not defined");
    helloWorld();
  });
});
