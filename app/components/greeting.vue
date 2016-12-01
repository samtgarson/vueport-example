<script>
  export default {
    props: {
      name: String,
      obj: Object
    },
    data () {
      return {
        greeting: 'Hello'
      }
    }
  }
</script>
<template>
<div>
  <h1>{{greeting}}, {{name}}!</h1>
  <h1>{{obj.name}}!</h1>
</div>
</template>
<style scoped>
  h1 {
    color: blue;
  }
</style>
