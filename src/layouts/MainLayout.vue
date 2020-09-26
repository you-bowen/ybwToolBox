<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>ybw's toolbox</q-toolbar-title>

        <div>created by ybw | powered by jerrita</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="200"
    >
      <q-list>
        <q-item-label header class="text-grey-8">menu</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "notebook",
    caption: "you best choice",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "time table",
    caption: "manage yourself",
    icon: "wysiwyg",
    link: "/settings",
  },
  {
    title: "test",
    caption: "test something",
    icon: "settings",
    link: "/test",
  },
  {
    title: "check",
    caption: "康康谁没交",
    icon: "list_alt",
    link: "/check",
  },
];

import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "MainLayout",
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);

    return { leftDrawerOpen, essentialLinks };
  },
});
</script>
