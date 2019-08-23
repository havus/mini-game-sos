<template>
  <div id="body">
    <b-card v-if="dataReady">
      <b-card-text v-for="(player, i) in dataRoom.players" :key="i">
        name: {{ player.name }}
        <br>
        point: {{ player.point }}
      </b-card-text>
    </b-card>
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
    playerIdx: '',
    dataReady: false
  }),
  created () {
  },
  methods: {
    addChar (val) {
      const myValue = val.target.innerHTML
      this.playerIdx = this.dataRoom.players.map(function (e) { return e.name }).indexOf(localStorage.getItem('username'))

      // console.log(this.dataRoom.count, this.dataRoom.players.length);
      // console.log(this.dataRoom.players[playerIdx]);

      if (!myValue && this.dataRoom.count % this.dataRoom.players.length === this.playerIdx) {
        this.toggleModal()
        const coor = val.target.getAttribute('coor')
        this.x = coor[0]
        this.y = coor[1]
      }
    },
    clapSound(sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    toggleModal () {
      this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    },
    s () {
      this.checkBoard('s')
      this.toggleModal()
    },
    o () {
      this.checkBoard('o')
      this.toggleModal()
    },
    checkBoard (char) {
      let obj = {}
      const template = 'sos'
      let board = this.dataRoom.board
      board[this.x][this.y] = char
      obj.count = this.dataRoom.count + 1
      obj.players = [...this.dataRoom.players]
      obj.totalPoint = this.dataRoom.totalPoint
      let tempTrack = 0

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < board[i].length; j++) {
          let tempHorizontal = board[i][j] + '' + board[i][j + 1] + '' + board[i][j + 2]
          let tempVertical = board[i][j] + '' + board[i + 1][j] + '' + board[i + 2][j]
          // 00 11 22
          let tempDiagonalLeft = board[i][j] + '' + board[i + 1][j + 1] + '' + board[i + 2][j + 2]
          // 02 11 20
          let tempDiagonalRight = board[i][j + 2] + '' + board[i + 1][j + 1] + '' + board[i + 2][j]
          if (tempHorizontal === template) {
            tempTrack++
          }
          if (tempVertical === template) {
            tempTrack++
          }
          if (tempDiagonalLeft === template) {
            tempTrack++
          }
          if (tempDiagonalRight === template) {
            tempTrack++
          }
        }
      }

      if (tempTrack > obj.totalPoint) {
        obj.totalPoint++
        // console.log(obj.players[this.playerIdx].point)
        obj.players[this.playerIdx].point++
        this.clapSound('http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3')
        console.log(this.dataRoom.players);
      }

      this.$store.dispatch('addChar', {
        room_id: this.dataRoom.id,
        char,
        board,
        count: obj.count,
        players: obj.players,
        totalPoint: obj.totalPoint
      })
    }
  },
  watch: {
    theRoom () {
      this.dataRoom = { ...this.theRoom[0] }
      this.dataReady = true
      if (this.dataRoom.count >= 25) {
        this.$store.dispatch('deleteRoom', this.dataRoom.id)
      }
    }
  }
}
</script>

<style scoped>
  #body {
    /* background-color: black */
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
