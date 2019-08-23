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
  // computed: {
  //   getRoomData () {
  //     let thisUser = localStorage.getItem('username');
  //     return this.$store.state.rooms.filter(room => {
  //       for (let i = 0; i < room.players.length; i++) {
  //         if (room.players[i].username === thisUser) {
  //           return true
  //         }
  //       }
  //     })
  //   }
  // },
  computed: mapState({
    rooms: 'rooms'
  }),
  created () {
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getListRoom')
    }
    // console.log(this.rooms, '<<<<<<<<<<<<');
  },
  methods: {
    
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
