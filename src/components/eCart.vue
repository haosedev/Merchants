<template>
    <div>
        <Group :title="eCartName">
            <Cell title="名称" :value="name"></Cell>
            <Cell title="条码" :value="bc"></Cell>
            <Cell title="货号" :value="pn"></Cell>
            <Cell title="单价">
                <div slot="value">￥{{price}}</div>
            </Cell>
            <x-number title="数量" v-model="num" :min='1' @on-change="num_change"></x-number>
            <x-number title="折扣" v-model="zhekou" :min='1' :max='10' :step='0.1' @on-change="zhekou_change" class="zhekou_bk"></x-number>
            <Cell title="总计" class="goods_total_bk">
                <div slot="value">
                    <span style="color: red;font-weight:bold;">￥<countup :end-val="total_price" :duration="2" :decimals="2" class="demo1"></countup></span>
                </div>
            </Cell>
        </Group>
        <box gap="10px 10px">
            <x-button type="primary">加入购物车</x-button>
            <x-button type="warn">放弃修改</x-button>
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
        methods: {
            getSearchData() {
                return $route.params.searchData;
            },
            zhekou_change(val) {
                //console.log('折扣改变：' + val + '折');
                //console.log('dd:' + this.zhekou);
            },
            num_change(val) {

            },
        },
        computed: {
            total_price() {
                return this.in_price * this.num * this.zhekou / 10;
            },
            eCartName() {
                return '添加商品到购物车'; //编辑购物车商品
            }
        },
        data() {
            return {

                name: '第一商品',
                pn: '01',
                bc: '1234',
                price: 17.0,
                num: 1,
                in_price: 17.0,
                zhekou: 10,


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