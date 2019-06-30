<template>
  <div>
    <el-table
      :data="comment"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="评论状态"
      >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
      >
      <template slot-scope="scope">
      <el-switch
        v-model="scope.row.value"
        :disabled="scope.row.statusloading"
        @change="commenState(scope.row.id, scope.row.value, scope.row)"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total_count"
      @current-change="yema">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'ArticleComment',
  data () {
    return {
      comment: [],
      total_count: 1, // 文章总数
      status: true
    }
  },
  created () {
    this.gainEssay()
  },
  methods: {
    //  获取
    gainEssay (page = 1) {
      this.$axios({
        method: 'GET',
        url: `/articles`,
        params: {
          response_type: 'comment',
          page
        }
      }).then(data => {
        // console.log(data)
        this.total_count = data.total_count
        // this.value = data.results.comment_status
        data.results.forEach((item) => {
          item.statusloading = false
          if (item.comment_status) {
            item.value = item.comment_status
            item.comment_status = '正常'
          } else {
            item.value = item.comment_status
            item.comment_status = '禁用'
          }
        })
        console.log(data)
        this.comment = data.results
      }).catch(err => {
        console.log(err)
      })
    },
    //  滑动改变评论状态
    commenState (id, value, statusloading) {
      statusloading.statusloading = true
      // console.log(statusloading)
      this.$axios({
        method: 'PUT',
        url: `/comments/status`,
        params: {
          article_id: id + ''
        },
        data: {
          allow_comment: value
        }
      }).then(data => {
        console.log(data)
        this.$message({
          message: `${data.allow_comment ? '启用' : '禁用'}评论成功`,
          type: 'success'
        })
        statusloading.statusloading = false
        this.gainEssay()
      }).catch(err => {
        console.log(err)
        this.$message({
          message: `切换状态失败`,
          type: 'success'
        })
        // loading = false
      })
    },
    //  改变页码时获取数据
    yema (value) {
      // console.log(value)
      this.gainEssay(value)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
