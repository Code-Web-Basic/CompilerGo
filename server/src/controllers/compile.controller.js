import { JavaCompileService } from '../services/javaCompile.service';
import { HttpStatusCode } from '../utilities/constants';
import compiler from 'compilex';
import { cppCompileService } from '../services/cppCompile.service';
import { csCompileService } from '../services/csCompile.service';
compiler.init({ stars: true });
const pythonCompile = async (req, res) => {
    try {
        //if windows
        var envData = { OS: 'windows' };
        compiler.compilePython(envData, req.body.code, function (data) {
            res.status(HttpStatusCode.OK).json({ data: data });
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const csCompile = async (req, res) => {
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
};

const cPlusCompile = async (req, res) => {
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
};
const javaCompile = async (req, res) => {
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
};

export const CompileController = { pythonCompile, cPlusCompile, javaCompile, csCompile };
