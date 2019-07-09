<template>
  <div>
    <div class="md-layout">
      <md-card class="md-layout-item md-size-80 md-small-size-100 center box">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <bar style="padding-left: 10px"></bar>
            </div>
            <div class="md-layout-item md-small-size-100">
              <bar></bar>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import bar from '../components/charts/bar.vue'
  export default {
    name: 'generate-EmpReports',
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {

      }
    },

    components: {
      bar
    },

    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

</style>