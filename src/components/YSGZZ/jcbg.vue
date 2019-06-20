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
                            value-format='yyyy-MM-dd'
                            placeholder="选择日期">
                        </el-date-picker>
                        <label>~</label>
                        <el-date-picker
                            v-model="date1"
                            type="date"
                            value-format='yyyy-MM-dd'
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li><button class="query" @click='query'>查询</button></li>
                    <li><button class="gen">生成正文</button></li>
                </ol>
        </div>
        <div v-show='bol' class="noth">没有数据</div>
        <div class="modal-content" v-show='bool'>
            <div class="left-content" >
            	<template>
            		<ul class="left-info">
			        <li class="info-content" v-for="v in pagerData.data">
			            <div class="info-head">
			                <p>{{v.name}}</p>
			                <span @click='see(v)'><i class="el-icon-view"></i>查看</span>
			            </div>
			            <ul class="infos">
			                <li><span>检查科室：</span>{{v.depa}}</li>
			                <li><span>检查设备：</span>{{v.equi}}</li>
			                <li><span>检查部位：</span>{{v.posi}}</li>
			                <li><span>报告时间：</span>{{v.time}}</li>
			            </ul>
			        </li>
			    </ul>
            	</template>
            	
                <my-component v-on:show-page="getPageData" v-bind:pager-data="pagerData" v-show='bols'></my-component>
            </div>
            <div class="right-content">
                <p v-show='show'>没有数据</p>
                <ul class="right-info" v-show='shows'>
                    <li>临床诊断：<span>{{pacsre.LCZD}}</span></li>
                    <li>检查名称：<span>{{pacsre.JCXMMC}}</span></li>
                    <li>检查技术：<span>{{}}</span></li>
                    <li>影像表现：<span>{{pacsre.YXSJMS}}</span></li>
                    <li>影像诊断：<span>{{pacsre.YXZD}}。</span></li>
                </ul>
                <ol v-show=shows>
                    <li>报告医师：<span>{{pacsre.BGYSMC}}</span></li>
                    <li>报告日期：<span>{{pacsre.BGRQ}}</span></li>
                    <li>审核医师：<span>{{pacsre.SHYSMC}}</span></li>
                    <li>审核日期：<span>{{pacsre.SHSJ}}</span></li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script>
import pager from '../components/pagea.vue'
//import qs from 'qs'       
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
                date: new Date(),
                date1: new Date(),
                info:{
                    name: '张三',
                    sex: "男",
                    age: '26',
                    out: 'FZ00234'
                  },
                dataAll: [],
                pagerData: {
                 	data:[],
                 	  rows:[],
	                page:{
	                    pagesize: 3,   //设置分页个数
	                    pageCount: 1,		
	                    pageCurrent: 1,
	                    totalCount: 1
	                }
                },
                pacsre:[]
            }
        },
        created() {
            let self = this;
            self.date = self.dataFormat(new Date())
            self.date1 = self.dataFormat(new Date())
        },
        methods: {
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
				$.ajax({
					type:"post",
					url:"http://10.32.68.23:9000/api/MedicalTechnology/GetPacsReport",
					data:{
						starttime:this.date,
                		endtime:this.date1,
                		MaxResultCount:this.pagerData.page.pagesize
					},
					dataType:'json'
				}).done(function(data){
					if(data.Success){
						this.pagerData.rows=data.Result.Items;
						this.bol=false;
                   		this.bool=true;
					}
				}).fail(function(result){
					
				})
            },
            //查看
            see (v) {
                this.show=false;
                this.shows=true;
				var id=v.id;
                $.ajax({
						type:"post",
						url:"http://10.32.68.23:9000/api/MedicalTechnology/GetPacsDetailReport",
						data:{
							id:id
						},
						dataType:'json'
				}).done(function(data){
						if(data.Success){
							this.pacsre=data.Result.Items;
							this.bol=false;
                       		this.bool=true;
						}
					}).fail(function(result){
						
					})
            },
            getPageData: function (page) {
                this.pagerData.page.pagesize = page.pagesize;
                this.pagerData.page.pageCurrent = page.pageCurrent;
                this.pagerData.page.pageCount = Math.ceil(this.pagerData.page.totalCount / page.pagesize); //修改分页信息
                let newPageInfo = [];
                for (var i = 0; i< page.pagesize; i++) {
                    var index = i + (page.pageCurrent-1)*page.pagesize;
                    if(index > this.pagerData.page.totalCount -1)break;
                    newPageInfo[newPageInfo.length] = this.pagerData.rows[index];
                }
                this.pagerData.data = newPageInfo;  //修改分页数据
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

