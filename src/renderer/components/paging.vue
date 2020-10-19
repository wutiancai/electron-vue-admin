<template id="pagination">
    <!-- 分页 start -->
    <div class="block pagination_box mt">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1,5,10, 20, 50, 100,200]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
    <!-- 分页 end -->
</template>

<script>
    export default {
        name: "paging",
        props:["currentPage","total"],
        data:function(){
            return{
                // total:this.total,
                // currentPage:this.currentPage
            }
        },
        methods:{
            handleSizeChange:function(val){
                this.$emit('size-change',val)
            },
            handleCurrentChange:function(val){
                this.$emit('current-change',val)
            }
        }

    }
</script>

<style scoped>

</style>