// var hellp = require("s")
const audio = document.querySelector("audio");
audio.onloadedmetadata = (e) => {
  console.log("e => ", e);
};
console.log(audio);
// audio.play();

var sound = new Howl({
  src: ["Chris Brown - No One Else (Lyrics) ft. Fridayy.mp3"],
  autoplay: false,
  loop: true,
//   0 -> 10
  volume: 0.5,
  onend: function () {
    console.log("Finished!");
  },
});

document.getElementById("play").addEventListener("click", () => {
  sound.play();
});
document.getElementById("stop").addEventListener("click", () => {
  sound.pause();
});
