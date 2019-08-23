<template>
  <div id="body">
    <div id="container">
      <p>{{ room.count }}</p>
      <div id="row" v-for="(y, yi) in row" :key=yi>
        <div id="box" @click="addChar" v-for="(x, xi) in col" :key="xi" :coor="yi+''+xi" :room_id="room.id">{{ room.board[yi][xi] }}</div>
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
  props: [],
  data: () => ({
    room: [],
    col: 5,
    row: 5,
    char: '',
    x: '',
    y: ''
  }),
  methods: {
    addChar (val) {
      const myValue = val.target.innerHTML
      const playerIdx = this.room.players.map(function(e) { return e.username }).indexOf(localStorage.getItem('username'))

      console.log(this.room.count, playerIdx);
      if (!myValue && Math.abs(this.room.count % this.room.players.length - 1) === playerIdx) {
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
        room_id: this.room.id,
        char: 's',
        x: this.x,
        y: this.y
      })
      this.toggleModal()
    },
    o () {
      this.$store.dispatch('addChar', {
        room_id: this.room.id,
        char: 'o',
        x: this.x,
        y: this.y
      })
      this.toggleModal()
    },
  }
}
</script>

<style>

</style>