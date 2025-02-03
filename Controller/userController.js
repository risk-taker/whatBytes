import prisma from "../DB/db.config.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import bcrypt from 'bcrypt';


export const listAllUsers = async (req, res) => {
    let users;
    try {
        users = await prisma.user.findMany({
            include: {
                projects: true,
                tasks: true
            }
        });
        if (!users) {
            return next(CustomErrorHandler.notFound("Users not found"));
        }
    } catch (error) {
        return next(error)
    }
    return res.json(users);
}

export const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    let user;
    let hashedPassword;
    try {
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email,
                password: hashedPassword //password is optional to provide
            }
        })
    } catch (error) {
        return next(error);
    }

    res.json({
        status: 200,
        message: "user updated successfully",
        data: user
    })
}

//* delete user

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    } catch (error) {
        return next(error);
    }


    return res.json({
        status: 200,
        msg: "User deleted successfully"
    })
}