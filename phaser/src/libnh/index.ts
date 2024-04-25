
import { Boot } from "../scenes/Boot.js";
import { Module as factory } from "./nethack.js";
declare const window: Window & { doGraphics: (name: string, ...args: any[]) => any }
let getted = true;
let Module: any = undefined;
export function createNethack(scene: Boot) {
    let winCount = 0;
    window.doGraphics = async function doGraphics(name, ...args) {
        console.debug(`shim graphics: ${name} [${args}]`);
        scene.events.emit(name, ...args);
        switch (name) {
            case "shim_create_nhwindow":
                const win = winCount++;
                console.debug("creating window", args, "returning", win);
                return win;
            case "shim_yn_function":
            case "shim_select_menu":
            case "shim_message_menu":
                return 121; // return 'y' to all questions
            case "shim_nhgetch":
            case "shim_nh_poskey":
                return 0; // simulates a mouse click on "exit up the stairs"
            case "shim_getmsghistory":
                if (getted) {
                    getted = false;
                    return "noop";
                }
                return ""; // here return empty str to end input
            default:
                return 0;
        }
    }
    factory({
        onRuntimeInitialized: function () {
            Module = this;
            // after the WASM is loaded, add the shim graphics callback function
            this.ccall(
                "shim_graphics_set_callback", // C function name
                null, // return type
                ["string"], // arg types
                ["doGraphics"], // arg values
                { async: true }
            );
        }
    });
}