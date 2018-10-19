angular.module('app')
.service('SearchService', ['$http', '$rootScope', function ($http, $rootScope) {


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

    


    this.AssignRecords = function (data) {
        debugger;
        return $http({
            method: "POST",
          
            url:baseurl+ "API/Tracker/AssignRecords",
            params: { list: JSON.stringify(data.array) ,SupID:data.supID}
         
        });
    }

    this.GetRecords = function (data) {
        console.log('data i am here', data);
        return $http({
            method: "POST",
            url: baseurl+"API/Tracker/GetSearchedData",
            data: data
        });
    }

    this.AgentList = function () {
       debugger;
        console.log('AgentList');
        return $http({
            method: "Get",
            url: baseurl+"API/Tracker/GetAgentList"

           
        });
    }


    this.UpdateStatus = function (data) {
        console.log('data i am here', data.status);
        console.log('data i am here', data.refnum);
        return $http({
            method: "POST",
            url: baseurl+"API/Tracker/UpdateStatus",
            params: { Status: data.status, Refnum: data.refnum }

        });
    }

}
])
