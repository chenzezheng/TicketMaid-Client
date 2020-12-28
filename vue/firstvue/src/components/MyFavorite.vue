<template>
  <div>
    <template>
      <Layout :style="{padding: '0 24px 24px',minHeight: '750px'}">
        <Breadcrumb :style="{margin: '24px 0',fontSize:'20px'}">
          <BreadcrumbItem>收藏的活动</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '0px', minHeight: '280px', background: '#fff'}">
          <div class="container">
            <Table :columns="columns1" :data="data1">
              <template slot-scope="{ row , index}" slot="cover">
                <!--          <strong>{{ row.name }}</strong>-->
                <img :src="row.cover" alt="" height="200" width="150">
              </template>
              <template slot-scope="{row}" slot="total">
                <span>{{row.amount*row.price}}</span>
              </template>>
              <template slot-scope="{row , index}" slot="action">
<!--                <Button type="success" icon="logo-usd">立即购买</Button>-->
<!--                <br><br>-->
                <Button type="error" icon="md-heart-outline" @click="remove(index)">取消收藏</Button>
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
    name: "MyFavorite",
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
            title: '单价',
            key: 'price'
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
        //     id: '2',
        //     picture: "https://i.loli.net/2020/12/06/VMOdX3IhG7voKjQ.png",
        //     name: ' “派克特和坏妈咪”乐队2020 西安站',
        //     price:220.00
        //   },
        // ]
      }
    },
    mounted() {
      this.axios.get(this.url+'/favorite/query',
        {headers:{'access_token':localStorage.getItem('access_token')}}).then(res => {
        this.data1 = res.data.data;
      })},
    methods:{
      remove(index){
        this.$Modal.confirm({
          title:'提示',
          content:'确认删除这条记录吗？',
          onOk:()=>{
            var delFav = new FormData();
            delFav.append('id',this.data1[index].id)
            this.axios.delete(this.url+'/favorite/remove',
              {headers:{'access_token':localStorage.getItem('access_token')},data: delFav})
              .then(response => { if (response.data.code >= 0) this.data1.splice(index, 1);} );
          },
          onCancel:()=>{}
        })
      },
    }
  }
</script>

<style scoped>
  .container{
    width: 1200px;
    margin: 0 auto;
  }
</style>
