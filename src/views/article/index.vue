<template>
  <div>
    <!-- 上部筛选 -->
    <el-card class="article-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label="文章状态">
        <el-radio-group v-model="form.status">
          <el-radio label="">全部</el-radio>
          <el-radio v-for="(item,index) in StatusNumber" :key="item.name"  :label="index">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.channel_id" placeholder="请选择活动区域">
          <el-option value="">所有频道</el-option>
          <el-option v-for="item in essay_id" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="form.value1"
          type="daterange"
          value-format="yyyy-MM-dd"
          @change="change"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="disabled" @click="onSubmit">查询</el-button>
      </el-form-item>
      </el-form>
    </el-card>
    <!-- /上部筛选 -->
    <!-- 内容列表 -->
    <el-card class="article-card2">
      <div slot="header" class="clearfix">
        <span>共找到{{PageNumber}}条符合条件的内容</span>
      </div>
      <el-table
        :data="ListData"
        stripe
        style="width: 100%"
        v-loading="disabled"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
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
          <template slot-scope="scope">
          <el-tag :type="StatusNumber[scope.row.status].type">{{StatusNumber[scope.row.status].name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="success" plain>编辑</el-button>
            <el-button type="warning" plain @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
          background
          class="article-btn"
          layout="prev, pager, next"
          :total="PageNumber"
          @current-change="Page"
          :disabled="disabled"
        >
        </el-pagination>
    </el-card>
    <!-- /内容列表 -->
  </div>
</template>
<script>
export default {
  name: 'Apparticle',
  data () {
    return {
      form: {
        channel_id: '',
        status: '',
        value1: [],
        begin_pubdate: '', //  开始时间
        end_pubdate: ''//  结束时间
      },
      ListData: [],
      length: 0, //  内容列表的总长度
      PageNumber: 1, //  当前页码
      disabled: false, // table和页码按钮禁用
      StatusNumber: [ //  状态列表
        {
          type: 'info',
          name: '草稿'
        },
        {
          type: '',
          name: '待审核'
        },
        {
          type: 'success',
          name: '审核通过'
        },
        {
          type: 'warning',
          name: '审核失败'
        },
        {
          type: 'danger',
          name: '已删除'
        }
      ],
      essay_id: []//  获取文章列表
    }
  },
  created () {
    this.getList()//  获取文章列表
    this.essayChannel()//  获取文章频道
  },
  methods: {
    onSubmit () {
      // console.log('submit!')
      this.PageNumber = 1
      this.getList()
    },
    //  获取文章频道
    essayChannel () {
      this.$axios({
        method: 'GET',
        url: `/channels`
      }).then(res => {
        // console.log(res.channels)
        this.essay_id = res.channels
      })
    },
    //  获取文章列表
    getList () {
      this.disabled = true
      // console.log(1)
      let obj = {}
      for (let key in this.form) {
        // console.log(this.form[key])
        if (this.form[key]) {
          obj[key] = this.form[key]
        }
      }
      // console.log(obj)
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.PageNumber,
          ...obj
        }
      }).then(data => {
        // console.log(data)
        this.PageNumber = data.total_count
        this.ListData = data.results
        this.disabled = false
      })
    },
    //  获取当前页码
    Page (num) {
      this.disabled = true
      // console.log(num)
      this.PageNumber = num
      this.getList(num)
    },
    //  删除文章
    del (id) {
      // console.log(id.id)
      this.$axios({
        method: 'DELETE',
        url: `/articles/${id.id}`
      }).then(res => {
        console.log(res)
        this.getList()
      })
    },
    //  获取筛选里的时间
    change (value) {
      // console.log(value[0])
      this.form.begin_pubdate = value[0]
      this.form.end_pubdate = value[1]
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
