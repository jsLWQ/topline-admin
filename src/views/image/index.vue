<template>
  <div>
    <el-card class="box-card">
      <div slot="header" style="line-height: 40px;" class="clearfix">
        <span>图片管理</span>
        <el-upload
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="{Authorization: `Bearer ${$store.state.user.token}`}"
          :on-success="upload"
          :on-progress="load"
          :show-file-list="false"
          style="float:right">
          <el-button size="small" :loading="imgloading" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio2" size="medium">
          <el-radio-button label="全部" @click.native="gainImage(false)"></el-radio-button>
          <el-radio-button label="收藏" @click.native="gainImage(true)"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="6" v-for="item in arrImage" :key="item.id">
          <div class="grid-content bg-purple" style="text-align:center;margin-bottom:20px">
            <img :src="item.url" style="width:100%;height:200px">
            <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" @click="collect(item)" style="margin-right:20px"></i>
            <i class="el-icon-delete-solid" @click="del(item)"></i>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        class="fy"
        background
        :page-size="per_page"
        @current-change="pageNumber"
        layout="prev, pager, next"
        :total="length">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'AppImage',
  data () {
    return {
      radio2: '全部',
      arrImage: [], // 存储获取的图片素材
      length: 0, // 总页数
      imgloading: false,
      per_page: 20
    }
  },
  created () {
    this.gainImage()// 获取图片素材
  },
  methods: {
    //  获取图片素材
    gainImage (collect = false, page = 1) {
      this.$axios({
        method: 'GET',
        url: `/user/images`,
        params: {
          collect,
          page
        }
      }).then(data => {
        // console.log(data)
        this.arrImage = data.results
        this.per_page = data.per_page
        this.length = data.total_count
      })
    },
    // 添加收藏
    collect (item) {
      // console.log(item)
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(data => {
        // console.log(data)
        this.$message({
          message: `恭喜你，${data.collect ? '收藏' : '取消'}成功`,
          type: 'success'
        })
        this.gainImage()
        item.is_collected = !item.is_collected
      }).catch(err => {
        console.log(err)
        this.$message({
          message: `${item.is_collected ? '取消' : '收藏'}失败`,
          type: 'error'
        })
      })
    },
    // 删除图片素材
    del (item) {
      // console.log(item)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(data => {
          console.log(data)
          this.$message({
            message: `恭喜你，删除成功`,
            type: 'success'
          })
          this.gainImage()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: `删除失败`,
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 上传图片
    upload () {
      this.imgloading = false
      this.gainImage()
    },
    //  loading
    load () {
      this.imgloading = true
    },
    //  获取页码
    pageNumber (value) {
      // console.log(value)
      this.gainImage(false, value)
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
.box-card[data-v-304287f4] {
  width: 100%;
}
.bg-purple {
  background: #ccc;
  i {
    cursor: pointer;
  }
  i:hover {
    color: rgb(92, 182, 255)
  }
}
.fy {
  margin-left: 50%;
  transform: translateX(-50%)
}
</style>
