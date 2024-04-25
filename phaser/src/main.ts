import { Boot } from './scenes/Boot';
import { NHWMap } from './scenes/NHWMap.ts';
import { NHWMenu } from './scenes/NHWMenu.ts';
import { NHWMessage } from './scenes/NHWMessage.ts';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#00000000',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        NHWMessage,
        NHWMap,
        NHWMenu
    ]
};

export default new Game(config);
