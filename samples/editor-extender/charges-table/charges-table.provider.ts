import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header

/**
 * A custom toolbar provider implementation for counting the words in the html editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools 
 */
@Injectable()
class ChargesTableProvider implements EditorConfigProvider {

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const ChargesTable = () => {
            const editor = editorHost.getKendoEditor();
            let fareTable;
            let distanceTable;
            let fare = prompt("Enter the Fare");
            if(fare != ""){
                fareTable = `<div id="price-table-div">Starting fare 
                <span id="fare-div">${fare}</span>
                </div>`;
            }
            else{
                fareTable = "";
            }

            let distance = prompt("Enter the distance");
            if(distance != ""){
                distanceTable = `<div id="price-table-div">Fare each kilometre
                <span id="fare-div">${distance}</span>
                </div>`;
            }
            else{
                distanceTable = "";
            }
            const editorValue = ` 
            </br> 
            <div id="price-table-wrapper">
    <p id="price-table-head">charges</p>
       <div id="price-table">
        ${fareTable}
        ${distanceTable}
    </div>
    </div></br>
            `;
            editor.paste(editorValue);
            editor.trigger("change");
        };


        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "charges-table",
            tooltip: "Charges Table",
            ordinal: 11,
            exec: ChargesTable
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        return [];
    }

    configureEditor(configuration: any) {
        configuration.pasteCleanup.span = false;
        return configuration;
    }

}

export const CHARGES_TABLE_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: ChargesTableProvider
};
