import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/api/firestore'
// import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    ADDCHAR: (state, obj) => {
      // TRACK === FULLPOINT JADI
      let roomIdx = state.rooms.map(function (e) { return e.id }).indexOf(3)
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
    LISTROOM: (state, arrObj) => {
      state.rooms = arrObj
    }
  },
  actions: {
    addChar (context, obj) {
      context.commit('ADDCHAR', obj)
    },
    getListRoom (context) {
      // db.collection('sos').doc('2FDWFvxdXkzMBFFMNV2q').update({
      //   board: {
      //     0: ['', '', '', '', ''],
      //     1: ['', '', '', '', ''],
      //     2: ['', '', '', '', ''],
      //     3: ['', '', '', '', ''],
      //     4: ['', '', '', '', '']
      //   }
      // })

      db.collection('sos')
        .onSnapshot((querySnapshot) => {
          let arrObj = []
          arrObj = []
          querySnapshot.forEach((doc) => {
            const data = doc.data()
            // doc.id
            let temp = { ...data }
            temp.id = doc.id
            arrObj.push(temp)
          })
          context.commit('LISTROOM', arrObj)
        })
    }
  }
})
