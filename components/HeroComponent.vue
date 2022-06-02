<template>
  <div class="hero">
    <img :src="bannerImg" alt="" />
    <div class="text-container">
      <div class="text">
        <h1 class="title">
          {{ bannerInfo.title || bannerInfo.name || bannerInfo.original_name }}
        </h1>
        <!-- <span class="mini-heading">Now Stremaing</span> -->
        <!-- <h1><span>Now</span> Streaming</h1> -->
        <p class="overview">
          {{ bannerInfo.overview.slice(0, 200)
          }}<span v-if="bannerInfo.overview.length > 200">...</span>
        </p>

        <button class="button" @click="handleModal">
          {{ $t('ViewMovies') }}
        </button>
      </div>
    </div>
    <VideoModal v-if="showModal" :videoInfo="videoInfo" />
    <!-- <button @click="handleModal">show modal</button> -->
  </div>
</template>

<script>
import axios from 'axios'
import VideoModal from './VideoComponent.vue'
export default {
  name: 'HeroComponent',
  props: ['movieBanner'],
  components: {
    VideoModal,
  },
  data() {
    return {
      bannerInfo: '',
      bannerImg: '',
      baseUrl: 'https://image.tmdb.org/t/p/original/',
      showModal: false,
      videoInfo: '',
    }
  },
  async fetch() {
    await this.getMovieBanner()
    await this.getMovieVideo(this.bannerInfo)
    await this.changeBanner()
  },
  created() {
    this.$nuxt.$on('close-modal', () => {
      this.showModal = false
    })
  },

  methods: {
    changeBanner() {
      setInterval(() => {
        this.getMovieBanner()
      }, 10000)
    },
    getMovieBanner() {
      this.bannerInfo = this.movieBanner[Math.floor(Math.random() * this.movieBanner.length)]
      this.bannerImg = this.baseUrl + this.bannerInfo.backdrop_path || this.bannerInfo.poster_path
    },
    async getMovieVideo(movie) {
      const data = axios.get(
        `https://api.themoviedb.org/3/${
          movie.media_type === 'tv' ? 'tv' : 'movie'
        }/${
          movie.id
        }/videos?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=zh-TW`
      )

      let result = await data

      if (result.data.results.length === 0) {
        const dataUS = axios.get(
          `https://api.themoviedb.org/3/${
            movie.media_type === 'tv' ? 'tv' : 'movie'
          }/${
            movie.id
          }/videos?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`
        )

        result = await dataUS
      }

      result.data.results.forEach((item) => {
        if (item.type === 'Trailer') {
          this.videoInfo = item
        }
      })
    },
    handleModal() {
      this.showModal = true
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  height: 400px;
  position: relative;
  @media (min-width: 750px) {
    height: 500px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-container {
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .text {
      padding: 0 16px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }
    .title {
      font-size: 3.5rem;
      font-weight: bold;
    }
    .overview {
      color: #fff;
      margin: 10px 0;
      max-width: 50%;
    }
    .mini-heading {
      font-weight: 600;
      font-size: 18px;
      text-transform: uppercase;
      color: #c92502;
      margin-bottom: 8px;
      @media (min-width: 750px) {
        font-size: 22px;
      }
    }
    h1 {
      color: #fff;
      font-size: 64px;
      font-weight: 200;
      margin-bottom: 8px;
      @media (min-width: 750px) {
        font-size: 84px;
      }
      span {
        font-weight: 500;
      }
    }
    .button {
      font-size: 20px;
      align-self: flex-start;
    }

    @media screen and (max-width: 768px) {
      .title {
        font-size: 2.5rem;
      }
      .overview {
        max-width: 70%;
      }
    }

    @media screen and (max-width: 480px) {
      .title {
        font-size: 1.5rem;
      }
      .overview {
        max-width: 90%;
      }
    }
  }
}
</style>
