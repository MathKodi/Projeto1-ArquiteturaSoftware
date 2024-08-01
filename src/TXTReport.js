import fs from 'fs';

export default class TXTReport {
  criar(dados) {
    let txt = `Relatório de Nomes de Cidades:\n`;

    const cidades = dados;
    for (let i = 0; i < cidades.length; i++) {
      txt += `* ${cidades[i]['Nome']}\n`;
    }

    return txt;
  }

  saveToFile(nomeDoArquivo, conteudo) {
    fs.writeFileSync(nomeDoArquivo, conteudo);
  }
}
