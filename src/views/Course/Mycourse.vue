<template>
  <div>
    <Nav/>
    <div class="myCourse">
      <div class="tabs">
        <ul class="navUl">
          <li class="item " v-for="(item,index) in tabs" :key="index" @click="selectTab(index)"
              :class="{selected:selected==index}">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="course-content">
        <ul class="course-list">
          <li class="list-item" v-for="(item,index) in list" :key="index" @click="jump(item.id)">
            <div class="item-img">
              <img :src="loadUrl(item.imgUrl)">
            </div>
            <p class="item-title">{{ item.trainName }}</p>
            <p class="item-time">{{ item.beginTime }} 至 {{ item.endTime }}</p>
          </li>
        </ul>
        <div class="page" v-if="total">
          <div class="pageTotal">共<span>{{ total }}</span>条</div>
          <div @click="firstPage" class="firstPage">首页</div>
          <div @click="pervious" class="per">上一页</div>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryParams.pageNum"
              :page-sizes="[10, 20]"
              :page-size="queryParams.pageSize"
              layout=" pager"
              background
              :total="total"
              ref="pageGroup"
          >
          </el-pagination>
          <div @click="next" class="next">下一页</div>
          <div @click="lastPage" class="lastPage">末页</div>
          <!--          <input class="jumperInput" type="text" value="" ref="jumperInput">-->
          <el-input v-model="input" type="text" ref="jumper"></el-input>
          <div @click="jumper()" class="jumper">
            跳转
          </div>
        </div>
        <el-empty v-else description="暂无内容"></el-empty>
      </div>

    </div>
    <Footer/>
  </div>
</template>

<script>
import '@/assets/courseContent.scss'
import "@/assets/tabs.scss"
import {myCourse} from '@/api/training'
import {pagination} from "@/mixins/mixin";

export default {
  mixins:[pagination],
  data() {
    return {
      tabs:['付费课程','免费课程'],
      selected: 0,
      queryParams:{
        needPay: 1,  //0.无需支付 1.需要支付
        pageNum:1,
        pageSize:8
      },
      list:[],
      total:0,
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      myCourse(this.queryParams).then((res)=>{
        if(res.code===200){
          this.list=res.data.orgWxTrainExaminations
          this.total=res.total
        }else {
          this.$message(res.msg)
        }
      })
    },
    selectTab(index){
      this.selected=index
      this.queryParams.needPay=index
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

