<template>
    <div style="padding-bottom:20px;">
        <group>
            <calendar v-model="dateSelect" title="选择日期" @on-change="dateChange" disable-future></calendar>
        </group>
        <card :header="{title:'我的收入'}">
            <div slot="content" class="box-flex box-content">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">￥0.00</div>
                    <div class="income pos">POS机</div>
                </div>
                <div>
                    <div class="span">￥0.00</div>
                    <div class="income cash">现金收入</div>
                </div>
            </div>
            <div slot="content" class="box-flex box-content top-hr">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">￥0.00</div>
                    <div class="income alipay">支付宝码</div>
                </div>
                <div>
                    <div class="span">￥0.00</div>
                    <div class="income wxpay">微信扫码</div>
                </div>
            </div>
        </card>
        <card v-for="(vo, index) in orderList" :key="vo.id" :header="{title: vo.times }" :footer="{title:'订单详情', link:'/Order/'+vo.sn }">
            <p slot="content" class="card-info">
                <span>单号：{{vo.sn}}</span><br/>
                <span>方式：{{vo.type}}</span><br/>
                <span>金额：￥{{vo.money}}</span>
            </p>
        </card>
    </div>
</template>

<script>
    import {
        Calendar, Group, Cell, Card, Divider, Tab, TabItem
    } from 'vux'
    export default {
        components: {
            Calendar, Group, Cell, Card, Divider, Tab, TabItem,
        },
        name: 'home',
        methods: {
            dateChange() {
                console.log('改变日期：' + this.dateSelect);
            },
        },
        data() {
            return {
                dateSelect: 'TODAY',    //默认是当前日期
                orderList: [{
                    sn: '100000011111',
                    type: '现金',
                    money: '10.00',
                    times: '2017-6-21 16:55:20',
                }, {
                    sn: '1000000111222',
                    type: 'POS机',
                    money: '10.00',
                    times: '2017-6-21 16:55:20',
                }, {
                    sn: '100000011333',
                    type: '支付宝',
                    money: '10.00',
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

    .income.wxpay {
        color: #0275d8;
    }

    .income.alipay {
        color: #5cb85c;
    }

    .income.cash {
        color: #f0ad4e;
    }

    .income.pos {
        color: #5bc0de;
    }
</style>