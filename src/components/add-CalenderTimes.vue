<template>
  <div>
    <!-- Standard Process -->
    <div>
      <form action="">
        <md-card class="md-layout-item md-size-50 md-small-size-100 center">
        <md-card-header>
          <div class="md-title">{{ title }}</div>
        </md-card-header>

        <md-card-content>
          <!-- Starting -->
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="sWeek">Starting Week</label>
                <md-input type="number" id="sWeek" name="sWeek" autocomplete="sWeek" v-model="form.sWeek"/>
                <!-- <span class="md-error" v-if="!$v.form.sWeek.required">The starting week is required</span> -->
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="sDay">Starting Day</label>
                <md-select name="sDay" id="sDay" v-model="form.sDay" md-dense>
                  <md-option value="monday">Monday</md-option>
                  <md-option value="tuesday">Tuesday</md-option>
                  <md-option value="wednesday">Wednesday</md-option>
                  <md-option value="thursday">Thursday</md-option>
                  <md-option value="friday">Friday</md-option>
                  <md-option value="saturday">Saturday</md-option>
                  <md-option value="sunday">Sunday</md-option>
                </md-select>
                <span class="md-error">The starting day is required</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="sTime">Starting Time</label>
                <VueCtkDateTimePicker id="sTime" name="sTime" v-model="form.sTime"
                                     :onlyTime=true format="HH:mm" formatted="HH:mm"
                                     color="#27C96D" :dark=true label="Starting Time"
                                     class="center">
                </VueCtkDateTimePicker>
                <!-- <span class="md-error" v-if="!$v.form.sWeek.required">The starting week is required</span> -->
              </md-field>
            </div>
          </div>
          <!-- Ending -->
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="eWeek">Ending Week</label>
                <md-input type="number" id="eWeek" name="eWeek" autocomplete="eWeek" v-model="form.eWeek"/>
                <!-- <span class="md-error" v-if="!$v.form.sWeek.required">The starting week is required</span> -->
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="eDay">Ending Day</label>
                <md-select name="eDay" id="eDay" v-model="form.eDay" md-dense>
                  <md-option value="monday">Monday</md-option>
                  <md-option value="tuesday">Tuesday</md-option>
                  <md-option value="wednesday">Wednesday</md-option>
                  <md-option value="thursday">Thursday</md-option>
                  <md-option value="friday">Friday</md-option>
                  <md-option value="saturday">Saturday</md-option>
                  <md-option value="sunday">Sunday</md-option>
                </md-select>
                <span class="md-error">The starting day is required</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="eTime">Ending Time</label>
                <VueCtkDateTimePicker id="eTime" name="eTime" v-model="form.eTime"
                                     :onlyTime=true format="HH:mm" formatted="HH:mm"
                                     color="#27C96D" :dark=true label="Ending Time">
                </VueCtkDateTimePicker>
                <!-- <span class="md-error" v-if="!$v.form.sWeek.required">The starting week is required</span> -->
              </md-field>
            </div>
          </div>
        </md-card-content>
          <!-- standard -->
          <md-card-actions v-if="!update && !create">
            <md-button style="color: orange" @click="clearForm">Cancel</md-button>
            <md-button style="color: lime" @click="addCalTimes">Add Times</md-button>
          </md-card-actions>
          <!-- update, return -->
          <md-card-actions v-if="update">
            <md-button style="color: orange" @click="returnToView">Cancel</md-button>
            <md-button style="color: lime" @click="UpdateTimes">Update Times</md-button>
          </md-card-actions>
          <!-- create, return -->
          <md-card-actions v-if="create">
            <md-button style="color: orange" @click="returnToView">Cancel</md-button>
            <md-button style="color: lime" @click="addCalTimes">Add Times</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
    <!-- Part of Process -->
    <div>

    </div>
  </div>
</template>

<script>
  import http from '../../public/app.service.ts';

  export default {
    name: 'add-CalendarTimes',
    // Angular equivaent of INPUT
    props: {
      standard: true,
    },
    //  Variables
    data() {
      return {
        form: {
          sWeek: null,
          sDay: null,
          sTime: null,
          eWeek: null,
          eDay: null,
          eTime: null
        },
        title: 'Create Calendar Times',
        update: false,
        create: false,
      }
    },

    methods: {
      async addCalTimes() {
        if (!await this.checkCalTimes(this.form)) {
          return await http.post(`/api/calender_times/create`, {
            'startWeek': this.form.sWeek,
            'startDay': this.form.sDay,
            'startTime': this.form.sTime,
            'endWeek': this.form.eWeek,
            'endDay': this.form.eDay,
            'endTime': this.form.eTime
          }).then((res) => {
            console.log('Successfully created calendar times');
            if (this.standard === false) {
              this.$store.dispatch('updateCalendarTime', res.data);
              this.$emit('added');
            }
            this.create ? this.returnToView() : null;
            this.clearForm();
            return true;
          }).catch((err) => {
            console.log(err);
            return false;
          });
        } else {
          console.log('times already exist');
        }
      },

      async UpdateTimes() {
        let d = this.timeData;
        return await http.put(`/api/calender_times/${d.id}`,{
          'id': d.id,
          'startWeek': this.form.sWeek,
          'startDay': this.form.sDay,
          'startTime': this.form.sTime,
          'endWeek': this.form.eWeek,
          'endDay': this.form.eDay,
          'endTime': this.form.eTime
        }).then((res) => {
          console.log('Successfully updated calendar times');
          this.returnToView();
          return true;
        }).catch((err) => {
          console.log(err);
          return false;
        });
      },

      clearForm() {
        this.form.sWeek = null;
        this.form.sDay = null;
        this.form.sTime = null;
        this.form.eWeek = null;
        this.form.eDay = null;
        this.form.eTime = null;
        this.standard === false ? this.$emit('canceled') : null;
      },

      async checkCalTimes(c_times) {
        return await http.get(`/api/calender_times/times/existing`, {c_times})
          .then((resp) => {
            console.log(resp);
            return true
          }).catch((err) => {
            return false
          });
      },

      determine() {
        if (this.timeData.update) {
          let d = this.timeData;
          this.title = 'Update Calendar Times'
          this.update = true;

          this.form.sWeek = d.startWeek;
          this.form.sDay = d.startDay;
          this.form.sTime = d.startTime;
          this.form.eWeek = d.endWeek;
          this.form.eDay = d.endDay;
          this.form.eTime = d.endTime;
        } else if (this.timeData.create) {
          this.title = 'Add Calendar';
          this.create = true;
        }
      },

      returnToView() {
        this.clearForm();
        this.$store.dispatch('updateCalendarTime', null);
        this.$router.push('/management/viewCalendarTimes');
      }
    },

    beforeMount() {
      this.determine();
    },

    computed: {
      timeData() {
        return this.$store.getters.calendarTime;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

</style>
