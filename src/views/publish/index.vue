<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{Edit_id?'编辑文章':'发表文章'}}</span>
      </div>
      <el-form ref="form"
      v-loading="Edit_id && Editloading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
          >
          </quill-editor>
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
        <el-button type="primary" :loading="Edit_id && Editloading" @click="releaseEssay(false)">{{Edit_id?'编辑':'发布'}}</el-button>
        <el-button type="info" :loading="Edit_id && Editloading" @click="releaseEssay(true)">草稿</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
//  加载富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
//  加载封装的下拉菜单
import articleChannel from '@/components/article-channel'
export default {
  name: 'Apppublish',
  components: {
    articleChannel,
    quillEditor
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
      },
      content: '',
      editorOption: {
      },
      Editloading: false
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    //  获取编辑文章的ID
    Edit_id () {
      return this.$route.params.id
    },
    Edit_name () {
      return this.$route.name
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.name === 'publishEdit') {
      this.assignEssay()
    } else if (this.$route.name === 'publish') {
      console.log(1)
      // this.form.title = ''
      // for(let key in this.form) {
      //   console.log(this.form[key])
      //   // if(this.form[key] !=='cover') {
      //   //   this.form[key] = ''
      //   // }
      // }
    }
  },
  mounted () {
    // console.log(this.Edit_name)
    // console.log(this.$route)// 可以得到当前路由的name
    // console.log('this is current quill instance object', this.editor)
  },
  methods: {
    // 发布文章
    releaseEssay (draft) {
      if (this.Edit_id) {
        this.EditEssay(draft)
      } else {
        this.publishEssay(draft)
      }
    },
    //  接受子组件传的值
    takeIn (id) {
      this.form.channel_id = id
    },
    //  获取编辑的指定文章
    assignEssay () {
      this.Editloading = true
      this.$axios({
        method: 'GET',
        url: `/articles/${this.Edit_id}`
      }).then(data => {
        // console.log(data)
        this.$message({
          message: '文章加载成功',
          type: 'success'
        })
        this.Editloading = false
        this.form = data
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '文章加载失败',
          type: 'error'
        })
        this.Editloading = false
      })
    },
    // 编辑文章
    EditEssay (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.Edit_id}`,
        data: this.form,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push({ name: 'article' })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    },
    // 发布文章
    publishEssay (draft) {
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
          message: '发布失败',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.operation {
  margin-top: 39px;
}
</style>
