<template>
  <el-dialog width="30%" title="个人信息" :visible.sync="infoShow"
             :show-close="true"
             :close-on-click-modal="true"
             :close-on-press-escape="true"
             :before-close="beforeCloseCallback"
             center
  >
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="signOutCallback">注销</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "info",
    props:{
      infoShow : false,
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }),
    },

    methods: {
      ...mapActions([
        "signOut"
      ]),
      signOutCallback(){
        console.log("sign out")
        this.signOut()
        this.$emit('closeInfoWindow')
      },
      beforeCloseCallback(){
        this.$emit('closeInfoWindow')
      }
    },
  }
</script>

<style scoped>
  .info-title{
    text-align: center;
  }
</style>
