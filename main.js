/* Elementlere ulasmak */

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sira
let index = 4;

//dongu
let loop = true;

//json verisi
const songsList = [
  {
    name: "Adi Bahtiyar",
    link: "assets/Ahmet Kaya Adı Bahtiyar.mp3",
    artist: "Ahmet Kaya",
    image: "./assets/Ahmet-Kaya-Dosta-Dusmana-Karsi-1998.jpg",
  },

  {
    name: "Adi Yilmaz",
    link: "assets/Ahmet Kaya Adı Yılmaz.mp3",
    artist: "Ahmet Kaya",
    image: "./assets/Ahmet-Kaya-Ulkemde-Son-Turnem-2010.jpg",
  },

  {
    name: "Hani Benim Gencligim",
    link: "assets/Ahmet Kaya Hani Benim Gençliğim.mp3",
    artist: "Ahmet Kaya",
    image: "./assets/Ahmet-Kaya-Dosta-Dusmana-Karsi-1998.jpg",
  },

  {
    name: "Korkarim",
    link: "assets/Ahmet Kaya Korkarım.mp3",
    artist: "Ahmet Kaya",
    image: "./assets/Ahmet-Kaya-Ulkemde-Son-Turnem-2010.jpg",
  },

  {
    name: "Nereden Bileceksiniz",
    link: "assets/Ahmet Kaya Nereden Bileceksiniz.mp3",
    artist: "Ahmet Kaya",
    image: "./assets/Ahmet-Kaya-Dosta-Dusmana-Karsi-1998.jpg",
  },

  {
    name: "Ah Aksamlar",
    link: "assets/Ferdi Tayfur Ah Akşamlar.mp3",
    artist: "Ferdi Tayfur",
    image: "./assets/Ferdi-Tayfur-Bana-Da-Soyle-1991.jpg",
  },

  {
    name: "Kader",
    link: "assets/Ferdi Tayfur Canıma Yetti Kader.mp3",
    artist: "Ferdi Tayfur",
    image: "./assets/Ferdi-Tayfur-Durun-Ayaklarim.jpg",
  },

  {
    name: "Cano",
    link: "assets/Ferdi Tayfur Cano.mp3",
    artist: "Ferdi Tayfur",
    image: "./assets/Ferdi-Tayfur-Inceden-2002.jpg",
  },

  {
    name: "Vazgeç Gönlüm",
    link: "assets/Melek Mosso Vazgeç Gönlüm.mp3",
    artist: "Melek Mosso",
    image: "./assets/Melek-Mosso-Karanfil-2022-61.jpg",
  },

  {
    name: "Gönül Dağı",
    link: "assets/Neşet Ertaş Gönül Dağı.mp3",
    artist: "Neşet Ertaş",
    image: "./assets/Neset-Ertas-Ayas-Yollari-2000.jpg",
  },

  {
    name: "Hata Benim",
    link: "assets/Neşet Ertaş Hata Benim.mp3",
    artist: "Neşet Ertaş",
    image: "./assets/Neset-Ertas-Hata-Benim-2000.jpg",
  },

  {
    name: "Yazımı Kışa Çevirdin",
    link: "assets/Neşet Ertaş Yazımı Kışa Çevirdin.mp3",
    artist: "Neşet Ertaş",
    image: "./assets/Neset-Ertas-Ayas-Yollari-2000.jpg",
  },

  {
    name: "İnkar Etme",
    link: "assets/Nilüfer İnkar Etme.mp3",
    artist: "Nilüfer",
    image: "./assets/Nilufer-Sen-Muhimsin-1990.jpg",
  },

  {
    name: "Hacel Obası",
    link: "assets/Selda Bağcan Hacel Obası.mp3",
    artist: "Selda Bağcan",
    image: "./assets/Selda-Bagcan-Anadolu-Ezgileri-1993.jpg",
  },
];

//oynat
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide"); // goster
  playButton.classList.add("hide"); //gizle
};

//durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};
/*  
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
*/
//sarki ata
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];

  songName.innerHTML = name; //dinle
  audio.src = link;
  songArtist.innerHTML = artist;
  songImage.src = image;
  console.log(artist);

  audio.onloadedmetadata = () => {
    //saniye hesapla
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  playAudio();
};

//surekli saniye kontrolu yap
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
  //progress i ilerletecegiz 30%
  currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

//sarki suresi degisim kismi tiklanildiginda
progressBar.addEventListener('click',(event)=>{

  //baslangic
  let coordStart = progressBar.getBoundingClientRect().left
  console.log(coordStart)

  //x ekseninde tiklama noktasi 
  let coordEnd = event.clientX
  console.log(coordEnd)
  console.log(progressBar.offsetWidth)

  //yuzdelik olarak hesaplama yap
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth
  console.log(progress)

  //progress i ilerlet
  currentProgress.style.width = progress * 100 + "%"

  //sesin anlik suresini degistir
  audio.currentTime = progress * audio.duration

  audio.play()
  pauseButton.classList.remove('hide')
  playButton.classList.add('hide')
})

//zaman formatla
const timeFormatter = (timeInput) =>{
  let minute = Math.floor(timeInput / 60)
  minute = minute < 10 ? "0"+minute : minute
  let second = Math.floor(timeInput % 60)
  second = second < 10 ? "0"+second : second
  return `${minute}:${second}`
}

const previousSong = () =>{
  if (index > 0) {
      pauseAudio()
      index = index - 1
  } else {
      index = songsList.length - 1
  }
  setSong(index)
}

const nextSong = () =>{
  if (loop) {
      if (index == (songsList.length - 1)) {
          index = 0
      }else {
          index = index  + 1
      }
      setSong(index)
  } else {
      let randIndex = Math.floor(Math.random() * songsList.length)
      setSong(randIndex)
  }

}

//tekrar butonuna tiklanildiginda
repeatButton.addEventListener('click', ()=>{
  if (repeatButton.classList.contains('active')) {
      repeatButton.classList.remove('active')
      audio.loop = false
  } else {
      repeatButton.classList.add('active')
      audio.loop = true
  }
})

//karistirici tiklanildiginda
shuffleButton.addEventListener('click',()=>{
  if (shuffleButton.classList.contains('active')) {
      shuffleButton.classList.remove('active')
      audio.loop = true
  } else {
      shuffleButton.classList.add('active')
      audio.loop = false
  }
})

//sarki bittiginde,
audio.onended = () =>{
  nextSong() //sonraki sarkiyi cagir
}

playListButton.addEventListener('click',()=>{
  playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',()=>{
  playListContainer.classList.add('hide')
})

//oynat butonuna tiklanildiginda
playButton.addEventListener('click',playAudio)

//durdur butonuna tiklanildiginda
pauseButton.addEventListener('click', pauseAudio)

//onceki tiklanirsa
prevButton.addEventListener('click',previousSong)

//sonraki tiklanildiginda
nextButton.addEventListener('click',nextSong)


const initializePlaylist = () =>{
  for(let i in songsList){
      playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
       <span id="playlist-song-name">
        ${songsList[i].name}
       </span>
       <span id="playlist-song-artist-album">
       ${songsList[i].artist}
       </span>
      </div>
     </li>
     `
  }
}

window.onload = () => {
  index = 0
  setSong(index)
  pauseAudio()
  initializePlaylist()
}