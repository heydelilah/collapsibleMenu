
define(function(require, exports, module) {

	var $ = require('jquery');
	var should = chai.should()

	var app = require('/menu');

	// 创建实例
	var menu = new app.main({
		target: $('#menu')
	});
	menu.hide();

	describe('Menu modules', function () {

		it('should getData', function () {
			var data = menu.getData()
			data.should.equal('sss');

		});


	});

});