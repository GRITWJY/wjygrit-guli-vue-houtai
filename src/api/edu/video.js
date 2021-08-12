import request from '../../utils/request'
export default {
  addVideo(video){
    return request({
      url:'/eduservice/video/addVideo',
      method:'post',
      data:video
    })
  },
  updateChapterInfo(video){
    return request({
      url:'/eduservice/video/updateVideo',
      method:'post',
      data:video
    })
  },

  deleteChapter(videoId){
    return request({
      url:'/eduservice/video/' + videoId,
      method:'delete'
    })
  },

  getVideo(videoId){
    return request({
      url:'/eduservice/video/getVideo/' + videoId,
      method:'get'
    })
  },
}
