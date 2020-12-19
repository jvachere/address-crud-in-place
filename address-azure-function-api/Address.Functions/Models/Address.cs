using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Recipe.Functions.Models
{
    public class Address
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string UnitNumber { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public Address()
        {
            Id = Guid.NewGuid();
        }
    }
}
