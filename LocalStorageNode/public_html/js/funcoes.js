


function gravaDados(nomeChave, conteudo) {
    if (window.localStorage) {
        let dados = JSON.stringify(conteudo);
        localStorage.setItem(nomeChave, dados);
        return dados
    }
    else {
        alert("Operação não disponível.");
    }
}


function inserir(nomeChave, conteudo) {
    let item = { produto: conteudo, qtd: 1 };
    let itens = lerDados(nomeChave);
    for (let i = 0; i < itens.length; i++) {
        if (itens[i].produto.id == conteudo.id) {
            itens[i].qtd++;
            gravaDados(nomeChave, itens);
            return;
        }
    }
    itens.push(item);
    gravaDados(nomeChave, itens);
}


function retira(nomeChave, conteudo) {
    let atual = lerDados(nomeChave);
    for (let i = 0; i < atual.length; i++) {
        if (atual[i].produto.id == conteudo) {
            if (atual[i].qtd == 1) {
                atual.splice(i, 1);
            }
            else {
                atual[i].qtd--;
            }
            break;
        }
    }
    gravaDados(nomeChave, atual);
}


function excluir(nomeChave, conteudo) {
    let atual = lerDados(nomeChave);
    for (let i = 0; i < atual.length; i++) {
        if (atual[i].produto.id == conteudo) {
            atual.splice(i, 1);
            break;
        }
    }
    gravaDados(nomeChave, atual);
}


function lerDados(nomeChave) {
    //localStorage.clear();
    if (window.localStorage) {
        let aux = JSON.parse(
            localStorage.getItem(nomeChave));
        let dados;
        if (aux != null) {
            dados = aux;
        }
        else {
            dados = [];
        }
        return dados;
    }
    else {
        alert("operacao não disponível");
    }
    return false;
}





function obterProdutos(id, description, value, img) {
    let listaprodutos = [];
    
    let produto = {
        id: id,
        descricao: description,
        valor: value,
        url: img
    };
    listaprodutos.push(produto);
    produto = {
        id: "Calça Jeans feminina",
        descricao: "Calça Jeans feminina ciano",
        valor: 60.55,
        url: "https://images-americanas.b2w.io/produtos/01/00/img/107095/5/107095590_1GG.jpg"
    };
    listaprodutos.push(produto);
    produto = {
        id: "Batedeira",
        descricao: "Batederira planetária",
        valor: 120.67,
        url: "./imagens/03868a5f80e6b886ea5805d9bac1a81e.jpg"
    };
    listaprodutos.push(produto);
    produto = {
        id: "Mouse",
        descricao: "Mouse sem fio bluetooth",
        valor: 20.00,
        url: "https://img.ibxk.com.br/2020/05/21/21010449898023.jpg?w=1120&h=420&mode=crop&scale=both"
    };
    listaprodutos.push(produto);

    return listaprodutos;
}


function valor(numero) {
    return new Intl.NumberFormat("pt-BR",{
        style: "currency",
        currency: "BRL"
    }).format(numero);
}


function checkout(carrinho) {
    console.log(carrinho)
}


function confereCampo(id) {
    let campo = document.getElementById(id).value;
    if (campo == '') {
        return true
    }
    return false
}


function verificaCpf(id) {
    let cpf = document.getElementById(id).value
    cpf = cpf.replace(/[^\d]+/g, '');
    let add = 0;
    let digitoVer = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf[i]) * (10 - i);
    }
    let restoDivisao = add % 11
    if (restoDivisao < 2) {
        digitoVer = 0
    } else {
        digitoVer = 11 - restoDivisao
    }

    if (cpf[9] != digitoVer) {
        return true
    }
    add = 0
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf[i]) * (11 - i)
    }
    add += digitoVer * 2;
    restoDivisao = 0
    restoDivisao = add % 11
    if (restoDivisao < 2) {
        digitoVer = 0
    } else {
        digitoVer = 11 - restoDivisao
    }

    if (cpf[10] != digitoVer) {
        return true
    }
    return false;
}


function verificaEmail(id) {
    let campo = document.getElementById(id).value;
    if (campo.length > 60) {
        return true
    }
    if (campo.includes('@') && campo.includes('.com')) {
        return false
    }
    return true;
}


function limpa_formulário_cep() {
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("")
}


function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    }
    else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}


function pesquisacep(valor) {
    let cep = valor.replace(/\D/g, '');
    if (cep != "") {
        let validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            let script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        }
        else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } 
    else {
        limpa_formulário_cep();
    }
};