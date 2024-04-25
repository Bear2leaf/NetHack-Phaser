import { NHWScene } from '../libnh/libnhTypes.ts';

export class NHWMap extends NHWScene {
    private text: Phaser.GameObjects.Text;
    private blitter: Phaser.GameObjects.Blitter;
    constructor() {
        super({ key: 'NHWMap', active: true });
    }
    printGlyph(x: number, y: number): void {
        this.blitter.create(x * 20, y * 20);
    }
    clear(): void {
        this.text.setText("Cleared!")
    }
    display(blocking: boolean): void {
        this.text.setVisible(true);
    }
    init() {
        this.text = this.add.text(0, 50, "Display NHWMap!!!", {
            color: "#fff"
        }).setVisible(false);

        this.blitter = this.add.blitter(100, 0, 'boat');
    }
    create() {
    }
    update(time: number, delta: number): void {

    }
}
