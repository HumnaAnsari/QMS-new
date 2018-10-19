
$(function () {

    function SearchViewModel() {
        var self = this;

        self.searchValue = ["Email", "Portal ID", "Corp ID"];
        self.selectedOptionValue = ko.observable("Email");
        self.searchText = ko.observable("");
        self.errorMessage = ko.observable("Please enter Text.");
        self.showError = ko.observable(false);
        self.showUserInformation = ko.observable(false);
        self.showSearchPanel = ko.observable(true);

        self.searchUser = function () {
            debugger;

            if (self.searchText().toString().trim() == "") {
                self.showError(true);
                return;
            }

            var Model =
              {
                  "selectedOption": self.selectedOptionValue(),
                  "searchText": self.searchText()
              };

            $.ajax({
                url: "/Account/GetUserInformation/",
                type: 'POST',
                data: JSON.stringify(Model),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    debugger;
                    if (result == false) {

                        self.errorMessage("No Record Found");
                        self.showError(true);
                        return;

                    }
                    else {
                        self.showSearchPanel(false);
                        self.showUserInformation(true);

                        MasterViewModel.ClientListViewModel.addClient();
                        var vm = ko.mapping.fromJS(result);
                        MasterViewModel.RegistrationViewModel.EmployeeID(vm.EmployeeID());
                        MasterViewModel.RegistrationViewModel.Name(vm.Name());
                        MasterViewModel.RegistrationViewModel.Supervisor_OID(vm.Supervisor_OID());
                        MasterViewModel.RegistrationViewModel.Supervisor_Name(vm.Supervisor_Name());
                        MasterViewModel.RegistrationViewModel.Email(vm.Email());
                        MasterViewModel.RegistrationViewModel.SupervisorEmail(vm.SupervisorEmail());
                        MasterViewModel.RegistrationViewModel.ntlogin(vm.ntlogin());

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });

        };

    }

    function RegistrationViewModel() {

        var self = this;

        self.EmployeeID = ko.observable();
        self.Name = ko.observable();
        self.Email = ko.observable();
        self.Supervisor_OID = ko.observable();
        self.Supervisor_Name = ko.observable();
        self.SupervisorEmail = ko.observable();
        self.ntlogin = ko.observable();
        self.ClientID = null;
        self.requestSubmitted = ko.observable(false);
        self.messageError = ko.observable();
        self.showError = ko.observable(false);
      
        self.submitRequest = function () {
            debugger;



            self.ClientID = MasterViewModel.ClientListViewModel.selectedClient();


            if (self.ntlogin() == "" || self.ntlogin() == null || self.ntlogin() == 'undefined') {
                $("#ntloginError").show();
                return;
            }

            var validator = $("#registrationform").kendoValidator({
                rules: {
                    required: function (input) {
                        if (input.filter("[required]").length && $.trim(input.val()) == "") {
                            //return false;
                            alert("false");
                        }
                        //return true;
                        alert("true");
                    }
                }
            }).data("kendoValidator");

        
            
                //var dataObject = ko.toJSON(this);

                //$.ajax({
                //    url: "/Account/RegiserUser/",
                //    type: 'POST',
                //    data: dataObject,
                //    contentType: 'application/json; charset=utf-8',
                //    success: function (result) {
                //        debugger;
                //        if (result == true) {
                //            MasterViewModel.SearchViewModel.showUserInformation(false);
                //            MasterViewModel.RegistrationViewModel.requestSubmitted(true);
                //            window.Location = "/Home/Submit/";
                //        }
                //        if (result == false) {

                //            MasterViewModel.RegistrationViewModel.messageError("This corp id does not exist in company active directory.");

                //            MasterViewModel.RegistrationViewModel.showError(true);

                //            //console.log(MasterViewModel.RegistrationViewModel.showError());
                //            console.log(MasterViewModel.RegistrationViewModel.messageError());

                //            return;
                //        }
                //    },
                //    error: function (jqXHR, textStatus, errorThrown) {
                //        alert(errorThrown);
                //    }
                //});
         
        }
    }

    function ClientListViewModel() {
        var self = this;

        self.selectedClient = ko.observable();
        self.Clients = ko.observableArray();
        self.addClient = function () {

            var datasource = new kendo.data.DataSource({

                transport: {
                    read: {
                        url: "/Account/GetClients",
                        dataType: "json",
                    }
                }
            });


            self.Clients(datasource);

        }

    }

   // create index view view model which contain two models for partial views
    MasterViewModel = { SearchViewModel: new SearchViewModel(), RegistrationViewModel: new RegistrationViewModel(), ClientListViewModel: new ClientListViewModel() };


    ko.applyBindings(MasterViewModel);
});


