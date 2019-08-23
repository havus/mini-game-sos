<template>
  <div>
    <h1 v-for="room in rooms" :key="room.id">{{ room.name }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  data: () => ({
  }),
  computed: mapState({
    rooms: 'rooms'
  }),
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getListRoom')
    }
  },
  mounted () {
    
  },
  watch: {
    rooms() {
      let thisUser = localStorage.getItem('username');
      this.rooms.filter(room => {
        for (let i = 0; i < room.players.length; i++) {
          if (room.players[i].name === thisUser) {
            this.$router.push('/room')
            break;
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  
</style>
