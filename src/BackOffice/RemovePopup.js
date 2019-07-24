import React,{Component} from 'react'
import './RemovePopup.css'

class RemovePopup extends Component{
    constructor(props){
        super(props);
        this.handleCancelarRemocao = this.handleCancelarRemocao.bind(this);
        this.handleConfirmarRemocao = this.handleConfirmarRemocao.bind(this);
    }
    handleCancelarRemocao(){
        this.props.cancelarRemocaoVaga();
    }
    handleConfirmarRemocao(){
        this.props.removerVagaConfirmed(this.props.vaga.uuid);
    }
    render(){
        return(
            <div className="RemovePopup">
                <div className="RemovePopup-Container">
                    <span className="RemovePopup-Title">Remover Vaga</span>
                    <span className="RemovePopup-SubTitle">Tem a certeza que quer remover esta vaga?</span>
                    <div className="RemovePopup-Buttons">
                        <button className="RemovePopup-Btn-Confirm" onClick={this.handleConfirmarRemocao}>Sim</button>
                        <button className="RemovePopup-Btn-Cancel" onClick={this.handleCancelarRemocao}>Não</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RemovePopup;