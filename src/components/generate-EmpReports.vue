<template>
  <div>
    <!-- INPUTS -->
    <div>
      <div class="md-layout">
        <md-card class="md-layout-item md-size-70 md-small-size-100 center box">
          <md-card-header>
            <h2>Please select employee/s and time frame</h2>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
            <!-- EMPLOYEES LEFT -->
            <div class="md-layout-item md-small-size-100">
              <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table box">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title"> Employee's </h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by calendar name..." v-model="search" @input="searchOnTable"/>
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state
                  md-label="No employees's found"
                  :md-description="`No employee's found for this '${search}' query. Try a different search term.`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
                  <md-table-cell md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
                  <md-table-cell md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
                  <md-table-cell md-label="Active" md-sort-by="active">{{ item.active }}</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
            <!-- CALENDAR RIGHT -->
            <div class="md-layout-item md-small-size-100">
              <md-card style="height: 50%">
                <VueCtkDateTimePicker id="range" name="range" v-model="range" label="Select Date Range"
                                      format="YYYY-MM-DD" :range=true :inline=true formatted="ll"
                                      color="#27C96D" :dark=true :persistent=true :isSelected=true>
                </VueCtkDateTimePicker>
              </md-card>
            </div>
             </div>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary" @click="getReportData()">Generate Reports</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
    <br>
    <md-divider class="md-inset"></md-divider>
    <br>
    <!-- CHARTS -->
    <div class="md-layout" v-if="displayCharts">
      <md-card class="md-layout-item md-size-78 md-small-size-100 center box">
        <md-card-content>
          <!-- LEVEL 1 -->
          <div class="md-layout md-gutter">
            <!-- Worked Hours  -->
            <div class="md-layout-item md-small-size-100 center" style="padding-left: 3%">
              <apexcharts width="800" height="350" type="bar" :options="workHrsDataPerDay" :series="workSeriesPerDay"></apexcharts>
            </div>
            <div class="md-layout-item md-small-size-100 center" style="padding-left: 3%">
              <apexcharts width="800" height="350" type="bar" :options="workHrsDataPerMonth" :series="workSeriesPerMonth"></apexcharts>
            </div>
            <!-- Clock Reasons TIme Not Worked  -->
            <div class="md-layout-item md-small-size-100 center" style="padding-left: 4%">
              <apexcharts width="400" height="332" type="radialBar" :options="clockReasonsNonWork" :series="clockReasonsNonWorkSeries"></apexcharts>
            </div>
            <!-- Clock Reasons TIme Worked  -->
            <div class="md-layout-item md-small-size-100 center" style="padding-left: 3%">
              <apexcharts width="400" height="325" type="radialBar" :options="clockReasonsWork" :series="clockReasonsWorkSeries"></apexcharts>
            </div>
          </div>
          <br>
          <!-- LEVEL 2 -->
          <div class="md-layout md-gutter">
            <!-- Clock Reasons TIme Not Worked  -->
            <div class="md-layout-item md-small-size-100" style="padding-left: 16%">
              <apexcharts width="800" height="350" type="line" :options="overNotClockingData" :series="overNotClockingSeries"></apexcharts>
            </div>
            <!-- Rank of Reasons  -->
            <div class="md-layout-item md-small-size-100">
              <apexcharts width="400" height="350" type="radar" :options="reasonsRankData" :series="reasonsRankSeries"></apexcharts>
            </div>
            <!-- Rank of Reasons 
            <div class="md-layout-item md-small-size-100" style="padding-left: 38%">
              <apexcharts width="400" height="350" type="radar" :options="employeeRankData" :series="employeeRankSeries"></apexcharts>
            </div> -->
          </div>
          <!-- LEVEL 3 -->
          <div class="md-layout md-gutter">

            <!-- Clock Reasons TIme Not Worked  -->
            <div class="md-layout-item md-small-size-100">

            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
     <!-- Clocked Employees -->
      <div class="md-layout">
        <md-card class="md-layout-item md-size-78 md-small-size-100 center box">
          <md-card-content>
            <md-table v-model="clockedEmp" md-sort="name" md-sort-order="asc" md-card md-fixed-header
              class="table box">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title"> Employee's Clocked</h1>
                </div>
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No Clocked employees's">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Reason" md-sort-by="reason_description">{{ item.reason_description ? item.reason_description : '-' }}</md-table-cell>
                <md-table-cell md-label="In / Out" md-sort-by="is_logged_out">{{ item.is_logged_out === 1 ? 'Out' : 'In' }}</md-table-cell>
                <md-table-cell md-label="Work Related" md-sort-by="workRelated">{{ item.workRelated }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import http from '../../public/app.service.ts';

   const toLower = text => {
    return text.toString().toLowerCase();
  }

  const searchByEmpName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)));
    }
    return items
  }

  export default {
    components: {
      apexcharts: VueApexCharts,
    },

    name: 'generate-EmpReports',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        // Worked Hours Data, series
        workHrsDataPerDay: {
          title: {
            text: 'Worked Hours Per Day',
            align: 'center',
            floating: false,
            style: {
              fontSize:  '20px',
              color:  '#ffffff'
            },
          },
          theme: {
            mode: 'dark',
            palette: 'palette1',
          },
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '55%',
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 4,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          yaxis: {
            title: {
              text: 'Worked Hours'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val + " Hours"
              }
            }
          }
        },
        workSeriesPerDay: [{
            name: 'Hours Worked',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }
        ],

        workHrsDataPerMonth: {
          title: {
            text: 'Worked Hours Per Month',
            align: 'center',
            floating: false,
            style: {
              fontSize:  '20px',
              color:  '#ffffff'
            },
          },
          theme: {
            mode: 'dark',
            palette: 'palette1',
          },
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '55%',
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 4,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          yaxis: {
            title: {
              text: 'Worked Hours'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val + " Hours"
              }
            }
          }
        },
        workSeriesPerMonth: [{
            name: 'Hours Worked',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }
        ],

        // Clock Reasons Time (Not worked) data, series
        clockReasonsNonWork: {
          title: {
            text: 'Clock Reasons Time Not Worked',
            align: 'center',
            floating: false,
            style: {
              fontSize:  '20px',
              color:  '#ffffff'
            },
          },
          theme: {
            mode: 'dark',
            palette: 'palette8',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                total: {
                  show: true,
                  label: 'Average'
                }
              }
            }
          },
          labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D'],
          tooltip: {
            y: {
              formatter: function(val) {
                return val + " Hours"
              }
            }
          }
        },
        clockReasonsNonWorkSeries: [10, 20, 30, 40],
        // Clock Reasosn time (worked) data, series
        clockReasonsWork: {
          title: {
            text: 'Clock Reasons Time Worked',
            align: 'center',
            floating: false,
            style: {
              fontSize:  '20px',
              color:  '#ffffff'
            },
          },
          theme: {
            mode: 'dark',
            palette: 'palette1',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                total: {
                  show: true,
                  label: 'Average'
                }
              }
            }
          },
          labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D'],
          tooltip: {
            y: {
              formatter: function(val) {
                return val + " Hours"
              }
            }
          }
        },
        clockReasonsWorkSeries: [40, 50, 60, 70],
        // Over time vs Not clocking out data, series
        overNotClockingData: {
          theme: {
            mode: 'dark',
            palette: 'palette1',
          },
          stroke: {
            width: [0, 4],
            curve: 'smooth',
          },
          title: {
            text: 'Overtime vs Not Clocking Out'
          },
          // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001',
            '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'
          ],
          xaxis: {
            type: 'datetime'
          },
          yaxis: [{
            title: {
              text: 'Overtime',
            },
          }, {
            opposite: true,
            title: {
              text: 'Not Clocking Out'
            }
          }]
        },
        overNotClockingSeries: [{
            name: 'Overtime',
            type: 'column',
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
          }, {
            name: 'Not Clocking Out',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
          }
        ],
        // Rank of reasons
        reasonsRankData: {
          theme: {
            mode: 'dark',
            palette: 'palette1',
          },
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          plotOptions: {
            radar: {
              size: 140,
              polygons: {
                strokeColor: '#A6A6A6',
                fill: {
                  colors: ['#A6A6A6', '#fff']
                }
              }
            }
          },
          title: {
            text: 'Rank of Reasons'
          },
          colors: ['#FF4560'],
          markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#FF4560',
            strokeWidth: 2,
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val
              }
            }
          },
          yaxis: {
            show: false,
            tickAmount: 7,
            labels: {
              formatter: function(val, i) {
                if(i % 2 === 0) {
                  return val
                } else {
                  return ''
                }
              }
            }
          }
        },
        reasonsRankSeries: [{
          name: 'Series 1',
          data: [20, 100, 40, 30, 50, 80, 33],
        }],
        // Rank of employees
        employeeRankData: {
          theme: {
            mode: 'dark',
            palette: 'palette1',
          },
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Saturday'],
          plotOptions: {
            radar: {
              size: 140,
              polygons: {
                strokeColor: '#A6A6A6',
                fill: {
                  colors: ['#A6A6A6', '#fff']
                }
              }
            }
          },
          title: {
            text: 'Rank of Employees'
          },
          colors: ['#2E2EFE'],
          markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#2E2EFE',
            strokeWidth: 2,
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val
              }
            }
          },
          yaxis: {
            show: false,
            tickAmount: 7,
            labels: {
              formatter: function(val, i) {
                if(i % 2 === 0) {
                  return val
                } else {
                  return ''
                }
              }
            }
          }
        },
        employeeRankSeries: [{
          name: 'Series 1',
          data: [20, 100, 40, 30, 50, 80, 33, 55],
        }],

        // OTHER VARIABLES
        employees: [],
        searched: [],
        selectedEmps: [],
        search: '',
        displayCharts: false,
        range: null,
        clockedEmp: []
      }
    },
    methods: {

      async getEmployees() {
        return await this.$awn.asyncBlock(http.get(`/api/employee/`)
          .then((res) => {
            res.data.forEach(d => {
              if (d.name) {
                let boolAdmin = 'yes';
                (d.admin !== 1) ? boolAdmin = 'no' : '';

                let boolReport = 'yes';
                (d.reporting_admin !== 1) ? boolReport = 'no' : '';

                let active = false;
                (d.active !== 0) ? active = 'yes' : active = 'no';
                let data = {
                  'id': d.id,
                  'name': d.name,
                  'admin': boolAdmin,
                  'reporting_admin': boolReport,
                  'active': active
                }
                active ? this.employees.push(data) : null
              }
            });
          return true;
        }).catch((err) => {
          let error = err.toString().indexOf('404');
          (error > -1) ? this.$awn.warning('No Employees') :
          this.$awn.alert('Could Not Get Employees');
          return false;
        }), null, null, 'Getting Employees');
      },

      async getEmpsInOut()  {
        return await this.$awn.asyncBlock(http.get(`/api/reports/getUsersInAndOut`)
          .then((res) => {
            res.data.forEach(d => {
              let workRelated = 'yes';
                (d.reason_description !== 1) ? workRelated = 'no' : '';

              let data = {
                'name': d.name,
                'reason_description': d.reason_description,
                'workRelated': workRelated
              }
              this.clockedEmp.push(data);
            });
          return true;
        }).catch((err) => {
          let error = err.toString().indexOf('404');
          (error > -1) ? this.$awn.warning('No Employees') :
          this.$awn.alert('Could Not Get Employees');
          return false;
        }), null, null, 'Getting Employees');
      },

      async getReportData()  {
        let start = '';
        let end = '';
        if (this.range != null) {
          if (this.range.start) {
            start = Date.parse(this.range.start + 'T00:00:00');
            if (this.range.end) {
              end = Date.parse(this.range.end + 'T23:59:59');
            } else {
              end = Date.parse(this.range.start + 'T23:59:59');
            }
          }
        }
        let emps = [];
        this.selectedEmps.forEach(e => {
          emps.push(e.id);
        });
        return await this.$awn.asyncBlock(http.post(`/api/reports/reports/`, {
          'start': start,
          'end': end,
          'employees': emps
        }).then((res) => {
          this.displayCharts = true

          if (res.data[0].data && Object.prototype.toString.call(res.data[0].data) === '[object Object]') {
            const labels = Object.keys(res.data[0].data) || [];
            const values = [];
            for (const label of labels) {
              values.push(+res.data[0].data[label] || 0);
            }
            this.$set(this.clockReasonsNonWork, 'labels', labels);
            this.clockReasonsNonWorkSeries = values;
          }

          if (res.data[1].data && Object.prototype.toString.call(res.data[1].data) === '[object Object]') {
            const labels = Object.keys(res.data[1].data) || [];
            const values = [];
            for (const label of labels) {
              values.push(+res.data[1].data[label] || 0);
            }
            this.$set(this.clockReasonsWork, 'labels', labels);
            this.clockReasonsWorkSeries = values;
          }

          if (res.data[2].data && Object.prototype.toString.call(res.data[2].data) === '[object Object]') {
            const labels = Object.keys(res.data[2].data) || [];
            const values = [];
            for (const label of labels) {
              values.push(+res.data[2].data[label] || 0);
            }
            this.$set(this.reasonsRankData, 'labels', labels);
            this.reasonsRankSeries = [{name: 'Series 1', data: values}];
          }

          if (res.data[3].data && Object.prototype.toString.call(res.data[3].data) === '[object Object]') {
            if (res.data[3].data.day && Object.prototype.toString.call(res.data[3].data.day) === '[object Object]') {
              // Create the hours worked per day chart
              const dayMap = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
              const dayKeys = Object.keys(res.data[3].data.day) || [];
              const labels = dayKeys.map(dayKey => dayMap[+dayKey]);
              const onSite = [];
              const offSite = [];
              for (const dayKey of dayKeys) {
                onSite.push( +((res.data[3].data.day[dayKey].onSite || 0) / 60).toFixed(2));
                offSite.push( +((res.data[3].data.day[dayKey].offSite || 0) / 60).toFixed(2));
              }
              this.$set(this.workHrsDataPerDay, 'xaxis', {categories: labels});
              this.workSeriesPerDay = [{name: 'Onsite Hours Worked', data: onSite}, {name: 'Offsite Hours Worked', data: offSite}];
            }

            if (res.data[3].data.month && Object.prototype.toString.call(res.data[3].data.motnh) === '[object Object]') {
              // Create the hours worked per month chart
              const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const monthKeys = Object.keys(res.data[3].data.month) || [];
              const labels = monthKeys.map(monthKey => monthMap[+monthKey]);
              const onSite = [];
              const offSite = [];
              for (const monthKey of monthKeys) {
                onSite.push( +((res.data[3].data.month[dayKey].onSite || 0) / 60).toFixed(2));
                offSite.push( +((res.data[3].data.month[dayKey].offSite || 0) / 60).toFixed(2));
              }
              this.$set(this.workHrsDataPerMonth, 'xaxis', {categories: labels});
              this.workSeriesPerMonth = [{name: 'Onsite Hours Worked', data: onSite}, {name: 'Offsite Hours Worked', data: offSite}];
            }
          }

          if (res.data[4].data && Object.prototype.toString.call(res.data[4].data) === '[object Object]') {
            const dayMap = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

            const dayKeys = Object.keys(res.data[4].data) || [];
            const labels = dayKeys.map(dayKey => dayMap[+dayKey]);
            const values = [];
            for (const dayKey of dayKeys) {
              values.push( +((res.data[4].data[dayKey] || 0) / 60).toFixed(2));
            }
            this.$set(this.overNotClockingData, 'labels', labels);
            this.overNotClockingSeries = [{name: 'Overtime', type: 'column', data: values}];
          }

          this.$awn.success('Successfully Generated Reports');
          return true;
        }).catch(() => {
          this.$awn.alert('Could Not Generate Reports');
          return false;
        }), null, null, 'Generating Reports');
      },

      onSelect(items) {
        if (items) {
          this.selectedEmps = items;
        }
      },
      searchOnTable () {
        this.searched = searchByEmpName(this.employees, this.search);
      },
    },

    created () {
      this.searched = this.employees;
    },

    beforeMount() {
      this.getEmployees();
      this.getEmpsInOut();
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

  .box {
    -webkit-border-radius: 6px;
    border-radius: 6px;
  }

  .md-table {
    padding-top: 10px;
    margin: 0 auto;
    text-align: left;
    width: 80%
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