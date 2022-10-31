(function ($, MODULE_CONFIG) {
  	"use strict";
  
	$.fn.uiJp = function(){

		var lists  = this;

        lists.each(function()
        {
        	var self = $(this);
			var options = eval('[' + self.attr('ui-options') + ']');
			if(options[0].name == 'Spending_Chart'){
				//options[0].series[0].data = usage
				console.log(options[0].series[0].data);
			}
			if ($.isPlainObject(options[0])) {
				options[0] = $.extend({}, options[0]);
			}

			uiLoad.load(MODULE_CONFIG[self.attr('ui-jp')]).then( function(){
				self[self.attr('ui-jp')].apply(self, options);
			});
        });

        return lists;
	}

})(jQuery, MODULE_CONFIG);
