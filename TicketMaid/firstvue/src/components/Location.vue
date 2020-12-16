<template>
  <div>
    <template>
      <Layout :style="{padding: '0 24px 24px',minHeight: '750px'}">
        <Breadcrumb :style="{margin: '24px 0',fontSize:'20px'}">
          <BreadcrumbItem>收货地址</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '0px', minHeight: '280px', background: '#fff'}">
          <div class="container">
            <Table border :columns="columns12" :data="data6">
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
              </template>
            </Table>
          </div>
          <Divider style="margin-top: 35px"/>
          <div class="column">
            <!--  <h1 style="margin-left: 20px">新增收货地址</h1>-->
            <!--    <h2 style="margin-top: 20px;margin-left: 20px">姓名：</h2>-->
            <!--  <Input v-model="value1" prefix="ios-contact" placeholder="Enter name" style="width: 200px;margin-left: 20px" />-->
            <!--    <h2 style="margin-top: 20px;margin-left: 20px">电话：</h2>-->
            <!--    <Input v-model="value2" maxlength="11" show-word-limit placeholder="Enter tel-number" style="width: 200px;margin-left: 20px" />-->
            <!--    <h2 style="margin-top: 20px;margin-left: 20px">收货地址：</h2>-->
            <!--    <Input v-model="value3" maxlength="200" show-word-limit type="textarea" placeholder="Enter address" style="width: 400px;margin-left: 20px" />-->
            <Button type="success" icon="ios-add" shape="circle" size="large" style="margin-left: 20px;margin-top: 20px;margin-bottom:20px;width: 200px" @click="handleRender" >新增</Button>
          </div>
        </Content>
      </Layout>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Location",
    data(){
      return{
        value1:'',
        value2:'',
        value3:'',
        columns12: [
          {
            title: '姓名',
            slot: 'name'
          },
          {
            title: '电话',
            key: 'tel'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '更多',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data6: [
          {
            name: 'John Brown',
            tel: 18788888888,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            tel: 18766666666,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            tel: 18755555555,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            tel: 18744444444,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    },

    mounted() {
      axios.get(
        "/api/address/query",).then(res => {
          let data = res.data;
          console.log(res.data);
          // if (data.status == 0) {
          //   let address = data.data;
          //   for (let i of address) {
          //     tmpArr.push()
          //   }
          //   this.data6 = tmpArr;
          // }
        }
      )
    },

    methods: {
      show (index) {
        this.$Modal.info({
          title: '详情',
          content: `Name：${this.data6[index].name}<br>Tel：${this.data6[index].tel}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      // add(){
      //   this.data6.push({name:this.value1,tel:this.value2,address:this.value3})
      // },
      handleRender (){
        this.$Modal.confirm({
          title:'新增收货地址',
          onOk: () =>{
            this.data6.push({name:this.value1,tel:this.value2,address:this.value3})
          },
          onCancel:() => {},
          render: (createElement) => {
            return createElement('div', {},[
                createElement('Input',{
                  props: {
                    value: this.value,
                    autofocus: true,
                    placeholder: 'Please enter your name...',
                    prefix:'ios-contact',
                    class:'margin-bottom',

                  },
                  on: {
                    input: (val) => {
                      this.value1 = val;
                    }
                  }
                }),
                createElement('Input',{
                  props: {
                    value: this.value,
                    autofocus: true,
                    placeholder: 'Please enter your tel-number',
                    prefix:'ios-call',
                  },
                  style: {
                    marginTop: '14px',

                  },
                  on: {
                    input: (val) => {
                      this.value2 = val;
                    }
                  }
                }),
                createElement('Input',{
                  props: {
                    value: this.value,
                    autofocus: true,
                    placeholder: 'Please enter your tel-number',
                    prefix:'ios-home',
                  },
                  style: {
                    marginTop: '14px',
                    type:'textarea'
                  },
                  on: {
                    input: (val) => {
                      this.value3 = val;
                    }
                  }
                })
              ]
            )
          }
        })
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 1400px;
    /*margin: 0 auto;*/
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .column{
    display: flex;
    flex-direction: column;
  }
  .margin-bottom{
    margin-bottom:20px
  }
</style>
