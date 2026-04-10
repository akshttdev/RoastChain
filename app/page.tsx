import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#111111] text-white min-h-screen selection:bg-white selection:text-black font-sans flex flex-col items-center">

      {/* Navbar */}
      <nav className="w-full max-w-[1400px] flex justify-between items-center px-6 py-6 border-b border-transparent uppercase text-xs tracking-[0.1em] z-50">
        <div className="text-xl font-black tracking-tight">ROASTCHAIN</div>

        <div className="hidden md:flex gap-8 items-center font-bold">
          <a href="#" className="text-white/60 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">BATTLES</a>
          <a href="#" className="text-white/60 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">VOTE</a>
          <a href="#" className="text-white/60 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">LEADERBOARD</a>
        </div>

        <button className="bg-white text-black px-6 py-3 font-bold hover:bg-white/90 transition-colors uppercase tracking-[0.1em]">
          CONNECT_WALLET
        </button>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-32 w-full max-w-[1400px]">
        <div className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-10 w-full max-w-lg text-center flex items-center justify-center gap-2">
          ESTABLISHED_2026 // PERMISSIONLESS_VERBAL_COMBAT
        </div>

        <h1 className="text-[14vw] md:text-[14rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 self-center">
          ROAST.<br />
          VOTE.<br />
          WIN.
        </h1>

        <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed mb-12 font-light">
          A decentralized arena for brutal honesty. Stake your reputation, submit your roasts, and let the chain decide the victor.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button className="bg-white text-black px-12 py-5 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors">
            CONNECT WALLET
          </button>

          <button className="border border-white/20 px-12 py-5 text-sm font-bold uppercase tracking-[0.15em] hover:border-white hover:bg-white/5 transition-all">
            ENTER ARENA
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full bg-[#161616] px-6 py-24 flex justify-center border-y border-white/[0.03]">
        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 border border-white/20">

          {/* Card 1 */}
          <div className="p-10 md:p-12 md:pb-8 border-b md:border-b-0 md:border-r border-white/20 flex flex-col justify-between group min-h-[360px]">
            <div>
              <div className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-10 uppercase">
                01 / SUBMISSION
              </div>
              <h3 className="text-2xl md:text-[32px] font-black uppercase tracking-tight mb-5 leading-[1.1]">
                ON-CHAIN<br />SUBMISSIONS
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-light mt-1">
                Every burn is cryptographically signed and anchored to the ledger. Permanent records of your wit, secured by decentralized infrastructure.
              </p>
            </div>
            <div className="flex justify-end mt-12 w-full">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 10l3 3-3 3" />
                <path d="M13 16h4" />
              </svg>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-10 md:p-12 md:pb-8 border-b md:border-b-0 md:border-r border-white/20 flex flex-col justify-between group min-h-[360px]">
            <div>
              <div className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-10 uppercase">
                02 / CONSENSUS
              </div>
              <h3 className="text-2xl md:text-[32px] font-black uppercase tracking-tight mb-5 leading-[1.1]">
                TRANSPARENT<br />VOTING
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-light mt-1">
                No black boxes. No shadow bans. Every vote is verifiable in real-time. Governance through collective roasting power.
              </p>
            </div>
            <div className="flex justify-end mt-12 w-full">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4h14v2H5V4zm0 5h14v2H5V9zm0 5h14v2H5v-2zm0 5h14v2H5v-2zM3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v14h14V5H5z" />
                <path d="M9 13l2 2 4-4-1.41-1.41L11 12.17l-.59-.58L9 13z" />
              </svg>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-10 md:p-12 md:pb-8 flex flex-col justify-between group min-h-[360px]">
            <div>
              <div className="text-[10px] tracking-[0.2em] font-bold text-white/50 mb-10 uppercase">
                03 / FINALITY
              </div>
              <h3 className="text-2xl md:text-[32px] font-black uppercase tracking-tight mb-5 leading-[1.1]">
                IMMUTABLE<br />RESULTS
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-light mt-1">
                Once the verdict is reached, the victor is crowned forever. Rewards distributed instantly via smart contract execution.
              </p>
            </div>
            <div className="flex justify-end mt-12 w-full">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <path d="M12 2L2 22h20L12 2z" />
                <path d="M12 16h.01" />
                <path d="M12 8v5" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-[#111111] px-6 py-32 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between items-center">

          {/* Left: Text */}
          <div className="lg:w-1/2 flex flex-col justify-center items-start">
            <h2 className="text-5xl md:text-[72px] font-black uppercase tracking-tighter leading-[0.9] mb-8">
              THE STATS<br />DON'T LIE.
            </h2>
            <div className="w-20 h-1 bg-white mb-8"></div>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed font-light">
              ROASTCHAIN is the primary layer for decentralized verbal conflict. We process thousands of roasts per epoch, delivering absolute finality to the arena.
            </p>
          </div>

          {/* Right: Grid */}
          <div className="lg:w-1/2 w-full border border-white/20 grid grid-cols-2">
            {[
              { label: "TOTAL_ROASTS", value: "142.8K", borderRight: true, borderBottom: true },
              { label: "VOTES_CAST", value: "2.4M", borderRight: false, borderBottom: true },
              { label: "WINNER_PAYOUTS", value: "840 ETH", borderRight: true, borderBottom: false },
              { label: "ARENA_UPTIME", value: "100%", borderRight: false, borderBottom: false },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-10 border-white/20 flex flex-col justify-center ${stat.borderRight ? 'border-r' : ''} ${stat.borderBottom ? 'border-b' : ''}`}
              >
                <div className="text-[9px] tracking-[0.2em] font-bold text-white/50 mb-3 uppercase">
                  {stat.label}
                </div>
                <div className="text-[32px] md:text-[40px] font-black tracking-tighter leading-none">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-[1200px] px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] font-bold text-white/40 uppercase mb-4 mt-auto">

        <div className="font-black text-white text-base tracking-tight mb-4 md:mb-0">
          ROASTCHAIN
        </div>

        <div className="text-left md:text-center flex-1 md:mx-8 mb-6 md:mb-0">
          ©2026 ROASTCHAIN. UNCOMPROMISING_ON_CHAIN_VIOLENCE.
        </div>

        <div className="flex gap-6 md:gap-8 justify-between w-full md:w-auto text-white/60">
          <a href="#" className="hover:text-white transition-colors">SMART_CONTRACT</a>
          <a href="#" className="hover:text-white transition-colors">FAQS</a>
          <a href="#" className="hover:text-white transition-colors">TWITTER</a>
        </div>
      </footer>

    </div>
  );
}