<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item :label="label">
                <el-col :span="12">
                    <el-input v-model="form.path" > </el-input>
                </el-col>
                <el-button @click.prevent="dialogFormVisible = true">选择</el-button>
            </el-form-item>

        </el-form>
        <el-dialog title="path" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item>
                    <el-tree
                            v-show="dialogFormVisible"
                            :props="props"
                            :load="loadNode"
                            ref="tree"
                            node-key="path"
                            :check-strictly=true
                            @check-change="handleClick"
                            lazy
                            show-checkbox>
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;showChecked()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['label', 'load','v_model'],
        data() {
            return {
                dialogFormVisible: false,
                label: this.label,
                form: {
                    path: ''
                },
                props: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
            }
        },
        methods: {
            loadNode(node, resolve) {
                // this.$emit("loadNode")
                return this.load(node, resolve)
            },
            handleClick(data, checked, node) {
                if (checked) {
                    console.log(data)
                    let arr = [data.path];
                    this.$refs.tree.setCheckedKeys(arr);
                    // this.$refs.tree.setCheckedNodes([]);
                    // this.$refs.tree.setCheckedNodes([data]);
                    //交叉点击节点
                } else {
                    // this.$refs.tree.setCheckedNodes([]);
                    //点击已经选中的节点，置空
                }
            },

            showChecked () {
                const checks = this.$refs.tree.getCheckedNodes()
                console.log(checks)
                this.form.path = checks[0].path
                this.$emit("update:v_model", this.form.path);
            }
        }
    }
</script>

<style scoped>
    .line {
        text-align: center;
    }
</style>

