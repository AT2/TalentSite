using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Winnovative.WnvHtmlConvert;
using System.IO;
using TuesPechkin;
using System.Drawing.Printing;
namespace Cwb.TalentSite.Util
{
    public class PrintUtil
    {
        private static IConverter converter =
           new ThreadSafeConverter(
               new RemotingToolset<PdfToolset>(
                   new Win64EmbeddedDeployment(
                       new TempFolderDeployment())));
        public static byte[] GetPdfInternally(string url, bool isLandscape = false, bool isSinglePage = false)
        {
            PdfConverter pdfConverter = new PdfConverter();

            pdfConverter.LicenseKey =ConfigSettings.PDFKey;

            // set the converter options

            pdfConverter.PdfDocumentOptions.PdfPageSize = PdfPageSize.A4;

            pdfConverter.PdfDocumentOptions.PdfCompressionLevel = PdfCompressionLevel.Normal;

            pdfConverter.PdfDocumentOptions.LeftMargin = 0;

            if (isLandscape)
            {
                pdfConverter.PdfDocumentOptions.PdfPageOrientation = PDFPageOrientation.Landscape;
            }
            else
            {
                pdfConverter.PdfDocumentOptions.PdfPageOrientation = PDFPageOrientation.Portrait;
            }

            pdfConverter.PdfDocumentOptions.SinglePage = isSinglePage;

            pdfConverter.PdfDocumentOptions.ShowHeader = false;

            pdfConverter.PdfDocumentOptions.ShowFooter = false;

            // set to generate selectable pdf or a pdf with embedded image

            pdfConverter.PdfDocumentOptions.GenerateSelectablePdf = true;


            byte[] pdfBytes = pdfConverter.GetPdfFromUrlBytes(url);

            return pdfBytes;
        }
        /// <summary>
        /// print pdf by TuesPechkin
        /// </summary>
        /// <param name="url"></param>
        /// <param name="isLandscape"></param>
        /// <param name="isSinglePage"></param>
        /// <returns></returns>
        public static byte[] GetPdfInternallyByTuesPechkin(string url, bool isLandscape = false, bool isSinglePage = false, MarginSettings margins = null)
        {
            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings =
                {
                    PaperSize = PaperKind.A4,
                    Orientation = isLandscape ? GlobalSettings.PaperOrientation.Landscape : GlobalSettings.PaperOrientation.Portrait
                }
            };
            if (margins != null)
            {
                doc.GlobalSettings.Margins = margins;
            }
            doc.Objects.Add(new ObjectSettings { PageUrl = url});
            return converter.Convert(doc);
        }
    }
}