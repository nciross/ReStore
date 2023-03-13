using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _storeDbContext;
        public ProductsController(StoreContext storeDbContext) 
        {
            _storeDbContext = storeDbContext;
            
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            var products = await _storeDbContext.Products.ToListAsync();
              return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _storeDbContext.Products.FindAsync(id);
              return Ok(product);
        }
       
    }
}