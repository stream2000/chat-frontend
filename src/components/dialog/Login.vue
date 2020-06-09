<template>
  <el-dialog width="30%" title="登录 / 注册" :visible.sync="modelShow"
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
      <el-button type="primary" @click="login('form')">确定</el-button>
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
        form: {
          id: '',
          pw: '',
        }
      }
    },

    methods: {
      ...mapActions([
        "setJwt",
        "pollUserInformation",
      ]),

      validateInput() {
        if(this.form.id === ''){

        }
      },
      // 界面控制逻辑。 需要action的返回结果。
      async login() {
        if (this.isLogin) {
          return
        }
        // mock axios
        let data = await this.sendLoginRequest(this.form.id, this.form.pw)
        if (!data.ok) {
          this.$message({
            type: "error",
            message: "用户名或密码错误"
          })
        } else {
          this.form.id = ''
          this.form.pw = ''
          // weather this function is async
          await this.setJwt(data.jwt)
          // mock axios
          let ok = await this.pollUserInformation()
          if (!ok) {
            this.$message({
              type: "error",
              message: "拉取用户信息失败"
            })
          }
        }
      },

      sendLoginRequest(account, password) {
        return new Promise(((resolve, reject) => {
          setTimeout(() => {
            if (account === 'admin' && password === '111111') {
              let data = {
                ok: true,
                jwt: "111111"
              }
              resolve(data)
            } else {
              let data = {
                ok: false
              }
              resolve(data)
            }
          }, 100)
        }))
      },

      closeCallback: function () {
        this.modelShow = !this.isLogin
      }
    },
  }
</script>

<style scoped>

</style>
