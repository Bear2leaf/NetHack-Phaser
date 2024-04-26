import { Scene } from 'phaser';
import { createNethack } from '../libnh/index.ts';
import { INHWindow, NHWScene, WindowTypes, WindowTypesName } from '../libnh/libnhTypes.ts';
import { NHWMenu } from './NHWMenu.ts';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image("boat", "favicon.png");
    }
    init() {
        createNethack(this);
        const windows: WindowTypes[] = [];
        this.events.on("shim_start_menu", (index: number) => {
            this.scene.get<NHWMenu>(WindowTypesName[windows[index]]).startMenu();
        });
        this.events.on("shim_end_menu", (index: number) => {
            this.scene.get<NHWMenu>(WindowTypesName[windows[index]]).endMenu();
        });
        this.events.on("shim_display_nhwindow", (index: number, blocking: boolean) => {
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).display(blocking);
        });
        this.events.on("shim_clear_nhwindow", (index: number) => {
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).clear();
        });
        this.events.on("shim_print_glyph", (index: number, coordxyx: number, coordxyy: number, glyphPtr: number, bgglyphPtr: number,) => {
            // dont know why coordxyx,coordxyy are all same, which is one i32 combined by 2 i16.
            // console.log(x & 0xffff, y >> 16);
            const y = coordxyx & 0xffff;
            const x = coordxyy >> 16;
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).printGlyph(x, y);
        });
        this.events.on("shim_create_nhwindow", (type: WindowTypes) => {
            switch (type) {
                case WindowTypes.NHW_MESSAGE:
                    this.scene.start(WindowTypesName[type])
                    break;
                case WindowTypes.NHW_MAP:
                    this.scene.start(WindowTypesName[type])
                    break;
                case WindowTypes.NHW_MENU:
                    this.scene.start(WindowTypesName[type])
                    break;
                case WindowTypes.NHW_TEXT:
                case WindowTypes.NOOP:
                case WindowTypes.NHW_STATUS:
                default:
                    throw new Error("unknown windows type");
            }
            windows.push(type);
        })
        this.events.on("shim_destory_nhwindow", (index: number) => {
            windows.splice(index, 1);
        })
    }

    create() {
    }
}
