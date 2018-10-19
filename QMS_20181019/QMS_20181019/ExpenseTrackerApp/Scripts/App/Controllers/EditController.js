
angular.module('app')
    .controller('EditController', function ($scope, notifyService, SearchService, $rootScope, $http) {
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


        debugger;
        var allSelected = false;
        var selectedgrid = "";
        $scope.showResults = false;
        $scope.disablebtn = false;
        $scope.searchError = "";
        $scope.searchErrorAssign = "";
        $scope.markStatusFlag = false;
        $scope.showAgentList = true;
        $scope.startdate = "";
        $scope.enddate = "";



        $scope.flag = true;
        //============= SET search criteria values ======================
        $scope.status = "Pending";
        $scope.agentid = "";
        $scope.startDate = "";
        $scope.enddate = "";
        $scope.employeeID = "";
        $scope.assignid = "";

        var refnum = [];






        //===================================================================


        /////***************************** DATE RANGE PICKER SETTINGS *********************

        $scope.date = {
            startDate: moment().subtract(30, "days"),
            endDate: moment(),
            mindate: moment().subtract(90, "days").format('YYYY-MM-DD'),
            maxdate: moment().format('YYYY-MM-DD')

        };

        $scope.opts = {
            opens: "left",
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



        $scope.agentList = {

            serverFiltering: true,

            transport: {

                read: {
                    method: "Get",
                    url: baseurl + "API/Tracker/GetAgentList",
                    datatype: "json"

                }



            }
        };

        $scope.dataSource = new kendo.data.DataSource({
            //   serverPaging: true,
            transport: {

                read: {
                    type: "POST",
                    url: baseurl + "API/Tracker/GetSearchedDataManager",
                    dataType: "json",
                },



                parameterMap: function (options, operation) {

                    //  if (operation == "read") {

                    if ($scope.agentid.AgentID != "" && !angular.isUndefined($scope.agentid.AgentID)) {

                        $scope.agentid_ = $scope.agentid.AgentID;
                    }
                    else {
                        $scope.agentid_ = "All";

                    }
                    var searchCriteria = {

                        status: $scope.status,
                        agentid: $scope.agentid_,

                        startdate: moment($scope.date.startDate).isValid() ? moment($scope.date.startDate).format('YYYY-MM-DD') : "",
                        enddate: moment($scope.date.endDate).isValid() ? moment($scope.date.endDate).format('YYYY-MM-DD') : "",
                        employeeid: "",
                        rolename: ""

                    }

                    return searchCriteria;
                }


            },
            requestEnd: function (e) {
                debugger;

                $scope.showResults = true;

                //$("#grid").data("kendoGrid").refresh();
                // $scope.$apply();

            },

            pageSize: 12,
            schema: {
                model: {
                    id: "refnum"
                }
            },


            error: function (xhr, error) {


                console.log(xhr);
                console.log(error);
            }
        });






        ////////================================TEST GRID ==========================


        $scope.mainGridOptions = {

            dataSource: $scope.dataSource,
            //    enableRowSelection: true,

            pageable: true,
            scrollable: false,
            persistSelection: true,
            sortable: true,
            autoBind: false,
            resizable: false,

            //   selectable: 'row',
            //    scrollable: false,
            //   dataBound: resizeGrid,
            columns:
                [

                     {
                         selectable: true,
                         width: "50px"
                     },
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
                     field: "comments",
                     title: "Comments",
                     width: "120px",
                     hidden: true
                 }



                ]
        };

        //===================================================================

        //*******************************************//


        //================ Approve button ===========



        $scope.AssignRecords = function (e) {
            debugger;

            if ($scope.grid.select().length == 0) {
                $scope.searchErrorAssign = "Please select records";
                return;
            }
            if ($scope.assignid.AgentID == "" || $scope.assignid.AgentID == undefined) {
                $scope.searchErrorAssign = "Please select supervisor";
                return;
            }

            // $scope.agentid.AgentID == $scope.assignid.AgentID
            if ($scope.assignid.AgentID.trim() == $scope.grid.dataSource.data()[0].comments) {
                $scope.searchErrorAssign = "Cannot assign to same supervisor";
                return;
            }
            $scope.searchErrorAssign = "";
            $scope.disablebtn = true;
            var grid = $scope.grid;

            oldPageSize1 = grid.dataSource.pageSize();
            grid.dataSource.pageSize(grid.dataSource.data().length);
            selectedElements = grid.select();

            for (var j = 0; j < selectedElements.length; j++) {
                var item = grid.dataItem(selectedElements[j]);
                refnum[j] = item.refnum;

            }
            grid.dataSource.pageSize(oldPageSize1);
            $scope.assign.array = refnum;
            $scope.assign.supID = $scope.assignid.AgentID;

            SearchService.AssignRecords($scope.assign).then(function (res) {
                debugger;
                notifyService.notify("Records Assigned Succesfully!", "success");
                $scope.UnselectAllRecords();

                $scope.mainGridOptions.dataSource.read();
                $scope.mainGridOptions.dataSource.page(1);
                $scope.disablebtn = false;
                refnum.length = 0;


            }).catch(function (err) {

                notifyService.notify("Records could not be assigned!", "error");
                $scope.disablebtn = false;
                console.log('error', err);
            });

        };


        $scope.GetRecords = function () {
            debugger;

            if ($scope.agentid.AgentID == "" || $scope.agentid.AgentID == undefined) {
                $scope.searchError = "Please select supervisor";
                return;
            }
            else {
                $scope.searchError = "";
                $scope.mainGridOptions.dataSource.read();
                $scope.mainGridOptions.dataSource.page(1);
            }




        }
        $scope.assign = {
            array: "",
            supID: ""

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
                selectedgrid = grid.select();
                allSelected = true;
            };

            grid.dataSource.pageSize(oldPageSize);
        }

        $scope.UnselectAllRecords = function (e) {
            debugger;
            var grid = $scope.grid;

            oldPageSize = grid.dataSource.pageSize();
            grid.dataSource.pageSize(grid.dataSource.data().length);

            if (grid.dataSource.data().length === grid.select().length) {
                grid.clearSelection();
            } else {
                grid.clearSelection();
            };

            grid.dataSource.pageSize(oldPageSize);

            var selectedElements = grid.select();
            console.log($scope.mainGridOptions);
            console.log($scope.mainGridOptions.dataSource);

            //   $scope.mainGridOptions.dataSource
            for (var j = 0; j < selectedElements.length; j++) {
                var item = grid.dataItem(selectedElements[j]);
                refnum[j] = item.ProductID;
                // grid.tbody.find("tr[data-uid=" + item.uid + "]").hide()
                //   items['products[' + j + '].ItemDescription'] = item.ItemDescription;
                //   items['products[' + j + '].Quantity'] = item.Quantity;
            }
        };

    });