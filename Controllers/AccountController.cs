using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Cwb.TalentSite.Util;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;
namespace Cwb.TalentSite.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        [Route("api/account/login")]
        public object Login([FromBody]LoginViewModel loginInfo)
        {
            if (ModelState.IsValid)
            {
                Dictionary<string, string> fromBody = new Dictionary<string, string>();
                fromBody.Add("LoginName", loginInfo.LoginName);
                fromBody.Add("Password", loginInfo.Password);
                string result =  APIClient.Request("/members/login", null, fromBody,"POST");
                JObject obj = JObject.Parse(result);
                return obj;
            }
            return new
            {
                Description = "Invalid Parameter",
                Result = ""
            };
        }
        [HttpPost]
        [Route("api/account/register")]
        public object Register([FromBody]ClientViewModel loginInfo)
        {
            if (ModelState.IsValid)
            {
                Dictionary<string, string> fromBody = new Dictionary<string, string>();
                string result =  APIClient.Request("/members/register", null, fromBody);
                JObject obj = JObject.Parse(result);
                return obj;
            }
            return new
            {
                Description = "Invalid Parameter",
                Result = ""
            };
        }
        public class LoginViewModel
        {
            [Required]
            public string LoginName
            {
                get;set;
            }
            [Required]
            public string Password
            {
                get;set;
            }
        }

        public class ClientViewModel
        {
            [Required]
            public string Name { get; set; }
            [Required]
            public string Company { get; set; }
            [Required]
            public string Email { get; set; }
            [Required]
            public string Phone { get; set; }
            public string Reason { get; set; }
        }
    }
}
