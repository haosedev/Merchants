<template>
    <div style="padding-bottom:20px;">
        <group>
            <calendar v-model="dateSelect" title="选择日期" @on-change="dateChange" disable-future></calendar>
        </group>
        <card :header="{title:'我的收入'}">
            <div slot="content" class="box-flex box-content">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">￥
                        <countup :end-val="price0" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income cash">现金收入</div>
                </div>
                <div>
                    <div class="span">￥
                        <countup :end-val="price1" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income pos">POS机</div>
                </div>
            </div>
            <div slot="content" class="box-flex box-content top-hr">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">￥
                        <countup :end-val="price2" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income alipay">支付宝码</div>
                </div>
                <div>
                    <div class="span">￥
                        <countup :end-val="price3" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income wxpay">微信扫码</div>
                </div>
            </div>
        </card>
        <card v-for="(vo, index) in orderList" :key="vo.id" :header="{title: vo.times }" :footer="{title:'订单详情', link:'/Order/'+vo.sn }">
            <p slot="content" class="card-info">
                <span>单号：{{vo.sn}}</span>
                <br>
                <span>方式：
                    <span :class="vo.tp">{{vo.type_c}}</span>
                </span>
                <br>
                <span>金额：￥{{vo.total_fee}}</span>
            </p>
        </card>
    </div>
</template>

<script>
import {
    Calendar, Group, Card, Countup
} from 'vux'
export default {
    components: {
        Calendar, Group, Card, Countup,
    },
    name: 'home',
    methods: {
        dateChange() {
            console.log('改变日期：' + this.dateSelect);
            this.getList()
        },
        getList() {
            var param = this.$qs.stringify({
                start_time: this.dateSelect,
            })
            this.$http.post('http://mc.httpcenter.com/Vue/Sell/slist', param)
                .then(res => {
                    console.log(res);
                    var total = res.data.total;
                    var list = res.data.list;
                    //总额
                    if (total) {
                        this.price0 = parseFloat(total[0].price);
                        this.price1 = parseFloat(total[1].price);
                        this.price2 = parseFloat(total[2].price);
                        this.price3 = parseFloat(total[3].price);
                    } else {
                        this.price0 = 0;
                        this.price1 = 0;
                        this.price2 = 0;
                        this.price3 = 0;
                    }
                    //列表
                    this.orderList.splice(0, this.orderList.length);
                    if (list) {
                        this.orderList = list;
                        for (var i = 0; i < this.orderList.length; i++) {
                            this.orderList[i].tp = 'tp' + this.orderList[i].type;
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    data() {
        return {
            dateSelect: 'TODAY',    //默认是当前日期
            price0: 0,
            price1: 0,
            price2: 0,
            price3: 0,
            orderList: [{
                sn: '100000011111',
                type_c: '现金',
                total_fee: '10.00',
                times: '2017-6-21 16:55:20',
            }, {
                sn: '1000000111222',
                type_c: 'POS机',
                total_fee: '10.00',
                times: '2017-6-21 16:55:20',
            }, {
                sn: '100000011333',
                type_c: '支付宝',
                total_fee: '10.00',
                times: '2017-6-21 16:55:20',
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

.card-info {
    padding: 10px 20px;
    font-size: 14px;
}

.box-flex>div {
    flex: 1;
    text-align: center;
    font-size: 12px;
}

.box-flex .span {
    padding-top: 5px;
    color: #f74c31;
}

.income {
    font-size: 16px;
    padding-top: 5px;
}

.income.wxpay,
.tp3 {
    color: #0275d8;
}

.income.alipay,
.tp2 {
    color: #5cb85c;
}

.income.cash,
.tp0 {
    color: #f0ad4e;
}

.income.pos,
.tp1 {
    color: #5bc0de;
}
</style>