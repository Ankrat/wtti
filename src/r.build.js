({
  appDir: "../",
  baseUrl:"src/scripts",
  paths: {
        jquery         : 'lib/jquery.min',
        underscore     : 'lib/underscore.min',
        backbone       : 'lib/backbone.min'
    },
    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    modules: [
      { name : "main" }
       ],
    optimizeCss: "none",
    dir: "../build"

})