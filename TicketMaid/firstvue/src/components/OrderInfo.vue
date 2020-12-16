<template>
<div>
  <template>
    <Layout :style="{padding: '0 24px 24px',minHeight: '750px'}">
      <Breadcrumb :style="{margin: '24px 0',fontSize:'20px'}">
        <BreadcrumbItem>订单详情</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0px', minHeight: '280px', background: '#fff'}">
  <div class="container">
<!--    <div>User {{ $route.params.id }}</div>-->
    <div class="margin-left">
<!--    <h1>订单详情</h1>-->
      <div class="margin-top">
        <div class="row">
        <!--          <strong>{{ row.name }}</strong>-->
        <img :src="data1[$route.params.id].picture" alt="" height="400" width="300">
          <div class="column">
            <h1 class="margin-left" v-text="data1[$route.params.id].name"></h1>
            <h3 class="margin-left" v-text="' · 演出时间:'+data1[$route.params.id].time" style="margin-top: 10px"></h3>
            <h3 class="margin-left" v-text="' · 主演嘉宾:'+data1[$route.params.id].person" style="margin-top: 20px"></h3>
            <h2 class="margin-left" v-text="'购买数量:'+data1[$route.params.id].amount+'张'" style="margin-top: 60px"></h2>
            <h2 class="margin-left" v-text="'订单金额: '+data1[$route.params.id].amount+' X '+data1[$route.params.id].price+' = '+ data1[$route.params.id].price*data1[$route.params.id].amount+'元'" style="margin-top: 20px"></h2>
            <h2 class="margin-left" v-text="'购买时间:'+data1[$route.params.id].buytime" style="margin-top: 20px"></h2>
          </div>
        </div>
        <Divider />
        <h1 v-text="'物流信息'" style="margin-top: 0px"></h1>
        <h2 v-text="' · 收货人:'+data1[$route.params.id].pname" style="margin-top: 10px"></h2>
        <h2 v-text="' · 联系电话:'+data1[$route.params.id].number" style="margin-top: 20px"></h2>
        <h2 v-text="' · 收货地址:'+data1[$route.params.id].location" style="margin-top: 20px"></h2>
        <h2 v-text="' · 运送状态:'+data1[$route.params.id].mode" style="margin-top: 20px"></h2>
        <h2 v-text="' · 快递单号:'+data1[$route.params.id].transnum" style="margin-top: 20px"></h2>
      </div>
    </div>
  </div>
      </Content>
    </Layout>
  </template>
</div>
</template>

<script>
    export default {
        name: "OrderInfo",
      data(){
          return{
            data1: [
              {
                id: '0',
                picture: "https://i.loli.net/2020/12/06/XWK4CZsHwlAEz2b.jpg",
                name: ' INNERSECT 2020国际潮流体验展',
                amount: 1,
                price:318.00,
                time:"2020年12月26日",
                person:"张三",
                buytime:"2020年12月9日",
                location:"湖北省 武汉市 洪山区 珞南街道 武汉大学信息学部",
                mode:"运送中，从北京集散中心发出",
                transnum:"SF123456789",
                number:"187-8888-8888",
                pname:"李四"
              },
              {
                id: '1',
                picture: "https://i.loli.net/2020/12/06/rlqEVfN387hmjp5.jpg",
                name: ' 桃子星球艺术节',
                amount: 3,
                price:80.00,
                time:"2020年12月26日",
                person:"张三",
                buytime:"2020年12月9日",
                location:"湖北省 武汉市 洪山区 珞南街道 武汉大学信息学部",
                mode:"运送中，从北京集散中心发出",
                transnum:"SF123456789",
                number:"187-8888-8888",
                pname:"李四"
              },
              {
                id: '2',
                picture: "https://i.loli.net/2020/12/06/VMOdX3IhG7voKjQ.png",
                name: ' “派克特和坏妈咪”乐队2020 西安站',
                amount: 2,
                price:220.00,
                time:"2020年12月26日",
                person:"张三",
                buytime:"2020年12月9日",
                location:"湖北省 武汉市 洪山区 珞南街道 武汉大学信息学部",
                mode:"运送中，从北京集散中心发出",
                transnum:"SF123456789",
                number:"187-8888-8888",
                pname:"李四"
              },
              {
                id: '3',
                picture: "https://i.loli.net/2020/12/06/sP4DzKeZrEVhvfS.jpg",
                name: ' Click#15疯客与舞蹈FUNK ＆ DANCE 2020巡演 广州站',
                amount: 1,
                price:120.00,
                time:"2020年12月26日",
                person:"张三",
                buytime:"2020年12月9日",
                location:"湖北省 武汉市 洪山区 珞南街道 武汉大学信息学部",
                mode:"运送中，从北京集散中心发出",
                transnum:"SF123456789",
                number:"187-8888-8888",
                pname:"李四"
              }
            ]
          }
      }
    }
</script>

<style scoped>
  .container{
    width: 1400px;
    margin: 0 auto;
  }
  .margin-left{
    margin-left: 20px;
  }
  .margin-top{
    margin-top: 10px;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .column{
    display: flex;
    flex-direction: column;
  }
</style>
