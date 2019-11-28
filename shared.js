/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Benny Nystroem. All rights reserved.
 *  Licensed under the GNU GENERAL PUBLIC LICENSE v3 License. 
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Dependencies, Imports, Requirements
const os = require('os')
const path = require('path')
// Architecture & platform modifiers
let _arch = os.arch()
let _platform = os.platform()
switch (_arch) {
    case 'x64':
        break;
    case 'ia32':
        _arch = 'i586'
        break;
    default:
        break;
}
switch (_platform) {
    case 'darwin':
        _platform = 'macosx'
        break;
    case 'win32':
        _platform = 'windows'
        break;
    case 'linux':
        break;
    default:
        break;
}
// Shared objects
export const progressbar = new require('cli-progress').MultiBar({
    format: '{filename} [{bar}] {percentage}%',
    clearOnComplete: false,
    hideCursor: true,
    stream: require('process').stdout,
}, require('cli-progress').Presets.legacy)
// Platform
export const platform = () => _platform
// Architecture
export const arch = () => _arch