<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import db from '@/api/firestore'

export default {
  mounted() {
    // db.collection('sos')
    //   .onSnapshot((querySnapshot) => {
    //     let dbMaster = []
    //     querySnapshot.forEach((doc) => {
    //       const data = doc.data();
    //       dbMaster.push(data);
    //     });
    //     this.$store.dispatch('fetchData', dbMaster);
    //   });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
</style>
