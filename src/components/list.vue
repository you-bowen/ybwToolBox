<template>
  <div style="max-width:400px">
    <div class="q-pa-sm" style="max-width:400px" draggable="true">
      <q-btn
        push
        color="black"
        text-color="white"
        :label="thing.key"
        @click="show_menu(index)"
        @dblclick="del2bin(index)"
        @dragstart="test"
      ></q-btn>

      <q-btn-group push v-show="thing.show.menu">
        <!-- 从上至下依次是复制、编辑、删除 -->
        <q-btn
          push
          label="copy"
          size="10px"
          style="max-width:100px"
          icon="sticky_note_2"
          @click="show_menu(index)"
          v-clipboard="thing.value"
        />
        <q-btn
          push
          :label="thing.edit.name"
          size="10px"
          style="max-width:100px"
          :icon="thing.edit.icon"
          @click="edit_btn(index)"
        />
        <q-btn
          push
          label="del"
          size="10px"
          style="max-width:100px"
          icon="delete_outline"
          @click="del2bin(index)"
        />
      </q-btn-group>

      <!-- 编辑框 -->
      <q-input
        color="teal"
        outlined
        v-show="thing.show.field"
        v-model="thing.value"
        label="value"
        style="max-width:200px"
        type="textarea"
      ></q-input>
    </div>
  </div>
</template>

<script>
import Clipboard from "v-clipboard";
export default {
  // inject: ["reload"],
  props: ["thing", "index", "edit_btn", "del2bin", "show_menu", "test"],
};
</script>

<style>
</style>