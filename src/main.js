import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import { Button, NavBar, Tab, Tabs, Search, Swipe, SwipeItem, Grid, GridItem } from 'vant';
import Vant from "vant";
import 'vant/lib/index.css';

const app = createApp(App);

app.use(createPinia())
// app.use(NavBar)
// app.use(Tab)
// app.use(Tabs)
// app.use(Search)
// app.use(Swipe)
// app.use(SwipeItem)
// app.use(Grid)
// app.use(GridItem)
// app.use(Button)
app.use(Vant)

app.use(router).mount('#app')
