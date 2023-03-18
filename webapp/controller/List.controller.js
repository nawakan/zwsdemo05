sap.ui.define([
    "zwsdemo05/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zwsdemo05.controller.List", {
            onInit: function () {
                // debugger;
                // this.getView().getModel();  // old
                // this.getModel();    // new(from BaseController)
            },

            onSelectionChange: function(oEvent){

                var selectedItem = oEvent.getParameters().listItem;

                var oBinding = selectedItem.getBindingContext("ordersModel"),
                sOrderId = oBinding.getProperty("OrderID");

                this.getRouter().navTo("DetailRO", {orderid:sOrderId});

            },

            onCreateNew: function(){
                this.getRouter().navTo("CreateRO");
            }

        });
    });
