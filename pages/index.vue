<template>
  <div class="home">
    <!-- <HeadBar /> -->
    <Hero :movieBanner="movieBanner" />
    <VideoModal v-if="showModal" :videoInfo="videoInfo" />
    <!-- search -->
    <div class="container search">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search"
        @change="checkSearch"
        @keyup.enter="$fetch"
      />
      <!-- <div v-show="searchInput !== ''" class="clearBtn" @click="clearSearch">
        <span>x</span>
      </div>
      <div class="searchInput">
      </div>
      <button v-show="searchInput !== ''" class="button" @click="clearSearch">
        Clear Search
      </button> -->
    </div>

    <!-- loading -->
    <Loading v-if="$fetchState.pending" />

    <!-- movies -->
    <div v-if="isSearch" class="container movies">
      <div id="movie-grid" class="movies-grid">
        <div v-for="(movie, index) in movies" :key="index" class="movie">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <!-- <p class="overview">{{ movie.overview }}</p> -->
          </div>
          <div class="movie-info">
            <p class="movie-title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              {{ $t('released') }}:
              {{
                new Date(movie.release_date).toLocaleString('zh-TW', dateOptions)
              }}
            </p>
            <!-- <NuxtLink
              class="button button-light"
              :to="{ name: 'movies-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </NuxtLink> -->
            <button class="button button-light" @click="openViewModal(movie)">
              {{ $t('ViewMovies') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- search movies -->
    <div v-else class="container movies">
      <div id="movie-grid" class="movies-grid">
        <div v-for="(movie, index) in searchMovies" :key="index" class="movie">
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <!-- <p class="overview">{{ movie.overview }}</p> -->
          </div>
          <div class="movie-info">
            <p class="movie-title">
              {{ movie.title.slice(0, 25) }}
              <span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              {{ $t('released') }}:
              {{
                new Date(movie.release_date).toLocaleString('zh-TW', dateOptions)
              }}
            </p>
            <!-- <NuxtLint
              class="button button-light"
              :to="{ name: 'movies-movieid', params: { movieid: movie.id } }"
            >
              Get More Info
            </NuxtLint> -->
            <button class="button button-light" @click="openViewModal(movie)">
              {{ $t('ViewMovies') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Hero from '../components/HeroComponent.vue'
import Loading from '../components/LoadingComponent.vue'
import VideoModal from '../components/VideoComponent.vue'
// import HeadBar from '../components/Nav-bar'
export default {
  name: 'IndexPage',
  components: { Hero, Loading, VideoModal },

  data() {
    return {
      movies: [],
      movieBanner: [],
      searchMovies: [],
      searchInput: '',
      isSearch: true,
      showModal: false,
      videoInfo: '',
      movieLang: {
        EN: 'en-US',
        TW: 'zh-TW',
      },
      dateOptions: {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    }
  },

  async fetch() {
    await this.fetchNetflixOriginals()

    if (this.searchInput === '') {
      await this.getMovies()
      return
    }

    this.isSearch = false
    await this.getSearchMovies()

  },

  head() {
    return {
      title: 'Movie App',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'Home page description',
        },
      ],
    }
  },

  fetchDelay: 1000,
  created() {
    this.$nuxt.$on('close-modal', () => {
      this.showModal = false
    })
  },

  methods: {
    async getMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=${this.movieLang.TW}&page=1`
      )

      const result = await data
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
  
    },
    async getSearchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=${this.movieLang.TW}&page=1&query=${this.searchInput}`
      )

      const result = await data
      result.data.results.forEach((movie) => {
        this.searchMovies.push(movie)
      })
     
    },
    async fetchNetflixOriginals() {
      const data = axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&&with_networks=213&language=${this.movieLang.TW}`
      )
      const result = await data
      this.movieBanner = result.data.results

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
    checkSearch(event) {
      this.searchInput = event.target.value

      if (!this.searchInput) {
        this.searchMovies = []
        this.isSearch = true
      }
    },
    clearSearch() {
      this.searchInput = ''
      this.searchMovies = []
      this.isSearch = true
    },

    async openViewModal(movie) {
      await this.getMovieVideo(movie)
      this.showModal = true
    },
  },
}
</script>

<style lang="scss" scope>
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    position: relative;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .clearBtn {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #ccc;
      border-radius: 50%;
      left: 335px;
      bottom: 43px;
      display: flex;
      justify-content: center;
    }
    .searchInput {
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .movie-info {
          margin-top: auto;
          .movie-title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
