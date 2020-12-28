<template>
  <div>
    <Content :style="{padding: '0 50px'}">
      <Card>
        <Row>
          <Col span="6">
            <div style="width: 340px;height:400px;margin-bottom: 20px;">
              <img v-bind:src='activity.cover' height="100%" width="100%">
            </div>
          </Col>
          <Col span="11">
            <div style="margin-top: 20px;margin-left: 10px">
              <h1 style="font-size: 30px">{{ activity.name }}</h1>
              <br/>
              <p style="font-size: 20px">时间：{{ activity.time.slice(0,10)+' '+activity.time.slice(11,16) }}</p>
              <p style="font-size: 20px">地点：{{ activity.location }}</p>
              <br/>
              <span style="font-size:20px">票价：</span>
              <RadioGroup type="button" size="large">
                <Radio v-bind:label="activity.price"></Radio>
              </RadioGroup>
              <div style="margin-top: 10px">
                <span style="font-size:20px">数量：</span>
                <InputNumber min="1" v-bind:max="this.activity.quota" v-model="count" :editable="false"></InputNumber>
                <span style="margin-left: 10px;font-size: 12px;color: #ff9900">   库存：{{ activity.quota }} </span>
              </div>
              <div style="margin-top: 10px">
                <span style="font-size:20px">收货地址：</span>
                <Select v-model="selectAddressId" prefix="ios-home" style="width:200px">
                  <Option v-for="address in addresses" :value="address.id" :key="address.address">{{
                      address.address
                    }}
                  </Option>
                </Select>
              </div>
              <Button style="width: 160px;height: 60px;margin-right: 10px;margin-top: 40px" type="primary"
                      size="large" @click="buy()">抢购
              </Button>
              <Button style="width: 160px;height: 60px;margin-right: 10px;margin-top: 40px" size="large"
                      @click="Collect()">收藏
              </Button>
            </div>
          </Col>
        </Row>
        <Tabs value="name1" style="margin-left: 20px" size="default">
          <TabPane label="活动详情" name="name1">
            <p style="font-size: 20px"> {{ activity.info }}</p>
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
            <p style="font-size: 17px;margin-bottom: 10px">
              演出开始前，去【APP-订单详情页】提交发票申请。演出结束后1个月左右邮寄给你，需自付邮费。</p>
            <p style="color: #9ea7b4">实名购票规则</p>
            <p style="font-size: 17px;margin-bottom: 10px">一张门票对应一个证件；证件支持：身份证。</p>
            <p style="color: #9ea7b4">异常排单说明</p>
            <p style="font-size: 17px;margin-bottom: 10px">对于异常订购行为，有权在订单成立或者生效之后取消相应订单。异常订购行为包括但不限于以下情形：
              （1）通过同一ID订购超出限购张数的订单。
              （2）经合理判断认为非真实消费者的下单行为，包括但不限于通过批量相同或虚构的支付账号、收货地址（包括下单时填写及最终实际收货地址）、收件人、电话号码订购超出限购张数的订单。</p>

          </TabPane>

        </Tabs>
      </Card>
      <div>
        <Spin fix v-if="spinShow">
          <Icon type="ios-loading" size=80 class="demo-spin-icon-load"></Icon>
          <div style="size: 150px;font-size: 20px">抢购中</div>
        </Spin>
      </div>
    </Content>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        url: 'http://39.108.211.7:8123/api',
        Name: 'This is a test',
        //imgSrc:require('../assets/logo.png'),
        imgSrc: 'https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN013plYGO2GdSHiZPWdH_!!2251059038.jpg_q60.jpg_.webp',
        Time: '2018.10.1',
        Location: '湖北武汉大学信息学部',
        Price: 250,
        Detail: '湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部湖北武汉大学信息学部',
        spinShow: false,
        count: 1,
        Left: 5,
        addresses: null,
        hasLogin: null,
        activity: null,
        selectAddressId: null
      }

    },
    created() {
      this.hasLogin = this.$route.params.hasLogin;
      if(this.hasLogin=='true') {
        this.addresses = this.$route.params.addresses;
      }
      this.activity = this.$route.params.activity;
      console.log(this.addresses)
    },

    methods: {
      buy() {
        if(this.hasLogin=='false')
        {
          this.$Message.warning('请先登录')
        }
        else if (this.selectAddressId == null) {
          this.$Message.warning('请选择收货地址')
        } else {
          this.spinShow = true;
          var curAddress
          this.addresses.forEach(address => {
            if (address.id == this.selectAddressId) {
              curAddress = address
            }
          })
          var data = new FormData();
          data.append('event_id', this.activity.id);
          data.append('quantity', this.count)
          data.append('name', curAddress.name)
          data.append('address', curAddress.address)
          data.append('phone', curAddress.phone)
          var token = localStorage.getItem('access_token')
          var that = this;
          this.axios.post(this.url + '/order/add', data,
            {headers: {'access_token': token}})
            .then(response => {
              console.log(response.data)
              if (response.data.code >= 0) {
                var check = setInterval(checkOrderStatus, 200);

                function checkOrderStatus()
                {
                  console.log("checking order status");
                  that.spinShow = false;
                  that.axios.get(that.url + '/order/check', {
                    params: {'event_id': data.get('event_id')},
                    headers: {'access_token': token}
                  })
                    .then(response => {
                      console.log(response.data)
                      if (response.data.code == -1) {
                        that.spinShow = false;
                        alert('名额不足，抢票失败');
                        clearInterval(check);

                      } else if (response.data.code == 1) {
                        that.spinShow = false;
                        that.$Message.success('购票成功，可在订单页面查看');
                        clearInterval(check);
                        that.activity.quota-=that.count
                      }
                    })
                }
              } else {
                that.spinShow = false;
                alert('名额不足，抢票失败');
              }
            })

        }
      },


      Collect() {
        console.log(this.hasLogin)
        if (this.hasLogin != 'true') {
          alert("请先登录！")
        } else {
          var data = new FormData();
          data.append('event_id', this.activity.id);
          this.axios.post(this.url + '/favorite/add', data,
            {headers: {'access_token': localStorage.getItem('access_token')}})
            .then(response => {
              if (response.data.code == -1) {
                this.$Message.warning(response.data.desc)
              } else
                this.$Message.success("收藏成功！")
            })
        }
      },
      sleep(d) {
        for (var t = Date.now(); Date.now() - t <= d;) ;
      }
    }
  }


</script>

<style scoped>
  .label {
    width: 500px;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
    margin-top: 0px;
  }
</style>
