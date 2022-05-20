<template>
  <div class="home">
    <Hero />

    <!-- search -->
    <div class="container search">
      <input v-model="searchInput"  type="text" placeholder="Search" @keyup.enter="$fetch">
      <button v-show=" searchInput !== ''" class="button">Clear Search</button>
    </div>

    <!-- movies -->
    <div class="container movies">
      <div id="movie-grid" class="movies-grid">
        <div v-for="(movie, index) in movies" :key="index" class="movie">
          <div class="movie-img">
            <img 
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            >
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>           
            </div>
            <div class="movie-info">
              <p class="movie-title">
                {{ movie.title.slice(0, 25) }}
                <span v-if="movie.title.length > 25">...</span>
              </p>
              <p class="release">
                Released:
                {{
                  new Date(movie.release_date).toLocaleString('en-us', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                }}
              </p>
              <NuxtLint 
                class="button button-light"
                :to="{name: 'movies-movieid', params: { movieid: movie.id}}"
              >
              Get More Info
              </NuxtLint>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Hero from '../components/HeroComponent.vue';
export default {
    name: "IndexPage",
    components: { Hero },
    data() {
      return {
        movies: [],
        searchMovies: [],
        searchInput: '',
        movieLang: {
          EN: 'en-US',
          TW: 'zh-TW'
        },
      }
    },

    async fetch() {
      if(this.searchInput === '') {
        await this.getMovies()
        return
      }
      await this.getSearchMovies()

      // if(this.searchInput !== '') {
      //   await this.getSearchMovies()
      // }
    },
    computed: {
      // handleSearch(event) {
      //   console.log(event)
      // }
    },
    methods: {
      async getMovies() {
        const data = axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=${this.movieLang.EN}&page=1`
        )

        const result = await data
        result.data.results.forEach(movie => {
          this.movies.push(movie)
        })
        console.log(this.movies)
      },
      async getSearchMovies() {
        const data = axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=1&query=${this.searchInput}`
        )

        const result = await data
        result.data.results.forEach((movie) => {
          this.searchMovies.push(movie)
        })

        console.log(this.searchMovies)
      },
    }
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
