<template>
  <q-page>
    <!-- <div id="banner" class="text-h4 q-ma-lg">{{ tab }}</div> -->
    <q-tabs v-model="tab" inline-label class="bg-primary text-white shadow-2">
      <div class="text-h5 q-mx-md">{{eventNow}}</div>
      <q-btn id="selectEvent" label="Select" class="q-mx-md" v-if="this.eventList.length>0">
        <q-menu>
          <q-list v-for="(event,index) in eventList" :key="index" style="min-width: 100px">
            <q-item clickable v-close-popup @click="changeEvent(event.name)">
              <q-item-section>{{event.name}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-tab name="submit" icon="library_books" label="submit" v-if="this.eventList.length>0" />
      <q-tab name="login" icon="login" label="login" />
      <q-tab name="statistics" icon="analytics" label="statistics" v-if="SHOW.adminPower" />
      <q-tab name="settings" icon="settings" label="settings" v-if="SHOW.adminPower" />

      <!-- <q-tab name="addressbook" icon="people" label="Address Book" /> -->
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="submit">
        <div id="input&admin" class="col">
          <div id="inputField" style="max-width:250px" class="q-ma-lg">
            <q-input
              color="orange"
              standout
              bottom-slots
              v-model="text.name"
              label="姓名"
              counter
              clearable
              ref="inputName"
              @keyup.enter="submit"
            >
              <template v-slot:prepend>
                <q-icon name="face" />
              </template>
              <template v-slot:append>
                <q-icon :name="icon" @click="submit" />
                <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">点击小本本也能提交</q-tooltip>
              </template>

              <template v-slot:hint>Field hint</template>
              <!-- <p>{{text}}</p> -->
            </q-input>
            <q-uploader
              style="max-width: 250px"
              url="http://pub.jerrita.cn:1234/upload_pic"
              label="上传一张图片(<6M)"
              max-file-size="6144000"
              accept=".png, .jpg"
              field_name="img_file"
              :headers="[{name: 'Content-Type', value: 'application/data'}]"
              @rejected="onRejected"
              v-show="SHOW.upload"
              class="q-my-md"
              max-files="1"
            />
            <div id="submit" @click="submit">
              <q-btn>
                submit
                <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">点我提交！</q-tooltip>
              </q-btn>
            </div>
            <!-- <p>{{ text }}</p> -->
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="login">
        <div id="admin" class="q-ma-lg" v-show="SHOW.admin">
          <!-- <q-btn @click="SHOW.login = !SHOW.login">
            admin
            <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">ybw的管理员按钮</q-tooltip>
          </q-btn>-->

          <div id="login_field" v-show="SHOW.login">
            <q-input
              color="teal"
              outlined
              v-model="login.usnm"
              ref="usnm"
              label="username"
              style="max-width:250px"
              class="q-ma-lg"
              @keyup.enter="focusonValue"
            ></q-input>
            <q-input
              color="teal"
              outlined
              v-model="login.pswd"
              ref="pswd"
              label="password"
              style="max-width:250px"
              class="q-ma-lg"
              @keyup.enter="admin"
            ></q-input>
            <q-btn class="q-mx-lg" @click="admin">login</q-btn>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="statistics">
        <div id="ALL" class="row">
          <div id="lists_ALL" class="row" v-show="SHOW.lists">
            <div id="UNsubmitNames" class="q-pa-lg" style="max-width: 250px;">
              <q-expansion-item
                class="shadow-1 overflow-hidden"
                style="border-radius: 30px "
                icon="perm_identity"
                label="未完成"
                header-class="bg-primary text-white"
                expand-icon-class="text-white"
              >
                <q-list bordered v-show="SHOW.unlist">
                  <q-scroll-area style="height: 265px">
                    <q-item
                      v-for="(name, index) in submitList.names"
                      :key="index"
                      class="q-my-sm"
                      clickable
                      @click="remind(name)"
                      v-ripple
                      v-show="!submitList.states[index]"
                    >
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">{{ name[0] }}</q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{ name }}</q-item-label>
                        <q-item-label caption lines="1">{{ name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-scroll-area>
                </q-list>
              </q-expansion-item>
            </div>
            <div id="submitNames" class="q-pa-lg" style="max-width: 250px ">
              <q-expansion-item
                class="shadow-1 overflow-hidden"
                style="border-radius: 30px"
                icon="perm_identity"
                label="已完成"
                header-class="bg-primary text-white"
                expand-icon-class="text-white"
              >
                <q-list bordered v-show="SHOW.list">
                  <q-scroll-area style="height: 265px">
                    <q-item
                      v-for="(name, index) in submitList.names"
                      :key="index"
                      class="q-my-sm"
                      clickable
                      v-ripple
                      v-show="submitList.states[index]"
                    >
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">{{ name[0] }}</q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{ name }}</q-item-label>
                        <q-item-label caption lines="1">{{ name }}</q-item-label>
                      </q-item-section>

                      <!-- <q-item-section side>
                    <q-icon name="done" color="green" />
                      </q-item-section>-->
                    </q-item>
                  </q-scroll-area>
                </q-list>
              </q-expansion-item>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="settings">
        <q-list
          v-for="(event,index) in eventList"
          :key="index"
          style="min-width: 100px;max-width:300px"
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            expand-separator
            icon="assignment"
            :label="event.name"
            caption="created by ***"
          >
            <q-card>
              <q-card-section>
                <q-btn @click="delEvent(event.name)">del</q-btn>
                <q-btn @click="resetEvent(event.name)">reset</q-btn>
                <q-toggle v-model="temp" label="upload pic" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <div id="control_field" class="q-ma-lg">
          <q-input
            color="teal"
            outlined
            v-model="eventNew.name"
            label="eventNew"
            style="max-width:250px"
            class="q-ma-lg"
            @keyup.enter="addEvent"
          >
            <template v-slot:append>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
      </q-tab-panel>
      <!-- <q-tab-panel v-for></q-tab-panel> -->
    </q-tab-panels>

    <div class="alrets">
      <q-dialog v-model="ALERT.submit">
        <q-card>
          <q-card-section>
            <div class="text-h6">successsful</div>
          </q-card-section>

          <q-card-section class="q-pt-none">you have already submit your info, thanks.</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="ALERT.falseName">
        <q-card>
          <q-card-section>
            <div class="text-h6">failed</div>
          </q-card-section>

          <q-card-section
            class="q-pt-none"
          >there is something wrong with your name. you can concat with ybw directly.</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="ALERT.loadFail">
        <q-card>
          <q-card-section>
            <div class="text-h6">Error!</div>
          </q-card-section>

          <q-card-section class="q-pt-none">服务器可能有问题，不能够从服务器拉取数据，请联系ybw</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login: { usnm: null, pswd: null }, // 登录
      eventNow: null, // 目前关注的事件
      eventNew: { name: null },
      temp:false,
      eventList: [], // { name: "志愿截图收集" upload_pic: false}
      text: { name: "", state: true }, // 同学submit
      icon: "assignment",
      cnt: 0,
      SHOW: {
        list: true,
        unlist: true,
        login: true,
        // settings: false,
        lists: true,
        admin: true,
        adminPower: true,
        upload: true,
        uploaded: false,
      },
      ALERT: {
        submit: false,
        falseName: false,
        loadFail: false,
      },
      btnName: { unsubmit: "show", submit: "show" },
      submitList: {},
      tab: "login",
    };
  },
  methods: {
    submit() {
      let data = new FormData();
      var that = this;
      data.set("name", this.text.name);
      if (this.text.name == "由博文") {
        this.SHOW.admin = true;
      }
      let index = this.submitList.names.indexOf(this.text.name);
      if (index != -1) {
        // let index = this.submitList.names.indexOf(this.text.name);
        console.log(index);
        axios
          .post("http://pub.jerrita.cn:1234/submit?col="+that.eventNow, data)
          .then(function (response) {
            console.log(response);
          });
        this.submitList.states[index] = true;
        this.text.name = "";
        this.cnt = eval(this.submitList.states.join("+"));
        this.SHOW.lists = true;
        this.ALERT.submit = true;
        // alert("you have already submit your info, thanks");
      } else {
        this.text.name = "";
        this.ALERT.falseName = true;
      }
    },

    admin() {
      console.log(this.login);
      // this.SHOW.settings = false;
      if (this.login.pswd == "12138" && this.login.usnm == "ybw") {
        console.log(this.login);
        this.login.pswd = "";
        this.login.usnm = "";
        console.log("welcome ybw");
        // this.SHOW.settings = true;
        this.SHOW.adminPower = true;
      }
    },
    focusonValue() {
      this.$refs.pswd.focus();
    },

    check() {
      axios
        .get("http://pub.jerrita.cn:1234/check?num=0")
        .then(function (response) {
          console.log(response);
        });
    },
    upload() {
      console.log("hello world");
    },
    resetEvent(name) {
      axios
        .get("http://pub.jerrita.cn:1234/reset?col="+name)
        .then(function (response) {
          console.log(response);
        });
    },
    delEvent(name) {
      var that = this;
      axios
        .get("http://pub.jerrita.cn:1234/del?col="+name)
        .then(function (r) {
          that.eventList = r.data.events;
          that.eventNow = that.eventList[0]
        });
    },
    addEvent() {
      let data = new FormData();
      var that = this;
      data.set("name", this.eventNew.name);
      axios
        .post("http://pub.jerrita.cn:1234/addevent", data)
        .then(function (r) {
          that.eventList = r.data.events;
        });
      this.eventNew.name = null;
    },
    changeEvent(name) {
      var that = this;
      this.eventNow = name;
      axios
        .get("http://pub.jerrita.cn:1234/getdata?col=" + name)
        .then(function (r) {
          that.submitList = {
            names: r.data.names,
            states: r.data.states,
          };
        });
    },
    remind(name) {
      var a = this.submitList.names[this.submitList.names.indexOf(name)]; // a 名字
      var data = [];
      var text = {
        type: "Plain",
        text: a + "小同学你还没有完成任务哦",
      };
      var At = { type: "At", target: "2756456886" };

      data.push(text);
      data.push(At);
      var cont = { data: data, group: 1078318561 }; //寝室 1078318561, 班级 704737399
      axios
        .post("http://pub.jerrita.cn:2333/remind", cont)
        .then((r) => console.log(r));
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} 请上传<6M的图片`,
      });
    },
  },
  mounted() {
    // this.$refs.inputName.focus();
    var that = this;
    axios
      .get("http://pub.jerrita.cn:1234/getdata")
      .then(function (r) {
        that.submitList = {
          names: r.data.names,
          states: r.data.states,
        };
        if (r.data.defaultName == null) {
          that.eventNow = "暂无事件";
        } else {
          that.eventNow = r.data.defaultName;
          for (var i = 0; i < r.data.events.length; i++) {
            that.eventList.push({ name: r.data.events[i] });
          }
        }
      })
      .catch(function (error) {
        // 请求失败处理
        that.ALERT.loadFail = true;
      });
  },
};
</script>

<style>
</style>

