function calculatePoints(receipt) {
    let points = 0;

    // 1 point for every alphanumeric character in the retailer name
    points += (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;

    // 50 points if the total is a round dollar amount
    if (parseFloat(receipt.total) % 1 === 0) points += 50;

    // 25 points if the total is a multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) points += 25;

    // 5 points for every two items
    points += Math.floor(receipt.items.length / 2) * 5;

    // Points for items with descriptions having length as a multiple of 3
    for (const item of receipt.items) {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    }

    // 6 points if the day of purchase is odd
    const day = new Date(receipt.purchaseDate).getDate();
    if (day % 2 === 1) points += 6;

    // 10 points if purchase time is between 2:00 PM and 4:00 PM
    const [hours, minutes] = receipt.purchaseTime.split(":").map(Number);
    if (hours === 14 || (hours === 15 && minutes < 60)) points += 10;

    return points;
}

module.exports = calculatePoints;
