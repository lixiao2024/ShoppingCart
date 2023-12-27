<template>
    <div>
       <h2>{{ title }}</h2>
       <table border='1'>
        <tr>
            <th>#</th>
            <th>课程</th>
            <th>单价</th>
            <th>数量</th>
            <th>总价</th>
        </tr>
        <tr v-for="(c,index) in cart" :key='c.id'>
            <td>
                <input type="checkbox" v-model="c.active">
            </td>
            <td>{{c.title}}</td>
            <td>{{c.price}}</td>
            <td>
                <button @click="substract(index)">-</button>
                {{c.count}}
                <button @click="add(index)">+</button>
            </td>
              ￥{{ c.price*c.count }} 
            <td>

            </td>
        </tr> 
         <tr>
            <td></td>
            <td colspan="2">{{activeCount}}/{{count}}</td>
            <td colspan="2">￥{{ total }}</td>
         </tr>
       </table>
    </div>
</template>

<script>
    export default {
        name:"ShoppingCart",
        props:['title'],
        // data: function () {
        //     return {
        //     localcart: this.cart
        //   }
        // },
        data(){
            return {
                cart: JSON.parse(localStorage.getItem('cart')) || []
            }
        }, 
        watch:{
              //解决刷新页面后购物车数据消失的问题
              cart:{
                handler(n,o){
                    //console.log(n);
                      this.setLocalData(n);
                },
                deep:true
              }
              
        },
        created(){
             this.$bus.$on("addCart",good =>{
                const ret = this.cart.find(v=>v.id === good.id);
                console.log(ret);
                if(!ret){
                    //购物车没有数据
                    this.cart.push(good);

                }else{
                    //购物车已有数据
                    ret.count+=1;
                }
             })
        },
        // methods: {
        //     remove(i){
        //        if(window.confirm('确定是否要删除？')){
        //          this.localcart.splice(i,1);
        //        }
        //     },
        //     substract(i){
        //         let count = this.localcart[i].count;
        //         count > 1 ? this.localcart[i].count -= 1 : this.remove(i);
        //     },
        //     add(i){
        //         this.localcart[i].count++;
        //     }
        // },
        methods: {
            setLocalData(n){
                   localStorage.setItem('cart',JSON.stringify(n));
            },
            remove(i){
               if(window.confirm('确定是否要删除？')){
                 this.cart.splice(i,1);
               }
            },
            substract(i){
                let count = this.cart[i].count;
                count > 1 ? this.cart[i].count -= 1 : this.remove(i);
            },
            add(i){
                this.cart[i].count++;
            }
        },
        computed:{
            // 使用计算属性处理 cart 的修改
            
            count(){
                return this.cart.length
            },
            activeCount(){
                return this.cart.filter(v=>v.active).length
            },
            total(){
                // let sum = 0;
                // this.cart.forEach(c=>{
                //     if(c.active){
                //         sum+=c.price*c.count;

                //     }
                // });
                // return sum;
                return this.cart.reduce((sum,c)=>{
                      if(c.active){
                        sum+=c.price*c.count;
                      }
                      return sum;
                },0)
            }
          
        }
    };
</script>

<style  scoped>

</style>