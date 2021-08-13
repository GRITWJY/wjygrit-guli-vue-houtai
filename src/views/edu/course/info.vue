<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程名称">
        <el-input v-model="courseInfo.title" placeholder="示例:机器学习项目课程"></el-input>
      </el-form-item>

      <el-form-item label="讲师选择">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
          v-for="teacher in teacherList"
          :key="teacher.id"
          :label="teacher.name"
          :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <el-select
          v-model="courseInfo.subjectId"
          placeholder="请选择二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"></el-input-number>
      </el-form-item>


      <el-form-item label="课程简介">
        <Tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader">
          <img :src="courseInfo.cover" style="width: 100%">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import courseApi from '../../../api/edu/course'
import subjectApi from '../../../api/edu/subject'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data(){
    return{
      saveBtnDisabled:false,
      courseInfo:{
        title:'',
        subjectId:'',
        subjectParentId:'',
        teacherId:'',
        lessonNum:0,
        description:'',
        cover:'/static/ASbg.jpg',
        price:0
      },
      teacherList:[],
      subjectOneList:[],
      subjectTwoList:[],
      BASE_API:process.env.BASE_API,
      courseId:'',
    }
  },
  created() {
    if (this.$route.params.id && this.$route.params) {
      this.courseId = this.$route.params.id
      this.getInfo();
      this.getListTeacher()
    } else {
      this.getListTeacher()
      this.getOneSubject()
    }
  },
  watch:{
    $route(to,from){//路由变化方式
      if (this.$route.params.id && this.$route.params) {
        this.courseId = this.$route.params.id
        this.getInfo();
        this.getListTeacher()
      } else {
        this.courseInfo = {}
        this.getListTeacher()
        this.getOneSubject()
      }
    }
  },
  methods:{
    //根据课程id查询信息
    getInfo(){
      courseApi.getCouseInfoId(this.courseId)
        .then(res=>{
          this.courseInfo = res.data.courseInfoVo;
          //回显显示二级数组
          //1.查询所有的分类,包含一级二级
          subjectApi.getSubjectList()
            .then(res=>{
              //2.获取所有一级分类
              this.subjectOneList = res.data.list

              //3.遍历所有一级分类
              for (var i=0;i<this.subjectOneList.length;i++){
                var onesub = this.subjectOneList[i];
                if (this.courseInfo.subjectParentId === onesub.id){
                  this.subjectTwoList = onesub.children
                }
              }

            })
        })
    },
    handleAvatarSuccess(res, file){
      this.courseInfo.cover = res.data.url
    },
    beforeAvatarUpload(file){
      const isLt2M = file.size /1024 /1024 < 2

      if (!isLt2M){
        this.$message.error('上传图片不能超过2M')
      }
      return isLt2M
    },
    subjectLevelOneChanged(value){
      this.courseInfo.subjectId = ''
      for (let i=0; i<this.subjectOneList.length;i++){
        var oneSubject = this.subjectOneList[i]
        if (value === oneSubject.id){
          this.subjectTwoList = oneSubject.children
        }
      }
    },
    getOneSubject(){
      subjectApi.getSubjectList()
        .then(res=>{
          this.subjectOneList= res.data.list
        })
    },

    addCourse(){
      courseApi.addCourseInfo(this.courseInfo)
        .then(res=>{
          //提示
          this.$message({
            type:"success",
            message:"添加课程信息成功"
          })
          //跳转
          this.$router.push({path:"/course/chapter/"+res.data.courseID})
        })
    },
    updateCourse(){
      courseApi.updateCourseInfo(this.courseInfo)
        .then(res=>{
          //提示
          this.$message({
            type:"success",
            message:"添加课程信息成功"
          })
          //跳转
          this.$router.push({path:"/course/chapter/"+this.courseId})
        })
    },

    saveOrUpdate(){
      if (!this.courseInfo.id){
        this.addCourse()
      } else {
        this.updateCourse()
      }
    },
    getListTeacher() {
      courseApi.getListTeacher()
        .then(res=>{
          this.teacherList = res.data.items
        })
    }
  }
}
</script>

<style scoped>
.tinymce-container{
  line-height: 29px;
}

</style>
