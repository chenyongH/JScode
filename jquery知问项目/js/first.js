$(function(){
	$('button').button({
		icons:{
			primary:'ui-icon-search'
		}
	});
	$('#header input').button();
	
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
			autoOpen:true,
			show:'puff',
			hide:'puff',
			height:400,
			width:300,
			modal:true,

			closeText:"取消注册"
		});	
	
	$('#reg-a').click(function(){
		$('#reg').dialog('open');
	});



	$('#reg').buttonset();
	// $('#reg .reg-sex input').button();
	$('#date').datepicker();
	$('#reg input[title]').tooltip({
		position:{
			my:'left+10 center',
			at:'right center'
		}
	});


})