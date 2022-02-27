<template>
  <v-main>
    <v-container
        class="fill-height justify-center"
        :class="{ 'align-start': $vuetify.breakpoint.xsOnly }"
        fluid
    >
      <CardAuth
          :loading="loading"
          :disabled="disabled"
      >
        <router-view @next="onNext" />
      </CardAuth>
    </v-container>

  </v-main>
</template>

<script>
import CardAuth from "@/components/auth/CardAuth";
export default {
  name: "AuthLayout",
  components: {CardAuth},
  data () {
    return {
      loading: false,
      disabled: false,
    }
  },
  methods: {
    onNext (data) {
      console.log(data);
      this.loading = true
      this.disabled = true
      setTimeout(() => {
        this.loading = false
        this.disabled = false
        this.$router.push({name: 'password', params: {email: data}})
      }, 1000)
    },
  }
}
</script>

<style scoped>
.letter-spacing-0 {
  letter-spacing: 0 !important;
}
.text-decoration-none {
  text-decoration: none !important;
}
</style>