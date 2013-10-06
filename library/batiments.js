var Batiments = $.inherit({

	__constructor : function(reload){
	
		if(typeof $.cookie('batwaitlist_' + getIDPlanet()) === "undefined")
			$.cookie('batwaitlist_' + getIDPlanet(), "");
			
		
		this.tab_nom = new Object;
		this.creerListeNom();
		
		if(/page=Batiments/.test(location.search))
			this.Actualisation();
			
		if (reload)
			this.LaunchBat();
	},
	
	mapper: function() {
		
		$('.batiment .border').each(function() {
			var a = $(this).find('a').first();
			
			value = a.attr('onclick');

			var id = /Bat=([0-9]+)/.exec(value)[1];
			
			a.attr('name', 'a_bat_'+id);
			$(this).attr('name', 'bat_'+id);
			
		});
		
	},
	
	creerListeNom : function() {
		var $this = this;
		
		if(typeof $.cookie('tab_nom') == 'undefined')
			$.ajax({
				url: "/index.php?page=ArbreTech",
			}).done(function(data) {
				var $tab_ligne = $(data).find('#contenusr table.texte tr td:first-child a.link');
				$tab_ligne.each(function(){
					var id = /Bat=([0-9]+)/.exec($(this).attr('onclick'))[1];
					$this.tab_nom[id] = $(this).text();
				});
				
				$.cookie('tab_nom', JSON.stringify($this.tab_nom));
			});
		else
			$this.tab_nom = $.parseJSON($.cookie('tab_nom'));
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
			
			$('<div style="text-align: center;" class="entete">Liste d\'attente de construction:</div><div id="waitlist" style="width: 220px; padding: 0 20px 0 20px; border: 1px solid black; height: 120px; overflow: auto; background-color: #333333; margin: 0 auto;"></div><br /><div style="text-align: center;"><a href="Annuler" onclick="return false;" class="removebat">Annuler le dernier batiment de la liste</a></div><br /><div id="ResSeparationMin"></div>').insertAfter('#ResSeparationMin');
			this.RemoveLastBat();
			this.mapper();
			this.InsertBouttonBat();
		}
		
		var batiment = '';
		$this = this;
		
		var t = $.cookie('batwaitlist_' + getIDPlanet()).split(':');
		
		if (t.length !== 0 && $.cookie('batwaitlist_' + getIDPlanet()) !=="") {

			$.each(t, function(index) {
				batiment += (index + 1) + " - " + $this.tab_nom[t[index]] + " <br />" ;
				
			});
		} else batiment = "Aucun batiment en liste d'attente.";
		
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
			obj.BuildBatWaitList(this);
		});
		
	},
	
	BuildBatWaitList: function (el) {
		
		var value = $(el).parent().parent().find('a').attr('onclick');

		this.insertBatCookie(/Bat=([0-9]+)/.exec(value)[1]);
		
	},
	
	
	insertBatCookie: function (idBat) {
		
		if (typeof $.cookie('batwaitlist_' + getIDPlanet()) === "undefined" || $.cookie('batwaitlist_' + getIDPlanet()) == "") {
			$.cookie('batwaitlist_' + getIDPlanet(), idBat)
		} else {
			$.cookie('batwaitlist_' + getIDPlanet(), $.cookie('batwaitlist_' + getIDPlanet()) + ':' + idBat);
		}
		
	},
	
	LaunchBat: function() {
		var obj = this;
		
		if (typeof $.cookie('batwaitlist_' + getIDPlanet()) !== "undefined" && $.cookie('batwaitlist_' + getIDPlanet()) !== "") {

			$.ajax({
				url: "/index.php?page=salleDeControle",
			}).done(function(data) {
				if ($(data).find('#constructions').find('li').first().find('.Compte_a_rebours').length === 0 ) {
					
					obj.HasRequisForBuild($.cookie('batwaitlist_' + getIDPlanet()).split(':')[0]);
					
				}
				
			})

		}
		
		
		
		setTimeout(function() {
			obj.LaunchBat();
		}, 10000);
		
	},
	
	HasRequisForBuild: function(id) {
	
		if (id < 200)
			var url = "/index.php?page=Batiments&Bat=1&nores=1";
		else if (id < 300)
			var url = "/index.php?page=Batiments&Bat=2&nores=1";
		else if (id < 400)
			var url = "/index.php?page=Batiments&Bat=3&nores=1";
			
		$.ajax({
			url: url,
			async : false
		}).done(function(data) {
		
			$(data).find('.batiment .border').each(function() {
				var a = $(this).find('a').first();
				var value = a.attr('onclick');
				var title = a.attr('title');
				
				var idd = /Bat=([0-9]+)/.exec(value)[1];
				
				if (id == idd) {
					if (/Valeur_PASOK/.test(title)) {
						
						if (/Energie : <span class='Valeur_PASOK'>/.test(title)) {

								AfficherPage('index.php?page=EvolutionBat&bat=104&Go=1','contenu');
								setTimeout(function() {
									AfficherPage('index.php?page=EvolutionBat&bat=101&Go=1','contenu');
								}, 500);
							
						}
						
						
					} else {
						AfficherPage('index.php?page=EvolutionBat&bat=' + id + '&Go=1','contenu');
						
						var nouvelle_liste = $.cookie('batwaitlist_' + getIDPlanet()).split(':');
						nouvelle_liste.shift();
						$.cookie('batwaitlist_' + getIDPlanet(), (nouvelle_liste.length > 0) ? nouvelle_liste.join(':') : '');
					}
					
				}
				
				
			});
			
		});
		
	},
	
	RemoveLastBat: function() {
		
		$('.removebat').click(function() {
		
			var tab = $.cookie('batwaitlist_' + getIDPlanet()).split(':');
			tab.pop();
			
			$.cookie('batwaitlist_' + getIDPlanet(), tab.join(':'));
		});
		return false;
	}
	
});