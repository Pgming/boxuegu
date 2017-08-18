define(['jquery', 'template', 'uploadify', 'datepicker', 'datepickerzh', 'region', 'ckeditor', 'form'], function ($, template, upload, datepicker, datepickerzh, region, CKEDITOR) {

  $.ajax({
    url: '/api/teacher/profile',
    type: 'get',
    success: function (res) {
      if (res.code == 200) {
        var htmlStr = template('tpl_settings', res.result);
        $('.settings').html(htmlStr);

        //加载图片头像插件
        $('#upfile').uploadify({
          'swf': '/views/public/assets/uploadify/uploadify.swf',
          'uploader': '/api/uploader/avatar', //提交的接口
          'width': 120,
          'height': 120,
          'buttonText': '',
          'fileObjName': 'tc_avatar',
          onUploadSuccess: function (file, data, response) {
            $('.preview img').attr('src', JSON.parse(data).result.path);
            $('.avatar.img-circle img').attr('src', JSON.parse(data).result.path);
          }
        });
        // 使用日期插件
        $('input[name=tc_join_date],input[name=tc_birthday]').datepicker({
          format: 'yyyy/mm/dd',
          language: 'zh-CN'
        });
        //三级联动插件
        $('#region').region({
          url: '/views/public/assets/jquery-region/region.json'  // 配置数据信息
        });

        // 富文本编辑器的使用
        CKEDITOR.replace('tc_introduce', {
          toolbarGroups: [
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
            { name: 'links' },
            { name: 'insert' },
            { name: 'forms' },
            { name: 'tools' },
            { name: 'document', groups: ['mode', 'document', 'doctools'] }
          ]
        });

        $('.settings').on('click', '.saveBtn', function () {
          alert('666')
          //更新副文本内容
          $("#tc_introduce").val(CKEDITOR.instances.tc_introduce.getData());
          //  console.log($('form'))
          $('form').ajaxSubmit({
            url: '/api/teacher/modify',
            type: 'post',
            success: function (info) {
              if (info.code == 200) {
                alert('保存成功。。。');
                //  location.href='/settings';
              }
            }
          })
          return false;
        });

      }
    }
  })


})