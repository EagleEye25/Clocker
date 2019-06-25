<template>
  <div id="app">
    <addEmployeeCard/>
  </div>
</template>

<script>
import clocker from './components/clocker.vue';
import addEmployee from './components/add-Employee.vue';
import addReason from './components/add-Reason.vue';
import addEmployeeCard from './components/add-EmployeeCard.vue';

export default {
  name: 'app',
  components: {
    clocker,
    addEmployee,
    addReason,
    addEmployeeCard
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
  height: 99%;
  width: 99.5%;
}

html, body {
  overflow: hidden;
}

</style>
