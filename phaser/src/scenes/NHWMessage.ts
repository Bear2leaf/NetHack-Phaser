import { NHWScene, StrAttr } from '../libnh/libnhTypes.ts';

export class NHWMessage extends NHWScene {
    getmsghistory() {
        return this.text.text;
    }
    putmsghistory(msg: string, restoring: boolean) {
        this.text.setText(msg);
    }
    putstr(attr: StrAttr, content: string): void {
        throw new Error('Method not implemented.');
    }
    printGlyph(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    private text: Phaser.GameObjects.Text;
    constructor() {
        super({ key: 'NHWMessage', active: true });
    }
    clear(): void {
        this.text.setText("Cleared!");
    }
    display(blocking: boolean): void {
        this.text.setVisible(true);
    }
    init() {

        this.text = this.add.text(0, 100, "Display NHWMessage!!!", {
            color: "#fff"
        }).setVisible(false);
    }
    create() {

    }
    update(time: number, delta: number): void {

    }
}
