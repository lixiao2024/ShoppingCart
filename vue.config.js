const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


// module.exports = {
//   devServe :{
//     before(app,serve){
//       app.get('/api/cartList',(req,res)=>{
//         res.json({
//           result:[
//             {id:1,title:"Vueʵս����",price:188,active:true,count:1},
//             {id:2,title:"Reactʵս����",price:288,active:true,count:1},
//           ]
//         })
//       })

//     }
//   }
// }
