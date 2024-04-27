
import { Boot } from "../scenes/Boot.js";
import { Module as factory } from "./nethack.js";
declare const window: Window & { doGraphics: (name: string, ...args: any[]) => any }
let Module: any = undefined;
export function createNethack(scene: Boot) {
    window.doGraphics = async function doGraphics(name, ...args) {
        console.debug(`shim graphics: ${name} [${args}]`);
        return await new Promise(r => scene.events.emit(name, r, ...args));
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