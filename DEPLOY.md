# 🚀 Deploy na Vercel

## Opção 1: Via Dashboard (Mais Fácil)

1. Acesse: https://vercel.com/new
2. Conecte sua conta GitHub
3. Selecione o repositório: `caiolamoglia1/LANDING-PAGE-BARBER`
4. Clique em "Deploy"
5. Aguarde o build ✨

**Pronto!** A Vercel vai detectar automaticamente que é um projeto Vite e fazer o deploy.

## Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## ⚙️ Variáveis de Ambiente (se necessário)

Se precisar adicionar variáveis:
1. Dashboard Vercel → Seu Projeto
2. Settings → Environment Variables
3. Adicione as variáveis

## 🔗 URL do Deploy

Após o deploy, você receberá uma URL como:
- Preview: `landing-page-barber-xxx.vercel.app`
- Production: `seu-dominio.vercel.app` (se configurar domínio customizado)

## 📝 Notas

- ✅ O `vercel.json` já está configurado
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Deploy automático a cada push na `main`

## 🎯 Próximos Passos

1. Adicione um domínio customizado (opcional)
2. Configure Analytics (opcional)
3. Atualize os links de pagamento em `src/App.jsx`
