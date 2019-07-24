import React,{Component} from 'react'

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
                <h1>Tem a certeza que quer remover esta vaga?</h1>
                <button onClick={this.handleConfirmarRemocao}>Sim</button>
                <button onClick={this.handleCancelarRemocao}>Não</button>
            </div>
        );
    }
}

export default RemovePopup;