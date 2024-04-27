import { Scene } from "phaser";

export enum WindowTypes {
    NOOP,
    NHW_MESSAGE,	// (top line)
    NHW_STATUS,	// (top line)
    NHW_MAP,		// (main dungeon)
    NHW_MENU,	// (inventory or other "corner" windows)
    NHW_TEXT,	// (help/text, full screen paged window)
}
export enum StrAttr {
    ATR_NONE,
    ATR_BOLD,
    ATR_DIM,
    ATR_ITALIC,
    ATR_ULINE,
    ATR_BLINK,
    ATR_INVERSE,
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
    abstract putstr(attr: StrAttr, content: string): void;
    abstract printGlyph(x: number, y: number): void;
    abstract display(blocking: boolean): void;
    abstract clear(): void;

}

export type NHCallback = (r: string | number) => void;

declare const nethackGlobal: {
    helpers: {
        getPointerValue: (name: string, ptr: number, type: string) => number,
        setPointerValue: (name: string, ptr: number, type: string, value: string | number) => number,
    }
};
export function getNHHelpers() {
    return nethackGlobal.helpers;
}