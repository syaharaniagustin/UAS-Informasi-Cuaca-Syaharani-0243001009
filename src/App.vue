<template>
  <router-view />
</template>

<style>
/* Memaksa aplikasi untuk full screen dan menghapus batasan bawaan Vue */
#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw;
  min-height: 100vh;
  display: block !important;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>