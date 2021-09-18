<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
a{
  text-decoration: none;
  color: #848484;
}
ul,ol,li{
  list-style: none;
  margin: 0;
}
p{
  text-indent: 30pt;;
}
img{
  display: block;
  margin: 0 auto;
  max-width: 1200px;
}
video{
  display: block;
  margin: 0 auto;
}
body{
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-variant: tabular-nums;
  line-height: 1.5;
  background-color: #fff;
  font-feature-settings: 'tnum';
}

</style>

