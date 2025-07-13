<template>
  <PageNav/>
  <main class="main-container">
    <RouterView/>
  </main>
  <footer class="footer">Test project. Colors: black, gray, white.</footer>
</template>

<script setup>
import PageNav from './components/PageNav.vue'
</script>

<style scoped>
.main-container {
  padding: 10px;
}
.footer {
  background-color: #dfdfdf;
  padding: 15px;
  color: #626262;
  text-align: center;
  margin-top: auto;
}
</style>