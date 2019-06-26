<template>
  <div>
    <!-- Form for entering information -->
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <!-- Display inputs on card -->
      <md-card class="md-layout-item md-size-50 md-small-size-100 center">
        <!-- Header for card -->
        <md-card-header>
          <div class="md-title">Add Employee To Clocker</div>
        </md-card-header>
        <!-- Content to be displayed on cards -->
        <md-card-content>
          <div class="md-layout md-gutter">
            <!-- First Name -->
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="processing" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>
            <!-- Last Name -->
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="given-name" v-model="form.lastName" :disabled="processing" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>
          <!-- Second Part -->
          <div class="md-layout md-gutter">
            <!-- Admin -->
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="form.admin"
                            @change="clearPass">
                  Admin
              </md-checkbox>
            </div>
            <!-- Reporting Admin -->
            <div class="md-layout-item md-small-size-100">
                <md-checkbox v-model="form.reporting_admin">
                  Reporting Admin
                </md-checkbox>
            </div>
          </div>
          <!-- Third Part -->
          <div class="md-layout md-gutter">
            <!-- Password -->
            <div class="md-layout-item md-small-size-100">
              <md-field v-show=form.admin>
                <label for="password">Password</label>
                <md-input name="password" id="password" type="password" v-model="form.password" :disabled="processing"/>
              </md-field>
            </div>
          </div>
          <!-- Fourth part -->
          <div class="md-layout md-gutter">
            <!-- Calender -->
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('calender_id')">
                <p>Calender Coming soon</p>
              </md-field>
            </div>
          </div>
        </md-card-content>

         <md-card-actions>
           <md-button style="color: orange"  v-on:click="clearForm">cancel</md-button>
           <md-button style="color: lime"  v-on:click="addEmployee">Add Employee</md-button>
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
  } from 'vuelidate/lib/validators';
  import http from '../../public/app.service.ts'

  export default {
    name: 'add-Employee',
    mixins: [validationMixin],
    // Angular equivaent of INPUT
    props: {
    },
    //  Variables
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          admin: false,
          reporting_admin: false,
          calender_id: null,
          password: null,
          userExists: false,
        },
        processing: null,
        passVis: false
      }
    },
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        admin: {
          required,
        },
        reporting_admin: {
          required
        },
        // calender_id: {
        //   // required
        // },
      }
    },

    methods: {

      async addEmployee() {
        let combinedName = (this.form.firstName + ' ' + this.form.lastName).toLowerCase();
        if (!await this.checkUser(combinedName)) {
          http.post(`/api/employee/create`, {
          'name': combinedName,
          'admin': this.form.admin,
          'reporting_admin': this.form.reporting_admin,
          'password': this.form.password,
          'calender': this.form.calender_id
        }).then((resp) => {
          if (resp.status === 201) {
            this.clearForm();
            console.log('added');
          }
        }).catch((err) => {
          console.log(err);
        })
        } else {
          console.log('employee exists');
        }
      },

      async checkUser(name) {
        return !!(await http.get(`/api/employee/findByName/${name}`)).data;
      },

      passwordVisibility() {
        if (this.form.admin == false) {
          this.passVis = false;
        } else if (this.form.admin == true) {
          this.passVis = true;
        }
      },

      clearPass() {
        this.form.password = '';
      },

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
        this.form.firstName = null
        this.form.lastName = null
        this.form.admin = false
        this.form.reporting_admin = false
        this.form.password = null
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
    display: flex;
  }


  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }
</style>
