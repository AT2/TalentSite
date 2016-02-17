using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Winnovative.WnvHtmlConvert;
namespace Cwb.TalentSite.Util
{
    public class PrintUtil
    {
        public static byte[] GetPdfInternally(string url, bool isLandscape = false, bool isSinglePage = false)
        {
            PdfConverter pdfConverter = new PdfConverter();

            pdfConverter.LicenseKey =ConfigSettings.PDFKey;

            // set the converter options

            pdfConverter.PdfDocumentOptions.PdfPageSize = PdfPageSize.A4;

            pdfConverter.PdfDocumentOptions.PdfCompressionLevel = PdfCompressionLevel.Normal;

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
    }
}