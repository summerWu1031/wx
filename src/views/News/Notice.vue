
<template>
  <div>
    <Nav/>
    <Nav2>
      通知公告
    </Nav2>
    <NewsContent>
      <div class="list_box">
        <div class="title">
          <p>
            通知公告
          </p>
        </div>
        <div class="list_content" >
          <ul>
            <li v-for="(item,index) in news" :key="index">
              <div class="left">
                <i>•</i>
                <router-link :to="{ path: '/detail/' + item.id }">
                  {{ item.noticeTitle }}
                </router-link>
              </div>
              <div class="right">
                <span>{{item.releaseTime}}</span>
              </div>


            </li>
          </ul>
        </div>
        <div class="page">
          <div class="pageTotal">共<span>{{total}}</span>条</div>
          <div  @click="firstPage" class="firstPage">首页</div>
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
      </div>
    </NewsContent>
    <Footer/>
  </div>
</template>

<script lang="js">
import Nav from '@/components/Nav.vue';
import Nav2 from '@/components/Nav2.vue';
import Footer from '@/components/Footer.vue';
import {getNoticeList} from '@/api'
import {pagination} from '@/mixins/mixin'
import NewsContent from "@/components/NewsContent";
export default {
  components:{Footer, NewsContent, Nav,Nav2},
  mixins:[pagination],
  props:['id'],
  data() {
    return {
      queryParams: {
        noticeClass: 1,
        sign:"wx",
        pageSize: 10,
        pageNum: 1,
      },
      news: [],
      total: 0,
      input:''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const self = this;
      getNoticeList(self.queryParams).then((res) => {
        if (res.code == 200) {
          self.news = res.rows;
          self.total = res.total;
        } else {
          self.$message(res.msg);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

