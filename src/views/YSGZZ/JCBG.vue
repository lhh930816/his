<template>
    <div class="modal">
        <div class="title">
            <h3>{{title}}</h3>
            <span>
                <i class="el-icon-close"></i>
            </span>
        </div>
        <div class="modal-head">
                <ul class="ess-info">
                    <li>张三</li>
                    <li>男</li>
                    <li>26岁</li>
                    <li>门诊(住院)号：FZ00234</li>
                </ul>
                <ol>
                    <li>
                        <el-date-picker
                            v-model="date"
                            type="date"
                            value-format='yyyy-MM-dd'>
                        </el-date-picker>
                        <label>~</label>
                        <el-date-picker
                            v-model="date1"
                            type="date"
                            value-format='yyyy-MM-dd'>
                        </el-date-picker>
                    </li>
                    <li><button class="query" @click='query'>查询</button></li>
                    <li><button class="gen">生成正文</button></li>
                </ol>
        </div>
        <div v-show='bol' class="noth">没有数据</div>
        <div class="modal-content" v-show='bool'>
            <div class="left-content" >
            	<ul class="left-info">
			        <li class="info-content" v-for="v in pagerData.data">
			            <div class="info-head">
			                <p>{{v.name}}</p>
			                <span @click='see($event)'><i class="el-icon-view"></i>查看</span>
			            </div>
			            <ul class="infos">
			                <li><span>检查科室：</span>{{v.depa}}</li>
			                <li><span>检查设备：</span>{{v.equi}}</li>
			                <li><span>检查部位：</span>{{v.posi}}</li>
			                <li><span>报告时间：</span>{{v.time}}</li>
			            </ul>
			        </li>
			    </ul>
                <my-component v-on:show-page="getPageData" v-bind:pager-data="pagerData" v-show='bols'></my-component>
            </div>
            <div class="right-content">
                <p v-show='show'>没有数据</p>
                <ul class="right-info" v-show='shows'>
                    <li>临床诊断：<span>早孕</span></li>
                    <li>检查名称：<span>胸部正位片</span></li>
                    <li>检查技术：<span>X—RAY 胸片 正位</span></li>
                    <li>影像表现：<span>所示胸廓骨骼及胸壁软组织未见异常。
				                        纵隔未见移位及增宽。气管居中。  心脏形态，
				                        大小未见异常两膈光整，两肋膈角锐利。
				                        双侧肺门形太大小位置未见异常。两肺纹理增多，
				                        未见活动性病变。</span></li>
                    <li>影像诊断：<span>两肺未见明显活动性病变。</span></li>
                </ul>
                <ol v-show=shows>
                    <li>报告医师：<span>马风华</span></li>
                    <li>报告日期：<span>2018.10.12</span></li>
                    <li>审核医师：<span>韩志刚</span></li>
                    <li>审核日期：<span>2018.10.12</span></li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
import pager from '@/components/YSGZZ/page.vue'
import axios from 'axios'
import qs from 'qs'
    export default {
       components:{
           'my-component':pager
        },
        data () {
            return {
                title: '检查报告',
                bol: true,
                bool:false,
                bols: false,
                show: true,
                shows: false,
                date: "",
                date1: "",
                info:{
                    name: '张三',
                    sex: "男",
                    age: '26',
                    out: 'FZ00234'
                  },
                dataAll: [],
                pagerData: {
                 	data:[],
                 	  rows:[{
		                    name: "胸部正位片",
		                    depa: '放射科',
		                    equi: 'DR',
		                    posi: '胸部',
		                    time: '2018.10.12 10:20'
		                },{
		                    name: "胸部正位片",
		                    depa: '放射科',
		                    equi: 'DR',
		                    posi: '胸部',
		                    time: '2018.10.12 10:20'
		                },{
		                    name: "胸部正位片",
		                    depa: '放射科',
		                    equi: 'DR',
		                    posi: '胸部',
		                    time: '2018.10.12 10:20'
		                },{
		                    name: "胸部正位s片",
		                    depa: '放射科s',
		                    equi: 'DRs',
		                    posi: '胸部s',
		                    time: '2018.10.12 10:20'
		                }],
	                page:{
	                    pagesize: 3,   //设置分页个数
	                    pageCount: 1,	
	                    pageCurrent: 1,
	                    totalCount: 1
	                }
                },
            }
        },
        created() {
	        let self = this;
	        self. date= self.dataFormat(new Date());
	        self. date1= self.dataFormat(new Date());
        },

        methods: {
//      	ready () { 
//              this.bols = true;
//              this.dataAll = this.pagerData.rows.length;
//              this.pagerData.page.totalCount = this.dataAll;
//              this.getPageData(this.pagerData.page);	
//                 
//             },
   dataFormat(time){
                return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
            },

            //查询
            query () {
                this.bol=false;
                this.bool=true;
                this.bols = true;
                this.dataAll = this.pagerData.rows.length;
                this.pagerData.page.totalCount = this.dataAll;
                this.getPageData(this.pagerData.page);	
                let start = this.date;
                let end = this.date1;
                let pagesize = this.pagerData.page.pagesize;
               console.log(this.$refs.num.val)
                var qs = require('qs');
                var url=process.env.API_HOST+'MedicalTechnology/GetLisReport';
                var instance=axios.create({
                    headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
                })
                var data={strat:start,end:end,pagesize:pagesize}
              this.$axios.post (url,qs.stringify(data))
                .then (res => {
                    // this.bol=false;
                    // this.bool=true;
                    return;
                })
            },
            //查看
            see (e) {
                this.show=false;
                this.shows=true;
                let Urls='';
                axios.post (Urls, )
                .them (res => {
                    this.bols=true;
                })
            },
            getPageData: function (page) {
                this.pagerData.page.pagesize = page.pagesize;
                this.pagerData.page.pageCurrent = page. pageCurrent;
                this.pagerData.page.pageCount = Math.ceil(this.pagerData.page.totalCount / page.pagesize); //修改分页信息
                let newPageInfo = [];
                for (var i = 0; i< page.pagesize; i++) {
                    var index = i + (page.pageCurrent-1)*page.pagesize;
                    if(index > this.pagerData.page.totalCount -1)break;
                        newPageInfo[newPageInfo.length] = this.pagerData.rows[index];
                }
                this.pagerData.data = newPageInfo;  //修改分页数据
            },
           
      },
        filters:{
        	 formatDate:function (val) {
	            var value=new Date(val);
	            var year=value.getFullYear();
	            var month=padDate(value.getMonth()+1);
	            var day=padDate(value.getDate());
	            var hour=padDate(value.getHours());
	            var minutes=padDate(value.getMinutes());
	            var seconds=padDate(value.getSeconds());
	            return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
 
        	}
        }
    }
</script>

<style lang="scss" scope>
*{
    padding: 0;
    margin: 0;
    outline: none;
    list-style: none;
}
button{
    border:none;
}
    .modal{
        width: 900px;
        height: 580px;
        background-color: #f5f5f5;
        margin: 0 auto;
        .title{
            line-height: 48px;
            background-color: #32c5d2;
            display: flex;
            justify-content: space-between;
            padding: 0 15px;
            h3{
                color: #ffffff;
                font-weight: normal;
                font-size: 18px;
            }
            span{
                display: inline-table;
                color: #ffffff;
                cursor: pointer;
                i{
                   font-size: 26px;
                   vertical-align: middle;
                }
                i:hover{
                    color: #666666;
                }
            }
        }
        .modal-head{
            overflow: hidden;
            padding: 0 15px;
            line-height: 60px;
            .ess-info{
                float:left;
                display: flex;
                list-style-type: none;
                li{
                    font-size: 16px;
                    color: #333333;
                    padding-right: 12px;
                }
            }
            ol{
                float:right;
                display: flex;
                list-style-type: none;
                li{
                    font-size:14px;
                    button{
                        cursor: pointer;
                        border-radius: 4px; 
                        height: 30px;
                    }
                    .query:hover{
                        background-color: #1f858e;
                    }
                    .el-date-editor{
                        width: 130px;
                        input{
                            width: 130px;
                            line-height: 23px;
                            padding: 0 5px 0 30px;
                            height: 23px;
                        }
                    }
                    
                    input:focus{
                        border: 1px solid #36c6d3; 
                    }
                    label{
                        padding: 0 5px;
                    }
                    .query{
                        color: #ffffff;
                        width: 65px;
                        background-color: #32c5d2;
                        margin-left: 15px;
                    }
                    .gen{
                        width: 80px;
                        color: #666666;
                        background-color: #ffffff;
                        border: 1px solid #e1e1e1;
                        margin-left: 10px;
                    }
                }
            }
        }
        .noth{
            font-size:20px;
            line-height: 400px;
        }
        .modal-content{
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            .left-content{
                .left-info{
                      overflow: hidden;
                      height: 414px;
                    .info-content{
                       width: 390px; 
                       border: 1px solid #e1e1e1;
                       background-color: #ffffff;
                       margin-bottom:10px;
                        .info-head{
                            font-size: 14px;
                            color: #1baebb;
                            display: flex;
                            justify-content: space-between;
                            line-height: 40px;
                            background-color: #f0f8f9;
                            padding: 0 15px;
                            i{
                                padding-right:5px;
                                vertical-align: middle;
                                font-size:18px;
                            }
                            span{
                                cursor: pointer;
                            }
                            span:hover{
                                color: #32c5d2;
                            }
                        }
                        .infos{
                            overflow: hidden;
                            padding: 15px 0 15px 15px;
                            li{
                               font-size: 14px;
                               float: left;
                               line-height: 28px;
                               text-align: left;
                               width: 180px;
                               span{
                                   text-align: right;
                                   display: inline-block;
                               }
                           }
                        }
                    }
                }
                .page{
                        overflow: hidden;
                        padding-top: 10px;
                    .pages{
                        float: left;
                        li{
                            float: left;
                            margin-right: 10px;
                            width: 30px;
                            height: 30px;
                            font-size: 14px;
                            background-color: #ffffff;
                            border: 1px solid #e1e1e1;
                            line-height: 30px;
                            border-radius: 4px;
                            cursor: pointer;
                            i{
                              font-size: 16px;
                              color: #999999;
                            }
                            input{
                                border: none;
                                width: 30px;
                                height: 30px;
                                text-align: center;
                                border: 1px solid #e1e1e1;
                                border-radius: 4px;
                            }
                        }
                        li:hover{
                            background: #32c5d2;
                            i{
                                color: #ffffff;
                            }
                        }
                        .page-total:hover{
                            background: #f5f5f5;
                        }
                       .nume{
                           border: none;
                       } 
                        .page-total{
                            border: none;
                            background-color: #f5f5f5;
                        }
                    }
                    p{
                        float: left;
                        font-size: 14px;
                        line-height: 30px;
                    }
                }
            }
            .right-content{
                width: 420px;
                height: 374px;
                border: 1px solid #e1e1e1;
                background-color: #ffffff;
                padding: 15px;
                p{
                   line-height: 374px;
                }
                .right-info{
                    li{
                        text-align: left;
                        font-size: 14px;
                        color: #999999;
                        line-height: 28px;
                        span{
                            color: #151515;
                        }
                    }
                }
                ol{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    padding-top:50px;
                    li{
                        text-align: left;
                        font-size: 14px;
                        color: #999999;
                        line-height: 28px;
                        width: 145px;
                        span{
                            color: #151515;
                        }
                    }
                }
            }
        }
    }
    .el-popper[x-placement^=bottom]{
            top: 123px !important;
            margin-top:0 !important;
        }
    .el-date-picker{
        width: 230px !important;
        line-height: 25px !important;
        .el-date-picker__header{
            margin: 10px 10px 5px 10px;
        }
        .el-picker-panel__content{
            width: 230px;
            margin: 0;
            .el-date-table td{
                padding: 0;
            }
        }
    }
</style>

