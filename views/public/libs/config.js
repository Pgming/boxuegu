
require.config({
  baseUrl: '/views/public',
  paths: {
    'jquery': 'assets/jquery/jquery',
    'cookie': 'assets/jquery-cookie/jquery.cookie',
    'bootstrap': 'assets/bootstrap/js/bootstrap.min',
    'template': 'assets/artTemplate/template',
    'nprogress': 'assets/nprogress/nprogress',
    'form': 'assets/jquery-form/jquery.form',
    'datepicker': 'assets/bootstrap-datepicker/js/bootstrap-datepicker',
    'datepickerzh': 'assets/bootstrap-datepicker/js/bootstrap-datepicker.zh-CN.min',
    'uploadify': 'assets/uploadify/jquery.uploadify',
    'region': 'assets/jquery-region/jquery.region',
    'ckeditor': 'assets/ckeditor/ckeditor',
    'utils':'libs/utils',
    'Jcrop': 'assets/Jcrop/js/Jcrop',
    //      'common': 'js/common'
    'common': 'js/dashboard/common',
    'login': 'js/dashboard/login'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    datepickerzh: {
      deps: ['jquery']
    },
    uploadify: {
      deps: ['jquery']
    },

    ckeditor: {
      exports: 'CKEDITOR'
    }
  }
});
require(['common']);
  // require(['login']);
