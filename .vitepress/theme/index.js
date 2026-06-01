import DefaultTheme from 'vitepress/theme'
import IframeViewer from './components/IframeViewer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('IframeViewer', IframeViewer)
  }
}
