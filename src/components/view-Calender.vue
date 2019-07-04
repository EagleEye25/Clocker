<template>
  <div class="center">
    <!-- Standard -->
    <div v-if="standard !== false">
      <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title"> Created Calenders </h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by calendar name..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No calendar's found"
          :md-description="`No calendar found for this '${search}' query. Try a different search term or create a new calendar.`">
          <md-button class="md-primary md-raised" @click="updateCalendar(false)">Create Calendar</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
          <md-table-cell md-label="Update" >
            <md-button class="md-raised md-primary" @click="updateCalendar(item)">
              Update
            </md-button>
          </md-table-cell>
          <!-- Activate / Deactivate -->
          <md-table-cell md-label="Delete" >
            <md-button class="md-raised md-accent">
              Delete
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <!-- Process -->
    <div v-if="standard === false">
      <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title"> Created Calenders </h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by calendar name..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No calendar's found"
          :md-description="`No calendar found for this '${search}' query. Try a different search term or create a new calendar.`">
          <md-button class="md-primary md-raised" @click="updateCalendar(false)">Create Calendar</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Description" md-sort-by="description">{{ item.description }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
  import http from '../../public/app.service.ts';

  const toLower = text => {
    return text.toString().toLowerCase();
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)));
    }
    return items
  }

  export default {
    name: 'view-Calender',
    // Angular equivaent of INPUT
    props: {
      standard: true,
    },
    //  Variables
    data() {
      return {
        selectedCalendar: null,
        search: null,
        searched: [],
        calendars: [],
        dialogActive: false,
        mdTitle: '',
        mdDescription: '',
        updateCal: false,
      }
    },

    methods: {
      async determineAction() {
        this.standard === false ? await this.getUnassigned() : await this.getCalendars()
      },

      async getUnassigned() {
        return await http.get(`/api/calender/unassigned/calender`)
          .then((res) => {
            res.data.forEach(d => {
              let data = {
                'id': d.id,
                'name': d.name,
                'description': d.description
              }
              this.calendars.push(data);
            });
            console.log('Got unassigned Calenders')
          }).catch((err) => {
            console.log(err)
          });
      },

      updateCalendar(item) {
        if (item) {
          this.updateCal = true;
          item.update = true;
          this.$store.dispatch('updateCalendar', item);
        } else {
          let create = {'create': true};
          this.$store.dispatch('updateCalendarTime', create);
        }
        this.$router.push('/management/addCalendar');
      },

      getCalendars() {
        http.get(`/api/calender`)
          .then((res) => {
            res.data.forEach(d => {
              let data = {
                'id': d.id,
                'name': d.name,
                'description': d.description
              }
              this.calendars.push(data);
            });
            console.log('Got Calenders')
          }).catch((err) => {
            console.log(err)
          });
      },

      searchOnTable () {
        this.searched = searchByName(this.calendars, this.search);
      },

      onSelect(item) {
        if (item) {
          this.selectedCalendar = item;
          this.standard === false ? this.$store.dispatch('updateCalendar', item) : null;
        }
      },
    },

    created () {
      this.searched = this.calendars;
    },

    beforeMount() {
      this.determineAction();
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

  .md-table {
    display: block;
    padding-top: 10px;
    margin: 0 auto;
    text-align: left;
    width: 50%;
  }

  .md-table-cell {
    text-align: center;
  }

  .md-field {
    max-width: 300px;
  }

  .md-table-toolbar {
    text-align: left;
  }
</style>