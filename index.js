let music = {
    data: {
        duration: 0,
        source: {}
    },
    init: function () {
        let button = document.querySelector("#music-search-button");
        let durationInput = document.querySelector("#duration");
        button.onclick = generate;

        function generate () {
            let duration = Number(durationInput.value);
            if (duration > 180) music.data.duration = 180; // Căn chỉnh thời gian
            else
                music.data.duration = Math.round(Math.ceil(duration / 15) * 15);
            get(music.data.duration);
        }

        function get (duration) {
            axios.get("stock/music/" + duration + "/data.json") // lấy dữ liệu
                .then((response) => {
                    music.data.source = response.data;
                    music.show();
                    music.playAndPause();
                });
        }
    },

    show: function () { // render layout
        let tbody = document.querySelector("#music-source");
        let textNode = "";

        for (let i = 1; i <= this.data.source.length; ++i) {
            let tr = "<tr>";
            let td = `<td class="d-none d-sm-block">${i} </td>`;
            tr += td;

            let current = music.data.source[i - 1];
            td = `<td>${current.name}</td>`;
            tr += td;

            td = `<td>${current.kind}</td>`;
            tr += td;

            td = `<td class="text-center"><i name="play-pause" data="stock/music/${music.data.duration}/${current.name}.mp3" class="fal fa-play-circle"></i>`;
            tr += td;

            td = `<td class="text-center"><a href="stock/music/${music.data.duration}/${current.name}.mp3"><i class="fal fa-download"></i></a></td>`;
            tr += td;

            td = `<td class="text-center d-none d-sm-block">${convertTime(music.data.duration)}</td>`;
            tr += td;

            tr += "</tr>";
            textNode += tr;
        }

        function convertTime (duration) {
            let minutes = Math.floor(duration/60);
            let seconds = duration - minutes * 60;
            return minutes + "m" + seconds + "s";
        }

        tbody.innerHTML = textNode;
    },

    playAndPause: function () { // thêm chức năng cho nút play và pause
        let play = document.getElementsByName("play-pause");
        let audio = document.querySelector("#audio-controller audio");
        for (let i = 0; i < play.length; ++i) {
            let current = play[i];
            current.onclick = function () {
                if (current.className != "fal fa-pause-circle") {
                    current.className = "fal fa-pause-circle";
                    audio.src = current.getAttribute("data");
                    audio.load();
                    audio.play();
                    for (let j = 0; j < play.length; ++j) {
                        if (i != j) {
                            play[j].className = "fal fa-play-circle";
                        }
                    }
                } else {
                    current.className = "fal fa-play-circle";
                    audio.pause();
                }
            }
        }
    }
}

window.addEventListener("load", function () {
    music.init();
})