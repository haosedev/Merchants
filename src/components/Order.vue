<template>
    <div>
        <div v-for="(vo, index) in dCartList" :key="vo.id">
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
        </div>

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
            getSN() {
                return $route.params.sn;
            }
        },
        data() {
            return {

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