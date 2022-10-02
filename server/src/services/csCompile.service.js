var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');

exports.stats = false;

const compileCS = function (envData, code, fn) {
    //creating source file
    var filename = cuid.slug();
    const path = './temp/';

    //create temp0
    fs.writeFile(path + filename + '.cs', code, function (err) {
        if (exports.stats) {
            if (err) console.log('ERROR: '.red + err);
            else console.log('INFO: '.green + filename + '.cs created');
        }
        if (envData.OS === 'windows') {
            //compile cs code
            const command = 'cd temp & csc ' + filename + '.cs';
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    if (exports.stats) {
                        console.log('INFO: '.green + filename + '.cs contained an error while compiling');
                    }
                    var out = { error: stderr };
                    fn(out);
                } else {
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
                                    console.log('INFO: '.green + filename + '.cs contained an error while executing');
                                }

                                var out = { error: stderr };
                                fn(out);
                            }
                        } else {
                            if (exports.stats) {
                                console.log('INFO: '.green + filename + '.cs successfully compiled and executed !');
                            }
                            var out = { output: stdout };
                            fn(out);
                        }
                    });
                }
            });
        }
    });
}; //end of compileCS

const compileCSWithInput = function (envData, code, input, fn) {
    var filename = cuid.slug();
    const path = './temp/';

    //create temp0
    fs.writeFile(path + filename + '.cs', code, function (err) {
        if (exports.stats) {
            if (err) console.log('ERROR: '.red + err);
            else console.log('INFO: '.green + filename + '.cs created');
        }

        if (envData.OS === 'windows') {
            //compile c code
            const command = 'cd temp & csc ' + filename + '.cs';
            exec(command, function (error, stdout, stderr) {
                if (error) {
                    if (exports.stats) {
                        console.log('INFO: '.green + filename + '.cs contained an error while compiling');
                    }
                    var out = { error: stderr };
                    fn(out);
                } else {
                    if (input) {
                        var inputFile = filename + 'input.txt';

                        fs.writeFile(path + inputFile, input, function (err) {
                            if (exports.stats) {
                                if (err) console.log('ERROR: '.red + err);
                                else console.log('INFO: '.green + inputFile + ' (inputFile) created');
                            }
                        });
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
                                            'INFO: '.green + filename + '.cs contained an error while executing',
                                        );
                                    }
                                    var out = { error: stderr };
                                    fn(out);
                                }
                            } else {
                                if (exports.stats) {
                                    console.log('INFO: '.green + filename + '.cs successfully compiled and executed !');
                                }
                                var out = { output: stdout };
                                fn(out);
                            }
                        });
                    } //input not provided
                    else {
                        if (exports.stats) {
                            console.log('INFO: '.green + 'Input mission for ' + filename + '.cs');
                        }
                        var out = { error: 'Input Missing' };
                        fn(out);
                    }
                }
            }); //end of csc exec
        }
    });

    //end of writeFile
}; //end of compileCPPWithInput

export const csCompileService = { compileCS, compileCSWithInput };
