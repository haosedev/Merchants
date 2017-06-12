<template>
    <div style="height:100%;">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <div v-transfer-dom>
            <actionsheet v-model="showMenu" :menus="menus" @on-click-menu="menuclick" show-cancel></actionsheet>
        </div>
    
        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
    
            <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="leftOptions" :right-options="rightOptions" :title="title" :transition="headerTransition" @on-click-more="onClickMore"></x-header>
    
            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view"></router-view>
            </transition>
    
            <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="!isTabbarDemo" slot="bottom">
                <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
                    <span class="icon-shouyeshouye icon" slot="icon" style="position:relative;top: -6px;left:-2px"></span>
                    <span class="black" slot="label">Home</span>
                </tabbar-item>
                <tabbar-item :link="{path:'/H2'}" :selected="isDemo" badge="9">
                    <span class="icon-xiaoshou2 icon" slot="icon" style="position:relative;top: -4px;left:-2px"></span>
                    <span slot="label">
                        <span v-if="componentName" class="vux-demo-tabbar-component black">{{componentName}}</span>
                        <span class="black" v-else>Demos</span>
                    </span>
                </tabbar-item>
                <tabbar-item :link="{path:'/data2'}" :selected="route.path === '/project/donate'" show-dot>
                    <span class="icon-liebiao-copy icon" slot="icon" style="position:relative;top: -4px;left:-2px"></span>
                    <span class="black" slot="label">Donate</span>
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
    methods: {
        onClickMore() {
            this.showMenu = true
        },
        menuclick(key) {
            switch (key) {
                case 'menu1':
                    this.$router.push('/');
                    break;
                case 'menu2':
                    this.$router.push('/h2');
                    break;
                case 'menu3':
                    console.log('3 unset');
                    break;
                case 'menu4':
                    console.log('4 unset');
                    break;
                case 'menu5':
                    console.log('5 unset');
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
        this.handler = () => {
            if (this.path === '/demo') {
                this.box = document.querySelector('#demo_list_box')
                this.updateDemoPosition(this.box.scrollTop)
            }
        }
    },
    beforeDestroy() {
        this.box.removeEventListener('scroll', this.handler, false)
    },
    watch: {
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
            direction: state => state.direction
        }),
        isShowBar() {
            if (/component/.test(this.path)) {
                return true
            }
            return false
        },
        leftOptions() {
            return {
                showBack: this.route.path !== '/'
            }
        },
        rightOptions() {
            return {
                showMore: true
            }
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
        isDemo() {
            return /h2/.test(this.route.path)
        },
        isTabbarDemo() {
            return /tabbar/.test(this.route.path)
        },
        title() {
            if (this.route.path === '/') return '首页'
            return this.componentName ? `${this.componentName}` : 'Merchant'
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
body {
    background-color: #fbf9fe;
}

html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}

.icon {
    font-family: "iconfont" !important;
    font-size: 30px;
    color: #888;
}
.black{
    color:#000;
}
.weui-tabbar.vux-demo-tabbar {
    /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}

.vux-demo-tabbar .weui-bar__item_on .icon {
    color: #0275d8;
}

.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
    color: rgb(53, 73, 94);
}

.icon:before {
    content: attr(icon);
}

.vux-demo-tabbar-component {
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

@font-face {
    font-family: 'vux-demo';
    /* project id 70323 */
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'), url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'), url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
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