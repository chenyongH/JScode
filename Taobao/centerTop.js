window.onload = function(){
	var oMainCenter = document.getElementsByClassName('main-center')[0];
	var oImg = oMainCenter.getElementsByTagName('img');
	var arrImg2 = ['img/bottom1.jpg','img/bottom2.jpg','img/bottom3.jpg','img/bottom4.jpg']
	var arrImg1 = ['img/top1.jpg','img/top2.jpg','img/top3.jpg','img/top4.jpg']
	var ospan = oMainCenter.getElementsByTagName('span')[0];
	var oLi = oMainCenter.getElementsByTagName('li');
	var num = 0;
	var len = oLi.length;
	var arrlen2 = arrImg2.length;
	var timer;
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


