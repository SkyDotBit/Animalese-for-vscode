// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorListener = void 0;
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
const player_1 = require("./player");
const debounce = require("lodash.debounce");
let listener;
let isActive;
let isNotArrowKey;
let config = {
    macVol: 1,
    winVol: 100,
    linuxVol: 100
};
function activate(context) {
    console.log('Initializing Animalese Typing extension');
    // is the extension activated? yes by default.
    isActive = context.globalState.get('typing_sounds', true);
    config.macVol = context.globalState.get('mac_volume', 1);
    config.winVol = context.globalState.get('win_volume', 100);
    config.linuxVol = context.globalState.get('linux_volume', 1);
    // to avoid multiple different instances
    listener = listener || new EditorListener(player_1.default);
    vscode.commands.registerCommand('typing_sounds.enable', () => {
        if (!isActive) {
            context.globalState.update('typing_sounds', true);
            isActive = true;
            vscode.window.showInformationMessage('Animalese Typing sounds extension enabled');
        }
        else {
            vscode.window.showWarningMessage('Animalese Typing sounds extension is already enabled');
        }
    });
    vscode.commands.registerCommand('typing_sounds.disable', () => {
        if (isActive) {
            context.globalState.update('typing_sounds', false);
            isActive = false;
            vscode.window.showInformationMessage('Animalese Typing sounds extension disabled');
        }
        else {
            vscode.window.showWarningMessage('Animalese Typing sounds extension is already disabled');
        }
    });
    vscode.commands.registerCommand('typing_sounds.volumeUp', () => {
        let newVol = null;
        switch (process.platform) {
            case 'darwin':
                config.macVol += 1;
                if (config.macVol > 10) {
                    vscode.window.showWarningMessage('Animalese Typing sounds already at maximum volume');
                    config.macVol = 10;
                }
                newVol = config.macVol;
                context.globalState.update('mac_volume', newVol);
                break;
            case 'win32':
                config.winVol += 10;
                if (config.winVol > 100) {
                    vscode.window.showWarningMessage('Animalese Typing sounds already at maximum volume');
                    config.winVol = 100;
                }
                newVol = config.winVol;
                context.globalState.update('win_volume', newVol);
                break;
            case 'linux':
                config.linuxVol += 1;
                if (config.linuxVol > 10) {
                    vscode.window.showWarningMessage('Animalese Typing sounds already at maximum volume');
                    config.linuxVol = 10;
                }
                newVol = config.linuxVol;
                context.globalState.update('linux_volume', newVol);
                break;
            default:
                newVol = 0;
                break;
        }
        vscode.window.showInformationMessage('Animalese Typing sounds volume raised: ' + newVol);
    });
    vscode.commands.registerCommand('typing_sounds.volumeDown', () => {
        let newVol = null;
        switch (process.platform) {
            case 'darwin':
                config.macVol -= 1;
                if (config.macVol < 1) {
                    vscode.window.showWarningMessage('Animalese Typing sounds already at minimum volume');
                    config.macVol = 1;
                }
                newVol = config.macVol;
                context.globalState.update('mac_volume', newVol);
                break;
            case 'win32':
                config.winVol -= 10;
                if (config.winVol < 10) {
                    vscode.window.showWarningMessage('Animalese Typing sounds already at minimum volume');
                    config.winVol = 10;
                }
                newVol = config.winVol;
                context.globalState.update('win_volume', newVol);
                break;
            case 'linux':
                config.linuxVol -= 1;
                if (config.linuxVol < 1) {
                    vscode.window.showWarningMessage('Animalese Typing sounds already at minimum volume');
                    config.linuxVol = 1;
                }
                newVol = config.linuxVol;
                context.globalState.update('linux_volume', newVol);
                break;
            default:
                newVol = 0;
                break;
        }
        vscode.window.showInformationMessage('Animalese Typing sounds volume lowered: ' + newVol);
    });
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(listener);
}
// this method is called when your extension is deactivated
function deactivate() { }
/**
 * Listen to editor changes and play a sound when a key is pressed.
 */
class EditorListener {
    constructor(player) {
        this.player = player;
        this._subscriptions = [];
        this._basePath = path.join(__dirname, '..');
        this._a = 'animalese/female/voice_1/a.mp3';
        this._b = 'animalese/female/voice_1/b.mp3';
        this._c = 'animalese/female/voice_1/c.mp3';
        this._d = 'animalese/female/voice_1/d.mp3';
        this._e = 'animalese/female/voice_1/e.mp3';
        this._f = 'animalese/female/voice_1/f.mp3';
        this._g = 'animalese/female/voice_1/g.mp3';
        this._h = 'animalese/female/voice_1/h.mp3';
        this._i = 'animalese/female/voice_1/i.mp3';
        this._j = 'animalese/female/voice_1/j.mp3';
        this._k = 'animalese/female/voice_1/k.mp3';
        this._l = 'animalese/female/voice_1/l.mp3';
        this._m = 'animalese/female/voice_1/m.mp3';
        this._n = 'animalese/female/voice_1/n.mp3';
        this._o = 'animalese/female/voice_1/o.mp3';
        this._p = 'animalese/female/voice_1/p.mp3';
        this._q = 'animalese/female/voice_1/q.mp3';
        this._r = 'animalese/female/voice_1/r.mp3';
        this._s = 'animalese/female/voice_1/s.mp3';
        this._t = 'animalese/female/voice_1/t.mp3';
        this._u = 'animalese/female/voice_1/u.mp3';
        this._v = 'animalese/female/voice_1/v.mp3';
        this._w = 'animalese/female/voice_1/w.mp3';
        this._x = 'animalese/female/voice_1/x.mp3';
        this._y = 'animalese/female/voice_1/y.mp3';
        this._z = 'animalese/female/voice_1/z.mp3';
        this._space = 'animalese/female/voice_1/Gwah.mp3';
        this._enter = 'sfx/enter.mp3';
        this._backspace = 'sfx/backspace.mp3';
        this._tab = 'sfx/tab.mp3';
        this._paste = 'animalese/female/voice_1/Gwah.mp3';
        this._ampersand = 'sfx/ampersand.mp3';
        this._arrow_down = 'sfx/arrow_down.mp3';
        this._arrow_up = 'sfx/arrow_up.mp3';
        this._arrow_left = 'sfx/arrow_left.mp3';
        this._arrow_right = 'sfx/arrow_right.mp3';
        this._asterisk = 'sfx/asterisk.mp3';
        this._at = 'sfx/at.mp3';
        this._brace_closed = 'sfx/brace_closed.mp3';
        this._brace_open = 'sfx/brace_open.mp3';
        this._bracket_closed = 'sfx/bracket_closed.mp3';
        this._bracket_open = 'sfx/bracket_open.mp3';
        this._caret = 'sfx/caret.mp3';
        this._dollar = 'sfx/dollar.mp3';
        this._exclamation = 'sfx/exclamation.mp3';
        this._parenthesis_closed = 'sfx/parenthesis_closed.mp3';
        this._parenthesis_open = 'sfx/parenthesis_open.mp3';
        this._percent = 'sfx/percent.mp3';
        this._pound = 'sfx/pound.mp3';
        this._question = 'sfx/question.mp3';
        this._slash_back = 'sfx/slash_back.mp3';
        this._slash_forward = 'sfx/slash_forward.mp3';
        this._tilde = 'sfx/tilde.mp3';
        this._one = 'vocals/female/voice_1/1.mp3';
        this._two = 'vocals/female/voice_1/2.mp3';
        this._three = 'vocals/female/voice_1/3.mp3';
        this._four = 'vocals/female/voice_1/4.mp3';
        this._five = 'vocals/female/voice_1/5.mp3';
        this._six = 'vocals/female/voice_1/6.mp3';
        this._seven = 'vocals/female/voice_1/7.mp3';
        this._eight = 'vocals/female/voice_1/8.mp3';
        this._nine = 'vocals/female/voice_1/9.mp3';
        this._zero = 'vocals/female/voice_1/0.mp3';
        this._keystrokeCallback = debounce((event) => {
            if (!isActive) {
                return;
            }
            console.log("Oi mate I'm walkin ere");
            let activeDocument = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;
            if (event.document !== activeDocument || event.contentChanges.length === 0) {
                return;
            }
            isNotArrowKey = true;
            let pressedKey = event.contentChanges[0].text;
            switch (pressedKey) {
                case '':
                    if (event.contentChanges[0].rangeLength === 1) {
                        // backspace or delete pressed
                        this.player.play(this._backspace);
                    }
                    break;
                case '\n':
                    // enter pressed
                    this.player.play(this._enter);
                    break;
                case '\t':
                case '    ':
                    // tab pressed
                    this.player.play(this._tab);
                    break;
                case 'a':
                    // a key pressed
                    this.player.play(this._a);
                    break;
                case 'b':
                    // b key pressed
                    this.player.play(this._b);
                    break;
                case 'c':
                    // c key pressed
                    this.player.play(this._c);
                    break;
                case 'd':
                    // d key pressed
                    this.player.play(this._d);
                    break;
                case 'e':
                    // e key pressed
                    this.player.play(this._e);
                    break;
                case 'f':
                    // f key pressed
                    this.player.play(this._f);
                    break;
                case 'g':
                    // g key pressed
                    this.player.play(this._g);
                    break;
                case 'h':
                    // h key pressed
                    this.player.play(this._h);
                    break;
                case 'i':
                    // i key pressed
                    this.player.play(this._i);
                    break;
                case 'j':
                    // j key pressed
                    this.player.play(this._j);
                    break;
                case 'k':
                    // k key pressed
                    this.player.play(this._k);
                    break;
                case 'l':
                    // l key pressed
                    this.player.play(this._l);
                    break;
                case 'm':
                    this.player.play(this._m);
                    break;
                case 'n':
                    this.player.play(this._n);
                    break;
                case 'o':
                    this.player.play(this._o);
                    break;
                case 'p':
                    this.player.play(this._p);
                    break;
                case 'q':
                    this.player.play(this._q);
                    break;
                case 'r':
                    this.player.play(this._r);
                    break;
                case 's':
                    this.player.play(this._s);
                    break;
                case 't':
                    this.player.play(this._t);
                    break;
                case 'u':
                    this.player.play(this._u);
                    break;
                case 'v':
                    this.player.play(this._v);
                    break;
                case 'w':
                    this.player.play(this._w);
                    break;
                case 'x':
                    this.player.play(this._x);
                    break;
                case 'y':
                    this.player.play(this._y);
                    break;
                case 'z':
                    this.player.play(this._z);
                    break;
                case '&':
                    this.player.play(this._ampersand);
                    break;
                case '!':
                    this.player.play(this._exclamation);
                    break;
                case '?':
                    this.player.play(this._question);
                    break;
                case '/':
                    this.player.play(this._slash_forward);
                    break;
                case '\\':
                    this.player.play(this._slash_back);
                    break;
                case '*':
                    this.player.play(this._asterisk);
                    break;
                case '@':
                    this.player.play(this._at);
                    break;
                case '}':
                    this.player.play(this._brace_closed);
                    break;
                case '{':
                    this.player.play(this._brace_open);
                    break;
                case '[':
                    this.player.play(this._bracket_open);
                    break;
                case ']':
                    this.player.play(this._bracket_closed);
                    break;
                case '^':
                    this.player.play(this._caret);
                    break;
                case '$':
                    this.player.play(this._dollar);
                    break;
                case ')':
                    this.player.play(this._parenthesis_closed);
                    break;
                case '(':
                    this.player.play(this._parenthesis_open);
                    break;
                case '%':
                    this.player.play(this._percent);
                    break;
                case '#':
                    this.player.play(this._pound);
                    break;
                case '~':
                    this.player.play(this._tilde);
                    break;
                case '1':
                    this.player.play(this._one);
                    break;
                case '2':
                    this.player.play(this._two);
                    break;
                case '3':
                    this.player.play(this._three);
                    break;
                case '4':
                    this.player.play(this._four);
                    break;
                case '5':
                    this.player.play(this._five);
                    break;
                case '6':
                    this.player.play(this._six);
                    break;
                case '7':
                    this.player.play(this._seven);
                    break;
                case '8':
                    this.player.play(this._eight);
                    break;
                case '9':
                    this.player.play(this._nine);
                    break;
                case '0':
                    this.player.play(this._zero);
                    break;
                case 'A':
                    // A key pressed
                    this.player.play(this._a);
                    break;
                case 'B':
                    // B key pressed
                    this.player.play(this._b);
                    break;
                case 'C':
                    // C key pressed
                    this.player.play(this._c);
                    break;
                case 'D':
                    // D key pressed
                    this.player.play(this._d);
                    break;
                case 'E':
                    // E key pressed
                    this.player.play(this._e);
                    break;
                case 'F':
                    // F key pressed
                    this.player.play(this._f);
                    break;
                case 'G':
                    // G key pressed
                    this.player.play(this._g);
                    break;
                case 'H':
                    // H key pressed
                    this.player.play(this._h);
                    break;
                case 'I':
                    // I key pressed
                    this.player.play(this._i);
                    break;
                case 'J':
                    // J key pressed
                    this.player.play(this._j);
                    break;
                case 'K':
                    // K key pressed
                    this.player.play(this._k);
                    break;
                case 'L':
                    // L key pressed
                    this.player.play(this._l);
                    break;
                case 'M':
                    this.player.play(this._m);
                    break;
                case 'N':
                    this.player.play(this._n);
                    break;
                case 'O':
                    this.player.play(this._o);
                    break;
                case 'P':
                    this.player.play(this._p);
                    break;
                case 'Q':
                    this.player.play(this._q);
                    break;
                case 'R':
                    this.player.play(this._r);
                    break;
                case 'S':
                    this.player.play(this._s);
                    break;
                case 'T':
                    this.player.play(this._t);
                    break;
                case 'U':
                    this.player.play(this._u);
                    break;
                case 'V':
                    this.player.play(this._v);
                    break;
                case 'W':
                    this.player.play(this._w);
                    break;
                case 'X':
                    this.player.play(this._x);
                    break;
                case 'Y':
                    this.player.play(this._y);
                    break;
                case 'Z':
                    this.player.play(this._z);
                    break;
                case " ":
                    console.log("Space");
                default:
                    let textLength = pressedKey.trim().length;
                    switch (textLength) {
                        case 0:
                            // user hit Enter while indented
                            this.player.play(this._enter);
                            break;
                        default:
                            // text pasted
                            this.player.play(this._paste);
                            break;
                    }
                    break;
            }
        }, 100, { leading: true });
        this._arrowKeysCallback = debounce((event) => {
            if (!isActive) {
                return;
            }
            // current editor
            const editor = vscode.window.activeTextEditor;
            if (!editor || editor.document !== event.textEditor.document) {
                return;
            }
            // check if there is no selection
            if (editor.selection.isEmpty && isNotArrowKey === false) {
                const randoguy = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                if (randoguy === 1) {
                    this.player.play(this._arrow_down);
                }
                else if (randoguy === 2) {
                    this.player.play(this._arrow_up);
                }
                else if (randoguy === 3) {
                    this.player.play(this._arrow_left);
                }
                else {
                    this.player.play(this._arrow_right);
                }
            }
            else {
                isNotArrowKey = false;
            }
        }, 100, { leading: true });
        isNotArrowKey = false;
        vscode.workspace.onDidChangeTextDocument(this._keystrokeCallback, this, this._subscriptions);
        vscode.window.onDidChangeTextEditorSelection(this._arrowKeysCallback, this, this._subscriptions);
        this._disposable = vscode.Disposable.from(...this._subscriptions);
        this.player = {
            play: (filePath) => player.play(filePath, config)
        };
    }
    dispose() {
        this._disposable.dispose();
    }
}
exports.EditorListener = EditorListener;
//# sourceMappingURL=extension.js.map