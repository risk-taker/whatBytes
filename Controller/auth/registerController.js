import Joi from "joi"
import prisma from "../../DB/db.config.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService.js";

export const register = async (req, res, next) => {
    //checklist
    // validate the request
    // authorise the request
    // check if user is already in the db
    // prepare model
    // store in db
    // generate jwt token
    // send response

    // validate the request
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password')
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    // check if user is already in the db
    try {
        const userExist = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (userExist) {
            return next(CustomErrorHandler.alreadyExist("This email is already been taken!"));
        }

    } catch (error) {
        return next(error);
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // token
    let access_token;
    let newUser;
    try {
        // store in db
        newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        access_token = JwtService.sign({ _id: newUser.id, _email: newUser.email });


    } catch (error) {
        return next(error);
    }

    res.json({
        access_token,
        newUser
    })
}