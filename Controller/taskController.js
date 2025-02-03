import Joi from "joi";
import prisma from "../DB/db.config.js";

export const createTask = async (req, res, next) => {
    // Validate input
    const taskSchema = Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().allow(""), // Allow empty string
        status: Joi.string().valid("TODO", "IN_PROGRESS", "DONE").default("TODO"),
        projectId: Joi.string().uuid().required(), // Ensure projectId is provided
        assignedUserId: Joi.string().uuid().allow(null) // Allow null for unassigned tasks
    });

    const { error } = taskSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    const { title, desc, status, projectId, assignedUserId } = req.body;

    try {
        // Ensure project exists before creating the task
        const existingProject = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!existingProject) {
            return res.status(400).json({ error: "Project does not exist" });
        }

        // Ensure assigned user exists (if provided)
        if (assignedUserId) {
            const existingUser = await prisma.user.findUnique({
                where: { id: assignedUserId }
            });

            if (!existingUser) {
                return res.status(400).json({ error: "Assigned user does not exist" });
            }
        }

        // Store in DB
        const newTask = await prisma.task.create({
            data: {
                title,
                desc,
                status,
                project: { connect: { id: projectId } }, // Associate task with project
                assignedUser: assignedUserId ? { connect: { id: assignedUserId } } : undefined // Associate task with user (if provided)
            }
        });

        return res.json({
            status: 200,
            message: "Task created successfully",
            data: newTask
        });
    } catch (error) {
        return next(error);
    }
};

export const listAllTasks = async (req, res) => {
    const { projectId } = req.params;
    const tasks = await prisma.task.findMany({
        where: { projectId },
    });
    res.json(tasks);
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, desc, status, assignedUserId } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id },
            data: { title, desc, status, assignedUserId },
        });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Task not found' });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({ where: { id } });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Task not found' });
    }
}