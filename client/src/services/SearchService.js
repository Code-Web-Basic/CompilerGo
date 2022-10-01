import * as httpRequest from '~/utils/httpRequest';
import PropTypes from 'prop-types';
export const login = async (query) => {
    try {
        const response = await httpRequest.get('search/movie', {
            params: {
                query: query,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
login.Prototypes = {
    query: PropTypes.string,
    page: PropTypes.number,
    language: PropTypes.string,
    include_adult: PropTypes.bool,
};
