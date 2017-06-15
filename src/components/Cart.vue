<template>
    <div>
        <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="searchData" auto-scroll-to-top top="46px"
            position="absolute" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
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
                <swipeout-item transition-mode="follow" v-for="(vo, index) in dCartList" :key="vo.id">
                    <div slot="right-menu">
                        <swipeout-button @click.native="edit(index, vo.id)" type="primary">编辑</swipeout-button>
                        <swipeout-button @click.native="del(index, vo.id)" type="warn">删除</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <group>
                            <cell :title="vo.name" class="goods_name_bk"></cell>
                            <cell title="单价" :value="vo.price" :inline-desc="vo.mprice" class="goods_bk"></cell>
                            <cell title="数量" :value="vo.num" class="goods_bk"></cell>
                            <cell title="合计" :value="vo.total" class="goods_total_bk"></cell>
                        </group>
                    </div>
                </swipeout-item>
            </swipeout>
            <!--这里是购物车商品列表，需要有 编辑，和删除 按钮，要求样式简洁美观 商品名称，原价，单价，数量，总计-->

            <group title="结算">
                <cell title="总数量" class="totalBk">
                    <div slot="value">
                        <span>x {{totalnum}}</span>
                    </div>
                </cell>
                <cell title="总价格" class="totalBk">
                    <div slot="value">
                        <span style="color: red">￥{{totalmoney}}</span>
                    </div>
                </cell>
            </group>
            <div class="btn-group">
                <flexbox>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">现金</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">刷卡</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">支付宝</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn">
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
        Divider,
        numberComma

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
            Divider,
        },
        name: 'cart',
        methods: {
            scan() {
                console.log('SCAN');
                this.searchData = "scan";
            },
            clear() {
                console.log("CLEAR");
            },
            add() {
                console.log('ADD');
            },
            edit(index, id) {
                console.log('EDIT' + id);
            },
            del(index, id) {
                console.log('DEL:' + id);
                this.cartList.splice(index, 1);
            },
            setFocus() {
                this.$refs.search.setFocus()
            },
            resultClick(item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult(val) {
                this.results = val ? getResult(this.value) : []
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
                console.log(index + "=");
                console.log(key);
            },
        },
        computed: {
            dCartList() {
                //**既然无法再列表中直接植入，只能处理数组了
                if (this.cartList.length > 0) {
                    this.hasGoods = true;
                } else {
                    this.hasGoods = false;
                }
                var temp=[];
                this.totalmoney = 0;
                this.totalnum = 0;
                for (var i = 0; i < this.cartList.length; i++) {
                    this.totalmoney += parseFloat(this.cartList[i].total);
                    this.totalnum += parseFloat(this.cartList[i].num);
                    var id = i + 1;
                    var tmp={};
                    tmp.id = i;
                    tmp.name = id + '.' + this.cartList[i].name;
                    tmp.total = '￥' + this.cartList[i].total;
                    tmp.price = '￥' + this.cartList[i].price;
                    tmp.mprice = '原价 ￥' + this.cartList[i].mprice;
                    temp.push(tmp);
                }
                this.totalmoney = numberComma(this.totalmoney);
                this.totalnum = numberComma(this.totalnum);
                return temp;
            }
        },
        data() {
            return {
                hasGoods: false,
                searchData: '',
                result: [],
                totalnum: 0,
                totalmoney: 0,
                cartList: [{
                    name: '商品1号',
                    price: '10.00',
                    mprice: '15.00',
                    num: 1,
                    total: '10.00',
                }, {
                    name: '商品3号',
                    price: '1.00',
                    mprice: '2.00',
                    num: 1,
                    total: '1.00',
                }, {
                    name: '商品2号',
                    price: '8.50',
                    mprice: '10.00',
                    num: 1,
                    total: '8.50',
                }],
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