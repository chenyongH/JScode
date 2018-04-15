$(function(){
	$('button').button({
		icons:{
			primary:'ui-icon-search'
		}
	});
	$('#header input').button();

	// loading 数据提交时的弹窗效果
	$('#loading').dialog({
		autoOpen:false,
		modal:true,
		closeOnEscape:false,
		resizable:false,
		draggable:false,
		width:180,
		height:50,
	}).parent().find('.ui-widget-header').hide();

	// 表单注册
		$('#reg').dialog({
			title:"知问注册",
			buttons:{
				"提交":function(){
					$(this).submit();
				},
				"取消":function(){
					$(this).dialog("close");
				}
			},
			autoOpen:false,
			show:'puff',
			hide:'puff',
			height:400,
			width:300,
			modal:true,

			closeText:"取消注册"
		}).buttonset().validate({

			submitHandler:function(form){
				$(form).ajaxSubmit({
					url:'add.php',
					type:'POST',
					beforeSubmit:function(formDate,jqForm,options){
						$('#loading').dialog('open');
						$('#reg').dialog('widget').find('button').eq(2).button('disable');
					},
					success:function(responseText,statusText){
						if(responseText){
							$('#reg').dialog('widget').find('button').eq(2).button('enable');
							$('#loading').html('数据上传成功!');
							setTimeout(function(){
								$('#reg').dialog('close');
								$('#loading').dialog('close');
								$('#reg').resetForm();
								$('#reg span').removeClass('reg-span');
								$('#loading').html('数据上传中...');
							},500);
						}
					},
				});
			},



			highlight:function(element,errorClass){
				$(element).css('border','1px solid #f40');
				$(element).parent().find('span').removeClass('reg-span');
			},
			unhighlight:function(element,errorClass){
				$(element).css('border','1px solid #666');
				$(element).parent().find('span').addClass('reg-span');
			},

			showErrors:function(errorMap,erroList){
				var errors = this.numberOfInvalids();
				if(errors > 0){
					$('#reg').dialog('option','height',errors*20 +400);
				}else{
					$('#reg').dialog('option','height',400);
				}
				this.defaultShowErrors();
			},

			errorLabelContainer:'ol.reg-error',
			wrapper:'li',

			rules:{
				user:{
					required:true,
					minlength:2
				},
				password:{
					required:true,
					minlength:6,
				},
				password2:{
					required:true,
					equalTo:"#password"
				},
				email:{
					// com:true,
					required:true,
					email:true
				},

			},
			messages:{
				user:{
					required:"姓名不能为空",
					minlength: $.validator.format('姓名不能少于{0}位'),
				},
				password:{
					required:"密码不能为空",
					minlength: $.validator.format('密码不能少于{0}位'),
				},
				password2:{
					required:"确认密码不能为空",
					equalTo: "你的密码确认输入不相同",
					
				},
				email:{
					required:"邮箱不能为空",
					minlength: "请输入有效的电子邮件地址",
				},
			},
		});
		// $.validator.addMethod('com',function(){
		// 	var email = ".com$";
		// 	return this.optional(element)||(email.test(value));
		// },'请输入正确的email地址');


	$('#reg-a').click(function(){
		$('#reg').dialog('open');
	});
    
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
	// var  mailSource = ['aa@qq.com','bb@360.com','aa@360.com','bb@qq.com'];
	// $('#emil').autocomplete({
	// 	source: mailSource,
	// 	delay:0,
	// 	minlength:1,

	// });



})