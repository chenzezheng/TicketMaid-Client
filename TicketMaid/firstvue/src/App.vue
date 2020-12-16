<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div>
            <img src="./assets/logo.png" class="layout-logo">
          </div>
          <div class="layout-button">
            <MenuItem name="1">
              <div @click="toMainPage(4)">首页</div>
            </MenuItem>
          </div>
          <div class="layout-nav">
            <!--            <div style="backgroundColor:blue;width: 50px">头像</div>-->
            <!--            <div @click="submit(4)" style="backgroundColor:red ">-->
            <!--&lt;!&ndash;              <router-link to="/hellword?id=1212">跳转helloword页面</router-link>&ndash;&gt;-->
            <!--              跳转helloword页面-->
            <!--            </div>-->
            <MenuItem name="3">
              <div @click="toDetailPage()"v-bind:hidden="UserHidden">
                <Icon type="ios-analytics"></Icon>
                个人中心
              </div>
            </MenuItem>
            <MenuItem name="4" >
              <div @click="showlogin()" >
                <!--              <Icon type="ios-paper"></Icon>-->
                {{loginmessage}}
              </div>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Modal v-model="modal2" width="400">
          <p slot="header" style="text-align:center">
            <span>Login</span>
          </p>
          <div style="text-align:center">
            <Input suffix="ios-contact" placeholder="Enter name" style="width: 300px" size="large" v-model="username"/>
            <br></br>
            <Input  type="password" password placeholder="Enter something..." style="width: 300px" size="large" v-model="password"/>
            <!--              <br></br>-->
            <div style="text-align: left;margin-left: 35px;margin-top: 5px;color:#ff4500" v-bind:hidden="messageDisplay">
              {{message}}
            </div>
          </div>
          <div slot="footer">
            <Button type="primary" size="large" long :loading="modal_loading" @click="login()">Login</Button>
            <br></br>
            <Button long  size="large" @click="modal3=true" >Register</Button>
          </div>
        </Modal>

        <Modal v-model="modal3" width="400">
          <p slot="header" style="text-align:center">
            <span>Register</span>
          </p>
          <div style="text-align:center">
            <Input suffix="ios-contact" placeholder="Enter name" style="width: 300px" size="large" v-model="username"/>
            <br></br>
            <Input  type="password" password placeholder="Enter something..." style="width: 300px" size="large" v-model="password"/>
            <!--              <br></br>-->
            <div style="text-align: left;margin-left: 35px;margin-top: 5px;color:#ff4500" v-bind:hidden="messageDisplay">
              {{message}}
            </div>
          </div>
          <div slot="footer">
            <Button type="primary" size="large" long :loading="modal_loading" @click="register()">Register</Button>
          </div>
        </Modal>


        <keep-alive >
          <router-view v-if="$route.meta.keepalive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepalive"></router-view>

      </Content>
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
  import BIM from '@/components/B';


  export default {
    name: 'App',
    data() {
      return {
        message: 'hahah',
        modal2: false,
        modal3: false,
        loginHidden: false,
        modal_loading: false,
        messageDisplay: true,
        username: '',
        password: '',
        UserHidden:true,
        loginmessage:'登录/注册'
      }
    },

    created() {
      console.log('我进来了，初始化')
      this.ajax()

    },
    mounted() {
      console.log('我进来了，插入真实的dom')
    },

    methods: {
      ajax() {
        //发送网络请求
      },
      toMainPage(number) {
        console.log(number)
        this.message = 'bbbb'
        //成功
        this.ajax(
        )
        console.log('首页',this.$router)
        // this.$router.back()
        this.$router.push({name: 'MainPage', params: {userId: 123}})
      },



      toHello() {
        this.$router.push({name: 'HelloWorld', params: {userId: 123}})
      },
      toDetailPage() {
        this.$router.push({name: 'DetailPage', params: {userId: 123}})
      },
      showlogin()
      {
        if(this.UserHidden)
          this.modal2=true;
      }
      ,
      login() {
        this.messageDisplay = true;
        if (this.username == '' || this.password == '') {
          this.message = '请输入用户名或密码';
          this.messageDisplay = false;
        }
        else {
          this.modal_loading = true;
          setTimeout(() => {
            this.modal_loading = false;
            this.modal2 = false;
            this.loginHidden = true;
            this.$Message.success('Successfully login');
            this.UserHidden = false;
            this.loginmessage = this.username;
          }, 2000);
        }
      },
      register() {
        this.messageDisplay = true;
        if (this.username == '' || this.password == '') {
          this.message = '请输入用户名或密码';
          this.messageDisplay = false;
        } else {
          this.modal_loading = true;
          setTimeout(() => {
            this.modal_loading = false;
            this.modal3 = false;
            this.$Message.success('Successfully register');

          }, 2000);
        }
      },

      components: {
        BIM
      },

    }
  }

</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

  }
  .layout-logo{
    width: 70px;
    height: 40px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 0px;
  }
  .layout-nav{
    width: 420px;
    margin-right: 0px;
    margin-left: 1200px;
  }
  .layout-button{
    width:105px;
    margin: 0 auto;
    margin-left: 70px;
  }
  .layout-card{
    column-span: 2;
    margin-left: 30px;
    margin-right: 10px;
    margin-top:0px;
    margin-bottom:30px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .center{
    text-align: center;
  }
</style>
