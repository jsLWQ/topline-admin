<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form"
      v-loading="false"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
        </el-form-item>
        <!-- <articleChannel :value="form.channel_id" @input="takeIn"></articleChannel> -->
        <articleChannel v-model="form.channel_id"></articleChannel>
        <!-- <el-form-item label="文章频道">
          <el-select v-model="form.channel_id" placeholder="请选择文章频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
        <hr>
      <div class="operation">
        <el-button type="primary" @click="releaseEssay(false)">发布</el-button>
        <el-button type="info">草稿</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import articleChannel from '@/components/article-channel'
export default {
  name: 'Apppublish',
  components: {
    articleChannel
  },
  data () {
    return {
      form: {
        title: '', // 文章状态
        content: '', //  文章内容
        channel_id: '', // 文章频道
        cover: { //  封面
          type: 0,
          images: []
        }
      }
    }
  },
  methods: {
    // 发布文章
    releaseEssay (draft) {
      this.$axios({
        method: 'POST',
        url: `/articles`,
        data: this.form,
        params: {
          draft
        }
      }).then(res => {
        console.log(res)
        this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        this.$router.push({ name: 'article' })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '恭喜你，发布失败',
          type: 'success'
        })
      })
    },
    //  接受子组件传的值
    takeIn (id) {
      this.form.channel_id = id
    }
  }
}
</script>
<style lang="less" scoped>
.operation {
  margin-top: 39px;
}
</style>
