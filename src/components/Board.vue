<template>
  <div id="body">
    <div id="container" v-if="dataReady">
      <p>{{ dataRoom.count }}</p>
      <div id="row" v-for="(y, yi) in dataRoom.board" :key=yi>
        <div id="box" @click="addChar" v-for="(x, xi) in dataRoom.board[yi]" :key="xi" :coor="yi+''+xi" :room_id="dataRoom.id">{{ dataRoom.board[yi][xi] }}</div>
      </div>
    </div>

    <b-modal id="modal-1" size="sm" :hide-footer="true" :hide-header="true">
      <b-row class="my-1">
        <b-col sm="12" id="isiModal">
          <b-button size="lg" variant="outline-primary" @click="s">S</b-button>
          <b-button size="lg" variant="outline-primary" @click="o">O</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>

export default {
  props: ['theRoom'],
  data: () => ({
    dataRoom: [],
    char: '',
    x: '',
    y: '',
    dataReady: false
  }),
  created () {
  },
  methods: {
    addChar (val) {
      const myValue = val.target.innerHTML
      const playerIdx = this.dataRoom.players.map(function(e) { return e.name }).indexOf(localStorage.getItem('username'))

      console.log(this.dataRoom.count, playerIdx);
      console.log(myValue);
      if (!myValue && this.dataRoom.count % this.dataRoom.players.length === playerIdx) {
        this.toggleModal()
        const coor = val.target.getAttribute('coor')
        this.x = coor[0]
        this.y = coor[1]
      }
    },
    toggleModal () {
      this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    },
    s () {
      this.$store.dispatch('addChar', {
        room_id: this.dataRoom.id,
        char: 's',
        x: this.x,
        y: this.y
      })
      this.toggleModal()
    },
    o () {
      this.$store.dispatch('addChar', {
        room_id: this.dataRoom.id,
        char: 'o',
        x: this.x,
        y: this.y
      })
      this.toggleModal()
    },
  },
  watch: {
    theRoom () {
      this.dataRoom = {...this.theRoom[0]}
      this.dataReady = true
      console.log(this.dataRoom, 'dari board');
    }
  },
}
</script>

<style>
  #row {
    display: flex;
  }
  #box {
    height: 60px;
    width: 60px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-transform: uppercase;
  }
  #isiModal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #isiModal * {
    margin: 0 10px;
  }
</style>
