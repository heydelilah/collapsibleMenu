// (function($){





var Menu = function(config){
	this.init(config);
}

Menu.prototype = {
	init: function(config){
		this.$config = $.extend({}, {
			target: $('body')
		}, config);

		this.load();
	},
	load: function(){
		var self = this;
		$.get('data/menu.json', function(data){
			data = $.parseJSON(data);
			self.build(data);
		});
	},
	build: function(data){
		console.log(data)
		var c = this.$config;
		var zone = this.buildItem(data, 0)
		c.target.append(zone);
		c.target.find('i').on('click',this.eventToggleMenu);
	},
	buildItem: function(menu,level, index){
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
	},
	eventToggleMenu: function(ev, el) {
		var el = $(this);
		var id = el.attr('data-id');
		el.siblings('div[data-id='+id+']').toggle();
		el.toggleClass('act');
		return false;
	}
};



var menu = new Menu({
	target: $('#menu')
});





// })(jQuery)