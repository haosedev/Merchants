<template>
    <div>
        <Group :title="name">
            <Cell title="条码" :value="bc"></Cell>
            <Cell title="货号" :value="pn"></Cell>
            <Cell title="销售价" :value="price"></Cell>
        </Group>
        需要显示 名称name,条码bc，货号pn，销售价price，数量num，实际价in_price，（快速折扣处理，抹零）

    </div>
</template>

<script>
    import {
        LoadMore,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
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
            Flexbox,
            FlexboxItem,
            Group,
            Cell,
            Divider,
        },
        name: 'ecart',
        methods: {

        },
        computed: {

        },
        data() {
            return {
                name: '',
                pn: '',
                bc: '',
                price: '',
                in_price: '',



            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '~vux/src/styles/1px.less';
</style>