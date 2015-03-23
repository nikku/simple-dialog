# simple-dialog

A simple dialog component for the browser.

![Open Dialog Window](https://github.com/nikku/simple-dialog/blob/master/resources/screenshot.png)


## Features

* content from string or element
* (optional) backdrop
* (optional) close handle
* (optional) modal
* return values
* life-cycle events


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


## Configuration Options

The dialog constructor accepts the following configuration options:

```
{Boolean}        [backdrop=true]     if false, do not show backdrop
{Boolean}        [closable=true]     if false, do not close via close control/backdrop
{String}         [id]                an id to assign to the dialog
{Element|String} [parent='body']     the parent node to attach the dialog to
{Element|String} [template]          the element to display as the dialog content
```


## Access from the DOM

The dialog will attach itself to its dom node via the `dialog` property ònce it is attached to the document tree.

```javascript
SimpleDialog({
  id: 'how-are-you',
  template: 'How are you?'
});

setTimeout(function() {
  document.querySelector('#how-are-you').dialog.close();
}, 2000);
```


## Extend the Dialog

The dialog is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter). Extend it by hooking into one of the following life-cycle events:

```
attach(parentElement)     attached to parentElement
pre-open                  about to open
open                      dialog is open
pre-close(resultValue)    about to close with returnValue
close(resultValue)        dialog closed with returnValue
detach(parentElement)     detached from parentElement
```

The `this` argument inside an event listener will always refer to the respective dialog instance:


```javascript
SimpleDialog({ template: 'HUUUU!' }).on('pre-open', function() {
  var dialog = this;

  setTimeout(function() {
    dialog.close('timeout, haha!');
  }, 2000);
});
```

Use the life-cycle events in order to make it fit into your favourite front-end library. An example integration into [AngularJS](https://angularjs.org/) can be found [here](https://github.com/nikku/ng-simple-dialog).


## License

MIT
