import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [
      {
        id: 1,
        count: 1,
        players: [
          {
            username: 'john',
            point: 1
          },
          {
            username: 'megamen',
            point: 1
          },
          {
            username: 'fire',
            point: 1
          },
          {
            username: 'foobar',
            point: 1
          }
        ],
        board: [
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', '']
        ],
        track: 1
      },
      {
        id: 2,
        count: 1,
        players: [
          {
            username: 'awk',
            point: 1
          },
          {
            username: 'tool',
            point: 1
          },
          {
            username: 'havus',
            point: 1
          },
          {
            username: 'tillyong',
            point: 1
          }
        ],
        board: [
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', '']
        ],
        track: 1
      },
      {
        id: 3,
        count: 2,
        players: [
          {
            username: 'cekidot',
            point: 1
          },
          {
            username: 'niu',
            point: 1
          }
        ],
        board: [
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', '']
        ],
        track: 1
      },
    ],
  },
  mutations: {
    ADDCHAR: (state, obj) => {
      // TRACK === FULLPOINT JADI
      let roomIdx = state.rooms.map(function(e) { return e.id; }).indexOf(3)
      state.rooms[roomIdx].board[obj.x][obj.y] = obj.char
      state.rooms[roomIdx].count++
      const board = state.rooms[roomIdx].board
      const template = 'sos'
      let tempTrack = 1
      for (let i = 0; i < board.length - 2; i++) {
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
          if (tempTrack > state.rooms[roomIdx].track) {
            state.rooms[roomIdx].track = tempTrack
            state.rooms[roomIdx].track = tempTrack
            console.log(state.rooms[roomIdx].track, ' sudah jadi')
          }
        }
      }
    },
    FETCHMASTER: (state, obj) => {

    }
  },
  actions: {
    fetchData (context, obj) {
      context.commit('FETCHMASTER', obj)
    },
    addChar (context, obj) {
      context.commit('ADDCHAR', obj)
    }
  }
})
