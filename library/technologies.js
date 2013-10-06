var Technologies = $.inherit({

	__constructor : function(reload){
	
		if(typeof $.cookie('techwaitlist') === "undefined")
			$.cookie('techwaitlist', "");
			
		
		this.tab_nom_tech = new Object;
		this.creerListeNom();
		
		if(/page=Technologies/.test(location.search))
			this.Actualisation();
			
		if (reload)
			this.LaunchTech();
	},
	
	mapper: function() {
		
		$('.batiment .border').each(function() {
			var a = $(this).find('a').first();
			
			value = a.attr('onclick');

			var id = /Tech=([0-9]+)/.exec(value)[1];
			
			a.attr('name', 'a_bat_'+id);
			$(this).attr('name', 'bat_'+id);
			
		});
		
	},
	
	creerListeNom : function() {
		var $this = this;
		
		if(typeof $.cookie('tab_nom_tech') == 'undefined')
			$.ajax({
				url: "/index.php?page=ArbreTech&Type=Technologies&nores=1&ajax=1&affichageAJAX=1",
				type: "POST",
				dataType : "html",
				data: {
					Type:	'Technologies',
					nores:	'1',
					page:	'ArbreTech'
				}
			}).done(function(data) {
				$('body').append( $('<div id="ConnardeMattt34" name="ChichilleTG">' + data + '</div>').hide());
				var $tab_ligne = $('#ConnardeMattt34').find('table.texte tr td:first-child a.link');
				
				$($tab_ligne).each(function(){
					
					var id = /Tech=([0-9]+)/.exec($(this).attr('onclick'))[1];
					$this.tab_nom_tech[id] = $(this).text(); console.log($(this).text());
				});
				$('#ConnardeMattt34').remove();
				$.cookie('tab_nom_tech', JSON.stringify($this.tab_nom_tech));
			});
		else
			$this.tab_nom_tech = $.parseJSON($.cookie('tab_nom_tech'));
	},
	
	Actualisation: function () {
		
		this.InsertWaitList();
		
		var obj = this;
		
		setTimeout(function() {
			obj.Actualisation();
		}, 500);
		
	},
	
	InsertWaitList: function() {
		if ($('#waitlist').length === 0) {
			
			$('<div style="text-align: center;" class="entete">Liste d\'attente de construction:</div><div id="waitlist" style="width: 220px; padding: 0 20px 0 20px; border: 1px solid black; height: 120px; overflow: auto; background-color: #333333; margin: 0 auto;"></div><br /><div style="text-align: center;"><a href="Annuler" onclick="return false;" class="removebat">Annuler la derniere technologie de la liste</a></div><br /><div id="ResSeparationMin"></div>').insertAfter('#ResSeparationMin');
			this.RemoveLastBat();
			this.mapper();
			this.InsertBouttonBat();
		}
		
		var batiment = '';
		$this = this;
		
		var t = $.cookie('techwaitlist').split(':');
		
		if (t.length !== 0 && $.cookie('techwaitlist') !=="") {

			$.each(t, function(index) {
				batiment += (index + 1) + " - " + $this.tab_nom_tech[t[index]] + " <br />" ;
				
			});
		} else batiment = "Aucune technologie en liste d'attente.";
		
		$('#waitlist').html(batiment);
		
	},
	
	InsertBouttonBat:  function() {
		var bats = $('.construire');
		
		$('a[title=Construire]').remove();
		
		bats.each(function() {
			$(this).html($(this).html()+'<img src="theme/images/icones/construire.png" class="buildBot" style="cursor: pointer;" />');
		});
		
		var obj = this;
		
		$('.buildBot').click(function() {
			obj.Buildtechwaitlist(this);
		});
		
	},
	
	Buildtechwaitlist: function (el) {
		
		var value = $(el).parent().parent().find('a').attr('onclick');

		this.insertBatCookie(/Tech=([0-9]+)/.exec(value)[1]);
		
	},
	
	
	insertBatCookie: function (idBat) {
		
		if (typeof $.cookie('techwaitlist') === "undefined" || $.cookie('techwaitlist') == "") {
			$.cookie('techwaitlist', idBat)
		} else {
			$.cookie('techwaitlist', $.cookie('techwaitlist') + ':' + idBat);
		}
		
	},
	
	LaunchTech: function() {
		var obj = this;
		
		if (typeof $.cookie('techwaitlist') !== "undefined" && $.cookie('techwaitlist') !== "") {

			$.ajax({
				url: "/index.php?page=salleDeControle",
			}).done(function(data) {
				if ( $($(data).find('#constructions').find('li')[1]).find('.Compte_a_rebours').length == 0 ) {
					
					obj.HasRequisForBuild($.cookie('techwaitlist').split(':')[0]);
				}
				
			})

		}
		
		
		
		setTimeout(function() {
			obj.LaunchTech();
		}, 10000);
		
	},
	
	HasRequisForBuild: function(id) {
	
		if (id < 200)
			var url = "/index.php?page=Technologies&Tech=1&nores=1";
		else if (id < 300)
			var url = "/index.php?page=Technologies&Tech=2&nores=1";
			
		$.ajax({
			url: url,
			async : false
		}).done(function(data) {
		
			$(data).find('.batiment .border').each(function() {
				var a = $(this).find('a').first();
				var value = a.attr('onclick');
				var title = a.attr('title');
				
				var idd = /Tech=([0-9]+)/.exec(value)[1];
				
				if (id == idd) {
					if (!/Valeur_PASOK/.test(title)) {
						AfficherPage('index.php?page=EvolutionTech&tech=' + id + '&Go=1','contenu');
						
						var nouvelle_liste = $.cookie('techwaitlist').split(':');
						nouvelle_liste.shift();
						$.cookie('techwaitlist', (nouvelle_liste.length > 0) ? nouvelle_liste.join(':') : '');
					}
					
				}
				
				
			});
			
		});
		
	},
	
	RemoveLastBat: function() {
		
		$('.removebat').click(function() {
		
			var tab = $.cookie('techwaitlist').split(':');
			tab.pop();
			
			$.cookie('techwaitlist', tab.join(':'));
		});
		return false;
	}
	
});