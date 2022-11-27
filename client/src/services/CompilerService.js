import * as httpRequest from '~/utils/httpRequest';
import PropTypes from 'prop-types';
export const compilerRun = async (chooseLanguage, code) => {
    try {
        const response = await httpRequest.post('/compile', {
            chooseLanguage: chooseLanguage,
            code: code,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
compilerRun.Prototypes = {
    chooseLanguage: PropTypes.string,
    code: PropTypes.string,
};
export const compilerRunInput = async (chooseLanguage, code, input) => {
    try {
        const response = await httpRequest.post('/compile/input', {
            chooseLanguage: chooseLanguage,
            code: code,
            input: input,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
compilerRunInput.Prototypes = {
    chooseLanguage: PropTypes.string,
    code: PropTypes.string,
    input: PropTypes.string,
};
