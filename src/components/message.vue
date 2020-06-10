<script>
  import {mapGetters, mapState} from "vuex"
  import Vue from 'vue'

  export default {
    computed: {
      ...mapGetters({
          session: "currentSession"
        },
        ...mapState([
          "currentSessionId"
        ])
      ),
      ...mapState([
        "user",
      ])
    },
    methods: {},
    filters: {
      // 将日期过滤为 hour:minutes
      time(date) {
        if (typeof date === 'string') {
          date = new Date(date);
        }
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    watch: {},
    directives: {
      // 发送消息后滚动到底部
      'scroll-bottom'() {
        Vue.nextTick(function () {
          let msg = document.getElementById('scroll-part') // 获取对象
          msg.scrollTop = msg.scrollHeight - msg.clientHeight // 滚动高度
        })
      }
    }
  };
</script>

<template>
  <div class="message" id="scroll-part" v-if="session" v-scroll-bottom="session.messages">
    <ul>
      <li v-for="item in session.messages">
        <p class="time">
          <span>{{ item.date | time }}</span>
        </p>
        <div class="main" :class="{ self: item.self }">
          <img class="avatar" width="30" height="30" :src="item.self ? user.img : session.user.img"/>
          <div class="text">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .message {
    padding: 0 0 35px 5px;
    overflow-y: scroll;

    li {
      margin-bottom: 10px;
    }

    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }

    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }

    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~'calc(100% - 40px)';
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }

      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>
