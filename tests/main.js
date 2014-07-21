
define(function(require, exports, module) {

	var $ = require('jquery');
	var should = chai.should()

	var menu = require('../menu');


describe('Menu modules', function () {
	describe('Initialization', function () {
		beforeEach(function () {
			$('<div>').attr('id', 'fixture').css('display','none').appendTo('body');
			this.menu = new menu.main({
				target: $("#fixture")
			})
			// 阻碍默认方法load
			this.save_stub = sinon.stub(this.menu, "load");
		});

		afterEach(function () {
			$("#fixture").remove();
		});

		it('should getData', function () {
			var data = this.menu.getData()
			data.should.equal('sss');

		});
	});

	describe('Build DOM', function () {

	});



})



});