<template>
    <div>
        <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="searchData" auto-scroll-to-top top="46px" position="absolute" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
        <div style="padding:5px 5px 20px 5px;">
            <flexbox>
                <flexbox-item>
                    <div class="btn" @click="add">
                        <div class="icon-tianjia2 icon"></div>
                        <div class="lab">添加</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn" @click="scan">
                        <div class="icon-tiaoma icon"></div>
                        <div class="lab">扫码</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="btn" @click="clear">
                        <div class="icon-shanchu icon"></div>
                        <div class="lab">清空</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="hasCarts">
            <!--这里是购物车商品列表，需要有 编辑，和删除 按钮，要求样式简洁美观 商品名称，原价，单价，数量，总计-->
            <div class="vux-form-preview weui-form-preview" style="margin-bottom:10px;">
                <div class="weui-form-preview__hd">
                    <label class="weui-form-preview__label">商品xxxxx</label>
                    <em class="weui-form-preview__value">￥9.00</em>
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">原价</label>
                        <span class="weui-form-preview__value">￥10.00</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">单价</label>
                        <span class="weui-form-preview__value">￥9.00</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">数量</label>
                        <span class="weui-form-preview__value">1</span>
                    </div>
                </div>
                <div class="weui-form-preview__ft">
                    <button @click="edit(0)" class="weui-form-preview__btn weui-form-preview__btn_primary">编辑</button>
                    <button @click="del(0)" class="weui-form-preview__btn important_warn">删除</button>
                </div>
            </div>
            <div class="vux-form-preview weui-form-preview">
                <div class="weui-form-preview__hd">
                    <label class="weui-form-preview__label">商品xxxxx</label>
                    <em class="weui-form-preview__value">￥9.00</em>
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">原价</label>
                        <span class="weui-form-preview__value">￥10.00</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">单价</label>
                        <span class="weui-form-preview__value">￥9.00</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">数量</label>
                        <span class="weui-form-preview__value">1</span>
                    </div>
                </div>
                <div class="weui-form-preview__ft">
                    <button @click="edit(1)" class="weui-form-preview__btn weui-form-preview__btn_primary">编辑</button>
                    <button @click="del(1)" class="weui-form-preview__btn important_warn">删除</button>
                </div>
            </div>
            <group title="结算">
                <cell title="数量" class="totalBk">
                    <div slot="value">
                        <span>x 1</span>
                    </div>
                </cell>
                <cell title="总价格" class="totalBk">
                    <div slot="value">
                        <span style="color: red">￥128.00</span>
                    </div>
                </cell>
            </group>
            <div class="btn-group">
                <flexbox>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">现金</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">刷卡</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">支付宝</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="btn">
                            <div class="lab">微信</div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
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
        scan(){
            console.log('SCAN');
            this.searchData = "scan";
        },
        clear(){
            console.log("CLEAR");
        },
        add(){
            console.log('ADD');
        },
        edit(id) {
            console.log('EDIT' + id);
        },
        del(id) {
            console.log('DEL:' + id);
        },
        setFocus() {
            this.$refs.search.setFocus()
        },
        resultClick(item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        },
        getResult(val) {
            this.results = val ? getResult(this.value) : []
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
        }
    },
    data() {
        return {
            searchData: '',
            result: [],
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
        }
    }
}
function getResult (val) {
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
    background-color: #DEFFCA;
}

.totalBk {
    background-color: #DEFFCA;
}

.important_warn {
    background-color: #D84949;
    color: #FFF;
}
</style>