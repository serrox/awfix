Fixing Adobe Authorware Player content for IE7.

# What is AWFix 0.1? #

AWFix 0.1:

  * Offers a Javascript solution that aims to provide a complete fix for issues with the Authorware webplayer in IE7 running content that call the Authorware Script function ReadURL("javascript:...").
  * Removes the "Click to Activate" active content behavior.
  * Utilizes only one small Javascript file (size: 1.7Kb, GZIPed: .8Kb) and one HTML file
  * Intends to extend the service life of existing Authorware content where in many cases it is unreasonable to edit the original source code.
  * Is an open source project by Chris Phillips http://awfix.googlecode.com/


# Why Should you use AWFix 0.1? #

  * Fixes Authorware 7 ReadURL("javascript:...") without edits to a7p source code, republishing or .aam edits.
  * Can be implemented with very basic to no understanding of HTML.
  * Uses unobtrusive Javascript and Javascript best practices.
  * Does not require any understanding of Javascript.
  * Is easy to use.


# How do you use AWFix 0.1? #

  1. Download the current AWFix 0.1 from http://awfix.googlecode.com/files/awfix%200%201_new.zip
  1. Extract files needed are awfix.js and iframe.htm
  1. Place both files in the same directory as your .aam
  1. Edit the HTML page Authorware publishes to include a reference to awfix.js in the 

&lt;HEAD&gt;

 as below:
```
<html>
<head>
<title>Example</title>
<script type="text/javascript" src="awfix.js"></script>
</head>
<body bgcolor="#FFFFFF">
<object classid="CLSID:15B782AF-55D8-11D1-B477-006097098764" codebase="http://download.macromedia.com/pub/shockwave/cabs/authorware/awswax70.cab#version=7,0,0,69" width="640" height="480">
  <param name="SRC" value="example.aam">
  <param name="PALETTE" value="background">
  <param name="WINDOW" value="inPlace">
  <param name="BGCOLOR" value="#FFFFFF">
  <embed src="example.aam" palette="background" window="inPlace" bgcolor="#FFFFFF" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveAuthorware" type="application/x-authorware-map" width="640" height="480">
  </embed>
</object>
</body>
</html>
```

# What browsers does AWFix support? #

AWFix supports all A-Grade browsers, defined by Yahoo: http://developer.yahoo.com/yui/articles/gbs/

  * Firefox 2.x & 3 Beta
  * IE 6, 7 & 8 Beta
  * Safari 3.x
  * Opera 9.x

## Why Does AWFix modify the embed for browsers other than IE7+ ##

The Authorware object location needs to be the same for all browsers. Note that AWFix moves the Authorware object to an iframe, therefore Javacript references inside ReadURL may need to change to parent.yourCode .

