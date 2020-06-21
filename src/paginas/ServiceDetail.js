import React,{useEffect, useState} from 'react';
import './css/ServiceDetail.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.js';
import api from '../services/api';
import { Card, Tag, Button} from 'antd';
import {Link} from 'react-router-dom';

function ServiceDetail({match}) {

  const [servico, setServico] = useState([]);

  useEffect(()=>{

    async function carregarServico(){
        const response = await api.get(`services/`);
        setServico(response.data.filter(servico => servico.id == match.params.id))
    }

    carregarServico();
},[match.params.id])

  return (
    <div className="servico">
      {servico.map(servico =>(  
          <Card title={servico.name} key={servico.id}>
          <p>Duração: <Tag color="green">{servico.duration} min</Tag></p>
          <p>Preço: <Tag color="green">{servico.price}</Tag></p>
          <Link to="/"><Button type="default">Voltar</Button></Link>
          </Card>
      ))}  
    </div>
  );
}
export default ServiceDetail;
