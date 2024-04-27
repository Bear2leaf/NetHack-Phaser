import { NHWScene, StrAttr } from '../libnh/libnhTypes.ts';

export class NHWRaw extends NHWScene {
    rawPrint(content: string) {
        this.text.setText(content);
        this.text.setVisible(true);
    }
    putstr(attr: StrAttr, content: string): void {
        throw new Error('Method not implemented.');
    }
    private text: Phaser.GameObjects.Text;
    constructor() {
        super({ key: 'Raw', active: true });
    }
    printGlyph(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    clear(): void {
        this.text.setText("");
    }
    display(blocking: boolean): void {
        this.text.setVisible(true);
    }
    init() {
        this.text = this.add.text(0, 300, "Display NHWRaw!!!", {
            color: "#fff"
        }).setVisible(false);


    }
    create() {
    }
    update(time: number, delta: number): void {

    }
}
