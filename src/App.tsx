import { useMemo, useState } from 'react';

type FAQType = {
  topic: string;
  sections: {
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[]
  }[]
}[]

const faq: FAQType = [
  {
    topic: 'CHARS',
    sections: [
      {
        subtitle: 'Main Character',
        items: [
          {
            question: 'O que é o Main?',
            answer: 'É o personagem principal utilizado por você no servidor.'
          },
          {
            question: 'Posso alterar meu Main?',
            answer: 'Sim. Basta atualizar sua descrição no TeamSpeak.'
          }
        ]
      },
      {
        subtitle: 'Bombchars',
        items: [
          {
            question: 'O que é um Bombchar?',
            answer: 'São personagens alternativos utilizados para suporte ou outras funções.'
          },
          {
            question: 'Posso cadastrar vários Bombchars?',
            answer: 'Sim. Utilize o botão "Adicionar Maker" para criar quantos campos desejar.'
          }
        ]
      }
    ]
  },
  {
    topic: 'TEAMSPEAK',
    sections: [
      {
        subtitle: 'Descrição',
        items: [
          {
            question: 'Como copiar minha descrição?',
            answer: 'Clique em "Copiar descrição" e cole no campo de descrição do TeamSpeak.'
          }
        ]
      }
    ]
  },
  {
    topic: "CONTRIBUIÇÃO",
    sections: [
      {
        subtitle: "Warzone",
        items: [
          {
            question: "É obrigatório?",
            answer: "Não é obrigatório, porém há um dia na semana em que a doação será obrigatória para ajudar a custear a guerra em outros servidores."
          },
          {
            question: "Quais são os horários da Warzone?",
            answer: "Os horários serão divulgados nos grupos do Whatsapp e também haverão pokes no Ts cerca de 30min antes de puxarem a Warzone."
          },
          {
            question: "São todos os dias no mesmo horário?",
            answer: "A princípio sim! Podem haver alterações de acordo com a necessidade do servidor, como em casos de resp pause, mass logs, eventos e etc."
          },
          {
            question: "Quais items devo doar?",
            answer: "Prismatic Necklace, Prismatic Amulet e Gill Necklace"
          }
        ]
      }
    ]
  }
];

export default function App() {
  const [mainChar, setMainChar] = useState('');
  const [makers, setMakers] = useState<string[]>(['']);
  const [activePage, setActivePage] = useState<'generator' | 'faq'>(
    'generator'
  );

  function updateMaker(index: number, value: string) {
    const updated = [...makers];
    updated[index] = value;
    setMakers(updated);
  }

  function clearMaker(index: number) {
    const updated = [...makers];
    updated[index] = '';
    setMakers(updated);
  }

  function addMakerField() {
    setMakers([...makers, '']);
  }

  const description = useMemo(() => {
    const validMakers = makers
      .map((maker) => maker.trim())
      .filter(Boolean);

    return `Main: ${mainChar || 'Sem'} | Bombchar: ${validMakers.length ? validMakers.join(', ') : 'Sem'
      }`;
  }, [mainChar, makers]);

  return (
    <main className="min-h-screen bg-[#090511] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-purple-500/10 bg-[#14071f]/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img
            src="/logo.png"
            alt="Ascended"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-xl font-black text-white">
            Ascended Team
          </h1>

          <p className="text-sm text-purple-200/70 mt-1">
            Ferramentas e informações da guild
          </p>
        </div>

        {/* Navegação */}
        <nav className="mb-8">
          <div className="flex gap-2 rounded-xl bg-[#0c0614] p-1">
            <button
              onClick={() => setActivePage('generator')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition hover:cursor-pointer ${activePage === 'generator'
                ? 'bg-purple-700 text-white'
                : 'text-purple-200 hover:bg-white/5'
                }`}
            >
              Gerador de Descrição
            </button>

            <button
              onClick={() => setActivePage('faq')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition hover:cursor-pointer ${activePage === 'faq'
                ? 'bg-purple-700 text-white'
                : 'text-purple-200 hover:bg-white/5'
                }`}
            >
              FAQ
            </button>
          </div>
        </nav>

        {activePage === 'generator' && (
          <>
            <div className="mb-8 text-left">
              <h2 className="text-xl font-black text-white">
                Gerador de Descrição
              </h2>

              <p className="text-sm text-purple-200/70 mt-1">
                Gere rapidamente sua descrição do TeamSpeak
              </p>
            </div>

            {/* FORMULÁRIO */}
            <div className="flex flex-col items-start gap-6">
              {/* Main */}
              <div className="w-full flex flex-col items-start">
                <label className="text-sm font-semibold text-purple-200 mb-2">
                  Main Character
                </label>

                <div className="w-full flex items-center gap-2">
                  <input
                    type="text"
                    value={mainChar}
                    required
                    onChange={(e) => setMainChar(e.target.value)}
                    placeholder="Ex: Pala Neurotico"
                    className="flex-1 rounded-xl bg-[#1d0d2d] border border-purple-500/10 px-4 py-3 text-white placeholder:text-purple-300/30 outline-none transition focus:border-purple-500/40"
                  />

                  <button
                    type="button"
                    onClick={() => setMainChar('')}
                    className="h-12.5 min-w-12.5 rounded-xl hover:cursor-pointer bg-[#2a123f] border border-purple-500/10 text-purple-200 hover:bg-[#351752] transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Makers */}
              <div className="w-full flex flex-col items-start">
                <label className="text-sm font-semibold text-purple-200 mb-2">
                  Bombchars / Makers
                </label>

                <div className="w-full flex flex-col gap-3">
                  {makers.map((maker, index) => (
                    <div key={index} className="w-full flex items-center gap-2">
                      <input
                        type="text"
                        value={maker}
                        onChange={(e) => updateMaker(index, e.target.value)}
                        placeholder={`Maker ${index + 1}`}
                        className="flex-1 rounded-xl bg-[#1d0d2d] border border-purple-500/10 px-4 py-3 text-white placeholder:text-purple-300/30 outline-none transition focus:border-purple-500/40"
                      />

                      <button
                        type="button"
                        onClick={() => clearMaker(index)}
                        className="h-12.5 min-w-12.5 hover:cursor-pointer rounded-xl bg-[#2a123f] border border-purple-500/10 text-purple-200 hover:bg-[#351752] transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addMakerField}
                  className="mt-4 rounded-lg hover:cursor-pointer bg-purple-700/40 hover:bg-purple-700/60 px-4 py-2 text-sm font-medium text-white transition"
                >
                  + Adicionar Maker
                </button>
              </div>
            </div>

            {/* Resultado */}
            <div className="mt-8 w-full">
              <label className="block text-sm font-semibold text-purple-200 mb-2">
                Resultado
              </label>

              <div className="w-full rounded-xl bg-[#0c0614] border border-purple-500/10 p-4">
                <p className="text-sm text-purple-100 wrap-break-word">
                  {description}
                </p>
              </div>
            </div>

            {/* Copy */}
            <button
              onClick={() => navigator.clipboard.writeText(description)}
              className="w-full mt-6 hover:cursor-pointer rounded-xl bg-linear-to-r from-purple-700 to-violet-600 py-3 font-bold text-white transition hover:opacity-90"
            >
              Copiar descrição
            </button>
          </>
        )}

        {activePage === 'faq' && (
          <>
            <div className="mb-8 text-left">
              <h2 className="text-lg font-bold text-white">
                Perguntas Frequentes
              </h2>

              <p className="text-xs text-purple-200/60 mt-1">
                Informações úteis sobre chars e TeamSpeak.
              </p>
            </div>

            <div className="space-y-2">
              {faq.map((topic) => (
                <details
                  key={topic.topic}
                  className="group rounded-lg bg-[#0c0614] border border-purple-500/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between list-none cursor-pointer px-4 py-3 text-purple-300 font-semibold text-sm hover:bg-white/5 transition">
                    <span>{topic.topic}</span>

                    <span className="transition-transform duration-200 group-open:rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="p-3 border-t border-purple-500/10 space-y-2">
                    {topic.sections.map((section) => (
                      <details
                        key={section.subtitle}
                        className="group/section rounded-md bg-[#14071f]/40 border border-purple-500/10 overflow-hidden"
                      >
                        <summary className="flex items-center justify-between list-none cursor-pointer px-3 py-2 text-purple-200 text-xs font-medium hover:bg-white/5 transition">
                          <span>{section.subtitle}</span>

                          <span className="transition-transform duration-200 group-open/section:rotate-180">
                            ▼
                          </span>
                        </summary>

                        <div className="p-2 border-t border-purple-500/10 space-y-2">
                          {section.items.map((item, index) => (
                            <details
                              key={index}
                              className="group/question rounded-md bg-[#1a0b28]/50 border border-purple-500/10 overflow-hidden"
                            >
                              <summary className="flex items-center justify-between list-none cursor-pointer px-3 py-2 text-xs text-purple-100 hover:bg-white/5 transition">
                                <span>{item.question}</span>

                                <span className="text-purple-400 transition-transform duration-200 group-open/question:rotate-180">
                                  ▼
                                </span>
                              </summary>

                              <div className="border-t border-purple-500/10 px-3 py-2">
                                <p className="text-[11px] leading-relaxed text-purple-100/75">
                                  {item.answer}
                                </p>
                              </div>
                            </details>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}