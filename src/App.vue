<template>
    <div style="height:100%;">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <div v-transfer-dom>
            <actionsheet v-model="showMenu" :menus="menus" @on-click-menu="menuclick" show-cancel></actionsheet>
        </div>

        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">

            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions" :right-options="rightOptions"
                :title="title" :transition="headerTransition" @on-click-more="onClickMore"></x-header>

            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view"></router-view>
            </transition>

            <tabbar class="app-tabbar" icon-class="vux-center" v-show="isTabbarShow" slot="bottom">
                <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
                    <span class="icon-shouyeshouye icon" slot="icon" style="position:relative;top: -6px;left:-2px"></span>
                    <span class="black" slot="label">首页</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/Cart'}" :selected="route.path === '/Cart'" :badge="cartNum">
                    <span class="icon-xiaoshou2 icon" slot="icon" style="position:relative;top: -4px;left:-2px"></span>
                    <span slot="label">
                        <span class="black">购物车</span>
                    </span>
                </tabbar-item>
                <tabbar-item :link="{path:'/Lists'}" :selected="route.path === '/Lists'">
                    <span class="icon-liebiao-copy icon" slot="icon" style="position:relative;top: -4px;left:-2px"></span>
                    <span class="black" slot="label">订单列表</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>

<script>
    import store from '@/vuex/store'
    import {
        Actionsheet,
        ButtonTab,
        ButtonTabItem,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading,
        TransferDom
    } from 'vux'
    import {
        mapState,
        mapActions
    } from 'vuex'

    export default {
        directives: {
            TransferDom
        },
        components: {
            ButtonTab,
            ButtonTabItem,
            ViewBox,
            XHeader,
            Tabbar,
            TabbarItem,
            Loading,
            Actionsheet
        },
        created() {
            this.checkLogin();
        },
        methods: {
            checkLogin() {
                var isLogin = sessionStorage.isLogin;
                if (!isLogin) {
                    this.$router.push('/Login');
                }
            },
            onClickMore() {
                this.showMenu = true
            },
            menuclick(key) {
                switch (key) {
                    case 'menu1':
                        this.$router.push('/');
                        break;
                    case 'menu2':
                        this.$router.push('/Cart');
                        break;
                    case 'menu3':
                        this.$router.push('/Lists');
                        break;
                    case 'menu4':
                        this.$router.push('/Store');
                        break;
                    case 'menu5':
                        window.HaosedevFunction.goSetting("cardwinner");
                        break;
                    default:
                        console.log('default menu');
                }
            },
            ...mapActions([
                'updateDemoPosition'
            ])
        },
        mounted() {
            // this.handler = () => {
            //     if (this.path === '/demo') {
            //         this.box = document.querySelector('#demo_list_box')
            //         this.updateDemoPosition(this.box.scrollTop)
            //     }
            // }
        },
        beforeDestroy() {
            this.box.removeEventListener('scroll', this.handler, false)
        },
        watch: {
            "$route": 'checkLogin',
            // path(path) {
            //     if (path === '/') {
            //         this.$router.replace('/')
            //         return
            //     }
            //     if (path === '/') {
            //         setTimeout(() => {
            //             this.box = document.querySelector('#demo_list_box')
            //             if (this.box) {
            //                 this.box.removeEventListener('scroll', this.handler, false)
            //                 this.box.addEventListener('scroll', this.handler, false)
            //             }
            //         }, 1000)
            //     } else {
            //         this.box && this.box.removeEventListener('scroll', this.handler, false)
            //     }
            // }
        },
        computed: {
            ...mapState({
                route: state => state.route,
                path: state => state.route.path,
                deviceready: state => state.app.deviceready,
                demoTop: state => state.demoScrollTop,
                isLoading: state => state.isLoading,
                direction: state => state.direction,
                cart_num: state => state.cartnum
            }),
            isShowBar() {
                if (/component/.test(this.path)) {
                    return true
                }
                return false
            },
            leftOptions() {
                var res = true;
                if ((this.route.path == '/') || (this.route.path == '/Login'))
                    res = false;
                return {
                    //**需要 不是 / 和 /Login
                    showBack: res,
                }
            },
            rightOptions() {
                var res = false;
                if (this.route.path == '/')
                    res = true;
                return {
                    showMore: res,
                }
            },
            isTabbarShow() {
                var res = true;
                if (this.route.path == '/Login') {
                    res = false;
                }
                return res;
            },
            headerTransition() {
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            },
            componentName() {
                if (this.route.path) {
                    const parts = this.route.path.split('/')
                    if (/component/.test(this.route.path) && parts[2]) return parts[2]
                }
            },
            routerName() {
                if (this.route.path) {
                    return this.route.name;
                }
            },
            cartNum() {
                return this.cart_num;
            },
            // isDemo() {
            //     return /h2/.test(this.route.path)
            // },
            // isTabbarDemo() {
            //     return /tabbar/.test(this.route.path)
            // },
            title() {
                if (this.route.path === '/') return '首页'
                return this.routerName ? `${this.routerName}` : 'Merchant'
            }
        },
        data() {
            return {
                showMenu: false,
                menus: {
                    menu1: '首页',
                    menu2: '购物车',
                    menu3: '列表',
                    menu4: '仓储',
                    menu5: '系统设置',
                },
            }
        }
    }

</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/tap.less';
    html,
    body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        background-color: #fbf9fe;
    }

    .icon {
        font-family: "iconfont" !important;
        font-size: 30px;
        color: #888;
    }

    .ph10 {
        height: 10px;
    }

    .black {
        color: #000;
    }

    .weui-tabbar.app-tabber {
        /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
    }

    .weui-bar__item_on .icon {
        color: #0275d8;
    }

    .weui-tabbar_item.weui-bar__item_on .app-tabbar-icon-home {
        color: rgb(53, 73, 94);
    }

    .icon:before {
        content: attr(icon);
    }

    .app-tabbar-component {
        background-color: #F70968;
        color: #fff;
        border-radius: 7px;
        padding: 0 4px;
        line-height: 14px;
    }

    .weui-tabbar__icon+.weui-tabbar__label {
        margin-top: 0!important;
    }

    .vux-demo-header-box {
        z-index: 100;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }

    .demo-icon {
        font-family: 'vux-demo';
        font-size: 20px;
        color: #04BE02;
    }

    .demo-icon-big {
        font-size: 28px;
    }

    .demo-icon:before {
        content: attr(icon);
    }

    .router-view {
        width: 100%;
        top: 46px;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 46px;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }

    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .menu-title {
        color: #888;
    }
</style>