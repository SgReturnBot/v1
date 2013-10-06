function AfficherPage(url, contenant) {
	$.ajax({
		type:"POST",
		data:traiteUrl(url),
		url: url+'&ajax=1&affichageAJAX=1',
		success:function(data){
			$('#'+contenant).html(decodeURIComponent(escape(data))).promise().done(function() {
				
				if ($.cookie('bot_bat') == 1)
					var Bsatiments = new Batiments(false);
					
				if ($.cookie('bot_tech') == 1)
					var OTechnologies = new Technologies(false);
					
			});
			
			
			ExecPage(contenant);
			if(contenant == 'otp1') {
				$('#tuto_assombri').show();
				$('#tuto_wrapper').show();
				$('#tuto_wrapper').center();
			} else if(url.indexOf("noActivity") == -1) {
				reloaded();
			}
		}
	});
}

function getIDPlanet() {
    
    return $('select[name=idcolo] :selected').val();
    
}

function getCookie(sName) {
	var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");

	if (oRegex.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
	} else {
			return null;
	}
}

function Menu() {

	var html = "<h1><span></span><p>Options Bot</p></h1>";
	html += "<ul>";
	html += '<li><a href="OptionsBot" onclick="MenuBot(); return false;" title="">Options du Bot</a>';
	html += "</ul>";
	
	$(html).insertBefore($("#menu_ig .glyphs").last());

}

function MenuBot(){
	
	
	var html = "";
	
	html += '<div class="onglets"><span class="Categorie"><a class="active" onclick="return false;" href="index.php?page=Options&cat=1">Activer/Désactiver des options</a></span></div><div id="ResSeparationMin"></div>';
	html += '<br /><br /><div style="width: 300px; margin: 0 auto;">';
		
		var check_bat = "";
		if ($.cookie('bot_bat') == 1)  check_bat = ' checked="checked" ';
		
		var check_tech = "";
		if ($.cookie('bot_tech') == 1)  check_tech = ' checked="checked" ';
		
		var check_stat = "";
		if ($.cookie('bot_stat') == 1)  check_stat = ' checked="checked" ';
	
		html += '<input '+check_bat+' name="batiment" value="1" type="checkbox" style="position: relative !important; opacity:1 !important;"> Activer le bot Batiment<br />';
		html += '<input '+check_tech+' name="technologie" value="1" type="checkbox" style="position: relative !important; opacity:1 !important;"> Activer le bot Technologie<br />';
		html += '<input '+check_stat+' name="statistique" value="1" type="checkbox" style="position: relative !important; opacity:1 !important;"> Activer le bot Statistique<br />';
	html += '</div><br /><br /><br />';
	
	
	
	$('#contenu').html(html);
	
	
	$('input[name=batiment]').change(function () {
		if($(this).is (':checked')) {
			$.cookie('bot_bat', 1);
		} else $.cookie('bot_bat', 0);
	});
	
	$('input[name=technologie]').change(function () {
		if($(this).is (':checked')) {
			$.cookie('bot_tech', 1);
		} else $.cookie('bot_tech', 0);
	});
	
	$('input[name=statistique]').change(function () {
		if($(this).is (':checked')) {
			$.cookie('bot_stat', 1);
		} else $.cookie('bot_stat', 0);
	});
}