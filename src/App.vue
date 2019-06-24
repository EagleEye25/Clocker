<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <clocker/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import clocker from './components/clocker.vue'

export default {
  name: 'app',
  components: {
    clocker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
