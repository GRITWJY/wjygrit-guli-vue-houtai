<template>
  <div class="app-container">
    <el-upload
      ref="upload"
      :auto-upload="false"
      :on-success="fileUploadSuccess"
      :on-error="fileUploadError"
      :disabled="importBtnDisabled"
      :limit="1"
      :action="BASE_API + '/eduservice/subject/addSubject'"
      name="file"
      accept="application/vnd.ms-excel">
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <el-button
          :loading="loading"
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data(){
    return{
      BASE_API:process.env.BASE_API,
      importBtnDisabled:false,
      loading:false,


    }
  },
  created() {
  },
  methods:{
    //上传
    submitUpload(){
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()


    },
    fileUploadSuccess(){
      this.loading = false
      this.$message({
        type:"success",
        message:"添加课程分类成功"
      })

      this.$route.push({path:"subject/list"})

    },
    fileUploadError(){
      this.loading = false
      this.$message({
        type:"error",
        message:"添加课程分类失败"
      })
    }
  }
}
</script>
<style scoped>

</style>
