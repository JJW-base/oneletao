$(function(){

// 表单校验
$('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        username:{

            validators:{
                // 为空时显示的提示信息
                notEmpty:{
                    message:"用户不能为空"
                },
                // 长度要求 2-6 位
                stringLength:{
                    min:2,
                    max:6,
                    message: "用户名长度必须是 2-6位"
                },
                callback:{
                    message: "用户名不存在"
                }
            }
        },
        password:{
            validators:{
                notEmpty:{
                    message:"密码不能为空"
                },
                stringLength:{
                    min:6,
                    max:12,
                    message:"密码长度必须是6-12位"
                },
                // 专门用于配置回调提示信息的校验规则
                callback:{
                    message:"密码错误"
                }
            }
        }
    }
});

//进行登录请求
$('#form').on("success.form.bv",function( e ){
    e.preventDefault();
    console.log($('#form').serialize());
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        dataType:"json",
        data: $('#form').serialize(),
        success:function( info ){
            
            if(info.success){
                location.href = "index.html";
            }
            if(info.error === 1000){
                $('#form').data('bootstrapValidator').updateStatus("username","INVALID","callback");
            }
            if(info.error === 1001){
                $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback");
            }
        }
    });
});


  //重置功能实现
  $('[type="reset"]').click(function(){
      console.log(111);
      $('#form').data("bootstrapValidator").resetForm();
  })

});