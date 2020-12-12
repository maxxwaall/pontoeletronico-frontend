import React, { Component } from 'react';

import GlobalStyle from './styles/global';
import BatidaPonto from './components/batidaponto';
import api from './services/api';

class App extends Component {

  state = {
    responseData: ""
  }

  async componentWillMount(){
    //const response = await api.get("dailyrecord");
    this.getRecords();
  }

  getRecords(){
    api.get("dailyrecord")
        .then(response => {
        this.setState({
            responseData: JSON.stringify(response.data)
        });
    });
  }

  render() {
    const { responseData } = this.state;

    return (
      <BatidaPonto>
        {responseData}
        <GlobalStyle />
      </BatidaPonto>
    );
  }
}

export default App;
