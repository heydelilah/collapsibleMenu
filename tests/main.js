
define(function(require, exports, module) {

	var $ = require('jquery');
	var should = chai.should()

	var menu = require('../menu');


describe('Menu modules', function () {
	describe('Initialization', function () {
		beforeEach(function () {
			this.menu = new menu.main({});
			this.$c = this.menu.$config;
		});

		it('should default the URL to am empty string', function () {
			this.$c.url.should.equal('');
		});

		it('should default the TARGET to BODY', function () {
			this.$c.target[0].nodeName.should.equal('BODY');
		});

	});

	describe('Attributes', function () {
		beforeEach(function () {
			$('<div>').attr('id', 'fixture').css('display','none').appendTo('body');
			this.menu = new menu.main({
				target: $("#fixture"),
				url: 'fake.json'
			})

			this.$c = this.menu.$config;
		});

		afterEach(function () {
			$("#fixture").remove();
		});

		it('should support setting the URL', function () {
			this.$c.url.should.equal('fake.json');
		});

		it('should support setting the TARGET', function () {
			this.$c.target[0].nodeName.should.equal('DIV');
			this.$c.target.attr('id').should.equal('fixture');
		});
	});

	describe('Load Data', function () {
		beforeEach(function () {
			$('<div>').attr('id', 'fixture').css('display','none').appendTo('body');
			this.menu = new menu.main({
				target: $("#fixture")
			});
			this.loadStub = sinon.stub(this.menu, 'load');
		});

		afterEach(function () {
			this.loadStub.restore();
			$("#fixture").remove();
		});

		it('should load data when be called', function () {
			// this.menu.load('data/account.json');
			this.loadStub.should.have.been.calledOnce;
		});
	});

	describe('View', function () {
		beforeEach(function () {
			$('<div>').attr('id', 'fixture').css('display','none').appendTo('body');
			this.menu = new menu.main({
				target: $("#fixture"),
				data: [
					{
						"id":1,
						"name": "一级菜单A"
					},
					{
						"id":2,
						"name": "一级菜单B"
					}
				]

			});
			this.loadStub = sinon.stub(this.menu, 'load');
		});

		afterEach(function () {
			this.loadStub.restore();
			$("#fixture").remove();
		});

		it('should load data when be called', function () {
			// this.menu.load('data/account.json');
			this.loadStub.should.have.been.calledOnce;
		});
	});



})



});