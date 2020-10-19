<template>
    <el-form-item :label-width="labelwidth" v-if="ui_type=='drop_box'" :label="label" prop="dynamic_select">
        <el-select prop="systemSelection" filterable placeholder="请选择" @change="_change(values)" v-model="values"><!--v-model="form.systemSelection" -->
            <el-option
                    v-for="item in candidates"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item :label-width="labelwidth" v-else-if="ui_type=='text_box'" :label="label" :prop="valid_prop" :rules="ruless"><!--:label-width="formLabelWidth" -->
        <el-input  @input="_change(values)" auto-complete="off" v-model="values" :placeholder="demonstration"></el-input>
    </el-form-item>
    <el-form-item v-else-if="ui_type=='trigger'" :label="label" prop="dynamic_trigger"><!--:label-width="formLabelWidth"-->
        <el-switch @change="_change(values)"
                   v-model="values"
                active-text="按月付费"
                inactive-text="按年付费">
        </el-switch>
    </el-form-item>
<!--    <el-form-item label="" prop=""v-else-if="ui_type=='dict'">&lt;!&ndash;:label-width="formLabelWidth"&ndash;&gt;-->
<!--        <el-collapse >&lt;!&ndash;@change="handleChange"&ndash;&gt;-->
<!--            <el-collapse-item title="" name="1" class="dynamic-form">-->
<!--                <el-form-item :label-width="labelwidth"  :label="label"-->
<!--                              :prop="valid_prop" :rules="ruless">&lt;!&ndash;:label-width="formLabelWidth" &ndash;&gt;-->
<!--                    <el-input @input="_change(values)" auto-complete="off" v-model="values"-->
<!--                              :placeholder="demonstration"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-collapse-item>-->
<!--        </el-collapse>-->
<!--    </el-form-item>-->
<!--    <el-form-item v-else-if="ui_type=='check_box'" :label="label" >&lt;!&ndash;:label-width="formLabelWidth"&ndash;&gt;-->
<!--        <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>-->
<!--        <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>-->
<!--    </el-form-item>-->
</template>

<script>
    export default {
        name: "dynamic_form",
        data () {
            return {
                options: [{'value': 888},{'value': 999}],
                values: this.modelbind,
                labelwidth: '150px'
            }
        },
        props: [
            'label',
            'ui_type',
            'default',
            'candidates',
            'value',
            'valid_prop',
            'ruless',
            'modelbind',
            'demonstration'
        ],
        methods: {
            _change (value) {
                // 这里触发事件后，手动执行 input 上面绑定的函数，并传入参数
                this.$emit('changeValue', value)
            }
        }
        // props: {
        //     label: String,
        //     ui_type: String,
        // },
    }
</script>

<style scoped>

</style>