<template>
  <div>
    <Content :style="{padding: '0 50px'}">
      <Card>
        <div id="test" style="min-height: 1000px;">
          <Carousel autoplay v-model="value2" loop style="min-height: 400px;">
            <CarouselItem >
              <div class="demo-carousel" style="height: 400px" >
                <img v-bind:src="advs[0].img" width="100%" height="100%" >
              </div>
            </CarouselItem>
            <CarouselItem >
              <div class="demo-carousel" style="height: 400px" >
                <img v-bind:src="advs[1].img" width="100%" height="100%" >
              </div>
            </CarouselItem>
            <CarouselItem >
              <div class="demo-carousel" style="height: 400px" >
                <img v-bind:src="advs[2].img" width="100%" height="100%" >
              </div>
            </CarouselItem>
            <CarouselItem >
              <div class="demo-carousel" style="height: 400px" >
                <img v-bind:src="advs[3].img" width="100%" height="100%" >
              </div>
            </CarouselItem>
          </Carousel>
          <div @click="allActivities()">
            <h1 :style="{'font-size': '25px','margin-top':'30px','margin-left':'30px'}" >全部活动:</h1>
          </div>
          <div class="searchText">
            <Input v-model:value="keyword" placeholder="Search" class="width" size="large">
              <Icon type="ios-search" slot="suffix" @click="search()"/>
            </Input>
          </div>

          <Row style="padding:20px" >
            <div v-for="activity in activities" >
              <Col span="5" class="layout-card">
                <div @click="toDetailPage(activity)">
                  <Card :bordered="true" class="card-layout">
                    <div slot="title" style="height: 400px">
                      <img v-bind:src='activity.cover' height="100%" width="100%">
                    </div>
                    <p><b> {{ activity.name }}</b></p>
                    <p>{{ activity.time.slice(0,10)+' '+activity.time.slice(11,16) }}</p>
                    <div class="card-desc">
                      <p class="card-desc-left">{{ activity.location }}</p>
                      <div class="card-desc-right"><p>￥{{ activity.price }}起</p></div>
                    </div>
                  </Card>
                </div>
              </Col>
            </div>

          </Row>

          <div class="center">
            <Page @on-change="selectPage" v-bind:total=this.activityTotal v-bind:page-size=this.pageSize  show-elevator/>
          </div>
        </div>
      </Card>
    </Content>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        url: 'http://39.108.211.7:8123/api',
        advs:[
          {img:'https://gw.alicdn.com/tfs/TB1y8IUpsieb18jSZFvXXaI3FXa-1200-320.jpg'},
          {img:'https://gw.alicdn.com/tfs/TB1TXlrq6MZ7e4jSZFOXXX7epXa-1200-320.jpg'},
          {img:'https://s2.showstart.com/img/2020/1218/17/30/6363cc5d9a354d8787212da3f8cbfd74_1200_400_507183.0x0.jpg?imageMogr2/thumbnail/!1200x400r/gravity/Center/crop/!1200x400'},
          {img:'https://s2.showstart.com/img/2020/1221/16/30/54582c31c6d54ee4adde2b01431a68d8_1200_400_161791.0x0.jpg?imageMogr2/thumbnail/!1200x400r/gravity/Center/crop/!1200x400'}
        ],
        hasLogin:null,
        addresses:null,
        pageNo:1,
        pageSize:8,
        keyword:'',
        activityTotal:0,
        activities: [
          {

          }
        ],

      }
    },
    created()
    {
      this.axios.get(this.url + '/event/count')
        .then(response => {
          this.activityTotal=response.data.data

          console.log(response.data.data)
        })
      this.axios.get(this.url + '/event/query',{params:{pageNo:this.pageNo,pageSize:this.pageSize}})
        .then(response => {
          this.activities=response.data.data
          console.log(response.data.data)
        })

    }
    ,
    methods: {
      test() {
        this.message = "bbb";
      },


      toDetailPage(activity) {
        if(this.hasLogin==null||this.addresses==null)
        {
          this.hasLogin=localStorage.getItem('hasLogin')
          if(this.hasLogin=='true') {
            this.addresses = JSON.parse(localStorage.getItem('address'))
          }
          this.$router.push({name: 'DetailPage',
            params: {activity: activity,hasLogin:this.hasLogin,addresses:this.addresses}});
          console.log(this.addresses);
        }
        else {
          this.hasLogin=localStorage.getItem('hasLogin')
          if(this.hasLogin=='true') {
            this.addresses = JSON.parse(localStorage.getItem('address'))
          }
          this.$router.push({name: 'DetailPage',
            params: {activity: activity,hasLogin:this.hasLogin,addresses:this.addresses}});
            console.log(this.addresses);
        }
      },
      allActivities()
      {
        this.keyword=''
        this.axios.get(this.url + '/event/count')
          .then(response => {
            this.activityTotal=response.data.data

            console.log(response.data.data)
          })
        this.axios.get(this.url + '/event/query',{params:{pageNo:this.pageNo,pageSize:this.pageSize}})
          .then(response => {
            this.activities=response.data.data
            console.log(response.data.data)
            this.$forceUpdate()
          })
      }
      ,
      search()
      {
        console.log(this.activities)
        if(this.keyword=='')
        {
          this.axios.get(this.url + '/event/count')
            .then(response => {
              this.activityTotal=response.data.data

              console.log(response.data.data)
            })
          this.axios.get(this.url + '/event/query',{params:{pageNo:this.pageNo,pageSize:this.pageSize}})
            .then(response => {
              this.activities=response.data.data
              console.log(response.data.data)
              this.$forceUpdate()
            })

        }
        else
        {
          console.log(this.activities)
          this.axios.get(this.url + '/event/search',{params:{keyword:this.keyword}})
            .then(response => {
              if(response.data.data.length==0) {
                alert('没有搜索结果')
              }
              else
              {
                this.activities=response.data.data
                this.pageNo=1;
                this.activityTotal=1;
              }

              console.log(this.activities)
              this.$forceUpdate()
            })


        }
      },
      selectPage(current)
      {
        this.pageNo=current

        this.axios.get(this.url + '/event/query',{params:{pageNo:this.pageNo,pageSize:this.pageSize}})
          .then(response => {
            this.activities=response.data.data
            console.log(response.data.data)
            this.$forceUpdate()
          })

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


  .layout-card {
    column-span: 2;
    margin-left: 30px;
    margin-right: 10px;
    margin-top: 0px;
    margin-bottom: 30px;
  }

  .center {
    text-align: center;
  }

  .searchText {
    text-align: right;
  }

  .width {
    width: 230px;
    margin-right: 95px;
  }
  .CarouseItem{
   height: 400px;
  }
</style>
