const express = require('express');
const stripe = require('stripe')('sk_test_51PhUdwGVnP0Fr7K89OZ8LAmuOq2BV5cuk1v83AdCUfOSadJG3NXk8APMJkVniwnKfJcEp5xuZH3aWBOSwVO4zHx200VKujUbO1');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/content', (req, res) => {
    const items = [
        { title: 'Ebook 1', author: 'Author 1', price: '$10' },
        { title: 'Ebook 2', author: 'Author 2', price: '$15' },
        { title: 'Printable Coloring Page 1', author: 'Artist 1', price: '$5' },
        { title: 'Printable Coloring Page 2', author: 'Artist 2', price: '$7' }
    ];
    res.json({ items });
});

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:3000/success.html',
        cancel_url: 'http://localhost:3000/cancel.html',
    });
    res.json({ id: session.id });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
      
