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
    
                var oODataModel = this.getView().getModel("ordersModel");
    
                var oData = {
                    "OrderID": parseInt(this.byId("OrderID").getValue()),
                    "CustomerID":this.byId("CustomerID").getValue(),
                    "EmployeeID":this.byId("EmployeeID").getValue(),
                    "OrderDate":this.byId("OrderDate").getValue(),
                    "RequiredDate":this.byId("RequiredDate").getValue(),
                    "ShippedDate":this.byId("ShippedDate").getValue(),
                    "ShipVia":this.byId("ShipVia").getValue(),
                    "Freight":this.byId("Freight").getValue(),
                    "ShipName":this.byId("ShipName").getValue(),
                    "ShipAddress":this.byId("ShipAddress").getValue(),
                    "Order_Details":[]
                };
    
                var oTable = this.byId("table");
    
                var oListItems = oTable.getItems(); //  Array of sap.m.ColumnListItem
    
                oListItems.forEach( (oListItem, iIndex) => { // function(oListItem, iIndex){ }
                    
                    var oCells = oListItem.getCells();
    
                    oData.Order_Details.push({
                        "ProductID":oCells[0].getValue(),
                        "UnitPrice":oCells[1].getValue(),
                        "Quantity":oCells[2].getValue(),
                        "Discount":oCells[3].getValue()
                    });
    
                });
    
                oODataModel.create("/Orders", oData, {
                    success: oRes=>{
                        sap.m.MessageToast.show("Success");
                    },
                    error: oRes=>{
                        sap.m.MessageToast.show("Error");
                    }
                });
    
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

                    filters: new sap.ui.model.Filter({
                                filters: [
                                
                                    new sap.ui.model.Filter({
                                        path: "CustomerID",
                                        operator: sap.ui.model.FilterOperator.Contains,
                                        value1: sSearchText }),
                
                                    new sap.ui.model.Filter({
                                    path: "CompanyName",
                                    operator: sap.ui.model.FilterOperator.Contains,
                                    value1: sSearchText }) ],

                                and: false }),

                    template : new sap.m.StandardListItem({
                        title:"{ordersModel>CustomerID}",
                        description:"{ordersModel>CompanyName}"
                    })
                });       

            }

        });
    });