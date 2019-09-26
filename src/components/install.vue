<template>
  <div>
    <br>
    <h1 style="color:white"> Set Server Connection </h1>
    <br>
    <div>
      <md-card class="md-layout-item md-size-50 md-small-size-100 center box">
        <div v-if="!showAdd" @keyup.enter="testCon">
           <div style=padding-left:25%>
            <md-field style="width: 70%">
              <label>Server Address</label>
              <md-input v-model="serverAddy"/>
            </md-field>
          </div>

          <md-button class="md-raised md-primary" @click="testCon">Continue</md-button>
        </div>
        <div v-if="showAdd">
          <addEmployee v-bind:first=true @created=moveToLogin></addEmployee>
          <br>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import addEmployee from '../components/add-Employee.vue';
  export default {
    name: 'install',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        serverAddy: null,
        showAdd: false
      }
    },

    components: {
      addEmployee
    },

    methods: {
      async testCon() {
        return await this.$awn.asyncBlock(axios.get(`${this.serverAddy}/app/test/`)
          .then((res) => {
            this.$awn.success('Valid Server Connection!');
            this.checkAdmin()
            return true
          }).catch((err) => {
            this.$awn.alert('Invalid Server Connection!');
            return false
          }), null, null);
      },

      async checkAdmin() {
        return await this.$awn.asyncBlock(axios.get(`${this.serverAddy}/app/callAdd/Admin`)
          .then((res) => {
            if (res.data.found) {
              this.showAdd = false;
              this.moveToLogin();
            } else {
              this.showAdd = true;
            }
          }).catch((err) => {
            this.$awn.alert('Couldnt Check For Admins')
          }), null, null);
      },

      moveToLogin() {
        window.localStorage.setItem('serverAddy', this.serverAddy);
        window.location.reload();
        this.$router.push('/login');
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