using System.Web;
using System.Web.Optimization;

namespace Cwb.TalentSite
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/js/vendor/jquery/jquery-1.9.1.min.js",
                "~/js/vendor/bootstrap/bootstrap.min.js"
                //"~/js/vendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js",
                //"~/js/vendor/underscore/underscore.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
               "~/js/vendor/angularJS/angular.min.js",
               "~/js/vendor/angularJS/angular-route.min.js",
               "~/js/vendor/angularJS/angular-sanitize.min.js",
               "~/js/vendor/angularJS/angular-animate.min.js",
               "~/js/vendor/angularJS/angular-cookies.min.js",
               "~/js/vendor/ngDialog/js/ngDialog.min.js",
               "~/js/vendor/angularJS/messages.js",
               "~/js/vendor/ngLazyImage/lazy-image.min.js",
               "~/js/vendor/angular.UI/select.min.js",
               "~/js/vendor/angularJS/loading-bar.min.js"
               ));
            bundles.Add(new ScriptBundle("~/bundles/angular-talent").Include(
              "~/js/app.js",
              "~/js/app/*.js"
              ));
            bundles.Add(new StyleBundle("~/styles").Include(
                "~/styles/all.css"
                //"~/styles/loading-bar.min.css",
                //"~/js/vendor/ngDialog/style/ngDialog.min.css",
                //"~/js/vendor/ngDialog/style/ngDialog-theme-default.css"
            ));
            BundleTable.EnableOptimizations = false;
 
        }
    }
}
