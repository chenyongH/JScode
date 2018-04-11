$(function(){
	
	// $('.show').click(function(){
	// 	$('.box').show(1000);
	// })
	// $('.hide').click(function(){
	// 	$('.box').hide(1000);
	// })
	// $('.togger').click(function(){
	// 	$('.box').toggle(1000);
	// })

	$('.show').click(function(){
		$('span').first().show(1000,function showO(){
			$(this).next().show('normal',showO);
		});
	})
	$('.hide').click(function(){
		$('span').last().hide(1000,function hideO(){
			$(this).prev().hide(1000,hideO)
		});
	})
	$('.togger').click(function(){
		$('.box').toggle(1000);
	})



})