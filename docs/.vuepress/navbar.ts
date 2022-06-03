import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {text: "我的收藏", icon: "eye", link: '/star/'},
  {
    text: "代码笔记",
    icon: "edit",
    prefix: "/posts",
    children: [
      {
        text: "前端框架",
        prefix: '/',
        children: [
          {
            text: "Vue2.X",
            icon: "edit",
            link: "Vue2.X/",
          },
          {
            text: "React",
            icon: "edit",
            link: "React/",
          },
            ]
      },
      {
        text:"NodeJS",
        icon:'edit',
        link:'/NodeJS/'
      }
    ],
  },
  {
    text: 'Algorithm',
    icon: 'page',
    link: '/Algorithm/'
  },
  {
    text:'other',
    icon:'edit',
    prefix: '/other/',
    children: [
      {
        text:'我的辅助',
        icon:'edit',
        prefix: 'My-assistance/',
        children: [
          {
            text:'git命令',
            icon:'edit',
            link: 'git',
          },
          {
            text:'openGauss&CentOS命令',
            icon:'edit',
            link:'openGauss'
          },
          {
            text:'Ubuntu&MySQL命令',
            icon:'edit',
            link:'Ubuntu'
          }
            ],
      },
      {
        text: 'Vuepress主题页面说明',
        link : 'guide/',
      },
    ],
  }
]);
