<template>
  <div>
    <div class="center">
      <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title"> {{ title }} </h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-tooltip md-direction="bottom">Type / Scan</md-tooltip>
            <md-input placeholder="Search by Card Number..." v-model="search" @input="searchOnTable"/>
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No unused cards found"
          :md-description="`No card found for this '${search}' query. Try a different search term or create a new card.`">
          <md-button class="md-primary md-raised" @click="newCard">Create New Card</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Card Number" md-sort-by="card_no">{{ item.card_no }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
  import http from '../../../public/app.service.ts';

  const toLower = text => {
    return text.toString().toLowerCase();
  }

  const searchByCardNo = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.card_no).includes(toLower(term)));
    }
    return items
  }

  export default {
    name: 'select-CardForEmployee',
    // Angular equivaent of INPUT
    props: {
      standard: true,
    },
    //  Variables
    data() {
      return {
        unlinkedCards: [],
        selectedCard: null,
        search: null,
        searched: [],
        cards: null,
        title: '',
      }
    },

    methods: {
      determineMsg() {
        if (this.standard !== false) {
          this.title = 'Created Cards';
        } else {
          this.title = 'Select Unused Card';
        }
      },

      getUnlinkedCards() {
        http.get(`/api/card/unlinked/cards`)
          .then((res) => {
            res.data.forEach(d => {
              let data = {
                'id': d.id,
                'card_no': d.card_no
              }
              this.unlinkedCards.push(data);
            });
          this.unlinkedCards.toString();
        }).catch((error) => {
          console.log(error);
        });
      },

      // getAllCards() {
      //   http.get(`/api/card/`)
      //     .then((resp) => {
      //       this.cards = resp.data;
      //       console.log('GOT ALL');
      //     }).catch((err) => {
      //       console.log('this is an error', err);
      //     });
      // },

      onSelect(item) {
        this.selectedCard = item;
        this.$store.dispatch('updateCardNo', this.selectedCard.card_no);
        this.$store.dispatch('updateAlreadyCreated', true);
      },

      newCard () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByCardNo(this.unlinkedCards, this.search);
      }
    },

    created () {
      this.searched = this.unlinkedCards;
    },


    beforeMount() {
      this.getUnlinkedCards();
      this.determineMsg();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }

  .md-table {
    display: block;
    padding-top: 10px;
    margin: 0 auto;
    text-align: left;
    width: 30%;
  }

  .md-table-cell {
    text-align: left;
  }

  .md-field {
    max-width: 300px;
  }

  .md-table-toolbar {
    text-align: left;
  }
</style>
