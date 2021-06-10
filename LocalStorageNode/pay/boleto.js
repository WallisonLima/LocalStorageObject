var Boleto = require('node-boleto').Boleto;

module.exports.NewBoleto = async function NewBoleto(banco, valor, cpf) {
    return new Promise(async (resolve, rejec) => {
        let boleto = new Boleto({
            'banco': banco, // nome do banco dentro da pasta 'banks' BRADESCO, SANTANDER OU CAIXA
            'data_emissao': new Date(),
            'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
            'valor': valor, // R$ 15,00 (valor em centavos)
            'nosso_numero': "1234567",
            'numero_documento': cpf,
            'cedente': "Pagar.me Pagamentos S/A",
            'cedente_cnpj': "18727053000174", // sem pontos e traços
            'agencia': "3978",
            'codigo_cedente': "6404154", // PSK (código da carteira)
            'carteira': "102"
        });

        console.log("Linha digitável: " + boleto['linha_digitavel'])

        boleto.renderHTML(function (html) {
           resolve(html);
        });
    })

}


// async function newBoleto2() {
//     return new Promise(async (resolve, reject) => {
//         var ediParser = require('node-boleto').EdiParser,
//             fs = require('fs');

//         var ediFileContent = fs.readFileSync("arquivo.txt").toString();

//         var parsedFile = ediParser.parse("santander", ediFileContent);

//         console.log("Boletos pagos: ");
//         console.log(parsedFile.boletos);
//     })
// }

// newBoleto2()

