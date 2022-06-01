<template>
  <div class="modal-overlay">
 
    <div class="modal">
        <div class="videoView">
            <VideoPlayer :src="videoUrl">
    
            </VideoPlayer>
        </div>
        <!-- <iframe 
            width="100%" 
            height="100%" 
            :src="videoUrl" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        >
        </iframe> -->
      <!-- <img class="check" src="~/assets/check-icon.png" alt="" />
      <h6>Saved!</h6>
      <p>Your Details have been saved Successfully</p>
      <p>{{videoInfo}}</p>
      
      <button>Go Home</button>/ -->
    </div>
    <div class="close" >
        <span>x</span>
        <!-- <img class="close-img" src="~/assets/close-icon.svg" alt="" /> -->
    </div>
  </div>
</template>

<script>
import VideoPlayer from 'nuxt-video-player'
require('nuxt-video-player/src/assets/css/main.css')

export default {
    props: ['videoInfo'],
    components: {
        VideoPlayer
    },
    data() {
        return {
            videoUrl: `https://www.youtube.com/watch?v=${this.videoInfo.key}`
        }
    }

    
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 999;
}

.modal {
  position: relative;
  text-align: center;
  background-color: #000000da;
  /* height: 100%; */
  width: 100%;
  max-width: 1024px;
  /* margin-top: 10%;
  padding: 60px 0; */
  border-radius: 20px;
}

.videoView {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.close {
    position: absolute;
    top: 5%;
    right: 5%;
    width: 1.9rem;
    height: 1.9rem;
    background-color: rgb(80, 80, 80);
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    line-height: .5rem;
    font-size: 1rem;
}
</style>