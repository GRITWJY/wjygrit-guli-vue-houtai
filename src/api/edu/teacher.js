import request from '@/utils/request'

export default {

  //1.讲师列表(条件查询分页)
  //curren当前页,每页记录数,条件对象
  getTeacherListPage(current,limit,teacherQuery){
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      //teacherQuery条件对象,responseBody获取
      //data表示把对象转成json传递到接口
      data:teacherQuery
    })
  }

}

