const jwtManager = require('../jwt/jwtManager');

class Authorization {

    checkToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.json({ status: 'authorization_error' });
        } else {
            const data = jwtManager.verify(token);
            if (!data) {
                return res.json({ status: 'authorization_error' });
            }

            req.payload = data;
            // if (req.updatedCity) {
            //     req.payload.city = req.updatedCity
            // }
            next();
        }
    }

    updateAdress(req, res, next) {
        if (req.url == 'api/v1/users/:id/address') {

                req.payload.city = req.body.city
            
        }

                next()

    }
}


module.exports = new Authorization();