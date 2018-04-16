$(function(){
	$('button').button({
		icons:{
			primary:'ui-icon-search'
		}
	});
	$('#header input').button();

	// cookie

	// $.cookie('user2','aa',{
	// 	expires:3
	// });

	$('#member,#loginout').hide();

	if($.cookie('user')){
		$('#member,#loginout').show();
		$('#member').html($.cookie('user'));
		$('#reg-a,#login-a').hide();
	}else{
		$('#member,#loginout').hide();
		$('#reg-a,#login-a').show();
	}
	$('#loginout').click(function(){
		// $(this).css('color','red');
		$.removeCookie('user');
		// window.location.herf = '127.0.0.1/jquery/index.html';
		$('#member,#loginout').hide();
		
		$('#reg-a,#login-a').show();
	});



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
							$.cookie('user',$('#user').val())
							setTimeout(function(){
								$('#reg').dialog('close');
								$('#loading').dialog('close');
								$('#reg').resetForm();
								$('#reg span').removeClass('reg-span');
								$('#loading').html('数据上传中...');
								$('#member,#loginout').show();
								$('#member').html($.cookie('user'));
								$('#reg-a,#login-a').hide();
							},1000);
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
					minlength:2,
					remote:{
						url:'is_user.php',
						type:'POST'
					},
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
					remote:'账号被占用',
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
		$('#reg').resetForm();
		$('#reg span').removeClass('reg-span');
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
	// 表单登录
	$('#login').dialog({
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
		height:240,
		width:300,
		modal:true,
		closeText:"取消注册"
	}).validate({

		submitHandler:function(form){
			$(form).ajaxSubmit({
				url:'login.php',
				type:'POST',
				beforeSubmit:function(formDate,jqForm,options){
					$('#loading').dialog('open');
					$('#login').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').html('登录中...');
				},
				success:function(responseText,statusText){
					if(responseText){
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').html('登录成功!');
						// cookie过期设置
						if($('#expires').is(':checked')){
							$.cookie('user',$('#login-user').val(),{
								expires:7,
							});
						}else{
							$.cookie('user',$('#login-user').val());
						}
						
						setTimeout(function(){
							$('#login').dialog('close');
							$('#loading').dialog('close');
							$('#login').resetForm();
							$('#login span').removeClass('login-span');
							$('#loading').html('登录中...');
							$('#member,#loginout').show();
							$('#member').html($.cookie('user'));
							$('#login-a,#reg-a').hide();
						},1000);
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
				$('#login').dialog('option','height',errors*20 +240);
			}else{
				$('#login').dialog('option','height',240);
			}
			this.defaultShowErrors();
		},

		errorLabelContainer:'ol.login-error',
		wrapper:'li',

		rules:{
			login_user:{
				required:true,
				minlength:2,
			},
			login_password:{
				required:true,
				minlength:6,
				remote:{
					url:'login.php',
					type:'POST',
					data:{
						login_user:function(){
							return $('#login-user').val();
						},
					},
				},
			},

		},
		messages:{
			login_user:{
				required:"姓名不能为空",
				minlength: $.validator.format('姓名不能少于{0}位'),
			},
			login_password:{
				required:"密码不能为空",
				minlength: $.validator.format('密码不能少于{0}位'),
				remote:'账号或密码不正确',
			},
		},
	});

	$('#login-a').click(function(){
		$('#login').dialog('open');
		$('#login').resetForm();
		$('#login span').removeClass('login-span');
	});

})