<template>
    <div>
        <Group :title="eCartName">
            <Cell title="名称" :value="info.name"></Cell>
            <Cell title="条码" :value="info.bc"></Cell>
            <Cell title="货号" :value="info.pn"></Cell>
            <Cell title="单价">
                <div slot="value">￥{{info.mprice}}</div>
            </Cell>
            <x-number title="数量" v-model="info.num" :min='1' @on-change="num_change"></x-number>
            <x-number title="折扣" v-model="zhekou" :min='1' :max='10' width='80px' :step='0.1' @on-change="zhekou_change" class="zhekou_bk"></x-number>
            <Cell title="总计" class="goods_total_bk">
                <div slot="value">
                    <span style="color: red;font-weight:bold;">￥<countup :end-val="info.total_price" :duration="2" :decimals="2" class="demo1"></countup></span>
                </div>
            </Cell>
        </Group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="setGoods()">放入购物车</x-button>
            <x-button type="warn" link="BACK">放弃并返回</x-button>
        </box>
    </div>
</template>

<script>
    import {
        Countup,
        XNumber,
        Group,
        Cell,
        XButton,
        Box
    } from 'vux'
    export default {
        components: {
            Countup,
            XNumber,
            Group,
            Cell,
            XButton,
            Box,
        },
        name: 'ecart',
        mounted() {
            //var id = this.$route.params.id;
            var id = this.$route.query.id;
            //var pn = this.$route.params.searchData;
            var pn = this.$route.query.searchData;
            if (id > 0) {
                //console.log('i have id' + id);
                this.option = 'edit';
                this.getGoodsId(id);
            } else {
                this.option = 'add';
                this.getGoodsPn(pn);
            }
        },
        methods: {
            zhekou_change(val) {
                console.log('折扣改变：' + val + '折');
                //console.log('dd:' + this.zhekou);
                this.totalprice();
            },
            num_change(val) {
                this.totalprice();
            },
            set_info(info) {
                if (info) {
                    info.mprice = parseFloat(info.mprice);
                    info.mprice.toFixed(2);
                    info.price = parseFloat(info.price);
                    info.price.toFixed(2);
                    if (info.num > 0)
                        info.num = parseInt(info.num);
                    else
                        info.num = 1;
                    //根据原价直接算出折扣
                    this.zhekou = info.price / info.mprice * 10;
                    this.zhekou = this.zhekou.toFixed(1);
                    this.zhekou = parseFloat(this.zhekou);  //转成真实的数值，也许toFixed
                    //console.log('折扣：' + zhekou);
                    info.total_price = info.price * info.num;
                    this.info = info;
                } else {
                    this.info = this.info_bak;
                }
            },
            getGoodsPn(pn) {
                //进入时，用get获取，为了兼容老版本
                var self = this;
                this.$http.get('http://mc.httpcenter.com/Vue/Sell/add/name/' + pn)
                    .then(res => {
                        console.log(res);
                        var info = res.data.info;
                        //列表
                        this.set_info(info);
                        if (res.data.status == 0) {
                            this.$vux.alert.show({
                                title: '提示',
                                content: res.data.msg,
                                onShow() {
                                    console.log('Plugin: I\'m showing')
                                },
                                onHide() {
                                    console.log('Plugin: I\'m hiding now')
                                    //跳转到订单页面，带着订单id;
                                    self.$router.back();
                                }
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getGoodsId(id) {
                //进入时，用get获取，为了兼容老版本
                this.$http.get('http://mc.httpcenter.com/Vue/Sell/edit/id/' + id)
                    .then(res => {
                        //console.log(res);
                        var info = res.data.info;
                        //列表
                        this.set_info(info);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            setGoods() {
                //添加商品
                //进入时，用get获取，为了兼容老版本
                console.log('数量:' + this.info.num);
                var param = this.$qs.stringify({
                    id: this.info.id,
                    num: this.info.num,
                    price: this.info.price.toFixed(2),  //防止出现太多小数点
                })
                this.$http.post('http://mc.httpcenter.com/Vue/Sell/' + this.option + '/', param)
                    .then(res => {
                        console.log(res);
                        this.$router.back();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            totalprice() {
                this.info.price = this.info.mprice * this.zhekou / 10;
                this.info.total_price = this.info.price * this.info.num;
            },
        },
        computed: {
            eCartName() {
                if (this.option == 'edit')
                    return '编辑购物车商品';
                else
                    return '添加商品到购物车'; //编辑购物车商品
            }
        },
        data() {
            return {
                info_bak: { name: '无商品', pn: '00', bc: '0000', price: 0.0, num: 0, mprice: 0.0, total_price: 0 },
                info: { name: 'xxx', pn: '00', bc: '0000', price: 0.0, num: 1, mprice: 0.0, total_price: 0 },
                zhekou: 10,
                option: 'add',
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '~vux/src/styles/1px.less';
    .goods_total_bk {
        background-color: #DEFFCA;
    }

    .zhekou_bk {
        background-color: #FFA4A4;
    }
</style>