<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>

    <el-form label-width="120px">

      <ul class="chanpterList">
        <li
          v-for="chapter in chapterVideoList"
          :key="chapter.id"
        >
          <p>
            {{ chapter.title }}
            <span class="acts">
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
                <span class="acts">
                  <el-button type="text" @click="openEditVideo(video.id)">编辑</el-button>
                                  <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                              </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>


      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapterApi from '../../../api/edu/chapter'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      chapterVideoList: []
    }
  },
  created() {
    if (this.$route.params.id && this.$route.params) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {

    getChapterVideo() {
      chapterApi.getAllChapterVideo(this.courseId)
        .then(res => {
          this.chapterVideoList = res.data.allChapterVideo
        })
    },

    previous() {
      this.$router.push({ path: '/course/info/1' })
    },
    next() {
      this.$router.push({ path: '/course/publish/1' })
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
