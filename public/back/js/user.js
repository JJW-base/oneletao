$(function(){

    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;
    render();
    function render(){

        $.ajax({
            type:"get",
            url: "/user/queryUser",
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

    // 2. 通过事件委托给 按钮注册点击事件
    $('.lt_content tbody').on('click','.btn',function(){
        console.log("111");
        $('#userModal').modal("show");

         // 用户 id
        var id = $(this).parent().data("id");
         // 获取将来需要将用户置成什么状态
        var isDelete = $(this).hasClass("btn-success")? 1:0;
        console.log(id);
        console.log(isDelete);
        $('#submitBtn').off('click').on('click',function(){

            $.ajax({
                type:"post",
                url: "/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success){
                        // 关闭模态框
                        $('#userModal').modal("hide");
                        // 重新渲染
                        render();
                    }
                }
            })
        });
    });

})