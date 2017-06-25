<template>
    <div>
        <group :title="订单详情">
            <cell title="状态" class="totalBk">
                <div slot="value">
                    <span>{{info.status_c}}</span>
                </div>
            </cell>
            <cell title="订单号" class="totalBk">
                <div slot="value">
                    <span>{{info.sn}}</span>
                </div>
            </cell>
            <cell title="总数量" class="totalBk">
                <div slot="value">
                    <span>x {{info.num}}</span>
                </div>
            </cell>
            <cell title="付款方式" class="totalBk">
                <div slot="value">
                    <span>{{info.type_c}}</span>
                </div>
            </cell>
            <cell title="总金额" class="totalBk">
                <div slot="value">
                    <span style="color: red;font-weight:bold;">￥{{info.total_fee}}</span>
                </div>
            </cell>
            <cell title="下单时间" class="totalBk">
                <div slot="value">
                    <span>{{info.ctime}}</span>
                </div>
            </cell>
            <cell title="修改时间" class="totalBk">
                <div slot="value">
                    <span>{{info.utime}}</span>
                </div>
            </cell>
        </group>
        <div style="padding-bottom:20px;">
            <group v-for="(vo, index) in dCartList" :key="vo.id">
                <cell :title="vo.name" class="goods_name_bk"></cell>
                <cell title="单价" :value="vo.price" class="goods_bk"><span slot="inline-desc" v-html="vo.price_text">{{vo.mprice_text}}</span></cell>
                <cell title="数量" :value="vo.num" class="goods_bk"></cell>
                <cell title="合计" :value="vo.total_price" class="goods_total_bk"></cell>
            </group>
        </div>
    </div>
</template>

<script>
    import {
        Divider, Group, Cell, Card, dateFormat
    } from 'vux'
    export default {
        components: {
            Divider, Group, Cell, Card,
        },
        name: 'home',
        mounted() {
            this.getList(this.$route.params.id);
        },
        methods: {
            getList(xid) {
                var param = this.$qs.stringify({
                    id: xid,
                })
                this.$http.post('http://mc.httpcenter.com/Vue/Sell/info', param)
                    .then(res => {
                        console.log(res);
                        var status = res.data.status;
                        this.msg = res.data.msg;
                        this.qrurl = res.data.qrurl;
                        var info = res.data.info;
                        var og = res.data.og;
                        if (status == 0) {
                            //**无此订单，直接打开失败，弹框，然后返回

                        }
                        //总额
                        if (info) {
                            info.total_fee = parseFloat(info.total_fee);
                            info.num = 0;
                            if (info.status == 1)
                                info.status_c = '正常';
                            else
                                info.status_c = '作废';
                            this.info = info;
                        } else {
                            this.info = this.info_bak;
                        }
                        //列表
                        this.orderGoods.splice(0, this.orderGoods.length);
                        if (og) {
                            this.orderGoods = og;
                            for (var i = 0; i < this.orderGoods.length; i++) {
                                this.orderGoods[i].tp = 'tp' + this.orderGoods[i].type;
                                this.info.num = this.info.num + parseInt(this.orderGoods[i].num);
                                var zhekou = this.orderGoods[i].price / this.orderGoods[i].mprice * 10;
                                this.orderGoods[i].zhekou = zhekou.toFixed(1);
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        computed: {
            dCartList() {
                //**既然无法再列表中直接植入，只能处理数组了
                // if (this.cartList.length > 0) {
                //     this.hasGoods = true;
                // } else {
                //     this.hasGoods = false;
                // }
                var temp = [];
                var tmp = {};
                for (var i = 0; i < this.orderGoods.length; i++) {
                    tmp = this.orderGoods[i];
                    tmp.price_text = '原价 <s>￥' + this.orderGoods[i].mprice + '</s>  折扣：' + this.orderGoods[i].zhekou;
                    temp.push(tmp);
                }
                return temp;
            }
        },
        data() {
            return {
                qrurl: '',
                msg: '',
                info_bak: { "id": "0", "sn": "000000", "total_fee": "000.00", "type": "0", "create_time": "0", "update_time": "0", "status": "0" },
                info: { "id": "0", "sn": "000000", "total_fee": "000.00", "type": "0", "create_time": "0", "update_time": "0", "status": "0" },
                orderGoods: [{
                    name: '无商品',
                    price: 0.00,
                    mprice: 5.00,
                    num: 1,
                    zhekou: 10,
                    total: 10.00,
                },],
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