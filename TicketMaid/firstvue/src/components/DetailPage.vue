<template>
  <div>
    <Card>
      <Row>
        <Col span="8">
          <div >
            <img v-bind:src='imgSrc' style="width: 400px;height: 350px;object-fit: fill">
          </div>
        </Col>
        <Col span="11" >
          <div style="margin-top: 20px">
            <h1>{{Name}}</h1>
            时间：{{Time}}
            <br> </br>
            地点：{{Location}}
            <br> </br>
            票价：
            <RadioGroup v-model="button4" type="button" size="large">
              <Radio v-bind:label="Price"></Radio>
            </RadioGroup>
            <br></br>
            <Button style="width: 160px;height: 60px;margin-right: 10px" type="primary" size="large" @click="buy()">抢购</Button>
            <Button style="width: 160px;height: 60px;margin-right: 10px" size="large" @click="">收藏</Button>
          </div>
        </Col>
      </Row>
      <Tabs value="name1" style="margin-left: 20px" size="default">
        <TabPane   label="活动详情" name="name1">{{Detail}}</TabPane>
        <TabPane label="购票须知" name="name2">
          <h2>限购规则</h2>
          每笔订单最多购买2张、每个账号最多购买2张。
          <h2>退票/换票规则</h2>

          票品为有价证券，非普通商品，其背后承载的文化服务具有时效性，稀缺性等特征，不支持退换。
          <h2>配送信息说明</h2>

          不支持修改配送电话、地址等信息
          <h2>入场规则</h2>

          须携带纸质门票验票入场。
          <h2>儿童购票</h2>

          1.2米以上凭成人票入场，1.2米以下谢绝入场
          <h2>发票说明</h2>

          演出开始前，去【APP-订单详情页】提交发票申请。演出结束后1个月左右邮寄给你，需自付邮费。
          <h2>实名购票规则</h2>

          一张门票对应一个证件；证件支持：身份证
          <h2>异常排单说明</h2>

          对于异常订购行为，有权在订单成立或者生效之后取消相应订单。异常订购行为包括但不限于以下情形： （1）通过同一ID订购超出限购张数的订单。 （2）经合理判断认为非真实消费者的下单行为，包括但不限于通过批量相同或虚构的支付账号、收货地址（包括下单时填写及最终实际收货地址）、收件人、电话号码订购超出限购张数的订单。
        </TabPane>

      </Tabs>
    </Card>
<!--    <div class="demo-spin-article">-->
<!--      <Spin size="large" fix v-if="spinShow">-->
<!--&lt;!&ndash;        <div>&ndash;&gt;-->
<!--&lt;!&ndash;          <h2>抢购中</h2>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </Spin>-->
<!--    </div>-->
    <div>
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=100 class="demo-spin-icon-load"></Icon>
        <div style="size: 100px">抢购中</div>
      </Spin>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        Name:'This is a test',
        imgSrc:require('../assets/logo.png'),
        Time:'2018.10.1',
        Location:'湖北武汉大学信息学部',
        Price:250,
        Detail:'湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部',
        spinShow:false
      }

    },
    methods:{
      buy()
      {
        this.spinShow=!this.spinShow;
        setTimeout(() => {
          this.spinShow=!this.spinShow;
          alert("抢购失败");
        }, 2000);
      },
      handleSpinCustom () {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
        setTimeout(() => {
          this.$Spin.hide();
        }, 3000);
      }
    }

  }
</script>

<style scoped>
.label{
  width: 500px;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
</style>
