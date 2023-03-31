const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

// 定义奖品列表
const prizes = [
  {
    name: '一等奖',
    image: 'https://static.runoob.com/images/demo/demo3.jpg',
    probability: 0.1,
    count: 100 // 一等奖总共100个
  },
  {
    name: '二等奖',
    image: 'https://img95.699pic.com/photo/50136/1351.jpg_wh300.jpg',
    probability: 0.2,
    count: 200 // 二等奖总共200个
  },
  {
    name: '三等奖',
    image: 'https://img95.699pic.com/photo/50034/0209.jpg_wh300.jpg',
    probability: 0.3,
    count: 300 // 三等奖总共300个
  },
  {
    name: '四等奖',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiV6uHnFFUL43GV_b-ZdmPm4KItFrNLW1RKESftxv&s',
    probability: 0.4,
    count: 400 // 四等奖总共400个
  }
];

// 定义中奖记录，初始值为0
const winnerCounts = {
  '一等奖': 0,
  '二等奖': 0,
  '三等奖': 0,
  '四等奖': 0
};

// 处理抽奖请求
app.get('/lottery', (req, res) => {
  // 随机生成一个0到1之间的小数，表示中奖概率
  let rand = Math.random();

  // 遍历奖品列表，计算随机数是否落在某个奖品的中奖概率范围内
  for (let i = 0; i < prizes.length; i++) {
    const prize = prizes[i];

    if (rand < prize.probability) {
      // 中奖，判断该奖品是否还有剩余
      if (prize.count > 0) {
        // 中奖记录加一
        winnerCounts[prize.name]++;
        // 奖品数量减一
        prize.count--;
        // 返回中奖奖品信息
        return res.send({
          name: prize.name,
          image: prize.image
        });
      } else {
        // 奖品已经全部中完了，重新抽奖
        return res.redirect('/lottery');
      }
      break;
    } else {
      // 没有中奖，继续遍历下一个奖品
      rand -= prize.probability;
    }
  }

  // 没有中奖，返回空对象
  return res.send({});
});

// 获取奖品列表
app.get('/prizes', (req, res) => {
  res.send(prizes);
});

// 获取中奖记录
app.get('/winner-counts', (req, res) => {
  res.send(winnerCounts);
});

app.listen(port, () => {
  console.log(`抽奖活动后台已启动，监听端口 ${port}`);
});
