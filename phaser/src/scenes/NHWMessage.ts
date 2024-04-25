import { NHWScene } from '../libnh/libnhTypes.ts';

export class NHWMessage extends NHWScene {
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
