import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Component from "sap/ui/core/Component";

/**
 * @namespace fr.acollet.flightsdashboard.controller
 */
export default class App extends Controller {

    public onInit(): void {

        const oView = this.getView();
        const ownerComponent = Component.getOwnerComponentFor(oView);
        const i18nModel = ownerComponent?.getModel("i18n") as ResourceModel;

        if (!i18nModel)
            return;

        const bundle = i18nModel.getResourceBundle() as ResourceBundle;
        const navData = {
            items: [
                {
                    title: bundle.getText("navDashboard"),
                    icon: "sap-icon://vertical-bar-chart",
                    key: "Dashboard",
                    uri: ""
                },{
                    title: bundle.getText("navCustomers"),
                    icon: "sap-icon://customer",
                    key: "Customers",
                    uri: "customers"
                },{
                    title: bundle.getText("navBookings"),
                    icon: "sap-icon://flight",
                    key: "Bookings",
                    uri: "bookings"
                }
            ]
        };
        oView?.setModel(new JSONModel(navData), "sideNav");
    }

    public onSideNavButtonPressed(): void {
        const oView = this.getView();
        const oToolPage = oView.byId("nav")

        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
    }
}