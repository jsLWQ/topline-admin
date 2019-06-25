<template>
  <div>
    <!-- 上部筛选 -->
    <el-card class="article-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="form.value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      </el-form>
    </el-card>
    <!-- /上部筛选 -->
    <!-- 内容列表 -->
    <el-card class="article-card2">
      <div slot="header" class="clearfix">
        <span>共找到{{length}}条符合条件的内容</span>
      </div>
      <el-table
        :data="ListData"
        stripe
        style="width: 100%">
        <el-table-column
          class="article-img"
          prop="cover.images[0]"
          label="图片"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="100">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <el-button type="success" plain>编辑</el-button>
          <el-button type="warning" plain>删除</el-button>
        </el-table-column>
      </el-table>
        <el-pagination
          background
          class="article-btn"
          layout="prev, pager, next"
          :total="length"
          @current-change="Page"
        >
        </el-pagination>
    </el-card>
    <!-- /内容列表 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        region: '',
        resource: '',
        value1: ''
      },
      ListData: [],
      length: 0, //  内容列表的总长度
      PageNumber: 1//  当前页码
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    //  获取文章列表
    getList () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.PageNumber
        }
      }).then(data => {
        console.log(data)
        this.length = data.total_count
        this.ListData = data.results
      })
    },
    //  获取当前页码
    Page (num) {
      // console.log(num)
      this.PageNumber = num
      this.getList(num)
    }
  }
}
</script>
<style lang="less" scoped>
.article-card {
  margin-bottom: 20px
}
.article-btn {
  margin-top: 10px
}
.article-img {
  margin-right: 20px
}
</style>
