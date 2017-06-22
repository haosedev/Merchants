<template>
    <div>
        <group title="订单总金额">
            <cell title="总数量" class="totalBk">
                <div slot="value">
                    <span>x {{totalnum}}</span>
                </div>
            </cell>
            <cell title="总价格" class="totalBk">
                <div slot="value">
                    <span style="color: red;font-weight:bold;">￥{{totalmoney}}</span>
                </div>
            </cell>
        </group>
        <div style="padding-bottom:20px;">
            <group v-for="(vo, index) in dCartList" :key="vo.id">
                <cell :title="vo.name" class="goods_name_bk"></cell>
                <cell title="单价" :value="vo.price" :inline-desc="vo.mprice" class="goods_bk"></cell>
                <cell title="数量" :value="vo.num" class="goods_bk"></cell>
                <cell title="合计" :value="vo.total" class="goods_total_bk"></cell>
            </group>
        </div>
    </div>
</template>

<script>
import {
    Divider, Group, Cell, Card
} from 'vux'
export default {
    components: {
        Divider, Group, Cell, Card,
    },
    name: 'home',
    methods: {
        getSN() {
            return $route.params.sn;
        }
    },
    computed: {
        dCartList() {
            //**既然无法再列表中直接植入，只能处理数组了
            if (this.cartList.length > 0) {
                this.hasGoods = true;
            } else {
                this.hasGoods = false;
            }
            var temp = [];
            this.totalmoney = 0;
            this.totalnum = 0;
            for (var i = 0; i < this.cartList.length; i++) {
                this.totalmoney += parseFloat(this.cartList[i].total);
                this.totalnum += parseFloat(this.cartList[i].num);
                var id = i + 1;
                var tmp = {};
                tmp.id = i;
                tmp.name = id + '.' + this.cartList[i].name;
                tmp.num = this.cartList[i].num;
                tmp.total = '￥' + this.cartList[i].total;
                tmp.price = '￥' + this.cartList[i].price;
                tmp.mprice = '原价 ￥' + this.cartList[i].mprice + '  折扣：' + this.cartList[i].zhekou;
                temp.push(tmp);
            }
            if (this.moling) {
                this.totalmoney = parseInt(this.totalmoney);
            }
            return temp;
        }
    },
    data() {
        return {
            totalnum: 0,
            totalmoney: 0,
            nc_totalmoney: 0,
            cartList: [{
                name: '商品1号',
                price: '10.00',
                mprice: '15.00',
                num: 1,
                zhekou: 10,
                total: '10.00',
            }, {
                name: '商品3号',
                price: '1.00',
                mprice: '2.00',
                num: 1,
                zhekou: 10,
                total: '1.00',
            }, {
                name: '商品2号',
                price: '8.50',
                mprice: '10.00',
                num: 1,
                zhekou: 10,
                total: '8.50',
            }],
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.box-flex {
    display: flex;
}

.box-content {
    padding: 15px 0;
}

.top-hr {
    border-top: 1px solid #E5E5E5;
}

.card-padding {
    padding: 20px;
}

.totalBk {
    background-color: #FFEADD;
}

.goods_name_bk {
    background-color: #EFF598;
}

.goods_bk {
    background-color: #F8FBD2;
}

.goods_total_bk {
    background-color: #DEFFCA;
}
</style>