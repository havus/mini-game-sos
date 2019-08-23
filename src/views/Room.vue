<template>
  <div id="body">
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
    theRoom: ''
  }),
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getListRoom')
    }
  },
  computed: mapState({
    rooms: 'rooms'
  }),
  watch: {
    rooms() {
      let thisUser = localStorage.getItem('username');
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
  #body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>