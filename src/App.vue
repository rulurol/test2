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