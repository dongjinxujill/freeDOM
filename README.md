# freeDOM

A JavaScript DOM Manipulation Library 

## Description
DOMquery is a DOM Manipulation library for making AJAX requests, handling events, manipulating the DOM, and guaranteeing it works across browsers inspired by jQuery and written in vanilla JavaScript. 
Functionalities include:

* Hold DOM nodes and offer convenient methods for traversal and manipulation, like empty, remove, attr, addClass, removeClass, html, find, children, and parent
* Select DOM Elements by HTML tag, id, or class
* Handle events with callbacks using on and off methods
* Make AJAX requests

## Using freeDOM
* Clone the repo into your project
* Import freeDOM.js into your project by including it in a script tag in the header of your HTML

## API

### $l

The $l wrapper has three main uses:
* Creates a new `DOMNodeCollection` object, ex: `$l("<li>")`
* Takes an HTMLElement and wraps it to return an `DOMNodeCollection` object
* Selects elements via tags, css selectors or id, `$l(".class") or $l("#id")`

### DOM Traversal

**`#find(selector)`** 

Returns a `DOMNodeCollection` of all the nodes that match the argument that are children of the `DOMNodeCollection` nodes.  


**`#children()`** 

Returns a `DOMNodeCollection` of all children of all nodes within the `DOMNodeCollection`.  


**`#parent()`**  

Returns a `DOMNodeCollection` of the parent of all nodes within the `DOMNodeCollection`.  

  
**`#remove()`**

Removes the element from the DOM.

### Event Handling

**`#on(action,callback)`** 

Installs an 'action' event handler. When triggered runs the cb callback.


**`#off(action)`** 

Removes the 'action' listener from the DOM

### Manipulation

**`#addClass(className)`**

Adds a class attritube to all nodes within the `DOMNodeCollection`.  

**`#removeClass(className)`**

Remove a class attritube of all nodes within the `DOMNodeCollection`.  

**`#append(arg)`**

arg can be a string, HTMLElement, or `DOMNodeCollection` object
Appends the outerHTML of each element in the argument to the innerHTML of ALL nodes within the `DOMNodeCollection`.


**`#empty()`**

Clears the content from all nodes within the `DOMNodeCollection`.

**`#attr(key, [value])`**

Accepts a key and optional value. 
If the value exists, it will add that value and key to all nodes within the `DOMNodeCollection`.
If there is no value, it will return the value corresponding for the key of the first node.
