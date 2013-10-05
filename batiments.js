var Batiments = $.inherit({

	__constructor : function(){
		this.tab_nom = new Object;
		this.creerListeNom();
		
		if(/page=Batiments/.test(location.search))
			this.Actualisation();
		
		this.LaunchBat();
		
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
		this.InsertBouttonBat();
		this.InsertWaitList();
		
		var obj = this;
		
		setTimeout(function() {
			obj.Actualisation();
		}, 500);
		
	},
	
	InsertWaitList: function() {
		if ($('#waitlist').length === 0) {
			
			$('<div style="text-align: center;">Liste d\'attente de construction:</div><div id="waitlist" style="width: 220px; padding: 0 20px 0 20px; border: 1px solid black; height: 120px; overflow: auto; background-color: #333333; margin: 0 auto;"></div><br /><br /><div id="ResSeparationMin"></div>').insertAfter('#ResSeparationMin');
			
		}
		
		var batiment = '';
		$this = this;
		
		var t = $.cookie('batwaitlist').split(':');
		
		if (t.length !== 0) {
			$.each(t, function(index) {
				batiment += (index + 1) + " - " + $this.tab_nom[t[index]] + " <br />" ;
				
			});
		}
		$('#waitlist').html(batiment);
		
	},
	
	InsertBouttonBat:  function() {
		var bats = $('.construire');
		
		bats.each(function() {
			$(this).html('<img src="theme/images/icones/construire.png" class="buildBot" style="cursor: pointer;" />');
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
		
		if (typeof $.cookie('batwaitlist') === "undefined" || $.cookie('batwaitlist') == "") {
			$.cookie('batwaitlist', idBat)
		} else {
			$.cookie('batwaitlist', $.cookie('batwaitlist') + ':' + idBat);
		}
		
	},
	
	LaunchBat: function() {
	
		if (typeof $.cookie('batwaitlist') !== "undefined" && $.cookie('batwaitlist') !== "") {
			
			$.ajax({
				url: "/index.php?page=salleDeControle",
			}).done(function(data) {
				console.log($(data).find('#constructions').find('li').first().find('.Compte_a_rebours').length)
				if ($(data).find('#constructions').find('li').first().find('.Compte_a_rebours').length === 0 ) {
					
					AfficherPage('index.php?page=EvolutionBat&bat=' + $.cookie('batwaitlist').split(':')[0] + '&Go=1','contenu');
					
					var nouvelle_liste = $.cookie('batwaitlist').split(':');
					nouvelle_liste.shift();
					$.cookie('batwaitlist', (nouvelle_liste.length > 0) ? nouvelle_liste.join(':') : '');
					
				}
				
			})

		}
		
		var obj = this;
		
		setTimeout(function() {
			obj.LaunchBat();
		}, 10000);
		
	}
	
});