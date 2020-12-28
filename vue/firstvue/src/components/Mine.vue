<template>
  <Layout :style="{padding: '0 24px 24px'}">
    <Breadcrumb :style="{margin: '24px 0',fontSize:'20px'}">
      <BreadcrumbItem>我的资料</BreadcrumbItem>
    </Breadcrumb>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <div class="row">
        <Avatar shape="square" icon="ios-person" size="100" style="margin-left: 20px;margin-top: 20px"/>
        <div class="column">
          <div class="row">
            <h2 style="margin-left: 40px;margin-top: 20px">用户ID: {{Identity}}</h2>
<!--            <Button icon="ios-create" type="warning" shape="circle" style="margin-left: 40px;margin-top: 20px"  @click="editID">编辑ID</Button>-->
          </div>
          <div class="row">
            <h2 style="margin-left: 40px;margin-top: 20px" >昵称： {{ Nickname }}</h2>
            <Button icon="ios-create" type="warning" shape="circle" style="margin-left: 40px;margin-top: 20px"  @click="editName">编辑姓名</Button>
          </div>
<!--          <div class="row">-->
<!--            <h2 style="margin-left: 40px;margin-top: 20px" v-text="'性别：'"></h2>-->
<!--            <i-switch v-model="sex" size="large" style="margin-left: 20px;margin-top: 25px" true-color="#2d8cf0" false-color="#ff4949" @on-change="change">-->
<!--              <span slot="open"><Icon type="md-male" /></span>-->
<!--              <span slot="close"><Icon type="md-female" /></span>-->
<!--            </i-switch>-->
<!--          </div>-->
          <!--          <div class="row">-->
          <!--            <h2 style="margin-left: 40px;margin-top: 20px" v-text="'出生日期：'"></h2>-->
          <!--            <row>-->
          <!--              <Col span="12">-->
          <!--                <DatePicker type="date" placeholder="Select date" style="width: 200px;margin-left: 20px;margin-top: 20px"></DatePicker>-->
          <!--              </Col>-->
          <!--            </row>-->
          <!--          </div>-->
          <div class="row">
            <h2 style="margin-left: 40px;margin-top: 20px">我的邮箱： {{EmailBox}}</h2>
            <Button icon="ios-create" type="warning" shape="circle" style="margin-left: 40px;margin-top: 20px"  @click="editID">编辑邮箱</Button>
          </div>
        </div>
      </div>
    </Content>
  </Layout>
  <!--  </Layout>-->
  <!--  </Layout>-->



</template>

<script>
  export default {
    name: "Mine",
    data(){
      return{
        url: 'http://39.108.211.7:8123/api',
        sex:true,
        sextrans:'',
        value1:'',
        value2:'',
        Nickname:'',
        Identity:'',
        EmailBox:'',
        user:null
      }
    },
    mounted() {
      this.user=JSON.parse(localStorage.getItem('user'));
      this.Nickname=this.user.nickname;
      this.Identity=this.user.id;
      this.EmailBox=this.user.email;
      this.sextrans=this.user.sex;
      },
    methods: {
      editName () {
        this.$Modal.confirm({
          onOk:() => {
            console.log('11');
              var newName = new FormData();
              newName.append('nickname', this.value1);
              newName.append('sex', this.sextrans);
              newName.append('email', this.EmailBox);
              this.axios.put(this.url+'/user/modify/profile',newName,
                {headers:{'access_token':localStorage.getItem('access_token')}}).then(response => {
                if (response.data.code >= 0) this.Nickname=this.value1;
                console.log(response.data);

                this.user.nickname=this.value1;
                localStorage.setItem('user',JSON.stringify(this.user))
              });
          },
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value1,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  this.value1 = val;
                }
              }
            })
          }
        })
      },
      editID () {
        this.$Modal.confirm({
          onOk:() => {
            console.log('11');
            var newEmail = new FormData();
            newEmail.append('nickname', this.nickname);
            newEmail.append('sex', this.sextrans);
            newEmail.append('email', this.value2);
            this.axios.put(this.url+'/user/modify/profile',newEmail,
              {headers:{'access_token':localStorage.getItem('access_token')}}).then(response => {
              if (response.data.code >= 0) this.EmailBox=this.value2;
              console.log(response.data);

              this.user.email=this.value2;
              localStorage.setItem('user',JSON.stringify(this.user))
            });
          },
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value2,
                autofocus: true,
                placeholder: 'Please enter your Email'
              },
              on: {
                input: (val) => {
                  this.value2 = val;
                }
              }
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .row{
    display: flex;
    flex-direction: row;
  }
  .column{
    display: flex;
    flex-direction: column;
  }
</style>
