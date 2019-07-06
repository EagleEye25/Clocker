<template>
  <div class="center">
    <md-steppers :md-active-step.sync="active" md-vertical md-linear>
        <md-step id="first" md-label="Select Calendar" :md-editable=editable :md-done.sync="first">
          <addCalender v-if="!showCreatedCal" v-bind:standard=false @added="setDone('first', 'second')"></addCalender>
          <md-button v-if="!showCreatedCal" class="md-raised" style="color:orange" @click="showCreatedCal = true">Already Created Calendar</md-button>
          <div v-if="showCreatedCal">
            <viewCalender v-bind:standard=false></viewCalender>
            <md-button class="md-raised md-accent" @click="showCreatedCal = false">Back</md-button>
            <md-button class="md-raised md-primary" :disabled=!calendarData @click="setDone('first', 'second')">Continue</md-button>
          </div>
        </md-step>

      <md-step id="second" md-label="Select Employee" :md-editable=editable :md-done.sync="second">
        <viewEmployee v-bind:standard=false></viewEmployee>
        <md-button class="md-raised md-primary" :disabled="!employeeInfo" @click="setDone('second', 'third')">Continue</md-button>
      </md-step>

      <md-step id="third" md-label="Assign" :md-editable=editable :md-done.sync="third">
        <!-- Not Assigned -->
        <div v-if="!assigned">
          <md-list class="md-triple-line">
              <md-list-item class="center">

                <div class="md-list-item-text">
                  <span>Calendar:</span>
                  <span>Name: {{ this.calendarData.name }}</span>
                  <span>Description: {{ this.calendarData.description }}</span>
                </div>

              </md-list-item>
              <md-list-item class="center">

                <div class="md-list-item-text">
                  <span>Employee:</span>
                  <span>{{ this.employeeInfo.name }}</span>
                </div>

              </md-list-item>
          </md-list>
          <md-button class="md-raised md-primary" @click="assign">Assign Calendar</md-button>
        </div>
        <!-- Assigned -->
        <div v-if="assigned">
           <h1>Successfully Assigned Calendar to Employee!</h1>
            <md-button class="md-raised" style="color: lime;" to="/management">Back To Management</md-button>
            <md-button class="md-raised" style="color: yellow;" @click="resetStepper">Assign Another Calendar</md-button>
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
  import http from '../../public/app.service.ts';
  import addCalender from './add-Calender';
  import viewCalender from './view-Calender';
  import viewEmployee from './view-Employee';
  export default {
    name: 'assing-Calender',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        active: 'first',
        first: false,
        second: false,
        third: false,
        editable: true,
        showCreatedCal: false,
        assigned: false,
      }
    },

    components: {
      addCalender,
      viewCalender,
      viewEmployee,
    },

    methods: {
      async assign() {
        return await http.post(`/api/employee_calender/create`, {
          'employee_id': this.employeeInfo.id,
          'calender_id': this.calendarData.id,
          'active_date': Date.now(),
        }).then((res) => {
          console.log('Successfully assigned employee to calender!');
          this.assigned = true;
          return true;
        }).catch((err) => {
          console.log(err);
          return false;
        });
      },

      setDone (id, index) {
        this[id] = true

        this.secondStepError = null

        if (index) {
          this.active = index
        }
      },

      resetStepper() {
        this.first = false;
        this.second = false;
        this.third = false;
        this.active = 'first';
        this.showCreatedCal = false;
        this.$store.dispatch('updateEmployeeInfo', null);
        this.$store.dispatch('updateCalendarTime', null);
        this.showCreatedCal = false;
        this.assigned = false;
      },
    },


    computed: {
      calendarData() {
        return this.$store.getters.calendarData;
      },
      employeeInfo() {
        return this.$store.getters.employeeInfo;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }

  .md-steppers {
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>