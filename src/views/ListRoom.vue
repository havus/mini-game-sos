<template>
  <div>
    <div v-for="room in rooms" :key="room.id" class="card">
      <h5 class="card-header">{{room.name}}</h5>
      <div class="card-body">
        <div v-for="(players, index) in room" :key="index" class="card-title">
          <div v-for="(player, index) in players" :key="index" class="card-title">{{player.name}}</div>
        </div>
        <!-- <a href="/room" class="btn btn-primary">Go</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    username: ''
  }),
  computed: mapState({
    rooms: 'rooms'
  }),
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getListRoom')
      this.username = localStorage.getItem('username')
    }
  },
  mounted () {},
  watch: {
    rooms () {
      let thisUser = localStorage.getItem('username')
      this.rooms.filter(room => {
        for (let i = 0; i < room.players.length; i++) {
          if (room.players[i].name === thisUser) {
            this.$router.push('/room')
            break
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
