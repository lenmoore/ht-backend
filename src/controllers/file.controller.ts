import { Request, Response } from 'express';
import { TaskDocument } from '../models/ht-custom/task.model';
import TaskService from '../services/ht/task.service';

async function confirmVideo(req: Request, res: Response) {
    try {
        const task: TaskDocument = await TaskService.getOneTaskById(req.body.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.isConfirmedByTeam = true;
        task.isActive = false;

        await task.save();
        return res.status(200).json({ message: 'Success confirm video', task });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export default { confirmVideo };