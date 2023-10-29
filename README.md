[![云崽bot](https://img.shields.io/badge/%E4%BA%91%E5%B4%BD-v3.1.0-black?style=flat-square&logo=dependabot)](https://gitee.com/Yummy-cookie/Yunzai-Bot/) [![Group](https://img.shields.io/badge/群号-374248018-red?style=flat-square&logo=GroupMe&logoColor=white)](https://qm.qq.com/q/JCTYhdnLSQ) <a href='https://gitee.com/Yummy-cookie/Yunzai-Bot/stargazers'><img src='https://gitee.com/Yummy-cookie/Yunzai-Bot/badge/star.svg?theme=dark' alt='star'></img></a>


# Yunzai-Bot v3
云崽v3.0，原神qq群机器人，通过米游社接口，查询原神游戏信息，快速生成图片返回

项目仅供学习交流使用，严禁用于任何商业用途和非法行为

[目前功能](https://gitee.com/Yummy-cookie/Yunzai-Bot/blob/master/plugins/genshin/README.md)

[加入聊天群①](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=7ypRMfqszQPra4kCpyMA-a0VkG6An9GQ&authKey=ZyhfSIqJlyIHj2x%2FkJE1lzbX61HXvPyH7ZINxAdoLsF35dWLSLpKlVSZxsKIhVde&noverify=0&group_code=374248018)

## 使用方法
>环境准备： Windows or Linux，Node.js（[版本至少v16以上](http://nodejs.cn/download/)），[Redis](https://redis.io/docs/getting-started/installation/)

1.克隆项目
```
git clone --depth=1 https://gitee.com/Yummy-cookie/Yunzai-Bot.git 
gitee(国内优先)

git clone --depth=1 https://github.com/Yummy-cookie/Yunzai-Bot.git 
github
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

## Le佬版/喵佬版迁移教程
1. 执行(为了切换到饼干的云崽)

```
git remote set-url origin https://gitee.com/Yummy-cookie/Yunzai-Bot.git && git pull
```

2. 执行(为了重置到最新的更新)

```
git reset --hard origin
```

3. 执行(为了升级依赖，同时修复部分迁移用户因pm2问题无法重启与后台运行)

```
pnpm update
```

```
pnpm install -P
```

```
pnpm install pm2 -g
```

```
pm2 update
```

4. 执行

```
node ./node_modules/puppeteer/install.js
```

5. 运行（首次运行按提示输入登录）

```
node app
```

6. 登陆后后台运行（先按ctrl+c终止机器人运行，然后输入)

```
pnpm run start
```

## 致谢
| Nickname                                                     | Contribution                        |
| :----------------------------------------------------------: | ----------------------------------- |
|[GardenHamster](https://github.com/GardenHamster/GenshinPray) | 模拟抽卡背景素材来源 |
|[西风驿站](https://bbs.mihoyo.com/ys/collection/839181) | 角色攻略图来源 |
|[米游社友人A](https://bbs.mihoyo.com/ys/collection/428421) | 角色突破素材图来源 |

## 其他
- 图片素材来源于网络，仅供交流学习使用
- 严禁用于任何商业用途和非法行为
