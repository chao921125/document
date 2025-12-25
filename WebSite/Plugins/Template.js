function Template() {
  this.head = null;
}

Template.prototype.size = function () {
  let count = 0;
  let node = this.head;
  while (node) {
    count++;
    node = node.next;
  }
  return count;
}

// 导出，兼容es5和es6
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    Template: Template,
  };
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return {
      Template: Template,
    };
  });
} else {
  window.Template = Template;
}
