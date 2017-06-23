(function () {
  "use strict";

  angular.module('ecomApp')
    .directive('fileUpload', function () {
      return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'components/file-upload/file-upload.html',
        controller: FileUploadController,
        controllerAs: 'vm'
      };
    });

  /* @ngInject*/
  function FileUploadController($scope, $log, uiUploader) {
    var vm = this;

    vm.onRemove = onRemove;
    vm.onClean = onClean;
    vm.onUpload = onUpload;

    vm.files = [];


    function onRemove(file) {
      $log.info('deleting=' + file);
      uiUploader.removeFile(file);
    }

    function onClean() {
      uiUploader.removeAll();
    }

    function onUpload() {
      $log.info('uploading...');
      uiUploader.startUpload({
        url: './api/uploadFile',
        concurrency: 2,
        onProgress: function (file) {
          $log.info(file.name + '=' + file.humanSize);
          $scope.$apply();
        },
        onCompleted: function (file, response) {
          $log.info(file + 'response' + response);
        }
      });
    }

    $scope.$watch('vm.readFiles', function () {
      var files = [];
      if(vm.readFiles){
        console.log('!vm.readFiles===',vm.readFiles);
        files.push(vm.readFiles);
        uiUploader.addFiles(files);
        vm.files = uiUploader.getFiles();
        console.log('!vm.files=',vm.files);
        // $scope.$apply();
      }
    });

    // var element = document.getElementById('file1');
    // element.addEventListener('change', function (e) {
    //   var files = e.target.files;
    //   uiUploader.addFiles(files);
    //   vm.files = uiUploader.getFiles();
    //   $scope.$apply();
    // });
  }
})();