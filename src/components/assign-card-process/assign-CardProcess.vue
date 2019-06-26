<template>
  <div>
    <div>
      <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Add Card" :md-done.sync="first">
        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button>
      </md-step>

      <md-step id="second" md-label="Assign Card To Employee" :md-error="secondStepError" :md-done.sync="second">

        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Continue</md-button>
        <md-button class="md-raised md-primary" @click="setError()">Set error!</md-button>
      </md-step>

      <md-step id="third" md-label="Complete" :md-done.sync="third">
        <md-button class="md-raised md-primary" @click="setDone('third')">Done</md-button>
      </md-step>

      </md-steppers>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'assign-CardProcess',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        active: 'first',
        first: false,
        second: false,
        third: false,
        secondStepError: null,
      }
    },

    methods: {
      setDone (id, index) {
        this[id] = true;
        this.secondStepError = null
        if (index) {
          this.active = index;
        }
      },

      setError () {
        this.secondStepError = 'This is an error!';
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
