<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      app
      class="elevation-1"
    >
      <v-list-item class="mt-4">
        <v-list-item-subtitle>Blog Management Background</v-list-item-subtitle>
      </v-list-item>
      
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group
          v-for="item in itemList"
          :key="item.path"
          color="primary"
        >
          <v-subheader v-if="item.meta && item.meta.subtitle" class="pa-1 mt-2 overline">
            {{ item.meta.subtitle }}
          </v-subheader>

          <v-list-item
            v-if="item.children.length <= 1"
            :to="`${item.path}`"
            exact
            exact-active-class="primary--text"
          >
            <v-list-item-icon>
              <v-icon>
                {{ item.meta.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>            

          <v-list-group 
            v-else 
            :prepend-icon="item.meta.icon"
            :value="item.open"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>
                {{ item.meta.title }}
              </v-list-item-title>
            </template>

            <v-list-item
              v-for="i in item.children"
              :key="i.path"
              :to="`${item.path}/${i.path}`"
              exact
              link
            >
              <v-list-item-content>
                <v-list-item-title>{{ i.meta.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>    
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    mini: false,
    itemList: []
  }),
  created() {
    this.getRoutes()
  },
  methods: {
    getRoutes() {
      this.$router.options.routes.map(route => {
        if(route.hidden === undefined) {
          let child = route.children.filter(item => item.hidden === undefined)
          route.children = child
          this.itemList.push(route)
        }
      })
    }
  }
}
</script>
