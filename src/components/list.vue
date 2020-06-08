<script>
  import {mapState, mapActions, mapGetters} from "vuex"

  export default {
    computed : {
      ...mapState([
        "currentSessionId",
      ]),
      ...mapState({
        filteredSessions: (state) => state.sessions.filter(session => session.user.name.includes(state.filterKey))
      })
    },
    methods: {
      latestContent: (session) => {
        if (session.messages.length <= 0) {
          return "";
        }
        const latestMessage = session.messages[session.messages.length - 1]
        if (latestMessage.self) {
          return latestMessage.content;
        } else {
          return session.user.name + ":" + latestMessage.content;
        }
      },
      ...mapActions([
        "selectSession"
      ])
    }

  };
</script>

<template>
  <div class="list">
    <transition-group name="tg" tag="ul">
      <li v-for="item in filteredSessions" v-bind:key="item.latest" :class="{ active: item.id === currentSessionId }"
          @click="selectSession(item.id)">
        <img class="avatar-img" :alt="item.user.name" :src="item.user.img">
        <div class="middle">
          <p class="name">{{item.user.name}}</p>
          <p class="latest-content">{{latestContent(item)}}</p>
        </div>
        <div class="right">
          <p class="time">20:43</p>
          <p v-if="item.unread" class="unread">{{item.unread}}</p>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
  .list {
    li {
      cursor: pointer;
      transition: background-color .1s;
      display: flex;
      height: 60px;
      align-items: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .avatar-img {
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }

    .middle {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 5px;
      height: 100%;
      width: 110px;
      display: flex;
      flex-direction: column;
    }

    .name {
      display: inline-block;
      margin: 0;
      padding-top: 7px;
      height: 40px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .latest-content {
      display: inline-block;
      margin: 0;
      padding-bottom: 0;
      font-size: 12px;
      overflow: hidden;
      height: 20px;
      width: 100%;
      color: #8e8a8a;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .right {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin: 12px 7px 15px 0;
    }

    .time {
      padding-top: 7px;
      margin: 0;
      font-size: 12px;
      display: inline-block;
      color: rgba(192, 188, 199, 0.33);
    }

    .unread {
      border-radius: 12px;
      font-size: 12px;
      background-color: #f80215;
      text-align: center;
    }

  }
</style>
