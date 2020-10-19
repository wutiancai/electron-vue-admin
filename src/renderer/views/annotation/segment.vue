<template>
    <div class="app-container">
        <el-form :inline="false" class="demo-form-inline">
            <el-form-item label="选择标注文件">
                <el-row :gutter="10">
                    <el-col :span="8">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input"
                               @change="changeFile($event)"
                               id="customFile">
                        <label class="custom-file-label" for="customFile">choose file</label>
                    </div>

                </el-col>
                <el-col :span="6">
                    <span>'.bmp', '.jpg', '.jpeg'</span>
                </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="标注类别">
                <el-select v-model="form.is_multi" placeholder="please select your zone">
                    <el-option label="多类" value="1" />
                    <el-option label="单类" value="0" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="onSubmit">开始标注</el-button>
            </el-form-item>
        </el-form>
    </div>

    <!--    <el-row :gutter="12" >-->
    <!--        <el-col :span="12">-->
    <!--            <div class="custom-file">-->
    <!--                <input type="file" class="custom-file-input"-->
    <!--                       @change="changeFile($event);detectionFiles[index] = getFilesURL($event.target.files)"-->
    <!--                       id="customFile" webkitdirectory>-->
    <!--                <label class="custom-file-label" for="customFile">choose file</label>-->
    <!--            </div>-->
    <!--        </el-col>-->
    <!--    </el-row>-->
</template>

<script>
    import $ from "jquery";
    import api from '@/api/public_api'
    export default {
        name: "segment",
        data () {
            return {
                form: {
                    filename: '',
                is_multi: '1'//0是false,1是true
                }
            }
        },
        methods: {
            getFilesURL(files) {
                console.log(files)
                if (files.length === 0) {
                    return ""
                }
                return files[0].path.replace(files[0].name, "");
            },
            changeFile(e, type) {
                let dir = this.getFilesURL(e.target.files)
                let dirs = dir.split(dir.substr(dir.length - 1, 1))
                $(e.target).next().text(dirs[dirs.length - 2])
                this.form.filename = dir + e.target.files[0].name
            },
            onSubmit () {
                console.log(this.form.filename)
                api.annotation_segment(this.form).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>

</style>