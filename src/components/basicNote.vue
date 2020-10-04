<template>
  <div>
    <q-markdown :src="content.data"></q-markdown>
    <div v-if="content.child.length">
      <note v-for="(child,index) in content.child" :key="index" :content="child"></note>
    </div>  
  </div>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
export default {
  name: 'note',
  props: ["content"],
  components: {
    QMarkdown,
    // note:require("components/basicNote.vue").default
  },
  data() {
    return {

    };
  },
  methods: {
  },
}
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>