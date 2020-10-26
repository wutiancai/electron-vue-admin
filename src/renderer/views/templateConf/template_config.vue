<template>
    <div class="app-container">
        <!--        <el-main>-->
        <el-row :gutter="10">
            <el-col>
                <div class="grid-content bg-purple">
                    <el-button
                            size="medium "
                            icon="el-icon-edit" class="table-opt-font" type="text" title="编辑">
                    </el-button>
                    <span>加载模板成功,模板路径为D:/aaa/bbb/ccc.xml</span>
                </div>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="流程管理" name="first">
                <el-row :gutter="0" id="box">
                    <el-col :span="18" id="left">
                        <el-col :span="10">
                            <div class="card-header">
                                工具箱
                            </div>
                            <div class="horizon_layout">
 <el-tree
                            :data="treeData1"
                            ref="tree1"
                            class="tree"
                            node-key="id"
                            draggable
                            default-expand-all
                            :allow-drop="returnFalse"
                            @node-drag-start="handleDragstart"
                            @node-drag-end="handleDragend"
                    ></el-tree>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="card-header" style="position:relative">
                                <div>
                                    <span>流程栏</span>

                                </div>
                            </div>
                            <div class="horizon_layout">
  <el-tree
                                :data="treeData2"
                                ref="tree2"
                                class="tree"
                                node-key="id"
                                draggable
                                default-expand-all
                                :allow-drop="returnTrue"
                        >
                        </el-tree>
                            </div>
                        </el-col>
                    </el-col>

                    <el-col :span="6" id="right">
                        <div class="card-header">
                            属性编辑
                        </div>
                        <div id="resize"></div>
                        <div class="horizon_layout">

                        </div>
                    </el-col>
                </el-row>
                <div class="tree-drag">



<!--                    <div class="treewrapper">-->
<!--                        <div class="card-header" style="position:relative">-->
<!--                            <div>-->
<!--                                <span>属性编辑</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>

            </el-tab-pane>
            <el-tab-pane label="图像源" name="second">
                <el-row class="tac">
                    <el-col :span="6">
                        <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose">
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">s1v1</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-setting"></i>
                                <span slot="title">s2v2</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :span="18">
                        <img id="templateImg" src="D:\tools\jQueryLogin\img\Starry.jpg"/>
                    </el-col>
                </el-row>

            </el-tab-pane>
        </el-tabs>
        <!--        </el-main>-->
    </div>
</template>

<script>
    export default {
        name: "template_config",
        data() {
            return {
                treeData1: [{
                    id: 1,
                    label: "一级 1",
                    children: [{
                        id: 4,
                        label: "二级 1-1",
                        children: [{id: 9, label: "三级 1-1-1"}]
                    }],
                }],
                treeData2: [{
                    id: 2,
                    label: "一级 1",

                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {

            handleDragstart(node, event) {
                this.$refs.tree2.$emit('tree-node-drag-start', event, {node: node});
            },
            handleDragend(draggingNode, endNode, position, event) {
                // 插入一个空节点用于占位
                let emptyData = {id: (+new Date), children: []};
                this.$refs.tree1.insertBefore(emptyData, draggingNode);

                this.$refs.tree2.$emit('tree-node-drag-end', event);
                this.$nextTick(() => {
                    // 如果是移动到了当前树上，需要清掉空节点
                    if (this.$refs.tree1.getNode(draggingNode.data)) {
                        this.$refs.tree1.remove(emptyData);
                    } else {
                        // 如果移动到了别的树上，需要恢复该节点，并清掉空节点
                        let data = JSON.parse(JSON.stringify(draggingNode.data));
                        this.$refs.tree1.insertAfter(data, this.$refs.tree1.getNode(emptyData));
                        this.$refs.tree1.remove(emptyData);
                    }
                })
            },
            returnTrue() {
                return true;
            },
            returnFalse() {
                return false;
            }
        },
        beforeCreate() {

        },
        mounted() {
            $("#templateImg").height(document.body.scrollHeight - 160);
            window.onresize = () => {
                $("#templateImg").height(document.body.clientHeight - 160);
            };
        }

    }
</script>

<style scoped>
    /*.treewrapper {*/
    /*    display: inline-block;*/
    /*    vertical-align: top;*/
    /*    width: 33%;*/
    /*    height: 440px;*/
    /*    border: 1.2px solid #E4E7ED;*/
    /*}*/
    .tree {
        display: inline-block;
        vertical-align: top;
         /*width: 100%;*/
        /*border-left: 1px solid #E4E7ED;*/
        /*border-right: 1px solid #E4E7ED;*/
    }
</style>