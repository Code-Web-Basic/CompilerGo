import Jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        Jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log(req.headers.token);

                return res.status(403).json('Token is not valid...');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
};
