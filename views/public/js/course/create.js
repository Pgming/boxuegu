define(['jquery', 'form'], function ($, form) {
  //提交添加课程数据
  $('.btnCreate').on('click', function () {
    // alert(122)
    $('form').ajaxSubmit({
      url: '/api/course/create',
      type: 'post',
      success: function (info) {
        if (info.code == 200) {
          alert('提交成功。。。');
          location.href = '/course/basic?cs_id=' + info.result.cs_id;
        }
      }
    })
    return false;
  })

})