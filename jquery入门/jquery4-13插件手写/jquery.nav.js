;(function($){
	// 定义在局部
	$.fn.extend({
		'nav':function(){
			$(this).find('.nav').css({
				'list-style':'none',
				'color':'red',
				'display':'none'
			})
			$(this).find('.nav').parent().hover(function(){
				$(this).find('.nav').slideDown('normal');
			},function(){
				$(this).find('.nav').stop().slideUp('fast');
			})
		}

	})
})(jQuery);