<template>
  <div>
    <div>
      <md-toolbar>

      <!-- Calenders -->
      <md-menu md-size="medium" md-align-trigger :mdCloseOnSelect=true>
        <md-button md-menu-trigger>Calenders</md-button>
        <md-menu-content>
          <md-menu-item to="/management/addCalendar">
            Add Calendar
          </md-menu-item>
          <md-menu-item to="/management/addCalendarTimes">
            Add Calendar Times
          </md-menu-item>
          <md-menu-item to="/management/viewCalendar">
            View Calendars
          </md-menu-item>
          <md-menu-item to="/management/viewCalendarTimes">
            View Calendar Times
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Cards -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Cards</md-button>
        <md-menu-content>
          <md-menu-item to="/management/addCard">
            Add Card
          </md-menu-item>
          <md-menu-item to="/management/selectCardForEmployee">
            View Employee Cards
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Employees -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Employees</md-button>
        <md-menu-content>
          <md-menu-item to="/management/addEmployee">
            Add Employee
          </md-menu-item>
          <md-menu-item to="/management/viewEmployee">
            View Employees
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Processes -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Processes</md-button>
        <md-menu-content>
          <md-menu-item to="/management/assignCardProcess">
            Assign Card To Employee
          </md-menu-item>
          <md-menu-item to="/management/assignCalendarTimes">
            Assign Calendar To Times
          </md-menu-item>
            <md-menu-item to="/management/assignCalendar">
             Assign Calendar To Employee
            </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Reasons -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Reasons</md-button>
        <md-menu-content>
          <md-menu-item to="/management/addReason">
            Add Reason
          </md-menu-item>
          <md-menu-item to="/management/viewReasons">
            View Reasons
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Reports -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Reports</md-button>
        <md-menu-content>
          <md-menu-item to="/management/employeeReports">
            Generate Employee Reports
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
  import http from '../../public/app.service.ts';
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
      checkConnectivity() {
        http.get(`/api`)
        .then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
      }
    },

    beforeMount() {
      this.checkConnectivity();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-button {
    color: aqua;
  }
</style>
