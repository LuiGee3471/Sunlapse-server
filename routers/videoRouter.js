const fs = require('fs');

const root = '/var/opt/sunlapse';

module.exports = function(express, app) {
    const router = express.Router();

    router.use('/file/:filename', function(req, res) {
        res.download(`${root}/${req.params.filename}`);
    });

    router.use('/player/:filename', function(req, res) {
        const filepath = `${root}/${req.params.filename}`;
        const stat = fs.statSync(filepath);
        const fileSize = stat.size;
        const range = req.headers.size;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0]);
            const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;
            const chunkSize = end - start + 1;

            const file = fs.createReadStream(filepath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filepath).pipe(res);
        }
    });

    app.use('/video', router);
}