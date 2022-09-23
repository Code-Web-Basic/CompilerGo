require('dotenv').config();
import express from 'express';
import passport from 'passport';
import { ApiV1 } from './routes/v1';
import { connectDB } from './config/mongodb';
import { env } from './config/environment';
import { corsOptions } from './config/cors';
import cors from 'cors';
import cookieSession from 'cookie-session';
connectDB()
    .then(() => console.log('Connected Successfully'))
    .then(() => bootServer())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const bootServer = () => {
    const app = express();
    //req.body data
    app.use(express.json());
    app.use(require('serve-static')(__dirname + '/../../public'));
    app.use(require('cookie-parser')());
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

    app.use(cors(corsOptions));
    app.use(
        cookieSession({
            name: 'session',
            keys: [
                /* secret keys */
            ],

            // Cookie Options
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    // use api
    app.use('/v1', ApiV1);
    app.listen(env.APP_PORT, () => console.log(`Example app listening on port http://${env.APP_HOST}:${env.APP_PORT}`));
};
