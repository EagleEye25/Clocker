<template>
  <div>
    <br>
    <h1 style="color:white"> Settings </h1>
    <br>
    <div>
      <md-card>
        <md-field class="center" style="max-width:40%">
          <label for="serverAddy">Server Address</label>
          <md-input class="serverAddy" v-model="serverAddy"/>
        </md-field>
        <md-button class="md-raised md-primary" :disabled="!serverAddy" @click="setDone('second', 'third')">Continue</md-button>
      </md-card>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'install',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        serverAddy: null,
      }
    },

    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style="scss" scoped>

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }

</style>