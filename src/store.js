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

    },
    LISTROOM: (state, arrObj) => {
      state.rooms = arrObj
    }
  },
  actions: {
    addChar (context, obj) {
      // console.log(obj);
      // let roomIdx = state.rooms.map(function (e) { return e.id }).indexOf(3)

      db.collection('sos').doc(obj.room_id)
        .update({
          board: obj.board,
          count: obj.count,
          players: obj.players,
          totalPoint: obj.totalPoint
        })

      // context.commit('ADDCHAR', obj)
    },
    getListRoom (context) {
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
    },
    createRoom (context, players) {
      // var objRM adalah object room master yg membuat player
      let obj = {
        name: 'ngarang',
        board: {
          0: ['', '', '', '', ''],
          1: ['', '', '', '', ''],
          2: ['', '', '', '', ''],
          3: ['', '', '', '', ''],
          4: ['', '', '', '', '']
        },
        players,
        count: 0,
        totalPoint: 0
      }
      db.collection('sos').add(obj)
        .then(() => {
          console.log('berhasil create room')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteRoom (context, id) {
      db.collection('sos').doc(id).delete()
        .then(() => {
          localStorage.clear()
          console.log('berhasil delete room')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
