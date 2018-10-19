
angular.module('app')
    .controller('welcomeController', function ($scope, $rootScope, notifyService, $window, welcomeService) {




        $scope.Error = "";

        ////////////// SET USER FOR DATA BINDING ////////////
        $scope.user = {
            EmployeeId: "",
            AgentID: "",
            AgentName: "",
            supName: "",
            supID: "",
            supEmail: ""


        };



        $scope.Success_msg = false;
        $scope.showLoading = false;



        $scope.dataentry = {
            AgentID: "",
            BAN: "",
            Amount: "",
            AgentName: "",
            SupervisorName: "",
            SupervisorID: "",
            SupervisorEmail: ""

        }

        //**************************** GET USER PROFILE AND SUP EMAIL ON PAGELOAD **************//


        $scope.GetSupInfo = function () {
            debugger;
            var AgentID = angular.element('#agentid').val();
            welcomeService.GetSupInfo(AgentID).then(function (res) {



                localStorage.setItem('SupEmail', res.data[0].Email);
                localStorage.setItem('SupName', res.data[0].SupName);
                localStorage.setItem('SupEmpID', res.data[0].SupEmpID);
                localStorage.setItem('SupID', res.data[0].SupID);


                //****************SET USER VALUES ********************///

                $scope.user.supID = localStorage.getItem('SupID');
                $scope.user.supName = localStorage.getItem('SupName');
                $scope.user.supEmail = localStorage.getItem('SupEmail');



                console.log('AgentID', localStorage.getItem('SupEmail'));

            }).catch(function (err) {
                console.log('error', err);
                //  $scope.Success_msg = false;
            });

        }

        $scope.validate = function (event) {
            event.preventDefault();

            if ($scope.validator.validate()) {
                debugger;
                if (parseInt(angular.element('#amount').val().replace(/[^0-9\.]/g, ''), 10).toString().length > 5) {
                    $scope.Error = 'Please enter amount containing 7 digits only'
                    return;
                }
                else {

                    $scope.Error = "";
                    $scope.submit();
                }


            } else {
                debugger;

                //$scope.validationMessage = "Oops! There is invalid data in the form.";
                //    $scope.validationClass = "invalid";
            }
        }

        $scope.Clear = function () {
            debugger;
            $scope.dataentry.BAN = "";
            $scope.dataentry.Amount = "";
        }

        $scope.submit = function () {

            $scope.Success_msg = true;

            console.log(angular.element('#amount').val());
            $scope.dataentry.Amount = angular.element('#amount').val();
            $scope.dataentry.AgentID = $scope.user.AgentID;
            $scope.dataentry.AgentName = $scope.user.AgentName;
            $scope.dataentry.SupervisorName = $scope.user.supName;
            $scope.dataentry.SupervisorID = $scope.user.supID;
            $scope.dataentry.SupervisorEmail = $scope.user.supEmail;


            var sendEmail = angular.copy($scope.dataentry);

            welcomeService.submit($scope.dataentry).then(function (res) {

                debugger;

                $scope.Success_msg = false;
                console.log('res', $scope.Success_msg);
                notifyService.notify("Record Inserted Succesfully!", "success");
                $scope.dataentry.BAN = "";
                $scope.dataentry.Amount = "";
                welcomeService.sendEmail(sendEmail).then(function (res) {


                }).catch(function (err) {

                });


            }).catch(function (err) {

                notifyService.notify("Error! Please try again!", "error");
                console.log('error', err);
                $scope.Success_msg = false;
            });


        };
    });
