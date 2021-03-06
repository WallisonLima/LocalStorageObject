


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


function obterProdutos(produto) {
    let listaprodutos = [];
    for (let each of produto) {
        let produto = {
            id: each.children[4].firstChild.id,
            produto: each.children[1].innerText,
            descricao: each.children[2].innerText,
            valor: each.children[3].innerText,
            url: each.children[0].children[0].currentSrc
        };
        listaprodutos.push(produto);
    }
    return listaprodutos;
};

function obterProdutosCadastro(produto) {
    let listaprodutos = [];
    let valor = 0;
    for (let each of produto) {
        let product = {
            id: each.produto.id,
            produto: each.produto.produto,
            descricao: each.produto.descricao,
            valor: each.produto.valor,
            url: each.produto.url,
            qtd: each.qtd,
            Total: parseFloat(each.produto.valor) * parseInt(each.qtd) 
        };
        listaprodutos.push(product);
    }
    return listaprodutos;
}


function valor(numero) {
    return new Intl.NumberFormat("pt-BR", {
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



function checkCPF(cpf) {
    if (confereCampo('cpf') == true) {
        document.getElementById('ErrorCpf').innerHTML = "Digite um CPF"
        resp = ''
    } else {
        if (verificaCpf('cpf') == true) {
            document.getElementById('ErrorCpf').innerHTML = "Digite um CPF válido"
            resp = ''
        } else {
            cpf = document.getElementById('cpf').value
            document.getElementById('ErrorCpf').innerHTML = ""
            resp = 'Sucess'
        }
    }
}

function checkNome(nome) {
    if (confereCampo('nome') == true) {
        document.getElementById('ErrorNome').innerHTML = "Digite um nome";
    } else {
        nome = document.getElementById('nome').value
        document.getElementById('ErrorNome').innerHTML = "";
    }
}

function checkEmail(email) {
    if (confereCampo('email') == true) {
        document.getElementById('ErrorEmail').innerHTML = "Digite um e-mail"
        resp = ''
    } else {
        if (verificaEmail('email') == true) {
            document.getElementById('ErrorEmail').innerHTML = "Digite um EMAIL válido"
            resp = ''
        } else {
            email = document.getElementById('email').value
            document.getElementById('ErrorEmail').innerHTML = ""
            resp = 'Sucess'
        }
    }
}

function checkCep(cep) {
    if (confereCampo('cep') == true) {
        document.getElementById('ErrorCep').innerHTML = "Digite um Cep"
        resp = ''
    }
    else {
        cep = document.getElementById('cep').value
        rua = document.getElementById('rua').value
        bairro = document.getElementById('bairro').value
        cidade = document.getElementById('cidade').value
        uf = document.getElementById('uf').value
        resp = 'Sucess'
    }
}
