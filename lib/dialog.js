var EventEmitter = require('events').EventEmitter;
var domify = require('domify');

var dialogSkeleton = require('./dialog.html');


function Dialog(options) {

  if (!(this instanceof Dialog)) {
    return new Dialog(options);
  }

  options = options || {};

  var element = domify(dialogSkeleton);

  this.options = options;
  this.element = element;

  this.toggleClass('closable', options.closable !== false);

  this.toggleClass('backdrop', options.backdrop !== false);

  if (options.className) {
    this.toggleClass(options.className, true);
  }

  if (options.id) {
    element.setAttribute('id', options.id);
  }

  element.addEventListener('click', bind(this, this.handleClick));

  if (options.template) {
    this.setBody(options.template);
  }
}

Dialog.prototype = Object.create(EventEmitter.prototype);

module.exports = Dialog;


Dialog.prototype.open = function(closeCallback) {

  var options = this.options;

  this.attachTo(options.parent || 'body');

  this.emit('pre-open');
  this.toggleClass('open', true);
  this.emit('open');

  if (closeCallback) {
    this.once('close', closeCallback);
  }

  return this;
};

Dialog.prototype.close = function(result) {
  this.toggleClass('open');

  this.emit('pre-close', result);
  this.emit('close', result);

  this.detach();

  return this;
};

Dialog.prototype.detach = function() {

  var element = this.element,
      parent = element.parentNode;

  if (parent) {
    // unset html -> dialog link
    delete element.dialog;

    parent.removeChild(element);

    this.emit('detach', parent);
  }

  return this;
};

Dialog.prototype.attachTo = function(parent) {

  var element = this.element;

  if (element.parentNode) {
    this.detach();
  }

  if (isString(parent)) {
    parent = document.querySelector(parent);
  }

  parent.appendChild(element);

  // establish html -> dialog link
  element.dialog = this;

  this.emit('attach', parent);

  return this;
};

Dialog.prototype.setBody = function(body) {

  var contentElement = this.element.querySelector('.dlg-content');

  if (body && isString(body)) {
    body = domify(body);
  }

  if (!body) {
    contentElement.innerHTML = '';
  } else {
    contentElement.appendChild(body);
  }

  return this;
};

Dialog.prototype.handleClick = function(event) {

  if (this.options.closable === false) {
    return;
  }

  var target = event.target;

  if (target.matches('.dlg') || target.matches('.dlg-close')) {
    this.close();

    event.preventDefault();
  }
};

Dialog.prototype.toggleClass = function(state, add) {

  var classList = this.element.classList;

  state.split(/\s/).forEach(function(cls) {
    classList[add ? 'add' : 'remove'](cls, add);
  });
};



// helper functions

function bind(element, fn) {

  if (fn.bind) {
    return fn.bind(element);
  } else {
    return function() {
      var args = Array.prototype.slice(arguments);
      return fn.apply(element, args);
    };
  }
}

function isString(obj) {
  return typeof obj === 'string';
}