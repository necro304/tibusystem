<template>
  <v-navigation-drawer
      v-model="isOpen"
      absolute
      temporary
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import firebase from "firebase/app";

export default {
  name: "Drawer",
  props:{
    open: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      name: '',
    }
  },

  computed: {
    isOpen: {
      // getter
      get: function () {
        return this.open
      },
      // setter
      set: function (newValue) {
        this.$emit('update:open', newValue)
      }
    }
  },

  created() {
    let user =firebase.auth().currentUser
    if(user){
      this.name = user.displayName
    }

  }


}
</script>

<style scoped>

</style>