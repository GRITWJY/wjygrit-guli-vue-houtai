import request from '../../utils/request'
export default {

  addCourseInfo(courseInfo){
    return request({
      url:`/eduservice/edu-course/addCourseInfo`,
      method:'post',
      data:courseInfo,
    })
  },

  getListTeacher(){
    return request({
      url:'eduservice/teacher/findAll',
      method:'get'
    })
  },

  getCouseInfoId(id){
    return request({
      url:'eduservice/edu-course/getCourseInfo/'+id,
      method:'get'
    })
  },

  updateCourseInfo(courseInfo){
    return request({
      url:`/eduservice/edu-course/updateCourseInfo`,
      method:'post',
      data:courseInfo,
    })
  },
}
