import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized())
    }

    const token = authHeader.split(' ')[1];

    try {
        const { id, email } = await JwtService.verify(token);
        const user = {
            id,
            email
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}

export default auth;