<template>
  <v-app>
    <v-row no-gutters v-resize="onResize">
      <v-col v-if="!mobileSetting.isMobile" cols="6" class="blue lighten-2" style="display:flex; align-items: center; text-align:center;">
        <div style="font-size: 1.35rem;" class="white--text">
          <h1> Vuetify Admin </h1>
          <h2> Out of the box developer friendly vuetify enhanced backend panel. </h2>
        </div>
      </v-col>
      <v-col :cols="mobileSetting.isMobile ? 12 : 6" class="blue-grey lighten-5" style="display:flex; align-items: center; justify-content: center;">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <h3 class="text-h3 font-weight-bold text-center mb-5"> WelCome Back! </h3>
          <v-text-field
            v-model="formData.username"
            :rules="rules.username"
            label="Name"
            clearable
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.password"
            :rules="rules.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            clearable
            required
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <div class="mt-4" style="display: flex; justify-content: center; align-items: center;">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              class="mr-4 font-weight-bold"
              large
              @click="submit"
            >
              Login
            </v-btn>

            <v-btn 
              color="primary"
              @click="resetValidation"
            >
              Reset Validation
            </v-btn>
          </div>
        </v-form> 
      </v-col>     
    </v-row>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      mobileSetting: {
        isMobile: false,
        Mobile_Breakpoint: 960,
      },
      windowSize: {
        x: 0,
        y: 0,
      },
      showPassword: false,
      valid: true,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [ v => !!v || 'Name is required', ],
        password: [ v => !!v || 'Password is required', ],
      },
      loading: false,
    }),
    beforeCreate () {
      document.querySelector('html').setAttribute('style', 'overflow-y:auto')
    },
    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        this.mobileSetting.isMobile = this.windowSize.x >= this.mobileSetting.Mobile_Breakpoint ? false : true
      },
      submit () {
        const validate = this.$refs.form.validate()
        if(validate) {
          this.loading = true
          this.$store.dispatch('login', this.formData)
          .then(() => {
            this.$store.dispatch('getInfo').then(() => {
              console.log(this.$store.getters)
            })
            this.$router.push({ path: '/'})
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>