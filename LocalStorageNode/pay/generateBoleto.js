const { Bancos, Boletos, streamToPromise } = require('../lib/index');



module.exports.gerencianetBoleto = async function gerencianetBoleto({ pedido }) {
  return new Promise(async (resolve, reject) => {
    let boleto = await objBoleto(pedido)
    const novoBoleto = new Boletos(boleto);
    novoBoleto.gerarBoleto();
    let resp = novoBoleto.pdfFile().then(async ({ stream }) => {
      resolve(streamToPromise(stream));
    }).catch((error) => {
      return error;
    });
    resolve(resp)
  })
}


async function objBoleto(pedido) {
  return new Promise(async (resolve, reject) => {
    let boleto = {}
    let valor = 0;
    for (let produto of pedido.listProdutos) {
      valor += parseFloat(produto.Total)
    }
    if (pedido.dados.banco == 'itau') {
      boleto = {
        banco: new Bancos.Itau(),
        pagador: {
          nome: pedido.dados.nome,
          registroNacional: '12345678',
          endereco: {
            logradouro: pedido.dados.rua + " ," + pedido.dados.n,
            bairro: pedido.dados.bairro,
            cidade: pedido.dados.cidade,
            estadoUF: pedido.dados.uf,
            cep: pedido.dados.cep
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '18455',
            agenciaDigito: '4',
            conta: '1277165',
            contaDigito: '1',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: pedido.dados.rua + " ," + pedido.dados.n,
            bairro: pedido.dados.bairro,
            cidade: pedido.dados.cidade,
            estadoUF: pedido.dados.uf,
            cep: pedido.dados.cep
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    else if (pedido.dados.banco == "brasil") {
      boleto = {
        banco: new Bancos.BancoBrasil(),
        pagador: {
          nome: pedido.dados.nome,
          registroNacional: pedido.dados.cpf,
          endereco: {
            logradouro: pedido.dados.rua + " ," + pedido.dados.n,
            bairro: pedido.dados.bairro,
            cidade: pedido.dados.cidade,
            estadoUF: pedido.dados.uf,
            cep: pedido.dados.cep
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '18455',
            agenciaDigito: '4',
            conta: '1277165',
            contaDigito: '1',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    else if (pedido.dados.banco == "bradesco") {
      boleto = {
        banco: new Bancos.Bradesco(),
        pagador: {
          nome: pedido.dados.nome,
          registroNacional: pedido.dados.cpf,
          endereco: {
            logradouro: pedido.dados.rua + " ," + pedido.dados.n,
            bairro: pedido.dados.bairro,
            cidade: pedido.dados.cidade,
            estadoUF: pedido.dados.uf,
            cep: pedido.dados.cep
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '0101',
            agenciaDigito: '5',
            conta: '0326446',
            contaDigito: '0',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      }
    }
    else if (pedido.dados.banco == "cecred") {
      boleto = {
        banco: new Bancos.Cecred(),
        pagador: {
          nome: pedido.dados.nome,
          RegistroNacional: pedido.dados.cpf,
          endereco: {
            logradouro: pedido.dados.rua + " ," + pedido.dados.n,
            bairro: pedido.dados.bairro,
            cidade: pedido.dados.bairro,
            estadoUF: pedido.dados.uf,
            cep: pedido.dados.cep
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            convenio: '123456',
            agencia: '0101',
            agenciaDigito: '5',
            conta: '03264467',
            contaDigito: '0',
            nossoNumero: '00115290000000004',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    else if (pedido.dados.banco == "caixa") {
      boleto = {
        banco: new Bancos.Caixa(),
        pagador: {
          nome: 'José Bonifácio de Andrada',
          registroNacional: '12345678',
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '18455',
            agenciaDigito: '4',
            conta: '1277165',
            contaDigito: '1',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    else if (pedido.dados.banco == "santander") {
      boleto = {
        banco: new Bancos.Santander(),
        pagador: {
          nome: 'José Bonifácio de Andrada',
          registroNacional: '12345678',
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '18455',
            agenciaDigito: '4',
            conta: '1277165',
            contaDigito: '1',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    else if (pedido.dados.banco == "sicoob") {
      boleto = {
        banco: new Bancos.Sicoob(),
        pagador: {
          nome: 'José Bonifácio de Andrada',
          registroNacional: '12345678',
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '18455',
            agenciaDigito: '4',
            conta: '1277165',
            contaDigito: '1',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    else if (pedido.dados.banco == "sicredi") {
      boleto = {
        banco: new Bancos.Sicredi(),
        pagador: {
          nome: 'José Bonifácio de Andrada',
          registroNacional: '12345678',
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
        beneficiario: {
          nome: 'Empresa Fictícia LTDA',
          cnpj: '43576788000191',
          dadosBancarios: {
            carteira: '09',
            agencia: '18455',
            agenciaDigito: '4',
            conta: '1277165',
            contaDigito: '1',
            nossoNumero: '00000000061',
            nossoNumeroDigito: '8'
          },
          endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
          }
        },
        boleto: {
          numeroDocumento: '1001',
          especieDocumento: 'DM',
          valor: valor,
          datas: {
            vencimento: '02-04-2020',
            processamento: '02-04-2019',
            documentos: '02-04-2019'
          }
        }
      };
    }
    resolve(boleto)
  })
}