import HTMLReport from './HTMLReport.js';
import TXTReport from './TXTReport.js';
import HTMLReportHeader from './HTMLReportHeader.js';

export default class ReportFactory {
  criarReport(tipo) {
    if (tipo === 'HTML') {
      return new HTMLReport();
    } else if (tipo === 'TXT') {
      return new TXTReport();
    } else if (tipo === 'HTMLHEADER') {
      return new HTMLReportHeader();
    } else {
      throw new Error('tipo não suportado');
    }
  }
}
