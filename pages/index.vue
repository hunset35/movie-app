<template>
  <div class="home">
    <Hero />
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
        movieLang: {
          EN: 'en-US',
          TW: 'zh-TW'
        },
      }
    },
    async fetch() {
      await this.getMovies()
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
      }
    }
}
</script>
