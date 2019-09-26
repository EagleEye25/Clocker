<template>
  <div @click.stop.prevent="focusInput" @touch.stop.prevent="focusInput">
    <img class="center" src="../../public/pictures/lock.png" alt="Lock Image">
    <div v-if="!showNormLogin">
      <!-- Hides input off screen -->
      <div class="outer">
        <div class="inner">
          <input v-if="!showNormLogin" v-focus v-model="tag" type="text" @keyup.enter="login" id="cardInput">
        </div>
      </div>
      <h1 style="color:white;">{{ message }}</h1>
      <md-button @click="showNormLogin = true">
        Login Without Card
      </md-button>
    </div>
      <div class="md-layout md-gutter center" v-if="showNormLogin">
        <div class="md-layout-item md-size-15 md-small-size-100 center">
          <md-field>
            <label for="empName">Enter Employee Name</label>
            <md-input class="empName" v-model="empName"/>
            <span class="md-helper-text">E.g. John Doe</span>
          </md-field>
        </div>
        <div class="md-layout-item md-size-15 md-small-size-100 center">
          <md-field>
            <label for="pass">Enter Password</label>
            <md-input class="pass" v-model="pass"/>
          </md-field>
        </div>
        <div class="md-layout-item md-size-7 md-small-size-100 center">
          <md-button @click="showNormLogin = false">
            Cancel
          </md-button>
          <md-button @click="login">
            Login
          </md-button>
        </div>
      </div>
    <div>
      <md-dialog-prompt
        :md-active.sync="active"
        md-title="Change Server Address"
        md-input-placeholder="Server Address"
        v-model="serverAddy"
        md-confirm-text="Change"
        md-cancel-text="Cancel"
        @md-confirm="onConfirm" />

      <md-button @click="active = true, serverAddy = null">
        <md-icon>settings</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
  import http from '../../public/app.service.ts';
  import axios from 'axios';

  export default {
    name: 'login-Management',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        tag: '',
        message: 'Please Scan Your Manager Card',
        showNormLogin: false,
        pass: null,
        empName: null,
        active: false,
        serverAddy: null,
      }
    },

    methods: {
      async onConfirm() {
        return await this.$awn.asyncBlock(axios.get(`${this.serverAddy}/app/test/`)
          .then(() => {
            this.$awn.success('Valid Server Connection!');
            window.localStorage.setItem('serverAddy', this.serverAddy);
            return true
          }).catch(() => {
            this.$awn.alert('Invalid Server Connection!');
            return false
          }), null, null);
      },

      onEnter() {
        this.login();
      },

      async login() {
        const data = {};
        if (this.showNormLogin) {
          data.name = this.empName.toLowerCase();
          data.pass = this.pass;
        } else {
          data.cardNo = this.tag;
        }
        return await this.$awn.asyncBlock(http.post(`/app/login/`, data).then((res) => {
            this.$store.dispatch('updateLoginInfo', res.data.user);
            this.$awn.success('Logged In');
            const AUTH_TOKEN = res.data.token || '';
            const REFRESH_TOKEN = res.data.refreshToken || '';
            this.$store.dispatch('setToken', {token: AUTH_TOKEN, refreshToken: REFRESH_TOKEN}).then(() => {
              this.$router.push('/management');
             });
            this.tag = null;
          }).catch((err) => {
            this.tag = null;
            let error = err.toString().indexOf('Network Error');
            error > -1 ? this.$awn.alert('Please Ensure the server is running') :
            this.$awn.alert('Login failed');
          }), null, null);
      },

      focusInput() {
        if (!this.showDialogD) {
          const el = document.querySelector('#cardInput');
          if (el) {
            el.focus();
          }
        }
      },
    },

    directives: {
      focus: {
        // directive definition
        inserted: function (el) {
          el.focus()
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  div {
    background-color: rgb(48,48,48);
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
