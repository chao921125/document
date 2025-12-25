/**
 * JS Linked-List for es5 & es6
 * @Auth CC
 */

function UaInfo() {
  this.browser = null;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    UaInfo: UaInfo,
  };
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return {
      UaInfo: UaInfo,
    };
  });
} else {
  window.UaInfo = UaInfo;
}
