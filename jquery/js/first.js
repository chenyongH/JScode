$(function(){
	$('button').button({
		icons:{
			primary:'ui-icon-search'
		}
	});
	$('#header input').button();

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
		$.removeCookie('user');
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
    // 提问时候的弹窗
	$('#error').dialog({
		autoOpen:false,
		modal:true,
		closeOnEscape:false,
		resizable:false,
		draggable:false,
		width:180,
		height:50,
	}).parent().find('.ui-widget-header').hide();

	// 提问输入问题弹窗
	$('#question').dialog({
		autoOpen:false,
		modal:true,
		closeOnEscape:false,
		resizable:false,
		draggable:false,
		width:500,
		height:360,
		buttons:{
			"提交":function(){
				$(this).ajaxSubmit({
					url:'add_content.php',
					type:'POST',
					data:{
						user:$.cookie('user'),
					},
					beforeSubmit:function(formDate,jqForm,options){
						$('#loading').dialog('open');
						// $('#question').dialog('widget').find('button').eq(1).button('disable');
					},
					success:function(responseText,statusText){
						if(responseText){
							$('#loading').dialog('open');
							// $('#question').dialog('widget').find('button').eq(1).button('enable');
							$('#loading').html('数据上传成功!');
							setTimeout(function(){
								$('#question').dialog('close');
								$('#loading').dialog('close');
								$('#content').html('');
								$('#question').resetForm();
								$('#loading').html('数据上传中...');
							},2000);
						}
					},
				});
			},
		},
	});

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



	// tabs选项卡功能
	$('#tabs').tabs();
	$('#accordion').accordion();
	$('#question-button').click(function(){
		if($.cookie('user')){
			$('#question').dialog('open');
		}else{
			$('#error').dialog('open');
			setTimeout(function(){
				$('#error').dialog('close');
				$('#login').dialog('open');
			},1000);
		}
	});

	//提问区编辑器设置
	$('#content').trumbowyg({
		 fullscreenable: false,
		 closable: false,
		 btns: ['bold', 'italic', '|', 'insertImage'],
	});

   // 数据从数据库中取出并展示show
	$.ajax({
		url:'show_content.php',
		type:'POST',
		success:function(response,status,xhr){
			var json = $.parseJSON(response);
			var html = '';
			var arr = [];
			$.each(json,function(index,value){
				html += '<h4>'+ value.user +'&nbsp&nbsp发表于：'+ value.date +'</h4><h3>'+ value.title +'</h3><div class="div-editor">'+ value.content +'</div><div class="bottom"><span class="comment" data-id="'+ value.id +'">'+ value.count +'条评论</span><span class="down">显示全部</span><span class="up">收起</span><span class="all" style="display:none">已全部展示</span></div><hr noshade="noshade" size="1" /><div class="comment-list"></div>';
			});
			$('.content').append(html);
			$.each($('.div-editor'),function(index,value){
				arr[index] = $(value).height();
				if($(value).height() > 60){
					$(value).next('.bottom').find('.up').hide();

				}else{
					$(value).next('.bottom').find('.up').hide();
					$(value).next('.bottom').find('.down').hide();
					$(value).next('.bottom').find('.all').css('display','inline-block');
				}
				$(value).height(60);
			});
			$.each($('.bottom .down'),function(index,value){
				$(this).click(function(){
					$(this).parent().prev().height(arr[index]);
					$(this).hide();
					$(this).parent().find('.up').show();
				});
			});
			$.each($('.bottom .up'),function(index,value){
				$(this).click(function(){
					$(this).parent().prev().height(60);
					$(this).hide();
					$(this).parent().find('.down').show();
				});
			});
			// 评论区
				// $.each($('.bottom'),function(index,value){
				// 	alert(this);
				// 	$(this).on('click','.comment',function(){

				// 		if($.cookie('user')){

				// 			// if(!$('.comment-list').eq(index).has('form').length){
				// 			// 	// var comment_this = this;
				// 			// 	// 显示评论
				// 			// 	// $.ajax({
									// url:'show_comment.php',
									// type:'POST',
									// beforeSend:function(jqXHR,settings){
									// 	// alert('11');
									// 	$('.comment-list').eq(index).append('<dl class="comment-loading"><dd>正在加载..</dd></dl>');
										
									// },
				// 			// 	// 	success:function(respones,status){
				// 			// 	// 		$('.comment-list').eq(index).find('.comment-loading').hide();
				// 			// 	// 		$('.comment-list').eq(index).append('<form><dl class="comment-text"><dt><textarea name="comment" class="textarea"></textarea></dt><dd><input type="hidden" name="titleid" value="'+ $(comment_this).attr('data-id') +'" /><input type="hidden" name="user" value="'+ $.cookie('user') +'" /><input type="button" value="发表" /></dd></dl></form>');
				// 			// 	// 		var json_comment = $.parseJSON(response);
				// 			// 	// 		$.each(json_comment,function(index2,value){
				// 			// 	// 			// console.log(value)
				// 			// 	// 			$('.comment-list').eq(index).append('<dl class="comment_content"><dt>'+ value.user +'</dt><dd>'+ value.comment +'</dd><dd class="date">'+ value.date +'</dd></dl>');
				// 			// 	// 		});
				// 			// 	// 		// $.ajax({
				// 			// 	// 		// 	url:'show_comment.php',
				// 			// 	// 		// 	type:'POST',
				// 			// 	// 		// 	success:function(response1,status){
				// 			// 	// 		// 		$('.comment-list').eq(index).find('.comment-loading').hide();
				// 			// 	// 		// 		console.log(response1);
				// 			// 	// 		// 		var json_comment = $.parseJSON(response1);
				// 			// 	// 		// 		$.each(json_comment,function(index2,value){
				// 			// 	// 		// 			// console.log(value)
				// 			// 	// 		// 			$('.comment-list').eq(index).append('<dl class="comment_content"><dt>'+ value.user +'</dt><dd>'+ value.comment +'</dd><dd class="date">'+ value.date +'</dd></dl>');
				// 			// 	// 		// 		});
				// 			// 	// 		// 		$('.comment-list').eq(index).append('<form><dl class="comment-text"><dt><textarea name="comment" class="textarea"></textarea></dt><dd><input type="hidden" name="titleid" value="'+ $(comment_this).attr('data-id') +'" /><input type="hidden" name="user" value="'+ $.cookie('user') +'" /><input type="button" value="发表" /></dd></dl></form>');
												
				// 			// 	// 		// 	},
				// 			// 	// 		// });	
				// 			// 	// 	},
				// 			// 	});
				// 			// $('.comment-list').eq(index).append('<form><dl class="comment-text"><dt><textarea name="comment" class="textarea"></textarea></dt><dd><input type="hidden" name="titleid" value="'+ $(comment_this).attr('data-id') +'" /><input type="hidden" name="user" value="'+ $.cookie('user') +'" /><input type="button" value="发表" /></dd></dl></form>');
				// 				// 评论发布// 评论提交发表
				// 				$('.comment-list').eq(index).find('input[type=button]').button();
				// 				$('.comment-list').eq(index).find('input[type=button]').click(function(){
				// 					var _this = this;
									// $('.comment-list').eq(index).find('form').ajaxSubmit({
									// 	url:'add_comment.php',
									// 	type:'POST',
									// 	beforeSubmit:function(formDate,jqForm,options){
									// 		$('#loading').dialog('open');
									// 		$(_this).button('disable');
									// 		$('#loading').html('发表中');
									// 	},
										// success:function(responseText,statusText){
										// 	if(responseText){
										// 		$(_this).button('enable');
										// 		$('#loading').html('发表成功!');						
										// 		setTimeout(function(){
										// 			var date = new Date();
										// 			$('.comment-list').eq(index).prepend('<dl class="comment_content"><dt>'+ $.cookie('user') +'</dt><dd>'+ $('.comment-list').eq(index).find('textarea').val() +'</dd><dd>'+ date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+ date.getDate()+ ' '+ date.getHours()+':'+ date.getMinutes()+ ':' + date.getSeconds() +'</dd></dl>')
										// 			$('.comment-list').eq(index).find('form').resetForm();
										// 			$('#loading').dialog('close');
													
										// 			$('#loading').html('发表中...');	
										// 		},500);
										// 	}
										// },
				// 					});
				// 				});
							// if($('.comment-list').eq(index).is(':hidden')){
							// 	$('.comment-list').eq(index).show();
							// }else{

							// 	$('.comment-list').eq(index).hide();
							// }	
				// 		}else{
							// $('#error').dialog('open');
							// setTimeout(function(){
							// 	$('#error').dialog('close');
							// 	$('#login').dialog('open');
							// },1000);
				// 		}
				// 	})
				// });
			// 重写代码
			$.each($('.bottom'),function(index,value){
				$(this).on('click','.comment',function(){
					var comment_this = this;
					if($.cookie('user')){
						// 通过点击新增评论区输入区域与提交按钮
						if(!$('.comment-list').eq(index).has('form').length){
							// 判断是否加载，并加载评论和输入框
							$.ajax({
								url:'show_comment.php',
								type:'POST',
								data:{
									titleid:$(comment_this).attr('data-id'), 
								},
								beforeSend:function(jqXHR,settings){
									$('.comment-list').eq(index).append('<dl class="comment-loading"><dd>正在加载..</dd></dl>');
									
								},
								success:function(response,status){
									$('.comment-list').eq(index).find('.comment-loading').hide();
									// 评论显示
									var json_comment = $.parseJSON(response);
									var count = 0;
									$.each(json_comment,function(index2,value){
										count = value.count;
										$('.comment-list').eq(index).append('<dl class="comment_content"><dt>'+ value.user +'</dt><dd>'+ value.comment +'</dd><dd class="date">'+ value.date +'</dd></dl>');
									});
									// 加载更多按钮设置
									$('.comment-list').eq(index).append('<dl><dd><span class="load-more">加载更多</span></dd></dl>');
									var page = 2;
									// 判断评论数少于2条的时候对加载更多按钮的设置
									if(page > count){
										$('.comment-list').eq(index).find('.load-more').off('click');
										$('.comment-list').eq(index).find('.load-more').hide();
										// $('.comment-list').eq(index).find('.load-more').html('加载完成');
									}
									$('.comment-list').eq(index).find('.load-more').button().css('margin-bottom','5px').on('click',function(){
										$('.comment-list').eq(index).find('.load-more').button('disable');
										// 加载更多按钮的ajax效
										$.ajax({
											url:'show_comment.php',
											type:'POST',
											data:{
												titleid:$(comment_this).attr('data-id'),
												page:page,
											},
											beforeSend:function(jqXHR,settings){
												$('.comment-list').eq(index).find('.load-more').html('加载中...');
											},
											success:function(response,status){
												$('.comment-list').eq(index).find('.load-more').button('enable');
												$('.comment-list').eq(index).find('.load-more').html('加载更多');
												var json_comment_more = $.parseJSON(response);

												$.each(json_comment_more,function(index3,value){
													$('.comment-list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>'+ value.user +'</dt><dd>'+ value.comment +'</dd><dd class="date">'+ value.date +'</dd></dl>');
												});
												page ++;
												if(page > count){
													$('.comment-list').eq(index).find('.load-more').off('click');
													$('.comment-list').eq(index).find('.load-more').hide();
													// $('.comment-list').eq(index).find('.load-more').html('加载完成');
												}
											},
										});
									});
									$('.comment-list').eq(index).append('<form><dl class="comment-text"><dt><textarea name="comment" class="textarea"></textarea></dt><dd><input type="hidden" name="titleid" value="'+ $(comment_this).attr('data-id') +'" /><input type="hidden" name="user" value="'+ $.cookie('user') +'" /><input type="button" value="发表" /></dd></dl></form>');
									// 按钮的效果
									$('.comment-list').eq(index).find('input[type=button]').button();
									// 评论发表的按钮点击效果
									$('.comment-list').eq(index).find('input[type=button]').click(function(){
										// 按钮提交评论数据
										var _this = this;
										$('.comment-list').eq(index).find('form').ajaxSubmit({
											url:'add_comment.php',
											type:'POST',
											beforeSubmit:function(formDate,jqForm,options){
												$('#loading').dialog('open');
												$(_this).button('disable');
												$('#loading').html('发表中');
											},
											success:function(responseText,statusText){
												if(responseText){
													$(_this).button('enable');
													$('#loading').html('发表成功!');						
													setTimeout(function(){
														var date = new Date();
														$('.comment-list').eq(index).prepend('<dl class="comment_content"><dt>'+ $.cookie('user') +'</dt><dd>'+ $('.comment-list').eq(index).find('textarea').val() +'</dd><dd>'+ date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+ date.getDate()+ ' '+ date.getHours()+':'+ date.getMinutes()+ ':' + date.getSeconds() +'</dd></dl>')
														$('.comment-list').eq(index).find('form').resetForm();
														$('#loading').dialog('close');
														
														$('#loading').html('发表中...');	
													},500);
												}
											}, 
										});	
									})
								},
							});
						}
						// 评论点击显示与隐藏效果
						if($('.comment-list').eq(index).is(':hidden')){
							$('.comment-list').eq(index).show();
						}else{

							$('.comment-list').eq(index).hide();
						}
						
					}else{
						$('#error').dialog('open');
						setTimeout(function(){
							$('#error').dialog('close');
							$('#login').dialog('open');
						},1000);
					}
				});
			});
		},
	});


	







})