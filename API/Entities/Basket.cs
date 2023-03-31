namespace API.Entities;
public class Basket
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> Items { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        if (Items.All(x => x.ProductId != product.Id))
        {
            Items.Add(new BasketItem
            {
                Product = product,
                Quantity = quantity
            });
            return;
        }

        var existingItem = Items.FirstOrDefault(x => x.ProductId == product.Id);
        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }


    }
    public void RemoveItem(int productId, int quantity)
    {
        var existingItem = Items.FirstOrDefault(x => x.ProductId == productId);
        if (existingItem == null) return;
        existingItem.Quantity -= quantity;
        if (existingItem.Quantity ==0)
        {
            Items.Remove(existingItem);
        }
    }
}
