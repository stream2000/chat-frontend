<template>
  <el-dialog width="30%" title="登录" :visible.sync="modelShow"
             :show-close="false"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :before-close="closeCallback()"
  >
    <!-- form part -->
    <el-form ref="form" :model="form" size="small" label-width="100px">
      <el-row>
        <el-form-item label="用户名：">
          <el-input class="search-input" v-model="form.id"/>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" class="search-input" v-model="form.pw"/>
        </el-form-item>
      </el-row>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="login('form')">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "Login",

    computed: {
      ...mapState({
        user: state => state.user,
        isLogin: state => {
          this.modelShow = !state.isLogin
          return state.isLogin
        }
      }),
    },

    data() {
      return {
        //是否显示本面板
        modelShow: false,
        // bind text
        form: {
          id: '',
          pw: '',
        }
      }
    },

    methods: {
      ...mapActions({
        login(dispatch) {
          if (this.isLogin) {
            return
          }
          dispatch('sendLoginRequest', {account: this.form.id,password:this.form.pw}).then((data) => {
            console.log(data)
            if (!data.ok) {
              this.$message({
                type: "danger",
                message: "用户名或密码错误"
              })
            } else {
              this.pollUserInformation()
            }
          })
        },
      }),
      ...mapActions([
        "pollUserInformation"
      ]),
      //关闭登录窗口前的回调(如果用户没有登录成功，则再次打开本窗口，以达到强制登录的目的)
      closeCallback: function () {
        this.modelShow = !this.isLogin
      }
    },
  }
</script>

<style scoped>

</style>
