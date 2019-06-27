<template>
  <div>
    <div>
      <md-steppers :md-active-step.sync="active" md-linear md-dynamic-height>
      <md-step id="first" md-label="Add Card" :md-done.sync="first">
        <addCard v-bind:standard=false v-if="!showCreatedCards"></addCard>
        <!-- Displays if already created is clicked -->
        <selectCardForEmployee v-if="showCreatedCards"></selectCardForEmployee>
        <md-button style="color: yellow;" @click="showCreatedCards = true" v-if="!showCreatedCards"
          >Already created card
        </md-button>
        <md-button class="md-raised md-primary" v-if="showCreatedCards === true" @click="setDone('first', 'second')"
                  :disabled='!this.cardNumber'>
          Continue
        </md-button>
      </md-step>

      <md-step id="second" md-label="Assign Card To Employee" :md-error="secondStepError" :md-done.sync="second">
        <viewEmployee v-bind:standard=false></viewEmployee>
        <md-button class="md-raised md-primary" @click="setDone('second', 'third')"
                    :disabled='!$store.getters.employeeInfo'>
          Continue
        </md-button>
      </md-step>

      <md-step id="third" md-label="Complete" :md-done.sync="third">
        <div v-if="employeeName">
          <md-list class="md-triple-line">
            <md-list-item>

              <div class="md-list-item-text">
                <span>Employee:</span>
                <span>{{ this.employeeName }}</span>
              </div>

            </md-list-item>
            <md-list-item>

              <div class="md-list-item-text">
                <span>Card Number:</span>
                <span>{{ this.cardNumber }}</span>
              </div>

            </md-list-item>
          </md-list>
        </div>
        <md-button class="md-raised md-primary" @click="assignEmployee">Done</md-button>
      </md-step>

      </md-steppers>
    </div>
  </div>
</template>

<script>
  import http from '../../../public/app.service.ts';
  import addCard from '../add-Card.vue';
  import selectCardForEmployee from './select-CardForEmployee.vue';
  import viewEmployee from '../view-Employee.vue';

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
        showCreatedCards: false,
        cardID: null,
      }
    },

    components: {
      addCard,
      selectCardForEmployee,
      viewEmployee
    },

    watch: {
      cardNumber: {
        handler(newValue, old) {
        if (newValue) {
          if (!this.showCreatedCards) {
            this.setDone('first', 'second');
          }
        } else {
          console.log('new value is null');
        }
      }
      }
    },

    methods: {
      // async addCard() {
      //   console.log('herer:',this.employeeName);
      //   if(!this.alreadyCreated){
      //     if (!await this.checkCardExists()) {
      //       http.post(`/api/card/create`, {
      //         'card_no': this.cardNumber
      //       }).then((resp) => {
      //         if (resp.status === 201) {
      //           console.log('created');
      //           return true
      //         }
      //       }).catch((err) => {
      //         console.log('AN ERROR HAS OCCURED');
      //         console.log(err);
      //       });
      //     } else {
      //       console.log('card already exists');
      //     }
      //   } else {
      //     return true
      //   }
      // },

      async getCardID() {
        console.log('WHY ARE YOU TRUE:',this.cardNumber);
        return await http.get(`/api/card/card_no/${this.cardNumber}`)
          .then((resp) => {
            this.cardID = resp.data.id;
            return true;
          }).catch((err) => {
            return false;
            console.log(err);
          });
      },

      async assignEmployee() {
        if (await this.getCardID()) {
          http.post(`/api/employee_card/create`, {
            'employee_id': this.employeeID,
            'card_id': this.cardID,
            'issued_at': Date.now(),
            'active': true
          }).then((resp) => {
            console.log('assigned');
            this.clearStore();
          }).catch((err) => {

          })
        }
      },

      clearStore() {
        this.$store.dispatch('updateCardNo', null);
        this.$store.dispatch('updateAlreadyCreated', null);
        this.$store.dispatch('updateEmployeeInfo', null);
      },

      //  async checkCardExists() {
      //    console.log('here');
      //   return await http.get(`/api/card/card_no/${this.cardNumber}`)
      //     .then((data) => {
      //       console.log('here', data);
      //       this.test = data.id;
      //       console.log(this.test);
      //       return false
      //     })
      //     .catch(err => {
      //       console.log('in the error');
      //       return true;
      //     });
      // },

      setDone (id, index) {
        this[id] = true;
        this.secondStepError = null
        if (index) {
          this.active = index;
        }
        // let k = $store.getters.employeeInfo.name;
        // if (k) {
        //   console.log('yay');
        // }
      },

      setError () {
        this.secondStepError = 'This is an error!';
      },
    },

    computed: {
      employeeName() {
        return this.$store.getters.employeeName;
      },

      employeeID() {
        return this.$store.getters.employeeInfo.id;
      },

      cardNumber() {
        return this.$store.getters.cardNo;
      },

      alreadyCreated() {
        return this.$store.getters.alreadyCreated;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
