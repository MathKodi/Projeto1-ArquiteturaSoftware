export default class ReportStrategy {
  constructor(reportTipo) {
    this.reportTipo = reportTipo;
  }
  criar(dados) {
    return this.reportTipo.criar(dados);
  }
  saveToFile(nomeDoArquivo, conteudo) {
    this.reportTipo.saveToFile(nomeDoArquivo, conteudo);
  }
}
