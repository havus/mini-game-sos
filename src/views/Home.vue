<template>
  <div id="body">
    <div id="container">
      <p>{{ count }}</p>
      <div id="row" v-for="(y, yi) in row" :key=yi>
        <div id="box" @click="addChar" v-for="(x, xi) in col" :key="xi" :coor="yi+''+xi">{{ board[yi][xi] }}</div>
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
import { mapState } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    col: 5,
    row: 5,
    char: '',
    x: '',
    y: ''
  }),
  computed: mapState({
    board: 'board',
    count: 'count'
  }),
  mounted () {
    if (!localStorage.getItem('username')) {
      this.$router.push('username')
    }
  },
  methods: {
    addChar (val) {
      const myValue = val.target.innerHTML
      if (!myValue) {
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
      this.char = 's'
      this.dispatchRoot()
      this.toggleModal()
    },
    o () {
      this.char = 'o'
      this.dispatchRoot()
      this.toggleModal()
    },
    dispatchRoot () {
      this.$store.dispatch('addChar', {
        char: this.char,
        x: this.x,
        y: this.y
      })
    }
  }
}
</script>

<style scoped>
  #body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
