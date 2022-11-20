import { JavaCompileService } from '../services/javaCompile.service';
import { HttpStatusCode } from '../utilities/constants';
import { cppCompileService } from '../services/cppCompile.service';
import { csCompileService } from '../services/csCompile.service';
import { pythonCompileService } from '../services/pythonCompile.service';

const compileWithInput = async (req, res) => {
    switch (req.body.chooseLanguage) {
        case 'python':
            try {
                //if windows
                var envData = { OS: 'windows' };
                await pythonCompileService.compilePythonWithInput(
                    envData,
                    req.body.code,
                    req.body.input,
                    function (data) {
                        res.status(HttpStatusCode.OK).json({ data: data });
                    },
                );
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        case 'cs':
            try {
                const envData = { OS: 'windows' };
                csCompileService.compileCSWithInput(envData, req.body.code, req.body.input, function (data) {
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        case 'cpp':
            try {
                //if windows
                var envData = { OS: 'windows' };
                //else
                cppCompileService.compileCPPWithInput(envData, req.body.code, req.body.input, function (data) {
                    console.log(data);
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        case 'java':
            try {
                //if windows
                var envData = { OS: 'windows' };
                //else
                JavaCompileService.compileJavaWithInput(envData, req.body.code, req.body.input, function (data) {
                    console.log(data);
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        default:
            break;
    }
};
const compile = async (req, res) => {
    switch (req.body.chooseLanguage) {
        case 'python':
            try {
                //if windows
                var envData = { OS: 'windows' };
                await pythonCompileService.compilePython(envData, req.body.code, function (data) {
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        case 'cs':
            try {
                const envData = { OS: 'windows' };
                csCompileService.compileCS(envData, req.body.code, function (data) {
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        case 'cpp':
            try {
                //if windows
                var envData = { OS: 'windows' };
                //else
                cppCompileService.compileCPP(envData, req.body.code, function (data) {
                    console.log(data);
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        case 'java':
            try {
                //if windows
                var envData = { OS: 'windows' };
                //else
                JavaCompileService.compileJava(envData, req.body.code, function (data) {
                    console.log(data);
                    res.status(HttpStatusCode.OK).json({ data: data });
                });
            } catch (error) {
                res.status(HttpStatusCode.INTERNAL_SERVER).json({
                    error: new Error(error).message,
                });
            }
            break;
        default:
            break;
    }
};
export const CompileController = {
    compile,
    compileWithInput,
};
