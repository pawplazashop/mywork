import React, { useState } from 'react';

// Neon fox logo resource (used as a static asset)
const logoUrl = 'https://file.aitubo.ai/assets/doc/2024/09/aitubo--2-.jpg!w1280';

const WALLET_ADDRESSES = [
  { label: 'Bitcoin (BTC)', value: 'bc1qs58cawu2xgzq5gdwk0pv6s86cqz8hy3zj95plp' },
  { label: 'Litecoin (LTC)', value: 'ltc1qjw8xx9euam963qkymgpvrm85y0jjf3s93dtxxh' },
  { label: 'Ethereum (ETH)', value: '0x9B6559e72C57024170C08DE7EDa092E99ab77530' },
  { label: 'USDT (TRC20)', value: 'TJ74BMDUXKc3ZkkePoi739WqbbgXrQDHSo' },
  { label: 'TRON (TRX)', value: 'TJ74BMDUXKc3ZkkePoi739WqbbgXrQDHSo' },
];

const PRODUCTS = [
  {
    id: 'waitperson',
    title: 'Bypass Waitperson',
    price: 150,
    warning: '⚠️ For educational and authorized red team use ONLY!',
    desc: 'Red team method for bypassing Waitperson KYC. Detailed operational document included.'
  },
  {
    id: 'facetec',
    title: 'Bypass Facetec with OBS and spoofed drivers',
    price: 87,
    warning: '⚠️ Know Your Customer bypasses are for internal security research only.',
    desc: 'Exploit walk-through for Facetec ID systems, with step-by-step OBS/spoofed driver setup.'
  },
  {
    id: 'telegram',
    title: 'Join our Telegram private chat with all our tools',
    price: 300,
    warning: '⚠️ STRICTLY red team/authorized cybersecurity professionals - proof of payment and permission required.',
    desc: 'Access private Telegram with red team tools, methods, and live discussion.'
  }
];

function CircuitDivider() {
  return <div className="circuit-divider" role="separator" aria-hidden />;
}

function Footer() {
  return (
    <footer className="site-footer text-center py-6 border-t border-cyan-700/40 mt-auto">
      <span className="inline-block mb-2 text-cyan-200/90 font-semibold select-none">Trusted by red teams worldwide</span><br />
      &copy; {new Date().getFullYear()} KYC BYPASS FOR RED TEAM &middot;{' '}
      <a href="https://t.me/kycbypass2024admin" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400 transition">Contact Admin</a>
    </footer>
  );
}

function Intro() {
  return (
    <header className="max-w-3xl mx-auto text-center pt-12 pb-3">
      <div className="flex flex-col items-center gap-3">
        <img
          src={logoUrl}
          alt="Site Logo"
          className="w-20 h-20 logo-glow rounded-full border-4 border-cyan-400 shadow-lg mb-2"
          style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }}
        />
        <h1 className="text-4xl font-extrabold text-cyan-200 tracking-[0.04em] select-none">KYC BYPASS FOR RED TEAM</h1>
      </div>
      <p className="mt-5 px-1 text-zinc-200/90 text-lg leading-relaxed">
        Welcome to <span className="font-semibold text-cyan-400">KYC BYPASS FOR RED TEAM</span>, an educational channel dedicated to cybersecurity, ethical hacking, and red teaming techniques. We explore how Know Your Customer (KYC) systems work, their vulnerabilities, and how organizations can strengthen their defenses against potential bypass techniques.
      </p>
      <p className="mt-3 text-yellow-300 font-semibold text-base leading-snug">
        <b>⚠️ Disclaimer:</b> This channel is for educational purposes only. We do not promote or encourage illegal activities. Our goal is to raise awareness about security flaws so businesses and individuals can protect themselves from cyber threats.
      </p>
      <ul className="mt-5 flex flex-wrap justify-center gap-4 text-base text-cyan-300 font-medium select-none">
        <li>Red Teaming Tactics & Techniques</li>
        <li>KYC Systems & Their Weaknesses</li>
        <li>OSINT & Identity Verification Methods</li>
        <li>Ethical Hacking & Cybersecurity Awareness</li>
      </ul>
    </header>
  );
}

function ProductCard({ product, onBuy }: any) {
  return (
    <div className="group bg-zinc-900 border border-cyan-700/30 rounded-2xl shadow-md p-7 flex flex-col items-start gap-4 hover:shadow-cyan-800/40 transition relative">
      <h2 className="text-xl font-bold text-cyan-200/90 mb-1 flex items-center gap-2 select-text">
        {product.title}
      </h2>
      <div className="text-yellow-300 text-sm font-semibold mb-1 min-h-[38px] flex items-center select-text">{product.warning}</div>
      <div className="text-zinc-200/90 text-base mb-2 tracking-wide select-text">{product.desc}</div>
      <div className="text-2xl font-extrabold text-cyan-400 my-2 select-text">${product.price}</div>
      <button
        className="mt-2 px-6 py-2 btn font-bold focus:ring-2 focus:ring-cyan-400 rounded-lg bg-cyan-700 hover:bg-cyan-800 transition text-white shadow"
        onClick={() => onBuy(product)}
        aria-label={`Buy ${product.title} for $${product.price}`}
      >Buy Now</button>
    </div>
  );
}

function ModalSteps({step}:{step:number}) {
  return (
    <div className="modal-steps flex justify-center gap-3 mb-6" aria-hidden="true">
      <div className={"modal-step w-4 h-4 rounded-full bg-cyan-700 opacity-40" + (step>=1 ? ' active opacity-100':'')}></div>
      <div className={"modal-step w-4 h-4 rounded-full bg-cyan-700 opacity-40" + (step>=2 ? ' active opacity-100':'')}></div>
      <div className={"modal-step w-4 h-4 rounded-full bg-cyan-700 opacity-40" + (step>=3 ? ' active opacity-100':'')}></div>
      <style>{`
        .modal-step.active {
          box-shadow: 0 0 8px #22d3ee;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}

function CheckoutModal({ product, onClose }: any) {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<File|null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  async function handleUpload() {
    if (!photo) return;
    setIsUploading(true);
    setUploadMessage('Uploading photo to Telegram and awaiting manual verification...');
    // --- Will integrate Telegram Bot API next ---
    setTimeout(() => {
      setIsUploading(false);
      setUploadMessage('Upload complete! You will be contacted after manual verification.');
      setStep(3);
    }, 2500);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-80 px-2 py-6" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
      <div className="relative bg-zinc-950 rounded-2xl shadow-2xl border-2 border-cyan-800 w-full max-w-lg mx-4 p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-cyan-900 hover:text-cyan-200 text-2xl font-bold"
          aria-label="Close checkout modal"
          type="button"
        >×</button>
        <h2 id="checkout-modal-title" className="text-2xl font-bold text-cyan-200 mb-2 select-text">{product.title}</h2>
        <ModalSteps step={step} />
        {step === 1 && (
          <>
            <div className="text-lg font-bold mb-2 select-text">Price: <span className="text-cyan-300">${product.price}</span></div>
            <div className="text-left mb-4">
              <div className="font-semibold text-yellow-400 mb-2 select-text">⚠️ Pay exact amount to one of the wallet addresses below:</div>
              <ul className="mb-4 space-y-2 select-text">
                {WALLET_ADDRESSES.map(addr => (
                  <li key={addr.label}><b className="text-cyan-400">{addr.label}:</b> <span className="text-zinc-200 font-mono text-sm select-all">{addr.value}</span></li>
                ))}
              </ul>
              <div className="mb-2 text-cyan-300 text-xs select-text">Need more crypto options? <a className="underline font-medium" href="https://t.me/kycbypass2024admin" target="_blank" rel="noopener noreferrer">Contact us on Telegram</a>.</div>
              <div className="text-magenta-300 text-xs mb-3 select-text">After sending payment, upload a screenshot/photo of your payment receipt below. This is required for product delivery.</div>
            </div>
            <button className="mt-1 btn px-8 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 font-bold text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 transition" onClick={() => setStep(2)} type="button">Upload Proof</button>
          </>
        )}
        {step === 2 && (
          <>
            <p className="mb-2 text-cyan-200 font-medium select-text">Please upload your payment screenshot (jpg/png/webp):</p>
            <input
              type="file"
              accept="image/*"
              className="block w-full mb-4 rounded border border-cyan-700 bg-zinc-900 text-zinc-200 px-3 py-2"
              onChange={e => setPhoto(e.target.files?.[0] || null)}
              disabled={isUploading}
              aria-label="Upload payment proof screenshot"
            />
            <button
              className="btn px-8 py-2 mt-1 rounded-lg bg-cyan-700 hover:bg-cyan-800 font-bold text-white shadow disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={handleUpload}
              disabled={!photo || isUploading}
              type="button"
            >{isUploading ? 'Uploading...' : 'Submit Proof'}</button>
            {uploadMessage && <div className="mt-3 text-green-400 font-bold select-text" role="status" aria-live="polite">{uploadMessage}</div>}
          </>
        )}
        {step === 3 && (
          <div className="my-6 select-text">
            <div className="text-green-200 font-semibold text-lg mb-3">Thank you! Your proof has been received.</div>
            {product.id === 'telegram' && (
              <p className="text-cyan-300 mb-2">A private Telegram invite link will be sent to your proof Telegram/contact after verification.</p>
            )}
            <p className="text-zinc-300 text-xs">Admin will contact you after manual verification. For urgent support, <a className="underline" href="https://t.me/kycbypass2024admin" target="_blank" rel="noopener noreferrer">message admin</a>.</p>
          </div>
        )}
      </div>
      <style>{`
        .btn {
          user-select: none;
        }
      `}</style>
    </div>
  );
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#211f33] via-[#182138] to-[#161421] text-zinc-200 flex flex-col">
      <Intro />
      <CircuitDivider />
      <main className="max-w-6xl mx-auto px-4 pb-20 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onBuy={setSelectedProduct} />
          ))}
        </div>
      </main>
      <Footer />
      {selectedProduct && (
        <CheckoutModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Styles for circuit divider and glow */}
      <style>{`
        .circuit-divider {
          width: 100%;
          height: 2px;
          margin: 2rem 0;
          background: repeating-linear-gradient(
            90deg,
            #0e7490,
            #0e7490 4px,
            transparent 4px,
            transparent 8px
          );
          filter: drop-shadow(0 0 4px #22d3ee);
          user-select: none;
        }
        .logo-glow {
          filter: drop-shadow(0 0 6px #22d3ee);
          transition: filter 0.3s ease;
        }
        .logo-glow:hover {
          filter: drop-shadow(0 0 10px #22d3ee);
        }
      `}</style>
    </div>
  );
}

export default App;
