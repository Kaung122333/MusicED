let progress = document.querySelector('#progress');
let song = document.querySelector('#song');
let ctrlIcon = document.querySelector('#ctrl');
let time = document.querySelector('#time'); 
const songImg = document.querySelector("#song-img");
const nextButton = document.querySelector('#nextButton');
const preButton = document.querySelector('#preButton');
const name = document.querySelector('#n');
const artist = document.querySelector('#a');
const musicPlayer = document.querySelector('#musicPlayer');

let isPlaying = false;

const songs = [
    
    {songName: 'Shape Of You', artist: 'Ed Sheeran', source: 'music/Ed Sheeran - Shape Of You [Official Lyric Video].mp3'},
    {songName: 'Bad Habit', artist: 'Ed Sheeran', source:'music/Bad Habits - Ed Sheeran.m4a'},
    {songName: 'Perfect', artist: 'Ed Sheeran', source: 'music/05 Perfect.mp3'},
    {songName: 'Photograph', artist: 'Ed Sheeran', source:'music/photograph   ed sheeran.mp3'},
    {songName: 'Thinking Out Loud', artist: 'Ed Sheeran', source:'music/AUD-20220119-WA0081.mp3'}
];


song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
    setInterval(() => {
        if (isPlaying) {
            progress.value = song.currentTime;
        }
    }, 500);
};

function playPause() {
    if(ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        songImg.style.border = '3px solid rgb(255, 255, 255)';
        isPlaying = false;
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
        showText();
    }
    else{
        songImg.style.border = '8px solid #4d4e4d';
        song.play();
        isPlaying = true;
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
        showText();

    }
}

// if(song.play()){
//     ctrlIcon.classList.add('fa-pause');
//     ctrlIcon.classList.remove('fa-play');
//     setInterval(() => {
//         progress.value = song.currentTime;
//     }, 500);
// }

progress.onchange = function() {
    song.play();
    songImg.style.border = '3px solid #4d4e4d';
    isPlaying = false;
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

const kyarChainAndLatalShi = (t) => {
        const minute = Math.floor(t/60);
        const seconde = t%60;
        
        const minText = minute < 10 ? "0" + minute.toString() :minute;
        const secText = seconde < 10 ? "0" + seconde.toString() : seconde;
        return minText + ":" + secText;
    }
    
    let kyarChain = 0;
    let kyarText = "00:00";
    song.addEventListener("loadeddata", () => {
     kyarChain = Math.floor(song.duration);
     kyarText = kyarChainAndLatalShi(kyarChain);

     
})

song.addEventListener("timeupdate", () => {
    const current = Math.floor(song.currentTime);
    const currentText = kyarChainAndLatalShi(current);

    const kyarAndRun = currentText + "/" + kyarText;

    time.innerHTML = kyarAndRun;
});

let currentSong = -1;
nextButton.addEventListener('click',() => {
    currentSong++;
    if (currentSong >= songs.length) {
     currentSong = 0;
     showText();

    }
    isPlaying = true;
    song.src = songs[currentSong].source;
    showText();

    if (ctrlIcon.classList.contains('fa-play')) {
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
    artist.innerHTML = songs[currentSong].artist;
    name.innerHTML = songs[currentSong].songName;
     
    song.play();
   

})

preButton.addEventListener('click', () => {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    song.src = songs[currentSong].source;
    isPlaying = true;
    if (ctrlIcon.classList.contains('fa-play')) {
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
    artist.innerHTML = songs[currentSong].artist;
    name.innerHTML = songs[currentSong].songName;
    song.play();
    showText()
});


function showText() {
    const total = songs.length;
    const current = currentSong + 1; // Add 1 to make it 1-based instead of 0-based index
    
    // Get the element where you want to display the text
    const songCounter = document.getElementById('songCounter');
    
    // Update the text content of the element
    songCounter.textContent = current + '/' + total;
}
const musicListParent = document.querySelector('#music-list');
const bars = document.querySelector('#bars');
const barsParent = document.querySelector('#barsParent');
barsParent.addEventListener('click', (e) => {
    musicPlayer.classList.toggle('part');
    if(e.target.tagName === 'LI'){
        musicListParent.style.display = 'none';
    }
    BarsOandC();
  
});

function BarsOandC() {
    if (bars.classList.contains('fa-bars')) {
        bars.classList.remove('fa-bars');
        bars.classList.add('fa-xmark');
        musicListParent.style.display = 'block';
   }
    else{
    if(bars.classList.contains('fa-xmark')){
        bars.classList.remove('fa-xmark');
        bars.classList.add('fa-bars');
        musicListParent.style.display = 'none';
    };
        }
}



const musicList = document.querySelector('#musicList');

function getMusic () {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.setAttribute('data-song',song.source);
        li.textContent = `${song.songName} - ${song.artist}`;
        musicList.appendChild(li);
        
        //click to open song 
        li.addEventListener('click',() => {
            selectedSong(song.source);
            updateBefore(`${song.songName} - ${song.artist}`);
            
        }); 
    })
}

//function to play selected song
function selectedSong (source) {
    const currentSongIndex = songs.findIndex((song) => song.source === source);
    if (currentSongIndex !== -1) {
        currentSong = currentSongIndex;
        song.src = source;
        artist.textContent = songs[currentSong].artist;
        name.textContent = songs[currentSong].songName;
        song.play();
        if (ctrlIcon.classList.contains('fa-play')) {
            ctrlIcon.classList.remove('fa-play');
            ctrlIcon.classList.add('fa-pause');
        }
    }
}

function updateBefore (text) {
    const before = document.querySelector('.part:before');
    before.textContent = text;
}

getMusic();





