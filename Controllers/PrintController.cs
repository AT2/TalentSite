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
using TuesPechkin;
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
            byte[] data = PrintUtil.GetPdfInternallyByTuesPechkin(ConfigSettings.WebRootAddress + "/print/preview/compcard/" + memberId.ToString(), true, true, new MarginSettings
            {
                Top = 1.5,
                Unit = Unit.Centimeters
            });
            return File(data, "application/pdf");
        }
        [Route("print/profile/{memberId}")]
        public ActionResult PrintProfile(int memberId)
        {
            string profile = APIClient.Request("/artists/" + memberId);
            JObject objProfile = JObject.Parse(profile);
            byte[] data = PrintUtil.GetPdfInternallyByTuesPechkin(ConfigSettings.WebRootAddress + "/print/preview/profile/" + memberId.ToString(), false, true, 
            new MarginSettings
            {
                Top = 3,
                Unit = Unit.Centimeters
            });
            return File(data, "application/pdf");
        }
        [Route("print/preview/profile/{memberId}")]
        public ActionResult ProfilePreview(int memberId)
        {
            string profile = APIClient.Request("/artists/" + memberId);
            JObject objProfile = JObject.Parse(profile);
            string agency = APIClient.Request("/agencies/" + objProfile["Result"]["AgencyID"].ToString());
            JObject objAgency = JObject.Parse(agency);
            return View("Profile", new CompCardViewModel
            {
                Agency = objAgency,
                Profile = objProfile
            });
        }
    }
}