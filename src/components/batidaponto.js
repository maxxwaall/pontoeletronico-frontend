import React, { Component } from "react";
import api from '../services/api';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Registrar: ' + this.state.value);
        const data = new FormData();

        data.append("dailyrecord", this.state.value);

        api.post("/dailyrecord", {'RegisterNumber': this.state.value})
        .then(response => {
          console.log(response);
          if(response.status === 200){
            alert('Registro realizado com sucesso!');
          }
        })
        .catch((e) => {
          alert('Erro ao registrar ponto: ' + e);
        });
        event.preventDefault();
      }

      redirect(){
        alert('Redirect: ' + this.state.value);
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label> Matrícula </label>
            <input value={this.state.value} onChange={this.handleChange} />
            <button type="submit" value="Submit">Registrar</button>
          </form>
        );
      }
}