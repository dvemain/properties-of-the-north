import { useState } from "react";
import { contact, org } from "../data/content.js";

const encode = (d) => Object.keys(d).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(d[k])).join("&");
const blank = { name: "", email: "", phone: "", service: contact.services[0], message: "" };

export default function ContactForm() {
  const [v, setV] = useState(blank);
  const [status, setStatus] = useState("idle");
  const on = (e) => setV((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try {
      const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode({ "form-name": "estimate", ...v }) });
      if (!r.ok) throw new Error(r.status);
      setStatus("sent"); setV(blank);
    } catch { setStatus("error"); }
  };

  if (status === "sent") {
    return <div className="cf cf-done" role="status"><strong>Thank you!</strong><p>We got your request and will reach out shortly to set up your free estimate.</p></div>;
  }

  return (
    <form className="cf" name="estimate" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
      <input type="hidden" name="form-name" value="estimate" />
      <p className="cf-hp" aria-hidden="true"><label>Leave blank: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <label htmlFor="f-name">Name<input id="f-name" name="name" required value={v.name} onChange={on} autoComplete="name" /></label>
      <div className="cf-row">
        <label htmlFor="f-email">Email<input id="f-email" name="email" type="email" required value={v.email} onChange={on} autoComplete="email" /></label>
        <label htmlFor="f-phone">Phone<input id="f-phone" name="phone" type="tel" required value={v.phone} onChange={on} autoComplete="tel" /></label>
      </div>
      <label htmlFor="f-service">What do you need help with?
        <select id="f-service" name="service" value={v.service} onChange={on}>{contact.services.map((s) => <option key={s}>{s}</option>)}</select>
      </label>
      <label htmlFor="f-message">Tell us about your property<textarea id="f-message" name="message" rows={5} required value={v.message} onChange={on} /></label>
      {status === "error" && <p className="cf-err" role="alert">Something went wrong. Please try again or call <a href={org.phoneHref}>{org.phone}</a>.</p>}
      <button type="submit" className="btn btn-green" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a Free Estimate"}</button>
    </form>
  );
}
