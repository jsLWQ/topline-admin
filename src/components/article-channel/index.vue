<template>
    <el-form-item label="文章频道">
    <el-select :value="value" @change="selectChange">
      <el-option v-for="item in essay_id" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    </el-form-item>
</template>
<script>
export default {
  data () {
    return {
      form: {
        channel_id: ''
      },
      essay_id: []//  获取文章列表
    }
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.essayChannel()
  },
  methods: {
    essayChannel () {
      this.$axios({
        method: 'GET',
        url: `/channels`
      }).then(res => {
        // console.log(res.channels)
        this.essay_id = res.channels
      })
    },
    selectChange (id) {
      // console.log(id)
      this.$emit('input', id)
    }
  }
}
</script>
<style scoped>

</style>
