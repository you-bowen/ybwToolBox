<template>
  <div id="mainPage">
    <!-- <note :content="note"></note> -->
    <q-btn-group outline class="q-ma-sm">
      <q-btn outline color="brown" label="clear" @click="clear" />
      <q-btn outline color="brown" label="hide text" @click="SHOW.md=!SHOW.md" />
      <q-btn outline color="brown" label="..." @click="test" />
    </q-btn-group>
    <q-splitter v-model="splitterModel">
      <template v-slot:before id="TREE">
        <q-tree
          class="q-ma-md"
          :nodes="NOTE"
          node-key="title"
          :selected.sync="selected"
          text-color="teal-10"
        >
          <template v-slot:default-header="prop" id="header">
            <div class="row items-center" @dblclick="prop.node.show.btn=!prop.node.show.btn">
              <div class="text-weight-bold text-primary" @click="focus(prop.node)">
                {{prop.node.title}}
                <q-btn-group outline v-show="prop.node.show.btn">
                  <q-btn size="xs" outline color="brown" label="edit" @click="edit(prop.node)" />
                  <q-btn size="xs" outline color="brown" label="add" @click="bfAdd(prop.node)" />
                  <q-btn size="xs" outline color="brown" label="del" @click="bfDel(prop.node)" />
                </q-btn-group>
              </div>
            </div>
          </template>
          <template v-slot:default-body="prop" id="body">
            <q-markdown v-show="prop.node.show.content" :src="prop.node.content"></q-markdown>
          </template>
        </q-tree>
      </template>
      <template v-slot:after>
        <div class="q-ma-md">
          <q-input class="q-my-md" v-model="editor.title" label="title" />
          <q-input v-model="editor.content" filled type="textarea" autogrow />
        </div>
      </template>
    </q-splitter>

    <div class="ALERT">
      <q-dialog id="createNewNode" v-model="SHOW.addNew">
        <div>
          <q-card>
            <q-card-section>
              <div class="text-h6">new node</div>
            </q-card-section>

            <q-card-section>
              <q-input
                color="white"
                standout
                bottom-slots
                v-model="note.title"
                label="node name"
                clearable
                style="background-color:white"
              ></q-input>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn label="add node" color="primary" @click="ADD" />
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>
      <q-dialog id="delNode" v-model="SHOW.delNode">
        <div>
          <q-card>
            <q-card-section>
              <div class="text-h6">del node</div>
            </q-card-section>

            <q-card-section>
              <q-input
                color="white"
                standout
                bottom-slots
                v-model="num"
                label="node index"
                clearable
                style="background-color:white"
              ></q-input>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn label="del node" color="primary" @click="del" />
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
export default {
  components: {
    QMarkdown,
    note: require("components/basicNote.vue").default,
  },
  data() {
    return {
      temp: null,
      editor: { content: null, title: null },
      splitterModel: 50,
      selected: null,
      that: null,
      num: null,
      SHOW: { addNew: false, btns: true, delNode: false, md: true },
      note: {
        title: null,
        content: null,
        children: [],
        show: { btn: false, content: false },
      },
      NOTE: [],
    };
  },
  methods: {
    focus(node) {
      this.editor.content = node.content;
      this.editor.title = node.title;
      node.show.content = !node.show.content;
    },
    edit(prop) {
      prop.content = this.editor.content;
      prop.title = this.editor.title;
      localStorage.setItem("note", JSON.stringify(this.NOTE));
    },
    test() {
      console.log(this.temp.children);
    },
    bfDel(node) {
      this.that = node;
      this.SHOW.delNode = !this.SHOW.delNode;
    },
    del() {
      this.that.children.splice(this.num, 1);
      localStorage.setItem("note", JSON.stringify(this.NOTE));
    },
    clear() {
      localStorage.removeItem("note");
    },
    bfAdd(node) {
      this.that = node;
      this.SHOW.addNew = !this.SHOW.addNew;
    },
    ADD() {
      function shallowCopy(src) {
        var dst = {};
        for (var prop in src) {
          if (src.hasOwnProperty(prop)) {
            dst[prop] = src[prop];
          }
        }
        return dst;
      }

      const temp = shallowCopy(this.note);
      this.that.children.push(temp);
      localStorage.setItem("note", JSON.stringify(this.NOTE));
    },
  },
  mounted() {
    const a = JSON.parse(localStorage.getItem("note"));
    if (a === null) {
      this.NOTE = [
        {
          title: "物理",
          content: null,
          children: [],
          show: { btn: false, content: false },
        },
        {
          title: "概率论",
          content: null,
          children: [],
          show: { btn: false, content: false },
        },
        {
          title: "模电",
          content: null,
          children: [],
          show: { btn: false, content: false },
        },
      ];
    } else {
      this.NOTE = a;
    }
  },
};
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>