<template>
    <div>
        <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="searchData" auto-scroll-to-top top="46px"
            position="absolute" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
        <div style="padding:5px;">
            <flexbox>
                <flexbox-item>
                    <div class="btn">
                        <div class="icon-tianjia2 icon"></div>
                        <div class="lab">添加</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn">
                        <div class="icon-tiaoma icon"></div>
                        <div class="lab">扫码</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn">
                        <div class="icon-shanchu icon"></div>
                        <div class="lab">清空</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        这里是购物车商品列表，需要有 编辑，和删除 按钮，要求样式简洁美观

        <br> 这里是结算方式
    </div>
</template>

<script>
    import {
        Search,
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        Divider

    } from 'vux'
    export default {
        components: {
            Search,
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            Divider,
        },
        name: 'cart',
        methods: {

        },
        data() {
            return {
                searchData: '',
                result: '',
                cartList: [{
                    label: '商品一号',
                    value: '￥10.00'
                }, {
                    label: 'Banana',
                    value: '1.04'
                }, {
                    label: 'Fish',
                    value: '8.00'
                }],
                buttons1: [{
                    style: 'primary',
                    text: '编辑',
                    link: '/',
                }, {
                    style: 'warn',
                    text: '删除',
                }],
            }
        }
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
</style>