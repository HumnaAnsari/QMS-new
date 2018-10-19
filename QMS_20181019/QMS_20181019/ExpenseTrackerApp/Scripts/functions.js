function DisableControls() {

    $("#txtRefNo").attr("disabled", "disabled");
    //$("#txtOrderDate").attr("disabled", "disabled");
    $("#txtAgentname").attr("disabled", "disabled");
    $("#txtSupervisor").attr("disabled", "disabled");
   // $("#TxtGiftCard").attr("disabled", "disabled");
    $('#txtAgentPBXID').attr("disabled", "disabled");
    $("#ddlISP").val($("#ddlISP option:first").val()).change();
    $("#ddlGiftCard").val($("#ddlGiftCard option:first").val()).change();
    $("#ddlCallsRcvd").val($("#ddlCallsRcvd option:first").val()).change();
    $("#ddlServiceStatus").val($("#ddlServiceStatus option:first").val()).change();
    $("#ddlVonagePackage").val($("#ddlVonagePackage option:first").val()).change();


}


function InitializeDisplayFields() {

    $("#txtUniqueID").val('');
    $("#txtUCID").val('');
    $("#txtCustomerName").val('');
    $("#txtBTNNo").val('');
    $("#txtCustAddress").val('');
    $("#txtCity").val('');
    $("#txtZipCode").val('');
    $("#txtState").val('');
    $("#txtCost").val('');
    $("#txtEmailAddress").val('');
    $("#txtInternetConf").val('');
    $("#txtVonageConf").val('');
    $("#TxtGiftCard").val('');
    $("#txtIntPckg").val('');
    $("#txtNotes").val('');
    $("#ddlCallsRcvd").data("kendoDropDownList").select(0);
    $("#ddlServiceStatus").data("kendoDropDownList").select(0);
    $("#ddlISP").data("kendoDropDownList").select(0);
    $("#ddlVonagePackage").data("kendoDropDownList").select(0);
    $('#ddlGiftCard').data("kendoDropDownList").select(0);
}

function changetextbox() {

    //alert($("#ddlGiftCard").val());
    var present = $('#ddlGiftCard').data("kendoDropDownList").text() == "Other" ? true : false;
    if (present) {
        $("#hide").removeClass("hide");
    } else {
        $("#TxtGiftCard").val('');
        $("#hide").addClass("hide");
    }
}

function echangetextbox() {

    //alert($("#ddlGiftCard").val());
    var present = $('#ddGiftCard').data("kendoDropDownList").text() == "Other" ? true : false;
    if (present) {
        $("#ehide").removeClass("hide");
    } else {
        $("#egc").val('');
        $("#ehide").addClass("hide");

    }
}

function getFormNumber($formNo) {
    var a = ((new Date().getFullYear().toString()).substring(2, 4));
    var b = ($formNo.substring(0, 2));
    var c = (new Date().getMonth() + 1).toString();
    var d = $formNo.substring(2, 4);
    var e = (new Date().getDate().toString());
    var f = $formNo.substring(4, 6);
    if ((new Date().getMonth() + 1) < 10) {
        c = (new Date().getMonth() + 1).toString();
        c = "0" + c;
    }

    if ((new Date().getDate()) < 10) {
        e = (new Date().getDate().toString());
        e = "0" + e;
    }

    if (a == b && c == d && e == f) {
        var cFormSerial = "";
        var nFormSerial = (parseInt($formNo.substring(7, 12))) + 1;
        if (nFormSerial > 0 && nFormSerial < 10) {
            cFormSerial = "0000" + nFormSerial;
        }
        else if (nFormSerial >= 10 && nFormSerial < 100) {
            cFormSerial = "000" + nFormSerial;
        }
        else if (nFormSerial >= 100 && nFormSerial < 1000) {
            cFormSerial = "00" + nFormSerial;
        }
        else if (nFormSerial >= 1000 && nFormSerial < 10000) {
            cFormSerial = "0" + nFormSerial;
        }
        else if (nFormSerial >= 10000) {
            cFormSerial = nFormSerial;
        }
        var cFormNo = ($formNo.substring(0, 7)) + cFormSerial;
    }
    else {
        var cMonth = c;
        var cDay = e;
        
        cFormNo = a + cMonth + cDay + "-00001";
    }
    return cFormNo;
}


function getReferenceNumber() {
    var form;
    $.ajax({
        url: '/VonageSales/GetReferenceNumber',
        method: "GET",
        //data: { user_id: user_id },
        async: false,
        cache: false,
        //dataType:"text",  
        success: function (data) {
            //alert(data);
            ReferenceNo = data;
            //DisableControls();
            form = getFormNumber(ReferenceNo);
            var d = new Date();
            date = d.toLocaleString();
            //$("#txtAgentPBXID").val(user_id);
            $("#txtRefNo").val(form);
            //$("#txtOrderDate").val(date);
            //fetch_data();  
        }
    });
    return form;

}

function Clear() {
    $('#txtCustomerName').val('');
    $("#txtEmailAddress").val('');
    $("#txtCustAddress").val('');
    $("#txtBTNNo").val('');
    $("#txtCity").val('');
    $("#txtState").val('');
    $("#txtZipCode").val('');
    $("#txtUniqueID").val('');
    $("#txtUCID").val('');
    $("#txtInternetConf").val('');
    $("#txtVonageConf").val('');
    $("#ddlCallsRcvd").data("kendoDropDownList").select(0);
    $("#ddlServiceStatus").data("kendoDropDownList").select(0);
    $("#ddlISP").data("kendoDropDownList").select(0);
    $("#ddlVonagePackage").data("kendoDropDownList").select(0);
    $("#txtIntPckg").val(''); 
    $('#ddlGiftCard').data("kendoDropDownList").select(0);
    $("#TxtGiftCard").val(''); 
    $("#txtCost").val(''); 
    $("#txtNotes").val('');
}

function ValidateFields() {
    //var funcName=$funcName;
    var lRetVal = 0;
    //var cMode=$cMode;
    //var dateEntered = document.getElementById("txtDateEntered").value; 
    // In JQuery
    //var vp = $('#ddlVonagePackage').data("kendoDropDownList").text() == "Select Vonage Package" ? true : false;
    //var cr = $('#ddlCallsRcvd').data("kendoDropDownList").text() == "Select Type of Calls Received" ? true : false;
    //var ss = $('#ddlServiceStatus').data("kendoDropDownList").text() == "Select Service Status" ? true : false;
    //var isp = $('#ddlISP').data("kendoDropDownList").text() == "Select Internet Provider" ? true : false;
    //var gc = $('#ddlGiftCard').data("kendoDropDownList").text() == "Select Gift Card" ? true : false;
    //if (vp) {
    //    new PNotify({
    //        title: 'Error!',
    //        text: 'Select Vonage Package',
    //        type: 'error'
    //    });
    //    $('#ddlVonagePackage').focus();
    //    lRetVal = 0;
    //}
    //else if (cr) {
    //    new PNotify({
    //        title: 'Error!',
    //        text: 'Select Type of Calls Received',
    //        type: 'error'
    //    });
    //    $('#ddlCallsRcvd').focus();
    //    lRetVal = 0;
    //}
    //else if (ss) {
    //    new PNotify({
    //        title: 'Error!',
    //        text: 'Select Service Status',
    //        type: 'error'
    //    });
    //    $('#ddlServiceStatus').focus();
    //    lRetVal = 0;
    //}

    //else if (isp) {
    //    new PNotify({
    //        title: 'Error!',
    //        text: 'Select Internet Provider',
    //        type: 'error'
    //    });
    //    $('#ddlISP').focus();
    //    lRetVal = 0;
    //}

    //else if (gc) {
    //    new PNotify({
    //        title: 'Error!',
    //        text: 'Select Gift Card',
    //        type: 'error'
    //    });
    //    $('#ddlGiftCard').focus();
    //    lRetVal = 0;
    //}

    //if ($("#txtBTNNo").val() == "" || $("#txtCustomerName").val() == "" || $("#txtUniqueID").val() == "" || $("#txtUCID").val() == "") {

    //    if ($("#txtUniqueID").val() == "") {
    //        //alert("Unique ID is mandatory");
    //        new PNotify({
    //            title: 'Error!',
    //            text: 'Unique ID is mandatory.',
    //            type: 'error'
    //        });
    //        $('#txtUniqueID').focus();
    //    }
    //    else if ($("#txtUCID").val() == "") {
    //        //alert("UCID is mandatory");
    //        new PNotify({
    //            title: 'Error!',
    //            text: 'UCID is mandatory.',
    //            type: 'error'
    //        });
    //        $('#txtUCID').focus();
    //    }
    //    else if ($("#txtCustomerName").val() == "") {
    //        //alert("Customer Name is mandatory");
    //        new PNotify({
    //            title: 'Error!',
    //            text: 'Customer Name is mandatory.',
    //            type: 'error'
    //        });
    //        $('#txtCustomerName').focus();
    //    }

    //    else if ($("#txtBTNNo").val() == "") {
    //        //alert("Customer BTN is mandatory");
    //        new PNotify({
    //            title: 'Error!',
    //            text: 'Customer BTN is mandatory.',
    //            type: 'error'
    //        });
    //        $('#txtBTNNo').focus();
    //    }


    //    lRetVal = 0;
    //}
    var validator = $("#VonageSalesForm").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var BTNNo = $('#txtBTNNo').val();
        BTNNo = BTNNo.replace(/[^A-Z0-9]/ig, "");
        if (BTNNo.length < 10) {
            lRetVal = 0;
            new PNotify({
                title: 'Error!',
                text: 'Enter Full Number',
                type: 'error'
            });
        }
        else { lRetVal = 1; }
    }
        if (lRetVal == 1) {
            if ($.trim("#txtCost").length == 0) {
                $("#txtCost").val("0");
            }
        }

        //if (lRetVal == 1) {
        //    if ($.trim("#txtEmailAddress").length > 0) {
        //        var sEmail = $('#txtEmailAddress').val();
        //        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        //        if (!filter.test(sEmail)) {
        //            new PNotify({
        //                title: 'Error!',
        //                text: 'Enter Valid Email Address.',
        //                type: 'error'
        //            });
        //            $('#txtEmailAddress').focus();
        //            // alert("Enter valid email address");
        //            lRetVal = 0;
        //        }
        //    }
        //}

        if (lRetVal == 1) {
            var nTotal = "";
            if ($("#txtUCID").val().length > 0) {


                var refnum = $("#txtRefNo").val();
                var Ucid = $('#txtUCID').val();
                //var InternetConf = $('#txtInternetConf').val();
                //var VonageConf = $('#txtVonageConf').val();
                $.ajax(
                {
                    url: "/VonageSales/CountUCID",
                    method: "POST",
                    async: false,
                    data: {
                        //  func: func,
                        refnum: refnum,
                        Ucid: Ucid,
                        //InternetConf: InternetConf,
                        //VonageConf: VonageConf
                    },
                    //dataType:"text",
                    success: function (data) {

                        lRetVal = callback(data, "UCID", 0);

                    }

                });



            }
        }

        if (lRetVal == 1) {
            var nTotal = "";
            if ($("#txtInternetConf").val().length > 0) {

                //var func = "CountInternetConf";
                //var Ucid=$('#txtUCID').val();
                var InternetConf = $('#txtInternetConf').val();
                var refnum = $("#txtRefNo").val();
                //var VonageConf=$('#txtVonageConf').val();
                $.ajax(
                {
                    url: "/VonageSales/CountInternetConf",
                    method: "POST",
                    async: false,
                    data: {
                        //func: func,
                        //Ucid:Ucid,
                        refnum: refnum,
                        InternetConf: InternetConf
                        //VonageConf:VonageConf
                    },
                    //dataType:"text",
                    success: function (data) {

                        lRetVal = callback(data, "Internet Configuraton", 0);

                    }

                });



            }
        }

        if (lRetVal == 1) {
            var nTotal = "";
            if ($("#txtVonageConf").val().length > 0) {

                //var func = "CountVonageConf";
                var refnum = $("#txtRefNo").val();
                //var Ucid=$('#txtUCID').val();
                //var InternetConf=$('#txtInternetConf').val();
                var VonageConf = $('#txtVonageConf').val();
                $.ajax(
                {
                    url: "/VonageSales/CountVonageConf",
                    method: "POST",
                    async: false,
                    data: {
                        //func: func,
                        refnum: refnum,
                        //Ucid:Ucid,
                        // InternetConf:InternetConf
                        VonageConf: VonageConf
                    },
                    //dataType:"text",
                    success: function (data) {

                        lRetVal = callback(data, "Vonage Configuraton", 0);

                    }

                });



            }
        }

        if (lRetVal == 1) {
            var present = $("#ddlServiceStatus").data("kendoDropDownList").text() == "Serviceable" ? true : false;
            if (present) {
                if ($("#txtInternetConf").val().length <= 0 && $("#txtVonageConf").val().length <= 0) {


                    new PNotify({
                        title: 'Error!',
                        text: 'Confirmation Number is mandatory!',
                        type: 'error'
                    });
                    $('#txtInternetConf').focus();
                    lRetVal = 0;

                }

            }


        }

    
    // alert(lRetVal);
    return lRetVal;
}

function ValidateEditFields() {
    
    var lRetVal = 0;
    var validator = $("#VonageEditForm").kendoValidator().data("kendoValidator");
    if (validator.validate()) {
        var BTNNo = $('#eBTN').val();
        BTNNo = BTNNo.replace(/[^A-Z0-9]/ig, "");
        if (BTNNo.length < 10) {
            lRetVal = 0;
            new PNotify({
                title: 'Error!',
                text: 'Enter Full Number',
                type: 'error'
            });
        }
        else { lRetVal = 1; }
    }
    if (lRetVal == 1) {
        if ($.trim("#eCost").length == 0) {
            $("#eCost").val("0");
        }
    }

    if (lRetVal == 1) {
        var nTotal = "";
        if ($("#eUcid").val().length > 0) {


            var refnum = $("#eRefNo").val();
            var Ucid = $('#eUcid').val();
            //var InternetConf = $('#txtInternetConf').val();
            //var VonageConf = $('#txtVonageConf').val();
            $.ajax(
            {
                url: "/VonageSales/CountUCID",
                method: "POST",
                async: false,
                data: {
                    //  func: func,
                    refnum: refnum,
                    Ucid: Ucid,
                    //InternetConf: InternetConf,
                    //VonageConf: VonageConf
                },
                //dataType:"text",
                success: function (data) {

                    lRetVal = callback(data, "UCID", 0);

                }

            });



        }
    }

    if (lRetVal == 1) {
        var nTotal = "";
        if ($("#eIntConf").val().length > 0) {

            //var func = "CountInternetConf";
            //var Ucid=$('#txtUCID').val();
            var InternetConf = $('#eIntConf').val();
            var refnum = $("#eRefNo").val();
            //var VonageConf=$('#txtVonageConf').val();
            $.ajax(
            {
                url: "/VonageSales/CountInternetConf",
                method: "POST",
                async: false,
                data: {
                    //func: func,
                    //Ucid:Ucid,
                    refnum: refnum,
                    InternetConf: InternetConf
                    //VonageConf:VonageConf
                },
                //dataType:"text",
                success: function (data) {

                    lRetVal = callback(data, "Internet Configuraton", 0);

                }

            });



        }
    }

    if (lRetVal == 1) {
        var nTotal = "";
        if ($("#eVonConf").val().length > 0) {

            //var func = "CountVonageConf";
            var refnum = $("#eRefNo").val();
            //var Ucid=$('#txtUCID').val();
            //var InternetConf=$('#txtInternetConf').val();
            var VonageConf = $('#eVonConf').val();
            $.ajax(
            {
                url: "/VonageSales/CountVonageConf",
                method: "POST",
                async: false,
                data: {
                    //func: func,
                    refnum: refnum,
                    //Ucid:Ucid,
                    // InternetConf:InternetConf
                    VonageConf: VonageConf
                },
                //dataType:"text",
                success: function (data) {

                    lRetVal = callback(data, "Vonage Configuraton", 0);

                }

            });



        }
    }

    if (lRetVal == 1) {
        var present = $("#ddServiceStatus").data("kendoDropDownList").text() == "Serviceable" ? true : false;
        if (present) {
            if ($("#eIntConf").val().length <= 0 && $("#eVonConf").val().length <= 0) {


                new PNotify({
                    title: 'Error!',
                    text: 'Confirmation Number is mandatory!',
                    type: 'error'
                });
                $('#txtInternetConf').focus();
                lRetVal = 0;

            }

        }


    }


    // alert(lRetVal);
    return lRetVal;
}

function Save() {
    //e.preventDefault();
    //var cMode="DATA ENTRY MODE";
    //validator = $("#VonageSalesForm").kendoValidator().data('kendoValidator');
    //validator.validate();
    var RefNo = getReferenceNumber();
    var bool = ValidateFields();
    if (bool == 1) {
        var user_id = $('#txtUserId').val();
        var role = $('#txtRole').val();
        var agentname = $('#txtAgentname').val();
        var pbxid = $('#txtAgentPBXID').val();
        //var ReferenceNumber=$('#txtRefNo').val();
        var OrderDate = $('#txtOrderDate').val();
        var AgentID = $('#txtAgentPBXID').val();
        var Supervisor = $('#txtSupervisor').val();
        var Uniqueid = $('#txtUniqueID').val();
        var Ucid = $('#txtUCID').val();
        var CustomerName = $('#txtCustomerName').val();
        var BTNNo = $('#txtBTNNo').val();
        BTNNo = BTNNo.replace(/[^A-Z0-9]/ig, "");
        var CustAddress = $('#txtCustAddress').val();
        var City = $('#txtCity').val();
        var EmailAddress = $('#txtEmailAddress').val();
        var Zipcode = $('#txtZipCode').val();
        var State = $('#txtState').val();
        var InternetPackage = $('#txtIntPckg').val();
        var TypeOfCallsReceived = $('#ddlCallsRcvd').data("kendoDropDownList").text();
        var ServiceStatus = $('#ddlServiceStatus').data("kendoDropDownList").text();
        var ISP = $('#ddlISP').data("kendoDropDownList").text();
        var Cost = $('#txtCost').val();
        var VonagePackage = $('#ddlVonagePackage').data("kendoDropDownList").text();
        var InternetConf = $('#txtInternetConf').val();
        var VonageConf = $('#txtVonageConf').val();
        var Notes = $('#txtNotes').val();
        var ddlGiftCard = $('#ddlGiftCard').data("kendoDropDownList").text();
        var present = $("#ddlGiftCard").data("kendoDropDownList").text() == "Other" ? true : false;
        var OtherGiftCard;
        var GiftCard;
        if (present) {
            GiftCard = $("#ddlGiftCard").data("kendoDropDownList").text();
            OtherGiftCard = $('#TxtGiftCard').val();
        }
        else {
            GiftCard = $('#ddlGiftCard').data("kendoDropDownList").text();
            OtherGiftCard = "";
        }

        var model = {

            "RefNo": RefNo,
            "OrderDate": OrderDate,
            "AgentID": AgentID,
            "Supervisor": Supervisor,
            "Uniqueid": Uniqueid,
            "Ucid": Ucid,
            "CustomerName": CustomerName,
            "BTNNo": BTNNo,
            "CustAddress": CustAddress,
            "City": City,
            "EmailAddress": EmailAddress,
            "Zipcode": Zipcode,
            "State": State,
            "TypeOfCallsReceived": TypeOfCallsReceived,
            "ServiceStatus": ServiceStatus,
            "ISP": ISP,
            "Cost": Cost,
            "InternetPackage": InternetPackage,
            "VonagePackage": VonagePackage,
            "InternetConf": InternetConf,
            "VonageConf": VonageConf,
            "GiftCard": GiftCard,
            "user_id": user_id,
            "role": role,
            "agentname": agentname,
            "pbxid": pbxid,
            "Notes": Notes,
            "OtherGiftCard": OtherGiftCard


        }

        $("#loader").show()
        $.ajax(
        {
            url: "/VonageSales/AddSale",
            data: JSON.stringify(model),
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            //dataType:"text",
            success: function (data) {
                //alert("data");
                //alert(data);
                $("#loader").hide();
                if (data == 1) {
                    new PNotify({
                        title: 'Success!',
                        text: 'Record has been Inserted.',
                        type: 'success'
                    });
                }
                else {
                    new PNotify({
                        title: 'Error!',
                        text: 'Record Insertion Failed.',
                        type: 'error'
                    });
                }
                getReferenceNumber();

                InitializeDisplayFields();
                DisableControls();

            }

        }
      );
    }
}


function callback($data, $func, $num) {
    var num = $num;
    var nTotal = '';
    var lRetVal;
    var data = $data;
    var func = $func;
    nTotal = data.trim();
    console.log(nTotal);
    //alert(nTotal);

    if (num == 0 && nTotal > 0) {
        new PNotify({
            title: 'Error!',
            text: func + ' Already Exists',
            type: 'error'
        });
        //alert(func+"Already Exist !");
        lRetVal = 0;
    }
    else if (num == 1 && nTotal > 0) {
        new PNotify({
            title: 'Error!',
            text: func + ' Already Exists',
            type: 'error'
        });

        //alert(func+"Already Exist !");
        lRetVal = 0;
    }

    else {
        lRetVal = 1;
    }
    return lRetVal;

}
