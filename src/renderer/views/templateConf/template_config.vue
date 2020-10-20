<template>
    <div class="app-container">
        <!--        <el-main>-->
        <el-row :gutter="10">
            <el-col>
                <div class="grid-content bg-purple">
                    <span>加载模板成功,模板路径为D:/aaa/bbb/ccc.xml</span>
                </div>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="流程管理" name="first">用户管理</el-tab-pane>
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
            return {}
        },
        beforeCreate () {

        },
        mounted() {
            $("#templateImg").height(document.body.scrollHeight-160);
             window.onresize = () => {
                $("#templateImg").height(document.body.clientHeight-160);
            };
        }

    }
</script>

<style scoped>

</style>