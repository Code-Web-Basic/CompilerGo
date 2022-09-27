var exec = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');

exports.stats = false;

const compileCS = function (envData, code, fn) {
    //creating source file
    var filename = cuid.slug();
    const path = process.cwd() + '\\temp\\';

    //create temp0
    fs.writeFile(path + filename + '.cs', code, function (err) {
        if (exports.stats) {
            if (err) console.log('ERROR: '.red + err);
            else console.log('INFO: '.green + filename + '.cs created');
        }
        if (envData.OS === 'windows') {
            //compile cs code
            const commmand = 'cd ' + path + '  & dotnet run ' + filename + '.cs';
            console.log(commmand);
            exec(commmand, function (error, stdout, stderr) {
                if (error) {
                    if (exports.stats) {
                        console.log('INFO: '.green + filename + '.cs contained an error while compiling');
                    }
                    var out = { error: stderr };
                    fn(out);
                } else {
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

    //compiling and exrcuiting source code
}; //end of compileCS
export const csCompileService = { compileCS };
