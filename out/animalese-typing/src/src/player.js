"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require('child_process');
const path = require('path');
const player = require('play-sound')();
const _isWindows = process.platform === 'win32';
const _playerWindowsPath = path.join(__dirname, '..', 'audio', 'ffplay.exe');
const child_process_1 = require("child_process");
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ':', ';', '>'];
console.log("helo");
exports.default = {
    play(fileName, config) {
        const filePath = path.join(__dirname, '..', 'audio', fileName);
        console.log(filePath);
        return new Promise((resolve, reject) => {
            if (_isWindows) {
                try {
                    var pitchFactor = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                    if (fileName.includes('sfx')) {
                        pitchFactor = 0;
                        console.log("I DID IT DAD!!");
                    }
                    const ffmpeg = (0, child_process_1.spawn)(_playerWindowsPath, [
                        '-i', filePath,
                        '-nodisp',
                        '-autoexit',
                        '-af', 'asetrate=44100*2^(' + pitchFactor + '/12),atempo=1/2^(' + pitchFactor + '/12)'
                    ]);
                    ffmpeg.on('close', (code) => {
                        if (code === 0) {
                            resolve();
                        }
                        else {
                            reject(new Error(`FFmpeg process exited with code ${code}`));
                        }
                    });
                }
                catch (error) {
                    console.log('Error playing sound:', error);
                }
            }
        });
    }
};
//# sourceMappingURL=player.js.map