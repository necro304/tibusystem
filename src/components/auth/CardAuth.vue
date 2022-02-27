<template>
  <component
      :is="component"
      v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
import CardAuthMobile from "@/components/auth/CardAuthMobile";
import CardAuthDesktop from "@/components/auth/CardAuthDesktop";

export default {
  name: "CardAuth",
  computed: {
    component () {
      return (this.$vuetify.breakpoint.xsOnly) ? CardAuthMobile : CardAuthDesktop
    }
  }
}
</script>

<style scoped>

</style>