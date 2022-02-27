<template>
  <div class="d-flex flex-column h-100 w-100 pa-6">
    <div class="flex-grow-1">
      <slot />
    </div>
    <FooterAuth />
  </div>
</template>

<script>
import FooterAuth from "@/components/auth/FooterAuth";
export default {
  name: "CardAuthMobile",
  components:{
    FooterAuth
  }
}
</script>

<style scoped>

</style>