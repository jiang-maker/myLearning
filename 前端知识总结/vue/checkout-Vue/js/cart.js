/**
 * Created by yangt on 2017/4/4.
 */
new Vue({
    el:"#app", // 创建一个 el 对象
    data:{ // data 变量
        totalMoney: 0,
        productList: [],
        checkAllFlag:false,
        delFlag:false,
        carProduct:''
    },
    filters:{
        formatMoney: function (value) {
            return "¥" + value.toFixed(2); //后台返回两位小数，toFixed会四舍五入
        }
    },
    mounted: function () { // 加载页面后默认需要查询商品列表
        // mounted 替换了 1.0 的 ready , 但是通过使用 mounted 钩子，并不能保证该实例已经插入文档，还应该在钩子函数中包含 Vue.nextTick / vm.$nextTick
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods:{
        cartView: function () {
            let _this = this;
            this.$http.get("data/cart.json",{"id":123}).then(res=> { //promise 的结构，通过 then 方法来接收回调
                this.productList = res.body.result.productList;
                this.totalMoney = res.body.result.totalMoney;
            });
        },
        changeMoney: function (product,way) {
            if(way>0){
                product.productQuentity++;
            }else {
                product.productQuentity--;
                if(product.productQuentity<1){
                    product.productQuentity = 1;
                }
            }

            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if(typeof item.checked == 'undefined'){ /*判断对象是否存在*/
                // Vue.set(item,"checked",true);
                this.$set(item,"checked",true);
            }else {
                item.checked = !item.checked;
            }

            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked == 'undefined'){  /*判断属性是否存在*/
                    // Vue.set(item,"checked",true);
                    _this.$set(item,"checked",_this.checkAllFlag);
                }else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            /*在每次操作遍历之前要把总金额清零*/
            _this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
               if(item.checked){
                  /*判断如果商品被选中，对商品和数量的积进行累加*/
                   _this.totalMoney += item.productPrice*item.productQuentity;
               }
            });
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.carProduct = item;
        },
        delProduct:function () {
            var index = this.productList.indexOf(this.carProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
            // 实际项目开发中将商品 id 传到后台，通过后台来删除 this.$http
        }
    }
});

// 全局过滤器，可单独提取到 filter.js 里全局使用
Vue.filter("money", function (value,type) {
    return "¥" + value.toFixed(2) + type;
})