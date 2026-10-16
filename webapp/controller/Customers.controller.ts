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
        
    }

    public onFilterCustomers(oEvent: any): void {
        const aFilters: Filter[] = [];
        const sQuery = oEvent.getParameter("query") as string;

        if (!!sQuery)
            aFilters.push(new Filter({path: "CustomerName", operator: FilterOperator.Contains, value1: sQuery, caseSensitive: false}))

        const oTable = this.byId("customersTable") as Table;
        const oBinding = oTable.getBinding("items") as ListBinding;

        oBinding.filter(aFilters, FilterType.Application);
    }

    public onCustomerPress(oEvent: any): void {

    }
}