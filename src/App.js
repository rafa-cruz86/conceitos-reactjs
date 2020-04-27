import React, { useEffect, useState } from "react";
/**
 * useEffect -> Função adiciona a funcionalidade de executar efeitos através 
 *              de um componente funcional de API
 * useState  -> Função resevar este state entre re-renderizações se houve 
 *              ou não alteração 
 */

/**
 *  Importando para nosso aplicativo o arquivo de API
 */
import api from './services/api';

import "./styles.css";

function App() {

  /**
   * Iniciando dos valores da variavel do tipo array utilizando a função 
   * useState, onde primeiro para metro é varkavel e segundo é um função
   * que será responsavel por realizar a atualização
   */
  const [repositories, setRepositories] = useState([]);


  /**
   * Essa função tem por finalidade pega os dados do backend atraves de um api
   * passada pelo frontend. atraves da api ele pega a rota e aguarda a resposta
   * quando responde ele adiciona no array atraves da função criada no State.
   */
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {

    /** 
     * Como estou usando async que esta aguardando finalizar o criação do 
     *  repositorio, preciso passar a rota, e os dados que serão acrescentado 
     *  em nosso array de repositories 
     */
    const response = await api.post('repositories', {
      title: 'Umbriel',
      url: 'https://github.com/rocketseat/umbriel',
      techs: ['Node.js', 'ReactJS']
    })

    /** 
     * Essa é função que esta realizando a copia do objeto repositories e 
     * adicionando o que foi criado no trecho acima
    */
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    /** 
     * Como estou usando async que esta aguardando finalizar o remoção do 
     *  repositorio que foi passado por ID utilizando o medoto delete
     */
    await api.delete(`repositories/${id}`);


    /** 
    * Essa é função que esta realizando a copia do objeto repositories e 
    * apenas adicoinado no repositories ID diferente do que ele recebeu como 
    * parametro, ou seja, o que esta no ID será excluido
   */
    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {/* Para listar faz necessario pecorrer todo meu array para apresentar  
            no browser */}
        {repositories.map(repository => (


          /*É necessario informar o id para tag li no React afim de itentificar  
            que é inicio, para isso iremos usar nosso ID */
          <li key={repository.id} >

            {/* Foi necessario informar o title do repositorio que desejamos 
            apresentar no browser */}
            {repository.title}

            {/*Foi necessario informar o ID do repositorio que desejamos deletar
               repository.id vais como parametro para a função que remove */}
            <button onClick={() => handleRemoveRepository(repository.id)}>

              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
