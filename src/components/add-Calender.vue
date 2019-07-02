<template>
  <div>
    <!-- Standard process -->
    <div>
      <form action="">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">Add Calendar</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="Calendar Name">Calendar Name</label>
                  <md-input name="calendarName" id="calendarName" v-model="form.calendarName"/>
                  <!-- <span class="md-error" v-if="!$v.form.calendarName.required">The calendar name is required</span>
                  <span class="md-error" v-else-if="!$v.form.calendarName.minlength">Invalid calendar name</span> -->
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="Calendar Name">Description</label>
                  <md-input name="description" id="description" v-model="form.description"/>
                  <span class="md-helper-text">(Optional)</span>
                  <!-- <span class="md-error" v-if="!$v.form.calendarName.required">The calendar name is required</span>
                  <span class="md-error" v-else-if="!$v.form.calendarName.minlength">Invalid calendar name</span> -->
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button style="color: orange" >cancel</md-button>
            <md-button style="color: lime">Add Calendar</md-button>
          </md-card-actions>
        </md-card>
      </form>
    </div>
    <!-- Part Process -->
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'add-Calender',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        form: {
          calendarName: '',
          description: '',
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
