import { NHCallback, NHWScene, StrAttr } from '../libnh/libnhTypes.ts';

function createCameraController(keyboard: Phaser.Input.Keyboard.KeyboardPlugin, camera: Phaser.Cameras.Scene2D.Camera) {
    camera.setBounds(0, 0, 500, 500);
    const cursors = keyboard.createCursorKeys();
    const controlConfig = {
        camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };
    return new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);;
}
export class NHWMap extends NHWScene {
    nhPosKey(resolve: NHCallback) {
        this.input.keyboard?.once("keydown", (event: any) => {
            resolve(event.key.charCodeAt(0))
        })
    }
    ynFunction(resolve: NHCallback) {
        this.input.keyboard?.once("keydown", (event: any) => {
            resolve(event.key.charCodeAt(0))
        })
    }
    putstr(attr: StrAttr, content: string): void {
        throw new Error('Method not implemented.');
    }
    private controls: Phaser.Cameras.Controls.SmoothedKeyControl;
    private text: Phaser.GameObjects.Text;
    private blitter: Phaser.GameObjects.Blitter;
    constructor() {
        super({ key: 'NHWMap', active: true });
    }
    printGlyph(x: number, y: number): void {
        const newx = x * 20;
        const newy = y * 20;
        this.blitter.create(newx, newy);
        const rect = Phaser.Geom.Rectangle.MergeXY(this.cameras.main.getBounds(), newx, newy);
        this.cameras.main.setBounds(rect.x, rect.y, rect.width, rect.height)
    }
    cliparound(x: number, y: number) {
        this.cameras.main.centerOn(x * 20, y * 20);
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

        this.blitter = this.add.blitter(0, 0, 'boat');
        this.controls = createCameraController(this.input.keyboard!, this.cameras.main)

    }
    create() {
    }
    update(time: number, delta: number): void {
        this.controls.update(delta);

    }
}
