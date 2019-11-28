/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Benny Nystroem. All rights reserved.
 *  Licensed under the GNU GENERAL PUBLIC LICENSE v3 License. 
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Dependencies
const fs = require('fs')
const request = require('request')
const { progressbar } = require('./shared')
// Download
module.exports.download = (url, dest, callback) => {
    // Console ProgressBar
    let bar = undefined
    // Bytes calculation
    let receivedBytes = 0
    // Streaming helpers
    const file = fs.createWriteStream(dest)
    const sendReq = 
        url.indexOf('oracle.com') > -1 
            ?
              request.get({
                url: url,
                headers: {
                    connection: 'keep-alive',
                    'Cookie': 'gpw_e24=http://www.oracle.com/; oraclelicense=accept-securebackup-cookie'
                }
              })
            : request.get(url)

    // verify response code
    sendReq
        .on('response', (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(dest, () => {}); // Delete temp file
                callback(`Error: Response status was ${response.statusCode}`, null)
            } else {
                // Calculate estimated time
                const totalBytes = response.headers['content-length']
                bar = progressbar.create(totalBytes, 0)
            }
        })
        .on('data', (chunk) => {
            receivedBytes += chunk.length;
            bar.update(receivedBytes, { filename: dest.split('/')[1] });
        })
        .pipe(file)

    // check for request errors
    sendReq.on('error', (err) => {
        file.close()
        fs.unlink(dest, () => {}) // Delete temp file
        bar.stop()
        callback(err, null)
    })

    // close() is async, call cb after close completes
    file.on('finish', () => {
        if (bar !== undefined) bar.stop()
        file.close(callback)
    })
    file.on('error', (err) => { // Handle errors
        file.close()
        if (err.code === "EEXIST")
           callback(`File already exists!`, null)
        else {
            fs.unlink(dest, () => {}) // Delete the file async. (But we don't check the result)
            bar.stop()
            callback(err, null)
        }
    })
}