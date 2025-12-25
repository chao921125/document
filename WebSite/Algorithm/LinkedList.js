/**
 * JS Linked-List for es5 & es6
 * @Auth CC
 */

function ListNode(val = 0) {
  this.val = val;
  this.next = null;
}

function LinkedList() {
  this.head = null;
}

LinkedList.prototype.size = function () {
  let count = 0;
  let node = this.head;
  while (node) {
    count++;
    node = node.next;
  }
  return count;
}
LinkedList.prototype.isEmpty = function () {
  let node = this.head;
  return node.next === null;
}
LinkedList.prototype.append = function (val) {
  let newNode = new ListNode(val);
  if (!this.head) {
    this.head = newNode;
    return;
  }
  let current = this.head;
  while (current.next) {
    current = current.next;
  }
  current.next = newNode;
}
LinkedList.prototype.inset = function (index, val) {}
LinkedList.prototype.prepend = function (val) {
  let newNode = new ListNode(val);
  newNode.next = this.head;
  this.head = newNode;
}
LinkedList.prototype.update = function (index, val) {}
LinkedList.prototype.find = function (val) {
  let current = this.head;
  while (current) {
    if (current.val === val) {
      return current;
    }
    current = current.next;
  }
  return null;
}
LinkedList.prototype.findFirst = function () {
  return this.head;
}
LinkedList.prototype.findLast = function () {
  let lastNode = this.head;
  if (lastNode) {
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
  }
  return lastNode;
}
LinkedList.prototype.remove = function (val) {
  if (!this.head) {
    return null;
  }
  if (this.head.val === val) {
    this.head = this.head.next;
    return;
  }
  let current = this.head;
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
      return;
    }
    current = current.next;
  }
}
LinkedList.prototype.removeAt = function (index) {}
LinkedList.prototype.clear = function () {
  this.head = null;
}
LinkedList.prototype.indexOf = function (val) {}
LinkedList.prototype.toString = function () {}
LinkedList.prototype.forwardString = function () {}
LinkedList.prototype.backwordString = function () {}
LinkedList.prototype.print = function () {
  let current = this.head;
  let result = '';
  while (current) {
    result += `${current.val} -> `;
    current = current.next;
  }
  return result;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    LinkedList: LinkedList,
    ListNode: ListNode // 如果需要导出 ListNode
  };
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return {
      LinkedList: LinkedList,
      ListNode: ListNode
    };
  });
} else {
  window.LinkedList = LinkedList;
  window.ListNode = ListNode;
}
