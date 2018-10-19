SessionUpdater = (function () {
    var clientMovedSinceLastTimeout = false;
    var keepSessionAliveUrl = null;
    var timeout = 5 * 1000 * 60; // 5 minutes
    //var timeout = 15000; // 15 seconds for testing

    function setupSessionUpdater(actionUrl) {
        // store local value
        keepSessionAliveUrl = actionUrl;
        //    alert(actionUrl);
        // setup handlers
        listenForChanges();
        // start timeout - it'll run after n minutes
        checkToKeepSessionAlive();
    }

    function listenForChanges() {
        $("body").on("mousemove keydown", function () {
            clientMovedSinceLastTimeout = true;
        });
    }


    // fires every n minutes - if there's been movement ping server and restart timer
    function checkToKeepSessionAlive() {
        setTimeout(function () { keepSessionAlive(); }, timeout);
    }

    function keepSessionAlive() {
        // if we've had any movement since last run, ping the server


        if (!clientMovedSinceLastTimeout && keepSessionAliveUrl != null) {
            $.ajax({
                cache: false,
                type: "POST",
                url: keepSessionAliveUrl,
                success: function (data) {
                    console.log("keepalive");
                    // reset movement flag
                    clientMovedSinceLastTimeout = false;
                    // start listening for changes again
                    listenForChanges();
                    // restart timeout to check again in n minutes
                    checkToKeepSessionAlive();
                },
                error: function (data) {
                  //alert("ERROR");
                    console.log("Error posting to " & keepSessionAliveUrl);
                }
            });
        }
        else {
            clientMovedSinceLastTimeout = false;
            listenForChanges();
            checkToKeepSessionAlive();
        }

    }

    // export setup method
    return {
        Setup: setupSessionUpdater
    };

})();