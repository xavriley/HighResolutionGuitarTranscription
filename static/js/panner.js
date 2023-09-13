// let video = document.getElementById('teaser');
// let audio1 = document.getElementById('audio1');
// let audio2 = document.getElementById('audio2');
// let currentAudio = audio1;  // Default to audio1

// function selectAudio(trackNumber) {
//     // Pause both audio tracks
//     audio1.pause();
//     audio2.pause();
  
//     // Depending on the selected track, set the current time and play
//     if (trackNumber === 1) {
//       currentAudio = audio1;
//     } else if (trackNumber === 2) {
//       currentAudio = audio2;
//     }
  
//     currentAudio.currentTime = video.currentTime;
//     currentAudio.play();
//   }
  

// // Synchronize audio playback with video playback
// video.addEventListener('play', function() {
//     currentAudio.play();
// });

// video.addEventListener('pause', function() {
//     currentAudio.pause();
// });
  

// video.addEventListener('timeupdate', function() {
//   let activeAudio = audio1.paused ? audio2 : audio1;

//   // Only adjust the audio's currentTime if the difference is significant (e.g., more than 0.5 seconds)
//   if (Math.abs(activeAudio.currentTime - video.currentTime) > 0.5) {
//     activeAudio.currentTime = video.currentTime;
//   }
// });

// // Play the active audio track after seeking
// video.addEventListener('seeked', function() {
//     let activeAudio = audio1.paused ? audio2 : audio1;
//     activeAudio.play();
//   });


// function playVideo() {
//     video.play();
//     selectAudio(2);

//     // Hide the overlay
//     let overlay = document.getElementById('videoOverlay');
//     overlay.style.display = 'none';
// }

class VideoAudioPlayer {
    constructor(container) {
      this.container = container;
      this.video = container.querySelector('.video-player');
      this.audios = container.querySelectorAll('.audio-track');
      this.overlay = container.querySelector('.video-overlay');
      this.playBtn = container.querySelector('.play-btn');
      this.currentAudio = this.audios[1];  // Default to the first audio
  
      this.initEvents();
    }
  
    initEvents() {
      this.video.addEventListener('play', () => this.currentAudio.play());
      this.video.addEventListener('pause', () => this.currentAudio.pause());
      this.video.addEventListener('seeked', () => this.currentAudio.play());
      this.video.addEventListener('timeupdate', this.syncAudio.bind(this));
  
      this.playBtn.addEventListener('click', this.playVideo.bind(this));
  
      this.container.querySelectorAll('.select-audio').forEach((btn, index) => {
        btn.addEventListener('click', () => this.selectAudio(index));
      });
    }
  
    playVideo() {
      this.video.play();
      this.overlay.style.display = 'none';
    }
  
    selectAudio(index) {
      this.audios.forEach(audio => audio.pause());
      this.currentAudio = this.audios[index];
      this.currentAudio.currentTime = this.video.currentTime;
      this.currentAudio.play();
    }
  
    syncAudio() {
      if (Math.abs(this.currentAudio.currentTime - this.video.currentTime) > 0.5) {
        this.currentAudio.currentTime = this.video.currentTime;
      }
    }
  }
  
  // Initialize for each video container
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.video-container').forEach(container => {
        console.log(container);
        new VideoAudioPlayer(container);
    });
    });