let salvar = () =>{
    //variavel dados recebe localStorage.info se for nulo cria um array vazio se não converte em JSON localstorage.info
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    
    //recuperando as informações do formulario
    let documento =  document.querySelector("#txtDocumento").value;
    let nome =  document.querySelector("#txtNome").value;
    let email =  document.querySelector("#txtEmail").value;
    let cor =  document.querySelector("#txtCor").value;
    

    //array de objetos JSON
    dados.push({
        'documento' : documento,
        'nome' : nome,
        'email' : email,
        'cor' : cor
    });
    //localStorage.info recebe um array de JSON e convertemos para string a variavel dados que esta armazenando JSON
    localStorage.info = JSON.stringify(dados);

    listar();

    alert('Salvo com Sucesso!');
}


let listar = () =>{
    
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let tabela = document.querySelector("#tblDados");
    tabela.innerHTML = "";
    dados.forEach(element =>{
        tabela.innerHTML += `
           <tr>
                <td>${element.documento}</td>
                <td>${element.nome}</td>
                <td>${element.email}</td>
                <td style="background-color:${element.cor}">${element.cor}</td>
                <td>
                <button class="btn btn-primary" onclick="editar(${element.documento})">Editar</button>
                <button class="btn btn-danger" onclick="eliminar(${element.documento})">Eliminar</button>
                </td>
           
           </tr>
        `;

    });
}

let editar = (doc) =>{

    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento =  document.querySelector("#txtDocumento");
    let nome =  document.querySelector("#txtNome");
    let email =  document.querySelector("#txtEmail");
    let cor =  document.querySelector("#txtCor");
    let id =  document.querySelector("#txtId");

    let btnSalvar=  document.querySelector("#btnSalvar");
    let btnEditar =  document.querySelector("#btnEditar");
    
    //resultado vai receber o documento selecionado e vai buscar se o documento é igual ao localizado no localStorage
    let resultado = dados.find(e => e.documento == doc);


    //buscando a posição do documento
    let resultadoIndex =  dados.findIndex(e => e.documento == doc);

     //verifica se encontrou o objeto
    if(resultado != undefined){

        //se encontrou o objeto o botão salvar ira sumir e o editar ira aparecer
        btnSalvar.style.display = "none";
        btnEditar.style.display = "block";


        documento.value =  resultado.documento;
        nome.value =  resultado.nome;
        email.value =  resultado.email;
        cor.value =  resultado.cor;

        //em qual posição esta o objeto para poder editar
        id.value = resultadoIndex;



    }else{
        alert("Não encontrado!")
    }


}

let modificar = () =>{
    //variavel dados recebe localStorage.info se for nulo cria um array vazio se não converte em JSON localstorage.info
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    
    //recuperando as informações do formulario
    let documento =  document.querySelector("#txtDocumento").value;
    let nome =  document.querySelector("#txtNome").value;
    let email =  document.querySelector("#txtEmail").value;
    let cor =  document.querySelector("#txtCor").value;
    let id =  document.querySelector("#txtId").value;

    let btnSalvar=  document.querySelector("#btnSalvar");
    let btnEditar =  document.querySelector("#btnEditar");
    
    //pega o id da posicação que quero modificar
    dados[id].documento = documento;
    dados[id].nome= nome;
    dados[id].email = email;
    dados[id].cor = cor;

    btnSalvar.style.display = "block";
    btnEditar.style.display = "none";

    //localStorage.info recebe um array de JSON e convertemos para string a variavel dados que esta armazenando JSON
    localStorage.info = JSON.stringify(dados);

    listar();

    alert('Modificado com sucesso!');
}

let eliminar = (doc) =>{

    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);

   
    //buscando a posição do documento
    let resultadoIndex =  dados.findIndex(e => e.documento == doc);

     //verifica se encontrou o objeto
    if(resultadoIndex != -1){

        dados.splice(resultadoIndex, 1);
        
        //depois de eliminar atualiza a tabela
        localStorage.info = JSON.stringify(dados);
        listar();

    }else{
        alert("Não encontrado!")
    }


}
