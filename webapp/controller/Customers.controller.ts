import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter"
import FilterOperator from "sap/ui/model/FilterOperator"
import FilterType from "sap/ui/model/FilterType"
import Table from "sap/m/Table"
import ListBinding from "sap/ui/model/ListBinding"

/**
 * @namespace fr.acollet.flightsdashboard.controller
 */
export default class Customers extends Controller {
    
    public onInit(): void {
        // Réserve ce point d'entrée aux initialisations du contrôleur.
    }

    public onFilterCustomers(oEvent: any): void {
        const aFilters: Filter[] = [];
        const sQuery = oEvent.getParameter("query") as string;

        // N'ajoute un filtre que si une recherche a été saisie.
        if (!!sQuery)
            aFilters.push(new Filter({path: "CustomerName", operator: FilterOperator.Contains, value1: sQuery, caseSensitive: false}))

        // Applique le filtre à la liste des clients sans modifier les filtres de contrôle.
        const oTable = this.byId("customersTable") as Table;
        const oBinding = oTable.getBinding("items") as ListBinding;

        oBinding.filter(aFilters, FilterType.Application);
    }

    public onCustomerPress(oEvent: any): void {
        // Point d'entrée pour le traitement de la sélection d'un client.
    }
}