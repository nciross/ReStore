using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
public class BasketController : BaseApiController
{
    public StoreContext _context { get; }
    public BasketController(StoreContext context)
    {
        _context = context;
    }
    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetriveBasket();
        if (basket == null) return NotFound();
        return MapBasketToDto(basket);
    }
    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetriveBasket();
        if (basket == null)
        {
            basket = await CreateNewBasket();
        }
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound();
        basket.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return base.CreatedAtRoute("GetBasket", MapBasketToDto(basket));
        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }
    [HttpDelete]
    public async Task<ActionResult> RemoveItemToBasket(int productId, int quantity)
    {
        Basket basket = await RetriveBasket();
        if (basket == null) return NotFound();
        basket.RemoveItem(productId, quantity);
        if (basket.Items.Count == 0)
            _context.Baskets.Remove(basket);

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();
        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });

    }
    private async Task<Basket> CreateNewBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddDays(30)
        };
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        var basket = new Basket
        {
            BuyerId = buyerId,
        };
        await _context.Baskets.AddAsync(basket);
        return basket;
    }
    private async Task<Basket> RetriveBasket()
    {
        var buyerId = GetBuyerId();
        return await _context.Baskets
                                   .Include(i => i.Items)
                                   .ThenInclude(p => p.Product)
                                   .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }
    private string GetBuyerId()
    {
        return Request.Cookies["buyerId"];
    }
    private BasketDto MapBasketToDto(Basket basket)
    {
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Description = x.Product.Description,
                Price = x.Product.Price,
                PictureUrl = x.Product.PictureUrl,
                Type = x.Product.Type,
                Brand = x.Product.Brand,
                Quantity = x.Quantity
            }).ToList()
        };
    }
}