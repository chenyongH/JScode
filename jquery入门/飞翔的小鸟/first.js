$(function(){
	var speed = 100;
	var width = $('div').width();
	var height = $('div').height();
	var winLeft = $(window).width();
	var winTop = $(window).height();
	$(document).keydown(function(e){
		var key = e.keyCode;
		var posLeft = $('div').offset().left;
		var posTop = $('div').offset().top;
		switch(key){
			case 37:
				$('div').removeClass().addClass('left');
				if(posLeft <= -width){
					$('div').offset({
						left:winLeft,
						top:posTop
					})
				};
				$('div').offset({
					left:$('div').offset().left -= speed,
					top:$('div').offset().top
				});

				break;
			case 38:
				$('div').removeClass().addClass('top');
				if(posTop <= -height){
					$('div').offset({
						left:posLeft,
						top:winTop
					})
				}
				$('div').offset({
					left:$('div').offset().left,
					top:$('div').offset().top -=speed
				});
				break;
			case 39:
			    $('div').removeClass().addClass('right');
			    if(posLeft >= winLeft){
			    	$('div').offset({
			    		left:-width,
			    		top:posTop
			    	})
			    }
				$('div').offset({
					left:$('div').offset().left += speed,
					top:$('div').offset().top
				});
				break;
			case 40:
				$('div').removeClass().addClass('bottom');
			    if(posTop >= winTop){
			    	$('div').offset({
			    		left:posLeft,
			    		top:-height
			    	})
			    }
				$('div').offset({
					left:$('div').offset().left,
					top:$('div').offset().top +=speed
				});
				break;
		}
	})


})