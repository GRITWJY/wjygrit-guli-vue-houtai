import request from '../../utils/request'
export default {

  getAllChapterVideo(courseId) {
    return request({
      url: '/eduservice/chapter/getChapterVideo/'+courseId,
      method: 'get'
    })
  },

  addChapterInfo(chapter){
    return request({
      url:'/eduservice/chapter/addChapterInfo',
      method:'post',
      data:chapter
    })
  },

  //根据id查询章节
  getChapterInfo(chapterId){
    return request({
      url:'/eduservice/chapter/getChapterInfo/' + chapterId,
      method:'get'
    })
  },

  updateChapterInfo(chapter){
    return request({
      url:'/eduservice/chapter/updateChapterInfo',
      method:'post',
      data:chapter
    })
  },

  deleteChapter(chapterId){
    return request({
      url:'/eduservice/chapter/' + chapterId,
      method:'delete'
    })
  },


}
