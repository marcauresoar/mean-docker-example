
const fs = require('fs');
const accStore = require('./accessories.store.js');

const processRequest = (brand, callback) => {
  if(brand === 'fiat') {
    processSheetDataFiat(callback);
  } else {
    return callback(400, 'Brand not allowed!');
  }
};

const processSheetDataFiat = (callback) => {
  fs.readFile('upload/sheet_file.csv', 'utf8', (err, data) => {
    if (err)
      return callback(500, err);

      const arrData = data.split('\n');
      const arrFinal = [];
      for(let arr of arrData){
        if(arr === '') continue;

        [
          AC_CODE,
          AC_DESC,
          AC_NAME,
          AC_PRICE,
          AC_INSTALLMENT_TYPE,
          AC_INSTALLMENT_PRICE,
          AC_VERSION,
          AC_ORDER
        ] = arr.split(';');

        AC_PRICE = AC_PRICE.toString().replace(',', '.');
        AC_INSTALLMENT_PRICE = AC_INSTALLMENT_PRICE.toString().replace(',', '.');
        AC_ORDER = parseInt(AC_ORDER);

        let obj = {
          "class": "br.com.fiat.portal.datalayer.jcr.produtos.dominio.AcessorioView",
          "codigo": AC_CODE.trim(),
          "descricao": AC_DESC.trim(),
          "montagens": "0",
          "nome": AC_NAME.trim(),
          "percentualMontagem": "0.0",
          "salaoAutomovel": null,
          "selecionado": false,
          "exibePrecoAcessorio": true,
          "vlrPreco": AC_PRICE.trim(),
          "formasPagamento": [
            {
              "condicao" : AC_INSTALLMENT_TYPE.trim(),
              "valor": AC_INSTALLMENT_PRICE.trim()
            }
          ]
        };

        if(!arrFinal[AC_VERSION]) { arrFinal[AC_VERSION] = []; }

        arrFinal[AC_VERSION][AC_ORDER - 1] = obj;
      }

      processOriginFileFiat(arrFinal, callback);
  });
};

const processOriginFileFiat = (arrAccessories, callback) => {
  fs.readFile('upload/origin_file.json', 'utf8', function(err, data){
    if (err)
      return callback(500, err);

    const fileData = JSON.parse(data);
    for(let i = 0; i < fileData.modelo.versoesList.length; i++){
      let element = fileData.modelo.versoesList[0];
      let codigo = element.codigo;

      for (let j in arrAccessories) {
        if(codigo.toString().match(j)){
          fileData.modelo.versoesList[i].acessoriosView = arrAccessories[j];
        }
      }
    }
    const id = new Date().valueOf();
    const filePath = 'download/' + id + ".json";

    fs.writeFile(filePath, JSON.stringify(fileData), function(err) {
        if(err)
            return console.log(err);

        accStore.createAccessoryLog(id, 'Fiat', filePath, (status, message) => {
          return callback(status, message);
        });
    });
  });
};

module.exports = processRequest;
