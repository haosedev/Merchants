<template>
    <div>
        <search :results="results" v-model="qrout" :auto-fixed="false" top="46px" @on-focus="onFocus" @on-change='searchChange'
            @on-cancel="onCancel" ref="search"></search>

        <div style="padding:5px;">
            <flexbox>
                <flexbox-item>
                    <div class="btn" @click="add">
                        <div class="icon-tianjia2 icon"></div>
                        <div class="lab">添加</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn" @click="scan">
                        <div class="icon-tiaoma icon"></div>
                        <div class="lab">扫码</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn" @click="clear">
                        <div class="icon-shanchu icon"></div>
                        <div class="lab">清空</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="hasCarts" v-show="hasGoods">
            <swipeout>
                <swipeout-item transition-mode="follow" v-for="(vo, index) in dCartList" :key="vo.xid">
                    <div slot="right-menu">
                        <swipeout-button @click.native="edit(index, vo.xid)" type="primary">编辑</swipeout-button>
                        <swipeout-button @click.native="del(index, vo.xid)" type="warn">删除</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <group>
                            <cell :title="vo.name" class="goods_name_bk"></cell>
                            <cell title="单价" :value="vo.price" class="goods_bk"><span slot="inline-desc" v-html="vo.price_text">{{vo.mprice_text}}</span></cell>
                            <cell title="数量" :value="vo.num" class="goods_bk"></cell>
                            <cell title="合计" :value="vo.total_price" class="goods_total_bk"></cell>
                        </group>
                    </div>
                </swipeout-item>
            </swipeout>
            <!--这里是购物车商品列表，需要有 编辑，和删除 按钮，要求样式简洁美观 商品名称，原价，单价，数量，总计-->

            <group title="结算">
                <x-switch title="抹零" v-model="moling"></x-switch>
                <cell title="总数量" class="totalBk">
                    <div slot="value">
                        <span>x {{totalnum}}</span>
                    </div>
                </cell>
                <cell title="总价格" class="totalBk">
                    <div slot="value">
                        <span style="color: red;font-weight:bold;">￥<countup :end-val="totalmoney" :duration="2" :decimals="2" class="demo1"></countup></span>

                    </div>
                </cell>
            </group>
            <div class="btn-group">
                <flexbox>
                    <flexbox-item>
                        <div class="btn" @click="orderBtn(0)">
                            <div class="lab">现金</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn" @click="orderBtn(1)">
                            <div class="lab">刷卡</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn" @click="orderBtn(2)">
                            <div class="lab">支付宝</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn" @click="orderBtn(3)">
                            <div class="lab">微信</div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="" v-show="!hasGoods">
            <br/>
            <br/>
            <load-more :show-loading="false" tip="购物车为空" background-color="#fbf9fe"></load-more>
        </div>
    </div>
</template>

<script>
    import store from '@/vuex/store'
    import {
        LoadMore,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        Search,
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        XSwitch,
        Countup
    } from 'vux'
    export default {
        components: {
            LoadMore,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
            Search,
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            XSwitch,
            Countup,
        },
        name: 'cart',
        mounted() {
            //console.log('执行');
            this.getCart();
            store.commit('updateQrtext', { qrtext: '' });
        },
        methods: {
            scan() {
                console.log('SCAN');
                window.HaosedevFunction.QrScan("cardwinner");
            },
            clear() {
                //console.log("CLEAR");
                var self = this;
                this.$vux.confirm.show({
                    title: '警告',
                    content: '确定要清空购物车吗？',
                    onShow() {
                        console.log('plugin show')
                    },
                    onHide() {
                        console.log('plugin hide')
                    },
                    onCancel() {
                        console.log('plugin cancel')
                    },
                    onConfirm() {
                        console.log('plugin confirm')
                        self.clearCart();
                    }
                })
            },
            add() {
                //**根据搜索内容进行 **带个参数
                if (this.searchData != '') {
                    //console.log('ADD:' + this.searchData);
                    this.$router.push({ path: '/eCart', query: { searchData: this.searchData, id: 0 } });
                    //this.$router.push({ name: '商品操作', params: { searchData: this.searchData, id: 0 } });
                } else {
                    this.$vux.toast.show({
                        type: 'warn',
                        position: 'middle',
                        width: '240px',
                        time: 3000,
                        text: '添加商品时，需要在搜索框内输入【条码】或【货号】'
                    })
                }
            },
            edit(index, id) {
                //**根据点击id进行edit
                var gid = this.cartList[id].gid;
                this.$router.push({ path: '/eCart', query: { searchData: 0, id: gid } });
                //this.$router.push({ name: '商品操作', params: { searchData: this.searchData, id: gid } });
            },
            del(index, id) {
                //console.log('DEL:' + id);
                var name = this.cartList[id].name;
                var gid = this.cartList[id].gid;
                var self = this;
                this.$vux.confirm.show({
                    title: '提示',
                    content: '移除【' + name + '】商品吗？？',
                    onShow() {
                        console.log('plugin show')
                    },
                    onHide() {
                        console.log('plugin hide')
                    },
                    onCancel() {
                        console.log('plugin cancel')
                    },
                    onConfirm() {
                        console.log('plugin confirm')
                        self.delGoods(gid);
                    }
                })
            },
            delGoods(gid) {
                this.$http.get('http://mc.httpcenter.com/Vue/Sell/del/id/' + gid)
                    .then(res => {
                        console.log(res);
                        this.getCart();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            searchChange(val) {
                this.searchData = val;
            },
            setFocus() {
                this.$refs.search.setFocus()
            },
            resultClick(item) {
                //window.alert('you click the result item: ' + JSON.stringify(item))
            },
            onSubmit() {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus() {
                console.log('on focus')
            },
            onCancel() {
                console.log('on cancel')
            },
            onButtonClick(type, index, key) {
                //console.log(index + "=");
                //console.log(key);
            },
            getCart() {
                // var param = this.$qs.stringify({
                //     hahaha: 'aa',
                // })
                var param = {};
                this.$http.post('http://mc.httpcenter.com/Vue/Sell/start')
                    .then(res => {
                        //console.log(res);
                        var total = res.data.total;
                        var list = res.data.list;
                        //列表
                        this.cartList.splice(0, this.cartList.length);
                        var num = 0;
                        if (list) {
                            this.cartList = list;
                            for (var i = 0; i < this.cartList.length; i++) {
                                num++;
                                var zhekou = this.cartList[i].price / this.cartList[i].mprice * 10;
                                this.cartList[i].zhekou = zhekou.toFixed(1);
                            }
                        }
                        if (num > 0) {
                            store.commit('updateCartnum', { cartnum: num.toString() });
                        } else {
                            store.commit('updateCartnum', { cartnum: "" });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            orderBtn(tp) {
                //**需要确认
                var tpc = '现金';
                if (tp == 1) tpc = '刷卡';
                else if (tp == 2) tpc = '支付宝';
                else if (tp == 3) tpc = '微信';
                var self = this;
                this.$vux.confirm.show({
                    title: '提示',
                    content: '确定要以【' + tpc + '】方式结算订单吗？？',
                    onShow() {
                        console.log('plugin show')
                    },
                    onHide() {
                        console.log('plugin hide')
                    },
                    onCancel() {
                        console.log('plugin cancel')
                    },
                    onConfirm() {
                        console.log('plugin confirm')
                        self.makeOrder(tp);
                    }
                })
            },
            makeOrder(tp) {
                var mo = 0;
                if (this.moling) mo = 1;
                var param = this.$qs.stringify({
                    type: tp, moling: mo,
                })
                var self = this;
                this.$http.post('http://mc.httpcenter.com/Vue/Sell/order_do', param)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$vux.alert.show({
                                title: '提示',
                                content: '订单提交成功！',
                                onShow() {
                                    console.log('Plugin: I\'m showing')
                                },
                                onHide() {
                                    console.log('Plugin: I\'m hiding now')
                                    //跳转到订单页面，带着订单id;
                                    //下单成功也清除数字
                                    store.commit('updateCartnum', { cartnum: "" });
                                    self.$router.push({ path: '/Order/' + res.data.order_id });
                                }
                            })
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: '订单提交失败！',
                                onShow() {
                                    console.log('Plugin: I\'m showing')
                                },
                                onHide() {
                                    //console.log("type返回:" + res.data.type);
                                    //console.log("抹零返回:" + res.data.moling);

                                    console.log('Plugin: I\'m hiding now')
                                    self.getCart();
                                }
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clearCart() {
                this.$http.post('http://mc.httpcenter.com/Vue/Sell/remove')
                    .then(res => {
                        //console.log(res);
                        //列表
                        if (res.data.status == 1) {
                            //console.log(res.data.info);
                            this.cartList.splice(0, this.cartList.length);
                            //清空购物车数字
                            store.commit('updateCartnum', { cartnum: "" });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        computed: {
            qrout() {
                var aa = this.$store.state.qrtext;
                return aa;
            },
            dCartList() {
                //处理数组
                if (this.cartList.length > 0) {
                    this.hasGoods = true;
                } else {
                    this.hasGoods = false;
                }
                var temp = [];
                var tmp = {};
                this.totalmoney = 0;
                this.totalnum = 0;
                for (var i = 0; i < this.cartList.length; i++) {
                    this.totalmoney += parseFloat(this.cartList[i].total_price);
                    this.totalnum += parseFloat(this.cartList[i].num);
                    var xid = i + 1;
                    var tmp = {};
                    tmp.xid = i;
                    tmp.name = xid + '.' + this.cartList[i].name;
                    tmp.num = this.cartList[i].num;
                    tmp.total_price = '￥' + this.cartList[i].total_price;
                    tmp.price = '￥' + this.cartList[i].price;
                    tmp.price_text = '原价 <s>￥' + this.cartList[i].mprice + '</s>  折扣：' + this.cartList[i].zhekou;
                    temp.push(tmp);
                }
                if (this.moling) {
                    this.totalmoney = parseInt(this.totalmoney);
                }
                return temp;
            },

        },
        data() {
            return {
                hasGoods: false,
                searchData: '',
                result: [],
                moling: false,
                totalnum: 0,
                totalmoney: 0,
                nc_totalmoney: 0,
                cartList: [{
                    name: '无商品',
                    price: 10.00,
                    mprice: 15.00,
                    num: 1,
                    zhekou: 10,
                    total_price: 10.00,
                },],
                showContent004: false,
            }
        }
    }
    function getResult(val) {
        let rs = []
        for (let i = 0; i < 20; i++) {
            rs.push({
                title: `${val} result: ${i + 1} `,
                other: i
            })
        }
        return rs
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '~vux/src/styles/1px.less';
    .btn {
        text-align: center;
        background-color: #4BAAFB;
        padding: 5px 0;
        border-radius: 10px;
    }

    .btn .icon {
        font-size: 24px;
        height: 32px;
        color: #FFF;
    }

    .btn .lab {
        font-size: 12px;
        color: #FFF;
    }

    .btn-group {
        padding: 20px 5px 20px 5px;
        background-color: #FFDBA5;
    }

    .totalBk {
        background-color: #FFDBA5;
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

    .important_warn {
        background-color: #D84949;
        color: #FFF;
    }
</style>