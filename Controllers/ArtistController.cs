using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cwb.TalentSite.Util;
namespace Cwb.TalentSite.Controllers
{
    public class ArtistController : Controller
    {
        //public JsonResult QueryArtist()
        //{
            
        //}
        [Route("artist/{memberId}")]
        public ActionResult QueryDetail(int memberId)
        {
            return Json(APIClient.Request("/artists/" + memberId),JsonRequestBehavior.AllowGet);
        }
    }
}