document.addEventListener('DOMContentLoaded', fetchVideos);

function fetchVideos() {
    fetch('/ajax/videos')
        .then((res) => res.json())
        .then(json => {
            const response = JSON.parse(json);
            const videos = response.videos;

            const videoList = [];

            for (let video of videos) {
                videoList.push(makeVideoDiv(video));
            }
            const videosDiv = document.getElementById('videos');
            videosDiv.innerHTML = videoList.join('');
        })
        .catch((err) => console.error(err));
}

function makeVideoDiv(video) {
    const date = video.split('.')[0].split('-').splice(1, 3).join('-');
    const videoDiv = [`<div id="${date}">`];
    const videoDate = `<p>${date}</p>`;
    const playButton = `<button onclick="playVideo('${video}')">재생</button>`;
    const downloadButton = `<a href="/video/file/${video}">다운로드</a>`;
    const end = `</div>`;

    videoDiv.push(videoDate, playButton, downloadButton, end);
    return videoDiv.join('');
}

function playVideo(video) {
    const date = video.split('.')[0].split('-').splice(1, 3).join('-');
    const videoDiv = document.getElementById(date);

    const videoPlayer = [`<video src="/video/player/${video}" autoplay controls></video>`];
    const downloadButton = `<a href="/video/file/${video}">다운로드</a>`;
    videoPlayer.push(downloadButton);
    videoDiv.innerHTML = videoPlayer.join('');
}
