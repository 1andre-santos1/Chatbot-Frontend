import React, { Component } from 'react';
import BackOffice_Vaga from './BackOffice_Vaga'
import axios from 'axios'
import uuid from 'uuid/v4'
import RemovePopup from './RemovePopup'
import jwt from 'jsonwebtoken';
import EditPopup from './EditPopup';
import AddPopup from './AddPopup';

class VagasIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vagas: [],
            isShowingRemovePopup: false,
            isShowingEditPopup: false,
            vagaToRemove: {},
            vagaToEdit: {},
            isShowingAddPopup: false
        }
        this.removerVaga = this.removerVaga.bind(this);
        this.cancelarRemocaoVaga = this.cancelarRemocaoVaga.bind(this);
        this.removerVagaConfirmed = this.removerVagaConfirmed.bind(this);
        this.editarVaga = this.editarVaga.bind(this);
        this.editarVagaConfirmed = this.editarVagaConfirmed.bind(this);
        this.cancelarEdicaoVaga = this.cancelarEdicaoVaga.bind(this);
        this.adicionarVagaConfirmed = this.adicionarVagaConfirmed.bind(this);
        this.handleAddVaga = this.handleAddVaga.bind(this);
    }
    componentDidMount() {
        
        this.fetchVagas();

        this.testeToken();
    }
    async fetchVagas(){
        let response = await axios.get('https://asaf-enterprise-chatbot-api.herokuapp.com/api/jobs/');
        let auxArray = [];

        for (let i = 0; i < response.data.length; i++) {
            let curVaga = response.data[i];
            let responseLocalizacao = await axios.get(`https://asaf-enterprise-chatbot-api.herokuapp.com/api/location/${curVaga.location}`);
            let vaga = {
                area: curVaga.name,
                localizacao: responseLocalizacao.data[0].name,
                remote: curVaga.remote,
                travelOtCountrys: curVaga.travelOtCountrys,
                shifts: curVaga.shifts,
                formation: curVaga.formation,
                id: curVaga.id,
                descricao: curVaga.candidateDescript,
                data: curVaga.createdAt.substring(0, curVaga.createdAt.indexOf('T')),
                uuid: uuid()
            };
            auxArray.push(vaga);
        }
        this.setState({
            vagas: auxArray
        });
    }
    testeToken() {
        try {
            var decoded = jwt.decode(sessionStorage.getItem('token'));
            console.log(decoded.username);
        } catch{
            window.location = "/login";
        }
    }
    stringToArray(str) {
        let ar = str.split(";");
        ar.pop();
        return ar;
    }
    removerVaga(uuid) {

        let vaga;
        let aux = [...this.state.vagas];
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].uuid === uuid) {
                vaga = aux[i];
                break;
            }
        }
        if (vaga !== null) {
            this.setState({
                vagaToRemove: vaga,
                isShowingRemovePopup: true
            });
        }
    }
    editarVaga(uuid){
        let vaga;
        let aux = [...this.state.vagas];
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].uuid === uuid) {
                vaga = aux[i];
                break;
            }
        }
        if(vaga !== null){
            this.setState({
                vagaToEdit: vaga,
                isShowingEditPopup:true
            })
        }

    }
    cancelarRemocaoVaga() {
        this.setState({
            vagaToRemove: {},
            isShowingRemovePopup: false
        });
    }
    cancelarEdicaoVaga(){
        this.setState({
            vagaToEdit: {},
            isShowingEditPopup: false
        });
    }
    async removerVagaConfirmed(uuid) {
        let vaga;
        let aux = [...this.state.vagas];
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].uuid === uuid) {
                vaga = aux[i];
                break;
            }
        }

        if (vaga !== null) {
            await axios.delete(`https://asaf-enterprise-chatbot-api.herokuapp.com/api/jobs/delete/${vaga.id}`);
            aux.filter(v => v !== vaga);
            this.setState({
                vagas: aux
            });
            this.setState({
                isShowingRemovePopup: false
            })
        }
        this.fetchVagas();
    }
    async editarVagaConfirmed(uuid,vagaEditadaObj){
        let vaga;
        let aux = [...this.state.vagas];
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].uuid === uuid) {
                vaga = aux[i];
                break;
            }
        }

        if(vaga !== null){
            await axios.put(`https://asaf-enterprise-chatbot-api.herokuapp.com/api/jobs/update/${vaga.id}`,vagaEditadaObj);
            

            this.setState({
                isShowingEditPopup: false,
                vagaToEdit: {}
            });

            this.fetchVagas();
        }
    }
    async adicionarVagaConfirmed(vaga){
        if(vaga != null){
            let locationText = vaga.location;
            let areaText = vaga.area;
            let areaId = -1;
            let locationId = -1;
    
            let responseLocations = await axios.get('https://asaf-enterprise-chatbot-api.herokuapp.com/api/locations');
            for(let i = 0; i < responseLocations.data.length; i++){
                let obj = responseLocations.data[i];
                if(obj.name.toLowerCase() === locationText.toLowerCase())
                {
                    locationId = obj.id;
                    break;
                }
            }
            if(locationId === -1){
                let locationAux = locationText.toLowerCase();
                locationAux = locationAux.charAt(0).toUpperCase() + locationAux.slice(1);
                let res = await axios.post('https://asaf-enterprise-chatbot-api.herokuapp.com/api/location/new',{
                    name: locationAux
                });
                locationId = res.data.id;
            }
    
            let responseAreas = await axios.get('https://asaf-enterprise-chatbot-api.herokuapp.com/api/areas');
            for(let i = 0; i < responseAreas.data.length; i++){
                let obj = responseAreas.data[i];
                if(obj.name.toLowerCase() === areaText.toLowerCase())
                {
                    areaId = obj.id;
                    break;
                }
            }
            if(areaId === -1){
                let areaAux = areaText.toLowerCase();
                areaAux = areaAux.charAt(0).toUpperCase() + areaAux.slice(1);
                let res = await axios.post('https://asaf-enterprise-chatbot-api.herokuapp.com/api/areas/new',{
                    name: areaAux
                });
                areaId = res.data.id;
            }

            await axios.post("https://asaf-enterprise-chatbot-api.herokuapp.com/api/jobs/new",{
                name: vaga.name,
                candidateDescript: vaga.candidateDescript,
                remote: vaga.remote,
                formation: vaga.formation,
                travelOtCountrys: vaga.travelOtCountrys,
                shifts: vaga.shifts,
                location: locationId,
                area: areaId
            });
        }

        this.setState({
            isShowingAddPopup: false
        });
        this.fetchVagas();
    }
    handleAddVaga(){
        this.setState({
            isShowingAddPopup: true
        })
    }
    render() {
        return (
            <div className="BackOffice_ListaVagas">
                <button onClick={this.handleAddVaga}>Adicionar Vaga</button>
                {this.state.vagas.map(v =>
                    <BackOffice_Vaga
                        area={v.area}
                        localizacao={v.localizacao}
                        descricao={this.stringToArray(v.descricao)}
                        data={v.data}
                        id={v.id}
                        uuid={v.uuid}
                        removerVaga={this.removerVaga}
                        editarVaga={this.editarVaga}
                    />
                )}
                {
                    this.state.isShowingRemovePopup &&
                    <RemovePopup
                        vaga={this.state.vagaToRemove}
                        removerVagaConfirmed={this.removerVagaConfirmed}
                        cancelarRemocaoVaga={this.cancelarRemocaoVaga} />
                }
                {
                    this.state.isShowingEditPopup &&
                    <EditPopup 
                        vaga={this.state.vagaToEdit}
                        editarVagaConfirmed={this.editarVagaConfirmed}
                        cancelarEdicaoVaga={this.cancelarEdicaoVaga}
                        />
                }
                {
                    this.state.isShowingAddPopup &&
                    <AddPopup
                        adicionarVagaConfirmed={this.adicionarVagaConfirmed}
                        cancelarAdicaoVaga={this.cancelarEdicaoVaga} />
                }
                <h1>{sessionStorage.getItem('token').username}</h1>
            </div>
        );
    }
}

export default VagasIndex;