
function initPdfJs()
{
  pdfjs = require('pdfjs-dist');
  //worker = require('pdfjs-dist/build/pdf.worker');
  global.PDFJS.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js';
  process.stdout.write(pdfjs.version + '\n');
}

function loadPdfText(file)
{
  function processTextContent(textCont)
  {
    //process.stdout.write("textCont \n");
    var strings = textCont.items.map(function (item) {
         return item.str;
       });
       process.stdout.write(strings.join(' ') + "\n");
  }

  function getPage(page)
  {
    process.stdout.write('page ' + page.pageNumber + '\n');
    page.getTextContent().then(processTextContent);
  }

  global.PDFJS.getDocument(file).then(function loadPDF(doc) {
      process.stdout.write('Pages: ' + doc.numPages + '\n');

      for (i = 0; i < doc.numPages; i += 1) {
          doc.getPage(i + 1).then(getPage);
      }
  });
}

initPdfJs();
loadPdfText('./machine_self1.pdf');
