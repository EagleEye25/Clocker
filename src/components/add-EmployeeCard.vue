<template>
  <div>
    <div v-if="!cardData" class="center">
      <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header
                @md-selected="onSelect" class="table">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Select Unused Card</h1>
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
  import http from '../../public/app.service.ts'

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
    name: 'add-EmployeeCard',
    // Angular equivaent of INPUT
    props: {
      cardData: null,
    },
    //  Variables
    data() {
      return {
        unlinkedCards: [],
        example: [
        {
          'id': 1,
          'card_no': 12314124
        }
        ],
        selectedCard: null,
        search: null,
        searched: [],
      }
    },

    methods: {
      getUnlinkedCards() {
        http.get(`/api/card/unlinked/cards`)
          .then((res) => {
            res.data.forEach(d => {
              let data = {
                'id': d.id,
                'card_no': card_no
              }
              this.unlinkedCards.push(data);
            });
          this.unlinkedCards.toString();
        }).catch((error) => {

        });
      },


      onSelect(item) {
        this.selectedCard = item;
        if (this.selectedCard) {
        }
      },

      newCard () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByCardNo(this.example, this.search);
      }
    },

    created () {
      this.searched = this.example;
    },


    beforeMount() {
      this.getUnlinkedCards();
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
    position: absolute;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
    /* width: 50%; */
  }

  .md-table-cell {
    text-align: center;
  }

  .md-field {
    max-width: 300px;
  }

  .md-table-toolbar {
    text-align: center;
  }
</style>
