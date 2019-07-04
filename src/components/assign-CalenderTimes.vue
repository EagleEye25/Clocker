<template>
  <div>
    <div>
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

        <md-step id="second" md-label="Select Calendar Times" :md-editable=editable :md-done.sync="second">
          <viewCalenderTimes v-bind:standard=false></viewCalenderTimes>
          <md-button class="md-raised md-primary" :disabled=!timeData @click="setDone('second', 'third')">Continue</md-button>
        </md-step>

        <md-step id="third" md-label="Third Step" :md-editable="false" :md-done.sync="third">
          <!-- Not Assigned -->
          <div v-if="!assigned">
            <md-list class="md-triple-line">
              <md-list-item>

                <div class="md-list-item-text">
                  <span>Calendar:</span>
                  <span>Name: {{ this.calendarData.name }}</span>
                </div>

              </md-list-item>
              <md-list-item>

                <div class="md-list-item-text">
                  <span>Calendar Times:</span>
                  <!-- Starting -->
                  <div>
                    <span>Starting:</span>
                    <br>
                    <div style="padding-left: 5%">
                      <br>
                      <span> Week: {{ this.timeData.startWeek }}</span>
                      <br>
                      <span> Day: {{ this.timeData.startDay }}</span>
                      <br>
                      <span> Time: {{ this.timeData.startTime }}</span>
                    </div>
                  </div>
                  <!-- Ending -->
                  <div>
                      <span>ending:</span>
                      <br>
                    <div style="padding-left: 5%">
                      <br>
                      <span> Week:{{ this.timeData.endWeek }}</span>
                      <br>
                      <span> Day: {{ this.timeData.endDay }}</span>
                      <br>
                      <span> Time: {{ this.timeData.endTime }}</span>
                    </div>
                  </div>
                </div>

              </md-list-item>
            </md-list>
            <md-button class="md-raised md-primary" @click="assignTimes">Assign Calendar Times</md-button>
          </div>
          <!-- Assigned -->
          <div v-if="assigned">
            <h1>Successfully Assigned Calendar to Calendar Times!</h1>
            <md-button class="md-raised" style="color: lime;" to="/management">Back To Management</md-button>
            <md-button class="md-raised" style="color: yellow;" @click="resetStepper">Assign Another Calendar</md-button>
          </div>
        </md-step>
      </md-steppers>
    </div>
  </div>
</template>

<script>
  import http from '../../public/app.service.ts';
  import addCalender from './add-Calender.vue';
  import viewCalender from './view-Calender.vue';
  import viewCalenderTimes from './view-CalenderTimes.vue';
  export default {
    name: 'assign-CalenderTimes',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        active: 'first',
        editable: true,
        first: false,
        second: false,
        third: false,
        showCreatedCal: false,
        assigned: false,
      }
    },

    components : {
      addCalender,
      viewCalender,
      viewCalenderTimes,
    },

    methods: {
      async assignTimes() {
        let d = this.timeData;
        return await http.put(`/api/calender_times/${d.id}`,{
          'id': d.id,
          'calender_id': this.calendarData.id,
          'startWeek': d.startWeek,
          'startDay': d.startDay,
          'startTime': d.startTime,
          'endWeek': d.endWeek,
          'endDay': d.endDay,
          'endTime': d.endTime
        }).then((res) => {
          console.log('Successfully assigned calendar times');
          this.editable = false;
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
        this.$store.dispatch('updateCalendar', null);
        this.$store.dispatch('updateCalendarTime', null);
        this.first = false;
        this.second = false;
        this.third = false;
        this.active = 'first';
        this.showCreatedCal = false;
      },
    },


    computed: {
      calendarData() {
        return this.$store.getters.calendarData;
      },

      timeData() {
        return this.$store.getters.calendarTime;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>