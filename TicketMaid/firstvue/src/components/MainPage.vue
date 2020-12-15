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
        <div v-for="value in 10">
          <Col span="5" class="layout-card" >
            <Card :bordered="true">
              <p slot="title">Borderless card</p>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </Card>
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
        message: "aaa"
      }
    },
    methods: {
      test() {
        this.message = "bbb";
      }
    }
  }


</script>

<style scoped>

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
