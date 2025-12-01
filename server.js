import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/create-checkout', async (req, res) => {
  try {
    const { planType } = req.body;

    const plans = {
      gestao: {
        priceId: process.env.STRIPE_PRICE_GESTAO,
        setupPriceId: process.env.STRIPE_PRICE_SETUP,
        name: 'Plano Gestão',
      },
      full: {
        priceId: process.env.STRIPE_PRICE_FULL,
        setupPriceId: process.env.STRIPE_PRICE_SETUP,
        name: 'Plano Full',
      },
    };

    if (!plans[planType]) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    const plan = plans[planType];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
        {
          price: plan.setupPriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL || `http://localhost:5174#pricing`,
      locale: 'pt-BR',
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
