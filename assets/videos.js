document.addEventListener('DOMContentLoaded', fetchVideos);

function fetchVideos() {
    fetch('/ajax/videos')
        .then((res) => res.json())
        .then(json => {
            const response = JSON.parse(json);
            console.log(response);
            const root = response.root;
            const videos = response.videos;

            const videoList = [];

            for (let video of videos) {
                videoList.push(makeVideoDiv(root, video));
            }
            const videosDiv = document.getElementById('videos');
            videosDiv.innerHTML = videoList.join('');
        })
        .catch((err) => console.error(err));
}

function makeVideoDiv(root, video) {
    const videoDiv = [`<div>`];
    const videoDate = `<p>${video.split('-').slice(1).join('')}</p>`;
    const playButton = `<button onclick="playVideo('${root}/${video}')">재생</button>`;
    const downloadButton = `<button onclick="downloadVideo('${root}/${video}')">다운로드</button>`;
    const end = `</div>`;

    videoDiv.push(videoDate, playButton, downloadButton, end);
    return videoDiv.join('');
}
