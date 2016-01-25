using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;
namespace Cwb.TalentSite.Util
{
    /// <summary>
    /// Request data from API
    /// </summary>
    public static class APIClient
    {
        public static string Request(string url, Dictionary<string,string> queryString = null, Dictionary<string,string> formBody = null, string method = "GET")
        {
            var client = new RestClient(ConfigSettings.APIURL);
            var request = new RestRequest(url, (Method)Enum.Parse(typeof(Method), method));
            request.AddHeader("Authorization","Basic apikey="+ConfigSettings.APIKey);
            //querystring
            if (queryString != null)
            {
                foreach (string key in queryString.Keys)
                {
                    if (!string.IsNullOrEmpty(queryString[key]))
                    {
                        request.AddQueryParameter(key, formBody[key]);
                    }
                }
            }
            //form body
            if (formBody != null)
            {
                foreach (string key in formBody.Keys)
                {
                    if (!string.IsNullOrEmpty(formBody[key]))
                    {
                        request.AddParameter(key, formBody[key]);
                    }
                }
            }
            var response = client.Execute(request);
            return response.Content;
        }
    }
}