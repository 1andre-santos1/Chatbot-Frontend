import React, {Component} from 'react'
import './JanelaChatGeral.css'
import axios from 'axios'

class JanelaChatGeral extends Component{
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
            'https://asaf-enterprise-chatbot-api.herokuapp.com/generalQuestions',
            {text:''}
        );

        this.setState({
            inicioConversa: <span className="JanelaChatGeral-Node-Chatbot">{response.data.output.text[0]}</span>
        });
    }
    async handleSubmit(evt){
        evt.preventDefault();

        if(this.state.pergunta === '')
            return;

        this.adicionarMensagem(this.state.pergunta,"user");

        var response = await axios.post(
            'https://asaf-enterprise-chatbot-api.herokuapp.com/generalQuestions',
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
            
            if(apiRequests[i].includes(':idLocal/:idArea')){
                let localValue = response.data.entities[0].value;
                let areaValue = response.data.entities[1].value;

                let localResponse = await axios.get('https://asaf-enterprise-chatbot-api.herokuapp.com/api/locations');
                let localId;
                for(let j = 0; j < localResponse.data.length; j++)
                {
                    if(localResponse.data[j].name === localValue)
                    {
                        localId = localResponse.data[j].id;
                        let strAux = '' + localId;
                        apiRequests[i] = apiRequests[i].replace(':idLocal',strAux);
                        break;
                    }
                }
                let areaResponse = await axios.get('https://asaf-enterprise-chatbot-api.herokuapp.com/api/areas');
                let areaId;
                for(let j = 0; j < areaResponse.data.length; j++)
                {
                    if(areaResponse.data[j].name === areaValue)
                    {
                        areaId = areaResponse.data[j].id;
                        let strAux = ''+areaId;
                        apiRequests[i] = apiRequests[i].replace(':idArea',strAux);
                        break;
                    }
                }

                //pedido a localhost:8000/api/jobs/:idLocal/:idArea
                let apiResponse = await axios.get(`https://asaf-enterprise-chatbot-api.herokuapp.com/${apiRequests[i]}`);

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

                watsonResponse = watsonResponse.replace("{/api/jobs/:idLocal/:idArea}", strAux);
            }

            else if(apiRequests[i].includes(",count"))
            {
                apiRequests[i] = apiRequests[i].replace(",count","");

                let apiResponse = await axios.get(`https://asaf-enterprise-chatbot-api.herokuapp.com/${apiRequests[i]}`);

                watsonResponse = watsonResponse.replace("{"+apiRequests[i]+",count}",apiResponse.data.length);
            }
            else{
                let apiResponse = await axios.get(`https://asaf-enterprise-chatbot-api.herokuapp.com/${apiRequests[i]}`);


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

                console.log(watsonResponse)
                watsonResponse = watsonResponse.replace("{"+apiRequests[i]+"}", strAux);
            }
        }   

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
            className:(tipo === "chatbot") ? "JanelaChatGeral-Node-Chatbot scale-up-center" : "JanelaChatGeral-Node-User scale-up-center"
        };
        
        let auxAr = [...this.state.dialog];
        auxAr.push(obj);

        this.setState({
            dialog: auxAr
        });

        let formObj = document.getElementsByClassName('JanelaChatGeral-Dialog')[0];
        formObj.scrollTop = formObj.scrollHeight;
    }
    render(){
        return(
            <div className={"JanelaChatGeral "+this.state.className}>
               <div className="JanelaChatGeral-Banner">
                   <h1 className="JanelaChatGeral-Banner-Title">Bem-vindo 👋</h1>
                   <h2 className="JanelaChatGeral-Banner-SubTitle">
                        Pergunta-nos qualquer coisa, estamos sempre à procura de alguém para conversar :)
                    </h2>
               </div>
               <div className="JanelaChatGeral-Dialog">
                {this.state.inicioConversa}
                {this.state.dialog.map(n => 
                    <span className={n.className}>{n.text}</span>
                )}
               </div>
               <div className="JanelaChatGeral-Form">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input onChange={this.handleChange} className="JanelaChatGeral-Form-Input" 
                        placeholder="Pergunte aqui..." name="pergunta" value={this.state.pergunta}/>
                </form>
               </div>
            </div>
        );
    }
}


export default JanelaChatGeral;