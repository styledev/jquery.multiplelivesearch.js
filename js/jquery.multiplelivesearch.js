jQuery.fn.liveUpdate = function(list,inputfield,clearbutton){
	list = jQuery(list);
	inputfield.keyup(function(e) {if (e.keyCode == 27) { $(this).val('') }});
	clearbutton.click(function() {
		$(this).siblings("input."+inputfield).val("");
		$(this).siblings("input."+inputfield).focus();
	})
	if ( list.length ) {
		var rows = list.children('li'),
			cache = rows.map(function(){
				return this.innerHTML.toLowerCase();
			});
		this
			.keyup(filter).keyup()
			.parents('form').submit(function(){
				return false;
			});
	}
	return this;
	function filter(){
		var term = jQuery.trim( jQuery(this).val().toLowerCase() ), scores = [];
		if ( !term ) {
			$(this).siblings("img."+clearbutton).hide();
			rows.show();
		} else {
			$(this).siblings(clearbutton).show();
			rows.hide();
			cache.each(function(i){
				var score = this.score(term);
				if (score > 0) { scores.push([score, i]); }
			});
			jQuery.each(scores.sort(function(a, b){return b[0] - a[0];}), function(){
				jQuery(rows[ this[1] ]).show();
			});
		}
	}
};

function droplist(id1,id2,connect_class){
	$(id1+","+id2).sortable({
		connectWith: connect_class,
		placeholder: 'ui-state-highlight'
	}).disableSelection();
};