using CKSource.CKFinder.Connector.Config;
using CKSource.CKFinder.Connector.Core.Acl;
using CKSource.CKFinder.Connector.Core.Builders;
using CKSource.CKFinder.Connector.Host.Owin;
using CKSource.CKFinder.Connector.KeyValue.FileSystem;
using CKSource.FileSystem.Local;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartupAttribute(typeof(CustomCKEditor.Startup))]
namespace CustomCKEditor
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);

            FileSystemFactory.RegisterFileSystem<LocalStorage>();

            app.Map("/ckfinder/connector", SetupConnector);
        }

        private static void SetupConnector(IAppBuilder app)
        {
            /*
             * Create a connector instance using ConnectorBuilder. The call to the LoadConfig() method
             * will configure the connector using CKFinder configuration options defined in Web.config.
             */
            var connectorFactory = new OwinConnectorFactory();
            var connectorBuilder = new ConnectorBuilder();


            connectorBuilder
                /*
                 * Provide the global configuration.
                 *
                 * If you installed CKSource.CKFinder.Connector.Config, you should load the static configuration
                 * from XML:
                 * connectorBuilder.LoadConfig();
                 */
                .LoadConfig()
                .SetRequestConfiguration(
                    (request, config) =>
                    {
                        /*
                         * If you installed CKSource.CKFinder.Connector.Config, you might want to load the static
                         * configuration from XML as a base configuration to modify:
                         */
                        config.LoadConfig();

                        /*
                         * Configure settings per request.
                         *
                         * The minimal configuration has to include at least one backend, one resource type
                         * and one ACL rule.
                         *
                         * For example:
                         */
                        config.AddBackend("cckfinder", new LocalStorage(@"App_Data"));
                        config.RemoveResourceType("Files");
                        config.RemoveResourceType("Images");

                        config.AddResourceType("Images", builder => builder
                            .SetBackend("cckfinder", "Images")
                            .SetAllowedExtensions("gif", "jpeg", "jpg", "png")
                        );
                        config.SetOverwriteOnUpload(true);

                        config.AddAclRule(new AclRule(
                            new StringMatcher("*"),
                            new StringMatcher("*"),
                            new StringMatcher("*"),
                            new Dictionary<Permission, PermissionType> { { Permission.All, PermissionType.Allow } }));

                        /*
                         * If you installed CKSource.CKFinder.Connector.KeyValue.FileSystem, you may enable caching:
                         */
                        var defaultBackend = config.GetBackend("cckfinder");
                        var keyValueStoreProvider = new FileSystemKeyValueStoreProvider(defaultBackend);
                        config.SetKeyValueStoreProvider(keyValueStoreProvider);
                    }
                ).SetAuthenticator(new CKFinderAuthenticator());

            /*
             * Build the connector middleware.
             */
            var connector = connectorBuilder
                .Build(connectorFactory);

            /*
             * Add the CKFinder connector middleware to the web application pipeline.
             */
            app.UseConnector(connector);
        }
    }
}
