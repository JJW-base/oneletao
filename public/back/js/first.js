$(function(){

    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;
    render();
    function render(){

        $.ajax({
            type:"get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
              },
              success:function(info){
                //   console.log(info);
                // 参数2 必须是一个对象
                // 在模板中可以任意使用对象中的属性
                // isDelete 表示用户的启用状态, 1就是启用, 0就是禁用
                  var htmlStr = template( "tpl", info );
                  $('.lt_content tbody').html(htmlStr);


                  // 配置分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                    
                });
              }
        })
    }
  
    // 2. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function() {
        $('#addModal').modal("show");
      })

    // 3. 通过校验插件, 添加校验功能
    $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
       // 校验的字段
      fields:{
        categoryName:{
            validators:{
                notEmpty:{
                    message: "请输入一级分类名称"
                }
            }
        }
      }
      
    });

    // 4. 注册表单校验成功事件
    $('#form').on("success.form.bv",function( e ){
        
        $.ajax({
            url: "/category/addTopCategory",
            type: "POST",
            data: $('#form').serialize(),
            success: function( info ) {
              console.log(info);
              if (info.success) {
                // 关闭模态框
                $('#addModal').modal("hide");
                // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
                currentPage = 1;
                render();
      
                // 重置表单校验状态和 表单内容
                // 传 true 不仅可以重置 状态, 还可以重置内容
                $('#form').data("bootstrapValidator").resetForm( true );
              }
            }
          }) 
    })

})