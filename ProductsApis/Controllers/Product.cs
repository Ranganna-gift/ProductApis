
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private static List<Product> _products = new List<Product>();

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_products);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            if (product == null)
            {
                return BadRequest("Product data is missing.");
            }

            if (string.IsNullOrEmpty(product.Name))
            {
                return BadRequest("Product name is required.");
            }

            // Add validation for other fields if needed

            product.Id = Guid.NewGuid(); // Generate a new ID
            _products.Add(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(Guid id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(Guid id, Products product)
        {
            var existingProduct = _products.FirstOrDefault(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            // Update existing product properties
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            _products.Remove(product);
            return NoContent();
        }
    }

    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
    public class Products
    {
        
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }



}