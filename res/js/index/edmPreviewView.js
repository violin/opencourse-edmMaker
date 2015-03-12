/**
 * edm preview view
 */

var EdmPreviewView = Backbone.View.extend({
	el : '#j-edm-preview',

	model : edm,

	initialize : function () {
		// 节点
		this.$pageNode = this.$('.j-page');
		this.$imgcontainerNode = this.$('.j-imgcontainer');
		this.$imgNode = this.$('.j-img');
		this.$linksNode = this.$('.j-links');

		this.model.on('change:backgroundcolor', _.bind(this.renderPage, this));
		this.model.on('change:paddingtopbottom', _.bind(this.renderPage, this));
		this.model.on('change:width', _.bind(this.renderImgCon, this));
		this.model.on('change:height', _.bind(this.renderImgCon, this));
		this.model.on('change:imageurl', _.bind(this.renderImg, this));
		this.model.on('change:links', _.bind(this.renderLinks, this));

		console.log('edm preview view inited');

	},

	render : function(){
		return this;
	},

	renderPage : function(){
		this.$pageNode.css({
			'background-color':this.model.get('backgroundcolor'), 
			'padding':this.model.get('paddingtopbottom') + 'px 0'
		});

		return this;
	},

	renderImgCon : function(){
		this.$imgcontainerNode.css({
			'width': this.model.get('width') + 'px',
			'height': this.model.get('height') + 'px'
		});

		return this;
	},

	renderImg : function(){
		this.$imgNode.attr({
			'src': this.model.get('imageurl')
		});
	
		return this;
	},

	renderLinks : function(){
		var links = this.model.get('links');
		var linkhtm = '';

		links = links || [];

		for (var i = 0; i < links.length; i++) {
			if (!!links[i]) {
				var width = Number(links[i].width) - 2;
				var height = Number(links[i].height) - 2;

				linkhtm += '<div class="link" style="top:'+ links[i].y +'px; left:'+ links[i].x +'px; width:'+ width +'px; height:'+ height +'px;"></div>'; 
			};
		};

		this.$linksNode.html(linkhtm);

		return this;
	}
});

var edmPreviewView = new EdmPreviewView();

