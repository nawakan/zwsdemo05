sap.ui.define([
    "zwsdemo05/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zwsdemo05.controller.Create", {
            onInit: function () {

            },
            onAddItem: function(){
                var oTable = this.byId("table");
                oTable.addItem(new sap.m.ColumnListItem({cells: [	new sap.m.Input(), 
                                                                    new sap.m.Input(), 
                                                                    new sap.m.Input(), 
                                                                    new sap.m.Input()
                                                                ]
                                                        }));
            },
    
            onToggleDelete: function(oEvent){
    
                var oTable = this.byId("table"),
                oButton = oEvent.getSource();
    
                if(oTable.getMode()===sap.m.ListMode.None){ 
                    oTable.setMode(sap.m.ListMode.Delete);
                    oButton.setText("Disable Delete Mode"); 
                }
                else{
                    oTable.setMode(sap.m.ListMode.None);
                    oButton.setText("Enable Delete Mode"); 
                }
    
            },
    
            onDelete: function(oE){
                var oTable = this.byId("table");
                oTable.removeItem(oE.getParameters().listItem);
            },
    
            onSave: function(){
    
                // var oODataModel = this.getView().getModel();
    
                // var oData = {
                //     "CompanyCode":"1000",
                //     "PurchasingDocumentType":"NB",
                //     "VendorAccountNumber":"1001174",
                //     "PurchasingOrganization":"1000",
                //     "PurchasingGroup":"104",
                //     "PODate":new Date(),
                //     "CurrencyKey":"THB",
                //     "PoItemNav":[]
                // };
    
                // var oTable = this.byId("table");
    
                // var oListItems = oTable.getItems(); //  Array
    
                // oListItems.forEach( (oListItem, iIndex) => {
                    
                //     var oCells = oListItem.getCells();
    
                //     oData.PoItemNav.push({
                //         "ItemNumber":oCells[0].getValue(),
                //         "MaterialNumber":oCells[1].getValue(),
                //         "Plant":oCells[3].getValue(),
                //         "PurchaseOrderQuantity":oCells[4].getValue(),
                //         "PurchaseOrderUnit":oCells[5].getValue(),
                //         "NetPrice":oCells[6].getValue()
                //     });
    
                // });
    
                // oODataModel.create("/PoHeadSet", oData, {
                //     success: function(oRes){
                //         if(oRes.PurchasingDocumentNumber!=""){
                //             sap.m.MessageToast.show("Po No. "+ oRes.PurchasingDocumentNumber +"has been created.");
                //         }
                //         else{
                //             sap.m.MessageToast.show("Po cannot be created.");
                //         }
                //     },
                //     error: oRes=>{
                //         sap.m.MessageToast.show("OData cannot be called.");
                //     }
                // });
    
            },

            onCustomerValueHelp: function(){

                if (!this._CustomerValueHelpDial) {

                    var oCustomerValueHelpFrag = this.loadFragment({
                        name: "zwsdemo05.fragment.CustomerValueHelp" 
                    });

                    oCustomerValueHelpFrag.then(function(oDialog) { // return first control
                        this._CustomerValueHelpDial = oDialog;
                        this._CustomerValueHelpDial.open();
                    }.bind(this));

                } 
                else this._CustomerValueHelpDial.open();

            },

            onCloseCustomerVH: function(){
                this._CustomerValueHelpDial.close();
            },

            onLiveChange: function(oEvent){

                var oSearchInput = oEvent.getSource(),
                sSearchText = oSearchInput.getValue();

                var oSearchList = this.byId("customerList");

                oSearchList.bindItems({
                    path : "ordersModel>/Customers",
                    filters: [ new sap.ui.model.Filter({
                        path: "CustomerID",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: sSearchText
                    }) ],
                    template : new sap.m.StandardListItem({
                        title:"{ordersModel>CustomerID}",
                        description:"{ordersModel>CompanyName}"
                    })
                });       

            }

        });
    });