<template>
  <v-app>
    <navigation />
    <v-main>
      <v-container>
        <keep-alive include="Create">
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'Layout',
  components: {
    Navigation
  }
}
</script>