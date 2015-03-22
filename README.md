# simple-dialog

A simple, yet powerful dialog implementation.

![Open Dialog Window](https://github.com/nikku/simple-dialog/blob/master/resources/screenshot.png)


## Features

* content from string or element
* (optional) backdrop
* (optional) close handle
* (optional) modal
* life-cycle events
* return values


## Usage

```javascript
var SimpleDialog = require('simple-dialog');

var dialog = SimpleDialog({
  template: '<h1>HEADER</h1>'
});

// open dialog
dialog.open(function(returnValue) {
  console.log('dialog closed with', returnValue);
});

// close with value
dialog.close({ foo: 'BAR' });
```


## Extensible

You may hook into various dialog life-cycle events in order to extend it to fit into your favourite front-end library. An example integration into [AngularJS](https://angularjs.org/) can be found [here](https://github.com/nikku/ng-simple-dialog).


## License

MIT
