<template>
    <div>
        <tab>
            <tab-item selected @on-item-click="tabChange">今日</tab-item>
            <tab-item @on-item-click="tabChange" :disabled="!canChangeDate">历史记录</tab-item>
        </tab>
        <group v-show="!dateShow">
            <cell title="当前日期" :value="dateSelect"></cell>
        </group>
        <group v-show="dateShow">
            <calendar v-model="dateSelect" title="选择日期" @on-change="dateChange" disable-future></calendar>
        </group>
        <card :header="{title:'我的销售'}">
            <div slot="content" class="box-flex box-content">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">
                        <countup :end-val="info.order_num_ok" :duration="2" :decimals="0" class="demo1"></countup>
                    </div>
                    <div class="income">订单数量</div>
                </div>
                <div>
                    <div class="span">
                        ￥
                        <countup :end-val="info.total_fee" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income">总收入</div>
                </div>
            </div>
            <div slot="content" class="box-flex box-content top-hr">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">
                        <countup :end-val="info.sell_num" :duration="2" :decimals="0" class="demo1"></countup>
                    </div>
                    <div class="income">销售数量</div>
                </div>
                <div>
                    <div class="span">
                        <countup :end-val="info.ref_num" :duration="2" :decimals="0" class="demo1"></countup>
                    </div>
                    <div class="income">退货数量</div>
                </div>
            </div>
        </card>
        <card :header="{title:'我的收入'}">
            <div slot="content" class="box-flex box-content">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">
                        ￥
                        <countup :end-val="info.card_money" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income pos">POS机</div>
                </div>
                <div>
                    <div class="span">
                        ￥
                        <countup :end-val="info.now_money" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income cash">现金收入</div>
                </div>
            </div>
            <div slot="content" class="box-flex box-content top-hr">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">
                        ￥
                        <countup :end-val="info.alipay_money" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income alipay">支付宝码</div>
                </div>
                <div>
                    <div class="span">
                        ￥
                        <countup :end-val="info.wx_money" :duration="2" :decimals="2" class="demo1"></countup>
                    </div>
                    <div class="income wxpay">微信扫码</div>
                </div>
            </div>
        </card>
        <card>
            <div slot="content" class="card-padding">
                <p style="color:#999;font-size:12px;">
                    软件版本：{{version}}
                    <br/> 技术支持：温州仟胜信息科技有限公司
                </p>
            </div>
        </card>
    </div>
</template>

<script>
    import store from '@/vuex/store'
    import {
        Calendar, Group, Cell, Card, Divider, Tab, TabItem, Countup
    } from 'vux'
    export default {
        components: {
            Calendar, Group, Cell, Card, Divider, Tab, TabItem, Countup,
        },
        name: 'home',
        methods: {
            tabChange(index) {
                if (index === 0) {
                    this.dateShow = false;
                    this.dateSelect = "TODAY";
                } else {
                    this.dateShow = true;
                }
            },
            dateChange() {
                console.log('改变日期：' + this.dateSelect);
                this.getInfo();
            },
            getInfo() {
                var param = this.$qs.stringify({
                    start_time: this.dateSelect,
                })
                this.$http.post('http://mc.httpcenter.com/Vue/Sell/index', param)
                    .then(res => {
                        //console.log(res);
                        var info = res.data.info;
                        var num = parseInt(res.data.cart);
                        if (num > 0) {
                            //console.log('have cart num');
                            store.commit('updateCartnum', { cartnum: num.toString() });
                        }
                        //总额
                        if (info) {
                            this.info = info;
                        } else {
                            this.info = this.info_bak;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        data() {
            return {
                info_bak: { 'order_num_ok': 0, 'sell_num': 0, 'ref_num': 0, 'card_money': 0, 'alipay_money': 0, 'wx_money': 0, 'now_money': 0, 'total_fee': 0, },
                info: { 'order_num_ok': 0, 'sell_num': 0, 'ref_num': 0, 'card_money': 0, 'alipay_money': 0, 'wx_money': 0, 'now_money': 0, 'total_fee': 0, },
                canChangeDate: true,   //可以改变日期，属于权限系统
                dateShow: false,        //切换后的日期选择框
                dateSelect: 'TODAY',    //默认是当前日期
                //
                version: '0.8.99',
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