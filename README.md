# Yunzai-Bot v3
云崽v3.0，原神qq群机器人，通过米游社接口，查询原神游戏信息，快速生成图片返回

项目仅供学习交流使用，严禁用于任何商业用途和非法行为

[目前功能](https://gitee.com/yoimiya-kokomi/Yunzai-Bot/tree/main/plugins/genshin)

## 使用方法
>环境准备： Windows or Linux，Node.js（[版本至少v16以上](http://nodejs.cn/download/)），[Redis](https://redis.io/docs/getting-started/installation/)

1.克隆项目
```
git clone --depth=1 -b main https://gitee.com/yoimiya-kokomi/Yunzai-Bot.git
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

## Le佬版迁移教程
1. 执行(为了切换到喵喵的云崽)

```
git remote set-url origin https://gitee.com/yoimiya-kokomi/Yunzai-Bot.git && git checkout main && git pull
```

2. 执行(为了重置到最新的更新)

```
git reset --hard origin/main
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
- 最后给个star或者[爱发电](https://afdian.net/@Le-niao)，你的支持是维护本项目的动力~~
- 图片素材来源于网络，仅供交流学习使用
- 严禁用于任何商业用途和非法行为
