import React, { Component } from 'react';
import Start from './page/Start'

class App extends Component {


  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" crossorigin="anonymous"></link>
        <Start />
        <script src="lib/js/jquery-3.2.1.min.js"></script>
        <script src="lib/js/dictate.js"></script>
        <script src="lib/js/recorder.js"></script>
        <script src="lib/js/responsivevoice.js"></script>
      </div>
    );
  }
}

export default App;
