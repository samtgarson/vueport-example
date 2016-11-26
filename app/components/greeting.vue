<script>
  export default {
    props: {
      name: String
    },
    data () {
      return {
        greeting: 'Hello'
      }
    }
  }
</script>
<template>
  <h1>{{greeting}}, {{name}}!</h1>
</template>
<style scoped>
  h1 {
    color: blue;
  }
</style>
