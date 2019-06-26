<template>
  <div>
    <div v-if="!cardData" class="center">
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
          md-label="No unused cards found"
          :md-description="`No card found for this '${search}' query. Try a different search term or create a new card.`">
          <md-button class="md-primary md-raised" @click="newCard">Create New Card</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Employee Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Admin" md-sort-by="admin">{{ item.admin }}</md-table-cell>
          <md-table-cell md-label="Reporting Admin" md-sort-by="reporting_admin">{{ item.reporting_admin }}</md-table-cell>
          <md-table-cell v-if="!cardData" md-label="Update" >
            <md-button class="md-raised md-primary">
              Update
            </md-button>
          </md-table-cell>
          <md-table-cell v-if="!cardData" md-label="Delete" >
            <md-button class="md-raised md-accent">
              delete
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
  import http from '../../public/app.service.ts'

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
      cardData: null,
    },
    //  Variables
    data() {
      return {
        employees: [],
        selectedEmployee: null,
        search: null,
        searched: [],
        title: 'Employees',
      }
    },

    created: () => {
      this.getEmployees();
    },

    methods: {
      getEmployees() {
        http.get(`/api/employee/`)
          .then((res) => {
            res.data.forEach(d => {
              let boolAdmin = 'no';
              if (d.admin !== 0) {
                boolAdmin = 'yes'
              }

              let boolReport = 'no';
              if (d.reporting_admin !== 0) {
                boolReport = 'yes'
              }
              let data = {
                'id': d.id,
                'name': d.name,
                'admin': boolAdmin,
                'reporting_admin': boolReport,
              }
              this.employees.push(data);
            });
          this.employees.toString();
        }).catch((error) => {
          console.log(error);
        });
      },

      onSelect(item) {
        this.selectedEmployee = item;
        if (this.selectedEmployee) {
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
