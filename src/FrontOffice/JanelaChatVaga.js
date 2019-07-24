import React, {Component} from 'react'
import axios from 'axios'
import './JanelaChatVaga.css'

class JanelaChatVaga extends Component{
    constructor(props){
        super(props);
        this.state={
            inicioConversa: null,
            pergunta: '',
            dialog: [],
            className: 'slide-in-blurred-bottom'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount(){
        let response = await axios.post(
            'https://asaf-enterprise-chatbot-api.herokuapp.com/specificQuestions',
            {text:''}
        );

        this.setState({
            inicioConversa: <span className="JanelaChatVaga-Node-Chatbot">{response.data.output.text[0]}</span>
        });
    }
    async handleSubmit(evt){
        evt.preventDefault();

        if(this.state.pergunta === '')
            return;

        this.adicionarMensagem(this.state.pergunta,"user");

        var response = await axios.post(
            'https://asaf-enterprise-chatbot-api.herokuapp.com/specificQuestions',
             {text:this.state.pergunta}
        );

        var watsonResponse = response.data.output.text[0];

        var apiRequests = [],          // an array to collect the strings that are found
            rxp = /{([^}]+)}/g,
            str = watsonResponse,
            curMatch;

        while( curMatch = rxp.exec( str ) ) {
            apiRequests.push( curMatch[1] );
        }

        for(let i = 0; i < apiRequests.length; i++){

            let responseArray = apiRequests[i].split(', ');

            //se estiver a ser pedido apenas o name da vaga
            if(responseArray.length === 1){
                let apiResponse = await axios.get(`hhttps://asaf-enterprise-chatbot-api.herokuapp.com/${responseArray[i]}//${this.props.id}`);
                let values = [];
                for(let j = 0; j < apiResponse.data.length; j++){
                    values.push(apiResponse.data[j].name);
                }

                let strAux = '';
                for(let j = 0; j < values.length; j++){
                    strAux += values[j];
                    if(j < values.length -1)
                        strAux += ', '
                }

                watsonResponse = watsonResponse.replace("{"+apiRequests[i]+"}", strAux);
            }
            else if(responseArray.length === 4){
                let apiResponse = await axios.get(`https://asaf-enterprise-chatbot-api.herokuapp.com/${responseArray[i]}${this.props.id+1}`);

                let valueAttribute = apiResponse.data[0][responseArray[1]];
                
                let strAux = (valueAttribute) ? responseArray[2] : responseArray[3];

                watsonResponse = watsonResponse.replace("{"+apiRequests[i]+"}", strAux);
            }
            else if(responseArray.length > 4){
                let apiResponse = await axios.get(`https://asaf-enterprise-chatbot-api.herokuapp.com/${responseArray[i]}${this.props.id+1}`);

                let valueAttribute = apiResponse.data[0][responseArray[1]];
                
                let strAux = (valueAttribute) ? responseArray[2] : responseArray[3];
                
                watsonResponse = watsonResponse.replace("{"+apiRequests[i]+"}", strAux);

                if(valueAttribute)
                {
                    for(let j = 4; j < responseArray.length; j++)
                        watsonResponse += (responseArray[j]+" ");
                }
            }
        }   
        
        watsonResponse = watsonResponse.replace(/\"/g, "")
        
        this.adicionarMensagem(watsonResponse,"chatbot");

        this.setState({
            pergunta: ''
        })
    }
    handleChange(evt){
        this.setState({
            pergunta: evt.target.value
        })
    }
    adicionarMensagem(str,tipo){
        let obj = {
            text: str, 
            className:(tipo === "chatbot") ? "JanelaChatVaga-Node-Chatbot scale-up-center" : "JanelaChatVaga-Node-User scale-up-center"
        };
        
        let auxAr = [...this.state.dialog];
        auxAr.push(obj);

        this.setState({
            dialog: auxAr
        });

        let formObj = document.getElementsByClassName('JanelaChatVaga-Dialog')[0];
        formObj.scrollTop = formObj.scrollHeight;
    }
    render(){
        return(
            <div className={"JanelaChatVaga "+this.state.className}>
                <div className="JanelaChatVaga-Banner">
                   <span className="JanelaChatVaga-Banner-Title">
                        {this.props.area} 💼
                    </span>
                </div>
                <div className="JanelaChatVaga-Dialog">
                    {this.state.inicioConversa}
                    {this.state.dialog.map(n => 
                        <span className={n.className}>{n.text}</span>
                    )}
                </div>
                <div className="JanelaChatVaga-Form">
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input onChange={this.handleChange} className="JanelaChatGeral-Form-Input" 
                            placeholder="Pergunte aqui..." name="pergunta" value={this.state.pergunta}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default JanelaChatVaga;