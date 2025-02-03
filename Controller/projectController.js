import Joi from "joi";
import prisma from "../DB/db.config.js";

export const createProject = async (req, res, next) => {
    // Validate input
    const projectSchema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().allow(""), // Allow empty string
        status: Joi.string().valid("PLANNED", "IN_PROGRESS", "COMPLETED").default("PLANNED"),
        userId: Joi.string().uuid().required() // Ensure userId is provided
    });

    const { error } = projectSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    const { name, desc, status, userId } = req.body;

    try {
        // Ensure user exists before associating the project
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Store in DB
        const newProject = await prisma.project.create({
            data: {
                name,
                desc,
                status,
                user: { connect: { id: userId } } // Associate project with user
            }
        });

        return res.json({
            status: 200,
            message: "Project created successfully",
            data: newProject
        });
    } catch (error) {
        return next(error);
    }
};


export const listAllProjects = async (req, res) => {
    const projects = await prisma.project.findMany({
        include: {
            tasks: true
        }
    });
    res.json(projects);
}

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    try {
        const project = await prisma.project.update({
            where: { id },
            data: { name, description, status },
        });
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Project not found' });
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.project.delete({ where: { id } });
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Project not found' });
    }
}