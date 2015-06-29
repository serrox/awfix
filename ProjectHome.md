# AWFix #
When Internet Explorer 7 was released it triggered a runtime bug in Adobe Authorware's implementation of ReadURL(). The tabbed windows in IE7+ require ActiveX controls to use a different method to "navigate" to javascript:... url's because all windows now share a single address bar. Since IE7+ runs the iframe in a separate cpu thread and memory space it has exclusive access to its own virtural address bar. Therefore ReadURL("javascript:...") will function normally when the Authorware object is executed from inside an iframe.

This code is a simple js file that, upon onDOMContentLoaded, will move all Authorware objects into an iframe. To implement this code each HTML page that has an Authorware object must have 

&lt;script type="text/javascript" src="awfix.js"&gt;



&lt;/script&gt;

 in the head block. 2 files are required in the same folder as the .aam map file, awfix.js and iframe.htm.