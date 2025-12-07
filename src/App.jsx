import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Star, Calendar, DollarSign, Smartphone, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

// --- CONFIGURAÇÃO ---
const WHATSAPP_LINK = "https://wa.me/5541991750402?text=Quero%20tirar%20duvidas%20sobre%20o%20sistema";
const API_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:3000' 
  : '';

// Função para criar checkout com parcelamento
const createCheckoutSession = async (planType) => {
  try {
    const response = await fetch(`${API_URL}/api/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planType }),
    });

    const data = await response.json();
    
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('Erro ao criar sessão de pagamento');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar pagamento. Tente novamente ou entre em contato.');
  }
};

// --- Componentes UI ---

const Button = ({ children, variant = 'primary', className = '', href = null, onClick = null, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
    outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5"
  };

  if (href) {
    const isInternalLink = href.startsWith('#');
    return (
      <a 
        href={href} 
        {...(!isInternalLink && { target: "_blank", rel: "noopener noreferrer" })}
        className={`${baseStyle} ${variants[variant]} ${className}`} 
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", highlight = false }) => (
  <div className={`p-6 rounded-2xl border transition-all duration-300 ${highlight 
    ? 'bg-gray-900/80 border-purple-500 shadow-2xl shadow-purple-900/20 scale-105 relative z-10' 
    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700 hover:bg-gray-800/40'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
    {children}
  </span>
);

// --- Seções ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white">B</span>
          </div>
          Bozz<span className="text-purple-500">Cut</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Recursos</a>
          <a href="#demo" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Demonstração</a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Preços</a>
          <Button variant="primary" className="py-2 px-4 text-sm" href="#pricing">Começar Grátis</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl">
          <a href="#features" className="text-gray-300 py-2">Recursos</a>
          <a href="#pricing" className="text-gray-300 py-2">Preços</a>
          <Button variant="secondary" className="w-full justify-center" href="https://painel-de-controle-barbearia.web.app">Entrar</Button>
          <Button variant="primary" className="w-full justify-center" href="#pricing">Começar Agora</Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Gestão para Barbearias 2.0</Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mt-6 leading-[1.1]">
              Sua barbearia no <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Piloto Automático</span>
            </h1>
            <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto lg:mx-0">
              Deixe o agendamento por nossa conta. Um sistema completo com App para o cliente e notificações no WhatsApp.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button variant="primary" href="#pricing">
              Ver Planos <ChevronRight size={18} />
            </Button>
            <Button variant="secondary" href={WHATSAPP_LINK}>
              Falar com Consultor
            </Button>
          </motion.div>

          <div className="pt-8 flex items-center gap-4 justify-center lg:justify-start text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-slate-950 flex items-center justify-center text-xs text-white overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p>Crescendo junto com o seu negócio</p>
          </div>
        </div>

        {/* Mockup Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto lg:mr-0"
        >
          <div className="relative z-10 bg-slate-900 p-2 rounded-[2rem] border border-white/10 shadow-2xl shadow-purple-500/20 rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2600&auto=format&fit=crop" 
              alt="App Dashboard" 
              className="rounded-[1.5rem] w-full max-w-md object-cover opacity-90"
            />
             {/* Floating Card */}
             <div className="absolute -bottom-10 -left-10 bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-xl flex items-center gap-4 animate-bounce-slow">
               <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                 <DollarSign size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-400">Faturamento Hoje</p>
                 <p className="text-lg font-bold text-white">R$ 1.250,00</p>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Calendar className="text-purple-400" />, title: "Agenda Inteligente", desc: "Evite conflitos de horário e gerencie bloqueios de almoço com um clique." },
    { icon: <DollarSign className="text-green-400" />, title: "Gestão Financeira", desc: "Saiba exatamente quanto cada barbeiro rendeu e calcule comissões automaticamente." },
    { icon: <Smartphone className="text-blue-400" />, title: "App do Cliente", desc: "Seu cliente baixa o app (PWA), agenda sozinho e recebe lembretes." },
    { icon: <MessageCircle className="text-pink-400" />, title: "Bot de WhatsApp", desc: "Envie confirmações e lembretes automáticos para reduzir o no-show." },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tudo o que você precisa em um só lugar</h2>
          <p className="text-gray-400">Abandone o papel e caneta. Tenha o controle total da sua barbearia na palma da mão.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="group hover:-translate-y-2">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => {
  return (
    <section id="demo" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge>Experiência do Cliente</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Seu cliente agenda em <span className="text-purple-400">15 segundos</span>.
            </h2>
            <ul className="space-y-6">
              {[
                "Login com Google (Sem senhas para esquecer).",
                "Interface moderna e intuitiva.",
                "Histórico de cortes e refazer agendamento.",
                "Instalação no celular sem ocupar memória (PWA)."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <Check size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
          </div>
          
          <div className="relative">
             {/* Abstract Shapes */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[80px]" />
             
             {/* Phone Frames Grid */}
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4 mt-8">
                 {/* Card 1: Home Page with Image */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5 }}
                   viewport={{ once: true }}
                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
                 >
                   <div className="bg-slate-900 rounded-xl overflow-hidden h-56 relative group">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                      <img 
                        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop" 
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt="Barber Shop" 
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <p className="text-white font-bold text-lg">Home Page</p>
                        <p className="text-gray-300 text-xs mt-1">Interface moderna e intuitiva</p>
                      </div>
                   </div>
                 </motion.div>

                 {/* Card 2: Login Google */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                   viewport={{ once: true }}
                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300"
                 >
                    <div className="bg-slate-900 rounded-xl p-6 h-36 flex items-center justify-center border border-dashed border-gray-700/50">
                       <div className="text-center">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                           <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-7 h-7" alt="Google" />
                         </div>
                         <p className="text-white font-semibold text-sm">Login com Google</p>
                         <p className="text-gray-400 text-xs mt-1">Rápido e seguro</p>
                       </div>
                    </div>
                 </motion.div>
               </div>

               <div className="space-y-4">
                 {/* Card 3: Pro Badge */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   viewport={{ once: true }}
                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
                 >
                    <div className="bg-slate-900 rounded-xl p-4 h-36 flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                         <div className="flex items-center gap-2">
                           <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                             <Star size={20} className="text-purple-400" />
                           </div>
                           <div>
                             <p className="text-white font-bold text-sm">Plano Full</p>
                             <p className="text-gray-400 text-xs">Recursos avançados</p>
                           </div>
                         </div>
                         <Badge>PRO</Badge>
                       </div>
                       <div className="space-y-2">
                         <div className="flex items-center gap-2">
                           <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                             <div className="h-full w-3/4 bg-purple-500 rounded-full"></div>
                           </div>
                           <span className="text-xs text-gray-400">75%</span>
                         </div>
                       </div>
                    </div>
                 </motion.div>

                 {/* Card 4: Agendamentos */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.3 }}
                   viewport={{ once: true }}
                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-2xl border border-gray-700 shadow-xl hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300"
                 >
                   <div className="bg-slate-900 rounded-xl p-4 h-56 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-bold text-sm">Agendamentos</h4>
                        <div className="text-green-400 bg-green-500/20 p-1.5 rounded-full">
                          <CheckCircleIcon />
                        </div>
                      </div>
                      <div className="space-y-3">
                         {[
                           { name: "João Silva", time: "14:00", status: "confirmed" },
                           { name: "Pedro Costa", time: "15:30", status: "confirmed" },
                           { name: "Carlos Santos", time: "17:00", status: "pending" }
                         ].map((appointment, i) => (
                           <div key={i} className="flex gap-3 items-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                               {appointment.name.charAt(0)}
                             </div>
                             <div className="flex-1">
                               <p className="text-white text-xs font-semibold">{appointment.name}</p>
                               <p className="text-gray-400 text-[10px]">{appointment.time}</p>
                             </div>
                             <div className={`w-2 h-2 rounded-full ${appointment.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                           </div>
                         ))}
                      </div>
                   </div>
                 </motion.div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Video = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge>Veja na Prática</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Conheça o sistema <span className="text-purple-400">em ação</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Assista a demonstração completa e descubra como o BozzCut pode transformar a gestão da sua barbearia.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-gray-800 bg-gray-900 p-2">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ktUXhYo5sHk"
                title="BozzCut Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="primary" href="#pricing">
              Começar Agora <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Escolha o plano ideal</h2>
          <p className="text-gray-400">Preços transparentes. Sem taxas escondidas.</p>
        </div>

        <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-8">
          {/* Plano Teste */}
          <Card className="flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                🎁 GRÁTIS
              </span>
            </div>
            <div className="mb-6 mt-4">
              <h3 className="text-xl font-bold text-white">Teste Grátis</h3>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-green-400">R$ 0</span>
                </div>
                <span className="text-sm text-gray-400">por 7 dias</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Experimente sem compromisso.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Painel Administrativo", "Controle Financeiro", "Agenda Manual", "Cadastro de Barbeiros Ilimitado", "Suporte por Email"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={16} className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full justify-center border-green-500 text-green-400 hover:bg-green-500/10" href={WHATSAPP_LINK}>
              Começar Teste Grátis
            </Button>
          </Card>

          {/* Plano Gestão */}
          <Card className="flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white">Plano Gestão</h3>
              <div className="flex flex-col gap-2 mt-4">
                <div>
                  <span className="text-sm text-gray-400">Setup único: </span>
                  <span className="text-lg font-bold text-purple-400">R$ 1.200</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">R$ 79,90</span>
                  <span className="text-gray-500 mb-1">/mês</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">Para organizar a casa e sair do papel.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {["Painel Administrativo", "Controle Financeiro", "Agenda Manual", "Cadastro de Barbeiros Ilimitado", "Suporte por Email"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check size={16} className="text-purple-500" /> {item}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full justify-center" onClick={() => createCheckoutSession('gestao')}>Assinar Gestão</Button>
          </Card>

          {/* Plano Full */}
          <Card highlight={true} className="flex flex-col">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              MAIS VENDIDO
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Plano Full <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </h3>
              <div className="flex flex-col gap-2 mt-4">
                <div>
                  <span className="text-sm text-gray-400">Setup único: </span>
                  <span className="text-lg font-bold text-purple-300">R$ 1.200</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">R$ 119,90</span>
                  <span className="text-gray-500 mb-1">/mês</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-2">A experiência completa para você e seu cliente.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Tudo do Plano Gestão", 
                "App de Agendamento (Cliente)", 
                "Login com Google", 
                "Envio Automático de WhatsApp", 
                "Relatórios Avançados",
                "Suporte Prioritário no Zap"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white font-medium">
                  <Check size={16} className="text-purple-500" /> {item}
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full justify-center" onClick={() => createCheckoutSession('full')}>Quero o Plano Full</Button>
            <p className="text-center text-xs text-gray-500 mt-4">7 dias de garantia incondicional</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-slate-950">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
      <div className="col-span-2">
        <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-xs">B</span>
          </div>
          BozzCut
        </div>
        <p className="text-gray-500 max-w-xs">
          Transformando barbearias comuns em negócios digitais de alta performance.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Produto</h4>
        <ul className="space-y-2 text-gray-500">
          <li><a href="#" className="hover:text-white">Recursos</a></li>
          <li><a href="#" className="hover:text-white">Preços</a></li>
          <li><a href="#" className="hover:text-white">Para Clientes</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Legal</h4>
        <ul className="space-y-2 text-gray-500">
          <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
          <li><a href="#" className="hover:text-white">Privacidade</a></li>
          <li><a href="#" className="hover:text-white">Contato</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
      © 2025 BozzCut Tecnologia. Todos os direitos reservados.
    </div>
  </footer>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Video />
      <Pricing />
      <Footer />
    </div>
  );
}
