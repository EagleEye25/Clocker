<template>
  <div>
    <br>
    <h1 style="color:white"> Set Server Connection </h1>
    <br>
    <div>
      <md-card class="md-layout-item md-size-50 md-small-size-100 center box">
          <div style=padding-left:25%>
            <md-field style="width: 70%">
              <label>Server Address</label>
              <md-input v-model="serverAddy"/>
            </md-field>
          </div>

        <md-button class="md-raised md-primary"  @click="testCon">Continue</md-button>
      </md-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

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
      async testCon() {
        return await this.$awn.asyncBlock(axios.get(`${this.serverAddy}/app/test/`)
          .then((result) => {
            this.$awn.success('Valid Server Connection!');
            window.localStorage.setItem('serverAddy', this.serverAddy);
            return true
          }).catch((err) => {
            this.$awn.alert('Invalid Server Connection!');
            return false
          }), null, null);
      }
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


  .box {
    -webkit-border-radius: 6px;;
    border-radius: 6px;;
  }

</style>