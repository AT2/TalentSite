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
        public ActionResult Standard()
        {
            return View("Standard");
        }
        public ActionResult Compact()
        {
            return null;
        }
        public ActionResult Detail()
        {
            return null;
        }
    }
}