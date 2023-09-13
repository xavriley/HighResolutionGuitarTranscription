let video = document.getElementById('teaser');
let audio1 = document.getElementById('audio1');
let audio2 = document.getElementById('audio2');
let currentAudio = audio1;  // Default to audio1

function selectAudio(trackNumber) {
    // Pause both audio tracks
    audio1.pause();
    audio2.pause();
  
    // Depending on the selected track, set the current time and play
    if (trackNumber === 1) {
      currentAudio = audio1;
    } else if (trackNumber === 2) {
      currentAudio = audio2;
    }
  
    currentAudio.currentTime = video.currentTime;
    currentAudio.play();
  }
  

// Synchronize audio playback with video playback
video.addEventListener('play', function() {
    currentAudio.play();
});

video.addEventListener('pause', function() {
    currentAudio.pause();
});
  

video.addEventListener('timeupdate', function() {
  let activeAudio = audio1.paused ? audio2 : audio1;

  // Only adjust the audio's currentTime if the difference is significant (e.g., more than 0.5 seconds)
  if (Math.abs(activeAudio.currentTime - video.currentTime) > 0.5) {
    activeAudio.currentTime = video.currentTime;
  }
});

// Play the active audio track after seeking
video.addEventListener('seeked', function() {
    let activeAudio = audio1.paused ? audio2 : audio1;
    activeAudio.play();
  });


function playVideo() {
    video.play();
    selectAudio(2);

    // Hide the overlay
    let overlay = document.getElementById('videoOverlay');
    overlay.style.display = 'none';
}