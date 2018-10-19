
angular.module('app')
.directive('blurCurrency', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function link(scope, el, attrs, ngModelCtrl) {
            debugger;
            function formatter(value) {
                value = value ? parseFloat(value.toString().replace('$', '').replace(',', '').replace(/[^0-9._-]/g, '')) || 0 : 0;
                var formattedValue = $filter('currency')(value);
                
                if (value != 0 )
                el.val(formattedValue);

                ngModelCtrl.$setViewValue(value);
              //  scope.$apply();

                return formattedValue;
            }
            if (el.val() != 0)
              ngModelCtrl.$formatters.push(formatter);

            el.bind('focus', function () {
                console.log(el.val());
                //el.val('');
            });

            el.bind('blur', function () {
                var value = el.val() ? parseFloat(el.val().toString().replace(/[^0-9._-]/g, '')) || 0 : 0;//
                console.log('in blur1', el.val());
                if (value == 0 || value<0.01)
                    el.val('');
                formatter(el.val());
                console.log('in blur', el.val());
            });
        }

    };
}]);