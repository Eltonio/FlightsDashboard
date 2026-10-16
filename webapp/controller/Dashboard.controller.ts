import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Component from "sap/ui/core/Component";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

import Parameters from "sap/ui/core/theming/Parameters";
import "sap/viz/ui5/controls/VizFrame";

/**
 * @namespace fr.acollet.flightsdashboard.controller
 */
export default class Dashboard extends Controller {

    public onInit(): void {
        const forceThemeLoad = Parameters.get();
        
        const oView = this.getView();
        const ownerComponent = Component.getOwnerComponentFor(oView);
        
        if (!ownerComponent) {
            return;
        }

        const i18nModel = ownerComponent.getModel("i18n") as ResourceModel;
        const oODataModel = ownerComponent.getModel() as ODataModel; 

        if (!i18nModel) {
            return;
        }

        const bundle = i18nModel.getResourceBundle() as ResourceBundle;
        const oViewModel = new JSONModel({
            tiles: [
                {
                    title: bundle.getText("navCustomers"),
                    subtitle: bundle.getText("customerSubHeader"),
                    icon: 'sap-icon://customer',
                    value: 0
                },
                {
                    title: bundle.getText("navBookings"),
                    subtitle: bundle.getText("bookingSubHeader"),
                    icon: 'sap-icon://flight',
                    value: 0
                }
            ]
        });
        oView?.setModel(oViewModel, "view");


        if (oODataModel) {
            oODataModel.bindProperty("/UX_Customer/$count").requestValue().then((iCount: number) => {
                oViewModel.setProperty("/tiles/0/value", iCount);
            });

            oODataModel.bindProperty("/UX_Booking/$count").requestValue().then((iCount: number) => {
                oViewModel.setProperty("/tiles/1/value", iCount);
            });
        }
    }
}