import { strict as assert } from 'assert';
import fs from 'fs';
import ReportFactory from '../src/ReportFactory.js';
import ReportStrategy from '../src/ReportStrategy.js';

const dados = JSON.parse(
  fs.readFileSync(new URL('../data/cidades-2.json', import.meta.url), 'utf-8'),
);

const factory = new ReportFactory();

// Função para verificar a estrutura básica de um documento HTML
function verifyBasicHTMLStructure(conteudo, additionalChecks = []) {
  try {
    assert(
      conteudo.includes('<!DOCTYPE HTML>'),
      'HTML Erro na estrutura <!DOCTYPE HTML>',
    );
    assert(conteudo.includes('<html>'), 'HTML Erro na estrutura <html>');
    assert(conteudo.includes('<head>'), 'HTML Erro na estrutura <head>');
    assert(
      conteudo.includes(
        '<meta http-equiv="content-type" content="text/html; charset=utf-8" />',
      ),
      'HTML Erro na estrutura meta charset',
    );
    assert(
      conteudo.includes('<title>Relatório de Nomes de Cidades</title>'),
      'HTML Erro na estrutura title',
    );
    assert(conteudo.includes('<body>'), 'HTML Erro na estrutura <body>');
    assert(conteudo.includes('</body>'), 'HTML Erro na estrutura </body>');
    assert(conteudo.includes('</html>'), 'HTML Erro na estrutura </html>');

    // Verificações adicionais específicas
    additionalChecks.forEach((check) => check());
  } catch (error) {
    console.error('Erro na estrutura HTML:', error);
    throw error;
  }
}

// Função para verificar a estrutura básica de um documento TXT
function verifyBasicTXTStructure(conteudo) {
  try {
    assert(
      conteudo.startsWith('Relatório de Nomes de Cidades:\n'),
      'TXT Erro na estrutura header',
    );
    assert(conteudo.includes('* '), 'TXT Erro na estrutura list items');
  } catch (error) {
    console.error('Erro na estrutura TXT:', error);
    throw error;
  }
}

// Teste do relatório HTML padrão
const htmlReport = factory.criarReport('HTML');
const htmlStrategy = new ReportStrategy(htmlReport);
const htmlConteudo = htmlStrategy.criar(dados);

// Verificar a estrutura do relatório HTML padrão
verifyBasicHTMLStructure(htmlConteudo, [
  () =>
    assert(
      htmlConteudo.includes('<h1>Relatório de Nomes de Cidades</h1>'),
      'HTML Faltando estrutura header',
    ),
  () => assert(htmlConteudo.includes('<ul>'), 'HTML Faltando estrutura <ul>'),
  () => assert(htmlConteudo.includes('</ul>'), 'HTML Faltando estrutura </ul>'),
]);

// Teste do relatório HTML com cabeçalho
const htmlHeaderReport = factory.criarReport('HTMLHEADER');
const htmlHeaderStrategy = new ReportStrategy(htmlHeaderReport);
const htmlHeaderConteudo = htmlHeaderStrategy.criar(dados);

// Verificar a estrutura do relatório HTML com cabeçalho
verifyBasicHTMLStructure(htmlHeaderConteudo, [
  () =>
    assert(
      htmlHeaderConteudo.includes('<header>'),
      'HTML header Faltando estrutura <header>',
    ),
  () =>
    assert(
      htmlHeaderConteudo.includes('<h1>Relatório de Nomes de Cidades</h1>'),
      'HTML header Faltando estrutura header',
    ),
  () =>
    assert(
      htmlHeaderConteudo.includes('<main>'),
      'HTML header Faltando estrutura <main>',
    ),
  () =>
    assert(
      htmlHeaderConteudo.includes('<ul>'),
      'HTML header Faltando estrutura <ul>',
    ),
  () =>
    assert(
      htmlHeaderConteudo.includes('</ul>'),
      'HTML header Faltando estrutura </ul>',
    ),
  () =>
    assert(
      htmlHeaderConteudo.includes('</main>'),
      'HTML header Faltando estrutura </main>',
    ),
]);

// Teste do relatório TXT
const txtReport = factory.criarReport('TXT');
const txtStrategy = new ReportStrategy(txtReport);
const txtConteudo = txtStrategy.criar(dados);

// Verificar a estrutura do relatório TXT
verifyBasicTXTStructure(txtConteudo);

console.log('Todos os testes passaram!');
