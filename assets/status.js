document.addEventListener('DOMContentLoaded', checkStatus);

function checkStatus() {
    fetch('/ajax/status')
        .then((res) => {
            const status = res.ok ? '정상' : '오류';
            changeStatus(status);
            fetchLog();
        });
}

function changeStatus(status) {
    const serverStatus = document.getElementById('status');
    serverStatus.innerHTML = status;
}

function fetchLog() {
    fetch('/ajax/logs')
        .then((res) => res.json())
        .then((json) => {
            const logs = JSON.parse(json);
            const log = document.getElementById('log');
            const errorLog = document.getElementById('error');

            log.value = logs.log;
            errorLog.value = logs.errorLog;
        });
}