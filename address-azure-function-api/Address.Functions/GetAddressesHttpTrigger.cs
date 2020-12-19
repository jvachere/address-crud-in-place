using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Microsoft.Azure.Cosmos;

namespace Recipe.Functions
{
    public class GetAddressesHttpTrigger
    {
        private readonly Container _addressContainer;
        public GetAddressesHttpTrigger(Container addressContainer)
        {
            _addressContainer = addressContainer;
        }

        [FunctionName("GetAddresses")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "addresses")] HttpRequest req,
            ILogger log)
        {
            FeedIterator<Models.Address> queryResultSetIterator = _addressContainer.GetItemQueryIterator<Models.Address>("SELECT * FROM c");

            List<Models.Address> addresses = new List<Models.Address>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<Models.Address> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                addresses.AddRange(currentResultSet);
            }

            return new OkObjectResult(addresses);
        }
    }
}
