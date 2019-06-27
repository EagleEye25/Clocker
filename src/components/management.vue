<template>
  <div>
    <md-toolbar>
      <!-- Employees -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Employees</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button>
              Add Employee
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button>
              View Employees
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

       <!-- Cards -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Cards</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button>
              Add Card
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button>
              View Cards
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

       <!-- Reasons -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Reasons</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button>
              Add Reason
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button>
              View Reasons
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Processes -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Processes</md-button>
        <md-menu-content>
          <md-menu-item>
            <md-button>
              Assign Emplyee Cards
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <!-- Calenders -->
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>Calenders</md-button>
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
