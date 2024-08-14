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
const repeatBtn = document.querySelector(".repeat-button");
const shuffleBtn = document.querySelector(".shuffle-button");
const favBtn = document.querySelector(".fav-button");
const lyricsBtn = document.querySelector(".lyrics");
const imageBox = document.querySelector(".image-box");
const startTimeline = document.getElementById("start-timeline");
const endTimeline = document.getElementById("end-timeline");
const sleepBtn = document.querySelector(".sleep-button");
let repeat = false;
let shuffle = false;
let mute = false;
const modal = document.querySelector(".modal");

// let fav = false;
const songs = [
  { ele: hopeAudio, audioName: "Hope", fav: false },
  { ele: forceAudio, audioName: "Force", fav: false },
  { ele: cartoonAudio, audioName: "Cartoon", fav: false },
  { ele: janjiAudio, audioName: "Janji", fav: false },
];

for (const song of songs) {
  song.ele.addEventListener("ended", () => {
    if (repeat) {
      playPauseSong();
      return;
    }
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

repeatBtn.addEventListener("click", function () {
  if (repeat) {
    this.src = "assets/icons/repeat.svg";
  } else {
    this.src = "assets/icons/repeat-on.svg";
  }
  repeat = !repeat;
});

shuffleBtn.addEventListener("click", function () {
  shuffle = !shuffle;

  if (shuffle) {
    this.src = "assets/icons/shuffle.svg";
  } else {
    this.src = "assets/icons/shuffle-gray.svg";
  }
});

favBtn.addEventListener("onload", function () {
  // songs[current].fav = !songs[current].fav;
  if (songs[current].fav) {
    this.src = "assets/icons/heart-full.svg";
  } else {
    this.src = "assets/icons/heart.svg";
  }
});
favBtn.addEventListener("click", function () {
  songs[current].fav = !songs[current].fav;
  if (songs[current].fav) {
    this.src = "assets/icons/heart-full.svg";
  } else {
    this.src = "assets/icons/heart.svg";
  }
});
document.querySelector(".mute").addEventListener("click", function () {
  currentSong.volume = 0;
  mute = true;
  volume_slider.style.background = `linear-gradient(to right, black ${0}%, gray ${0}%)`;
  volume_slider.value = 0;
});
document.querySelector(".full-volume").addEventListener("click", function () {
  currentSong.volume = 1;
  mute = false;
  volume_slider.style.background = `linear-gradient(to right, black ${100}%, gray ${100}%)`;
  volume_slider.value = 1;
});

sleepBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

let lyrics = false;
lyricsBtn.addEventListener("click", function () {
  lyrics = !lyrics;
  if (lyrics) {
    imageBox.innerHTML =
      "<div class='cover-image object-cover rounded-md grid place-items-center border-2'>No Embedded Lyrics Found.</div>";
  } else {
    imageBox.innerHTML = `<img
        src="./assets/girl.png"
        class="cover-image object-cover rounded-md"
        alt=""
      />`;
  }
});

const updateSong = (action) => {
  currentSong.pause();
  currentSong.currentTime = 0;

  if (action === "next") {
    if (shuffle) {
      current = Math.floor(Math.random() * songs.length);
    } else {
      current++;
    }
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
  if (songs[current].fav) {
    favBtn.src = "assets/icons/heart-full.svg";
  } else {
    favBtn.src = "assets/icons/heart.svg";
  }
  currentSong = songs[current].ele;

  songName.textContent = songs[current].audioName;
};

const playPauseSong = () => {
  if (currentSong.paused) {
    currentSong.play();

    currentSong.volume = volume_slider.value;

    playPauseIcon.src = "./assets/icons/play.svg";
  } else {
    currentSong.pause();
    playPauseIcon.src = "./assets/icons/pause.svg";
  }

  currentSong.addEventListener("timeupdate", function () {
    const value = (currentSong.currentTime / currentSong.duration) * 100;
    progress_input.value = value;
    progress_input.style.background = `linear-gradient(to right, black ${value}%, gray ${value}%)`;
    const duration = currentSong.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.round(duration % 60);
    endTimeline.innerHTML = `${getTwoNumber(minutes)}:${getTwoNumber(seconds)}`;
    const currentMinutes = Math.floor(currentSong.currentTime / 60);
    const currentSeconds = Math.round(currentSong.currentTime % 60);
    startTimeline.innerHTML = `${getTwoNumber(currentMinutes)}:${getTwoNumber(
      currentSeconds
    )}`;
  });
};

const getTwoNumber = (number) => {
  if (`${number}`.length < 2) {
    if (number === 0) return "00";
    return `0${number}`;
  }
  return `${number}`;
};

//////////////

const progress_input = document.querySelector("#input-progress");
const volume_slider = document.querySelector("#input-volume");

volume_slider.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, black ${
    value * 100
  }%, gray ${value * 100}%)`;
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

const setTimer = document.querySelector(".set-timer");
const unsetTimer = document.querySelector(".unset-timer");
const closeModal = document.querySelector(".close-modal");
const timerInput = document.querySelector(".timer-value");

function asyncCounter(
  max,
  { onFinished = (max) => {}, onCount = ({ payload, max, current }) => {} } = {}
) {
  let count;
  const counter = new Promise((resolve) => {
    let current = 0;
    count = (payload) => {
      if (++current >= max) {
        resolve(max);
      }

      onCount({ payload, current, max });
      return current;
    };
  });
  counter.count = count;
  counter.then(onFinished);
  return counter;
}

let isTimer = false;

unsetTimer.addEventListener("click", function () {
  isTimer = false;
  unsetTimer.classList.add("cursor-not-allowed");
  modal.classList.add("hidden");
});

setTimer.addEventListener("click", function () {
  const counter = asyncCounter(1);
  isTimer = true;
  unsetTimer.classList.remove("cursor-not-allowed");
  const logWhenFinished = async () => {
    modal.classList.add("hidden");

    const timer = await counter;
    console.log("timer rimer ");
    if (isTimer) {
      if (!currentSong.paused) {
        playPauseSong();
      }
    }
  };
  logWhenFinished();
  setTimeout(() => counter.count(), timerInput.value);
  // setTimeout(() => counter.count(), 1000);
});

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

// const logWhenFinished = async () =>
//   console.log(`Finished counting to ${await counter}!`);

// // Somewhere else, async code
// setTimeout(() => counter.count(), 500);
// setTimeout(() => counter.count(), 1000);
// // `counter` resolves the second time `counter.count` is called

// logWhenFinished();
// // Output after a second:
