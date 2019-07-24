import React,{Component} from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import './Vaga.css'
import JanelaChatVaga from './JanelaChatVaga'

class Vaga extends Component{
    constructor(props){
        super(props);
        this.state={
            isShowingJanelaChat: false
        }
        this.handleShowChatVaga = this.handleShowChatVaga.bind(this);
    }
    handleShowChatVaga(evt){
        if(!this.state.isShowingJanelaChat){
            evt.target.classList.remove('robotIcon-DeactivateChat');
            evt.target.classList.add('robotIcon-ActivateChat');
        }
        else{
            evt.target.classList.remove('robotIcon-ActivateChat');
            evt.target.classList.add('robotIcon-DeactivateChat');
        }
        this.setState({
            isShowingJanelaChat: !this.state.isShowingJanelaChat
        })
    }
    render(){
        return(
            <div className="Vaga">
                            <Card className={true && "showingCard"}>
                                <Accordion.Toggle as={Card.Header} eventKey={this.props.id}>
                                    <span class="TextoPrincipal_Area">{this.props.area}</span>
                                    <span class="TextoPrincipal_Localizacao">
                                        <img src={require('../images/geolocation.png')} />
                                        {this.props.localizacao}
                                    </span>
                                    </Accordion.Toggle>
                                <Accordion.Collapse eventKey={this.props.id}>
                                    <Card.Body>
                                            <span>Descrição do Perfil:</span>
                                            <ul>
                                                {this.props.descricao.map(d => <li>{d}</li>)}
                                            </ul>
                                            <span>Publicado em: {this.props.data}</span>
                                            {
                                                this.state.isShowingJanelaChat &&
                                                <JanelaChatVaga id={this.props.id} area={this.props.area} localizacao={this.props.localizacao}/> 
                                            }
                                                <div onClick={this.handleShowChatVaga} class="VagaChatbot robotIcon">
                                                </div>
                                            {
                                                !this.state.isShowingJanelaChat &&
                                                <div class="VagaChatbotQuestion">Clica em mim se precisares de ajuda!</div>
                                            }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
            </div>
        );
    }
}

export default Vaga;