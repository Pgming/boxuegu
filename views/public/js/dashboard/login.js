/**
 * Created by Administrator on 2017/8/14.
 */
define(['jquery', 'cookie'], function ($) {
  $('#formLogin').submit(function (e) {
    var data = $(this).serializeArray(); // 获取表单数据
    $.ajax({
      url: '/api/login',
      type: 'post',
      data: data,
      success: function (result) {
        alert('登陆成功...');
        $.cookie('tcInfo', JSON.stringify(result.result));
        location.href = '/';// 登陆成功之后要跳转到主页面
      },
      error: function (errInfo) {
        alert('用户名或是密码错误...');
      }
    })
    return false;  // 不但可以阻止冒泡，还可以阻止默认行为


  })
})