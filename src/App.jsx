import { useEffect, useState } from "react";
import { org, nav, about, quote, services, contact, footer } from "./data/content.js";
import ContactForm from "./components/ContactForm.jsx";

const img = (k) => `/img/${k}.${k === "logo" ? "png" : "jpg"}`;

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <a href={org.phoneHref}>{org.phoneDisplay}</a><span className="sep">|</span>
          <span>{org.hours}</span><span className="sep">|</span>
          <span>{org.city}</span>
        </div>
      </div>
      <header className={"site" + (solid ? " is-solid" : "")}>
        <div className="wrap">
          <button type="button" className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
          <a href="#top" className="brand" aria-label={`${org.name} home`}>
            <img src={img("logo")} alt="" width="56" height="56" />
            <span>{org.name}</span>
          </a>
          <nav className="primary" aria-label="Primary">
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <a href="#contact" className="btn btn-green hdr-cta">Free Estimate</a>
        </div>
        {open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}
        <nav className={"menu-panel" + (open ? " is-open" : "")} aria-label="Mobile" aria-hidden={!open}>
          {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
          <a href={org.phoneHref} className="btn btn-green">Call {org.phone}</a>
        </nav>
      </header>
    </>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">
        <section id="top" className="hero">
          <img className="hero-bg" src={img("hero")} alt="" fetchPriority="high" />
          <div className="wrap hero-inner">
            <img className="hero-logo" src={img("logo")} alt="" width="200" height="200" />
            <p className="eyebrow light">{org.tagline}</p>
            <h1>{org.heroTitle}</h1>
            <p className="lede">Landscape design, property maintenance, patios, ponds and snow removal — serving Lake Leelanau and surrounding Northern Michigan since 2020.</p>
            <div className="ctas">
              <a href={org.phoneHref} className="btn btn-green">Call {org.phone}</a>
              <a href="#contact" className="btn btn-ghost">Free Estimate</a>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="wrap about-grid">
            <div className="about-copy">
              <p className="eyebrow">{about.eyebrow}</p>
              <h2>{about.title}</h2>
              <p>{about.p1}</p>
              <p>{about.p2}</p>
              <p className="strong">{about.p3}</p>
              <a href="#services" className="btn btn-navy">Learn More</a>
            </div>
            <ul className="about-gallery" id="gallery" aria-label="Recent work">
              {about.gallery.map((g) => <li key={g.img}><img src={img(g.img)} alt={g.alt} loading="lazy" /></li>)}
            </ul>
          </div>
        </section>

        <section className="quote-band">
          <div className="wrap">
            <h2>{quote.title}</h2>
            <p>{quote.body}</p>
            <p className="strong">{quote.sub}</p>
            <div className="ctas">
              <a href="#contact" className="btn btn-green">Contact Us!</a>
              <a href={org.phoneHref} className="btn btn-outline-light">{org.phoneDisplay}</a>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="wrap">
            <p className="eyebrow">What we do</p>
            <h2>{services.title}</h2>
            <p className="lede">{services.lede}</p>
            <p className="sub">{services.sub}</p>
            <ul className="svc-grid">
              {services.items.map((s) => (
                <li key={s.id} id={s.id} className="svc">
                  <img src={img(s.img)} alt="" loading="lazy" />
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <a href="#contact" className="text-link">Learn More →</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap contact-grid">
            <div className="contact-info">
              <p className="eyebrow">Get in touch</p>
              <h2>{contact.title}</h2>
              <dl>
                <dt>Email</dt><dd><a href={`mailto:${org.email}`}>{org.email}</a></dd>
                <dt>Phone</dt><dd><a href={org.phoneHref}>{org.phone}</a></dd>
                <dt>Address</dt><dd><a href={org.mapsHref} target="_blank" rel="noopener">{org.address}</a></dd>
                <dt>Assistance Hours</dt><dd>{org.hoursLong.map((h) => <span key={h}>{h}<br /></span>)}</dd>
              </dl>
              <a href={org.mapsHref} target="_blank" rel="noopener" className="map">
                <img src={img("map")} alt="Map showing 111 N Sylt Rd, Lake Leelanau, MI 49653" loading="lazy" />
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="wrap foot-grid">
          <div>
            <img src={img("logo")} alt={org.name} width="120" height="120" className="foot-logo" />
            <p>{footer.blurb}</p>
            <p className="strong">{footer.cta}</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>{nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h4>Contact Info</h4>
            <ul>
              <li>Email : <a href={`mailto:${org.email}`}>{org.email}</a></li>
              <li>Phone : <a href={org.phoneHref}>{org.phone}</a></li>
              <li>Address : {org.address}</li>
            </ul>
            <a href="#contact" className="btn btn-green">Free Estimate!</a>
          </div>
        </div>
        <div className="wrap foot-base">{new Date().getFullYear()} © All rights reserved · Made with ❤ by DVE Media</div>
      </footer>
    </>
  );
}
