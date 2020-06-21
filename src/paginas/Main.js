import React,{useEffect, useState} from 'react';
import './css/Main.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.js';
import api from '../services/api';
import { Card, Tag, Button } from 'antd';
import {Link} from 'react-router-dom';

function Main() {

  const [service, setService] = useState([]);

  useEffect(()=>{

    async function carregarServicos(){
        const response = await api.get('/services');
        setService(response.data);
    }

    carregarServicos();
},[])

  function converteMoeda(valor){
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  async function incluirNoAtendimento(servico){
    //console.log({...servico});
    const response = await api.get(`/atendimento/`);
    const filtro = response.data.find(filtro => filtro.id == servico.id);
    //caso o find não encontrar o servico pelo id ele vai retornar undefined
    //ai inserimos na api, se ele não retornar undefined é pq o serviço já foi adicionado
    //ai não inserimos nada
    if(filtro == undefined){
      await api.post(`/atendimento/`,{...servico});
      alert('Serviço adicionado ao atendimento');
    }else{
      alert('Você já adicionou este serviço');
    }
  }
  return (
    <div className="App">
      {service.map(servico =>(  
          <Card title={servico.name} key={servico.id} id="card">
          <p>Duração: <Tag color="green">{servico.duration} min</Tag></p>
          <p>Preço: <Tag color="green">{converteMoeda(servico.price)}</Tag></p>
          <Link to={`/services/${servico.id}`}>
            <Button type="default">Sobre</Button>
          </Link>
          <Button type="default" onClick={() => incluirNoAtendimento(servico)}>Incluir</Button>
          </Card>
      ))}  
      <div className="acoes">
        <Link to={`/atendimento`}>
          <Button type="primary">Acompanhar atendimento</Button>
        </Link>
      </div>
    </div>
  );
}
export default Main;
