    const d = document;

const $video = d.getElementById('song'),
    $btnPlay = d.getElementById('btn-action'),
    $prevBtn = d.getElementById('prev'),
    $nextBtn = d.getElementById('next'),
    $bar = d.getElementById('progress'),
    $progressBar = d.getElementById('progress-bar'),
    $barProgressTime = d.getElementById('progress-time'),
    $barLimitTime = d.getElementById('max-time');


const $title = d.querySelector('.title-sound'),
    $artits = d.querySelector('.artist'),
    $img = d.querySelector('.img-fluid');

let maximo = 350, 
    minutes = 0, 
    seconds = 0, 
    hours = 0, 
    currentImages = 0;

const arrData = [
    {src: 'forest-lullaby-110624.mp3', author: 'Lesfm', title: 'Forest Lullaby', img:'cover-2.png'},
    {src: 'lost-in-city-lights-145038.mp3', author: 'Cosmos Sheldrake', title: 'Lost in the City Ligths', img:'cover-1.png'}
];


$video.addEventListener('loadeddata', (e) => {
    let time = (e.target.duration / 60) % 60,
        timer = time.toFixed(1).split(".");

   if(timer.length === 1){
    $barLimitTime.textContent = `
        00:${parseInt(timer[0]) < 10 ? '0'+timer[0] : timer[0]}
    `;
   }

   if(timer.length === 2){
    $barLimitTime.textContent = `
        ${parseInt(timer[0]) < 10 ? '0'+timer[0] : timer[0]}:${parseInt(timer[1]) < 10 ? '0'+timer[1] : timer[1]}
    `;
   }

   if(timer.length === 3){
    $barLimitTime.textContent = `
        ${parseInt(timer[0]) < 10 ? '0'+timer[0] : timer[0]}:${parseInt(timer[1]) < 10 ? '0'+timer[1] : timer[1]}:${parseInt(timer[2]) < 10 ? '0'+timer[2] : timer[2]}
    `;
   }
});
 
const estadoBarraProgreso = () => {
    if(!$video.paused && !$video.ended){

        seconds += 1;

        if(seconds > 58){
            minutes += 1;
            seconds = 0;
        }

        $barProgressTime.textContent = ` 
            ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0'+seconds : seconds}
        `;

        let total = parseInt($video.currentTime * maximo / $video.duration);
        
        $bar.style.width = total+"px";
    }
}

const adelantandoBarraProgreso = (event) => {
    if(!$video.paused && !$video.ended){

        let position = event.pageX - $progressBar.offsetLeft, 
            durationVideo = position * $video.duration / maximo;

        $video.currentTime = durationVideo;

        seconds = parseInt(durationVideo);

        if(seconds > 58){
            minutes += 1;
            seconds = 0;
        }else{
            minutes = 0;
        }

        $barProgressTime.textContent = `
            ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0'+seconds : seconds}
        `;
        
        $bar.style.width = durationVideo+"px";
    }
   
}

d.addEventListener('click', (e) => {

    if(e.target === $btnPlay){
        let interval;
       if($video.paused && !$video.ended){
            $video.play();
            e.target.innerHTML = `
                <img src='./dccl--javascript-music-player/Stop_and_play_fill_reverse.svg' style="background-color: var(--primary-color); color: #fff !important;">
            `;
            if($bar.style.width < maximo)
                interval = setInterval(estadoBarraProgreso, 1000);
       }else{
            $video.pause();
            e.target.innerHTML = `
                <img src='./dccl--javascript-music-player/Play_fill.svg' style="background-color: var(--primary-color);">
            `;
            clearInterval(interval);
       }

   
    }

    if(e.target === $progressBar){
        adelantandoBarraProgreso(e);
    }

    if(e.target === $bar){
        adelantandoBarraProgreso(e);
    }

    if(e.target === $prevBtn){
       
        currentImages--;

        if(currentImages < 1){
            currentImages = 0;
        }

        $video.currentTime = 0;
        $bar.style.width = '0px';
        seconds = 0;

        $barProgressTime.textContent = ` 
            00:00
        `;

        $img.src = `./dccl--javascript-music-player/${arrData[currentImages].img}`;
        $img.alt = "Images "+currentImages;
        $title.textContent = arrData[currentImages].title;
        $artits.textContent = arrData[currentImages].author;
        $video.src = `./dccl--javascript-music-player/${arrData[currentImages].src}`;
    }

    if(e.target === $nextBtn){
        currentImages++;

        if(currentImages >= arrData.length){
            currentImages = arrData.length-1;
        }

        $video.currentTime = 0;
        $bar.style.width = '0px';
        seconds = 0;

        $barProgressTime.textContent = ` 
            00:00
        `;

        $img.src = `./dccl--javascript-music-player/${arrData[currentImages].img}`;
        $img.alt = "Images "+currentImages;
        $title.textContent = arrData[currentImages].title;
        $artits.textContent = arrData[currentImages].author;
        $video.src = `./dccl--javascript-music-player/${arrData[currentImages].src}`;
    }

});