/*global QUnit*/
import Controller from "fr/acollet/flightsdashboard/controller/Dashboard.controller";

QUnit.module("Dashboard Controller");

QUnit.test("I should test the Dashboard controller", function (assert: Assert) {
	const oAppController = new Controller("Dashboard");
	oAppController.onInit();
	assert.ok(oAppController);
});