import request from '@/utils/request'

export default {

  //1.讲师列表(条件查询分页)
  //curren当前页,每页记录数,条件对象
  getSubjectList() {
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get',
    })
  }
}
