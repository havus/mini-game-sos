import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    username: '',
    board: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ],
    point: {
      A: 0
    }
  },
  mutations: {
    addChar: (state, obj) => {
      state.board[obj.x][obj.y] = obj.char;
      state.count++;
      const board = state.board;
      const template = 'sos';
      
      for (let i = 0; i < board.length - 3; i++) {
        for (let j = 0; j < board[i].length; j++) {
          let tempHorizontal = board[i][j] + '' + board[i][j+1] + '' + board[i][j+2]
          let tempVertical = board[i][j] + '' + board[i+1][j] + '' + board[i+1][j]

          let tempDiagonalDown = '';
          let tempDiagonalUp = '';

          if (i - 2 >= 0) {
            tempDiagonalDown = board[i][j] + '' + board[i-1][j-1] + '' + board[i-2][j-2];
            console.log('tempDiagonalUp');
            
          }
          // let tempDiagonalUp = board[i][j] + '' + board[i-1][j-1] + '' + board[i-2][j-2];

          if (tempHorizontal === template || tempVertical === template || tempDiagonalUp === template || tempDiagonalUp === template) {
            console.log('jadi');
          }
        }
      }
    }
  },
  actions: {
    checkMatch(board) {
      const template = 'sos';
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          let tempHorizontal = `${board[i][j]}${board[i][j + 1]}${board[i][j + 2]}`;
          let tempVertical = `${board[i][j]}${board[i + 1][j]}${board[i + 2][j]}`
          let tempDiagonalUp = `${board[i][j]}${board[i + 1][j + 1]}${board[i + 2][j + 2]}`
          let tempDiagonalDown = `${board[i][j]}${board[i - 1][j - 1]}${board[i - 2][j - 2]}`

          if (tempHorizontal === template || tempVertical === template || tempDiagonalUp === template || tempDiagonalUp === template) {
            return true;
          }
        }
      }
      return false;
    },
    addChar(context, obj) {
      context.commit('addChar', obj)
    },
  }
})
