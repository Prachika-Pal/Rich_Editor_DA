import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./price-symbol.provider.css");

/**
 * A custom toolbar provider implementation for counting the words in the html editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools 
 */
@Injectable()
class PriceSymbolProvider implements EditorConfigProvider {
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        const priceSymbol = () => {
            const editor = editorHost.getKendoEditor();
            let phoneTable;
            let webTable;
            let phone = prompt("Enter the Phone Number");
            console.log("Phone",phone);
            if(phone != ""){
                phoneTable = `<div id="price-table-div"><em id="price-table-img"><img src="/images/passengerslibraries/icons/phone-call.svg?sfvrsn=335e5339_5" height="24" width="24" alt="Phone call" sfref="[images%7Cpassengerslibraries]f20119a4-9c5f-4a5b-91f8-5d2e5d30a6c6" data-sf-ec-immutable="" /></em>
            <a data-sf-ec-immutable="" href="tel:${phone}" id="price-table-text">${phone}</a>
        </div>`;
            }
            else{
                phoneTable = "";
            }

            let web = prompt("Enter the Website");
            if(web != ""){
                webTable = ` <div id="price-table-div"><em id="price-table-img"><img src="/images/passengerslibraries/icons/globe.svg?sfvrsn=efee00f3_5" height="24" width="24" alt="Taxi" sfref="[images%7Cpassengerslibraries]375d4161-eeb3-41f4-a94e-366f2a3a3166" data-sf-ec-immutable="" /></em>
            <a href=${web} target="_blank" data-sf-ec-immutable="" id="price-table-text">${web}</a>
        </div>`;
            }
            else{
                webTable = "";
            }
            const editorValue = `
            </br> 
            <div id="price-table-wrapper">
    <p id="price-table-head">Dubai Taxi Corporation</p>
       <div id="price-table">
        ${phoneTable}
        ${webTable}
    </div>
    </div></br>
            `;
            editor.paste(editorValue);
            editor.trigger("change");
        };

        /**
         * A custom toolbar item
         */
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "price-symbol",
            tooltip: "Contact Table",
            ordinal: 10,
            exec: priceSymbol
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        /**
         * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
         * Otherwise return an empty array.
         * Example: return [ "embed" ];
         * The above code will remove the embed toolbar item from the editor.
         * Documentation where you can find all tools' names: https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools
         */
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration overview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     */
    configureEditor(configuration: any) {
        configuration.pasteCleanup.span = false;
        return configuration;
    }

    private insertHTML(): string {
        const tmp = document.createElement("DIV");
        const firstDiv = `
        <div class = "grid md:grid-cols-2 gap-24">
        <div class="flex items-center gap-16"><em class="inline-flex items-center justify-center size-40  bg-neutrals-neutral1 rounded-md"><img src="" height="24" width="24" alt="Phone call"/></em>
            <a data-sf-ec-immutable="" href="tel:+971 800 88088" class="font-medium">+971 800 88088</a>
        </div>
        <div class="flex items-center gap-16"><em class="inline-flex items-center justify-center size-40  bg-neutrals-neutral1 rounded-md"><img src="" height="24" width="24" alt="Taxi" /></em>
            <a href="" target="_blank" data-sf-ec-immutable="" class="font-medium">dubaitaxi.ae</a>
        </div>
        </div>
        `;
 
        tmp.innerHTML = firstDiv;
        return tmp.innerHTML;
    }

}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const PRICE_SYMBOL_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: PriceSymbolProvider
};
