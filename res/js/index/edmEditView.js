/**
 * edm edit view
 */

var EdmEditView = Backbone.View.extend({
	el : '#j-edm-mode',

	model : edm,

	initialize : function (argument) {
		// // 节点
		this.$valueNodes = this.$el.find('.j-value');
		this.$savebtnNode = this.$el.find('.j-save');
		this.$previewbtnNode = this.$el.find('.j-preview');
		this.$addlinkbtnNode = this.$el.find('.j-addlink');
		this.$linksNode = this.$el.find('.j-links');

		// 事件
		this.model.on('change', _.bind(this.render, this));

		console.log('edm edit view inited');

	},

	events : {
		'keyup .j-value' : 'onChangeValue',
		'click .j-addlink' : 'addLink',
		'click .j-save' : 'save',
		'click .j-preview' : 'preview',
		'click .j-dellink' : 'deleteLink',
		'keyup .j-linkvalue' : 'onLinkValueChange'
	},

	render : function(){
		this.$valueNodes.eq(0).val(this.model.get('name') || EDM_DEFAULT_VALUE['name']);
		this.$valueNodes.eq(1).val(this.model.get('title') || EDM_DEFAULT_VALUE['title']);
		this.$valueNodes.eq(2).val(this.model.get('imageurl') || EDM_DEFAULT_VALUE['imageurl']);
		this.$valueNodes.eq(3).val(this.model.get('imagealt') || EDM_DEFAULT_VALUE['imagealt']);
		this.$valueNodes.eq(4).val(this.model.get('width') || EDM_DEFAULT_VALUE['width']);
		this.$valueNodes.eq(5).val(this.model.get('height') || EDM_DEFAULT_VALUE['height']);
		this.$valueNodes.eq(6).val(this.model.get('backgroundcolor') || EDM_DEFAULT_VALUE['backgroundcolor']);
		this.$valueNodes.eq(7).val(this.model.get('paddingtopbottom') || EDM_DEFAULT_VALUE['paddingtopbottom']);
		
		this.$previewbtnNode.data('name', this.model.get('name') || EDM_DEFAULT_VALUE['name']);

		this.renderLinks();

		return this;
	},

	onChangeValue : function(event){
		var $valuenode = $(event.target);
		var attrName = $valuenode.data('attr');

		if (attrName) {
			var val = $.trim($valuenode.val());
			val = (val == '' ? EDM_DEFAULT_VALUE[attrName] : val); // 保证有默认值

			this.model.set(attrName, val);
		};
	},

	renderLinks : function(){
		var linkData = _.clone(this.model.get('links'));

		linkData = linkData || [];

		for (var i = 0; i < linkData.length; i++) {
			var data = linkData[i];
			var linknode = this.linkNodes[i];

			if (!data) { // 删除link
				if (!!linknode) {
					linknode.remove();
					this.linkNodes[i] = undefined;
				};
				continue;
			};

			// 创建
			if (!linknode) { // 没有对应的节点先创建
				linknode = this.addLinkNode(i);
			};

			if (!!linknode && !!data) {
				var vs = linknode.find('.j-linkvalue');

				vs.each(function(index, node){
					$(node).val(data[$(node).data('attr')]);
				});
			}
		};
	},

	onLinkValueChange : function(event){
		var $valuenode = $(event.target);
		var index = $valuenode.data('index');
		var attr = $valuenode.data('attr');

		var linkData = _.clone(this.model.get('links'));

		linkData[index][attr] = $.trim($valuenode.val());

		this.model.unset('links');
		this.model.set('links', linkData);
	},

	addLinkNode : function(i){
		var linkhtml = '<div class="linkItem">\
				<h3 class="tit f-cb">链接<a class="j-dellink f-fr" data-index="'+ i +'">删除</a></h3>\
				<div class="inpline f-cb">\
					<span class="f-fl lab">链接:</span>\
					<input type="text" class="f-fl inp1 j-linkvalue" data-index="'+ i +'" data-attr="url" value="">\
				</div>\
				<div class="inpline f-cb">\
					<span class="f-fl lab">描述:</span>\
					<input type="text" class="f-fl inp1 j-linkvalue" data-index="'+ i +'" data-attr="title" value="">\
				</div>\
				<div class="inpline f-cb">\
					<span class="f-fl lab">坐标X:</span>\
					<input type="text" class="f-fl inp3 j-linkvalue" data-index="'+ i +'" data-attr="x" value="">\
					<span class="f-fl lab">坐标Y:</span>\
					<input type="text" class="f-fl inp3 j-linkvalue" data-index="'+ i +'" data-attr="y" value="">\
					<span class="f-fl lab">宽度:</span>\
					<input type="text" class="f-fl inp3 j-linkvalue" data-index="'+ i +'" data-attr="width" value="">\
					<span class="f-fl lab">高度:</span>\
					<input type="text" class="f-fl inp3 j-linkvalue" data-index="'+ i +'" data-attr="height" value="">\
				</div>\
			</div>';

		var l = $(linkhtml);
		this.linkNodes.push(l);
		this.$linksNode.append(l);

		return l;
	},

	linkNodes : [],

	addLink : function(){
		var linkData = _.clone(this.model.get('links'));

		linkData.push({
			title:'',
			x:0,
			y:0,
			width:100,
			height:100,
			url:''
		});

		this.model.set('links', linkData);
	},

	deleteLink : function(event){
		var $btnnode = $(event.target);
		var index = $btnnode.data('index');

		if (index !== undefined) {
			var linkData = _.clone(this.model.get('links'));

			// linkData.splice(index, 1);
			linkData[index] = undefined;

			this.model.set('links', linkData);
		};
	},

	save : function(){
		var self = this;

		this.model.save(function(data){
			alert('保存成功');

			self.$previewbtnNode.data('name', data.name);
		});	
	},

	preview : function(){
		var $valuenode = $(event.target);
		var edmName = $valuenode.data('name');

		if (!edmName || edmName == '') {
			alert('还未保存，无法预览');
			return;
		};

		window.open('/edm/download?fn=' + edmName, '_blank');
	}
});

var edmEditView = new EdmEditView();