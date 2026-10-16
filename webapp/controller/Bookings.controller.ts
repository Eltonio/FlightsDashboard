import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel"
import Filter from "sap/ui/model/Filter"
import FilterOperator from "sap/ui/model/FilterOperator"
import FilterType from "sap/ui/model/FilterType"
import Component from "sap/ui/core/Component";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace fr.acollet.flightsdashboard.controller
 */
export default class Bookings extends Controller {

    /** Initialise le contrôleur de la page des réservations. */
    public onInit(): void {
        const oView = this.getView();
        const ownerComponent = Component.getOwnerComponentFor(oView);
        const i18nModel = ownerComponent?.getModel("i18n") as ResourceModel;

        if (!i18nModel)
            return;

        const bundle = i18nModel.getResourceBundle() as ResourceBundle;
        const oViewModel = {
            classes: [
                {
                    title: bundle.getText("all"),
                    key: "all",
                },{
                    title: bundle.getText("flightClassC"),
                    key: "C",
                },{
                    title: bundle.getText("flightClassY"),
                    key: "Y",
                },{
                    title: bundle.getText("flightClassF"),
                    key: "F",
                }
            ],
            status: [
                {
                    title: bundle.getText("all"),
                    key: "all",
                },{
                    title: bundle.getText("notCancelledTooltip"),
                    key: "active",
                },{
                    title: bundle.getText("cancelledTooltip"),
                    key: "cancelled",
                }
            ]
        };
        oView?.setModel(new JSONModel(oViewModel), "view");
    }

    /** Gère la sélection d'un client. */
    public onCustomerPress(): void {

    }

    /** Met à jour le nombre de réservations affiché dans le modèle de vue. */
    public onTableUpdateFinished(oEvent: any): void {
        const iTotalItems = oEvent.getParameter("total") as number;
        let oViewModel = this.getView()?.getModel("view") as JSONModel;

        if (!oViewModel) {
            oViewModel = new JSONModel({ count: 0 });
            this.getView()?.setModel(oViewModel, "view");
        }

        oViewModel.setProperty("/count", iTotalItems);
    }

    /** Applique les filtres sélectionnés à la liste des réservations. */
    public onSearchBookings(): void {
        const aFilters: Filter[] = [];

        // 1. Filtre Airline
        const oAirlineCombo = this.byId("filterAirline") as ComboBox;
        const sAirline = oAirlineCombo.getSelectedKey();
        if (sAirline)
            aFilters.push(new Filter("AirlineID", FilterOperator.Contains, sAirline));

        // 2. Filtre Class
        const oClassSelect = this.byId("filterClass") as Select;
        const sClass = oClassSelect.getSelectedKey();
        if (sClass !== "all")
            aFilters.push(new Filter("Class", FilterOperator.EQ, sClass));    

        // 3. Filtre Status 
        const oStatusBtn = this.byId("filterStatus") as SegmentedButton;
        const sStatus = oStatusBtn.getSelectedKey();
        if (sStatus === "active")
            aFilters.push(new Filter("IsCancelled", FilterOperator.EQ, ""));
        else if (sStatus === "cancelled")
            aFilters.push(new Filter("IsCancelled", FilterOperator.EQ, "X"));    

        const oTable = this.byId("bookingsTable") as Table;
        const oBinding = oTable.getBinding("items") as ListBinding;

        oBinding.filter(aFilters, FilterType.Application);
    }

    /** Réinitialise les filtres et affiche à nouveau toutes les réservations. */
    public onResetFilters(): void {
        (this.byId("filterAirline") as ComboBox).setValue("");
        (this.byId("filterClass") as Select).setSelectedKey("all");
        (this.byId("filterStatus") as SegmentedButton).setSelectedKey("all");
        (this.byId("filterDate") as DateRangeSelection).setValue("");

        this.onSearchBookings();
    }
}