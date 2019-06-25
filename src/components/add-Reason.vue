<template>
  <div>
    <!-- Form for entering information -->
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <!-- Display inputs on card -->
      <md-card class="md-layout-item md-size-50 md-small-size-100 center">
        <!-- Header for card -->
        <md-card-header>
          <div class="md-title">Add Reason For Clocking Out</div>
        </md-card-header>
        <!-- Content to be displayed on cards -->
        <md-card-content>
          <div class="md-layout md-gutter" >
            <!-- Description -->
            <div class="md-layout-item md-small-size-100" style="padding-left: 180px;">
              <md-field :class="getValidationClass('description')" >
                <label for="description">Description of Reason</label>
                <md-input name="description" id="description" autocomplete="given-name" v-model="form.description" :disabled="processing" />
                <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
                <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid description</span>
              </md-field>
            </div>
            <!-- Work -->
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="form.work">
                Work related
              </md-checkbox>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button style="color: orange">Cancel</md-button>
          <md-button style="color: lime">Add Reason</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators';

  export default {
    name: 'add-Reason',
    mixins: [validationMixin],
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        form: {
          description: null,
          work: false,
        },
        processing: null,
      }
    },
    validations: {
      form: {
        description: {
          required,
          minLength: minLength(3)
        }
      },
    },

    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      clearForm() {
        this.$v.$reset()
        this.form.description = null
        this.form.work = false
      },

      validateUser() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-checkbox {
    padding-top: 10px;
    display: flex;
  }


  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }
</style>
