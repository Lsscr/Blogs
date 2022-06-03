import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/other/guide/" : "structure",
  "/posts/Vue2.X/" : "structure",
  "/posts/NodeJS/" : "structure",
  "/Algorithm/":"structure",
  '/other/':[{
    text: 'Other',
    prefix:'/other/',
    children: [
      {
        text:'我的小助手',
        prefix:'My-assistance/',
        children: [
          {
            text:'git命令',
            icon:'eye',
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
        ]},

    ],
  }],
});
