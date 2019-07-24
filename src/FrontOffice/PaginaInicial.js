import React, {Component} from 'react';
import './PaginaInicial.css';
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'

class PaginaInicial extends Component {
  render(){
    return (
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2018/02/16/10/52/beverage-3157395_960_720.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>ASAF Enterprise</h3>
            <p>Soluções simples e eficazes, venha conhecer-nos</p>
            <Button variant="outline-info">Conhecer Empresa</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_960_720.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Recrutamento</h3>
            <p>Não perca a oportunidade de trabalhar numa super-equipa!</p>
            <Button variant="outline-info" href="/jobs">Ver Vagas</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2015/01/25/21/02/phone-612061_960_720.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Contacto</h3>
            <p>Tem alguma dúvida sobre nós? Contacte-nos já!</p>
            <Button variant="outline-info">Ver Contacto</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default PaginaInicial;
