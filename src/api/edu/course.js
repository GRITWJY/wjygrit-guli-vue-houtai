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
  }
}
