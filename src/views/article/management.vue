<template>
  <div>
    <v-card class="mx-auto"> 
      <v-list v-if="showList">
        <v-list-item-group>
          <template v-for="(item, i) in articleList">
            <v-list-item :key="item.title + i" :to="'/article/edit/'+ item.id">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.created_at"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click.prevent="delClick(item)">
                  <v-icon color="red lighten-2">mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon :to="'/article/edit/'+ item.id">
                  <v-icon color="green lighten-2">mdi-square-edit-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="i < articleList.length - 1" :key="i"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          删除
        </v-card-title>
          
        <v-card-text>
          确定要删除 <span class="font-weight-bold">{{ delTitle }}</span> 这篇文章吗？
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn 
            color="green darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="del()"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getArticleList, delArticle } from '@/api/article'

export default {
  name: 'Management',
  data: () => ({
    showList: false,
    dialog: false,
    delTitle: '',
    articleList: [],
    curId: null
  }),
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let query = { page: null, user_id: this.$store.getters.userId }
      
      getArticleList(query).then(response => {
        const { data } = response
        this.articleList = data
        this.showList = true
      })
    },
    delClick(item) {
      this.dialog = true
      this.curId = item.id
      this.delTitle = item.title
    },
    del() {
      delArticle({id: this.curId}).then(response => {
        this.getData()
        this.dialog = false
      })
    },
  }
}
</script>