<template>
  <div class="content">
    <div class="content-text">
      <div class="test-scores">
        <template v-if="getEndScore.pass">
          <h2 class="title pass">考试及格</h2>
          <el-image
              class="pass-img"
              fit="cover"
              :src="require('@/assets/image/pass.png')"
          />
        </template>
        <template v-else>
          <h2 class="title nopass">考试不及格</h2>
          <el-image
              class="nopass-img"
              fit="cover"
              :src="require('@/assets/image/nopass.png')"
          />
        </template>
        <div class="content">
          <span>考试名称：{{ getEndScore.trainName }}</span>
          <span>考试次数：第 {{ getEndScore.times }} 次考试</span>
          <span>
            考试成绩：<span class="cf">{{ getEndScore.score }}分</span>
          </span>
        </div>

      </div>
      <div class="button-bar">
        <span
            v-if="!getEndScore.pass"
            class="button button-bor"
            @click="linkTCdetail"
        >补考</span
        >
        <span class="button button-bg" @click="linkTClist">返回培训列表页</span>
      </div>
    </div>
  </div>
</template>

<script>
import { finishPaper } from "@/api/training";

export default{
  data() {
    return {
      getEndScore: {},
      stateInfo: {},
    }
  },
  mounted() {
    this.stateInfo = JSON.parse(this.$route.query.stateInfo);
    this.finish();
  },
  methods: {
    // 交卷
    finish() {
      this.$store.commit("showLoading");
      finishPaper({ paperid: this.stateInfo.paperId }).then((res) => {
        if (res.code == 200) {
          this.getEndScore = res.data;
          // setTimeout(() => {
          //   this.$router.push("/TC-list");
          // }, 3000);
        } else {
          this.$message(res.msg);
        }
        this.$store.commit("hideLoading");
      });
    },
    linkTClist() {
      // this.$router.push(`/trains`);
     this.$router.push({name: 'trainsDetail', params: {id:this.stateInfo.trainId,name:this.stateInfo.trainName}})
    },
    linkTCdetail() {
      this.$router.push(`/exam-online/${this.stateInfo.trainId}`);
    },
  },
}
</script>

<style lang="scss" scoped>
.test-scores {
  padding: 16px;
  line-height: 20px;
  min-height: 80px;
  font-size: 14px;
  color: #333;
  text-align: center;
  .pass-img,
  .nopass-img {
    margin: 28px auto;
    display: block;
    width: 20%;
    max-width: 152px;
  }

  h2.title {
    font-size: 16px;
    text-align: center;
  }
  .content{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      text-align: center;
      // display: flex;
      margin: 0;
      margin-bottom: 8px;
      padding: 4px 0;
    }
  }

  .score-iName {
    flex-shrink: 0;
    width: 70px;
  }
  .score-iValue {
    flex: 1;
  }
  .cf {
    font-size: 18px;
    color: #fb7f35;
  }
}
.button-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px;
  width: 360px;
  margin: 0 auto;
  .button {
    display: inline-block;
    flex: 1;
    text-align: center;
    height: 45px;
    line-height: 45px;
    background: #ffffff;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    border: 1px solid #ddd;
    color: #555;
    margin: 0 6px;
    cursor: pointer;
  }
  .button-bor {
    border-color: #db261d;
    color: #db261d;
    cursor: pointer;

  }
  .button-bg {
    background: #db261d;
    border-color: #db261d;
    color: #ffffff;
  }
}

.pass {
  color: #4bacef;
}
.nopass {
  color: #f46e6a;
}
</style>
