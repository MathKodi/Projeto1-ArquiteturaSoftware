import fs from 'fs';
import ReportFactory from './src/ReportFactory.js';
import ReportStrategy from './src/ReportStrategy.js';

const dados = JSON.parse(fs.readFileSync('./data/cidades-2.json', 'utf-8'));

const factory = new ReportFactory();

const htmlReport = factory.criarReport('HTML');
const htmlStrategy = new ReportStrategy(htmlReport);
const htmlConteudo = htmlStrategy.criar(dados);
htmlStrategy.saveToFile('report.html', htmlConteudo);

const txtReport = factory.criarReport('TXT');
const txtStrategy = new ReportStrategy(txtReport);
const txtConteudo = txtStrategy.criar(dados);
txtStrategy.saveToFile('report.txt', txtConteudo);
