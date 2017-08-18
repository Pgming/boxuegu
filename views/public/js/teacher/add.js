define(['jquery', 'template', 'datepicker', 'datepickerzh', 'form'], function ($, template, datepicker) {
  var search = location.search;
  // console.log(search);

  search = search.slice(1);
  var searchArr = search.split('&');
  var o = {};
  for (var i = 0; i < searchArr.length; i++) {
    var temp = searchArr[i].split('=');
    o[temp[0]] = temp[1];
  }
  // console.log(o.tc_id);
  if (o.tc_id) {
    $.ajax({
      url: '/api/teacher/edit',
      type: 'get',
      data: {
        tc_id: o.tc_id
      },
      success: function (info) {
        info.result.title = '讲师编辑'
        info.result.saveBtnText = '保存'
        if (info.code == 200) {
          var htmlStr = template('tpl_tc_edit', info.result);
          $('.teacher').html(htmlStr);

          dateShi('input[name=tc_join_date]')//调用日历插件
        }
      }
    })

    ajaxSubmit('/api/teacher/update');//调用点击按钮保存编辑事件

  } else {
    //添加讲师按钮
    var htmlStr = template('tpl_tc_edit', {
      title: '讲师添加',
      saveBtnText: '添加',
      tc_gender: 0

    });
    $('.teacher').html(htmlStr);

    dateShi('input[name=tc_join_date]')//调用日历插件



    ajaxSubmit('/api/teacher/add');//调用按钮点击添加讲师信息事件

  }

  function ajaxSubmit(url) {
    //给编辑里面的保存按钮注册事件
    $(".teacher").on('click', '.btnSave', function () {
      // alert('123')
      $('form').ajaxSubmit({
        // url:'/api/teacher/update',
        url: url,
        type: 'post',
        success: function (res) {
          if (res.code == 200) {
            alert('提交成功。。。');
            location.href = '/teacher/list';
          }

        }
      })
      return false;
    })
    // $(".teacher").on('click',function(){
    //   alert('123')
    // })
  }

  //日历插件封装
  function dateShi(res) {
    $(res).datepicker({
      format: 'yyyy/mm/dd',
      language: 'zh-CN'
    })
  }

})