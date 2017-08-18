define(['jquery', 'template', 'bootstrap'], function ($, template) {
  // 渲染页面信息
  $.ajax({
    url: '/api/teacher',
    type: 'get',
    success: function (data) {
      if (data.code == 200) {
        var htmlStr = template('tc_list_tpl', data);
        $("#tc_list_tBody").html(htmlStr);
      }
    }
  })
  //给查看按钮注册点击事件
  $('#tc_list_tBody').on('click', 'a.check-info', function () {
    var id = $(this).parent().attr('data-id');
    $.ajax({
      url: '/api/teacher/view',
      type: 'get',
      data: { tc_id: id },
      success: function (info) {
        // console.log(info)
        if (info.code == 200) {
          var htmlStr = template('tc_info_tpl', info.result);
          $('#teacherModal tbody').html(htmlStr);
          $('#teacherModal').modal();//让模态框弹出
        }
      }
    })
  })
  //按钮注销和启用
  $('#tc_list_tBody').on('click', 'a.btnHandle', function () {
    console.log(1)
    var _this = $(this);
    $.ajax({
      url: '/api/teacher/handle',
      type: 'post',
      data: {
        tc_id: $(this).parent().attr('data-id'),
        tc_status: $(this).attr('data-status')
      },
      success: function (res) {
        if (res.code == 200) {
          if (res.result.tc_status == 1) {
            _this.text('启 用')
          } else {
            _this.text('注 销')
          }
          _this.attr('data-status', res.result.tc_status);
        }
      }
    })
  })


})
