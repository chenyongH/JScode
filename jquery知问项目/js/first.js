$(function(){
	$('input').button();

	
		$('#reg').dialog({
			title:"知问注册",
			buttons:{
				"确定":function(){
					alert("提交中");
				},
				"取消":function(){
					$(this).dialog("close");
				}
			},
			autoOpen:false,
			show:'puff',
			hide:'puff',
			height:200,
			width:300,
			modal:true,
			closeText:"取消注册"
		});	
	
	$('#reg-a').click(function(){
		$('#reg').dialog('open');
	})

})