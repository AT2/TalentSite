using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace Cwb.TalentSite.ViewModel
{
    public class CompCardViewModel
    {
        public JObject Profile { get; set; }
        public JObject Agency { get; set; }
    }
}