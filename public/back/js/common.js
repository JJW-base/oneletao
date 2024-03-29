//开启进度条
// ajaxStart 所有的 ajax 开始调用
$(document).ajaxStart(function(){
    NProgress.start();
});
// ajaxStop 所有的 ajax 结束调用
$(document).ajaxStop(function(){
    NProgress.done();
});

//登陆拦截
if(location.href.indexOf("login.html") === -1){  //
    $.ajax({
        url:"/employee/checkRootLogin",
        type:"get",
        success:function( info ){
            if(info.success){
                
                console.log("登陆成功");
            }
            if(info.error === 400){
                location.href = "login.html"
            }
        }
    })
}

$(function(){

  // 1. 二级分类切换功能
  $('.category').click(function() {
    $(this).next().stop().slideToggle();
  });
  // 2. 顶部菜单栏切换显示功能
  $('.icon_menu').click(function(){
      $('.lt_aside').toggleClass("hidemenu");
      $('.lt_main').toggleClass("hidemenu");
      $('.lt_topbar').toggleClass("hidemenu");
  })
  // 3. 点击退出图标显示退出模态框
  $('.icon_logout').click(function(){
    $('#myModal').modal('show');
  });

  //4.退出
  $('#logoutBtn').click(function(){
      console.log(111);

      $.ajax({
          url:"/employee/employeeLogout",
          type:"GET",
          dataType:"json",
          success:function( info ){
              console.log(info.success);
            if(info.success){
                location.href = "login.html"
            }
          }
      })
  })




});