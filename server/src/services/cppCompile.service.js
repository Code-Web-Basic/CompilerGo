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
                    const command = 'g++ ' + path + filename + '.cpp -o ' + path + filename + '.exe';

                    exec(command, function (error, stdout, stderr) {
                        if (error) {
                            if (exports.stats) {
                                console.log('INFO: '.green + filename + '.cpp contained an error while compiling');
                            }
                            var out = { error: stderr };
                            fn(out);
                        } else {
                            var progNotFinished = true;
                            var tempCommand = 'cd temp & ' + filename;
                            exec(tempCommand, function (error, stdout, stderr) {
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
                    //compile c code
                    // const command =
                    //     'cd ' + path + ' && g++ ' + filename + '.cpp -o ' + filename + ' && ' + path + filename;
                    const command = 'g++ ' + path + filename + '.cpp -o ' + path + filename + '.exe';
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
                                var inputFile = filename + 'input.txt';
                                console.log('create input file');
                                fs.writeFile(path + inputFile, input, function (err) {
                                    console.log(command, 'end');
                                    if (exports.stats) {
                                        if (err) console.log('ERROR: '.red + err);
                                        else console.log('INFO: '.green + inputFile + ' (inputFile) created');
                                    }
                                });
                                var progNotFinished = true;
                                var tempCommand = 'cd temp & ' + filename;

                                exec(tempCommand + '<' + inputFile, function (error, stdout, stderr) {
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
