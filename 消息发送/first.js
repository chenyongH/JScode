$(function(){
	//点击事件，发送消息
	$('#leftbutton').bind('click',sendleft);
	$('#rightbutton').bind('click',sendright);

	function sendleft(){
		//获取输入的值
		let txt =$('#leftText').val();
		if(txt.trim()!=''){
				let option = $('<option></option>');
				//给 输入的值添加样式
			    let len = txt.length;
				option.css('width',len*15+10+'px');
				option.css('margin-left',400-len*15-30+'px');
				// alert(mgl);
				//把值添加到文档中
			    option.html(txt);

			    //自身添加
			    $('#leftcontent').append(option);
			    //对方添加
			    	let option1 = $('<option></option>');
			    	option1.css('width',len*15+'px');
			    	option1.css('margin-left','10px');
			        option1.html(txt);
			    $('#rightcontent').append(option1);

			    $('#leftText').val('');
		}
		
	}
	function sendright(){
		//获取输入的值
		let txt = $('#rightText').val();
		if(txt.trim()!=''){
				let option = $('<option></option>');
				//给 输入的值添加样式
			    let len = txt.length;
				option.css('width',len*15+10+'px');
				option.css('margin-left',400-len*15-30+'px');
				// alert(mgl);
				//把值添加到文档中
			    option.html(txt);

			    //自身添加
			    $('#rightcontent').append(option);
			    //对方添加
			    	let option1 = $('<option></option>');
			    	option1.css('width',len*15+'px');
			    	option1.css('margin-left','10px');
			        option1.html(txt);
			    $('#leftcontent').append(option1);

			    $('#rightText').val('');
		}	
	}

	//键盘监听事件
	$(document).keydown(function(e){
		let text1 = $('#leftText').val();
		let text2 = $('#rightText').val();
		if(e.keyCode == 13){
			if(text1.trim() != '' || text2.trim() != ''){
				sendleft();
				sendright();
			}
		}
		
	})
})