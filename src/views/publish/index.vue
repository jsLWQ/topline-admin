<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.name" placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
        </el-form-item>
        <el-form-item label="文章频道">
          <el-select v-model="form.region" placeholder="请选择文章频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <hr>
        <el-form-item class="operation">
          <el-button type="primary">发布</el-button>
          <el-button type="info">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        content: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.operation {
  margin-top: 20px;
}
</style>
