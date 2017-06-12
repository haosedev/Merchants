<template>
    <div>
        <card>
            <div slot="content" class="card-padding center">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p><icon type="warn"></icon><span>404 错误！</span></p>
                <p>&nbsp;</p>
                <p><span>您正要打开的页面不存在！</span></p>
                <p>&nbsp;</p>
                <p><span>请联系管理员处理这个问题</span></p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
        </card>

    </div>
</template>

<script>
    import {
        Icon,
        Card
    } from 'vux'
    export default {
        components: {
            Icon,
            Card,
        },
        name: 'hi222',
        data() {
            return {
                msg: "Error : 404 not Found!",
            }
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
    }
</style>