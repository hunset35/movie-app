<template>
  <div class="modal-overlay" @click="$nuxt.$emit('close-modal')">
    <div class="modal">
      <div class="videoView">
        <VideoPlayer :src="videoUrl" :playsinline="playsinline"> </VideoPlayer>
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
    <div v-if="mobileCheck()" class="close" @click="$nuxt.$emit('close-modal')">
      <span>x</span>
    </div>
  </div>
</template>

<script>
import VideoPlayer from 'nuxt-video-player'
require('nuxt-video-player/src/assets/css/main.css')
export default {
  props: ['videoInfo'],
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoUrl: `https://www.youtube.com/watch?v=${this.videoInfo.key}`,
      playsinline: true,
      isMobile: false,
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true,
        },
      },
    }
  },
  methods: {
    mobileCheck() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.isMobile = true
      }
      return this.isMobile
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* display: flex;
  justify-content: center; */
  background-color: #000000da;
  z-index: 99;
}

.modal {
  position: relative;
  text-align: center;
  background-color: #000000da;
  top: 5%;
  /* width: 100%; */
  max-width: 1024px;
  margin: 0 auto;
  border-radius: 20px;
  /* overflow-y: auto; */
}

.videoView {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // height: 100vh;
  height: 100%;
  /* overflow-y: auto; */
}

.close {
  position: absolute;
  top: 1%;
  right: 3%;
  width: 2rem;
  height: 2rem;
  background-color: rgb(80, 80, 80);
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 0.5rem;
  font-size: 1rem;
  pointer-events: none;
  z-index: 999;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}

.close span {
  /* pointer-events: none; */
}

@media screen and (max-width: 900px) {
  .modal {
    max-width: 600px;
  }
}
</style>
