import React, {Component} from 'react'
import './BackOffice_Vaga.css'

class BackOffice_Vaga extends Component{
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleRemove(){
        this.props.removerVaga(this.props.uuid);
    }
    handleEdit(){
        this.props.editarVaga(this.props.uuid);
    }
    render(){
        return(
            <div className="BackOffice_Vaga">
                <div className="BackOffice_Vaga-Header">
                    <span className="BackOffice_Vaga-Area">{this.props.area}</span>
                    <span className="BackOffice_Vaga-Localizacao">
                        <img src={require('../images/geolocation.png')} />
                        {this.props.localizacao}
                    </span>
                </div>
                
                <ul className="BackOffice_Vaga-Descricao">
                    {this.props.descricao.map(d => <li className="BackOffice_Vaga-Descricao-Item">{d}</li>)}
                </ul>
                <span className="BackOffice_Vaga-Data">{this.props.data}</span>
                <button className="BackOffice_Vaga-BtnEditar" onClick={this.handleEdit}>Editar</button>
                <button className="BackOffice_Vaga-BtnRemover" onClick={this.handleRemove}>Remover</button>
            </div>
        );
    }
}

export default BackOffice_Vaga;