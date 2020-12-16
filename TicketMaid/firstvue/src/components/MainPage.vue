<template>
  <div>
    <Card>
      <div id="test" style="min-height: 1000px;" >
        <Carousel autoplay v-model="value2" loop style="min-height: 400px;">
          <CarouselItem>
            <div class="demo-carousel">1</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">2</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">3</div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">4</div>
          </CarouselItem>
        </Carousel>
        <div >
          <h1 :style="{'font-size': '25px','margin-top':'30px','margin-left':'30px'}">全部活动:</h1>
        </div>
        <div class="searchText" >
          <Input placeholder="Search" class="width" size="large">
            <Icon type="ios-search" slot="suffix" @click="test()"/>
          </Input>
        </div>
        <Row style="padding:20px">
          <div v-for="activity in activities">
            <Col span="5" class="layout-card">
              <div @click="toDetailPage(activity)">
                <Card :bordered="true" class="card-layout">
                  <div slot="title" style="height: 400px">
                    <img v-bind:src='activity.imgSrc' height="100%" width="100%">
                  </div>
                  <p><b> {{ activity.Name }}</b></p>
                  <p>{{ activity.Time }}</p>
                  <div class="card-desc">
                    <p class="card-desc-left">{{ activity.Location }}</p>
                    <div class="card-desc-right"><p>￥{{ activity.Price }}起</p></div>
                  </div>
                </Card>
              </div>
            </Col>
          </div>


        </Row>
        <div class="center">
          <Page :total="100" page-size="12" show-elevator />
          <!--              <div v-on:click="submit(4)">{{message}}</div>-->
        </div>
      </div>
    </Card>

  </div>

</template>

<script>
  export default {
    name: "",
    data(){
      return {
        message: "aaa",

        activities: [{
          Name: 'This is a test',
          //imgSrc:require('../assets/logo.png'),
          imgSrc: 'https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN013plYGO2GdSHiZPWdH_!!2251059038.jpg_q60.jpg_.webp',
          Time: '2018.10.1',
          Location: '湖北武汉大学信息学部',
          Price: 250
        },
          {
            Name: 'tsestt12',
            //imgSrc:require('../assets/logo.png'),
            imgSrc: 'https://i0.hdslb.com/bfs/archive/622017dd4b0140432962d3ce0c6db99d77d2e937.png',
            Time: '2223.10.1',
            Location: 'bilibili上海',
            Price: 300
          }
        ]
      }
    },
    methods: {
      test() {
        this.message = "bbb";
      },
      toDetailPage(activity)
      {
        this.$router.push({name: 'DetailPage', params: {activity: activity}});
      }

    }
  }


</script>

<style scoped>

  .card-desc {
    display: inline-flex;
    width: 100%;
  }

  /*.card-desc-left {*/
  /*  */
  /*}*/

  .card-desc-right {
    right: 0;
    margin-right: 1em;
    position: absolute;
    color: orange;
  }

  .card-layout >>> .ivu-card-head {
    padding: 0;
  }


  .layout-card{
    column-span: 2;
    margin-left: 30px;
    margin-right: 10px;
    margin-top:0px;
    margin-bottom:30px;
  }

  .center{
    text-align: center;
  }

  .searchText{
    text-align: right;
  }

  .width{
    width: 230px;
    margin-right: 95px;
  }

</style>
