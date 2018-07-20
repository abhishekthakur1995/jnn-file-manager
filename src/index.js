import { render } from 'react-dom'
import './css/style.css'
import registerServiceWorker from './registerServiceWorker'

render(<App />, document.getElementById('root'))
registerServiceWorker()