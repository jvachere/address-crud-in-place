using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Cosmos;

namespace Recipe.Functions
{
    public class DeleteAddressHttpTrigger
    {
        private readonly Container _addressContainer;
        public DeleteAddressHttpTrigger(Container addressContainer)
        {
            _addressContainer = addressContainer;
        }

        [FunctionName("DeleteAddress")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "addresses/{id}")] HttpRequest req, Guid id,
            ILogger log)
        {
            var result = await _addressContainer.DeleteItemAsync<Models.Address>(id.ToString(), new PartitionKey(id.ToString()));


            return new OkResult();
        }
    }
}
