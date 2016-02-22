/**
 * @overview this component use for show a donut chart
 * @component#@chart#iChart.Donut2D
 * @extend#iChart.Pie
 */
iChart.Donut2D = iChart.extend(iChart.Pie, {
	/**
	 * initialize the context for the pie2d
	 */
	configure : function() {
		/**
		 * invoked the super class's configuration
		 */
		iChart.Donut2D.superclass.configure.call(this);
		
		this.type = 'donut2d';
		
		this.set({
			/**
			 * @cfg {Number} Specifies the width when show a donut.If the value lt 1,It will be as a percentage,value will be radius*donutwidth.only applies when it not 0.(default to 0.3)
			 */
			donutwidth : 0.3,
			/**
			 * @cfg {Object/String} Specifies the config of Center Text details see <link>iChart.Text</link>,If given a string,it will only apply the text.note:If the text is empty,then will not display
			 */
			center : {
				text:'',
				line_height:24,
				fontweight : 'bold',
				/**
				 * Specifies the font-size in pixels of center text.(default to 24)
				 */
				fontsize : 24
			}
		});
	},
	doConfig : function() {
		iChart.Donut2D.superclass.doConfig.call(this);
		
		var _ = this._(),d='donutwidth',e = _.get(d),r = _.r;
		/**
		 * quick config to all rectangle
		 */
		_.push('sub_option.radius',r)
		if(e>=r){
			e = 0;
		}else if(e<1){
			e = Math.floor(r*e);
		} 
		_.push('sub_option.donutwidth',_.push(d,e));
		
		_.merge('center');
		
		if (_.get('center.text') != '') {
			_.push('center.originx',_.get(_.X));
			_.push('center.originy',_.get(_.Y));
			_.push('center.textBaseline','middle');
			_.center = new $.Text(_.get('center'), _);
			
			_.oneways.push(_.center);
		}
		
		_.parse(_);
	}
});
iChart.register('Donut2D');
/**
 * @end
 */