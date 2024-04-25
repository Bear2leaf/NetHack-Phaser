import { Scene, GameObjects } from 'phaser';
import { Module as factory } from "../libnh/nethack.js";
let getted = true;
let Module: any = undefined;
function createNethack() {

    let winCount = 0;
    window.doGraphics = async function doGraphics(name, ...args) {
        console.log(`shim graphics: ${name} [${args}]`);
        // await new Promise(resolve => setTimeout(() => {
        //     resolve(void (0))
        // }, 50))
        switch (name) {
            case "shim_create_nhwindow":
                winCount++;
                console.log("creating window", args, "returning", winCount);
                return winCount;
            case "shim_yn_function":
            case "shim_message_menu":
                return 121; // return 'y' to all questions
            case "shim_nhgetch":
            case "shim_nh_poskey":
                return 0; // simulates a mouse click on "exit up the stairs"
            case "shim_getmsghistory":
                if (getted) {
                    getted = false;
                    return "asdfafdasdf";
                }
                return ""; // here should only return empty str, wasm not support return char* string;
            default:
                return 0;
        }
    }
    factory({
        print: function (text: string) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
            console.warn(text);
        },
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
declare const window: Window & { doGraphics: (name: string, ...args: any[]) => any }
createNethack();
export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
