<template>
  <div class="center">
    <!-- <div> -->
    <div v-if="action === 'Clock_In' || action === null || action === 'completed'">
      <img class="center" src="../../public/pictures/lock.png" alt="Lock Image">
      <!-- Hides input off screen -->
      <!-- <div class="outer"> -->
        <!-- <div class="inner"> -->
          <input v-focus v-model="tag" type="text" @keyup.enter="onEnter" onblur="this.focus()">
        <!-- </div> -->
      <!-- </div> -->
      <h1 style="color:white;">{{ message }}</h1>
    </div>
    <div v-if="action === 'Clock_Out'" class="center">
      <md-table v-model="reasons" md-card @md-selected="onSelect" md-sort="id" md-sort-order="asc" class="table">

      <md-table-toolbar>
        <h1 class="md-title">Clock Out Reason</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Number" md-sort-by="number" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="Work Related" md-sort-by="work related">{{ item.workW }}</md-table-cell>
      </md-table-row>
    </md-table>
    </div>
    <md-dialog-alert
      :md-active.sync="showDialogD"
      md-content="{ dialogMsg }"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import http from '../../public/app.service.ts'

  export default {
    name: 'clocker',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        tag: '',
        message: 'Please Scan Your Employee Card',
        action: null,
        reasons: [],
        selectedReason: '',
        response: null,
        determineProcessing: false,
        inProcessing: false,
        outProcessing: false,
        showDialogD: false,
        dialogMsg: '',
      }
    },

    methods: {
      onEnter() {
        this.determineAction();
      },

      clockIn(resp) {
        http.post(`/api/clocking/clock_in`, {
          'employee_id': resp.employee_id,
          'reason_id': null,
          'clock_in': Date.now(),
          'clock_out': null,
          'overtime': null
        }).then((resp) => {
          if (resp.status === 201) {
            this.success = 'CLOCKED IN';
            this.showDialog('InSuccess');
            this.tag = '';
          }
        }).catch((error) => {
          console.log(error);
          if (error) {
            this.showDialog('InFail');
          }
        });
      },

      clockOut(resp, reasonID) {
        http.put(`/api/clocking/clock_out/${resp.id}`, {
        'id': resp.id,
        'employee_id': resp.employee_id,
        'reason_id': reasonID,
        'clock_in': resp.clock_in,
        'clock_out': Date.now(),
        'overtime': null
      })
      .then((resp) => {
        this.action = 'completed'
        this.showDialog('OutSuccess');
        this.tag = '';
      }).catch((error) => {
        this.showDialog('InFail');
        console.log(error)
      });
      },

      getReasons() {
        http.get(`/api/reason/`)
        .then((res) => {
          res.data.forEach(d => {
            let bool = 'no';
            if (d.work !== 0) {
              bool = 'yes'
            }
            let data = {
              'id': d.id,
              'description': d.description,
              'work': d.work,
              'workW': bool
            }
            this.reasons.push(data);
          });
          this.reasons.toString();
        }).catch((error) => {

        });
      },

      onSelect(item) {
        this.selectedReason = item;
        if (this.selectedReason) {
          this.clockOut(this.response, this.selectedReason.id)
        }
      },

      determineAction() {
      // Determine if backend should clock in or out employee
      http.get(`/api/clocking/determineAction/${this.tag}`)
        .then((res) =>{
          console.log(res);
          if (res.status === 200 && res.data) {
            this.action = res.data.action;
            this.response = res.data;
            switch(this.action) {
              case 'Clock_In': {
                this.clockIn(res.data);
                break;
              }
              case 'Clock_Out': {
                this.getReasons();
                break;
              }
            }
          }
        }).catch(e => this.fail = e);
      },

      showDialog(type) {
        switch(type) {
          case 'InSuccess': {
            this.dialogMsg = 'Successfully Clocked In!'
            break;
          }
          case 'InFail': {
            this.dialogMsg = 'Please scan employee card again...';
            break;
          }
          case 'OutSuccess': {
            this.dialogMsg = 'Successfully Clocked Out!'
            break;
          }
          case 'OutFail': {
            this.dialogMsg = 'Please select a reason again...';
            break;
          }
        }
        this.showDialogD = true;
        setTimeout(() =>{
          this.showDialogD = false;
        }, 2000);
      }
    },

  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  }

    // getReasons() {
    //      http.get(`/api/reason/`)
    //       .then((res) => {

    //       }).catch((error) => {

    //       });
    //   },

    // watch: {
    //   tag: function (newTag, old) {
    //     this.temp = newTag;
    //     // this.tag = 'hdjffhdj';
    //   }
    // }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

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

  .md-table {
    margin-top: 16px;
    width: 30%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    /* width: 50%; */
  }

  .md-table-toolbar {
    text-align: center;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }

</style>
