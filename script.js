let songs = [
  {
    name: "Song 1",
    artist: "Artist 1",
    file: "songs/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    name: "Song 2",
    artist: "Artist 2",
    file: "songs/song2.mp3",
    cover: "images/cover2.jpg"
  }
];

let index = 0;
let audio = new Audio(songs[index].file);

let playBtn = document.getElementById("play");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");

let songName = document.getElementById("songName");
let artist = document.getElementById("artist");
let cover = document.getElementById("cover");

// Load song
function loadSong(i) {
  audio.src = songs[i].file;
  songName.innerText = songs[i].name;
  artist.innerText = songs[i].artist;
  cover.src = songs[i].cover;
  audio.play();
  playBtn.innerText = "⏸️";
}

// Play/Pause
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸️";
  } else {
    audio.pause();
    playBtn.innerText = "▶️";
  }
};

// Next
nextBtn.onclick = () => {
  index = (index + 1) % songs.length;
  loadSong(index);
};

// Prev
prevBtn.onclick = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
};

// Progress update
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
};

// Seek
progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

// Volume
volume.oninput = () => {
  audio.volume = volume.value / 100;
};

// Click cards
document.querySelectorAll(".card").forEach(card => {
  card.onclick = () => {
    index = card.dataset.index;
    loadSong(index);
  };
});
