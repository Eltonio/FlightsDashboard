import ResourceBundle from "sap/base/i18n/ResourceBundle";

export default {
    classText(sClass: string): string {

        const oResourceBundle = ResourceBundle.create({ url: "i18n/i18n.properties" }) as ResourceBundle;

        switch (sClass) {
            case "C":
                return oResourceBundle.getText("flightClassC") as string;
            case "Y":
                return oResourceBundle.getText("flightClassY") as string;
            case "F":
                return oResourceBundle.getText("flightClassF") as string;
            default:
                return sClass;
        }
    }
}