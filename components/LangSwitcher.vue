<template>
  <select v-model="$store.state.lang" @change="setLang($store.state.lang)">
    <option v-for="item in optionLang" :value="item.value" :key="item.id">
      {{ item.text }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      optionLang: [
        { text: 'English', value: 'en', id: 1 },
        { text: '中文', value: 'zh', id: 2 },
      ],
    }
  },
  methods: {
    setLang(value) {
      this.$store.commit('setLang', value)
      this.$i18n.locale = value
    },
  },
}
</script>
