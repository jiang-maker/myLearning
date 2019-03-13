/**
 * Created by yangt on 2017/4/5.
 */
new Vue({
    el:'.container',
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if(res.status == "1"){
                    _this.addressList = res.result;
                }
            });
        },
        loadMore: function () {
            if(this.limitNum == 3){
                this.limitNum=this.addressList.length;
            }else {
                this.limitNum = 3;
            }
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault = true;
                }else {
                    address.isDefault = false;
                }
            })
        }
    }
});