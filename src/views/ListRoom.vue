<template>
  <div id="body">
    <h1 v-for="room in rooms" :key="room.id">{{ room.name }}</h1>
    <button v-b-modal.modal-2>create room</button>

    <b-modal id="modal-2" size="sm" :hide-footer="true" :hide-header="true">
      <b-form-input v-model="form.user2" type="text" required placeholder="User 2"></b-form-input>
      <b-form-input v-model="form.user3" type="text" placeholder="User 3"></b-form-input>
      <b-form-input v-model="form.user4" type="text" placeholder="User 4"></b-form-input>
      <b-row class="my-1">
        <b-col sm="12" id="isiModal">
          <b-button size="lg" variant="outline-primary" @click="createRoom">Create Room!</b-button>
        </b-col>
      </b-row>
    </b-modal>
    <div>
      <div v-for="room in rooms" :key="room.id" class="card">
        <h5 class="card-header">{{room.name}}</h5>
        <div class="card-body">
          <div v-for="(players, index) in room" :key="index" class="card-title">
            <div v-for="(player, index) in players" :key="index" class="card-title">{{player.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  data: () => ({
    form: {
      user2: '',
      user3: '',
      user4: ''
    }
  }),
  computed: mapState({
    rooms: 'rooms'
  }),
  created () {
    // console.log(this.rooms[0])
    if (!localStorage.getItem('username')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getListRoom')
      this.username = localStorage.getItem('username')
    }
  },
  methods: {
    createRoom () {
      let players = [
        {
          name: localStorage.getItem('username'),
          point: 0
        }
      ]
      for (let key in this.form) {
        if (this.form[key] !== '') {
          players.push({
            name: this.form[key],
            point: 0
          })
        }
      }

      this.$store.dispatch('createRoom', players)
    }
  },
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
#body {
  background-image: url("../../public/images/background.png");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
}
</style>
