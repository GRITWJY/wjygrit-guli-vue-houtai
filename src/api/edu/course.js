import request from '../../utils/request'
export default {


  deleteCourse(courseId){
    return request({
      url:'/eduservice/edu-course/deleteCourse/'+courseId,
      method:'delete'
    })
  },

  //获取全部课程
  getCourseListPage(current,limit,courseQuery){
    return request({
      url: `/eduservice/edu-course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      //teacherQuery条件对象,responseBody获取
      //data表示把对象转成json传递到接口
      data:courseQuery
    })
  },

  publishcourse(id){
    return request({
      url:'/eduservice/edu-course/publishCourse/'+id,
      method:'post'
    })
  },

  //课程确认信息显示
  getPublishCourseInfo(id){
    return request({
      url:'/eduservice/edu-course/getPublishCourseInfo/'+id,
      method:'get'
    })
  },

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
