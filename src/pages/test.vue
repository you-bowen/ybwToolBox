<template>
  <div class="q-pa-md" style="max-width: 300px">
    <input id="categoryPic" accept="image/*" type="file" name="image" @change="getFile($event)" />
    <q-file v-model="IMG" label="Standard" />
    <q-btn @click="send">me</q-btn>
    <q-btn color="primary" label="Basic Menu">
      <q-menu>
        <q-list v-for="(event,index) in lists" :key="index" style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>{{event.name}}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      IMG: null,
      lists: [{ name: "asd" }, { name: "123" }],
    };
  },
  methods: {
    send() {
      axios
        .post("http://192.168.31.23:1234/submit_pic", this.IMG)
        .then(function (response) {
          console.log(response);
        });
    },
  },
};
</script>

<style>
</style>