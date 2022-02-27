<template>
  <div>
    <v-container class="pa-0">
      <v-row
          align="center"
          justify="space-between"
      >
        <v-col
            cols="12" md="7"
        >
          <div class="mb-4">
            <span class="text-h6 text--secondary">
              <img
                  src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                  alt=""
                  width="24"
                  style="vertical-align: middle;"
              >
              Tibusystem
            </span>
          </div>
          <h1 class="text-h5 mb-6">
            Crear una cuenta
          </h1>
          <v-form>
            <v-container class="pa-0" >
              <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      ref="input"
                      class="mb-2"
                      label="Nombre completo"
                      name="login"
                      type="text"
                      v-model="name"
                      @change="clearError('errorName')"
                      hide-details="auto"
                      outlined
                      :error-messages="errorName"
                      dense
                  />
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      ref="input"
                      class="mb-2"
                      label="Telefono"
                      name="phone"
                      v-model="phone"
                      @change="clearError('errorPhone')"
                      type="number"
                      hide-details="auto"
                      outlined
                      :error-messages="errorPhone"
                      dense
                  />
                </v-col>
              </v-row>
              <v-text-field
                  ref="input"
                  class="mb-2"
                  label="Correo electrónico"
                  name="login"
                  type="email"
                  v-model="email"
                  hide-details="auto"
                  hint="Deberá confirmar que este correo electrónico le pertenece."
                  persistent-hint
                  outlined
                  @change="clearError('errorEmail')"
                  :error-messages="errorEmail"
                  dense
              />
              <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      ref="input"
                      class="mb-2"
                      label="contraseña"
                      v-model="password"
                      name="login"
                      type="password"
                      hide-details="auto"
                      outlined
                      @change="clearError('errorPassword')"

                      :error-messages="errorPassword"
                      dense
                  />
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-text-field
                      ref="input"
                      class="mb-2"
                      label="Confirmar contraseña"
                      name="login"
                      type="password"
                      v-model="confirm"
                      hide-details="auto"
                      outlined
                      @change="clearError('errorConfirm')"
                      :error-messages="errorConfirm"
                      dense
                  />
                </v-col>
              </v-row>
              <div class="body-2">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </div>
            </v-container>
          </v-form>
          <div class="transition-wrapper">
            <div class="d-flex justify-space-between mt-8">
              <v-btn
                  class="text-none letter-spacing-0"
                  style="margin-left: -16px;"
                  color="primary"
                  text
                  @click="$router.push({ name: 'signin' })"
              >
                ¿ya tienes una cuenta?
              </v-btn>
              <v-btn
                  class="text-none letter-spacing-0"
                  style="min-width: 88px;"
                  color="primary"
                  depressed
                  @click="createAccount"
                  :disabled="loading"
                  :loading="loading"
              >
                Crear cuenta
              </v-btn>
            </div>
            <!-- <transition :name="transitionName">
              <router-view @next="$emit('next', $event)" />
            </transition> -->
          </div>
        </v-col>

        <v-col class="hidden-xs-only"
            cols="4"
        >
          <img
              src="@/assets/pc.png"
              alt="Vuetify Logo"
              height="100px"
              class="w-100 h-auto"
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import {db} from "@/plugins/db";

export default {
  name: 'SignUp',
  data: () => ({
    name:"",
    email:"",
    phone:"",
    password:"",
    confirm:"",

    loading: false,

    transitionName: '',

    errorName: '',
    errorEmail: '',
    errorPhone: '',
    errorPassword: '',
    errorConfirm: '',
  }),
  methods: {

    errorEmpty(){
      this.errorName = '';
      this.errorEmail = '';
      this.errorPhone = '';
      this.errorPassword = '';
      this.errorConfirm = '';
    },


    createAccount(){
      this.loading = true;
      this.errorEmpty();
      if(this.validateAllFields()){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          user.user.updateProfile({
            displayName: this.name,
            phoneNumber: this.phone
          }).then(() => {
            db.collection("users").doc(user.user.uid).set({
              name: this.name,
              email: this.email,
              phone: this.phone,
            }).then(() => {
              this.$router.push({ name: 'home' });
            }).catch(error => {
              console.log(error);
              this.loading = false;
            });
          }).catch((error) => {
            console.log(error);
            this.loading = false;

          });
        }).catch(error => {
          this.errorEmail = error.message;
          this.loading = false;

        });


      }
    },

    clearError(field){
      this[field] = '';
    },




    validateAllFields(){
      let valid = true;

      if (!this.validEmail(this.email)) {
        this.errorEmail = 'Ingrese un correo electrónico válido.'
        valid = false
      }

      if (!this.validPassword(this.password)) {
        this.errorPassword = 'Ingrese una contraseña válida.'
        valid = false
      }

      if (!this.validConfirm(this.password, this.confirm)) {
        this.errorConfirm = 'Las contraseñas no coinciden.'
        valid = false
      }

      if (!this.validName(this.name)) {
        this.errorName = 'Ingrese un nombre válido.'
        valid = false
      }

      if (!this.validPhone(this.phone)) {
        this.errorPhone = 'Ingrese un número de teléfono válido.'
        valid = false
      }

      return valid
    },




    validEmail (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    validPhone (phone) {
      let re = /^[0-9]{10}$/
      return re.test(phone)
    },

    validPassword (password) {
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      return re.test(password)
    },

    validConfirm (password, confirm) {
      return confirm === password
    },

    validName (name) {
      let re = /^[a-zA-Z ]{2,30}$/
      return re.test(name)
    },

  }
}
</script>