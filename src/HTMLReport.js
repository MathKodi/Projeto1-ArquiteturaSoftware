import fs from 'fs';

export default class HTMLReport {
  criar(dados) {
    let html = `
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <title>Relatório de Nomes de Cidades</title>
</head>
<body>
  <h1>Relatório de Nomes de Cidades</h1>
  <ul>
`;

    const cidades = dados;
    for (let i = 0; i < cidades.length; i++) {
      html += `      <li>${cidades[i]['Nome']}</li>\n`;
    }

    html += `
  </ul>
</body>
</html>`;
    return html;
  }

  saveToFile(nomeDoArquivo, conteudo) {
    fs.writeFileSync(nomeDoArquivo, conteudo);
  }
}
