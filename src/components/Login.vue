<template>
    <div>
        <group title="账号信息">
            <x-input title="账号" v-model="username" placeholder="请输入账号"></x-input>
            <x-input title="密码" v-model="password" placeholder="" type="password"></x-input>
        </group>
        <div style="padding:20px 10px;">
            <x-button type="primary" @click.native="submit()">登陆</x-button>
        </div>
    </div>
</template>

<script>
    import store from '@/vuex/store'
    import {
        Group, Cell, XInput, XButton
    } from 'vux'
    export default {
        components: {
            Group, Cell, XInput, XButton,
        },
        name: 'home',
        mounted() {
            //读取上次登陆的Username从LocalStroge
            this.username = localStorage.USERNAME;
        },
        methods: {
            submit() {
                console.log();
                var param = this.$qs.stringify({
                    accu: this.username, pwd: this.password,
                })
                var self = this;
                this.$http.post('http://mc.httpcenter.com/Vue/Index/doLogin', param)
                    .then(res => {
                        self.$vux.toast.show({
                            type: 'text',
                            position: 'middle',
                            width: '260px',
                            time: 2000,
                            text: res.data.info,
                        })
                        if (res.data.status == 1) {
                            localStorage.USERNAME = self.username;
                            //**将登陆数据写入 sessionStroge
                            sessionStorage.isLogin = true;
                            self.$router.push('/');
                        } else {
                            sessionStorage.isLogin = false;
                            //清空密码
                            self.password = '';
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        data() {
            return {
                username: '',
                password: '',
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