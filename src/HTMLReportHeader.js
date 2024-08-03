import fs from 'fs';

export default class HTMLReportHeader {
  criar(dados) {
    const cidades = dados
      .map(
        (cidade) =>
          `<li><span class="cidade">${cidade.Nome}</span> - ${cidade.Estado}</li>`,
      )
      .join('\n');
    return `
<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Relatório de Nomes de Cidades</title>
  </head>
  <body>
    <header>
      <h1>Relatório de Nomes de Cidades</h1>
    </header>
    <main>
      <ul>
        ${cidades}
      </ul>
    </main>
  </body>
</html>`;
  }

  saveToFile(nomeDoArquivo, conteudo) {
    fs.writeFileSync(nomeDoArquivo, conteudo, 'utf-8');
  }
}
