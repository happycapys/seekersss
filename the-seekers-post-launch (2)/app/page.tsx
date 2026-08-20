"use client";

import { useRef, useState } from "react";

const huntPostUrl = "https://x.com/theseekersrh";

const seekers = [
  "https://i.ibb.co/MDSp28TD/nft-21.png",
  "https://i.ibb.co/hJYmpwDy/nft-23.png",
  "https://i.ibb.co/j952m33j/nft-13.png",
  "https://i.ibb.co/rGLZK6G9/nft-9.png",
  "https://i.ibb.co/TDcq8bXh/1.png",
  "https://i.ibb.co/43Fjcm2/7.png",
];

const regions = [
  {
    id: "outpost",
    name: "The Outpost",
    kicker: "Where every hunt begins",
    position: "outpost",
    fragments: "Words I–II",
    lore: "The first Seekers built the Outpost from stolen timber, bent keys and maps nobody else believed. Every new trail is recorded here—but the oldest page has been torn away.",
    whisper: "The first word is never given. It is noticed.",
  },
  {
    id: "archives",
    name: "The Archives",
    kicker: "The records beneath the records",
    position: "archives",
    fragments: "Words III–IV",
    lore: "Long before $SEEK, goblins marked value with scratches in stone. Twelve entries in the first ledger were erased on the same night the ultimate treasure disappeared.",
    whisper: "Read what remains. Count what is missing.",
  },
  {
    id: "wilds",
    name: "The Wilds",
    kicker: "No trail stays still",
    position: "wilds",
    fragments: "Words V–VII",
    lore: "The Wilds rearrange themselves around greedy travellers. Seekers who chase the brightest object become lost; those who follow the quieter glint sometimes return with a word.",
    whisper: "Not every treasure wants to be found first.",
  },
  {
    id: "forge",
    name: "The Forge",
    kicker: "Where keys remember fire",
    position: "forge",
    fragments: "Words VIII–IX",
    lore: "Vault Keys are not cut. They are earned, heated and marked by the choices of their holder. Two keys may look identical while opening entirely different doors.",
    whisper: "The key keeps a record of the hand that held it.",
  },
  {
    id: "vault",
    name: "The Final Vault",
    kicker: "Twelve words. One attempt.",
    position: "vault",
    fragments: "Words X–XII",
    lore: "The last vault contains more than gold. Its maker divided the password into twelve words and scattered them through the world, certain no lone Seeker could recover them all.",
    whisper: "When the twelve are spoken in order, the map becomes a door.",
  },
];

const treasures = [
  ["$SEEK", "The currency of the hunt—earned through future staking and used across the Seeker world."],
  ["GOLD", "The goblins’ oldest obsession and a planned prize within selected vault openings."],
  ["SILVER", "Quieter than gold, harder to notice and hidden along less travelled routes."],
  ["DIGITAL TREASURE", "Onchain assets, Vault Keys and rewards discovered as the map expands."],
  ["RARE RELICS", "NFTs, artefacts, upgrades and objects that cannot be found twice."],
];

export default function Home() {
  const [activeRegion, setActiveRegion] = useState("outpost");
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const selected = regions.find((region) => region.id === activeRegion) ?? regions[0];

  const fadeAudio = (target: number, after?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      const difference = target - audio.volume;
      if (Math.abs(difference) < 0.03) {
        audio.volume = target;
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        after?.();
        return;
      }
      audio.volume = Math.max(0, Math.min(1, audio.volume + Math.sign(difference) * 0.025));
    }, 35);
  };

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      fadeAudio(0, () => audio.pause());
      setSoundOn(false);
      return;
    }
    audio.volume = 0;
    try {
      await audio.play();
      setSoundOn(true);
      fadeAudio(0.32);
    } catch {
      setSoundOn(false);
    }
  };

  return (
    <main>
      <audio ref={audioRef} src="/secret-mint.mp3" loop preload="metadata" />

      <nav className="nav wrap">
        <a className="brand" href="#top"><span className="brand-mark">✦</span><span>THE SEEKERS</span></a>
        <div className="nav-links"><a href="#lore">Lore</a><a href="#map">Map</a><a href="#twelve">The Twelve</a><a href="#treasure">Treasure</a></div>
        <button className={`sound-toggle ${soundOn ? "playing" : ""}`} type="button" aria-pressed={soundOn} onClick={toggleSound}>
          <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span>{soundOn ? "Sound on" : "Sound off"}
        </button>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> THE HUNT IS LIVE</div>
          <h1>FOLLOW<br />THE <em>MAP.</em></h1>
          <p className="lead">5,000 Seekers have entered a living treasure hunt on Robinhood Chain. Shiny things are scattered everywhere—but one treasure sits above them all.</p>
          <div className="hero-actions"><a className="button gold" href="#map">Enter the map <span>→</span></a><a className="button ghost" href="#lore">Read the legend</a></div>
          <div className="hero-stats"><div><b>5,000</b><span>Seekers</span></div><div><b>12</b><span>Hidden words</span></div><div><b>1</b><span>Final vault</span></div></div>
        </div>
        <div className="hero-art"><div className="sun" /><img className="hero-coin" src="/seeker-coin.png" alt="The Seeker coin" /><div className="map-label"><span>✦</span><div><small>THE ULTIMATE TREASURE</small><b>TWELVE WORDS OPEN THE VAULT.</b></div></div></div>
      </section>

      <div className="ticker"><div>THE HUNT IS LIVE <span>✦</span> FOLLOW THE CLUES <span>✦</span> FIND THE TWELVE <span>✦</span> OPEN THE VAULT <span>✦</span> THE HUNT IS LIVE <span>✦</span></div></div>

      <section className="lore wrap" id="lore">
        <div className="section-tag">01 / THE LEGEND</div>
        <div className="lore-heading"><h2>EVERY GOBLIN<br />SEEKS SOMETHING.</h2><p>Most seek what shines. A few seek what was hidden.</p></div>
        <div className="lore-grid">
          <article><span>I</span><h3>THE FIRST MAP</h3><p>Before treasure had prices, the goblins kept a single map. It did not show places. It showed desire—changing its roads whenever its holder wanted something badly enough.</p></article>
          <article><span>II</span><h3>THE SPLIT</h3><p>One Seeker found the ultimate treasure and understood it was too powerful for one hand. The map was divided into routes; its password was divided into twelve ordinary words.</p></article>
          <article><span>III</span><h3>THE RETURN</h3><p>Centuries later, the coin began to glow again. Five thousand Seekers heard the same instruction in different voices: follow the map, recover the words, and do not trust the obvious path.</p></article>
        </div>
        <blockquote>“Gold was only ever the light used to find the door.”</blockquote>
      </section>

      <section className="map-section" id="map"><div className="wrap">
        <div className="map-heading"><div><div className="section-tag">02 / THE LIVING MAP</div><h2>ONE WORLD.<br /><em>COUNTLESS ROUTES.</em></h2></div><p>Select a location. Every region carries part of the legend, and none reveals its secrets in the same way.</p></div>
        <div className="map-shell">
          <div className="world-map"><img src="/seekers-treasure-map.png" alt="The Seekers treasure map" />{regions.map((region) => <button key={region.id} aria-label={`Explore ${region.name}`} className={`map-pin ${region.position} ${activeRegion === region.id ? "active" : ""}`} onClick={() => setActiveRegion(region.id)}><span>{activeRegion === region.id ? "✦" : "•"}</span><b>{region.name}</b></button>)}</div>
          <aside className="region-dossier" key={selected.id}><small>CURRENT LOCATION</small><h3>{selected.name}</h3><b>{selected.kicker}</b><p>{selected.lore}</p><blockquote>{selected.whisper}</blockquote><div><span>HIDDEN FRAGMENTS</span><strong>{selected.fragments}</strong></div></aside>
        </div>
      </div></section>

      <section className="twelve wrap" id="twelve">
        <div className="twelve-copy"><div className="section-tag">03 / THE ULTIMATE TREASURE</div><h2>TWELVE WORDS.<br /><em>ONE PASSWORD.</em></h2><p>The ultimate treasure is protected by a twelve-word password. The words are hidden across lore, puzzles, holder routes, $SEEK routes and events yet to appear.</p><p>No wallet recovery phrase will ever be requested. The twelve words belong only to the Seeker hunt.</p></div>
        <div className="vault-panel"><div className="vault-top"><span>FINAL VAULT</span><b>0 / 12 RECOVERED</b></div><div className="word-grid">{Array.from({ length: 12 }, (_, index) => <div key={index}><span>{String(index + 1).padStart(2, "0")}</span><b>LOCKED</b></div>)}</div><div className="vault-seal"><span>⌁</span><div><small>THE PHRASE IS INCOMPLETE</small><b>THE FINAL DOOR REMAINS SEALED.</b></div></div></div>
      </section>

      <section className="hunt-loop"><div className="wrap"><div className="section-tag">04 / HOW THE WORLD MOVES</div><h2>SEEK. STAKE.<br /><em>OPEN.</em></h2><div className="loop-grid"><article><span>01</span><h3>HOLD A SEEKER</h3><p>Your Seeker is your identity, your key and your route into the hunt.</p></article><article><span>02</span><h3>STAKE &amp; EARN</h3><p>Future staking earns $SEEK and Vault Keys used throughout the expanding world.</p></article><article><span>03</span><h3>FOLLOW CLUES</h3><p>NFT and $SEEK holders will uncover different parts of the complete map.</p></article><article><span>04</span><h3>OPEN VAULTS</h3><p>Keys reveal shiny treasure. The twelve words reveal something greater.</p></article></div></div></section>

      <section className="treasure wrap" id="treasure"><div className="treasure-heading"><div><div className="section-tag">05 / SHINY THINGS</div><h2>GOBLINS DO NOT<br /><em>SEEK EMPTY-HANDED.</em></h2></div><p>The hunt grows through planned staking, vault openings, new clues and treasure placed back into the world.</p></div><div className="treasure-list">{treasures.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{description}</p></article>)}</div><p className="utility-note">Staking and reward assets are planned utility. Exact contracts, eligibility, availability and activation dates will be announced before use.</p></section>

      <section className="collection wrap"><div className="collection-heading"><div className="section-tag">06 / THE SEEKERS</div><h2>DIFFERENT FACES.<br /><em>DIFFERENT PATHS.</em></h2></div><div className="seeker-grid">{seekers.map((src, index) => <figure key={src}><img src={src} alt={`Seeker ${String(index + 1).padStart(4, "0")}`} /><figcaption><span>SEEKER</span><b>#{String(index + 1).padStart(4, "0")}</b></figcaption></figure>)}</div></section>

      <section className="final-call wrap"><img src="/seeker-coin.png" alt="Seeker coin" /><div><div className="section-tag">THE MAP IS OPEN</div><h2>THE TREASURE<br />IS ALREADY MOVING.</h2><a className="button gold" href={huntPostUrl} target="_blank" rel="noreferrer">Follow on X <span>↗</span></a></div></section>

      <footer className="wrap"><a className="brand" href="#top"><span className="brand-mark">✦</span><span>THE SEEKERS</span></a><p>WE ARE ALL SEEKING SOMETHING.</p><a href={huntPostUrl} target="_blank" rel="noreferrer">X / TWITTER</a></footer>
    </main>
  );
}
