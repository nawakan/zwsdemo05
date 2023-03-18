sap.ui.define([
    "zwsdemo05/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zwsdemo05.controller.Detail", {

            onInit: function () {
                this.getRouter().getRoute("DetailRO")
                .attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function(oEvent){
                var sOrderId = oEvent.getParameters().arguments.orderid,
                oForm = this.byId("myform");

                oForm.bindElement({ path: "ordersModel>/Orders("+sOrderId+")",
                                    events: {
                                                change:function(oEvent){
                                                    if(!oEvent.getSource().getBoundContext()){
                                                        this.getRouter().getTargets().display("NotFoundTG");
                                                    }
                                                }.bind(this)
                                            }
                                });

                var oTable = this.byId("table");
                oTable.bindItems({
                    path : "ordersModel>/Order_Details",
                    filters: [ new sap.ui.model.Filter({
                        path: "OrderID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: sOrderId
                    }) ],
                    template : new sap.m.ColumnListItem({cells: [	new sap.m.Text({	
                                                                        text:"{ordersModel>ProductID}" }), 
                                                                    new sap.m.Text({	
                                                                            text:"{ordersModel>UnitPrice}" }), 
                                                                    new sap.m.ObjectNumber({	
                                                                        number:"{ordersModel>Quantity}" }), 
                                                                    new sap.m.ObjectNumber({	
                                                                        number:"{ordersModel>Discount}" })
                                                                ]
                                                        })
                });             

            }

        });
    });
