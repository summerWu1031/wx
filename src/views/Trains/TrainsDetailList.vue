<template>
  <div>
    <Nav/>
    <div class="trains-detail">
      <div class="content">
        <div class="course-description course-wrap">
          简介：本课程主要介绍电商网站基本制作流程，通过电商网站分步的教学让大家了解和掌握电商网站制作的流程和注意事项。并且运用网站内学习过的知识点，更加快速的掌握整站的开发过程，增加开发经验。
        </div>
        <div class="course-chapters">
          <div class="chapter course-wrap chapter-active">
            <h3>
              第1章 课程简介
            </h3>
            <div class="chapter-description">
              本章主要介绍课程案例和课程安排
            </div>
            <ul class="video">
              <li data-media-id="21449">
                <a href="/video/21449" class="J-media-item"><i class="icon-half ing"></i>
                  <i class="imv2-shipin3 type"></i>
                  <em class="type-text">视频：</em>
                  1-1 课程介绍
                  (05:22)
                </a>
              </li>
            </ul>
          </div>
          <div class="chapter course-wrap ">
            <h3>
              第2章 网页结构搭建
            </h3>
            <div class="chapter-description">
              本章主要讲解开发前的准备以及网页结构搭建
            </div>

            <ul class="video">
              <li data-media-id="21450">
                <a href="/video/21450" class="J-media-item"><i class="icon-half ing"></i>
                  <i class="imv2-shipin3 type"></i>
                  <em class="type-text">视频：</em>
                  2-1 开发环境搭建
                  (07:25)
                </a>
              </li>
              <li data-media-id="21451">
                <a href="/video/21451" class="J-media-item"><i class="icon-nolearn start"></i>
                  <i class="imv2-shipin3 type"></i>
                  <em class="type-text">视频：</em>
                  2-2 网页基本骨架搭建（1）
                  (13:50)
                </a>
              </li>
              <li data-media-id="21452">
                <a href="/video/21452" class="J-media-item"><i class="icon-nolearn start"></i>
                  <i class="imv2-shipin3 type"></i>
                  <em class="type-text">视频：</em>
                  2-3 网页基本骨架搭建（2）
                  (15:10)
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.trains-detail{
  .content{
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    margin-top: 30px;
    .course-description {
      line-height: 28px;
      white-space: pre-line;
    }
    .course-wrap{
      margin-bottom: 8px;
      padding: 24px 32px 32px;
      background: #fff;
      box-shadow: 0 8px 16px 0 rgb(7 17 27 / 10%);
      border-radius: 12px;
    }
  }
}

</style>