sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("zwsdemo05.controller.BaseController", {
            
            getModel: function(sName){
                return this.getView().getModel(sName);
            },

            setModel: function(oModel, sName){
                return this.getView().setModel(oModel, sName);
            },

            getRouter: function(){
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            onNavBack: function(){

                var oHistory, sPreviousHash;
    
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("ListRO", {}, true /*no history*/);
                }

            }

        });
    });
