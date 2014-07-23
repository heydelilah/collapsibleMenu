
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

		it('should default the URL to an empty string', function () {
			this.$c.url.should.equal('');
		});

		it('should default the data to null', function () {
			should.not.exist(this.$c.data);
			// this.$c.data.should.be.a('string');
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
				url: 'fake.json',
				data: []
			})

			this.$c = this.menu.$config;
		});

		afterEach(function () {
			$("#fixture").remove();
		});

		it('should support setting the URL', function () {
			this.$c.url.should.equal('fake.json');
		});

		it('should support setting the data', function () {
			should.exist(this.$c.data);
			this.$c.data.should.be.an('array');

		});

		it('should support setting the TARGET', function () {
			this.$c.target[0].nodeName.should.equal('DIV');
			this.$c.target.attr('id').should.equal('fixture');
		});
	});

	describe('Load Data', function () {
		// @todo test ajax 之类
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
			this.menu.load('data/account.json');
			this.loadStub.called.should.be.true;
			// this.loadStub.should.have.been.calledOnce; 这种写法无效
		});
	});

	describe('View', function () {
		beforeEach(function () {
			$('<div>').attr('id', 'fixture').css('display','block').appendTo('body');
			this.menu = new menu.main({
				target: $("#fixture"),
				data: [
					{
						"id":1,
						"name": "A Menu"
					}
				]

			});

			this.$el = this.menu.$el;
		});

		afterEach(function () {
			$("#fixture").remove();
		});

		it('should render as a unordered list', function () {
			this.$el[0].nodeName.should.equal('UL');
		});

		it('should contain <li> inside the unordered list', function () {
			this.$el.find('li').length.should.not.equal(0);
		});

		it('should include an <i> for arrow icon', function(){
			this.$el.find('li i').length.should.not.equal(0);
		});

		it('should include an <a> which has the link for specific url and title', function(){
			this.$el.find('li a').length.should.not.equal(0);
			this.$el.find('li a').first().attr('href').should.equal('#manager/account/1');
			this.$el.find('li a').first().text().should.equal('A Menu');
		});

	});

})



});