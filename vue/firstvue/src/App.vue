<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div >
            <img v-bind:src=logo class="layout-logo" >
          </div>
          <div class="layout-button">
            <MenuItem name="1">
              <div @click="toMainPage(4)">首页</div>
            </MenuItem>
          </div>
          <div class="layout-nav">
            <MenuItem name="3">
              <div v-bind:hidden="UserHidden" @click="toUserNav()">
                <Icon type="ios-analytics"></Icon>
                个人中心
              </div>
            </MenuItem>
            <MenuItem name="4" class="MenuItemWid">
              <div @click="showLogin()">
                <span>{{ loginMessage }}</span>
              </div>
            </MenuItem>
          </div>
        </Menu>
      </Header>

      <Modal v-model="loginModal" width="400">
        <p slot="header" style="text-align:center">
          <span>Login</span>
        </p>
        <div style="text-align:center">
          <Input suffix="ios-contact" placeholder="Enter name" style="width: 300px" size="large"
                 v-model="inputUsername"/>
          <br></br>
          <Input type="password" password placeholder="Enter something..." style="width: 300px" size="large"
                 v-model="inputPassword"/>
          <!--              <br></br>-->
          <div style="text-align: left;margin-left: 35px;margin-top: 5px;color:#ff4500"
               v-bind:hidden="loginMessageHidden">
            {{ message }}
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long :loading="modal_loading1"
                  @click="loginAPI()">Login
          </Button>
          <br></br>
          <Button long size="large" @click="showRegister()">Register</Button>
        </div>
      </Modal>

      <Modal v-model="registerModal" width="400">
        <p slot="header" style="text-align:center">
          <span>Register</span>
        </p>
        <div style="text-align:center">
          <Input suffix="ios-contact" placeholder="Enter name" style="width: 300px" size="large"
                 v-model="inputUsername2"/>
          <br></br>
          <Input type="password" password placeholder="Enter something..." style="width: 300px" size="large"
                 v-model="inputPassword2"/>
          <!--              <br></br>-->
          <div style="text-align: left;margin-left: 35px;margin-top: 5px;color:#ff4500"
               v-bind:hidden="registerMessageHidden">
            {{ message }}
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long :loading="modal_loading2" @click="registerAPI()">Register</Button>
        </div>
      </Modal>


      <keep-alive>
        <router-view v-if="$route.meta.keepalive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepalive"></router-view>
      <!--      </Content>-->
      <!--      </Content>-->
      <Footer class="layout-footer-center">2020-2020 &copy; Ticket Maid</Footer>

    </Layout>
    <!--    <div>-->
    <!--&lt;!&ndash;      我是APP的下面内容&ndash;&gt;-->
    <!--&lt;!&ndash;     <keep-alive>&ndash;&gt;-->
    <!--&lt;!&ndash;        <router-view></router-view>&ndash;&gt;-->
    <!--&lt;!&ndash;     </keep-alive>&ndash;&gt;-->
    <!--&lt;!&ndash;<BIM></BIM>&ndash;&gt;-->
    <!--    </div>-->
  </div>

</template>


<script type="text/javascript">

  export default {
    name: 'App',
    data() {
      return {
        url: 'http://39.108.211.7:8123/api',
        logo: 'https://i.loli.net/2020/12/22/g8NYHQtB1xS4wmy.jpg',
        loginModal: false,
        registerModal: false,
        loginHidden: false,
        modal_loading1: false,
        modal_loading2: false,
        loginMessageHidden: true,
        registerMessageHidden: true,
        inputUsername: '',
        inputPassword: '',
        inputUsername2: '',
        inputPassword2: '',
        UserHidden: true,
        loginMessage: '登录/注册',
        user: {
          id: null,
          email: null,
          nickname: null,
          sex: null,
          username: null,
          is_admin: 0
        }
      }
    },

    created() {
      if(localStorage.getItem('hasLogin')=='true')
      {
        this.user=JSON.parse(localStorage.getItem('user'))
        this.UserHidden = false;
        this.loginMessage = this.user.username;
        this.hasLogin = true;
      }

    },
    mounted() {
      console.log('我进来了，插入真实的dom')
    },

    methods: {

      test() {
        var data = new FormData();
        data.append('username', 'a');
        data.append('password', 'b');
        this.axios.post(this.url, data).then(response => {
          console.log(response.data);
        })
      },

      loginAPI() {
        // //发送网络请求
        this.loginMessageHidden = true;
        if (this.inputUsername == '' || this.inputPassword == '') {
          this.message = '请输入用户名或密码';
          this.loginMessageHidden = false;

        } else {
          this.modal_loading1 = true;
          var data = new FormData();
          data.append('username', this.inputUsername);
          data.append('password', this.inputPassword);
          this.axios.post(this.url + '/user/login', data).then(response => {
            if (response.data.code == -1) {
              this.modal_loading1 = false;
              this.message = '用户名或密码错误';
              this.loginMessageHidden = false;
            } else {
              this.user = response.data.data.user

              localStorage.setItem('user', JSON.stringify(response.data.data.user))
              localStorage.setItem('refresh_token', response.data.data.refresh_token)
              localStorage.setItem('access_token', response.data.data.access_token)
              this.modal_loading1 = false;
              this.loginModal = false;
              this.loginHidden = true;
              this.$Message.success('Successfully login');
              this.UserHidden = false;
              this.loginMessage = this.user.username;
              this.hasLogin = true;

              localStorage.setItem('hasLogin','true')
              this.axios.get(this.url + '/address/query',
                {headers:{'access_token':localStorage.getItem('access_token')}})
                .then(response => {
                  localStorage.setItem('address', JSON.stringify(response.data.data))
                })
            }
          })

        }

      },

      registerAPI() {
        this.registerMessageHidden = true;
        if (this.inputUsername2 == '' || this.inputPassword2 == '') {
          this.message = '请输入用户名或密码';
          this.registerMessageHidden = false;
        } else {
          this.modal_loading2 = true;
          var data = new FormData();
          data.append('username', this.inputUsername2);
          data.append('password', this.inputPassword2);
          this.axios.post(this.url + '/user/register', data).then(response => {
            if (response.data.code == -1) {
              this.modal_loading2 = false;
              this.message = '用户名已存在';
              this.registerMessageHidden = false;
            } else {
              this.modal_loading2 = false;
              this.registerModal = false;
              this.$Message.success('Successfully register');

            }
          })
        }
      },
      toMainPage(number) {
        //成功
        // this.$router.back()
        // this.loginAPI('a','b')
        this.$router.push({name: 'MainPage'})

      },

      toDetailPage() {
        this.$router.push({name: 'DetailPage', params: {userId: 123}})
      },

      showLogin() {
        if (this.UserHidden)    //未登录
          this.loginModal = true;
        else
        {
          alert('已注销')
          this.UserHidden=true
          this.loginMessage='登录/注册'
          localStorage.setItem('hasLogin','false')
          localStorage.setItem('address',null)
        }
      },
      showRegister() {
        this.registerModal = true;
        this.registerMessageHidden = true;
      },
      toUserNav() {
        this.$router.push({name: 'UserNav', params: {userId: 123}})
      },

      components: {

      },

    }
  }

</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

  }

  .layout-logo {
    width: 70px;
    height: 40px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 0px;
  }

  .layout-nav {
    width: 200px;
    margin-right: 0px;
    margin-left: 1200px;
  }

  .layout-button {
    width: 105px;
    margin: 0 auto;
    margin-left: 70px;
  }

  .layout-card {
    column-span: 2;
    margin-left: 30px;
    margin-right: 10px;
    margin-top: 0px;
    margin-bottom: 30px;
  }

  .layout-footer-center {
    text-align: center;
  }

  .MenuItemWid {
    /*width: 10px;*/

  }

  .center {
    text-align: center;
  }
</style>
