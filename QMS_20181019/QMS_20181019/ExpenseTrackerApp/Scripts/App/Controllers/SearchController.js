
angular.module('app')
    .controller('SearchController', function ($scope, SearchService, $rootScope, $http) {

        var currentLocation = window.location.toString();

        var baseurl = "";
        // alert(currentLocation.indexOf('Internal'));

        if (currentLocation.indexOf('Internal') >= 0) {
            baseurl = "/Internal/";
        }
        else if (currentLocation.indexOf('External') >= 0) {
            baseurl = "/External/";
        }
        else {
            baseurl = "/";
        }


        $scope.recordstatus = "SupRecords";

        $scope.markStatusFlag = true;
        var role = angular.element('#role').val();
        var open = "left";
        $scope.showAgentList = true;

        $scope.startdate = "";
        $scope.enddate = "";

        $scope.user = {
            EmployeeId: "",
            AgentID: "",
            AgentName: "",
            supName: "",
            supID: "",
            supEmail: "",
            agentLocation: "Lahore"

        };


        $scope.flag = true;
        //============= SET search criteria values ======================
        $scope.status = "Pending";
        $scope.agentid = "";
        $scope.assignid = "";
        $scope.startDate = "";
        $scope.enddate = "";
        $scope.employeeID = "";
        localStorage.clear();




        if (role == "Supervisor") {
            debugger;
            $scope.markStatusFlag = false;
            open = "right"
            // $scope.opts = { opens: "right" }

        }



        //=================================Initialize dropdowns==================================
        $scope.agentList = {

            serverFiltering: true,

            transport: {

                read: {
                    method: "Get",
                    url: baseurl + "API/Tracker/GetAgentList",
                    datatype: "json"

                },
                parameterMap: function (options, operation) {



                    var getListCriteria = {
                        EmployeeID: localStorage.getItem('EmployeeID'),
                        ClientID: localStorage.getItem('ClientID')
                    }

                    return getListCriteria;

                },


            }
        };

        ///===================== Assigned List ======================

        $scope.assignList = {

            serverFiltering: true,

            transport: {

                read: {
                    method: "Get",
                    url: baseurl + "API/Tracker/GetAssignList",
                    datatype: "json"

                },
                parameterMap: function (options, operation) {



                    var getListCriteria = {
                        EmployeeID: localStorage.getItem('AgentID'),
                        ClientID: localStorage.getItem('ClientID')
                    }

                    return getListCriteria;

                },


            }
        };

        ///////////////////////================= Initilize Grid ==============


        $scope.dataSource = new kendo.data.DataSource({
            //   serverPaging: true,
            transport: {

                read: {
                    type: "POST",
                    url: baseurl + "API/Tracker/GetSearchedData",
                    dataType: "json",
                },



                parameterMap: function (options, operation) {

                    if ($scope.recordstatus == "SupRecords") {

                        if ($scope.agentid.AgentID != "" && !angular.isUndefined($scope.agentid.AgentID)) {

                            $scope.agentid_ = $scope.agentid.AgentID;
                        }
                        else {
                            $scope.agentid_ = "All";

                        }
                    }
                    else if ($scope.recordstatus == "AssignedRecords") {
                        if ($scope.assignid.AgentID != "" && !angular.isUndefined($scope.assignid.AgentID)) {

                            $scope.agentid_ = $scope.assignid.AgentID;
                        }
                        else {
                            $scope.agentid_ = "All";

                        }
                    }
                    var searchCriteria = {

                        status: $scope.status,
                        agentid: $scope.agentid_,

                        startdate: moment($scope.date.startDate).isValid() ? moment($scope.date.startDate).format('YYYY-MM-DD') : "",
                        enddate: moment($scope.date.endDate).isValid() ? moment($scope.date.endDate).format('YYYY-MM-DD') : "",
                        employeeid: "",
                        rolename: "",
                        recordstatus: $scope.recordstatus
                    }

                    return searchCriteria;
                }


            },

            batch: false,
            pageSize: 12,
            schema: {
                errors: "error",
                data: function (response) {
                    debugger;
                    //$scope.grid.dataSource.data(r);

                    console.log(response);
                    console.log($scope.flag);
                    //  $scope.mainGridOptions.dataSource = response;


                    return response;

                }
            },


            error: function (xhr, error) {


                console.log(xhr);
                console.log(error);
            }
        });







        $scope.mainGridOptions = {

            dataSource: $scope.dataSource,
            //    enableRowSelection: true,

            sortable: true,
            pageable: true,
            // persistSelection: true,
            //  autoSync: true,
            //height: 550,
            filterable: {
                extra: false,
                operators: {
                    string: {
                        startswith: "Starts with",
                        eq: "Is equal to",
                        neq: "Is not equal to"
                    }
                }
            },

            resizable: false,
            dataBound: function () {
                var data = $scope.dataSource.view();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status == "Approved") {
                        var row = this.tbody.find("tr[data-uid='" + data[i].uid + "']");
                        //  data[i].set("Amount", true); //if the field is boolean and the column contains a checkbox it will be checked
                        //  row.css("background-color", "Green");
                        //      angular.element(document.getElementById('app'))[0].disabled = true;

                        //   dataSource: $scope.dataSource;
                    }
                }
            },
            //   selectable: 'row',
            //    scrollable: false,
            //   dataBound: resizeGrid,
            columns:
                [


                {
                    field: "refnum",
                    title: "Refnum",
                    width: "120px",
                    hidden: true
                },
                {
                    field: "agentid",
                    title: "Employee ID",
                    width: "120px"
                }, {
                    field: "agentname",
                    title: "Agent Name",
                    width: "120px"
                }, {
                    field: "ban",
                    title: "BAN",
                    width: "110px"
                }, {
                    field: "amount",
                    title: "Amount",
                    width: "120px",
                    format: "{0:c2}"

                },
            {
                field: "status",
                title: "Status",
                width: "120px"
            },
            {
                field: "orderdate",
                title: "Submission Date",
                width: "150px",

                format: "{0:yyyy-MM-dd}",

                filterable: {
                    ui: function (element) {
                        element.kendoDatePicker({
                            format: "MM-dd-yyyy",

                        });

                    }
                }
            },
             {
                 field: "Comments",
                 title: "Comments",
                 width: "120px",
                 hidden: true
             },
            {
                command: { text: "", template: "<button class=\"k-button\" id=\"app\" ng-disabled=\"this.dataItem.status !== 'Pending'\"  ng-click=\"approve( this.dataItem,'Approved')\">Approve</button> <button class=\"k-button\" ng-disabled=\"this.dataItem.status !== 'Pending'\"  ng-click=\"approve( this.dataItem,'Declined')\">Decline</button>" }, title: "Mark Status", hidden: $scope.markStatusFlag, width: "150px"

            },


                ]
        };

        /////***************************** DATE RANGE PICKER SETTINGS *********************

        $scope.date = {
            startDate: moment().subtract(1, "days"),
            endDate: moment(),
            mindate: moment().subtract(90, "days").format('YYYY-MM-DD'),
            maxdate: moment().format('YYYY-MM-DD')

        };

        $scope.opts = {
            opens: open,

            locale: {
                applyClass: 'btn-green',
                applyLabel: "Apply",
                fromLabel: "From",
                format: "YYYY-MM-DD",
                toLabel: "To",
                cancelLabel: 'Clear',
                customRangeLabel: 'Custom range'
            },
            minDate: moment().subtract(90, 'days'),
            maxDate: moment().subtract(-2, 'days'),
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        };

        $scope.toolbarTemplate = $("#template").html();


        //=================================== Set Search Criteria Accordingly ===================================

        //================




        ////////================================TEST GRID ==========================



        //===================================================================

        //*******************************************//


        //================ Approve button ===========
        $scope.approve = function (rowValue, markStatus) {


            console.log(rowValue.refnum);
            console.log(rowValue);
            $scope.setstatus = {
                status: markStatus,
                refnum: rowValue.refnum
            };
            debugger;
            // rowValue.status = markStatus;
            SearchService.UpdateStatus($scope.setstatus).then(function (res) {
                debugger;
                console.log($scope.setstatus);
                //    ;
                //  //    var index = $scope.dataSource.indexOf(rowValue);
                //   angular.element(document.getElementById('app'))[1].disabled = true;
                //   angular.element(document.getElementById('dec'))[index].disabled = true;




                rowValue.status = markStatus;
                //   $scope.$apply();

            }).catch(function (err) {
                console.log('error', err);
            });

        };

        ///------------
        $scope.AssignedRecords = function () {

            $scope.recordstatus = "AssignedRecords";

            debugger;
            $scope.mainGridOptions.dataSource.read();
            $scope.mainGridOptions.dataSource.page(1);



        };
        //-----------0==============================================
        $scope.GetRecords = function () {
            debugger;
            $scope.recordstatus = "SupRecords";
            $scope.mainGridOptions.dataSource.read();
            $scope.mainGridOptions.dataSource.page(1);

            //  $scope.grid.dataSource.dataSource.page(1);//

        }



        $scope.SelectRecords = function (e) {
            debugger;
            console.log($scope.grid);
            // var grid = $scope.dataSource.view();
            //  var grid = e.sender;
            var grid = $scope.grid;

            oldPageSize = grid.dataSource.pageSize();
            grid.dataSource.pageSize(grid.dataSource.data().length);

            if (grid.dataSource.data().length === grid.select().length) {
                grid.clearSelection();
            } else {
                grid.select("tr");
            };

            //   grid.dataSource.pageSize(oldPageSize);
        }

    });