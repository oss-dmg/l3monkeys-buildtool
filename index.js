(function() {
    // Dependencies, Imports, Requirements
    const os = require('os')
    const fs = require('fs')
    const path = require('path')
    const async = require('async')
    const { arch, platform, progressbar } = require('./shared')
    const { download } = require('./download')
    // JDK, JavaFX Version -> 13.0.1
    // Hash & build number is for the Oracle JDK
    const major_version = '13'
    const minor_version = '0'
    const patch_version = '1'
    const build_number = '9'
    const hash = 'cec27d702aa74d5a8630c65ae61e4305'
    const version = `${major_version}.${minor_version}.${patch_version}`
    // Maven Version -> 3.6.3
    const mvn_major_version = '3'
    const mvn_minor_version = '6'
    const mvn_patch_version = '3'
    const mvn_version = `${mvn_major_version}.${mvn_minor_version}.${mvn_patch_version}`

    //######################################################################################
    //###                                      URL                                       ###
    //######################################################################################
    const url = exports.url = () =>
        `https://download.oracle.com/otn-pub/java/jdk/${version}+${build_number}/${hash}` +
            `/jdk-${version}_${platform()}-${arch()}_bin` +
                (platform() === 'windows' ? '.zip' : '.tar.gz')
    // URL JavaFX creator
    const urlFX = exports.urlFX = () =>
        `https://download2.gluonhq.com/openjfx/` + 
            `${version}/openjfx-${version}_${platform()}-${arch()}_bin-jmods.zip`
    // URL Maven creator
    const urlMVN = exports.urlMVN = () =>
        `https://www-us.apache.org/dist/maven/` +
            `maven-${mvn_major_version}/${mvn_version}/binaries/apache-maven-${mvn_version}-bin` +
                (platform() === 'windows' ? '.zip' : '.tar.gz')
    //######################################################################################
    //###                                      END                                       ###
    //######################################################################################

    const install = exports.install = cb => {
        process.stdout.write('[0/3] Tasks completed\n')
        if (!fs.existsSync('.temp'))
            fs.mkdirSync('.temp')
        // Starting asynchronous paralled functions
        async.parallel([
            (callback) => download(url(), `.temp/openjdk_${version}`+(platform()==='windows'?'.zip':'.tar.gz'), (err, data) => callback(err, data)),
            (callback) => download(urlFX(), `.temp/openjfx_${version}`+(platform()==='windows'?'.zip':'.tar.gz'), (err, data) => callback(err, data)),
            (callback) => download(urlMVN(), `.temp/maven_${mvn_version}`+(platform()==='windows'?'.zip':'.tar.gz'), (err, data) => callback(err, data))
        ], (err, data) => {
            progressbar.stop() // Global stop for all progressbars
            if (err) cb(err)
            // Update first line
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write('[1/3] Tasks completed\n')
        })
    }

})()