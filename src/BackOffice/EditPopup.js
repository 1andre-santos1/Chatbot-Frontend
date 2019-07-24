import React, {Component} from 'react'
import './EditPopup.css'

class EditPopup extends Component{
    constructor(props){
        super(props);
        this.state={
            inputVaga: {}
        }
        this.handleCancelarEdicao = this.handleCancelarEdicao.bind(this);
        this.handleConfirmarEdicao = this.handleConfirmarEdicao.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }
    componentDidMount(){
        let vaga = {...this.state.inputVaga};
        this.setState({
            inputVaga: vaga
        });
    }
    handleCancelarEdicao(){
        this.props.cancelarEdicaoVaga();
    }
    handleConfirmarEdicao(){
        let vagaEditadaObj = {
            name: this.state.inputVaga.area,
            candidateDescript: this.state.inputVaga.descricao,
            remote: this.state.inputVaga.remote,
            formation: this.state.inputVaga.formation,
            travelOtCountrys: this.state.inputVaga.travelOtCountrys,
            shifts: this.state.inputVaga.shifts
        };
        this.props.editarVagaConfirmed(this.props.vaga.uuid,vagaEditadaObj);
    }
    handleRadioChange(e){
        let vaga = {...this.state.inputVaga};

        vaga[e.target.name] = !vaga[e.target.name];

        this.setState({
            inputVaga: vaga
        });
    }
    handleTextAreaChange(e){
        let vaga = {...this.state.inputVaga};

        vaga[e.target.name] = [e.target.value][0];

        this.setState({
            inputVaga: vaga
        });
    }
    render(){
        return(
            <div className="EditPopup">
                <div className="EditPopup-Container">
                    <h2 className="EditPopup-Title">Edição de Vaga</h2>
                    <span className="EditPopup-Attribute">Nome:</span>
                    <textarea className="EditPopup-TextArea EditPopup-TextArea-Name" type="text" value={this.state.inputVaga.name} placeholder={this.props.vaga.area} name="area" onChange={this.handleTextAreaChange}></textarea>

                    <span className="EditPopup-Attribute">Descrição de Candidato:</span>
                    <textarea className="EditPopup-TextArea" type="text" value={this.state.inputVaga.candidateDescript} placeholder={this.props.vaga.descricao} name="descricao" onChange={this.handleTextAreaChange}></textarea>

                    <span className="EditPopup-Attribute">Trabalho Remoto:</span>
                    <div className="EditPopup-Container-Radios">
                        <span>Sim</span><input type="radio" name="remote" checked={this.state.inputVaga.remote} onClick={this.handleRadioChange}></input>
                        <span>Não</span><input type="radio" name="remote" checked={!this.state.inputVaga.remote} onClick={this.handleRadioChange}></input>
                    </div>
                   
                    <span className="EditPopup-Attribute">Formação:</span>
                    <div className="EditPopup-Container-Radios">
                        <span>Sim</span><input type="radio" name="formation" checked={this.state.inputVaga.formation} onClick={this.handleRadioChange}></input>
                        <span>Não</span><input type="radio" name="formation" checked={!this.state.inputVaga.formation} onClick={this.handleRadioChange}></input>
                    </div>

                    <span className="EditPopup-Attribute">Viagens para fora:</span>
                    <div className="EditPopup-Container-Radios">
                        <span>Sim</span><input type="radio" name="travelOtCountrys" checked={this.state.inputVaga.travelOtCountrys} onClick={this.handleRadioChange}></input>
                        <span>Não</span><input type="radio" name="travelOtCountrys" checked={!this.state.inputVaga.travelOtCountrys} onClick={this.handleRadioChange}></input>
                    </div>
                    <span className="EditPopup-Attribute">Turnos:</span>
                    <div className="EditPopup-Container-Radios">
                        <span>Sim</span><input type="radio" name="shifts" checked={this.state.inputVaga.shifts} onClick={this.handleRadioChange}></input>
                        <span>Não</span><input type="radio" name="shifts" checked={!this.state.inputVaga.shifts} onClick={this.handleRadioChange}></input>
                    </div>          
                    <button className="EditPopup-Btn-Confirm" onClick={this.handleConfirmarEdicao}>Confirmar</button>
                    <button className="EditPopup-Btn-Cancel" onClick={this.handleCancelarEdicao}>Cancelar</button>
                </div>
            </div>
        );
    }
}

export default EditPopup;