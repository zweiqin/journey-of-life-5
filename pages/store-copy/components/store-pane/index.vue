<template>
  <view
    class="store-pane"
    v-if="data"
    @click="go('/store/store-detail??storeId=' + data.id)"
  >
    <image class="store-avatar" :src="data.picUrl" mode="" />

    <view class="store-info">
      <view class="store-name">{{ data.name }}</view>
      <view class="desc">{{ data.desc }}</view>
      <view class="recoment">
        <view class="tag">{{ getRandom() }}%用户推荐</view>
        <view class="dis">{{ getDis() }}km</view>
      </view>
      <view class="comment">
        <image class="user-avatar" :src="getAvatar()" mode="" />
        <text class="user-comment">
          {{ getComment() }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
const comments = [
  "没一人不喜欢，点赞，好好吃好满足，好久没有次到这么美味的羊肉串了。红柳羊肉串味道不错，羊排肉剔得有点薄。",
  "味道超赞，而且一看*让人觉得很有食欲，但是分量不大，属于比*精致的类型。胜在菜品也很新鲜，味道咸淡适中，而且火候掌握的刚好",
  "这道菜一上桌*让人非常有食欲，香气浓郁，非常诱人。口感非常的脆嫩，爽滑。浓郁的酱汁包裹着食材，咬下去酱汁充满口腔。而且用料十分新鲜，给的量也很足，性价比超级高。下次有机会一定会再来。",
  "饭菜量很足，价钱也非常合理，下了班不想做饭，立马点了这家外卖，果然如好评里说得一样，非常合口味。包装特别好，里外都没有洒一滴滴，送得也很及时，必须表扬",
  "非常干净卫生，本来一直在家做饭的，但是孩子想吃外卖，所以*点了试试，出乎我意料的干净和好吃，味道也合家里的口味，辛苦外卖员这么迅速地给送过来了，非常及时。给商家和外卖点赞",
  "老吃客了，吃了大概差不多近20年，原来在平凉路37路临潼路站这里，去年这里拆迁，最近又重新开张，选址就在附近的临潼路上。",
  "性价比高爆，20块满满牛舌，不是那么有嚼劲的牛舌，可能太薄了，但很入味。葱油酱很香，香菜葱大蒜苗自己添，还有很辣的土豆泥，吃不了辣，没加。清汤味道也很好，不是刷锅水的那种。",
  "搬过来第一次吃，导航导得我头大店面比原来干净整洁多了，老板娘和老板还是一如既往地客气最爱红烧牛肉拌面，牛肉烧得还是蛮入味的，四四方方吃起来真心赞，最爱加土豆加辣加醋，拌在一起真的很好吃，",
  "面基本都还行，虾仁蟹粉面味道挺清淡的，六月黄面略有些腻，但都还是挺好吃的，值得试试。",
  "他们家的环境一般生意超级火爆中午饭点来吃空无虚席门口排队的人多的不得了点的最多的大类是拌面红烧牛肉超级多但是我还是比较牛舌面牛舌很薄很嫩而且量也挺多的辣酱咸菜香菜都可以自己拿这点很温馨味道真不错回顾过好多次",
];

const avatars = [
  "https://img2.baidu.com/it/u=3149201296,3134006626&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=1521025111,2437884235&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=480",
  "https://img1.baidu.com/it/u=1874604969,1191665845&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=400",
  "https://img1.baidu.com/it/u=2424946290,2934499889&fm=253&fmt=auto&app=138&f=JPEG?w=526&h=500",
  "https://img2.baidu.com/it/u=225562857,2221653580&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img1.baidu.com/it/u=1106483557,1686897437&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=440",
  "https://img1.baidu.com/it/u=3870557935,2333078440&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=2383759541,1098368289&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=1369975336,3463624303&fm=253&fmt=auto&app=138&f=JPEG?w=440&h=440",
  "https://img2.baidu.com/it/u=863212123,466251403&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
  "https://img2.baidu.com/it/u=456164966,2207850441&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200",
  "https://img1.baidu.com/it/u=782611935,1809420469&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img1.baidu.com/it/u=3202871978,903277502&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img2.baidu.com/it/u=2103213176,2138654226&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=3973491338,330827037&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=2717264036,2077660746&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
  "https://img2.baidu.com/it/u=624961992,3958208033&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200",
];

// https://www.jianshu.com/p/74b648b9b9ad

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getRandom() {
      return Math.floor(Math.random() * (100 - 80) + 80);
    },

    getComment() {
      return comments[Math.floor(Math.random() * (comments.length - 0) + 0)];
    },

    getAvatar() {
      return avatars[Math.floor(Math.random() * (avatars.length - 0) + 0)];
    },

    getDis() {
      return Math.floor(Math.random() * (5 - 0) + 0);
    },
  },
};
</script>

<style lang="less" scoped>
.store-pane {
  background-color: #fff;
  width: 100%;
  padding: 20upx 24upx;
  box-sizing: border-box;
  display: flex;
  font-size: 28upx;
  margin-bottom: 20upx;

  .store-avatar {
    width: 180upx;
    height: 180upx;
    border-radius: 20upx;
    object-fit: cover;
    flex-shrink: 0;
    margin-right: 12upx;
  }

  .store-info {
    flex: 1;
    .store-name {
      font-weight: bold;
    }

    .desc {
      color: #777;
      font-size: 24upx;
      margin: 14upx 0 20upx 0;
    }

    .recoment {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tag {
        font-size: 20upx;
        color: #777;
        padding: 6upx 40upx 6upx 20upx;
        background-color: #f6f6f6;
      }
    }

    .comment {
      padding: 20upx 4upx;
      border-bottom: 1upx solid #d8d8d8;

      .user-avatar {
        width: 40upx;
        height: 40upx;
        object-fit: cover;
        border-radius: 50%;
        // vertical-align: bottom;
        margin-right: 10upx;
      }

      .user-comment {
        display: inline-block;
        width: 400upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .dis {
        color: #777;
      }
    }
  }
}
</style>