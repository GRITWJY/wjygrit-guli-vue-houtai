<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <el-form-item label="讲师头像">
        <pan-thumb :image="teacher.avatar"/>
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '../../../api/edu/teacher'
import PanThumb from '../../../components/PanThumb'
import ImageCropper from '../../../components/ImageCropper'

export default {
  components: { PanThumb ,ImageCropper},
  data(){
    return{
      teacher:{
        name:'',
        sort:0,
        level:1,
        career:'',
        intro:'',
        avatar:''
      },
      saveBtnDisabled:false,
      imagecropperShow:false,
      imagecropperKey:0,
      BASE_API:process.env.BASE_API,

    }
  },
/*     */
  methods:{

    close(){
      this.imagecropperShow = false
      //上传组件初始化
      this.imagecropperKey += 1
    },

    //上传成功
    cropSuccess(data){
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      this.imagecropperKey += 1

    },

    init(){
      if (this.$route.params && this.$route.params.id){
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        this.teacher={}
      }
    },

    getInfo(id){
      teacherApi.getTeacherInfo(id).then(res=>{
        this.teacher = res.data.teacher
      })
    },

    saveOrUpdate(){

      if(this.teacher.id){
        this.updateTeacher()
      } else {
        this.saveTeacher()
      }

    },
    //添加讲师方法
    saveTeacher(){
      teacherApi.addTeacher(this.teacher)
        .then(res=>{
          //提示信息
          this.$message({
            type:'success',
            message:'添加成功'
          })
          //回到列表页面
          this.$router.push({path:'/teacher/table'})
        })
    },

    updateTeacher(){
      teacherApi.updateTeacherInfo(this.teacher).then(res=>{
        this.$message({
          type:'success',
          message:"修改成功"
        })
        this.$router.push({path:'/teacher/table'})
      })
    }
  },
/*    */
  created() {
    this.init()
  },
  watch:{
    $route(to,from){//路由变化方式
      this.init()
    }
  },
}
</script>

<style scoped>

</style>
