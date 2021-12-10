import React, { Component } from 'react';

//tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';

 

import Form from './Form';


import './Main.css'

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1,
    };

    
    handleSubmit = (e) => {
        e.preventDefault();
       const { tarefas, index } = this.state;
       let { novaTarefa } = this.state;
       novaTarefa = novaTarefa.trim();

       if(tarefas.indexOf(novaTarefa) !== -1) return;
      
       const novasTarefas = [...tarefas];
      
        if (index === -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: '',
     
            });
        } else{
            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
            })
        }
    }
     

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    handleEdit = (e, index) => {
        const { tarefas } = this.state;
        this.setState({
            index,
            novaTarefa: tarefas[index],   
        });
    }
 
    handleDelete = (e, index) => {
      const { tarefas } = this.state;
      const novasTarefas = [...tarefas];
      novasTarefas.splice(index, 1)

      this.setState({
          tarefas: [...novasTarefas],
      })

    }

    
    render() {
        const { novaTarefa, tarefas } = this.state;

        return (
            <div className='main'>
                <h1> Lista de Tarefas</h1>
         
            <Form 
              handleSubmit={this.handleSubmit} 
              handleChange={this.handleChange} 
              novaTarefa={this.novaTarefa} 
            />

                <ul className='tarefas'>
                    {tarefas.map((tarefa, index) => (
                        <li key={tarefa}> {tarefa}
                         <span>

                        <FaEdit onClick={(e) => this.handleEdit(e, index)} className='edit'/>

                        <FaWindowClose onClick={(e) => this.handleDelete(e, index)} className='delete'/>
                    
                     </span> 
                     </li>
                    ))}
                </ul>
            </div>
        );
    }
}