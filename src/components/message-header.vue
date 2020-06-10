<template>
  <div class="m-header">
    <h3 class="chat-name">{{session?session.user.name:""}}</h3>
    <div class="people" v-if="session">
      <img src="static/ren.svg" alt="查看">
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"

  export default {
    name: 'message-header',
    computed:{
      ...mapGetters({
        session: "currentSession"
      })
    }
  }
</script>

<style lang="less" scoped>
  .m-header {
    /*border-bottom-color: #afaeae;*/
    /*border-style: solid;*/
    /*border-width: */
    /*background-color: rgba(193, 191, 198, 0.13);*/
    display: flex;
    justify-content: space-between;

    .chat-name {
      margin: 10px 10px;
    }

    .people {
      display: inline-block;
      margin-top: 6px;
      margin-right: 10px;
    }
  }
</style>
