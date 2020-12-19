# AddressForm

This app has an address component to edit in place.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

Run `ng serve` in the angular project for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test` in the angular project to execute the unit tests via [Karma](https://karma-runner.github.io).

The angular app uses an in-memory list of addresses by default. To use the API uncomment the angular app address.service http calls and use these local.settings and add cosmos credentials:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "CosmosEndpointUrl": "",
    "CosmosEndpointPrimaryKey": "",
    "CosmosDatabaseId": "",
    "CosmosContainerName": "addresses"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "http://localhost:4200"
  }
  ```
