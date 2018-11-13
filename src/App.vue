<template>
  <div id="app">
      <Home></Home>
      <!--TODO add popup for name-->
      <!--TODO loader-->
  </div>
</template>

<script>
    import Home from './views/Home';

    export default {
        name: 'App',
        components: {
            Home
        }
    }
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap/scss/bootstrap-grid";
</style>
