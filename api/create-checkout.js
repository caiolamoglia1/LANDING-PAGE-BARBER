// Vercel Serverless Function para criar Stripe Checkout Session
import Stripe from 'stripe';

export default async function handler(req, res) {
  // Permite CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar variáveis de ambiente
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY não configurada');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { planType } = req.body;

    // Configuração dos planos
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

    // URLs
    const successUrl = process.env.SUCCESS_URL || 'https://painel-de-controle-barbearia.web.app';
    const cancelUrl = process.env.CANCEL_URL || 'https://landing-page-barber-black.vercel.app#pricing';

    console.log('Creating session with:', { successUrl, cancelUrl, planType });

    // Criar Checkout Session
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
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      locale: 'pt-BR',
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar checkout:', error.message);
    return res.status(500).json({ 
      error: error.message,
      type: error.type || 'unknown'
    });
  }
}
