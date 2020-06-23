using CKSource.CKFinder.Connector.Core;
using CKSource.CKFinder.Connector.Core.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace CustomCKEditor
{
    public class CKFinderAuthenticator : IAuthenticator
    {
        public Task<IUser> AuthenticateAsync(ICommandRequest commandRequest, CancellationToken cancellationToken)
        {
            var user = new User(true, null);
            return Task.FromResult((IUser)user);
        }
    }
}