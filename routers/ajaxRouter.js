const cp = require('child_process');
const fs = require('fs');

module.exports = function(express, app) {
    const router = express.Router();

    router.get('/status', function(req, res) {
        let status;
        try {
            cp.execSync('ps -e -o command | grep "^node sunlapse.js"');
            status = 200;
        } catch (error) {
            status = 404;
        }
        res.status(status).end();
    });

    router.get('/logs', function(req, res) {
        const logs = {};

        try {
            const log = fs.readFileSync('/var/log/sunlapse/sunlapse.log');
            logs.log = log.toString();
            const errorLog = fs.readFileSync('/var/log/sunlapse/sunlapse.err');
            logs.errorLog = errorLog.toString();
        } catch (error) {
            logs.log = logs.log || "";
            logs.errorLog = logs.errorLog || "";
        }
        
        res.json(JSON.stringify(logs)).end();
    });

    router.get('/videos', function(req, res) {
        try {
            const videoFiles = fs.readdirSync('/var/opt/sunlapse');
        } catch (error) {

        }
    });

    app.use('/ajax', router);
}