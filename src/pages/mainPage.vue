<template>
  <q-page @click="bg_show_menu">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- key&value的输入框 -->
    <!-- <div class="row q-pa-xs"> -->
    <div id="field&btn" class="row justify-center">
      <div id="field" class="row">
        <div style="max-width:200px" class="q-pa-md">
          <q-input v-model="input.key" label="key" ref="key" @keyup.enter="focusOnValue" />
        </div>
        <div style="max-width:200px" class="q-pa-md">
          <q-input v-model="input.value" label="value" ref="value" @keyup.enter="add" />
        </div>
      </div>

      <div id="btns" class="row">
        <div id="add" class="q-pt-lg q-px-sm" style="max-width:200px">
          <q-btn round color="primary" icon="shopping_cart" @click="add" />
        </div>
        <div id="clean" class="q-pt-lg q-px-sm" style="max-width:200px">
          <q-btn round color="primary" icon="layers_clear" @click="cleanAll" />
        </div>
        <div id="delete" class="q-pt-lg q-px-sm" style="max-width:200px">
          <q-btn round color="primary" icon="delete_outline" @click="showBin" />
        </div>
      </div>
    </div>

    <div id="notes&bin" class="row justify-center">
      <div id="note" class="col">
        <q-card class="my-card q-ma-md">
          <q-card-section>
            <div class="text-h6">笔记区</div>
          </q-card-section>
          <List
            v-for="(thing,index) in lists"
            :key="index"
            :thing="thing"
            :index="index"
            :del2bin="del2bin"
            :edit_btn="edit_btn"
            :show_menu="show_menu"
            :test="test"
          ></List>
          <q-separator />

          <q-card-actions vertical>
            <q-btn flat @click="badboy">to be added</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div id="bin" class="col">
        <q-card class="my-card q-ma-md" v-show="rubbishLists.show">
          <q-card-section>
            <div class="text-h6">垃圾桶</div>
          </q-card-section>
          <RubbishList
            v-for="(thing,index) in rubbishLists.data"
            :key="index"
            :thing="thing"
            :index="index"
            :del="del"
            :edit_btn="edit_btn"
            :show_menu_rb="show_menu_rb"
            :test="test"
            :back="back"
            v-show="rubbishLists.show"
          ></RubbishList>
          <q-separator />

          <q-card-actions vertical>
            <q-btn flat @click="cleanAll_rb">clean all</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script >
import Vue from "vue";
import Clipboard from "v-clipboard";
// import list from "components/list.vue";
Vue.use(Clipboard);
export default {
  // provide() {
  //   //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
  //   return {
  //     reload: this.reload,
  //   };
  // },
  data() {
    return {
      isRouterAlive: true,
      input: {
        key: "",
        value: "",
        show: { field: false, menu: false },
        edit: { name: "edit", icon: "edit" },
        // showMenu: false,
      },
      lists: [],
      rubbishLists: {
        data: [],
        show: false,
      },
    };
  },
  methods: {
    del(index) {
      this.rubbishLists.data.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
    },
    del2bin(index) {
      this.lists[index].show.menu = false;
      this.lists[index].show.field = false;
      this.lists[index].edit = { name: "edit", icon: "edit" };
      this.rubbishLists.data.unshift(this.lists.splice(index, 1)[0]);
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
    },
    add() {
      console.log("add");
      let key = this.input.key;
      let value = this.input.value;
      if (key === "" || value === "") {
        alert("key & value cannot be null!");
        return;
      }
      this.lists.push({
        key: key,
        value: value,
        show: { field: false, menu: false },
        edit: { name: "edit", icon: "edit" },
      });
      this.input.value = "";
      this.input.key = "";
      this.$refs.key.focus();
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
      // document.querySelector(".key").focus();
    },
    edit_btn(index) {
      if (this.lists[index].edit.name === "edit") {
        this.lists[index].edit = { name: "ok", icon: "done" };
        this.lists[index].show.field = true;
      } else {
        this.lists[index].edit = { name: "edit", icon: "edit" };
        this.lists[index].show.field = false;
        this.lists[index].show.menu = !this.lists[index].show.menu;
      }
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
    },
    show_menu(index) {
      console.log(this.lists[index].value);
      this.lists[index].show.menu = !this.lists[index].show.menu;
    },
    show_menu_rb(index) {
      // console.log(index);
      // console.log("imhere");
      this.rubbishLists.data[index].show.menu = !this.rubbishLists.data[index]
        .show.menu;
    },
    bg_show_menu() {
      if (document.activeElement === document.querySelector("body")) {
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i].show.menu === true) {
            this.lists[i].show.menu = false;
            this.lists[i].show.field = false;
            this.lists[i].edit = { name: "edit", icon: "edit" };
          }
        }
        for (let i = 0; i < this.rubbishLists.data.length; i++) {
          if (this.rubbishLists.data[i].show.menu === true) {
            this.rubbishLists.data[i].show.menu = false;
            this.rubbishLists.data[i].show.field = false;
            this.rubbishLists.data[i].edit = { name: "edit", icon: "edit" };
          }
        }
      }
    },
    badboy() {
      alert("to be added");
    },
    focusOnValue() {
      console.log("focusOnValue");
      this.$refs.value.focus();
      // document.querySelector(".value").focus();
    },
    cleanAll() {
      this.lists = [];
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
    },
    cleanAll_rb() {
      this.rubbishLists.data = [];
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
    },
    showBin() {
      this.rubbishLists.show = !this.rubbishLists.show;
    },
    back(index) {
      this.rubbishLists.data[index].show.menu = false;
      this.lists.unshift(this.rubbishLists.data.splice(index, 1)[0]);
      localStorage.setItem("data", JSON.stringify(this.lists));
      localStorage.setItem("rubbish", JSON.stringify(this.rubbishLists));
      // reload();
      this.$router.go(0);
    },
    test() {
      console.log(this.lists);
    },
    reload() {
      this.$router.go(0);
      // console.log("asd");
      // this.isRouterAlive = false; //先关闭，
      // this.$nextTick(function () {
      //   this.isRouterAlive = true; //再打开
    },
  },
  components: {
    List: require("components/list.vue").default,
    RubbishList: require("components/RubbishList.vue").default,
  },
  mounted() {
    console.log("myinput");
    this.$refs.key.focus();
    const a = JSON.parse(localStorage.getItem("data"));
    const b = JSON.parse(localStorage.getItem("rubbish"));
    if (a === null) {
      this.lists = [];
    } else {
      this.lists = a;
    }
    if (b === null) {
      this.rubbishLists = { data: [], show: false };
    } else {
      this.rubbishLists = b;
    }

    if (this.lists === null) {
      this.lists = [];
    }
    console.log("success");
  },
};
</script>

<style>
</style>


