<template>
  <div>
    <img class="center" src="../../public/pictures/lock.png" alt="Lock Image">
    <!-- Hides input off screen -->
    <!-- <div class="outer"> -->
      <!-- <div class="inner"> -->
        <input v-model="tag" type="text" autofocus @keyup.enter="onEnter">
      <!-- </div> -->
    <!-- </div> -->
    <h1 style="color:white;">Please Scan Your Employee Card</h1>
    <p style="color:white;"> {{ tag }} </p>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'clocker',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        tag: ''
      }
    },

    methods: {
      onEnter() {
        axios.get(`http://localhost:3000/api/clocking/clockProcess/{{ tag }}`)
          .then((res) =>{
            console.log(res);
          })
          .catch(e => console.log(e));
      }
    }

    // watch: {
    //   tag: function (newTag, old) {
    //     this.temp = newTag;
    //     // this.tag = 'hdjffhdj';
    //   }
    // }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  div {
    background-color: rgb(31, 83, 228);
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }

  .outer {
    overflow: hidden;
    position: relative;
  }

  .inner {
    position: absolute;
    height: 100px;
    width: 100px;
    right: -50px;
    top: 50px;
  }

</style>
