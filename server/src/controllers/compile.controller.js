import { JavaCompileService } from '../services/javaCompile.service';
import { HttpStatusCode } from '../utilities/constants';
import { cppCompileService } from '../services/cppCompile.service';
import { csCompileService } from '../services/csCompile.service';
import { pythonCompileService } from '../services/pythonCompile.service';
const pythonCompile = async (req, res) => {
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
};

const pythonCompileWithInput = async (req, res) => {
    try {
        //if windows
        var envData = { OS: 'windows' };
        await pythonCompileService.compilePythonWithInput(envData, req.body.code, req.body.input, function (data) {
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
const csCompileWithInput = async (req, res) => {
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
const cPlusCompileWithInput = async (req, res) => {
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
const javaCompileWithInput = async (req, res) => {
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
};

export const CompileController = {
    pythonCompile,
    pythonCompileWithInput,
    cPlusCompile,
    javaCompile,
    javaCompileWithInput,
    csCompile,
    csCompileWithInput,
    cPlusCompileWithInput,
};
