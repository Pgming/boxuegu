define(['utils', 'jquery', 'template', 'uploadify'], function (utils, $, template, uploadify) {
  var cs_id = utils.queryString().cs_id

  $.ajax({
    url: '/api/course/picture',
    type: 'get',
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        var htmlStr = template('tpl_cs_pic', info.result);
        $('.steps').html(htmlStr);

        //上传图片
        $('#btnSelect').uploadify({
          swf: '/views/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/cover',
          fileObjName: 'cs_cover_original',
          formData: { cs_id: cs_id },
          buttonText: '选择图片',
          buttonClass: 'btn btn-success btn-sm',
          width: 85,
          height: 'auto',
          itemTemplate: '<span></span>',
          onUploadSuccess: function (file, data, response) {
            //  var path = JSON.parse(data).result.path;
            // $('.preview img').attr('src',path);
            $('.preview img').attr('src', JSON.parse(data).result.path);

            $('#btnJcrop').prop('disabled', false); // 图片上传成功之后要把图片裁切的功能的按钮启用出来

          }
        });

      }

    }
  })
})