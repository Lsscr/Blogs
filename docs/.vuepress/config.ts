import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Lsccr",
  description: "Lsccr 的个人博客",

  base: "/",

  theme,
});
