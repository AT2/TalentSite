using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace Cwb.TalentSite.Util
{
    public static class ConfigSettings
    {
        private static string GetSetting(string key) 
        { 
            return ConfigurationManager.AppSettings[key]; 
        }

        public static string APIKey 
        { 
            get 
            { 
                return GetSetting("API.KEY");
            } 
        }

        public static string APIURL
        {
            get
            {
                return GetSetting("API.URL");
            }
        }
    }
}
