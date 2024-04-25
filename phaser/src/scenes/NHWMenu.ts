
import {  NHWScene } from '../libnh/libnhTypes.ts';

export class NHWMenu extends NHWScene {
    printGlyph(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    clear(): void {
        throw new Error('Method not implemented.');
    }
    private text: Phaser.GameObjects.Text;
    private displaytext: Phaser.GameObjects.Text;
    constructor() {
        super({ key: 'NHWMenu', active: true });
    }
    display(blocking: boolean): void {
        this.displaytext.setVisible(true);
    }
    startMenu() {
        this.text.setVisible(true);
    }
    endMenu() {
        this.text.setVisible(false);
    }
    init() {
        this.text = this.add.text(0, 150, "Menu!!!", {
            color: "#fff"
        }).setVisible(false);
        this.displaytext = this.add.text(0, 200, "Display NHWMenu!!!", {
            color: "#fff"
        }).setVisible(false);
    }
    create() {

    }
    update(time: number, delta: number): void {

    }
}
