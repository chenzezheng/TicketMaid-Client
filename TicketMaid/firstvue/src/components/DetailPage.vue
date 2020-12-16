<template>
  <div>
    <Card>
      <Row>
        <Col span="6">
          <div style="width: 340px;height:400px;margin-bottom: 20px;">
            <img v-bind:src='activity.imgSrc'height="100%" width="100%" >
          </div>
        </Col>
        <Col span="11" >
          <div style="margin-top: 20px;margin-left: 10px">
            <h1 style="font-size: 30px">{{activity.Name}}</h1>
            <br/>
            <p style="font-size: 20px">时间：{{activity.Time}}</p>
            <p style="font-size: 20px">地点：{{activity.Location}}</p>
            <br/>
            <span style="font-size:20px">票价：</span>
            <RadioGroup v-model="button4" type="button" size="large">
              <Radio v-bind:label="activity.Price"></Radio>
            </RadioGroup>
            <br></br>
            <Button style="width: 160px;height: 60px;margin-right: 10px;margin-top: 40px" type="primary" size="large" @click="buy()">抢购</Button>
            <Button style="width: 160px;height: 60px;margin-right: 10px;margin-top: 40px" size="large" @click="">收藏</Button>
          </div>
        </Col>
      </Row>
      <Tabs value="name1" style="margin-left: 20px" size="default">
        <TabPane   label="活动详情" name="name1">
          <p style="font-size: 20px">  {{Detail}}</p>
        </TabPane>
        <TabPane label="购票须知" name="name2">
          <p style="color: #9ea7b4">限购规则</p>
          <p style="font-size: 17px;margin-bottom: 10px">每笔订单最多购买2张、每个账号最多购买2张。</p>
          <p style="color: #9ea7b4">退票/换票规则</p>
          <p style="font-size: 17px;margin-bottom: 10px">票品为有价证券，非普通商品，其背后承载的文化服务具有时效性，稀缺性等特征，不支持退换。</p>
          <p style="color: #9ea7b4">配送信息说明</p>
          <p style="font-size: 17px;margin-bottom: 10px">不支持修改配送电话、地址等信息。</p>
          <p style="color: #9ea7b4">入场规则</p>
          <p style="font-size: 17px;margin-bottom: 10px">须携带纸质门票验票入场。</p>
          <p style="color: #9ea7b4">儿童购票</p>
          <p style="font-size: 17px;margin-bottom: 10px">1.2米以上凭成人票入场，1.2米以下谢绝入场。</p>
          <p style="color: #9ea7b4">发票说明</p>
          <p style="font-size: 17px;margin-bottom: 10px"> 演出开始前，去【APP-订单详情页】提交发票申请。演出结束后1个月左右邮寄给你，需自付邮费。</p>
          <p style="color: #9ea7b4">实名购票规则</p>
          <p style="font-size: 17px;margin-bottom: 10px">一张门票对应一个证件；证件支持：身份证。</p>
          <p style="color: #9ea7b4">异常排单说明</p>
          <p style="font-size: 17px;margin-bottom: 10px">对于异常订购行为，有权在订单成立或者生效之后取消相应订单。异常订购行为包括但不限于以下情形： （1）通过同一ID订购超出限购张数的订单。 （2）经合理判断认为非真实消费者的下单行为，包括但不限于通过批量相同或虚构的支付账号、收货地址（包括下单时填写及最终实际收货地址）、收件人、电话号码订购超出限购张数的订单。</p>

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
        <Icon type="ios-loading" size=80 class="demo-spin-icon-load"></Icon>
        <div style="size: 150px;font-size: 20px">抢购中</div>
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
        //imgSrc:require('../assets/logo.png'),
        imgSrc:'https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN013plYGO2GdSHiZPWdH_!!2251059038.jpg_q60.jpg_.webp',
        Time:'2018.10.1',
        Location:'湖北武汉大学信息学部',
        Price:250,
        Detail:'湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部',
        spinShow:false,
        activity:{
          Name:'',
          imgSrc:'',
          Time:'',
          Price:'',
          Detail:''
        }
      }

    },
    created()
    {
      this.activity=this.$route.params.activity;
      console.log('App.vue finish re-render1123');
    },
    updated() {
      this.activity = this.$route.params.activity;
      console.log('App.vue finish re-render');
    },
    // beforeRouteEnter()
    // {
    //   this.activity = this.$route.params.activity;
    //   console.log('App.vue finish re-render');
    // },
    beforeUpdate() {
      this.activity = this.$route.params.activity;
      console.log('App.vue finish re-render');
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
    margin-top:0px;
  }
</style>
