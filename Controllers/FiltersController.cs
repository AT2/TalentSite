using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace Cwb.TalentSite.Controllers
{
    public class FiltersController : ApiController
    {
        // GET: Filter
        public object Get()
        {
            string filterPath =
                System.Web.Hosting.HostingEnvironment.MapPath("~/data/filters.json");
            FileInfo file = new FileInfo(filterPath);
            if (!file.Exists)
            {
                string result = Cwb.TalentSite.Util.APIClient.Request(
                    "/filters"
                );
                using (StreamWriter writer = new StreamWriter(filterPath))
                {
                    writer.Write(result);
                }
                JObject obj = JObject.Parse(result);
                return obj;
            }
            else
            {
                using (StreamReader reader = new StreamReader(filterPath))
                {
                    string result =  reader.ReadToEnd();
                    JObject obj = JObject.Parse(result);
                    return obj;
                }
            }
        }
    }
}