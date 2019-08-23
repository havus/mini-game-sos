<template>
  <div id="bodyRoom">
    <h1>username : {{ username }} </h1>
    <Board :theRoom="theRoom"></Board>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Board from '@/components/Board'

export default {
  components: {
    Board
  },
  computed: mapState({
    rooms: 'rooms'
  }),
  data: () => ({
    theRoom: '',
    username: ''
  }),
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getListRoom')
      this.username = localStorage.getItem('username')
    }
  },
  watch: {
    rooms () {
      let thisUser = localStorage.getItem('username')
      this.theRoom = this.rooms.filter(room => {
        for (let i = 0; i < room.players.length; i++) {
          if (room.players[i].name === thisUser) {
            return true
          }
        }
      })

      if (this.theRoom.length <= 0) {
        this.$router.push('/listroom')
      }
    }
  }
}
</script>

<style scoped>
  #bodyRoom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(#b3a5cc, #92b397 , #919fb5, #b3a5cc, #82adac);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
</style>
