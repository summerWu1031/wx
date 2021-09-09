<template>
  <div>
    <div class="user-head">
      <div class="block">
        <el-avatar v-model="userInfo.avatar" :size="50" :src="userInfo.avatar"></el-avatar>
      </div>
      <span class="name"> {{ userInfo.userName }}</span>
      <span class="tel">{{ userInfo.phonenumber }}</span>
    </div>
  </div>
</template>

<script>
import {getUserProfile} from "@/api/user";

export default {
  data() {
    return {
      userInfo: {}
    }
  },

  mounted(){
    let self = this
    getUserProfile().then((res)=>{
      self.userInfo=res.data.userInfo
      self.userInfo.avatar=self.loadUrl(self.userInfo.avatar)
      console.log(self.userInfo.avatar)
      console.log(self.userInfo)
    })

  },

  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>