import HTMLReport from './HTMLReport.js';
import TXTReport from './TXTReport.js';

export default class ReportFactory {
  criarReport(tipo) {
    if (tipo === 'HTML') {
      return new HTMLReport();
    } else if (tipo === 'TXT') {
      return new TXTReport();
    } else {
      throw new Error('tipo não suportado');
    }
  }
}
