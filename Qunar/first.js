//  left部分的js控制代码 
var oLeftBox0 = document.getElementsByClassName('left-box0')[0];
var oLeftBox1 = document.getElementsByClassName('left-box1')[0];
var oLeftBox2 = document.getElementsByClassName('left-box2')[0];
var oLeftLi14 = document.getElementsByClassName('left-li14')[0];
var oLeft = document.getElementsByClassName('left')[0];
var oUl = oLeft.getElementsByTagName('ul')[0];
var timer,timer1;
var num = 0,num1 = -40;


oLeftBox1.onclick = function(){

	timer = setInterval(function(){
		num += 5;
		oLeftBox0.style.left = '-'+ num +'px';
		oLeftBox1.style.left = '-' + (num+30) + 'px';

		if(num == 40){
			clearInterval(timer);
			oLeftBox2.style.display = 'block';
			num = 0;
		}
	},100);
}
oLeftBox2.onclick = function(){
	timer1 = setInterval(function(){
		num1 += 5;
		oLeftBox0.style.left = num1 +'px';
		if(num1 == 0){
			clearInterval(timer1);
			oLeftBox2.style.display = 'none';
			oLeftBox1.style.left = '0px';
			num1 = -40;
		}
	},100);
}
oLeftLi14.onclick = function(){
	timer = setInterval(function(){
		num += 5;
		oLeftBox0.style.left = '-'+ num +'px';
		oLeftBox1.style.left = '-' + (num+30) + 'px';

		if(num == 40){
			clearInterval(timer);
			oLeftBox2.style.display = 'block';
			num = 0;
		}
	},100);
}