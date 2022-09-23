const WHITELIST_DOMAINS = ['http://localhost:3000', 'http://localhost:3240'];
export const corsOptions = {
    origin: function (origin, callback) {
        if (WHITELIST_DOMAINS.indexOf(origin) !== -1) {
            console.log('vaodc');
            callback(null, true);
        } else {
            callback(new Error(`${origin}Not allowed by CORS`));
        }
    },
};
