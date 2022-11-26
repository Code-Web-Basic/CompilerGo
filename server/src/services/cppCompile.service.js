var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');

exports.stats = true;
const compileCPP = function (envData, code, fn) {
    var filename = cuid.slug();
    const path = './temp/';

    //create temp0
    fs.writeFile(path + filename + '.cpp', code, function (err) {
        console.log(envData);
        if (exports.stats) {
            if (err) console.log('ERROR: '.red + err);
            else {
                console.log('INFO: '.green + filename + '.cpp created');
                if (envData.OS === 'windows') {
                    //compile c code
                    const command = 'g++ ' + path + filename + '.cpp  -o ' + path + filename;
                    exec(command, function (error, stdout, stderr) {
                        if (error) {
                            if (exports.stats) {
                                console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
                            }
                            var out = { error: stderr };
                            fn(out);
                        } else {
                            var progNotFinished = true;
                            var tempCommand = ' ./temp/' + filename;
                            exec(tempCommand, function (error, stdout, stderr) {
                                console.log(error, 'error');
                                console.log(stdout, 'stdout');
                                console.log(stderr, 'stderr');
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
                                        'taskkill /im ./temp/' + filename + '.out /f > nul',
                                        function (error, stdout, stderr) {
                                            if (progNotFinished) {
                                                progNotFinished = false; // programme finished
                                                if (exports.stats) {
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
const compileCPPWithInput = function (envData, code, input, fn) {
    var filename = cuid.slug();
    const path = './temp/';
    //create temp0
    fs.writeFile(path + filename + '.cpp', code, function (err) {
        if (exports.stats) {
            if (err) console.log('ERROR: '.red + err);
            else {
                console.log('INFO: '.green + filename + '.cpp created');
                if (envData.OS === 'windows') {
                    const command =
                        'g++ ' +
                        path +
                        filename +
                        '.cpp  -o ' +
                        path +
                        filename +
                        ' & echo ' +
                        input +
                        ' > ' +
                        path +
                        filename +
                        '.txt';

                    console.log(command);
                    exec(command, function (error, stdout, stderr) {
                        console.log(command);
                        if (error) {
                            console.log(command);

                            if (exports.stats) {
                                console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
                            }
                            var out = { error: stderr };
                            fn(out);
                        } else {
                            if (input) {
                                console.log('create input file');
                                var progNotFinished = true;
                                var tempCommand = ' ./temp/' + filename;
                                var tempInput = './temp/' + filename + '.txt';
                                exec(tempCommand + ' < ' + tempInput, function (error, stdout, stderr) {
                                    if (error) {
                                        if (error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                                            var out = {
                                                error: 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.',
                                            };
                                            fn(out);
                                        } else {
                                            if (exports.stats) {
                                                console.log(
                                                    'INFO: '.green +
                                                        filename +
                                                        '.cpp contained an error while executing',
                                                );
                                            }
                                            var out = { error: stderr };
                                            fn(out);
                                        }
                                    } else {
                                        if (progNotFinished) {
                                            progNotFinished = false;
                                            if (exports.stats) {
                                                console.log(
                                                    'INFO: '.green +
                                                        filename +
                                                        '.cpp successfully compiled and executed !',
                                                );
                                            }
                                            var out = { output: stdout };
                                            fn(out);
                                        }
                                    }
                                });
                            } //input not provided
                            else {
                                if (exports.stats) {
                                    console.log('INFO: '.green + 'Input mission for ' + filename + '.cpp');
                                }
                                var out = { error: 'Input Missing' };
                                fn(out);
                            }
                        }
                    });
                } else {
                    console.log('ERROR: '.red + 'choose either g++ or gcc ');
                }
            } //end of else err
        } //end of exports.stats
    }); //end of write file
}; //end of compileCPPWithIn
export const cppCompileService = { compileCPP, compileCPPWithInput };
