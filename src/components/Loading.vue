<template>
<div class="loaderbg">
  <div class="loader">
    <span class="circle"
      >LOAD
      <div class="scircle"></div>
      <div class="scircle"></div>
    </span>
    <span class="circle"
      ><img class="image-round" alt="" src="../assets/logo.png" />
      <div class="scircle"></div>
      <div class="scircle"></div>
    </span>
    <span class="circle"
      >ING
      <div class="scircle"></div>
      <div class="scircle"></div>
    </span>
  </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss">
.loaderbg{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 20;
  background:rgba(50, 50, 50, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  /* position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%); */
  transform:scale(0.5);
  text-align: center;
  user-select: none;
  cursor: default;
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
}

.circle:nth-child(1) {
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -280px;
  border-radius: 100%;
  background: #db2f00;
  z-index: 2;
  font-size: 2.5em;
  line-height: 200px;
  color: #fff;
  box-shadow: 0px 0px 25px 0px rgba(50, 50, 50, 0.75);
}

.circle:nth-child(2) {
  width: 300px;
  height: 300px;
  margin-top: -150px;
  margin-left: -100px;
  border-radius: 100%;
  background: #f2f2ef;
  z-index: 1;
  font-family: "Uni Sans";
  font-size: 7em;
  font-weight: 300;
  color: #303030;
  padding-left: 5px;
  line-height: 1.35em;
  animation: circle 1.5s infinite ease-in-out;
  .image-round{
    height: 300px;
  }
}

.circle:nth-child(3) {
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: 182px;
  border-radius: 100%;
  background: #13a3a5;
  z-index: 2;
  font-size: 3em;
  line-height: 200px;
  color: #fff;
  box-shadow: 0px 0px 25px 0px rgba(50, 50, 50, 0.75);
}

.scircle {
  position: absolute;
  top: -25px;
  left: -23px;
  width: 350px;
  height: 350px;
  animation: scircle 1.5s ease-in-out infinite;
}

.circle:nth-child(1) .scircle {
  top: -12px;
  left: -12px;
  width: 230px;
  height: 230px;
}

.circle:nth-child(1) .scircle:after {
  top:230px;
}

.circle:nth-child(3) .scircle:after {
  top: 230px;
}

.circle:nth-child(3) .scircle {
  top: -12px;
  left: -12px;
  width: 230px;
  height: 230px;
}

.scircle:nth-child(2) {
  animation: scircle2 1.5s ease-in-out infinite;
}
.scircle:before {
  content: "";
  position: absolute;
  width: 0.1em;
  height: 0.1em;
  border-radius: 100%;
  background: #fff; /* Pick a color 1*/
}

.scircle:after {
  content: "";
  position: absolute;
  top: 350px;
  width: 0.1em;
  height: 0.1em;
  border-radius: 100%;
  background: #fff; /* Pick a color 1*/
}

@keyframes circle {
  0% {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
  45%,
  50%,
  55% {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    -moz-opacity: 1;
    -khtml-opacity: 1;
    opacity: 1;
  }

  100% {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
}

@-webkit-keyframes scircle {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes scircle {
  0% {
    -moz-transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-mos-keyframes scircle {
  0% {
    -mos-transform: rotate(0deg);
  }
  100% {
    -mos-transform: rotate(360deg);
  }
}

@-o-keyframes scircle {
  0% {
    -o-transform: rotate(0deg);
  }
  100% {
    -o-transform: rotate(360deg);
  }
}

@keyframes scircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes scircle2 {
  0% {
    -webkit-transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(450deg);
  }
}

@-moz-keyframes scircle2 {
  0% {
    -moz-transform: rotate(90deg);
  }
  100% {
    -moz-transform: rotate(450deg);
  }
}

@-mos-keyframes scircle2 {
  0% {
    -mos-transform: rotate(90deg);
  }
  100% {
    -mos-transform: rotate(450deg);
  }
}

@-o-keyframes scircle2 {
  0% {
    -o-transform: rotate(90deg);
  }
  100% {
    -o-transform: rotate(450deg);
  }
}

@keyframes scircle2 {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(450deg);
  }
}
</style>