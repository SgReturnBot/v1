// ==UserScript==
// @name        SG-Return BOT
// @namespace   sg-return-batiment
// @include     http://www.sg-return.fr/*
// @require		https://raw.github.com/dfilatov/jquery-plugins/master/src/jquery.inherit/jquery.inherit.min.js
// @require 	https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @version     22
// @grant		none
// ==/UserScript==

/**
 * Version Local
 */
//var url = "http://localhost/devBot/";
/**
 * Version Prod
 */
var url = "https://raw.github.com/SgReturnBot/v1/master/library/";
var url_data_js = "https://raw.github.com/SgReturnBot/v1/master/json/";
	$.when(
		$.getScript(url + "batiments.js"),
		$.getScript(url + "technologies.js"),
		$.getScript(url + "library.js"),
		$.getScript(url_data_js + "joueur.js")
	).done(function(){
			
			
			
			if (typeof $.cookie('bot_bat') === "undefined") 
				$.cookie('bot_bat', 1);
			if (typeof $.cookie('bot_tech') === "undefined") 
				$.cookie('bot_tech', 1);
			if (typeof $.cookie('bot_stat') === "undefined") 
				$.cookie('bot_stat', 1);
				
			Menu();
			
			if ($.cookie('bot_bat') == 1)
				var OBatiments = new Batiments(true);
				
			if ($.cookie('bot_tech') == 1)
				var OTechnologies = new Technologies(true);
			
			
			
			
			
	});
