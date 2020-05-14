# bookmarklet-compiler
Compiles a node.js script into a bookmarklet ready to be pasted into your browser. Bookmarklets are Javascript code stored in a bookmark in your browser, when you click it the code executes on the page you currently have open in your browser. Creating one is as simple as adding a new bookmark and pasting a `javascript:` url for the link. Accessing the bookmarklet can also be performed on Android Chrome, by typing the name you gave the bookmark and clicking it once it shows in the results list.

This gives you the power to use everything node.js and ES6 have to offer in an elegant and readable script, to receive a babel transpiled, polyfilled and minified result.

     npm install [-g or --save-dev] bookmarklet-compiler

     bookmarklet my-node-es6-source.js outfilename.min.js
     
You can open the output file at any time, but also the generated `javascript:` url is automatically copied to your clipboard.
