<template>
  <div>
    <div class="center" v-if="!addEmployee">
      <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">{{ title }}</h1>
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
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
          <md-table-cell md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
          <md-table-cell v-if="standard !== false" md-label="Update" >
            <md-button class="md-raised md-primary" @click="updateEmployee(item)">
              Update
            </md-button>
          </md-table-cell>
          <md-table-cell v-if="standard !== false" md-label="Delete" >
            <md-button class="md-raised md-accent">
              delete
            </md-button>
          </md-table-cell>
        </md-table-row>
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
      }
    },

    components: {
      addEmployee,
    },

    created: () => {
      this.getEmployees();
    },

    methods: {
      getEmployees() {
        let api = '';
        (this.standard !== false) ? api ='/api/employee/' : api = '/api/employee/unassigned/employees';
        http.get(api)
          .then((res) => {
            res.data.forEach(d => {
              let boolAdmin = 'no';
              (d.admin !== 0) ? boolAdmin = 'yes' : '';

              let boolReport = 'no';
              (d.reporting_admin !== 0) ? boolReport = 'yes' : '';
              let data = {
                'id': d.id,
                'name': d.name,
                'admin': boolAdmin,
                'reporting_admin': boolReport,
              }
              this.employees.push(data);
            });
          console.log('Successfully got employees');
        }).catch((error) => {
          console.log(error);
        });
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

      newCard () {
        window.alert('Noop')
      },

      searchOnTable () {
        this.searched = searchByName(this.employees, this.search);
      }
    },

    created () {
      this.searched = this.employees;
    },


    beforeMount() {
      this.getEmployees();
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
    text-align: center;
    max-width: 120px;
  }

  .md-field {
    max-width: 300px;
  }

  .md-table-toolbar {
    text-align: left;
  }
</style>
