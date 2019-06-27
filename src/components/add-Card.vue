<template>
  <div>
    <!-- Form for entering information -->
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <!-- Display inputs on card -->
      <md-card class="md-layout-item md-size-50 md-small-size-100 center">
        <!-- Header for card -->
        <md-card-header>
          <div class="md-title">Add card to be assigned to employee</div>
        </md-card-header>
        <!-- Content to be displayed on cards -->
        <md-card-content>
          <div class="md-layout md-gutter" >
            <!-- tag -->
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('tag')" >
                <label for="tag">Enter card number / Scan card</label>
                <md-input name="tag" id="tag" v-model="form.tag" :disabled="processing" @keyup.enter="onEnter" autofocus=true />
                <span class="md-error" v-if="!$v.form.tag.required">The card number is required</span>
                <span class="md-error" v-else-if="!$v.form.tag.minlength">Invalid card number</span>
              </md-field>
            </div>
            <!-- Assign to employee -->
            <div class="md-layout-item md-small-size-100" v-show="standard !== false">
              <md-checkbox name="assign" id="assign" v-model="form.assign" :disabled="processing" autofocus=true>
                Assign card to employee
              </md-checkbox>
            </div>
          </div>
        </md-card-content>
        <div v-if="standard !== false">
          <md-card-actions >
            <md-button style="color: orange" v-on:click="clearForm">Cancel</md-button>
            <md-button style="color: lime" v-on:click="addCard">Add Card</md-button>
          </md-card-actions>
        </div>
        <!-- Part of assign card process -->
        <div v-if="standard === false">
          <p v-if="cardExists" style="color: red"> Card already exits...<br> Please create a new card </p>
          <md-card-actions>
            <md-button style="color: orange" v-on:click="onEnter">Validate Card</md-button>
          </md-card-actions>
        </div>
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
  import http from '../../public/app.service.ts';
  import selectCardForEmployee from './assign-card-process/select-CardForEmployee.vue';

  export default {
    name: 'add-Card',
    mixins: [validationMixin],
    // Angular equivaent of INPUT
    props: {
      standard: true
    },
    //  Variables
    data() {
      return {
        form: {
          tag: '',
          assign: false,
        },
        processing: null,
        showCreated: false,
        cardExists: false,
      }
    },
    validations: {
      form: {
        tag: {
          required,
          minLength: minLength(3)
        },
      },
    },

    components: {
      selectCardForEmployee,
    },

    methods: {

      onEnter() {
        this.addCard();
      },

      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      async addCard() {
        if (await this.checkCardExists()) {
          http.post(`/api/card/create`, {
            'card_no': this.form.tag
          }).then((resp) => {
            if (resp.status === 201) {
              console.log('created');
              this.$store.dispatch('updateCardNo', this.form.tag);
              this.form.tag = '';
              document.getElementById('tag').focus();
            }
          }).catch((err) => {
            console.log('AN ERROR HAS OCCURED');
            console.log(err);
          });
        } else {
          console.log('card already exists');
          this.form.tag = '';
          this.cardExists = true;
        }
      },

      clearForm() {
        this.$v.$reset();
        this.form.tag = '';
      },

       async checkCardExists() {
        return await http.get(`/api/card/card_no/${this.form.tag}`)
          .then((data) => false)
          .catch(err => true);
      },

      validateUser() {
        this.$v.$touch()
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
    width: 50%;
  }
</style>
