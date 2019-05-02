import React, {Component} from 'react';
import ChartComponent from './components/chartComponent';

class App extends Component{
  render(){
    return (
      <div className="App">
        <h1>Device Maps</h1>
        <ChartComponent />
      </div>
    );
  }
}

export default App;
