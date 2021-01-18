<template>
  <div>
    <v-card class="overflow-hidden" color="blue-grey darken-1" dark>
      <v-toolbar color="blue-grey" flat>
        <v-icon class="mr-1">mdi-newspaper-variant-outline</v-icon>
        <v-toolbar-title class="font-weight-light">Start writing</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="clearFormData">RESET</v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">  
          <v-text-field
            v-model="formData.title"
            color="white"
            label="Title"
            filled
            counter
            clearable
          >
          </v-text-field>
          <v-md-editor
            v-model="formData.content"
            :disabled-menus="[]"
            left-toolbar="undo redo clear | h bold italic strikethrough quote tip | ul ol table hr | link image code | save"
            height="400px"
            @upload-image="handleUploadImage"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading"
          block
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card> 
  </div>
</template>

<script>
import { uploadImage } from '@/api/user'
import { createArticle } from '@/api/article'

import VMdEditor from '@kangc/v-md-editor'

export default {
  name: 'Create',
  data: () => ({
    loading: false,
    formData: {
      title: '',
      content: ''
    }
  }),
  methods: {
    handleUploadImage (event, insertImage, files) {
      const file = files.shift()
      let formData = new FormData()
      formData.append('image', file)
      formData.append('type', 'article')
      uploadImage(formData).then(respones => {
        const { data } = respones
        insertImage({
          url: data.path,
          desc: `图片 - ${data.created_at}`,
        })
      })
    },
    save () {
      const title = this.formData.title.length > 0
      const content = this.formData.content.length > 2
      const validate = title && content
      if(validate) {
        this.loading = true
        createArticle(this.formData).then(respones => {
          this.loading = false
          this.clearFormData()
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      } else {
        if(title) {
          this.$message.warning('文章内容不少于3个字符')
        } else {
          this.$message.warning('文章标题不能为空')
        }
      }
    },
    clearFormData() {
      this.$refs.form.reset()
      this.formData.content= ''
    }
  }
}
</script>