const cp = require('child_process');
const path = require('path');
const player = require('play-sound')();
const _isWindows = process.platform === 'win32';
const _playerWindowsPath = path.join(__dirname, '..', 'audio', 'ffplay.exe');
import { spawn } from 'child_process';
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ':', ';', '>']
console.log("helo");
export interface PlayerConfig {
    /**
     * Specify volume of the sounds
     */
    macVol: number;
    winVol: number;
    linuxVol: number;
}


export default {
    play(fileName: string, config: PlayerConfig) : Promise<void> {
        const filePath = path.join(__dirname, '..', 'audio', fileName);
        console.log(filePath);
        return new Promise ((resolve, reject) => {
            if (_isWindows) {
                try {
                    console.log("Bimbows");
                    var pitchFactor = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

                    if (fileName.includes('sfx')) {
                        pitchFactor = 0;
                        console.log("I DID IT DAD!!")
                    }
                    const ffmpeg = spawn(_playerWindowsPath, [
                        '-i', filePath,
                        '-nodisp',
                        '-autoexit',
                        '-af', 'asetrate=44100*2^(' + pitchFactor + '/12),atempo=1/2^(' + pitchFactor + '/12)'
                    ]);
                    ffmpeg.on('close', (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`FFmpeg process exited with code ${code}`));
                        }
                    })
                } catch (error) {
                    console.log('Error playing sound:', error);
                }    
            } else {
                try {
                    console.log("I'm not a bimbows machine");
                    var pitchFactor = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

                    if (fileName.includes('sfx')) {
                        pitchFactor = 0;
                        console.log("I DID IT DAD!!");
                    }
                    const command = "ffmpeg ffmplay -i " + filePath + "-nodisp -autoexit -af asetrate=44100*2^(" + pitchFactor + "/12),atempo=1/2^(" + pitchFactor + "/12)";
                    const ffmpeg = spawn(command);
                    console.log(ffmpeg);
                    ffmpeg.on('close', (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`FFmpeg process exited with code ${code}`));
                        }
                    })
                } catch {
                    console.log("I died, dad.");
                }
            }
        })}};
