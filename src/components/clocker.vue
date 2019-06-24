<template>
  <div>
    <h1>LOCK</h1>
    <input v-model="tag" type="text" autofocus @keyup.enter="onEnter">
    <p> {{ tag }} </p>
    <p> {{ temp }} </p>
  </div>
</template>

<script>
  export default {
    name: 'clocker',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        tag: '',
        temp: ''
      }
    },

    methods: {
      send() {
        // send tag to backend here
      },

      onEnter() {
        this.temp = this.tag;
        this. tag = '';
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

</style>
