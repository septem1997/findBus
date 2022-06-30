import {defineNuxtPlugin} from '#app';
import {
    Tabbar,
    DatetimePicker,
    TabbarItem, Field, Search, Tag, Cell, NavBar, Skeleton, Icon, Popup, Toast, Form, CellGroup, Button
} from 'vant';

// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp
        .use(Tabbar)
        .use(TabbarItem)
        .use(Field)
        .use(Search)
        .use(Tag)
        .use(DatetimePicker)
        .use(Cell)
        .use(NavBar)
        .use(Skeleton)
        .use(Icon)
        .use(Popup)
        .use(Toast)
        .use(Form)
        .use(CellGroup)
        .use(Button)
});
