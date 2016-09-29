import express from 'express';
import path from 'path';

const router = express.Router();
router.post('/', function (req, res) {
    const imageFile = req.files.image;
    const targetName = generateTargetName(imageFile.name);
    imageFile.mv('./public/uploaded-images/' + targetName, function (err) {
        if (err) {
            return res.status(500).send('上传过程中失败');
        }
        res.status(201).send('./uploaded-images/' + targetName);
    });
});

function generateTargetName(fileName) {
    const extName = path.extname(fileName);
    const prefixName = path.basename(fileName, extName);
    const timestamp = Date.now();
    return prefixName + '-' + timestamp + extName;
}

export default router;