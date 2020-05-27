<template>
  <div class="index-wrapper">
    <div class="title">首页</div>
    <p>语言测试：{{ $t("common.query") }}</p>
    <p>vuex数字： {{ count }} --- {{ msg }}</p>
    <P>vuex getter数据： {{ countDouble }} --- {{ unMsg }}</P>
    <Button @click="add(1)">加加加</Button>
    <Button @click="setMsg('haha,gogo')">主vuex改动</Button>
    <Button @click="syncGetCount(2)">异步添加</Button>
    <Button @click="getAndSetMsg('lalala,woshi')">主vuex异步</Button>
    <Button @click="getGradeList">获取数据</Button>
    <li v-for="item in list" :key="item.id">
      {{ item.taskName }}
    </li>
    <li v-for="item in gradeList" :key="item.gradeIndex">
      {{ item.gradeType + item.gradeName }}
    </li>
    <br>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>

<script>
import { getList } from '../../api/index';
// import { themeMixin } from '../../common/js/mixin'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  // mixins: [ themeMixin ],
  data() {
    return {
      list: [],
    }
  },
  computed: {
    ...mapState({
      count: state => state.indexState.count,
      msg: state => state.msg,
      loading: state => state.indexState.loading,
      gradeList: state => state.indexState.gradeList
    }),
    ...mapGetters('indexState', ['countDouble']), // 分类redux操作
    ...mapGetters([ 'unMsg' ]) // 公共redux操作
  },
  methods: {
    ...mapMutations('indexState', {
      'add': 'increment',
    }),
    ...mapMutations([ 'setMsg', 'setState' ]),
    ...mapActions('indexState', [ 'syncGetCount', 'getGradeList' ]),
    ...mapActions(['getAndSetMsg']),
    async getIndexList() {
      let obj = {
        taskName: '',
        startRowIndex: 0,
        maxItems: 15,
        isAscend: true,
        sortColumn: 'taskName'
      }
      let list = await getList(obj)
      this.list = list.list
    }
  },
  mounted() {
    this.getGradeList({ pageNo: 1, pageSize: 10 })
  }
}
</script>

<style scoped lang="less">
  .index-wrapper {
    position: relative;
    .title {
      color: red;
    }
  }
</style>