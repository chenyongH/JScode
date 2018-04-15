$(function(){
	$('button').button({
		icons:{
			primary:'ui-icon-search'
		}
	});
	$('#header input').button();

	// 表单注册
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
	// 日历
	$('#date').datepicker({
		showOn:'both',
		showButtonPanel:true,
		maxDate:0,
		yearRange:'1940:2018',
		changeYear:true,
		changeMonth:true
	});
	$('.ui-datepicker-trigger').html('选择');
	$('.ui-datepicker-trigger').button();

	$('#reg input[title]').tooltip({
		position:{
			my:'left+10 center',
			at:'right center'
		}
	});
	// 表单注册自动补全
	var  mailSource = ['aa@qq.com','bb@360.com','aa@360.com','bb@qq.com'];
	$('#mail').autocomplete({
		source: mailSource,
		delay:0,
		minlength:1,

	});



})