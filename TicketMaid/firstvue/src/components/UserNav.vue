<template>
  <div id="app">
  <div class="row">
    <Menu :theme="theme3" active-name="1" @on-select="onSelect" style="min-height: 750px;">
      <MenuGroup title="我的资料" >
        <MenuItem name="Mine">
          <Icon type="md-contact" />
          我的资料
        </MenuItem>
        <MenuItem name="Location">
          <Icon type="md-pin" />
          收货地址
        </MenuItem>
        <MenuItem name="MyFavorite">
          <Icon type="md-heart" />
          收藏的演出
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="订单管理">
        <MenuItem name="OrderList1">
          <Icon type="md-checkmark" />
          已支付订单
        </MenuItem>
        <MenuItem name="OrderList2">
          <Icon type="md-basket" />
          未支付订单
        </MenuItem>
      </MenuGroup>
    </Menu>
    <br>
    <router-view/>
  </div>
  </div>
</template>

<script>
    export default {
        name: "UserNav",
      data(){
        return{
          theme3: 'dark',

        }
      },
      methods: {
        onSelect(name) {
          this.$router.push('/UserNav/' + name);

        }
      }
    }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 0.1px;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
</style>
