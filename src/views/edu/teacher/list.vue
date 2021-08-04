<template>
  <div class="app-container">
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label='序号' width="70">
        <template slot-scope="scope">
          {{ (page-1)*limit + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" width="80"></el-table-column>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.level === 1 ?'高级讲师':'首席讲师' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资历" prop="intro"/>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60"/>
      <el-table-column label="操作" width="200" align="center">
<!--        <template slot-scope="scope">-->
<!--          <router-link :to="'/edu/teacher/edit/'"+scope.row.id>-->
<!--            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>-->
<!--          </router-link>-->
<!--          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>-->
<!--        </template>-->
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'

export default {
  data(){
    return{
      list:null,//查询之后接口返回集合
      total:0,//总记录数
      page:1,//当前页
      limit:10,//每页显示记录数
      teacherQuery:{}//条件封装对象,
    }
  },
  //======//
  created() {
    this.getList();
  },
  //======//
  methods:{
    getList(){
      teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
        .then(res=>{
          this.list = res.data.rows
          this.total = res.data.total
          console.log(this.list)
          console.log(this.total)
        })
        .catch(error=>{
          console.log(error)
        })
    },

    //=====//
  }

}
</script>
