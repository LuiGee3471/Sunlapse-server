const cp = require('child_process');
const fs = require('fs');

module.exports = function (express, app) {
    const router = express.Router();

    router.get('/status', function (req, res) {
        let status;
        try {
            cp.execSync('ps -e -o command | grep "^node sunlapse.js"');
            status = 200;
        } catch (error) {
            console.error(error);
            status = 404;
        }
        res.status(status).end();
    });

    router.get('/logs', function (req, res) {
        const logs = {};

        try {
            const log = fs.readFileSync('/var/log/sunlapse/sunlapse.log');
            logs.log = log.toString();
            const errorLog = fs.readFileSync('/var/log/sunlapse/sunlapse.err');
            logs.errorLog = errorLog.toString();
        } catch (error) {
            console.error(error);
            logs.log = logs.log || "";
            logs.errorLog = logs.errorLog || "";
        }

        res.json(JSON.stringify(logs)).end();
    });

    router.get('/videos', function (req, res) {
        const response = {};
        const root = '/var/opt/sunlapse';

        try {
            const videos = fs.readdirSync(root);
            response.videos = videos;
        } catch (error) {
            console.error(error);
            response.videos = ['timelapse-2021-01-05.mp4'];
        }

        res.json(JSON.stringify(response)).end();
    });

    app.use('/ajax', router);
}