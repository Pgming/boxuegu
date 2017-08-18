define(['utils', 'jquery', 'template', 'ckeditor', 'form'], function (utils, $, template, CKEDITOR) {
  //渲染页面

  var cs_id = utils.queryString().cs_id;

  $.ajax({
    url: '/api/course/basic',
    type: 'get',
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        var htmlStr = template('tpl_cs_basic', info.result)
        $('.steps').html(htmlStr);

        CKEDITOR.replace('cs_brief');
      }
    }
  })

  //保存注册事件
  $('.steps').on('click', '.btnSave', function () {
    // alert(666);
    $('#cs_brief').val(CKEDITOR.instances.cs_brief.getData());
    $('form').ajaxSubmit({
      url: '/api/course/update/basic',
      type: 'post',
      success: function (info) {
        if (info.code == 200) {
          alert('保存成功。。。');
          location.href = '/course/pic?cs_id=' + info.result.cs_id;
        }
      }
    })
    return false
  })


})