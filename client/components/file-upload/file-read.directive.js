(function () {
  "use strict";

  angular.module('ecomApp')
    .directive('fileRead', function ($parse, $log) {
      return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attributes, ngModel) {
          element.bind('change', function (changeEvent) {
            var modelFn = $parse(attributes.ngModel);
            $log.info('change');
            scope.$apply(function () {
              modelFn.assign(scope, changeEvent.target.files[0]);
            });
          });
        }
      }
    });
})();