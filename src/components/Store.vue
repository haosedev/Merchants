<template>
    <div>
        <search :results="results" v-model="qrout" :auto-fixed="false" top="46px" @on-focus="onFocus" @on-change='searchChange' @on-cancel="onCancel"
            ref="search"></search>

        <div style="padding:5px 5px 0 5px;">
            <flexbox>
                <flexbox-item>
                    <div class="btn" @click="search">
                        <div class="icon-tianjia2 icon"></div>
                        <div class="lab">检索</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn" @click="add">
                        <div class="icon-tianjia2 icon"></div>
                        <div class="lab">{{op_btn_name}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn" @click="scan">
                        <div class="icon-tiaoma icon"></div>
                        <div class="lab">扫码</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <card :header="{title:'我的仓库'}">
            <div slot="content" class="box-flex box-content">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">
                        <countup :end-val="info.goods_count" :duration="2" :decimals="0"></countup>
                    </div>
                    <div class="income">商品种类</div>
                </div>
                <div>
                    <div class="span">
                        <countup :end-val="info.goods_stock" :duration="2" :decimals="0"></countup>
                    </div>
                    <div class="income">总库存量</div>
                </div>
            </div>
            <!--<div slot="content" class="box-flex box-content top-hr">
                <div class="vux-1px-l vux-1px-r">
                    <div class="span">
                        <countup :end-val="info.goods_num_have" :duration="2" :decimals="0"></countup>
                    </div>
                    <div class="income">库存商品</div>
                </div>
                <div class="vux-1px-r">
                    <div class="span">
                        <countup :end-val="info.goods_num_nohave" :duration="2" :decimals="0"></countup>
                    </div>
                    <div class="income">缺货商品</div>
                </div>
                <div>
                    <div class="span">
                        <countup :end-val="info.goods_num_del" :duration="2" :decimals="0"></countup>
                    </div>
                    <div class="income">删除商品</div>
                </div>
            </div>-->
        </card>
        <tab :animate="false">
            <tab-item active-class="tab0" @on-item-click="onTabClick" :selected="nowTab === 0">搜索结果</tab-item>
            <tab-item active-class="tab1" @on-item-click="onTabClick" :selected="nowTab === 1">库存商品</tab-item>
            <tab-item active-class="tab2" @on-item-click="onTabClick" :selected="nowTab === 2">缺货商品</tab-item>
            <tab-item active-class="tab3" @on-item-click="onTabClick" :selected="nowTab === 3">删除商品</tab-item>
        </tab>
        <div class="hasCarts" v-show="hasGoods">
            <swipeout>
                <swipeout-item transition-mode="follow" v-for="(vo, index) in dCartList" :key="vo.xid">
                    <div slot="right-menu">
                        <swipeout-button @click.native="edit(index, vo.xid)" type="primary">编辑</swipeout-button>
                        <swipeout-button @click.native="del(index, vo.xid)" type="warn">{{del_btn_name}}</swipeout-button>
                    </div>
                    <div slot="content" class="demo-content vux-1px-t">
                        <group>
                            <cell :title="vo.name"></cell>
                            <cell title="条码" :value="vo.bc"></cell>
                            <cell title="简码" :value="vo.pn"></cell>
                            <cell title="单价" :value="vo.price"></cell>
                            <cell title="库存" :value="vo.stock"></cell>
                        </group>
                    </div>
                </swipeout-item>
            </swipeout>
            <div class="ph10"></div>
        </div>
        <div class="" v-show="!hasGoods">
            <br/>
            <br/>
            <load-more :show-loading="false" tip="无数据！" background-color="#fbf9fe"></load-more>
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
        Tab,
        TabItem,
        Group,
        Cell,
        Card,
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
            Tab,
            TabItem,
            Group,
            Cell,
            Card,
            Countup,
        },
        name: 'store',
        mounted() {
            //console.log('执行');
            this.getStore();
            store.commit('updateQrtext', { qrtext: '' });
        },
        methods: {
            search() {
                console.log("SEARCH");
                //this.nowTab = 0;
                //**输入根据检索
                if (this.searchData == '') {
                    this.$vux.toast.show({
                        type: 'warn',
                        position: 'middle',
                        width: '260px',
                        time: 2000,
                        text: '请在搜索框内输入【条码】或【货号】',
                    });
                    return false;
                }
                //**需要输入搜索内容
                //console.log('search:' + this.searchData);
                var self = this;
                var param = {};
                this.$http.get('http://mc.httpcenter.com/Vue/Goods/getSearch/name/' + this.searchData)
                    .then(res => {
                        console.log(res.data.search_list);
                        if (typeof (res.data.search_list) != 'undefined') {
                            self.searchList = res.data.search_list;
                            this.onTabClick(0);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.onTabClick(0);
            },
            scan() {
                console.log('SCAN');
                window.HaosedevFunction.QrScan("cardwinner");
            },
            add() {
                //**根据搜索内容进行 **带个参数
                this.$router.push({ path: '/eStore', query: { id: 0 } });
            },
            edit(index, id) {
                //**根据点击id进行edit
                var gid = this.showList[id].id;
                this.$router.push({ path: '/eStore', query: { searchData: 0, id: gid } });
                //this.$router.push({ name: '商品操作', params: { searchData: this.searchData, id: gid } });
            },
            del(index, id) {
                //console.log('DEL:' + id);
                var name = this.showList[id].name;
                var gid = this.showList[id].id;
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
                var url = 'http://mc.httpcenter.com/Vue/Goods/del/id/';
                if (this.isDel == false)
                    var url = 'http://mc.httpcenter.com/Vue/Goods/undel/id/';
                var self = this;
                this.$http.get(url + gid)
                    .then(res => {
                        self.$vux.toast.show({
                            type: 'warning',
                            position: 'middle',
                            width: '260px',
                            time: 2000,
                            text: res.data.info,
                        });
                        self.getStore();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            searchChange(val) {
                if (val == '') {
                    this.op_btn = 'add';
                    this.op_btn_name = '新增商品';
                } else {
                    this.op_btn = 'edit';
                    this.op_btn_name = '编辑商品';
                }
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
            getStore() {
                var self = this;
                var param = {};
                this.$http.post('http://mc.httpcenter.com/Vue/Goods/getStore')
                    .then(res => {
                        //console.log(res);
                        //if (typeof (res.data.search_list) != 'undefined')
                        //    self.searchList = res.data.search_list;
                        if (typeof (res.data.del_list) != 'undefined')
                            self.delList = res.data.del_list;
                        if (typeof (res.data.goods_list) != 'undefined')
                            self.goodsList = res.data.goods_list;
                        if (typeof (res.data.goods_list_out) != 'undefined')
                            self.goodsListout = res.data.goods_list_out;
                        self.info.goods_count = res.data.goods_count;
                        self.info.goods_stock = res.data.goods_stock;
                        self.info.search_num = self.searchList.length;
                        self.info.goods_num_del = self.delList.length;
                        self.info.goods_num_have = self.goodsList.length;
                        self.info.goods_num_nohave = self.goodsListout.length;
                        if (self.nowTab == 0)
                            self.showList = self.searchList;
                        else if (self.nowTab == 1)
                            self.showList = self.goodsList;
                        else if (self.nowTab == 2)
                            self.showList = self.goodsListout;
                        else if (self.nowTab == 3)
                            self.showList = self.delList;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            onTabClick(index) {
                this.nowTab = index;
                if (index == 0) {
                    console.log(this.searchList);
                    this.showList = this.searchList;
                    this.del_btn_name = '删除';
                    this.isDel = true;
                } else if (index == 1) {
                    this.showList = this.goodsList;
                    this.del_btn_name = '删除';
                    this.isDel = true;
                } else if (index == 2) {
                    this.del_btn_name = '删除';
                    this.isDel = true;
                    this.showList = this.goodsListout;
                } else if (index == 3) {
                    this.isDel = false;
                    this.del_btn_name = '恢复';
                    this.showList = this.delList;
                }
            },
        },
        computed: {
            qrout() {
                var aa = this.$store.state.qrtext;
                return aa;
            },
            dCartList() {
                //处理数组
                if (this.showList.length > 0) {
                    this.hasGoods = true;
                } else {
                    this.hasGoods = false;
                }
                var temp = [];
                for (var i = 0; i < this.showList.length; i++) {
                    var xid = i + 1;
                    var tmp = {};
                    tmp.xid = i;
                    tmp.name = xid + '.' + this.showList[i].name;
                    tmp.bc = this.showList[i].bc;
                    tmp.pn = this.showList[i].pn;
                    tmp.stock = this.showList[i].stock;
                    tmp.price = '￥' + this.showList[i].price;
                    temp.push(tmp);
                }
                return temp;
            },

        },
        data() {
            return {
                hasGoods: false,
                searchData: '',
                result: [],
                op_btn: 'add',
                op_btn_name: '新增商品',
                nowTab: 1,  //默认当前库存
                isDel: true,
                del_btn_name: '删除',
                info_bak: { 'goods_count': 0, 'goods_stock': 0, 'goods_num_have': 0, 'goods_num_nohave': 0, 'goods_num_del': 0, 'search_num': 0, },
                info: { 'goods_count': 0, 'goods_stock': 0, 'goods_num_have': 0, 'goods_num_nohave': 0, 'goods_num_del': 0, 'search_num': 0, },
                searchList: [],
                delList: [],
                goodsList: [],
                goodsListout: [],
                showList: [],
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
    @import '~vux/src/styles/center.less';
    .box-flex {
        display: flex;
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

    .box-content {
        padding: 15px 0;
    }

    .top-hr {
        border-top: 1px solid #E5E5E5;
    }

    .card-padding {
        padding: 20px;
    }

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

    .tab0 {
        color: #04be02 !important;
        border-color: #04be02!important;
    }

    .tab1 {
        color: rgb(55, 174, 252) !important;
        border-color: rgb(55, 174, 252)!important;
    }

    .tab2 {
        color: #FF9900 !important;
        border-color: #FF9900!important;
    }

    .tab3 {
        color: rgb(252, 55, 140) !important;
        border-color: rgb(252, 55, 140)!important;
    }
</style>