import { useMemo, useState } from 'react';

export default function App() {
  const [mainChar, setMainChar] = useState('');
  const [makers, setMakers] = useState<string[]>(['']);

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
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="Ascended"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-black text-white">
            Gerador de Descrição
          </h1>

          <p className="text-sm text-purple-200/70 mt-1">
            Gere rapidamente sua descrição do TeamSpeak
          </p>
        </div>

        {/* Form */}
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

            <div className="w-full flex flex-col items-start gap-3">
              {makers.map((maker, index) => (
                <div
                  key={index}
                  className="w-full flex items-center gap-2"
                >
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
      </div>
    </main>
  );
}