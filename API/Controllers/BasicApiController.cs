using Microsoft.AspNetCore.Mvc;
using API.Helpers;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserAtivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BasicApiController : ControllerBase
    {
        
    }
}