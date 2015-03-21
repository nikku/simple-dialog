# simple-dialog

A simple, yet powerful dialog implementation.


## Features

* (optional) backdrop
* (optional) close handle
* (optional) modal
* event emitter
* return values


## Usage

```javascript
var SimpleDialog = require('simple-dialog');

var dialog = SimpleDialog({
  template: '<h1>HEADER</h1>',
});

// get result value
dialog.on('close', function(returnValue) {
  console.log('dialog closed with', returnValue);
});

// open dialog
dialog.open();

// close with value
dialog.close({ foo: 'BAR' });
```


## Extensible

You may hook into various dialog life-cycle events in order to extend it to fit into your favourite front-end library. An integration into [AngularJS](https://angularjs.org/) may look like this:


```javascript
var Dialog = require('simple-dialog');

var module = angular.module('simpleDialog');

module.factory('ngSimpleDialog', function($rootScope, $compile) {

  function getBody(dialog) {
    return dialog.element.querySelector('.dlg-body');
  }

  /**
   * Users may pass a scope argument that will be exposed inside the dialog template.
   *
   * @param  {Object} options
   * @return {SimpleDialog}
   */
  return function(options) {
    var dialog = Dialog(options);

    var body = getBody(dialog);
    var linkBody = $compile(angular.element(body));

    dialog.on('pre-open', function() {
      var scope = dialog.scope = $rootScope.$new();

      angular.extend(scope, options.scope || {}, { dialog: dialog });

      var newBody = linkBody(scope),
          oldBody = getBody(dialog);

      angular.element(oldBody).replaceWith(newBody);
    });

    dialog.on('close', function() {
      var scope = dialog.scope;

      scope.$applyAsync();
      scope.$destroy();
    });

    return dialog;
  };
});
```

To use it in your angular app:

```javascript
var dialogTemplate =
  '{{ a }} + {{ b }} <br/>' +
  '<button ng-click="dialog.close(a + b)">CALCULATE</button>';


function MyController($scope, ngSimpleDialog) {

  var data = {
    a: 'A',
    b: 'B'
  };

  this.openDialog = function() {

    var dialog = ngSimpleDialog({
      template: dialogTemplate,
      scope: data
    });

    dialog.open().on('close', function(resultValue) {
      data.resultValue = resultValue
    });
  };
}
```


## License

MIT