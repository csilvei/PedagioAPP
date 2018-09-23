import vue from 'vue'
import App from './app'


new vue({
    // cria o elemento dentro da pagina
    render: h => h(App),
}).$mount("#app")