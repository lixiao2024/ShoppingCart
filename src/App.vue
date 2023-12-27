<template>
  <div id="app">
    <img src="./assets/logo.png" alt="Vue logo">
  <h1>{{ title }}</h1>
  <!-- 展示购物车的列表 -->
<ul>
  <li v-for='(item ,index) in cartList' :key="item.id">
       <h2>{{item.title}}</h2>
       <p>￥{{item.price}}</p>
       <button @click="addCart(index)">加入购物车</button>
  </li>
</ul>
 <my-cart  :title = 'title'></my-cart>
  </div>
</template>

<script>
import MyCart from './components/ShoppingCart';
import axios from 'axios';
//Mock
export default{
  name: "app",
  methods:{
    addCart(i){
      const good = this.cartList[i];
      this.$bus.$emit('addCart',good);
    }
  },
  data() {
    return{
      
      cartList:[
        {id:1,title:"Vue实战开发",price:188,active:true,count:1},
        {id:2,title:"React实战开发",price:288,active:true,count:1},
      ],
      title:"购物车"
    };
  },
   
  // async created() {
  //   try {
  //     const res = await this.$http.get("/api/cartList");
  //     this.cartList=res.data.result;
  //   } catch (error) {
  //     console.log(error);
  //   }

  // },

  components:{
    MyCart
  },
 

   
 
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
