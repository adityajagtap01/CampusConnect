import multer from 'multer';
import path from 'path';
import fs from 'fs';

const tempDir = './public/temp';

// Ensure the temp directory exists (Render's filesystem starts fresh on deploy)
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
}).array('files', 3);

export default upload;