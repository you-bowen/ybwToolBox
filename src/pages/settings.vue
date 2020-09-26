<template>
  <div class="q-pa-md">
    <q-btn @click="ALERT.create=!ALERT.create">add</q-btn>
    <q-btn @click="clear_all">clear</q-btn>
    <q-dialog id="createNewEvent" v-model="ALERT.create">
      <div>
        <q-card>
          <q-card-section>
            <div class="text-h6">添加事件</div>
          </q-card-section>

          <q-card-section>
            <q-input
              color="white"
              standout
              bottom-slots
              v-model="EVENT"
              label="事件名称"
              clearable
              style="background-color:white"
            ></q-input>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-date v-model="DAYS" range landscape />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="添加新事件" color="primary" @click="add" />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <div class="ALERT">
      <q-dialog v-model="ALERT.nullValue">
        <q-card>
          <q-card-section>
            <div class="text-h6">failed</div>
          </q-card-section>

          <q-card-section class="q-pt-none">事件名和时间不能为空</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div v-for="(data,index) in timeTable" :key="index" class="q-pa-md">
      <q-badge
        color="secondary"
      >{{data.event}}: 还有{{ data.val.min }}天开始 {{ data.val.max }}天结束 (0 to 60)</q-badge>

      <q-range v-model="data.val" :min="0" :max="60" :step="1" color="blue" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DAYS: null,
      EVENT: null,
      timeTable: [],
      ALERT: {
        create: false,
        nullValue: false,
      },
      temp: { max: 100, min: 0 },
      // time:null,
      DATE: null,
      // loaded:false,
      //daysNum:{
      //   run:[31,29,31,30,31,30,31,31,30,31,30,31],
      //   ping:[31,28,31,30,31,30,31,31,30,31,30,31]
      // },
    };
  },
  methods: {
    add() {
      function calc(date1, date2, mode) {
        if (mode) {
          var daysFloat =
            (Date.parse(new Date(date2)) - Date.parse(new Date(date1))) /
            (1000 * 60 * 60 * 24);
          if (daysFloat > 0) {
            var days = parseInt(daysFloat) + 1;
          } else {
            var days = parseInt(daysFloat);
          }
        } else {
          var days =
            parseInt(
              (Date.parse(new Date(date2)) - Date.parse(new Date(date1))) /
                (1000 * 60 * 60 * 24)
            ) + 1;
        }

        if (days >= 0) {
          return days;
        } else {
          return 0;
        }
      }
      if (this.DAYS == null || this.EVENT == null) {
        this.ALERT.nullValue = true;
      } else {
        var data = { val: { min: null, max: null }, event: null ,info: null};
        data.info = this.DAYS;
        data.val.min = calc(this.DATE, this.DAYS.from, 1);
        data.val.max = calc(this.DATE, this.DAYS.to, 0);
        if (data.min == 0 && date.max == 0) {
          alert("input invalid!");
        } else {
          this.timeTable.push(data);
          this.timeTable[this.timeTable.length - 1].event = this.EVENT;
          this.DAYS = null;
          this.EVENT = null;
          this.ALERT.create = false;
          localStorage.setItem("data", JSON.stringify(this.timeTable));
        }
      }
    },
    clear_all() {
      localStorage.clear();
    },
  },
  computed(){},
  mounted() {
    function calc(date1, date2, mode) {
      if (mode) {
        var daysFloat =
          (Date.parse(new Date(date2)) - Date.parse(new Date(date1))) /
          (1000 * 60 * 60 * 24);
        if (daysFloat > 0) {
          var days = parseInt(daysFloat) + 1;
        } else {
          var days = parseInt(daysFloat);
        }
      } else {
        var days =
          parseInt(
            (Date.parse(new Date(date2)) - Date.parse(new Date(date1))) /
              (1000 * 60 * 60 * 24)
          ) + 1;
      }

      if (days >= 0) {
        return days;
      } else {
        return 0;
      }
    }
    var date = new Date();
    this.DATE = date;
    try {
      const a = JSON.parse(localStorage.getItem("data"));
      if (a === null) {
        this.timeTable = [];
      } else {
        this.timeTable = a;
        for(var i=0;i<this.timeTable.length;i++){
          this.timeTable[i].val.min = calc(this.DATE, this.info.from, 1);
          this.timeTable[i].val.max = calc(this.DATE, this.info.to, 0);
        }
      }
      // this.loaded = true;
    } catch (err) {
      console.log("first getin");
    }
    // const b = JSON.parse(localStorage.getItem("rubbish"));
  },
};
</script>

<style>
</style>