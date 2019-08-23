<template>
  <div id="body">
    <b-card style="width: 25rem;">
      <b-card-text>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-small">Username:</label>
          </b-col>
          <b-col sm="9" offset="1">
            <b-form-input id="input-small" size="sm" placeholder="Enter your username" v-model="username"></b-form-input>
          </b-col>
        </b-row>
      </b-card-text>
    <b-button href="#" variant="primary" @click="login">Play!</b-button>
    </b-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data: () => ({
    username: ''
  }),
  methods: {
    login () {
      this.$store.username = this.username
      localStorage.setItem('username', this.username)
      this.$router.push('/listroom')
      if (!this.username) {
        this.loginSound('http://soundbible.com/mp3/tasmanian-devil-daniel_simon.mp3')
        Swal.fire(
          'Watch out!!',
          'You must insert your name',
          'error'
        )
      } else {
        this.loginSuccess('http://soundbible.com/mp3/Doorbell-SoundBible.com-516741062.mp3')
        Swal.fire(
          'Good Job!',
          'Ready to play',
          'success'
        )
      }
    },
    loginSound (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    },
    loginSuccess (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
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

#body{
  /* background-image: url("../../public/images/bg-main.jpg"); */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
