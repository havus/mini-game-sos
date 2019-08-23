<template>

</template>

<script>
import { mapState } from 'vuex'
// import Board from '@/components/Board'

export default {
  components: {
    // Board
  },
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.room = this.getRoomData()[0]
      console.log(this.room)
    }
  },
  computed: mapState({
    rooms: 'rooms'
  }),
  methods: {
    getRoomData () {
      let thisUser = localStorage.getItem('username')
      // console.log(this.rooms);
      return this.rooms.filter(room => {
        for (let i = 0; i < room.players.length; i++) {
          if (room.players[i].username === thisUser) {
            return true
          }
        }
      })
    }

  }
}
</script>

<style>

</style>
