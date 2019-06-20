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
                        <input type="text" class="Wdate" value="2018-10-28">
                        <label>~</label>
                        <input type="text" class="Wdate" value="2018-10-28">
                    </li>
                    <li><button class="query">查询</button></li>
                </ol>
        </div>
        <div class="modal-content">
            <div class="left-content">
                 <el-table
                    :data="tableData"
                    stripe >
                    <el-table-column
                    label="操作"
                    align='center'>
                    <template slot-scope="scope">
                        <el-button type="text" size="small">
                            <i class="el-icon-view"></i>查看
                        </el-button>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="日期"
                    align='center'>
                    </el-table-column>
                </el-table>
            </div>
            <div class="right-content">
                <div class="table-info">
                    <el-table
                    border
                    ref="multipleTable"
                    :data="tabData"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    stripe>
                    <el-table-column
                    type="selection"
                    align="center"
                    fixed>
                    </el-table-column>
                    <el-table-column
                    prop='name'
                    label="指标名称"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="result"
                    label="检验结果"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="high"
                    label="高低指标"
                    show-overflow-tooltip
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="range"
                    label="参考范围"
                    show-overflow-tooltip
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="company"
                    label="参考单位"
                    show-overflow-tooltip
                    align="center">
                    </el-table-column>
                    </el-table>
                </div>
                <div class="detail-info">
                    <p>指标名称:白细胞计数  检测结果:6.48  高低标志:正常  参考范围:4-10 参考单位:10^9/L
                    指标名称:大血小板比率  检测结果:43.10  高低标志:↑  参考范围:13-43 参考单位:%
                    指标名称:血红蛋白浓度  检测结果:109  高低标志:↓  参考范围:110-170 参考单位:g/L
                    </p>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="page">
                    <ul class="pages">
                        <li><i class="el-icon-d-arrow-left"></i></li>
                        <li><i class="el-icon-arrow-left"></i></li>
                        <li class="nume"><input type="text" ></li>
                        <li class="page-total">/ <span>3</span></li>
                        <li><i class="el-icon-arrow-right"></i></li>
                        <li><i class="el-icon-d-arrow-right"></i></li>
                    </ul>
                    <p>1到3条，共3条</p>
                </div>
     </div>    
</template>
<script>
    export default {
        data () {
            return {
                title: '检验报告',
                 tableData: [{
                    name: '血常规',
                    date: '2018.10.12',
                    },
                    {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                     {
                    name: '血常规',
                    date: '2018.10.12',
                    },
                    {
                    name: '血常规',
                    date: '2018.10.12',
                }],
                tabData:[{
                    name: "  白细胞计数",
                    result: 6.48,
                    high: '正常',
                    range: '4-10',
                    company: '10^9/L'
                },
                {
                    name: "大血小板比率",
                    result: 43.10,
                    high: '↑',
                    range: '13-43',
                    company: '%'
                },
                {
                    name: "血红蛋白浓度",
                    result: 109,
                    high: '↓',
                    range: '110-170',
                    company: 'g/L'
                }]
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
                    input{
                        width: 120px;
                        line-height: 21px;
                        padding-left: 5px;
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
        .modal-content{
            padding: 0 15px;
            overflow: hidden;
            .left-content{
                width: 300px;
                border: 1px solid #e1e1e1;
                float: left;
                .el-table th{
                    padding: 5px 0;
                    background: #f8f8f8;
                }
                .el-table td{
                    padding: 1px 0;
                    .el-button--text{
                        color: #1BAEBB;
                    }
                    i{
                        font-size:14px;
                        vertical-align: middle;
                        color: #1BAEBB;
                        cursor: pointer;
                        padding-right: 5px;
                    }
                }
            }
            .right-content{
                width: 550px;
                float: right;
                height: 404px;
                .table-info{
                    height: 300px;
                     .el-table th{
                    padding: 5px 0;
                    background: #f8f8f8;
                    }
                    .el-table td{
                        padding:1px 0;
                        .cell{
                            font-size:12px;
                        }
                    }
                }
                .detail-info{
                    width: 548px;
                    height: 104px;
                    border: 1px solid #e1e1e1;
                    background-color: #ffffff;
                    p{
                        font-size: 12px;
                        padding:10px 10px;
                        text-align: left;
                    }
                }
            }
        }
         .page{
                overflow: hidden;
                padding-top: 15px;
                padding-left: 15px;
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
                    background: #e1e1e1;
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
</style>
