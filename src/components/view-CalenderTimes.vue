<template>
  <div>
    <!-- Stnadard -->
    <div v-if="standard !== false">
      <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title"> Created Calenders Times </h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by starting week..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No calendar Times found"
          :md-description="`No calendar times found for this '${search}' query. Try a different search term or create a new calendar.`">
          <md-button class="md-primary md-raised" @click="updateCalTimes(false)">Create Calendar Time</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Nr" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Starting Week" md-sort-by="startWeek">{{ item.startWeek }}</md-table-cell>
          <md-table-cell md-label="Starting Day" md-sort-by="startDay">{{ item.startDay }}</md-table-cell>
          <md-table-cell md-label="Starting Time" md-sort-by="startTime">{{ item.startTime }}</md-table-cell>
          <md-table-cell md-label="Ending Week" md-sort-by="endWeek">{{ item.endWeek }}</md-table-cell>
          <md-table-cell md-label="Ending Day" md-sort-by="endDay">{{ item.endDay }}</md-table-cell>
          <md-table-cell md-label="Ending Time" md-sort-by="endTime">{{ item.endTime }}</md-table-cell>
          <md-table-cell md-label="" >
            <md-button class="md-raised md-primary" @click="updateCalTimes(item)">
              Update
            </md-button>
          </md-table-cell>
          <!-- Activate / Deactivate -->
          <md-table-cell md-label="" >
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
            <h1 class="md-title"> Created Calenders Times </h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by starting week..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No calendar Times found"
          :md-description="`No calendar times found for this '${search}' query. Try a different search term or create a new calendar.`">
          <md-button class="md-primary md-raised" @click="updateCalTimes(false)">Create Calendar Time</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Nr" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Starting Week" md-sort-by="startWeek">{{ item.startWeek }}</md-table-cell>
          <md-table-cell md-label="Starting Day" md-sort-by="startDay">{{ item.startDay }}</md-table-cell>
          <md-table-cell md-label="Starting Time" md-sort-by="startTime">{{ item.startTime }}</md-table-cell>
          <md-table-cell md-label="Ending Week" md-sort-by="endWeek">{{ item.endWeek }}</md-table-cell>
          <md-table-cell md-label="Ending Day" md-sort-by="endDay">{{ item.endDay }}</md-table-cell>
          <md-table-cell md-label="Ending Time" md-sort-by="endTime">{{ item.endTime }}</md-table-cell>
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

  const searchByWeek = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.startWeek).includes(toLower(term)));
    }
    return items
  }

  export default {
    name: 'clocker',
    // Angular equivaent of INPUT
    props: {
      standard: true
    },
    //  Variables
    data() {
      return {
        selectedCalTime: null,
        search: null,
        searched: [],
        calTimes: [],
        dialogActive: false,
        mdTitle: '',
        mdDescription: '',
        confirmedUnassign: false,
      }
    },

    methods: {
      async determineAction() {
        this.standard === false ? await this.getUnassigned() : await this.getCalTimes()
      },

      async getUnassigned() {
        return await http.get(`/api/calender_times/times/unAssigned`)
          .then((res) => {
            res.data.forEach(d => {
              let data = {
                'id': d.id,
                'calender_id': d.calender_id,
                'startWeek': d.startWeek,
                'startDay': d.startDay,
                'startTime': d.startTime,
                'endWeek': d.endWeek,
                'endDay': d.endDay,
                'endTime': d.endTime
              }
              this.calTimes.push(data);
            });
            console.log('Successfully got calender times');
            return true;
          }).catch((err) => {
            console.log(err);
            return false;
          });
      },

      updateCalTimes(item) {
        if (item) {
          this.updateCalTime = true;
          item.update = true;
          this.$store.dispatch('updateCalendarTime', item);
        } else {
          let create = {'create': true};
          this.$store.dispatch('updateCalendarTime', create);
        }
        this.$router.push('/management/addCalendarTimes');
      },

      async getCalTimes() {
        return await http.get(`/api/calender_times/`)
          .then((res) => {
            res.data.forEach(d => {
              let data = {
                'id': d.id,
                'calender_id': d.calender_id,
                'startWeek': d.startWeek,
                'startDay': d.startDay,
                'startTime': d.startTime,
                'endWeek': d.endWeek,
                'endDay': d.endDay,
                'endTime': d.endTime
              }
              this.calTimes.push(data);
            });
            console.log('Successfully got calender times');
            return true;
          }).catch((err) => {
            console.log(err);
            return false;
          });
      },

      onSelect(item) {
        if (item) {
          this.selectedReason = item;
          this.standard === false ? this.$store.dispatch('updateCalendarTime', item) : null;
        }
      },

      searchOnTable () {
        this.searched = searchByWeek(this.calTimes, this.search);
      },
    },

    created () {
      this.searched = this.calTimes;
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
    text-align: center;
    width: 70%;
  }

  .md-table-cell {
    text-align: center;
    max-width: 80px;
  }

  .md-field {
    max-width: 300px;
  }

  .md-table-toolbar {
    text-align: left;
  }
</style>