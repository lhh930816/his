<template>
	<div id="divBody">
		<div id="divTitle">
			<label>检验报告</label>
			<i class="iconfont icon-guanbi"></i>
		</div>
		<div id="divTop">
			<label>{{name}}</label>
			<label>{{sex}}</label>
			<label>{{age}}岁</label>
			<label>{{mzh}}：{{mzbh}}</label>
			<el-date-picker v-model="startTime"	type="date"	value-format='yyyy-MM-dd' placeholder="选择日期">
			</el-date-picker>~
			<el-date-picker v-model="endTime" type="date" value-format='yyyy-MM-dd' placeholder="选择日期">
			</el-date-picker>
			<button class="btn" v-on:click="ready">查询</button>
		</div>
		<div v-show='centerbol' class="noth">没有数据</div>
		<div id="divCenter" v-show="bol">
			<ul id="ulLeft">
				<el-table ref="multipleTablea" :data="pagerData.data" stripe>
					<el-table-column label="操作">
						<template slot-scope='scope'>
							<span @click="see(scope.row)"><i class="el-icon-view"></i>查看</span>	
						</template>
					</el-table-column>
					<el-table-column prop="XMMC" label="名称">
					</el-table-column>
					<el-table-column prop="datea" label="日期">
					</el-table-column>
				</el-table>
			</ul>
			<ul id="ulRight" v-show="bool">
				<li>
					<template >
						<el-table ref="multipleTable" :data="rightValue" 
							@selection-change="handleSelectionChange" border
							stripe>
							<el-table-column type="selection" width="40">
							</el-table-column>
							<el-table-column prop="HYMC" label="指标名称">
						    </el-table-column>
						    <el-table-column prop="JG" label="检验结果">
						    </el-table-column>
						    <el-table-column prop="YCBS" label="高低指标">
						    </el-table-column>
						    <el-table-column prop="CKZ" label="参考范围">
						    </el-table-column>
						    <el-table-column prop="DW" label="参考单位">
						    </el-table-column>
						</el-table>
					</template>
				</li>
				<li>
					<p>{{txt}}</p>					
				</li>
			</ul>
		</div>
		<div id="divFoot" v-show="bol">
			<my-component v-on:show-page="getPageData" v-bind:pager-data="pagerData"></my-component>
		</div>		
	</div>
</template>
	
<script>
	import pager from './page';
	export default {
	    name: 'Jybg',
		components: {
				'my-component':pager
		},
	    data () {
	    return {
	        name:'张三',
	        sex:'男',
	        age:'26',
	        mzh:'门诊(住院)号',
	        mzbh:'FZ00234',
	        dataAll:[],
	        multipleSelection:[],
	        multipleSelectiona:[],
	        txt: '',
	        centerbol:true,
	        bol:false,
	        bool:false,
	        leftValue:[],
	        pagerData:{ 
				page:{
					pagesize:10,
					pageCurrent:1,
					totalCount:1
				},
		        data:[
		        	{name:'xi'},
		        	{name:'l'}
		        ]
		    },
	        rightValue:[],
			startTime:new Date(),
			endTime:new Date()
			}
	    },
        created() {
//      	时间初始化
            let self = this;
            self.date = self.dataFormat(new Date())
            self.date1 = self.dataFormat(new Date())
        },
        methods: {
//      	时间初始化
        	dataFormat(time){
                return `${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}`;
            },
        	see(row){
//      		点击小眼睛图标查询明细数据
        		console.log(row.name)
        		this.bool=true;
        		var id=row.name;
        		$.ajax({
					type:"post",
					url:"http://10.32.68.23:9000/api/MedicalTechnology/GetLisDetailReport",
					data:{
						id:id
					},
					dataType:'json'
				}).done(function(data){
					if(data.Success){
						this.rightValue.rows=data.Result.Items;
                   		this.bool=true;
					}
				}).fail(function(result){
					
				})
        	},
//      	分页查询控件
	       	getPageData: function (page) {
				this.pagerData.page.pagesize = page.pagesize;
				this.pagerData.page.pageCurrent = page.pageCurrent;
				this.pagerData.page.pageCount = Math.ceil(this.pagerData.page.totalCount / page.pagesize);// 修改分页信息
				var newPageInfo = [];
	            for (var i = 0; i < page.pagesize; i++) {
				var index =i+(page.pageCurrent-1)*page.pagesize;
				if(index>this.pagerData.page.totalCount-1)break;
	                    newPageInfo[newPageInfo.length] = this.leftValue[index];
	                }
	                this.pagerData.data = newPageInfo; // 修改分页数据
	                console.log(this.pagerData.data)
			},
//			根据时间查询整体数据
			ready:function(){
				this.pagerData.page.totalCount = this.leftValue.length;
				this.getPageData(this.pagerData.page);
				this.centerbol=false;
				this.bol=true;	       	
				this.rightValue=this.data;
				console.log(this.rightValue)
	       		$.ajax({
					type:"post",
					url:"http://10.32.68.23:9000/api/MedicalTechnology/GetLisReport",
					data:{
						starttime:this.date,
                		endtime:this.date1,
                		MaxResultCount:this.pagerData.page.pagesize
					},
					dataType:'json'
				}).done(function(data){
					if(data.Success){
						this.leftValue.rows=data.Result.Items;
						this.bol=true;
					}
				}).fail(function(result){
					
				})
			},
//			获取一行明细数据
			toggleSelection(rows){
				if(rows){
					rows.forEach(row=>{
						this.$refs.multipletable.toggleRowSelection(row);
					})
				}
			},
//			将明细数据追加
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		        var _zbmc="";			//指标名称
				var _jyjg="";			//检验结果
				var _gdzb="";			//高低指标
				var _ckfw="";			//参考范围
				var _ckdw="";			//参考单位
				var _append="";			//一行零散的数据追加成一整行
				var _ergodic="";		//遍历所有数据为一行
		        for(var i=0;i<this.multipleSelection.length;i++){			        
			        _zbmc="指标名称："+this.multipleSelection[i].zbmc;
					_jyjg=" 检验结果："+this.multipleSelection[i].jyjg;
					_gdzb=" 高低指标："+this.multipleSelection[i].gdzb;
					_ckfw=" 参考范围："+this.multipleSelection[i].ckfw;
					_ckdw=" 参考单位："+this.multipleSelection[i].ckdw;
					_append=_zbmc+_jyjg+_gdzb+_ckfw+_ckdw;
					_ergodic=_ergodic+_append;
		        }
		        this.txt = _ergodic;
		  	}
        }
	}
</script>

<style>
	@import '../assets/css/iconfont.css';
	
</style>