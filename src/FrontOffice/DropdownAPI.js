import React, {Component} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import './DropdownAPI.css'

class DropdownAPI extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        let value = e.target.textContent;
        
        this.props.filterJobs(this.props.nome,value);
    }
    render(){
        return(
            <div className="DropdownAPI">
                <Dropdown as={ButtonGroup}>
                    <Button >{this.props.nome}</Button>
                    <Dropdown.Toggle split id="dropdown-split-basic" />
                        <Dropdown.Menu className="DrowpdownMenu" >
                            <Dropdown.Item active onClick={this.handleChange}>Tudo</Dropdown.Item>
                            {
                                this.props.list.map((i,index) => 
                                    <Dropdown.Item onClick={this.handleChange}>{i.nome}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                </Dropdown>
            </div>
        );  
    }
}

export default DropdownAPI;