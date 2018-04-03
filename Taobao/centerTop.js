window.onload = function(){
	var oMainCenter = document.getElementsByClassName('main-center')[0];
	var oImg = oMainCenter.getElementsByTagName('img');
	var oTop = document.getElementsByClassName('top')[0];
	var oLeftFirst = oTop.getElementsByClassName('left-first')[0];
	var oLeftUl = oTop.getElementsByClassName('left-ul')[0];
	var oRightFirst = oTop.getElementsByClassName('right-first')[0];
	var oRightSecond = oTop.getElementsByClassName('right-second')[0];
	var oRightOne = oTop.getElementsByClassName('right-one')[0];
	var oRightTwo = oTop.getElementsByClassName('right-two')[0];
	var arrImg2 = ['img/bottom1.jpg','img/bottom2.jpg','img/bottom3.jpg','img/bottom4.jpg']
	var arrImg1 = ['img/top1.jpg','img/top2.jpg','img/top3.jpg','img/top4.jpg']
	var ospan = oMainCenter.getElementsByTagName('span')[0];
	var oLi = oMainCenter.getElementsByTagName('li');
	var num = 0;
	var len = oLi.length;
	var arrlen2 = arrImg2.length;
	var timer,timerTop;
	//top部分功能简单实现
		//left
	oLeftFirst.onmouseover = function(){
		oLeftUl.style.display = 'block';
	}
	oLeftFirst.onmouseout = function(){
		 timerTop = setTimeout(function(){oLeftUl.style.display = 'none';
			
		},1000);
	}
	oLeftUl.onmouseover = function(){
		clearTimeout(timerTop);
		// alert(1);
		oLeftUl.style.display = 'block';
		
	}
	oLeftUl.onmouseout = function(){
		oLeftUl.style.display = 'none';
	}
		//right
	oRightFirst.onmouseover = function(){
		oRightOne.style.display = 'block';
	}
	oRightFirst.onmouseout = function(){
		oRightOne.style.display = 'none';
	}
	oRightSecond.onmouseover = function(){
		oRightTwo.style.display = 'block';
	}
	oRightSecond.onmouseout = function(){
		oRightTwo.style.display = 'none';
	}

	//main部分功能
	ospan.innerHTML = num + '/' + arrlen2;
	// alert(oLi[num]);
	oLi[num].style.backgroundColor = '#f40';
	timer = setInterval(function(){
		for(var i = 0; i < len ; i ++){
			oLi[i].style.backgroundColor = '#fff';
		}
		ospan.innerHTML = num + '/' + arrlen2;
		oImg[1].src = arrImg2[num];
		oImg[0].src = arrImg1[num];
		oLi[num].style.backgroundColor = '#f40';
		num ++;
		if(num == 4){
			num = 0;
		}
	},1500);
}


