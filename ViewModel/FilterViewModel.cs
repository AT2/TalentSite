using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cwb.TalentSite.ViewModel
{
    public class FilterViewModel
    {
        public string Name { get; set; }
        public IList<Dictionary<string,string>> Item { get; set; }
        public string SelectedValue { get; set; }
    }
}