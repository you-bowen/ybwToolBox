<template>
  <div style="max-width:400px">
    <div class="q-pa-sm" style="max-width:400px" draggable="true">
      <q-btn
        push
        color="black"
        text-color="white"
        :label="thing.key"
        @click="show_menu_rb(index)"
        @dblclick="back(index)"
        @dragstart="test"
      ></q-btn>

      <q-btn-group push v-show="thing.show.menu">
        <!-- 从上至下依次是复制、编辑、删除 -->
        <q-btn
          push
          label="back"
          size="10px"
          style="max-width:100px"
          icon="autorenew"
          @click="back(index)"
        />
        <q-btn
          push
          label="del"
          size="10px"
          style="max-width:100px"
          icon="highlight_off"
          @click="del(index)"
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
      >
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  // inject: ["reload"],
  props: ["thing", "index", "edit_btn", "del", "show_menu_rb", "test", "back"],
};
</script>

<style>
</style>