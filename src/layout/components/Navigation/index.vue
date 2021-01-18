<template>
  <div>
    <!-- navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      class="elevation-1"
      app
    >
      <!-- drawer title -->
      <v-list-item class="mt-4">
        <v-list-item-subtitle>Blog Management Background</v-list-item-subtitle>
      </v-list-item>
      
      <v-divider></v-divider>
      <!-- drawer menu -->
      <v-list dense nav> 
        <v-list-item-group
          v-for="item in menuList"
          :mandatory="true"
          :key="item.path"
          color=""
        >
          <v-subheader v-if="item.meta && item.meta.subtitle" class="pa-1 mt-2 overline">
            {{ item.meta.subtitle }}
          </v-subheader>
          
          <v-list-item
            v-if="item.children.length <= 1"
            :to="`${item.path}`"
            exact
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
            color=""
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
            >
              <!-- <v-list-item-icon>
                <v-icon>mdi-circle-medium</v-icon>
              </v-list-item-icon> -->

              <v-list-item-content>
                <v-list-item-title>{{ i.meta.title }}</v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    <!-- app bar -->
    <v-app-bar color="h-bg" style="color: rgba(0, 0, 0, 0.6)" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ getters.name }} 's Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <!-- account menu -->
      <v-menu
        left
        bottom
        offset-y
        transition="slide-x-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-badge
              color="green"
              offset-x="8"
              offset-y="8"
              bordered
              dot
            >
              <v-avatar color="teal" size="36">
                <img
                  v-if="getters.avatar !== null"
                  :src="getters.avatar"
                  :alt="getters.name"
                >
                <span v-else class="white--text headline">{{ getters.attr }}</span>
              </v-avatar>
            </v-badge>
          </v-btn>
        </template>
        <!-- account menu list -->
        <v-list dense nav>
          <template v-for="(item, index) in account">

            <v-divider v-if="item.divider" :key="index" style="margin-bottom: 4px;"></v-divider>

            <v-list-item :key="item.title" :to="item.path" @click="accountOperateHandle(item)">

              <v-list-item-icon>
                <v-icon size="16" small>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }} {{item.path}} </v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>    
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    mini: false,
    menuList: [],
    account: [
      { icon: "mdi-account-box-outline", title: "Profile", path: ''},
      { icon: "mdi-email-outline", title: "Email", path: '', },
      { icon: "mdi-format-list-checks", title: "Todo", path: ''},
      { divider: true, icon: "mdi-logout", title: "Logout", }
    ]
  }),
  created() {
    this.getRoutes()
  },
  computed: {
    getters() {
      let { name, avatar, introduction } = this.$store.getters
      let user = {}, attr = null
      if(name !== null) attr = name.substr(0, 1)
      user = { name, avatar, introduction, attr }
      return user
    }
  },
  methods: {
    getRoutes() {
      this.$router.options.routes.map(route => {
        if(route.hidden === undefined) {
          let child = route.children.filter(item => item.hidden === undefined)
          route.children = child
          this.menuList.push(route)
        }
      })
    },
    async accountOperateHandle(item) {
      if(item.title === 'Logout') {
        await this.$store.dispatch('logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
}
</script>
