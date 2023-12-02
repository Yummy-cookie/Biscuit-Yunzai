[![云崽bot](https://img.shields.io/badge/%E4%BA%91%E5%B4%BD-v3.1.2-black?style=flat-square&logo=dependabot)](https://gitee.com/Yummy-cookie/Yunzai-Bot/) [![Group](https://img.shields.io/badge/群号-950817968-red?style=flat-square&logo=GroupMe&logoColor=white)](https://h5.qun.qq.com/s/hFFOCBqprO) <a href='https://gitee.com/Yummy-cookie/Yunzai-Bot/stargazers'><img src='https://gitee.com/Yummy-cookie/Yunzai-Bot/badge/star.svg?theme=dark' alt='star'></img></a>


# Biscuit-Yunzai V3
Yunzai-Bot，原神qq群机器人，通过米游社接口，查询原神游戏信息，快速生成图片返回，此版本根据Yunzai+miao结合组成的Yunzai，并不依赖miao-plugin

项目仅供学习交流使用，严禁用于任何商业用途和非法行为

[目前功能](https://gitee.com/Yummy-cookie/Yunzai-Bot/blob/master/plugins/genshin/README.md)

[加入聊天群①](https://h5.qun.qq.com/s/hFFOCBqprO)

## 使用方法
>环境准备： Windows or Linux，Node.js（[版本至少v16以上](http://nodejs.cn/download/)），[Redis](https://redis.io/docs/getting-started/installation/)

1.克隆项目
- gitee
```
git clone --depth=1 https://gitee.com/Yummy-cookie/Yunzai-Bot.git ./Biscuit-Yunzai
```
- github
```
git clone --depth=1 https://github.com/Yummy-cookie/Biscuit-Yunzai ./Biscuit-Yunzai
```
```
cd Yunzai-Bot #进入Yunzai目录
```
2.安装[pnpm](https://pnpm.io/zh/installation)，已安装的可以跳过
```
npm install pnpm -g
```
3.安装依赖
```
pnpm install -P
```
4.运行（首次运行按提示输入登录）
```
node app
```

## 常见问题
# puppeteer 相关问题
- 发不出图片
```
pnpm install puppeteer@19.0.0 -w
```
```
node ./node_modules/puppeteer/install.js
```
- 其他的自行探索

## 致谢

|                           Nickname                            | Contribution     |
|:-------------------------------------------------------------:|------------------|
|      [Yunzai v3.0](https://gitee.com/le-niao/Yunzai-Bot)      | 乐神的Yunzai-Bot V3 |
|      [Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai) | 喵佬的Miao-Yunzai v3 |
| [GardenHamster](https://github.com/GardenHamster/GenshinPray) | 模拟抽卡背景素材来源       |
|      [西风驿站](https://bbs.mihoyo.com/ys/collection/839181)      | 角色攻略图来源          |
|     [米游社友人A](https://bbs.mihoyo.com/ys/collection/428421)     | 角色突破素材图来源        |
| [icqq](https://github.com/icqqjs/icqq) | ICQQ             |

## 其他
- 图片素材来源于网络，仅供交流学习使用
- 严禁用于任何商业用途和非法行为
- 赞助[点我跳转](https://www.biscuilt.top/qr.png)(记得备注自己)

