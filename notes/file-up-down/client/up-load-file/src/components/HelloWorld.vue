<template>
  <div class="hello">
    {{ msg }}
    <div>
      <input type="file"
             @change="handleFileChange" />
      <el-button @click="handleUpload">上传</el-button>
    </div>
  </div>
</template>

<script>
import request from '../utils/request.js'

const LENGTH = 10; // 文件进行切片上传的切片数量

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      container: {
        file: null,
        data: []
      }
    }
  },
  methods: {
    // 1、将选中上传的文件存入container.file中
    handleFileChange (e) {
      const [file] = e.target.files;
      if (!file) return
      Object.assign(this.$data, this.$options.data());
      this.container.file = file
    },
    // 生成文件切片
    createFileChunk (file, length = LENGTH) {
      const fileChunkList = []
      const chunkSize = Math.ceil(file.size / length) // 每个切片的大小
      let cur = 0; // 当前切割的上传文件位置
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + chunkSize)
        })
        cur += chunkSize;
      }
      return fileChunkList; // 返回切割完成的文件切片数组
    },
    // 上传切片
    async uploadChunks () {
      const requestList = this.data.map(({ chunk, hash }) => {
        const formData = new FormData();
        formData.append("chunk", chunk)
        formData.append("hash", hash);
        formData.append("filename", this.container.file.name)
        return { formData }
      })
        .map(async ({ formData }) => {
          request({
            url: "http://localhost:3000",
            method: 'post',
            data: formData
          })
        });
      await Promise.all(requestList) // 并发切片
      // 发送请求，发送完后通知服务端合并切片
      await this.mergeRequest();
    },
    // 通知服务端合并切片
    async mergeRequest () {
      await request({
        url: 'http://localhost:3000/merge',
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          filename: this.container.file.name
        })
      })
    },
    // 点击上传触发
    async handleUpload () {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: this.container.file.name + "-" + index
      }))
      await this.uploadChunks();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
