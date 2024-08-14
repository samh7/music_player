const cartoonAudio = new Audio('./sound/Cartoon.mp3');
const forceAudio = new Audio('./sound/force.mp3');
const squeakyAudio = new Audio('./sound/squeaky.mp3');
const hopeAudio = new Audio('./sound/hope.mp3');
const janjiAudio = new Audio('./sound/Janji.mp3');

// selecting elements
const prevBtn = document.querySelector('.previous');
const playBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('.next');
const songName = document.querySelector('.song-name');
const playPauseIcon = document.querySelector('#play-pause-icon');


const songs = [
  { ele: hopeAudio, audioName: 'Hope by NCS' },
  { ele: forceAudio, audioName: 'Force by NCS' },
  { ele: cartoonAudio, audioName: 'Cartoon by NCS' },
  { ele: janjiAudio, audioName: 'Janji by NCS' },
  { ele: squeakyAudio, audioName: 'Squeaky Sound' },
];

for(const song of songs) {
  song.ele.addEventListener('ended', ()=> {
    updateSong('next');
    playPauseSong();
  })
}

let current = 0;
let currentSong = songs[current].ele;
songName.textContent = songs[current].audioName;

playBtn.addEventListener('click',()=> {
  playPauseSong();
})

nextBtn.addEventListener('click', () => {
  updateSong('next');
  playPauseSong();
});

prevBtn.addEventListener('click', () => {
  updateSong('prev');
  playPauseSong();
});

const updateSong = (action)=> {
  currentSong.pause();
  currentSong.currentTime = 0;

  if(action === 'next'){
    current++;
    if(current > songs.length -1) current = 0;
  }
  if(action === 'prev'){
    current--;
    if(current < 0) current = songs.length - 1;
  }
  currentSong = songs[current].ele;
  songName.textContent = songs[current].audioName;
}

const playPauseSong = ()=> {
  if(currentSong.paused){
    currentSong.play();
    playPauseIcon.className = 'ph-bold ph-pause';
  }
  else {
    currentSong.pause();
    playPauseIcon.className = 'ph-bold ph-play';
  }
}