<template>
  <div>
    <div class="center" v-if="!addEmployee">
      <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table box">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">{{ title }}</h1>
              <md-checkbox v-model="showDeleted" v-if="standard !== false">
                Show Deleted Employees
              </md-checkbox>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search for employee..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No unassigned Employees found"
          :md-description="`No Employees found for this '${search}' query. Try a different search term or create a new Employee.`">
          <md-button class="md-primary md-raised" @click="addEmployee = true">Create New Employee</md-button>
        </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
            <!-- NOT DELTED -->
            <md-table-cell md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
            <md-table-cell md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
            <md-table-cell v-if="standard !== false">
              <md-button class="md-raised md-primary" @click="updateEmployee(item)">
                Update
              </md-button>
            </md-table-cell>
            <md-table-cell v-if="standard !== false">
              <md-button class="md-raised md-accent" @click="deleteEmp(item, false)">
                delete
              </md-button>
            </md-table-cell>
          </md-table-row>
          <!-- <md-table-cell v-if="item.active === 'active'" md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell v-if="item.active  === 'active'" md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
          <md-table-cell v-if="item.active  === 'active'" md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
          <md-table-cell v-if="item.active  === 'active' && standard !== false" md-label="Status" md-sort-by="active">{{ item.active }}</md-table-cell>
          <md-table-cell v-if="standard !== false && item.active  === 'active'">
            <md-button class="md-raised md-primary" @click="updateEmployee(item)">
              Update
            </md-button>
          </md-table-cell>
          <md-table-cell v-if="standard !== false && item.active  === 'active'">
            <md-button class="md-raised md-accent" @click="deleteEmp(item, false)">
              delete
            </md-button>
          </md-table-cell> -->
          <!-- DELTED -->
          <!-- <md-table-cell v-if="item.active === 'deleted' && showDeleted" md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell v-if="item.active  === 'deleted' && showDeleted" md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
          <md-table-cell v-if="item.active  === 'deleted' && showDeleted" md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
          <md-table-cell v-if="item.active  === 'deleted' && showDeleted" md-label="Status" md-sort-by="active">{{ item.active }}</md-table-cell>
          <md-table-cell v-if="showDeleted && item.active  === 'deleted' ">
            <md-button class="md-raised md-primary" @click="deleteEmp(item, true)">
              Restore
            </md-button>
          </md-table-cell> -->

      </md-table>
    </div>
    <div v-if="addEmployee">
      <!-- Create a new employee -->
      <addEmployee @canceled='canceledAdd' @added="added = true" v-bind:standard=false></addEmployee>
    </div>
    <div v-if="added">
      <h1>Successfully added employee!</h1>
      <h3>Please press continue</h3>
    </div>
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
        employees: [],
        selectedEmployee: null,
        search: null,
        searched: [],
        title: 'Employees',
        addEmployee: false,
        updateEmp: false,
        added: false,
        showDeleted: false,
      }
    },

    components: {
      addEmployee,
    },

    methods: {
      async getEmployees(api) {
        return await http.get(api)
          .then((res) => {
            res.data.forEach(d => {
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
              this.employees.push(data);
            });
          return true;
        }).catch((err) => {
          let error = err.toString().indexOf('404');
          (error) ? this.$awn.warning('No Unassigned Employees') :
          this.$awn.alert('Could Not Get Employees');
          console.log(err)
          return false;
        });
      },

      async deleteEmp(item, bool) {
        return await http.put(`api/employee/delete/${item.id}`, {
          'id': item.id,
          'active': bool,
        }).then(() => {
            const idx = this.employees.findIndex((emp) => emp.id === item.id);
            for (let k = 0; k < this.employees.lenght; k++) {
              if (this.employees[k].id === item.id) {
                (bool) ? this.employees[k].active = 'active' : this.employees[k].active = 'deleted';
              }
            }
            this.$awn.success('Successfully Deleted Employee');
            return true
          }).catch(() => {
            this.$awn.alert('Could Not Delete Employee');
            return false
          });
      },

      async determine() {
        if (this.standard !== false) {
          this.title = 'Employees';
          let api = '/api/employee/';
          await this.getEmployees(api);
        } else if (this.standard === false) {
          this.title = 'Select Unassigned Employee';
          let api = '/api/employee/unassigned/employees';
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
          this.$store.dispatch('updateEmployeeInfo', item);
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
      this.determine();
    },

    computed: {
      addCanceled() {
        return this.$store.getters.cancelAddEmp;
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
</style>
