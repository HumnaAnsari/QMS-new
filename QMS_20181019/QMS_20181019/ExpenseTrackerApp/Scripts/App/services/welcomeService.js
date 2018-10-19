angular.module('app')
.service('welcomeService', ['$http', '$rootScope', function ($http, $rootScope) {

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


    this.submit = function (data) {
        debugger;
        console.log('data i am here', data);
        return $http({
            method: "POST",

            url: baseurl + "API/Tracker/DataEntry",
            data: data


        });
    }


    this.sendEmail = function (data) {
        debugger;
        console.log('data i am here', data);
        return $http({
            method: "POST",
            url: baseurl + "API/Tracker/SendEmail",
            data: data


        });
    }


    this.GetSupInfo = function (data) {
        console.log('GetSupEmail', data);
        return $http({
            method: "GET",
            url: baseurl + "API/Tracker/GetSupInfo",
            params: { AgentID: data }


        });
    }


    this.GetUserProfile = function (data) {

        return $http({
            method: "GET",
            url: baseurl + "Account/GetUserProfile"

        });
    }



}
])
