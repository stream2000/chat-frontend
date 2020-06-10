<template>
  <div id="app">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <message></message>
      <InputArea></InputArea>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Card from 'components/card';
  import List from 'components/list';
  import InputArea from 'components/inputarea';
  import Message from 'components/message';

  export default {
    name: 'App',
    components: {Card, List, InputArea, Message},
    methods: {
      ...mapActions([
        'initData',
      ]),
    },
    created() {

      this.initData().then((r) => {
        if (!r) {
          this.$message({
            type: "info",
            message: "请重新登录",
          })
        } else {
          this.$message({
            type: "info",
            message: "初始化成功",
          })
        }
      });
    }
  }
</script>

<style lang="less" scoped>
  #app {
    margin: 20px auto;
    width: 800px;
    height: 600px;

    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
      height: 100%;
    }

    .sidebar {
      float: left;
      width: 200px;
      color: #f4f4f4;
      background-color: #2e3238;
      display: flex;
      flex-direction: column;
    }

    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }

    .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }

    .message {
      height: ~'calc(100% - 160px)';
    }

  }


</style>
