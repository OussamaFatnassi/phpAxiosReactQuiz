import react from 'react';
import './App.css';
import Quiz from './components/Quiz';
class App extends react.Component {
  render(){  
    return (
      <div className='App' >
        <h1>Mon Quiz</h1>
        <Quiz/>
      </div>
    );
  }
}

export default App;
