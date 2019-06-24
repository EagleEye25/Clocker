<template>
  <div id="app">
    <addEmployee/>
  </div>
</template>

<script>
// import clocker from './components/clocker.vue';
import addEmployee from './components/add-Employee.vue';

export default {
  name: 'app',
  components: {
    addEmployee
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
