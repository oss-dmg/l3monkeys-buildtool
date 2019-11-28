(function() {
    // Dependencies, Imports, Requirements
    const os = require('os')
    const path = require('path')
    const async = require('async')
    const { arch, platform } = require('./shared')
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
        `https://download.oracle.com/otn-pub/java/jdk/${version}+{build_number}/${hash}` +
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


})()