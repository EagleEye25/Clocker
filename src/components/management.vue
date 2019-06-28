<template>
  <div>
    <div>
      <md-toolbar>

      <!-- Calenders -->
      <md-menu md-size="medium" md-align-trigger :mdCloseOnSelect=true>
        <md-button md-menu-trigger>Calenders</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button>

            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button>
              View Calenders
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Cards -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Cards</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button to="/management/addCard">
              Add Card
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button to="/management/selectCardForEmployee">
              View Card
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Employees -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Employees</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button to="/management/addEmployee">
              Add Employee
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button to="/management/viewEmployee">
              View Employees
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Processes -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Processes</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button to="/management/assignCardProcess">
              Assign Card To Employee
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Reasons -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Reasons</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button to="/management/addReason">
              Add Reason
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button to="/management/addEmployee">
              View Reasons
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Reports -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Reports</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button>
              Add Employee Calenders
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button>
              View Calenders
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

    </md-toolbar>
    </div>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  import addEmployee from '../components/add-Employee.vue';
  export default {
    name: 'management',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {

      }
    },

    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-button {
    color: aqua;
  }
</style>
