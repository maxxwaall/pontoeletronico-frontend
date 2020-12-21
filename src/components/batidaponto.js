import React, { Component } from "react";
import api from '../services/api';
import './batidaponto.css';

export default class Register extends Component {

      constructor(props){
        super(props);
        
        this.state = {
          value: '',
          dailyRecords: []
        };
      }
    
      handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
        console.log(this.state);
      }
    
      handleSubmit(event) {

        if(!this.validInput()){
          alert('Preencha a matrícula');
          return;
        }

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
        //event.preventDefault();
      }

      showRecords(){

        if(!this.validInput()) {
          alert('Preencha a matrícula');
          return;
        }

        api.get("dailyrecord/" + this.state.value)
            .then(response => {
              console.log(response.data);
              this.setState({
                  dailyRecords: response.data
              });
            });

        console.log(this.state.dailyRecords);

        document.getElementsByClassName('main-container')[0].style.display = 'none';
        document.getElementsByClassName('dailyrecords')[0].style.display = 'block';
      }

      validInput(){
        return this.state.value ? true : false;
      }

      back(){
        window.location.href = window.location.href;
      }

      render() {

        const { value, dailyRecords } = this.state;

        return (
            <div className="ponto-container">
                <div className="main-container">
                    <h1>[k] Ponto eletrônico</h1>
                    <div className="content-container"> 
                      <label className="labels">Matrícula</label>
                      <input value={value} onChange={e => this.handleChange(e)} />
                      <button type="submit" onClick={e => this.handleSubmit()}>Registrar</button>
                      <button type="submit" onClick={e => this.showRecords()}>Visualizar registros</button>
                    </div>
                </div>

                <React.Fragment>
                <div className="dailyrecords">
                    <h2>Registros</h2>
                    <button type="submit" onClick={e => this.back()}>Voltar</button>
                    {(
                      dailyRecords.map(record => {
                        const { time__c, sfid, registernumber__c } = record;
                        return (
                          <div key={sfid}>
                            <p>Id Salesforce: {sfid}</p>
                            <p>Data/Hora do Registro: {time__c}</p>
                            <p>Matrícula: {registernumber__c}</p>
                            <hr />
                          </div>
                        )
                      })
                    )}
                </div>
                </React.Fragment>
            </div>
        );
      }
}