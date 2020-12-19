using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;

namespace Recipe.Functions
{
    public class UpsertAddressHttpTrigger
    {
        private readonly Container _addressContainer;
        public UpsertAddressHttpTrigger(Container addressContainer)
        {
            _addressContainer = addressContainer;
        }

        [FunctionName("UpsertAddress")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", "put", Route = "addresses")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var address = JsonConvert.DeserializeObject<Models.Address>(await new StreamReader(req.Body).ReadToEndAsync());

            Models.Address result = await _addressContainer.UpsertItemAsync(address, new PartitionKey(address.Id.ToString()));

            return new OkObjectResult(result);
        }
    }
}
