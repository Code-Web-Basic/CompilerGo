var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');
exports.stats = true;
const compileCPP = function (envData, code, fn) {
    //creating source file
    var filename = cuid.slug();
    const path = process.cwd() + '\\temp\\';
    //create temp0
    fs.writeFile(path + filename + '.cpp', code, function (err) {
        console.log(envData);
        if (exports.stats) {
            if (err) console.log('ERROR: '.red + err);
            else {
                console.log('INFO: '.green + filename + '.cpp created');
                if (envData.OS === 'windows') {
                    //compile c code
                    const command =
                        'cd ' + path + ' && g++ ' + filename + '.cpp -o ' + filename + ' && ' + path + filename;
                    exec(command, function (error, stdout, stderr) {
                        if (error) {
                            if (exports.stats) {
                                console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
                            }
                            var out = { error: stderr };
                            fn(out);
                        } else {
                            var progNotFinished = true;
                            var tempcommand = 'cd temp & ' + filename;
                            exec(tempcommand, function (error, stdout, stderr) {
                                if (error) {
                                    if (error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                                        var out = {
                                            error: 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.',
                                        };
                                        fn(out);
                                    } else {
                                        if (exports.stats) {
                                            console.log(
                                                'INFO: '.green + filename + '.cpp contained an error while executing',
                                            );
                                        }

                                        var out = { error: stderr };
                                        fn(out);
                                    }
                                } else {
                                    if (progNotFinished) {
                                        progNotFinished = false; // programme finished
                                        if (exports.stats) {
                                            console.log(
                                                'INFO: '.green + filename + '.cpp successfully compiled and executed !',
                                            );
                                        }
                                        var out = { output: stdout };
                                        fn(out);
                                    }
                                }
                            });
                            if (true) {
                                // kill the programme after envData.options.timeout ms
                                setTimeout(function () {
                                    exec(
                                        'taskkill /im ' + filename + '.exe /f > nul',
                                        function (error, stdout, stderr) {
                                            if (progNotFinished) {
                                                progNotFinished = false; // programme finished
                                                if (exports.stats) {
                                                    console.log(
                                                        'INFO: '.green +
                                                            filename +
                                                            '.exe was killed after ' +
                                                            envData.options.timeout +
                                                            'ms',
                                                    );
                                                }
                                                var out = { timeout: true };
                                                fn(out);
                                            }
                                        },
                                    );
                                }, 500);
                            }
                        }
                    });
                }
            } //end of else part of err
        } //end of expors.stats
    }); //end of write file
}; //end of compileCPP

export const cppCompileService = { compileCPP };
