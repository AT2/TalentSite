using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cwb.TalentSite.Util;
namespace Cwb.TalentSite.Controllers
{
    public class ArtistsController : Controller
    {
        [Route("Artists/Standard")]
        public ActionResult Standard()
        {
            return View("Standard");
        }
        [Route("Artists/Compact")]
        public ActionResult Compact()
        {
            return View("Compact");
        }
        [Route("Artists/{memberId}")]
        public ActionResult Detail(int memberId)
        {
            ViewBag.MemberId = memberId;
            return View("Detail");
        }
        [Route("Artists/Compcard")]
        public ActionResult Compcard()
        {
            return View("Compcard");
        }
    }
}