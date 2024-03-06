import { Request, Response } from 'express';
import multer from 'multer';
import { TaskDocument } from '../models/ht-custom/task.model';
import TaskService from '../services/ht/task.service';
import path from 'node:path';

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/videod')); // Change 'public/videod' to your desired storage location
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // for 500MB limit
});

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


async function uploadVideo(req: any, res: Response) {
    console.log(req);
    try {
        console.log(req);
        if (req.file) { // req.file is the 'video' file
            // Add logic here if you want to update something in your database
            return res.status(200).json({
                message: 'Video uploaded successfully',
                filePath: `/videod/${req.file.filename}`,
            });
        } else {
            return res.status(400).json({ message: 'No video was uploaded' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

//
// async function uploadVideo(req: any, res: Response) {
//     try {
//         if (req.file) {
//             // Path to the uploaded video
//             const inputPath = req.file.path;
//             // Define a new filename for the converted video
//             const outputPath = req.file.path.replace(/\.\w+$/, '.mp4');
//
//             // Convert video to MP4 format
//             ffmpeg(inputPath)
//                 .toFormat('mp4')
//                 .on('end', function () {
//                     console.log('Conversion finished!');
//                     // Optionally, you can remove the original file if no longer needed
//                     // fs.unlinkSync(inputPath);
//
//                     // Send back the response
//                     res.status(200).json({
//                         message: 'Video uploaded and converted successfully',
//                         filePath: outputPath.replace(/^public/, ''), // Adjust according to your public URL mapping
//                     });
//                 })
//                 .on('error', function (err) {
//                     console.error('Error converting video:', err.message);
//                     res.status(500).json({ message: 'Error converting video' });
//                 })
//                 .save(outputPath);
//         } else {
//             res.status(400).json({ message: 'No video was uploaded' });
//         }
//     } catch (error) {
//         console.error('Error uploading the video:', error);
//         res.status(500).json({ message: error.message });
//     }
// }

// Middleware for route that will handle video upload
export const uploadMiddleware = upload.single('video'); // 'video' is the name of the file input field

export default { confirmVideo, uploadVideo };
