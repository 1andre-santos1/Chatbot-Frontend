import React, {Component} from 'react'

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
                <h2>Adicionar Vaga</h2>

                <span>Área:</span>
                <textarea type="text" value={this.state.vagaAdicionar.area} placeholder="Área da vaga..." name="area" onChange={this.handleTextAreaChange}></textarea>

                <span>Tipo:</span>
                <textarea type="text" value={this.state.vagaAdicionar.name} placeholder="Tipo de vaga..." name="name" onChange={this.handleTextAreaChange}></textarea>

                <span>Descrição de Candidato:</span>
                <textarea type="text" value={this.state.vagaAdicionar.candidateDescript} placeholder="Descrição do candidato" name="candidateDescript" onChange={this.handleTextAreaChange}></textarea>

                <span>Localização:</span>
                <textarea type="text" value={this.state.vagaAdicionar.location} placeholder="Localização" name="location" onChange={this.handleTextAreaChange}></textarea>

                <span>Trabalho Remoto:</span>
                <span>Sim</span><input type="radio" name="remote" checked={this.state.vagaAdicionar.remote} onClick={this.handleRadioChange}></input>
                <span>Não</span><input type="radio" name="remote" checked={!this.state.vagaAdicionar.remote} onClick={this.handleRadioChange}></input>
               
                <span>Formação:</span>
                <span>Sim</span><input type="radio" name="formation" checked={this.state.vagaAdicionar.formation} onClick={this.handleRadioChange}></input>
                <span>Não</span><input type="radio" name="formation" checked={!this.state.vagaAdicionar.formation} onClick={this.handleRadioChange}></input>
                
                <span>Viagens para fora:</span>
                <span>Sim</span><input type="radio" name="travelOtCountrys" checked={this.state.vagaAdicionar.travelOtCountrys} onClick={this.handleRadioChange}></input>
                <span>Não</span><input type="radio" name="travelOtCountrys" checked={!this.state.vagaAdicionar.travelOtCountrys} onClick={this.handleRadioChange}></input>
               
                <span>Turnos:</span>
                <span>Sim</span><input type="radio" name="shifts" checked={this.state.vagaAdicionar.shifts} onClick={this.handleRadioChange}></input>
                <span>Não</span><input type="radio" name="shifts" checked={!this.state.vagaAdicionar.shifts} onClick={this.handleRadioChange}></input>

                <button onClick={this.handleConfirmar}>Confirmar</button>
                <button onClick={this.handleCancelar}>Cancelar</button>
            </div>
        );
    }
}

export default AddPopup;