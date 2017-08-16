define(['jquery','template'],function($,template){
  var search=location.search;
  // console.log(search);

search=search.slice(1);
var searchArr=search.split('&');
var o={};
for(var i=0;i<searchArr.length;i++){
  var temp=searchArr[i].split('=');
  o[temp[0]]=temp[1];
}
// console.log(o.tc_id);

$.ajax({
  url:'/api/teacher/edit',
  type:'get',
  data:{
    tc_id:o.tc_id
  },
  success:function(info){
    info.result.title='讲师编辑'
    info.result.saveBtnText='保存'
    if(info.code==200){
      var htmlStr=template('tpl_tc_edit',info.result);
      $('.teacher').html(htmlStr);
    }
  }
})

})