<template>
    <div class="app-container">
        <el-col :span="11">
            <el-card class="box-card" style="height: 698px">
                <el-form :inline="false" :model="formInline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click="onSubmit">导入配置</el-button>
                        <el-button size="small" type="primary" @click="onSubmit">添加父分类</el-button>
                        <el-button size="small" type="primary" @click="onSubmit">添加分类</el-button>
                        <el-checkbox label="是否流出所有缺陷" name="type"></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="onSubmit">导出配置</el-button>
                        <el-button size="small" type="primary" @click="onSubmit">删除父分类</el-button>
                        <el-button size="small" type="primary" @click="onSubmit">删除分类</el-button>
                        <el-button size="small" type="primary" @click="onSubmit">流出单个算子缺陷</el-button>
                        <el-checkbox label="字符NG" name="type"></el-checkbox>
                    </el-form-item>
                </el-form>
                 <el-alert
    title="消息提示"
    type="info"
    description="添加完分类后,点击分类,在右侧对该分类进行筛选条件的配置"
    show-icon>
  </el-alert>
                <el-tree
                        :props="props"
                        :load="loadNode"
                        lazy
                        show-checkbox
                        @check-change="handleCheckChange">
                </el-tree>
            </el-card>
        </el-col>
        <el-col :span="13">
            <el-card class="box-card" style="height: 698px">
                <el-form :inline="true" :model="formInline">
                    <el-form-item>
                        <el-form-item label="算子流程号">
                            <el-input size="small" v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item label="缺陷特征通道">
                            <el-select size="small" v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>


                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="onSubmit">添加筛选条件</el-button>
                        <el-button size="small" type="primary" @click="onSubmit">删除筛选条件</el-button>
                    </el-form-item>
                </el-form>
                <!--                <div class="table-tr-opt">-->
                <!--                    <el-button type="text" slot="reference" icon="el-icon-plus">添加</el-button>-->
                <!--                    <el-button type="text" slot="reference" icon="el-icon-delete">删除</el-button>-->

                <!--                </div>-->
                <el-table
                        :data="tableData"
                        height="250"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="num"
                            label="编号"
                            width="50"
                    ></el-table-column>

                    <el-table-column
                            prop="date"
                            label="属性"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="最小值"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="最大值"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="通道">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="流程号">
                    </el-table-column>
                </el-table>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>缺陷等级与筛选条件</span>
                        <el-button style="float: right; padding: 3px 0" type="text">提交筛选条件</el-button>
                        <!--                        <el-button size="mini" style=""type="primary" icon="el-icon-bottom" circle></el-button>-->
                    </div>
                    <el-form :inline="false" :model="formInline" label-width="" label-position="left">
                        <el-form-item>
                            <el-form-item label="等级">
                                <el-radio-group v-model="formInline.region">
                                    <el-radio label="1"></el-radio>
                                    <el-radio label="2"></el-radio>
                                    <el-radio label="3"></el-radio>
                                    <el-radio label="4"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="逻辑运算符">
                                <el-button size="mini" plain>( )</el-button>
                                <el-button size="mini" plain>&&</el-button>
                                <el-button size="mini" plain>||</el-button>
                                <el-button size="mini" plain>!</el-button>
                            </el-form-item>
                            <el-col :span="18">
                                <el-form-item label="判断条件" label-width="82px">
                                    <el-input type="textarea" placeholder="请输入判断条件"
                                              v-model="formInline.user"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-button size="mini" style="margin-left: 8px" type="primary" title="自动填充" icon="el-icon-back"
                                       circle></el-button>
                            <!--                            <el-col :span="6">-->
                            <!--                                <el-button size="mini">提交筛选条件</el-button>-->
                            <!--                            </el-col>-->


                        </el-form-item>

                    </el-form>
                </el-card>
            </el-card>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "defect_conf",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                tableData: [{
                    num: 1,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市'
                }, {
                    num: 2,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市'
                }, {
                    num: 3,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市'
                }, {
                    num: 4,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市'
                }, {
                    num: 5,
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市'
                }]
            };
        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{name: 'region1'}, {name: 'region2'}]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                    hasChild = true;
                } else if (node.data.name === 'region2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                    var data;
                    if (hasChild) {
                        data = [{
                            name: 'zone' + this.count++
                        }, {
                            name: 'zone' + this.count++
                        }];
                    } else {
                        data = [];
                    }

                    resolve(data);
                }, 500);
            }
        }
    }
</script>

<style scoped>

</style>