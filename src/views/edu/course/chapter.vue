<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>

    <el-form label-width="120px">

      <el-button type="text" @click="opendDialog">添加章节</el-button>
      <ul class="chanpterList">
        <li
          v-for="chapter in chapterVideoList"
          :key="chapter.id">
          <p>
            {{ chapter.title }}
            <span style="float:right; z-index: 999;position: relative">
              <el-button type="text" @click="OpenVideo(chapter.id)">添加小节</el-button>
              <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
              <el-button type="text" @click="remove(chapter.id)">删除</el-button>
            </span>
          </p>
          <!-- 视频 -->
          <ul class="chanpterList videoList">
            <li
              v-for="video in chapter.children"
              :key="video.id"
            >
              <p>{{ video.title }}
                <span style="float:right; z-index: 999;position: relative">
                  <el-button type="text" @click="openEditVideo(video.id)">编辑</el-button>
                  <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <div>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </div>
    </el-form>

    <el-dialog :visible.sync="dialogChaterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-button @click="dialogChaterFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确定</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAlyVideo'"
            :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button  type="primary" @click="saveOrUpdateVideo">确 定</el-button>
        <!-- :disabled="saveVideoBtnDisabled" -->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import chapterApi from '../../../api/edu/chapter'
import videoApi from '../../../api/edu/video'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      chapterVideoList: [],
      BASE_API:process.env.BASE_API,
      dialogChaterFormVisible:false,
      dialogVideoFormVisible:false,
      fileList:[],
      chapter:{
        title:'',
        sort:0,
      },
      video:{
        title:'',
        sort:0,
        isFree:0,
        videoSourceId:'',
        videoOriginalName:'',
      },
    }
  },
  created() {
    if (this.$route.params.id && this.$route.params) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {

    handleVodRemove(){
      videoApi.deleteAliyun(this.video.videoSourceId).then(res=>{
        this.$message({
          type: 'success',
          message: '删除视频成功!'
        });
        this.fileList=[]
        this.video.videoSourceId=""
        this.video.videoOriginalName=""
      })
    },
    beforeVodRemove(file){
      return this.$confirm(`确定移除${file.name}?`)
    },
    handleVodUploadSuccess(res,file){
      this.video.videoSourceId=res.data.videoId
      this.video.videoOriginalName=file.name
    },
    handleUploadExceed(){
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },

    removeVideo(videoId){
      this.$confirm('此操作将删除小节,是否继续','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      })
        .then(()=>{
          videoApi.deleteChapter(videoId)
            .then(res=>{
              this.$message({
                type:'success',
                message:'删除成功'
              })
              this.getChapterVideo();
            })
        })
    },

    openEditVideo(videoId){
      this.dialogVideoFormVisible = true
      videoApi.getVideo(videoId)
        .then(res=>{
          this.video = res.data.video
        })
    },

    addVideo(){
      //课程id
      this.video.courseId = this.courseId
      videoApi.addVideo(this.video)
        .then(res=>{
          this.dialogVideoFormVisible = false
          this.$message({
            type:'success',
            message:'添加成功'
          })
          this.getChapterVideo()
        })
    },
    updateVideo(){
      videoApi.updateChapterInfo(this.video)
        .then(res=>{
          this.dialogVideoFormVisible = false
          this.$message({
            type:'success',
            message:'修改成功'
          })
          this.getChapterVideo()
        })
    },

    saveOrUpdateVideo(){
      if (this.video.id){
        this.updateVideo()
      } else {
        this.addVideo()
      }
    },

    OpenVideo(chapterId){
      this.video = {}
      this.dialogVideoFormVisible = true
      //设置章节id
      this.video.chapterId = chapterId
    },

//================================章节===============================//


    remove(chapterId){

          this.$confirm('此操作将删除章节,是否继续','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
          })
            .then(()=>{
               chapterApi.deleteChapter(chapterId)
                 .then(res=>{
                  this.$message({
                    type:'success',
                    message:'删除成功'
                  })
                   this.getChapterVideo();
                })
            })

    },

    openEditChapter(chapterId){
      this.dialogChaterFormVisible = true
      chapterApi.getChapterInfo(chapterId)
        .then(res=>{
          this.chapter = res.data.chapter
        })
    },

    opendDialog(){
      this.dialogChaterFormVisible = true
      this.chapter.title=''
      this.chapter.sort=0
    },

    addChapter(){
      this.chapter.courseId = this.courseId
      chapterApi.addChapterInfo(this.chapter)
        .then(res=>{
          this.dialogChaterFormVisible = false
          this.$message({
            type:"success",
            message:"添加成功"
          })
          this.getChapterVideo()
        })
    },

    updateChapter(){
      chapterApi.updateChapterInfo(this.chapter)
        .then(res=>{
          this.$message({
            type:"success",
            message:"添加成功"
          })
          this.dialogChaterFormVisible = false
          this.getChapterVideo()
        })
    },

    saveOrUpdate(){
      if (this.chapter.id) {
        this.updateChapter()

      } else {
        this.addChapter()
      }
    },

    getChapterVideo() {
      chapterApi.getAllChapterVideo(this.courseId)
        .then(res => {
          this.chapterVideoList = res.data.allChapterVideo
        })
    },

    previous() {
      this.$router.push({ path: '/course/info/'+this.courseId })
    },
    next() {
      this.$router.push({ path: '/course/publish/' + this.courseId })
    }
  }
}
</script>


<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
