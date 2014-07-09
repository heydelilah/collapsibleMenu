// (function($){




	$('div').html(buildItem(menu, 0));
	$('div').find('i').on('click',eventToggleMenu);

	// 创建动态菜单
	function buildItem (menu,level, index) {
		var self = this;
		var uri = ["#manager/account/", "#manager/plan/", "#manager/unit/"];

		var zone = ['<div class="indent" data-id="'+index+'">'];
		$.each(menu, function(index,item){
			// 是否有子菜单
			var hasSub = item.menu && item.menu.length;
			zone.push(
				hasSub ? '<i data-id="'+index+'"></i>' : '',
				'<a class="uk-text-truncate" href="'+uri[level]+item.id+'">' + item.text + '</a>',
				hasSub ? self.buildItem(item.menu, level+1, index) : ''
			);
		});
		zone.push('</div>');

		return zone.join('');
	}
	function eventToggleMenu (ev, el) {
		var el = $(this);
		var id = el.attr('data-id');
		el.siblings('div[data-id='+id+']').toggle();
		el.toggleClass('act');
		return false;
	}



// })(jQuery)