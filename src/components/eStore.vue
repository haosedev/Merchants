<template>
    <div>
        <Group :title="eCartName">
            <cell title="操作" value="点击扫码" is-link @click.native="scan"></cell>
            <x-input title="条码" v-model="qrout" text-align="right" placeholder="请输入条码" @on-change="bcChange"></x-input>
            <x-input title="货号" v-model="info.pn" text-align="right" placeholder="请输入货号"></x-input>
            <x-input title="商品名称" v-model="info.name" text-align="right" placeholder="请输入商品名称"></x-input>
            <x-input title="进货价" v-model="info.in_price" text-align="right" placeholder="请输入进货价"></x-input>
            <x-input title="销售价" v-model="info.price" text-align="right" placeholder="请输入销售价"></x-input>
            <x-input title="库存" v-model="info.stock" text-align="right" placeholder="请输入库存"></x-input>
            <x-input title="备注" v-model="info.remark" text-align="right" placeholder="请输入备注"></x-input>
        </Group>
        <group>
            <x-switch title="状态" v-model="stat"></x-switch>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="setGoods()">保存</x-button>
            <x-button type="warn" link="BACK">放弃并返回</x-button>
        </box>
        <div class="ph10"></div>
    </div>
</template>

<script>
    import {
        XSwitch,
        XInput,
        Group,
        Cell,
        XButton,
        Box
    } from 'vux'
    export default {
        components: {
            XSwitch,
            XInput,
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
            }
        },
        methods: {
            scan() {
                //console.log('SCAN');
                window.HaosedevFunction.QrScan("cardwinner");
            },
            bcChange(val) {
                //console.log(val);
                this.info.bc = val;
            },
            set_info(info) {
                if (info) {
                    info.in_price = parseFloat(info.in_price);
                    info.in_price.toFixed(2);
                    info.price = parseFloat(info.price);
                    info.price.toFixed(2);
                    info.stock = info.stock;
                    info.bc = info.bc;
                    info.pn = info.pn;
                    info.name = info.name;
                    info.status = info.status;
                    info.remark = info.remark;
                    if (info.status == 1) {
                        this.stat = true;
                        this.stat_title = '正常';
                    } else {
                        this.stat = false;
                        this.stat_title = '已删除';
                    }
                    this.info = info;
                } else {
                    this.stat = true;
                    this.stat_title = '正常';
                    this.info = this.info_bak;
                }
            },
            getGoodsId(id) {
                //进入时，用get获取，为了兼容老版本
                this.$http.get('http://mc.httpcenter.com/Vue/Goods/edit/id/' + id)
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
                var ip = parseFloat(this.info.in_price);
                var p = parseFloat(this.info.price);
                var sta = 1;
                if (this.stat == false)
                    sta = -1;
                var param = this.$qs.stringify({
                    id: this.info.id,
                    bc: this.info.bc,
                    pn: this.info.pn,
                    name: this.info.name,
                    stock: this.info.stock,
                    in_price: ip.toFixed(2),  //防止出现太多小数点
                    price: p.toFixed(2),  //防止出现太多小数点
                    status: sta,
                })
                this.$http.post('http://mc.httpcenter.com/Vue/Goods/' + this.option + '/', param)
                    .then(res => {
                        //**增加一个编辑成功的Toast
                        console.log(res);
                        this.$router.back();
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
            eCartName() {
                if (this.option == 'edit')
                    return '编辑商品';
                else
                    return '添加商品';
            }
        },
        data() {
            return {
                info_bak: { id: 0, name: '', pn: '00', bc: '', inprice: 0.0, price: 0.0, stock: 0, remark: '', status: 1, },
                info: { id: 0, name: '', pn: '00', bc: '', inprice: 0.0, price: 0.0, stock: 0, remark: '', status: 1, },
                stat_title: '正常',
                stat: true,
                option: 'add',
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '~vux/src/styles/1px.less';
    .demo5-item {
        width: 100px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
    }

    .demo5-item-selected {
        border-color: #ff4a00;
    }
</style>