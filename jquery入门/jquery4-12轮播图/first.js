var index = 0;
$(function(){
	
	var oImg = $('.img li');
	var oLi = $('.circle li');
	var oSpan = $('.button span')
	function change(){
		oImg.eq(index).addClass('show1').siblings().removeClass('show1');
		oLi.eq(index).addClass('show2').siblings().removeClass('show2');
	}
	change();

	oLi.click(function(){
		index = $(this).index();
		change();
		clearInterval(timer);
	})

	oSpan.eq(0).click(function(){
		clearInterval(timer);
		index --;
		if(index < 0){
			index = 5;
		}
		change();
	})

	oSpan.eq(1).click(function(){
		clearInterval(timer);
		index ++;
		if(index > 5){
			index = 0;
		}
		change();
	})

	var timer = setInterval(function(){
		index ++;
		if(index > 5){
			index = 0;
		}
		change();
	},1000)

})