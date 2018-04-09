var oIpt = document.getElementsByTagName('input')[0];
var oBox =document.getElementsByClassName('box')[0];
var oNum = document.getElementsByClassName('num')[0];
var oGameover = document.getElementsByClassName('gameover')[0];
var oDelete = document.getElementsByClassName('delete')[0];
var fighting = document.getElementsByClassName('fighting')[0];
var oback = document.getElementsByClassName('back')[0];
var score = document.getElementsByTagName('span')[0];
var mineNum,mineOver,block;
var mineMap = [];
var buttonBool = true;

bindEvent();

function bindEvent(){
	oIpt.onclick = function(){
		if(buttonBool){
			oBox.style.display = 'block';
			oNum.style.display = 'block';
			init();
			score.innerHTML = '10';
			buttonBool = false;
		}
		
	}

	oBox.oncontextmenu = function(){
		return false;
	}

	oBox.onmousedown = function(e){
		var event = e.target;
		if(e.which == 1){
			leftClick(event);
		}else if(e.which == 3){
			rightClick(event);
		}
	}

	oDelete.onclick = function(){
		oGameover.style.display = 'none';
		oBox.style.display = 'none';
		oNum.style.displsy = 'none';
		oBox.innerHTML = '';
		buttonBool = true;
	}
	oback.onclick = function(){
		fighting.style.display = 'none';
		oback.style.display = 'none';
		buttonBool = true;
	}

}

function init(){
	mineOver = 10;
	mineNum = 10;
	for(var i = 0; i < 10; i ++){
		for(var j = 0; j < 10; j ++){
			var smallBox = document.createElement('div');
			smallBox.classList.add('block');
			smallBox.setAttribute('id',i + '-' + j);
			oBox.appendChild(smallBox);
			mineMap.push({mine:0});
		}
	}

	block = document.getElementsByClassName('block');
	while(mineNum){
		var mineIndex = Math.floor(Math.random()*100);
		if(mineMap[mineIndex].mine === 0){
			block[mineIndex].classList.add('isLei');
			mineMap[mineIndex].mine = 1;
			mineNum --;
		}
	}
}

function leftClick(dom){
	var isLei = document.getElementsByClassName('isLei');
	if(dom && dom.classList.contains('isLei')){
		for(var i = 0; i < isLei.length; i ++){
			isLei[i].classList.add('show');
		}
		setTimeout(function(){
			oGameover.style.display = 'block';
		},1000);
	}else{
		var n = 0;
		var positionArr = dom && dom.getAttribute('id').split('-');
		var positionX = positionArr && +positionArr[0];
		var positionY = positionArr && +positionArr[1];
		dom && dom.classList.add('blockNum');
		for(var i = positionX-1; i <= positionX + 1; i ++){
			for(var j = positionY - 1; j <= positionY + 1; j ++){
				var aroundBox = document.getElementById(i + '-' + j);
				if(aroundBox && aroundBox.classList.contains('isLei')){
					n ++;
				}
			}
		}
		dom && (dom.innerHTML = n);
		if(n == 0){
			for(var i = positionX-1; i <= positionX + 1; i ++){
				for(var j = positionY-1; j <= positionY + 1; j ++){
					var nearBox = document.getElementById(i + '-' +j);
					if(nearBox && nearBox.length != 0){
						if(!nearBox.classList.contains('check')){
							nearBox.classList.add('check');
							leftClick(nearBox);

						}
					}
				}
			}
		}
	}
}

function rightClick(dom){
	if(dom.classList.contains('blockNum')){
		
		return;
	}
	dom.classList.toggle('flag');
	if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
		mineOver --;
	}
	if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
		mineOver ++;
	}
	if(mineOver == 0){
		fighting.style.display = 'block';
	}
	score.innerHTML = mineOver;
}