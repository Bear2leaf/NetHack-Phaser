import { Scene } from 'phaser';
import { createNethack } from '../libnh/index.ts';
import { INHWindow, NHCallback, NHWScene, StrAttr, WindowTypes, WindowTypesName, getNHHelpers } from '../libnh/libnhTypes.ts';
import { NHWMenu } from './NHWMenu.ts';
import { NHWMap } from './NHWMap.ts';
import { NHWMessage } from './NHWMessage.ts';
import { NHWRaw } from './NHWRAW.ts';

export class Boot extends Scene {
    constructor() {
        super({key: 'Boot', active: true});
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image("boat", "favicon.png");
    }
    init() {
        createNethack(this);
        const windows: WindowTypes[] = [];
        this.events.on("shim_start_menu", (resolve: NHCallback, index: number) => {
            this.scene.get<NHWMenu>(WindowTypesName[windows[index]]).startMenu();
            resolve(0);
        });
        this.events.on("shim_end_menu", (resolve: NHCallback, index: number) => {
            this.scene.get<NHWMenu>(WindowTypesName[windows[index]]).endMenu();
            resolve(0);
        });
        this.events.on("shim_select_menu", (resolve: NHCallback, index: number) => {
            this.scene.get<NHWMenu>(WindowTypesName[windows[index]]).endMenu();
            resolve(-1);
        });
        this.events.on("shim_display_nhwindow", (resolve: NHCallback, index: number, blocking: boolean) => {
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).display(blocking);
            resolve(0);
        });
        this.events.on("shim_clear_nhwindow", (resolve: NHCallback, index: number) => {
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).clear();
            resolve(0);
        });
        this.events.on("shim_cliparound", (resolve: NHCallback, x: number, y: number) => {
            this.scene.get<NHWMap>(WindowTypesName[WindowTypes.NHW_MAP]).cliparound(x, y);
            resolve(0);
        });
        this.events.on("shim_nh_poskey", (resolve: NHCallback, xPtr: number, yPtr: number) => {
            this.scene.get<NHWMap>(WindowTypesName[WindowTypes.NHW_MAP]).nhPosKey(resolve);
        });
        this.events.on("shim_print_glyph", (resolve: NHCallback, index: number, coordxyx: number, coordxyy: number, glyphPtr: number, bgglyphPtr: number,) => {
            // dont know why coordxyx,coordxyy are all same, which is one i32 combined by 2 i16.
            // console.log(x & 0xffff, y >> 16);
            const y = coordxyx & 0xffff;
            const x = coordxyy >> 16;
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).printGlyph(x, y);
            resolve(0);
        });

        this.events.on("shim_putmsghistory", (resolve: NHCallback, msg: string, restoring: boolean) => {
            this.scene.get<NHWMessage>(WindowTypesName[WindowTypes.NHW_MESSAGE]).putmsghistory(msg, restoring);
            resolve(0);
        });
        let getted = false;
        this.events.on("shim_getmsghistory", (resolve: NHCallback, ptr: number, msgPtr: number) => {
            if (!getted) {
                const msg = this.scene.get<NHWMessage>(WindowTypesName[WindowTypes.NHW_MESSAGE]).getmsghistory();
                getted = true;
                getNHHelpers().setPointerValue("", msgPtr, "s", msg);
                resolve(0);
            } else {
                getNHHelpers().setPointerValue("", msgPtr, "s", "");
                resolve(0)
            }
        });
        this.events.on("shim_putstr", (resolve: NHCallback, index: number, attr: StrAttr, content: string) => {
            this.scene.get<NHWScene>(WindowTypesName[windows[index]]).putstr(attr, content);
            resolve(0);
        });
        this.events.on("shim_raw_print", (resolve: NHCallback, content: string) => {
            this.scene.get<NHWRaw>(WindowTypesName[WindowTypesName.Raw]).rawPrint(content);
            resolve(0);
        });
        this.events.on("shim_mark_synch", (resolve: NHCallback) => {
            resolve(0);
        });
        this.events.on("shim_get_nh_event", (resolve: NHCallback) => {
            resolve(0);
        });
        this.events.on("shim_add_menu", (resolve: NHCallback) => {
            resolve(0);
        });
        this.events.on("shim_message_menu", (resolve: NHCallback) => {
            resolve(121);
        });
        this.events.on("shim_yn_function", (resolve: NHCallback) => {
            this.scene.get<NHWMap>(WindowTypesName[WindowTypes.NHW_MAP]).ynFunction(resolve);
        });
        this.events.on("shim_player_selection", (resolve: NHCallback) => {
            resolve(0);
        });
        this.events.on("shim_status_init", (resolve: NHCallback) => {
            resolve(0)
        })
        this.events.on("shim_curs", (resolve: NHCallback) => {
            resolve(0)
        })
        this.events.on("shim_status_update", (resolve: NHCallback) => {
            resolve(0)
        })
        this.events.on("shim_init_nhwindows", (resolve: NHCallback) => {
            resolve(0)
        })
        this.events.on("shim_create_nhwindow", (resolve: NHCallback, type: WindowTypes) => {
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
                case WindowTypes.NHW_STATUS:
                default:
                    throw new Error("unknown windows type");
            }
            windows.push(type);
            resolve(windows.length - 1);
        })
        this.events.on("shim_destroy_nhwindow", (resolve: NHCallback, index: number) => {
            windows.splice(index, 1);
            resolve(0);
        })
    }

    create() {
        this.scene.start(WindowTypesName[WindowTypesName.Raw]);
    }
    update(time: number, delta: number): void {
        
    }
}
