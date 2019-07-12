<template>
  <div>
    <!-- Form for entering information -->
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <!-- Display inputs on card -->
      <md-card class="md-layout-item md-size-50 md-small-size-100 center box">
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
                <md-input name="description" id="description" autocomplete="given-name" v-model="form.description" :disabled="processing" autofocus=true />
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
            <div class="md-layout-item md-small-size-100">
              <md-checkbox v-model="form.active">
                Activate
              </md-checkbox>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <!-- Normal add -->
          <div v-if="!reasonData">
            <md-button style="color: orange" @click="clearForm">
              <md-icon>cancel</md-icon>
              Cancel
            </md-button>
            <md-button style="color: lime" v-on:click="addReason">
              <md-icon>done</md-icon>
              Add Reason
            </md-button>
          </div>
          <!-- Update Reason -->
          <div v-if="reasonData">
            <md-button style="color: orange" to="/management/viewReasons" @click="clearForm">
              <md-icon>cancel</md-icon>
              Cancel
            </md-button>
            <md-button style="color: lime" v-on:click="updateReason">
              <md-icon>update</md-icon>
              Update Reason
            </md-button>
          </div>
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
  import http from '../../public/app.service.ts'

  export default {
    name: 'add-Reason',
    mixins: [validationMixin],
    // Angular equivaent of INPUT
    props: {
      standard: false,
    },
    //  Variables
    data() {
      return {
        form: {
          description: null,
          work: false,
          active: false,
        },
        processing: null,
        reasonID: null,
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
      fillInputs() {
        if (this.reasonData) {

          this.reasonData.work === 'yes' ? this.reasonData.work = true
            : this.reasonData.work = false;
          this.reasonData.active === 0 ? this.reasonData.active = false
            : this.reasonData.active = true;

          this.form.description = this.reasonData.description;
          this.form.work = this.reasonData.work;
          this.form.active = this.reasonData.active;
        }
      },

      async updateReason() {
        return await http.put(`/api/reason/${this.reasonData.id}`, {
          'id': this.reasonData.id,
          'description': this.form.description,
          'work': this.form.work,
          'active': this.form.active
        }).then(() => {
          this.clearForm();
          this.$awn.success('Successfully Updated Reason');
          this.$store.dispatch('updateReason', null);
          this.$router.push('/management/viewReasons');
          return true;
        }).catch(() => {
          this.$awn.alert('Could Not Update Reason');
          return false;
        });
      },

      addReason() {
        http.post(`/api/reason/create`, {
          'description': this.form.description,
          'work': this.form.work,
          'active': this.form.active
        }).then((resp) => {
          if (resp.status === 201) {
            this.clearForm();
            (this.standard === false) ? this.$emit('added') : null;
            document.getElementById('description').focus();
          }
          this.$awn.success('Successfully Added Reason');
        }).catch(() => {
          this.$awn.alert('Could Not Add Reason');
        })
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
        this.$v.$reset();
        this.form.description = null;
        this.form.work = false;
        this.form.active = false;
      },

      validateUser() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    },

    computed: {
      reasonData() {
        return this.$store.getters.reasonData;
      }
    },

    beforeMount() {
      this.fillInputs();
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

  .box {
    -webkit-border-radius: 6px;
    border-radius: 6px;
  }
</style>
