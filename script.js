const cartoonAudio = new Audio("./sound/Cartoon.mp3");
const forceAudio = new Audio("./sound/force.mp3");
const squeakyAudio = new Audio("./sound/squeaky.mp3");
const hopeAudio = new Audio("./sound/hope.mp3");
const janjiAudio = new Audio("./sound/Janji.mp3");

// selecting elements
const prevBtn = document.querySelector(".previous");
const playBtn = document.querySelector(".play-pause");
const nextBtn = document.querySelector(".next");
const songName = document.querySelector(".song-name");
const playPauseIcon = document.querySelector(".play-pause");

const songs = [
  { ele: hopeAudio, audioName: "Hope" },
  { ele: forceAudio, audioName: "Force" },
  { ele: cartoonAudio, audioName: "Cartoon" },
  { ele: janjiAudio, audioName: "Janji" },
];

for (const song of songs) {
  song.ele.addEventListener("ended", () => {
    updateSong("next");
    playPauseSong();
  });
}

let current = 0;
let currentSong = songs[current].ele;
songName.textContent = songs[current].audioName;

playBtn.addEventListener("click", () => {
  playPauseSong();
});

nextBtn.addEventListener("click", () => {
  updateSong("next");
  playPauseSong();
});

prevBtn.addEventListener("click", () => {
  updateSong("prev");
  playPauseSong();
});

const updateSong = (action) => {
  currentSong.pause();
  currentSong.currentTime = 0;
  // currentSong.style.background = `linear-gradient(to right, black 0%, gray 0%)`;

  if (action === "next") {
    current++;
    progress_input.value = 0;

    progress_input.style.background = `linear-gradient(to right, black 0%, gray 0%)`;
    if (current > songs.length - 1) current = 0;
  }
  if (action === "prev") {
    current--;
    progress_input.value = 0;
    progress_input.style.background = `linear-gradient(to right, black 0%, gray 0%)`;

    if (current < 0) current = songs.length - 1;
  }
  currentSong = songs[current].ele;
  songName.textContent = songs[current].audioName;
};

const playPauseSong = () => {
  if (currentSong.paused) {
    currentSong.play();
    currentSong.volume = 0.4;
    playPauseIcon.src = "./assets/pause-solid.svg";
  } else {
    currentSong.pause();
    playPauseIcon.src = "./assets/play-solid.svg";
  }
};

currentSong.addEventListener("timeupdate", function () {
  const value = Math.floor(
    (currentSong.currentTime / currentSong.duration) * 100
  );
  progress_input.value = value;
  progress_input.style.background = `linear-gradient(to right, black ${value}%, gray ${value}%)`;
});
//////////////

// const progress = document.querySelectorAll(".progress");
// progress.forEach((e) => {
//   e.addEventListener("input", function () {
//     const value = this.value;
//     this.style.background = `linear-gradient(to right, black ${value}%, gray ${value}%)`;
//   });
// });

const progress_input = document.querySelector("#input-progress");
const volume_slider = document.querySelector("#input-volume");
// console.log(progress_input.value);

volume_slider.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, black ${value * 100}%, gray ${value * 100}%)`;
  currentSong.volume = value;
});
progress_input.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, black ${value}%, gray ${value}%)`;
  currentSong.currentTime = Math.floor(
    (value / 100) * currentSong.duration - 1
  );
  // console.log("timelin", currentSong.currentTime)
});

