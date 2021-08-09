<template>
  <div class="app-container">
    <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>

    <el-tree
      class="filter-tree"
      :data="data2"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2"></el-tree>

  </div>
</template>

<script>
import subjectApi from '../../../api/edu/subject'

export default {

  created() {
    this.getAllSubject()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getAllSubject(){
      subjectApi.getSubjectList()
        .then(res=>{
          this.data2 = res.data.list
        })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  },

  data() {
    return {
      filterText: '',
      data2: [],//返回所有分类数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  }
}
</script>

