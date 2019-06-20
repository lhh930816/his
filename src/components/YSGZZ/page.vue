
<template>
	<div class="page" id="page">
        <ul class="pages">
            <li @click="showPage(1,$event)"><i class="el-icon-d-arrow-left"></i></li>
            <li @click="showPage(pageCurrent-1,$event)"><i class="el-icon-arrow-left"></i></li>
            <li class="nume"><input ref='num' type="text" v-model="pageCurrent" v-on:keyup.enter="showPage(mypageCurrent,$event,true)"></li>
            <li class="page-total">/<span>{{pagerData.page.pageCount}}</span></li>
            <li @click="showPage(pageCurrent+1,$event)"><i class="el-icon-arrow-right"></i></li>
            <li @click="showPage(pagerData.page.pageCount,$event)"><i class="el-icon-d-arrow-right"></i></li>
        </ul>
        <p>{{startData}}到{{endData}}条，共{{pagerData.page.totalCount}}条</p>
    </div>
</template>

<script>
	export default {
		props: {
			pagerData: {
	            type: Object,
	            default: function (){
	                return {
	                    data: [],
	                    rows: []
	                }
	            }
			}
		},
		data () {
            return {
                mypagesize: 3,
                mypageCurrent: 1
            }
       },
      	computed: {
      		// 分页大小 获取的时候显示父级传入的，修改的时候修改自身的。子组件不能修改父元素的值
            pagesize: {
                get () {
                    return this.pagerData.page.pagesize;
                },
                set (value) { 
                    this.mypagesize = value;
                 }
            },
            pageCurrent:{
				get (){
					return this.pagerData.page.pageCurrent;
				},
				set (value){
					this.mypageCurrent = value;
				}
			},
            startData () {
                return this.pagerData.page.pagesize*(this.pagerData.page.pageCurrent-1)+1;
            },
            endData () {
                var max = this.pagerData.page.pagesize*this.pagerData.page.pageCurrent;
                return max > this.pagerData.page.totalCount ? this.pagerData.page.totalCount:max;
              }
        },
        methods: {
            showPage (pageIndex, $event) {
            	console.log(pageIndex)
                if (pageIndex > 0) {
                    if (pageIndex > this.pagerData.page.pageCount) pageIndex = this.pagerData.page.pageCount;
                    this.$emit ('show-page',{pageCurrent:pageIndex,pagesize:this.mypagesize});//事件
                }
            }
        }
	}
</script>

<style>
</style>