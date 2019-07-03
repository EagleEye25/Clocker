<template>
  <div class="center">
    <!-- Standard process -->
    <div>
      <form action="">
        <md-card class="md-layout-item md-size-50 md-small-size-100 center">
          <md-card-header>
            <div class="md-title">{{title}}</div>
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
          <!-- Standard -->
          <md-card-actions v-if="!update && !create">
            <md-button style="color: orange" @click="clearForm">cancel</md-button>
            <md-button style="color: lime" @click="createCalendar">Add Calendar</md-button>
          </md-card-actions>
          <!-- Update, return to list -->
          <md-card-actions v-if="update">
            <md-button style="color: orange" @click="returnToView">cancel</md-button>
            <md-button style="color: lime" @click="updateCalendar">Update Calendar</md-button>
          </md-card-actions>
          <!-- Create, return to list -->
          <md-card-actions v-if="create">
            <md-button style="color: orange" @click="returnToView">cancel</md-button>
            <md-button style="color: lime" @click="createCalendar">Add Calendar</md-button>
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
  import http from '../../public/app.service.ts';
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
        },
        title: 'Add Calendar',
        update: false,
        create: false
      }
    },

    methods: {
      async createCalendar() {
        return await http.post(`/api/calender/create`, {
          'name': this.form.calendarName,
          'description': this.form.description
        }).then((res) => {
          console.log('Successfully created calendar');
          this.clearForm();
          this.create ? this.returnToView() : null;
          return true;
        }).catch((err) => {
          console.log(err);
          return false;
        });
      },

      async updateCalendar() {
        let d = this.calendarData;
        return await http.put(`/api/calender/${d.id}`, {
          'id': d.id,
          'name': this.form.calendarName,
          'description': this.form.description
        }).then((res) => {
          console.log('Successfully Updated Calendar');
          this.returnToView();
          return false
        }).catch((err) => {
          console.log(err)
          return false
        });
      },

      clearForm() {
        this.form.calendarName = '';
        this.form.description = '';
      },

      determine() {
        if (this.calendarData.update) {
          let d = this.calendarData;
          this.title = 'Update Calendar';
          this.update = true;

          this.form.calendarName = d.name;
          this.form.description = d.description;
        } else if (this.calendarData.create) {
          this.title = 'Add Calendar';
          this.create = true;
        }
      },

      returnToView() {
        this.clearForm();
        this.$store.dispatch('updateCalendar', null);
        this.$router.push('/management/viewCalendar');
      }
    },

    beforeMount() {
      this.determine();
    },

    computed: {
      calendarData() {
        return this.$store.getters.calendarData;
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
    /* width: 50%; */
  }

</style>
