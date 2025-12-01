# Configuração Stripe com Parcelamento

## Passo 1: Pegar os IDs dos produtos no Stripe

1. Acesse o dashboard do Stripe: https://dashboard.stripe.com
2. Vá em **Produtos → Catálogo de produtos**
3. Para cada produto, clique nele e copie o **Price ID** (começa com `price_`)

Você precisa de 3 Price IDs:
- **Setup BozzCut**: `price_xxxxx` (R$ 1.200 - One-time)
- **Plano Gestão**: `price_xxxxx` (R$ 79,90/mês - Recorrente)
- **Plano Full**: `price_xxxxx` (R$ 119,90/mês - Recorrente)

## Passo 2: Pegar a Secret Key do Stripe

1. No dashboard do Stripe, vá em **Desenvolvedores → Chaves de API**
2. Copie a **Secret key** (começa com `sk_live_` ou `sk_test_`)

## Passo 3: Configurar variáveis de ambiente no Vercel

Após fazer deploy no Vercel:

1. Acesse o dashboard da Vercel
2. Vá no seu projeto → **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

```
STRIPE_SECRET_KEY=sk_live_seu_secret_key_aqui
STRIPE_PRICE_GESTAO=price_id_do_plano_gestao
STRIPE_PRICE_FULL=price_id_do_plano_full
STRIPE_PRICE_SETUP=price_id_do_setup
SUCCESS_URL=https://painel-de-controle-barbearia.web.app
CANCEL_URL=https://seu-site.vercel.app#pricing
```

4. Salve e faça **Redeploy** do projeto

## Passo 4: Testar

1. Acesse sua landing page
2. Clique em "Assinar Gestão" ou "Quero o Plano Full"
3. Você será redirecionado para o checkout do Stripe
4. No checkout, a opção de **parcelamento** aparecerá automaticamente
5. Após o pagamento, será redirecionado para o painel

## Como funciona

- Setup R$ 1.200 + Mensalidade R$ 79,90 ou R$ 119,90 = **Cobrado junto no 1º mês**
- Depois cobra só a mensalidade todo mês automaticamente
- **Não tem parcelamento** (limitação do Stripe com assinaturas)
- Cliente pode pagar com qualquer cartão de crédito/débito

## Próximos passos

Depois de configurar e testar:
1. Ative webhooks do Stripe para sincronizar status de assinatura
2. Integre com seu painel Firebase para liberar/bloquear acesso
3. Configure emails de confirmação
