using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetProducts()
        {
            return Content("this all prod");
        }
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            return Content("this one prod");
        }
    }
}
