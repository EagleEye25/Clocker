<template>
  <div class="center">
    <md-button class="md-icon-button md-dense topLeft" @click="help">
      <md-tooltip md-direction="left">Click Me For Help</md-tooltip>
      <md-icon>help_outline</md-icon>
    </md-button>
    <h2 class="unassignCalT" style="color: white;">Times Assigned To Calendar</h2>
    <div style="padding-left: 42.3%">
      <md-card class="md-layout md-gutter box" style="width: 30%" id="calenders">
        <div class="md-layout-item center">
          <md-field class="center">
            <label>Please select a calendar</label>
            <md-select v-model="selectedCalID" :disabled="!calenders">
              <md-option
                v-for="(item, index) in calenders"
                :key="index"
                :value=item.id>
                  {{ item.name }}
                </md-option>
            </md-select>
          </md-field>
        </div>
      </md-card>
    </div>
    <br />
    <div v-if="selectedCalID">
      <md-table id="empTable"
        v-model="searched"
        md-sort="id"
        md-sort-order="asc"
        md-card
        md-fixed-header
        @md-selected="onSelect"
        class="table box"
      >
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Assigned Times</h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input
              placeholder="Search by starting week..."
              v-model="search"
              @input="searchOnTable"
            />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No Times found"
          :md-description="`No Times found for this search term. Try a different search term.`"
        ></md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Starting Day" md-sort-by="startDay">{{ item.startDay }}</md-table-cell>
          <md-table-cell md-label="Starting Time" md-sort-by="startTime">{{ item.startTime }}</md-table-cell>
          <md-table-cell md-label="Ending Day" md-sort-by="endDay">{{ item.endDay }}</md-table-cell>
          <md-table-cell md-label="Ending Time" md-sort-by="endTime">{{ item.endTime }}</md-table-cell>
          <md-table-cell>
            <md-button class="md-raised md-accent" @click="active = true, timeID = item.id">Unassign</md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <v-tour name="unCalS" :steps="steps"></v-tour>

    <md-dialog-confirm
    :md-active.sync="active"
    md-title= "Unassign Calender"
    md-content= "Are you sure you want to unassign this time from the selected calendar? <br>
      By completing this action, it will affect the reports for employees assigned to this calendar."
    md-confirm-text="Agree"
    md-cancel-text="Cancel"
    @md-cancel="onCancel"
    @md-confirm="unassign" />
  </div>
</template>

<script>
  import http from "../../public/app.service.ts";

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
  name: "unasign-TimesFromCal",
  // Angular equivaent of INPUT
  props: {},
  //  Variables
  data() {
    return {
      steps: [
        {
          target: '.unassignCalT',
          content: `This is where Calendar Times assigned to Calendars can be unassigned`,
          params: {
            placement: 'left'
          }
        },
        {
          target: '#calenders',
          content: `Firstly select a calendar`,
          params: {
            placement: 'left'
          }
        },
        {
          target: '#empTable',
          content: `Select the calendar time you would like to unassign from the calendar,
            a dialoge will prompt you to confirm, after confirmation the calendar time will be
            unassigned from the calendar.`,
          params: {
            placement: 'left'
          }
        }
      ],
      selectedTime: null,
      search: null,
      searched: [],
      calenders: [],
      calTimes: [],
      selectedCalID: null,
      active: false,
      timeID: null,
    };
  },

  watch: {
    selectedCalID: {
      handler(newValue) {
        if (newValue) {
          this.getTimes();
        }
      }
    }
  },

  methods: {
    help() {
      this.$tours['unCalS'].start();
    },

    onCancel () {
      this.active = false;
    },

    async unassign() {
      return await this.$awn.asyncBlock(http.put(`api/calender_times/unassign/time/${this.timeID}`)
        .then(() => {
          const idx = this.searched.findIndex((time) => time.id === this.timeID);
          if (idx > -1) {
            this.searched.splice(idx, 1);
          }
          this.$awn.success("Successfully unassigned time from calendar");
        })
        .catch(() => {
          this.$awn.alert("Could not unassigned time from calendar");
        }), null, null, 'Un-assigning');
    },

    async getTimes() {
      this.searched = [];
      this.calTimes = [];
      return await this.$awn.asyncBlock(http.get(`/api/calender_times/assigned/cal/times/${this.selectedCalID}`)
        .then(res => {
          res.data.forEach(d => {
            let start;
              switch (d.startDay) {
                case 1:
                  start = 'Monday';
                  break;
                case 2:
                  start = 'Tuesday';
                  break;
                case 3:
                  start = 'Wednesday';
                  break;
                case 4:
                  start = 'Thursday';
                  break;
                case 5:
                  start = 'Friday';
                  break;
                case 6:
                  start = 'Saturday';
                  break;
                case 7:
                  start = 'Sunday';
                  break;
              }
              let end;
              switch (d.endDay) {
                case 1:
                  end = 'Monday';
                  break;
                case 2:
                  end = 'Tuesday';
                  break;
                case 3:
                  end = 'Wednesday';
                  break;
                case 4:
                  end = 'Thursday';
                  break;
                case 5:
                  end = 'Friday';
                  break;
                case 6:
                  end = 'Saturday';
                  break;
                case 7:
                  end = 'Sunday';
                  break;
              }
            let data = {
                'id': d.id,
                'calender_id': d.calender_id,
                'startDay': start,
                'startTime': d.startTime,
                'endDay': end,
                'endTime': d.endTime
              }
            this.calTimes.push(data);
          });
          this.searched = this.calTimes;
          return true;
        })
        .catch(err => {
          let error = err.toString().indexOf("404");
          error > -1
            ? this.$awn.warning("No Assigned Times")
            : this.$awn.alert("Could Not Get Times");
          return false;
        }), null, null, 'Getting Times');
    },

    async getCalendars() {
      return await this.$awn.asyncBlock(http.get(`/api/calender/assigned/calender`)
        .then(res => {
          res.data.forEach(d => {
            let data = {
              id: d.id,
              name: d.name,
              description: d.description
            };
            this.calenders.push(data);
          });
          return true;
        })
        .catch((err) => {
          let error = err.toString().indexOf('404');
          error > -1 ? this.$awn.warning("No created calendars, please add a calendar") :
          this.$awn.alert("Could Not Get Calendars");
          return false;
        }), null, null, 'Getting Calendars');
    },

    searchOnTable() {
      this.searched = searchByWeek(this.calTimes, this.search);
    },

    onSelect(item) {
      if (item) {
        this.selectedTime = item;
      }
    }
  },

  created () {
    this.searched = this.calTimes;
  },

  async beforeMount() {
    await this.getCalendars();
  }
};
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
  padding-top: 10px;
  margin: 0 auto;
  text-align: center;
  width: 50%;
}

.md-table-cell {
  text-align: left;
  max-width: 120px;
}

.md-field {
  max-width: 300px;
}

.md-table-toolbar {
  text-align: left;
}

.box {
  -webkit-border-radius: 6px;
  border-radius: 6px;
}
</style>