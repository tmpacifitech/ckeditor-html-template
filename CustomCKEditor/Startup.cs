using CKSource.CKFinder.Connector.Config;
using CKSource.CKFinder.Connector.Core;
using CKSource.CKFinder.Connector.Core.Acl;
using CKSource.CKFinder.Connector.Core.Authentication;
using CKSource.CKFinder.Connector.Core.Builders;
using CKSource.CKFinder.Connector.Host.Owin;
using CKSource.CKFinder.Connector.KeyValue.FileSystem;
using CKSource.FileSystem.Local;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.StaticFiles.ContentTypes;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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

            /* Configure access to local files for JavaScript files. */
            var options = new FileServerOptions();
            options.StaticFileOptions.ContentTypeProvider = new ContentTypeProvider();
            options.FileSystem = new PhysicalFileSystem("App_Data");

            /* Map local files at the root path. */
            app.UseFileServer(options);
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
                        config.AddProxyBackend("local", new LocalStorage(@"App_Data"));
                        config.AddResourceType("Images", builder => builder
                            .SetBackend("local", "images")
                            .SetAllowedExtensions("gif", "jpeg", "jpg", "png")
                        );
                        config.SetOverwriteOnUpload(true);

                        config.AddAclRule(new AclRule(
                            new StringMatcher("*"),
                            new StringMatcher("*"),
                            new StringMatcher("*"),
                            new Dictionary<Permission, PermissionType> { { Permission.All, PermissionType.Allow } }));

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

    public class CKFinderAuthenticator : IAuthenticator
    {
        public Task<IUser> AuthenticateAsync(ICommandRequest commandRequest, CancellationToken cancellationToken)
        {
            var user = new User(true, null);
            return Task.FromResult((IUser)user);
        }
    }

    public class ContentTypeProvider : FileExtensionContentTypeProvider
    {
        public ContentTypeProvider()
        {
            Mappings.Add(".json", "application/json");
        }
    }
}
