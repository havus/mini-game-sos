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
export default {
  data: () => ({
    username: ''
  }),
  methods: {
    login () {
      this.$store.username = this.username
      localStorage.setItem('username', this.username)
      this.$router.push('/')
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
