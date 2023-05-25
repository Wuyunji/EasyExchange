1. 启动项目之前
   需要将 package.json 中
   "start": "cross-env HOST=xxx.xxx.xxx.xxx react-scripts start"
   这条配置里的 xxx.xxx.xxx.xxx 替换成当前本机 ipv4 地址
   并且将 common 文件夹下的 constant.js 文件中的 IP 替换成当前本机 ipv4 地址

2. 输入 npm install 安装各种依赖

3. 通过 yarn start 来启动项目

win+R =>
输入 cmd 后回车 =>  
输入 ipconfig =>
找到 （IPv4 地址 . . . . . . . . . . . . : xxx.xxx.xxx.xxx）
