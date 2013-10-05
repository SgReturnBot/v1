// ==UserScript==
// @name        SG-Return BOT
// @namespace   sg-return-batiment
// @include     http://www.sg-return.fr/*
// @require		https://raw.github.com/dfilatov/jquery-plugins/master/src/jquery.inherit/jquery.inherit.min.js
// @require 	https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @version     4
// @grant       none
// ==/UserScript==

$.when(
    $.getScript("https://raw.github.com/SgReturnBot/v1/master/library/batiments.js")
).done(function(){

	$(document).ready(function() {
		var Bsatiments = new Batiments();
	});
});


