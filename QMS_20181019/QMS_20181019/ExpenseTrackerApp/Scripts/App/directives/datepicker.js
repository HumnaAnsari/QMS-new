(function () {
    app.directive('datePickerScope', function () {
        return {
            restrict: 'E',
            scope: {
                controller: "="
            },
            link: function (scope, element, attr) {

                $(element).daterangepicker({
                    "dateLimit": {
                        "days": 30
                    },
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    locale: {
                        format: 'YYYY-MM-DD'
                    },

                    autoUpdateInput: false,
                    locale: {
                        cancelLabel: 'Clear'
                    }
                }, function (start, end, label) {
                 //   $(element).find("span").html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
                    scope.controller.startdate = new Date(start)
                    scope.controller.enddate = new Date(end)
                    scope.$apply();
                });
                $(element).on('apply.daterangepicker', function (ev, picker) {

                    scope.controller.startdate = new Date(picker.startDate)
                    scope.controller.enddate = new Date(picker.endDate)
                    scope.$apply();
                  //  $(element).find("span").html(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));

                });
                $(element).on('cancel.daterangepicker', function (ev, picker) {
                    scope.controller.startdate = ""
                    scope.controller.enddate = ""
                    scope.$apply();
                   // $(element).val('');

                    $(element).find("span").html("");
                });
            }

        }

    });
})();