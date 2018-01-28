import ReactDOM from 'react-dom';
<<<<<<< HEAD
import Application from './components/Application.jsx';
=======
import Test from './test.jsx';
import Usertxt from './initialtxt.jsx';
import Chattxt from './chatroom.jsx'
>>>>>>> To rebase
import "../styles/index.scss";
import './actions'

<<<<<<< HEAD
ReactDOM.render(<Application/>, document.getElementById('root'));
=======
class Index extends Component {
  render() {
    return (
      <div>
      <Test />
      <Usertxt />
      </div>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'));
>>>>>>> To rebase
