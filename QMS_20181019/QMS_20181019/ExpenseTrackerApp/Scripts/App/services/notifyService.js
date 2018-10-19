
angular.module('app').factory('notifyService', [
  '$rootScope',
  '$timeout',
  function ($rootScope, $timeout) {
      debugger;
    return {
        notify: function (message, status, position) {
            debugger;
      //      alert(message+ status+position)
        /*   $rootScope.message = message;

                $timeout(function() {
                    $rootScope.showMessage = true;
                }, 4000);

            $rootScope.showMessage=false;
            $('#notifier').show();*/
        if (typeof position == ' undefined' || position === '') {
          position = 'toast-top-right';
        }
        toastr.options = {
          'closeButton': false,
          'debug': false,
          'newestOnTop': false,
          'progressBar': false,
          'positionClass': position,
          'preventDuplicates': true,
          'onclick': null,
          'showDuration': '300',
          'hideDuration': '1000',
          'timeOut': '5000',
          'extendedTimeOut': '1000',
          'showEasing': 'swing',
          'hideEasing': 'linear',
          'showMethod': 'fadeIn',
          'hideMethod': 'fadeOut',
          'toastClass': 'toast'
        };
        if (status === 'success') {
         //   alert("In succes")
          toastr.success(message);
        } else if (status === 'warning') {
          toastr.warning(message);
        } else if (status === 'error') {
          toastr.error(message);
        } else if (status === 'info') {
          toastr.info(message);
        } else {
          toastr.info(message);
        }
      },
      showLoading: function (msg) {
        if (msg) {
          $rootScope.message = msg;
        } else {
          $rootScope.message = 'Loading...';
        }
        $rootScope.showMessage = false;
      },
      hideLoading: function () {
        $rootScope.showMessage = true;
      }
    };
  }
]);