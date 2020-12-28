<template>
  <div>
    <template>
      <Layout :style="{padding: '0 24px 24px',minHeight: '750px'}">
        <Breadcrumb :style="{margin: '24px 0',fontSize:'20px'}">
          <BreadcrumbItem>已支付订单</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '0px', minHeight: '280px', background: '#fff'}">
          <div class="container">
            <Table :columns="columns1" :data="data1">
              <template slot-scope="{ row , index}" slot="cover">
                <!--          <strong>{{ row.name }}</strong>-->
                <img :src="row.cover" alt="" height="200" width="150">
              </template>
              <template slot-scope="{row}" slot="total">
                <span>{{row.quantity*row.price}}</span>
              </template>>
              <template slot-scope="{row , index}" slot="action">
                <router-link :to='"/UserNav/OrderInfo/"+row.id'>
                  <Button icon="md-cart" type="warning">详细信息</Button>
                </router-link>
                <br><br>
                <Button icon="md-close" type="error" @click="remove(index)">删除订单</Button>
              </template>
            </Table>
          </div>
        </Content>
      </Layout>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'OrderList1',
    data () {
      return {
        url: 'http://39.108.211.7:8123/api',
        columns1: [
          {
            title: '序号',
            key: 'number',
            type:'index'
          },
          {
            title: '图片',
            key: 'cover',
            slot:'cover'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '数目',
            key: 'quantity'
          },
          {
            title: '单价',
            key: 'price'
          },{
            title: '总价',
            slot:'total'
          },
          {
            title: '更多',
            key: 'more',
            slot:'action',
          }
        ],
        data1:[]
        // data1: [
        //   {
        //     id: '0',
        //     picture: "https://i.loli.net/2020/12/06/XWK4CZsHwlAEz2b.jpg",
        //     name: ' INNERSECT 2020国际潮流体验展',
        //     amount: 1,
        //     price:318.00
        //   },
        //   {
        //     id: '1',
        //     picture: "https://i.loli.net/2020/12/06/rlqEVfN387hmjp5.jpg",
        //     name: ' 桃子星球艺术节',
        //     amount: 3,
        //     price:80.00
        //   },
        // ]
      }
    },
    methods:{
      remove(index){
        this.$Modal.confirm({
          title:'提示',
          content:'确认删除这条记录吗？',
          onOk:()=>{
            var delOrder = new FormData();
            delOrder.append('id',this.data1[index].id)

            this.axios.delete(this.url+'/order/remove',
              {headers:{'access_token':localStorage.getItem('access_token')},data: delOrder})
              .then(response => { if (response.data.code >= 0) this.data1.splice(index, 1);} );
          },
          onCancel:()=>{},
        })
      },
    },
    mounted() {
      this.axios.get(this.url+'/order/query',
        {headers:{'access_token':localStorage.getItem('access_token')}}).then(res => {
        this.data1 = res.data.data;
      })}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 1200px;
    margin: 0 auto;
  }
</style>
