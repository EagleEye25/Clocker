<template>
  <div>
    <!-- Standard Process -->
    <div>
      <form action="">
        <md-card class="md-layout-item md-size-50 md-small-size-100 center">
        <md-card-header>
          <div class="md-title">Assign Calendar Times To Calendar</div>
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
                                     color="#27C96D" :dark=true label="Starting Time">
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
        </md-card>
      </form>
    </div>
    <!-- Part of Process -->
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'add-CalendarTimes',
    // Angular equivaent of INPUT
    props: {
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
        }
      }
    },

    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
