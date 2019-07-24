import React, {Component} from 'react'
import './AddPopup.css'

class AddPopup extends Component{
    constructor(props){
        super(props);
        this.state = {
            vagaAdicionar: {
                name: '',
                candidateDescript: '',
                remote: false,
                formation: false,
                travelOtCountrys: false,
                shifts: false,
                location: '',
                area: ''
            }
        }
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleConfirmar = this.handleConfirmar.bind(this);
    }
    handleRadioChange(e){
        let vaga = {...this.state.vagaAdicionar};

        vaga[e.target.name] = !vaga[e.target.name];

        this.setState({
            vagaAdicionar: vaga
        });
    }
    handleTextAreaChange(e){
        let vaga = {...this.state.vagaAdicionar};

        vaga[e.target.name] = [e.target.value][0];

        this.setState({
            vagaAdicionar: vaga
        });
    }
    handleCancelar(){
        this.props.cancelarAdicaoVaga();
    }
    handleConfirmar(){
        this.props.adicionarVagaConfirmed(this.state.vagaAdicionar);
    }
    render(){
        return(
            <div className="AddPopup">
                <div className="AddPopup-Container">
                    <h2 className="AddPopup-Title">Adicionar Vaga</h2>

                    <span className="AddPopup-Attribute">Área:</span>
                    <span className="AddPopup-Attribute">Tipo:</span>
                    <span className="AddPopup-Attribute">Localização:</span>
                    <div className="AddPopup-Container-Attributes">
                        <textarea type="text" value={this.state.vagaAdicionar.area} placeholder="Infraestrutura..." name="area" onChange={this.handleTextAreaChange}></textarea>
                        <textarea type="text" value={this.state.vagaAdicionar.name} placeholder=".NET Developer..." name="name" onChange={this.handleTextAreaChange}></textarea>
                        <textarea type="text" value={this.state.vagaAdicionar.location} placeholder="Tomar..." name="location" onChange={this.handleTextAreaChange}></textarea>
                    </div>
                   
                    <div className="AddPopup-Container-Desc">
                    <span className="AddPopup-Attribute-Desc">Descrição de Candidato:</span>
                     <textarea className="AddPopup-Textarea-Desc" type="text" value={this.state.vagaAdicionar.candidateDescript} placeholder="Descrições do candidato separadas por ;" name="candidateDescript" onChange={this.handleTextAreaChange}></textarea>
                    </div>
                    
                    

                        <span className="AddPopup-Attribute-Remote">Trabalho Remoto:</span>
                        <span>Sim</span><input type="radio" name="remote" checked={this.state.vagaAdicionar.remote} onClick={this.handleRadioChange}></input>
                        <span>Não</span><input type="radio" name="remote" checked={!this.state.vagaAdicionar.remote} onClick={this.handleRadioChange}></input>
                    
                    <span className="AddPopup-Attribute-Formation">Formação:</span>
                    <span>Sim</span><input type="radio" name="formation" checked={this.state.vagaAdicionar.formation} onClick={this.handleRadioChange}></input>
                    <span>Não</span><input type="radio" name="formation" checked={!this.state.vagaAdicionar.formation} onClick={this.handleRadioChange}></input>

                    <span className="AddPopup-Attribute-Travel">Viagens para fora:</span>
                    <span>Sim</span><input type="radio" name="travelOtCountrys" checked={this.state.vagaAdicionar.travelOtCountrys} onClick={this.handleRadioChange}></input>
                    <span>Não</span><input type="radio" name="travelOtCountrys" checked={!this.state.vagaAdicionar.travelOtCountrys} onClick={this.handleRadioChange}></input>

                    <span className="AddPopup-Attribute-Shifts">Turnos:</span>
                    <span>Sim</span><input type="radio" name="shifts" checked={this.state.vagaAdicionar.shifts} onClick={this.handleRadioChange}></input>
                    <span>Não</span><input type="radio" name="shifts" checked={!this.state.vagaAdicionar.shifts} onClick={this.handleRadioChange}></input>

                    <button onClick={this.handleConfirmar}>Confirmar</button>
                    <button onClick={this.handleCancelar}>Cancelar</button>
                </div>
            </div>
        );
    }
}

export default AddPopup;