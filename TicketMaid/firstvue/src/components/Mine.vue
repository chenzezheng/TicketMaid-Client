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
            <h2 style="margin-left: 40px;margin-top: 20px" v-text="'用户ID：888888888'"></h2>
            <Button icon="ios-create" type="warning" shape="circle" style="margin-left: 40px;margin-top: 20px"  @click="editID">编辑ID</Button>
          </div>
          <div class="row">
             <h2 style="margin-left: 40px;margin-top: 20px" v-text="'昵称：张三'"></h2>
            <Button icon="ios-create" type="warning" shape="circle" style="margin-left: 40px;margin-top: 20px"  @click="editName">编辑姓名</Button>
          </div>
          <div class="row">
            <h2 style="margin-left: 40px;margin-top: 20px" v-text="'性别：'"></h2>
            <i-switch v-model="sex" size="large" style="margin-left: 20px;margin-top: 25px" true-color="#2d8cf0" false-color="#ff4949">
              <span slot="open"><Icon type="md-male" /></span>
              <span slot="close"><Icon type="md-female" /></span>
            </i-switch>
          </div>
<!--          <div class="row">-->
<!--            <h2 style="margin-left: 40px;margin-top: 20px" v-text="'出生日期：'"></h2>-->
<!--            <row>-->
<!--              <Col span="12">-->
<!--                <DatePicker type="date" placeholder="Select date" style="width: 200px;margin-left: 20px;margin-top: 20px"></DatePicker>-->
<!--              </Col>-->
<!--            </row>-->
<!--          </div>-->
          <div>
            <h2 style="margin-left: 40px;margin-top: 20px" v-text="'我的邮箱：'"></h2>
            <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..." style="margin-left: 40px;margin-top: 10px"/>
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
            sex:true,
            value1:'',
            value2:'',
          }
      },
      methods: {
        editName () {
          this.$Modal.confirm({
            render: (h) => {
              return h('Input', {
                props: {
                  value: this.value2,
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
        },editID () {
          this.$Modal.confirm({
            render: (h) => {
              return h('Input', {
                props: {
                  value: this.value2,
                  autofocus: true,
                  placeholder: 'Please enter your ID'
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
