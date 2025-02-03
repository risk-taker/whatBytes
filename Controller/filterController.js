import prisma from "../DB/db.config.js";

export const filterController = async (req, res) => {
    const { status, assignedUserId } = req.query;
    const tasks = await prisma.task.findMany({
        where: {
            status: status || undefined,
            assignedUserId: assignedUserId || undefined,
        },
    });
    res.json(tasks);
}