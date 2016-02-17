using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cwb.TalentSite.Util;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Cwb.TalentSite.ViewModel;
namespace Cwb.TalentSite.Controllers
{
    public class PrintController : Controller
    {
        [Route("print/preview/compcard/{memberId}")]
        public ActionResult CompcardPreView(int memberId)
        {
            string profile = APIClient.Request("/artists/" + memberId);
            JObject objProfile = JObject.Parse(profile);
            string agency = APIClient.Request("/agencies/" + objProfile["Result"]["AgencyID"].ToString());
            JObject objAgency = JObject.Parse(agency);
            return View("Compcard", new CompCardViewModel
            {
                Agency = objAgency,
                Profile = objProfile
            });
        }
        [Route("print/compcard/{memberId}")]
        public ActionResult CompCard(int memberId)
        {
            string profile = APIClient.Request("/artists/" + memberId);
            JObject objProfile = JObject.Parse(profile);
            byte[] data = PrintUtil.GetPdfInternally("http://localhost:8020/print/preview/compcard/"+memberId.ToString(), true, true);
            MemoryStream stream = new MemoryStream(data);
            return File(stream, "application/pdf", string.Format("{0}_{1}.pdf", objProfile["Result"]["FirstName"].ToString(), objProfile["Result"]["LastName"].ToString()));
        }
    }
}