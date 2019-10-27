<template>
  <div>
    <md-button class="md-icon-button md-dense topLeft" v-if="standard !== false" @click="help">
      <md-tooltip md-direction="left">Click Me For Help</md-tooltip>
      <md-icon>help_outline</md-icon>
    </md-button>
    <br>
    <div class="center" v-if="!addEmployee">
      <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table box" id="createdEmpST">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">{{ title }}</h1>
              <md-checkbox v-model="showDeleted" @click="changeView" v-if="standard !== false">
                Show Deactivated Employees
              </md-checkbox>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search for employee..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state v-if="!showDeleted"
          md-label="No Employees found"
          :md-description="`No Employees found for this search term. Try a different search term or create a new Employee.`">
          <md-button class="md-primary md-raised" @click="addEmployee = true">Create New Employee</md-button>
        </md-table-empty-state>

        <md-table-empty-state v-if="showDeleted"
          md-label="No Employees found"
          :md-description="`No Employees found for this search term. Try a different search term.`">
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
          <md-table-cell md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
          <md-table-cell v-if="standard !== false && !showDeleted">
            <md-button class="md-raised md-primary" @click="updateEmployee(item)">
              <md-icon>update</md-icon>
              Update
            </md-button>
          </md-table-cell>
          <md-table-cell v-if="standard !== false && !showDeleted && loggedIn.name != item.name">
            <md-button class="md-raised md-accent" @click="ChangeActiveState(item, false)">
              <md-icon>warning</md-icon>
              Deactivate
            </md-button>
          </md-table-cell>
          <md-table-cell v-if="standard !== false && showDeleted">
            <md-button class="md-raised" @click="ChangeActiveState(item, true)">
              Restore
            </md-button>
          </md-table-cell>
          <md-table-cell v-if="standard !== false && showDeleted">
            <md-button class="md-raised md-accent" @click="set(true, item.id)">
              Permanently Delete
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <v-tour name="viewCal" :steps="steps"></v-tour>
    </div>
    <div v-if="addEmployee">
      <!-- Create a new employee -->
      <addEmployee @canceled='canceledAdd' @added="added = true" v-bind:standard=false></addEmployee>
    </div>
    <div v-if="added">
      <h1>Successfully added employee!</h1>
      <h3>Please press continue</h3>
    </div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title= "Unassign Calender"
      md-content= "Are you sure you want to permanently delete this employee? <br> This action can not be undone"
      md-confirm-text="Agree"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="PermDelete" />
  </div>
</template>

<script>
  import http from '../../public/app.service.ts';
  import addEmployee from './add-Employee.vue';

  const toLower = text => {
    return text.toString().toLowerCase();
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)));
    }
    return items
  }
  // TODO: DELETE EMPLOYEE
  export default {
    name: 'view-Employee',
    // Angular equivaent of INPUT
    props: {
      standard: true,
      calUnAssigned: false,
    },
    //  Variables
    data() {
      return {
        steps: [
          {
            target: '#createdEmpST',
            content: `This is where all created employees can be updated / deleted.`,
            params: {
              placement: 'left'
            }
          }
        ],
        employees: [],
        selectedEmployee: null,
        search: null,
        searched: [],
        title: 'Employees',
        addEmployee: false,
        updateEmp: false,
        added: false,
        showDeleted: false,
        delEmp: [],
        active: false,
        id: ''
      }
    },

    components: {
      addEmployee,
    },

    watch: {
      showDeleted: {
        handler() {
          this.changeView();
        }
      }
    },

    methods: {
      help() {
        this.$tours['viewCal'].start();
      },

      set(active, id) {
        this.active = active;
        this.id = id;
      },

      onCancel () {
        this.active = false;
      },

      async PermDelete() {
        return await this.$awn.asyncBlock(http.delete(`/api/employee/${this.id}`, {}).then(() => {
            this.$awn.success('Permanently Deleted Employee');
            const idx = this.delEmp.findIndex((emp) => emp.id === this.id);
              if (idx > -1) {
                this.delEmp.splice(idx, 1);
              }
            return true
          }).catch((err) => {
            this.$awn.alert('Could Not Permanently Delete Employee');
            return false
          }), null, null, 'Deleting Employee');
      },

      async getEmployees(api) {
        return await http.get(api)
          .then((res) => {
            res.data.forEach(d => {
              if (d.name) {
                let boolAdmin = 'no';
                (d.admin !== 0) ? boolAdmin = 'yes' : '';

                let boolReport = 'no';
                (d.reporting_admin !== 0) ? boolReport = 'yes' : '';

                let active = false;
                (d.active !== 0) ? active = true : active = false;
                let data = {
                  'id': d.id,
                  'name': d.name,
                  'admin': boolAdmin,
                  'reporting_admin': boolReport,
                  'active': active
                }
                active ? this.employees.push(data) : this.delEmp.push(data);
              }
            });
          return true;
        }).catch((err) => {
          let error = err.toString().indexOf('404');
          (error > -1) ? this.$awn.warning('No created employees, please create an employee') :
          this.$awn.alert('Could Not Get Employees');
          return false;
        });
      },

      async ChangeActiveState(item, bool) {
        return await this.$awn.asyncBlock(http.put(`api/employee/delete/${item.id}`, {
          'id': item.id,
          'active': bool,
        }).then(() => {
            if (!bool) {
              const idx = this.employees.findIndex((emp) => emp.id === item.id);
              if (idx > -1) {
                this.employees[idx].active = bool;
                this.delEmp.push(this.employees[idx]);
                this.employees.splice(idx, 1);
              }
            } else {
              const idx = this.delEmp.findIndex((emp) => emp.id === item.id);
              if (idx > -1) {
                this.delEmp[idx].active = bool;
                this.employees.push(this.delEmp[idx]);
                this.delEmp.splice(idx, 1);
              }
            }
            !bool ? this.$awn.success('Successfully Deactivated Employee') :
              this.$awn.success('Successfully Restored Employee Employee');
            return true
          }).catch(() => {
            this.$awn.alert('Could Not Delete Employee');
            this.$awn.alert('Could Not Deactivate Employee');
            return false
          }), null, null);
      },

      changeView() {
        if (this.showDeleted) {
          this.searched = this.delEmp;
        } else {
          this.searched = this.employees;
        }
      },

      async determine() {
        if (this.standard !== false) {
          this.title = 'Employees';
          let api = '/api/employee/';
          await this.getEmployees(api);
        } else if (this.standard === false && this.calUnAssigned !== true) {
          this.title = 'Select Unassigned Employee';
          let api = '/api/employee/unassigned/employees';
          await this.getEmployees(api);
        } else if (this.standard === false && this.calUnAssigned === true) {
          this.title = 'Select Unassigned Employee';
          let api = `/api/employee/unassigned/employees/calendars/${this.calData.id}`;
          await this.getEmployees(api);
        }
      },

      updateEmployee(item) {
        this.updateEmp = true;
        item.update = true;

        this.$store.dispatch('updateEmp', item);
        this.$router.push('/management/addEmployee');
      },

      canceledAdd() {
        this.addEmployee = false;
      },

      canceledUpdate() {
        this.updateEmp = false;
      },

      onSelect(item) {
        if (item) {
          this.selectedEmployee = item;
          if (this.standard === false) {
            this.$store.dispatch('updateEmployeeInfo', item);
          }
        }
      },

      searchOnTable () {
        this.searched = searchByName(this.employees, this.search);
      }
    },

    created () {
      this.searched = this.employees;
    },


    beforeMount() {
      this.$awn.asyncBlock(this.determine(), null, null);
    },

    computed: {
      addCanceled() {
        return this.$store.getters.cancelAddEmp;
      },
      calData() {
        return this.$store.getters.calendarData;
      },
      loggedIn() {
        return this.$store.getters.loginInfo;
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

  .topLeft {
    position: absolute;
    right:    0;
    top: 100;
  }
</style>
