define(function(require, exports, module) {

	var $ = require('jquery');

	var Menu = function(config){
		this.init(config);
	}

	Menu.prototype = {
		init: function(config){
			var c = this.$config = $.extend({}, {
				url: '',
				data: null,
				target: $('body')
			}, config);

			this.$el = null;

			if(c.url){
				this.load(c.url);
			}

			if(c.data){
				this.build(c.data);
			}
		},
		build: function(data){
			var c = this.$config;
			var target = c.target;

			this.$el = this.buildItem(data, 0);

			target.append(this.$el);

			target.find('i').on('click', this, this.eventToggleMenu);
		},
		buildItem: function(data,level, index, noSub){
			var self = this;
			var uri = ["#manager/account/", "#manager/plan/", "#manager/unit/"];

			var zone = ['<ul level="'+level+'" data-i="'+index+'" >'];


			$.each(data, function(index,item){

				zone.push(
					'<li data-i="'+item.id+'" class="title" level="'+level+'">',
					noSub ? '':'<i></i>' ,
					'<a class="uk-text-truncate" href="'+uri[level]+item.id+'">' + item.name + '</a>',
					'</li>'
				);
			});
			zone.push('</ul>');

			return $(zone.join(''));
		},
		load: function(url){
			var self = this;
			$.get(url, function(data){
				data = $.parseJSON(data);
				self.build(data);
			});
		},
		loadSub: function(url, target, level, index, noSub){
			var self = this;
			$.get(url, function(data){
				data = $.parseJSON(data);
				var sub = self.buildItem(data, level, index, noSub);
				target.after(sub);

				sub = target.siblings('ul[data-i="'+index+'"]');
				sub.find('i').on('click', self, self.eventToggleMenu);

			});
		},
		eventToggleMenu: function(ev) {
			var self = ev.data;
			var arrow = $(this);
			var isExpand = arrow.hasClass('unfold');

			var item = $(this).parent();
			var i = +item.attr('data-i');
			var level = +item.attr('level');

			var sub = item.siblings('ul[data-i="'+i+'"]');
			if(!isExpand){
				if(!sub.length){
					var url = (level == 0) ? 'data/plan.json' : 'data/unit.json';
					var noSub = (level == 1) ? true: false;
					self.loadSub(url, item, level+1, i, noSub);

				}else{
					sub.show();
				}
			}else{
				sub.hide();
			}

			arrow.toggleClass('unfold');

			return false;
		},
		getData: function(){
			return 'sss';
		},
		hide: function(){
			var c = this.$config;
			var target = c.target;
			target.hide();
		},
		show: function(){
			var c = this.$config;
			var target = c.target;
			target.show();
		}
	};

	exports.main = Menu;

});