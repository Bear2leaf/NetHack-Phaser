import { Scene } from "phaser";

export enum WindowTypes {
    NOOP,
    NHW_MESSAGE,	// (top line)
    NHW_STATUS,	// (top line)
    NHW_MAP,		// (main dungeon)
    NHW_MENU,	// (inventory or other "corner" windows)
    NHW_TEXT,	// (help/text, full screen paged window)
}
export enum WindowTypesName {
    NHWMessage = WindowTypes.NHW_MESSAGE,
    NHWMap = WindowTypes.NHW_MAP,
    NHWMenu = WindowTypes.NHW_MENU,
}

export interface INHWindow {
    display(blocking: boolean): void;
}

export abstract class NHWScene extends Scene implements INHWindow {
    abstract printGlyph(x: number, y:number): void;
    abstract display(blocking: boolean): void;
    abstract clear(): void;
    
}