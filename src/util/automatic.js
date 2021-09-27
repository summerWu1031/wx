 
// 引入路由和storage工具函数
import storage from '@/util/storage'
import router from "@/router"

let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut = 60 * 60 * 1000  //设置超时时间: 1小时
 
window.onload = function () {
  window.document.onmousedown = function () {
    storage.setItem("lastTime", new Date().getTime())
  }
};
 
function checkTimeout() {
  currentTime = new Date().getTime()		//更新当前时间
  lastTime = storage.getItem("lastTime");
 
  if (currentTime - lastTime > timeOut) { //判断是否超时
    // 清除storage的数据(登陆信息和token)
    storage.clear()
    // window.sessionStorage.removeItem("token");
    // window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("store");

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("store");



    // 跳到登陆页
    // if(router.currentRouter.path == 'login') return // 当前已经是登陆页时不做跳转
    router.push('/login')
  }
}
 
export default function () {
  /* 定时器 间隔30秒检测是否长时间未操作页面 */
  window.setInterval(checkTimeout, 30000);
}
