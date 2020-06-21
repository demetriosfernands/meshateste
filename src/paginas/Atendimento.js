import React,{useEffect, useState, useRef} from 'react';
import './css/Atendimento.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.js';
import api from '../services/api';
import { Card, Descriptions, Tag, PageHeader, Button } from 'antd';

function Atendimento() {

  var myVar; //para dar stop no cronometro
  const inputRef = useRef([]); //necessário para diferenciar cada card da função map
  const [atendimento, setatendimento] = useState([]);

  useEffect(()=>{

    async function carregaratendimento (){
        const response = await api.get(`atendimento/`);
        setatendimento(response.data);
    }

    inputRef.current = new Array(atendimento.length);
    carregaratendimento();
},[])

  //esse outro useEffect é para a parte de diferenciar cada Card na função map
  useEffect( () => {
    if(atendimento.length !== 0) {
        inputRef.current[atendimento.length - 1].focus();
    }
  }, [atendimento]);

function converteMoeda(valor){
  return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function iniciarAtendimento(tempo, index){

  var min = parseInt(tempo);
  var seg = 60;

  myVar = setInterval(function(){
    //decrementamos a variavel seg a cada segundo
    //caso os segundos sejam menor que zero significa que passou um minuto
    //ai decrementamos a variavel minutos
    seg--;
    if(seg == -1){
      seg = 59;
      min--;
    }
    var horaImprimivel = '00:' + min + ':' + seg;
    inputRef.current[index].innerText = horaImprimivel;

  }, 1000);

}

function encerrarAtendimento(tempo, index){
  inputRef.current[index].innerText = tempo + "min";
  clearInterval(myVar);
  myVar = null;
}

async function removerServico(id){
  await api.delete(`atendimento/${id}`);
  document.location.reload(true); //recarrega a página após excluir um servico
}

  return (
    <div className="Atendimento">
      <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Acompanhamento de atendimento"
      >
        <Descriptions size="small" column={2}>
        <Descriptions.Item label="Quantidade de serviços"> 
            <b>{atendimento.length}</b> 
        </Descriptions.Item>
        <Descriptions.Item label="Valor total">
          <a>
              {converteMoeda(atendimento.map(atendimento => atendimento.price)
                  .reduce((anterior,atual)=>anterior+atual,0))}
          </a>
        </Descriptions.Item>
      </Descriptions>
      </PageHeader>
      <div className="servicos">
      {atendimento.map((atendimento,index) =>(  
          <Card title={atendimento.name} key={atendimento.id}>
          <p>Duração: <Tag color="green" ref={el => inputRef.current[index] = el}>{atendimento.duration} min</Tag></p>
          <p>Preço: <Tag color="green">{converteMoeda(atendimento.price)}</Tag></p>
          <div className="botoes">
          <Button type="default" onClick={() => iniciarAtendimento(atendimento.duration,index)}>Iniciar atendimento</Button>
          <Button type="primary" onClick={() => encerrarAtendimento(atendimento.duration,index)}>Encerrar atendimento</Button>        
          <Button type="danger" onClick={() => removerServico(atendimento.id)}>Remover</Button>        
          </div>          
          </Card>
      ))}
      </div>  
    </div>
  );
}
export default Atendimento;
