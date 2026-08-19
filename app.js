const CONFIG = {
  bookingUrl: "https://blvd.app/@monti-institute-of-neuro-aesthetics/login",
  email: "admin@monti-institute.com",
  phoneDisplay: "(321) DR-MONTI",
  phoneFull: "(321) 376-6684",
  phoneHref: "tel:+13213766684",
  address: "2440 Vassar Street, Suite 3, Reno, NV 89502",
  city: "Reno, Nevada"
};

const nav = {
  care: [
    ["Neurological Medicine", "neurological-medicine.html", ["Migraine & Headache Care", "Neurological Evaluation", "Interventional Neurology", "Treatments"]],
    ["Aesthetic Medicine", "aesthetic-medicine.html", ["Facial Aesthetics", "Injectables", "Regenerative Aesthetics", "Energy-Based Treatments"]],
    ["Infusion Therapy", "infusion-therapy.html", ["Optimize", "Recover", "Restore", "Migraine Rescue"]]
  ],
  institute: [
    ["Our Approach", "the-institute.html"],
    ["Dr. Ryan Monti", "dr-monti.html"],
    ["Patient Experience", "patient-experience.html"],
    ["Visit the Institute", "contact.html"],
    ["Traveling to Monti", "traveling-to-monti.html"],
    ["Legacy / In Memoriam", "legacy-sara-zivich.html"]
  ],
  resources: [
    ["New Patients", "new-patients.html"],
    ["Insurance & Payment", "insurance-payment.html"],
    ["FAQs", "faqs.html"],
    ["Patient Portal", CONFIG.bookingUrl],
    ["Contact", "contact.html"]
  ]
};

const providers = [
  {
    slug: "ryan-monti-md",
    name: "Ryan Monti, MD",
    role: "Founder & Medical Director",
    credentials: "Board-Certified Internal Medicine · ACP · NBPAS · FAACM · Assoc. Prof. MCG",
    image: "assets/img/dr-monti.jpg",
    specialties: ["Migraine Medicine", "Medical Aesthetics", "Interventional Neurology"],
    profile: "Dr. Ryan Monti is the founder and medical director of Monti Institute of Neuro Aesthetics. His clinical identity is defined by academic-level neurological medicine and a refined approach to aesthetic care.",
    approach: "Dr. Monti practices with restraint: recalibrating neurological plans when they stop working, treating the face as integrated anatomy, and knowing when not to intervene.",
    background: ["ABIM Board-Certified Internal Medicine, 2017", "Fellow, American Academy of Cosmetic Medicine", "Associate Professor, Medical College of Georgia", "Active medical licenses listed by the current site in Nevada, Georgia, Alaska, Tennessee, Indiana, Arizona, Oregon, and Idaho"],
    services: ["Migraine Medicine", "Medical Aesthetics", "Interventional Neurology"]
  },
  {
    slug: "zack-ballingham",
    name: "Zack Ballingham",
    role: "Advanced Practice Provider",
    credentials: "APRN, FNP-BC · Board-Certified Family Nurse Practitioner",
    image: "assets/img/zack-ballingham.jpeg",
    specialties: ["Acute & Hospital Medicine", "Complex Medical Conditions", "Family Medicine"],
    profile: "Zack Ballingham is a board-certified Family Nurse Practitioner with more than 15 years of experience in acute care and hospital medicine.",
    approach: "His background in clinical decision-making and multidisciplinary collaboration supports Monti's longitudinal, physician-supervised model.",
    background: ["Native Nevadan", "University of Nevada, Reno graduate", "More than 15 years of acute care and hospital medicine experience"],
    services: ["Neurological care support", "Complex medical history review"]
  },
  {
    slug: "sean-kump",
    name: "Sean Kump",
    role: "Physician Associate",
    credentials: "PA-C",
    image: "assets/img/sean-kump.jpg",
    specialties: ["Migraine Therapeutics", "Interventional Headache", "Neuro-Diagnostic"],
    profile: "Sean Kump brings focused expertise in migraine therapeutics and interventional headache medicine.",
    approach: "He supports neurological patients with careful attention, continuity, and physician-supervised standards.",
    background: ["Concentrated subspecialty experience in migraine therapeutics and interventional headache medicine"],
    services: ["Migraine therapeutics", "Interventional headache care", "Neuro-diagnostic support"]
  },
  {
    slug: "morgan-melton",
    name: "Morgan Melton",
    role: "Founding Injector & Master Trainer",
    credentials: "MSN, APRN, CPNP-PC · FAACM",
    image: "assets/img/Morgan Melton Profile Photo.jpg",
    specialties: ["Advanced Injectables", "Laser-Based Skin Rejuvenation", "Facial Structural Refinement"],
    profile: "Morgan Melton is described on the current site as a board-certified nurse practitioner with over 11 years of clinical experience.",
    approach: "Her approach is distinguished by anatomical attentiveness, facial structural refinement, and clinical restraint.",
    background: ["Over 11 years of clinical experience", "Advanced injectables", "Laser-based skin rejuvenation"],
    services: ["Injectables", "Laser-based skin rejuvenation", "Facial structural refinement"]
  },
  {
    slug: "megan-phares",
    name: "Megan Phares",
    role: "Director of Operations",
    credentials: "RN · Operations & Clinical Leadership",
    image: "assets/img/megan-phares.jpeg",
    specialties: ["Clinical Operations", "Care Coordination", "Patient Experience"],
    profile: "Megan Phares leads the operational and clinical infrastructure of the Institute.",
    approach: "She coordinates the patient experience from initial inquiry through long-term follow-up.",
    background: ["Registered nurse", "Healthcare administration and care coordination"],
    services: ["Patient coordination", "Clinical operations"]
  },
  {
    slug: "addison-jensen",
    name: "Addison Jensen",
    role: "Aesthetic RN",
    credentials: "RN · Critical Care · 8+ Years Clinical Experience",
    image: "assets/img/addison-jensen.jpg",
    specialties: ["Facial Rejuvenation", "Precision Injectables", "Skin Health"],
    profile: "Addison Jensen brings more than eight years in critical care to aesthetic nursing.",
    approach: "She pairs precision injectable technique with a refined understanding of facial anatomy and skin health.",
    background: ["More than eight years in critical care", "Aesthetic nurse injector"],
    services: ["Facial rejuvenation", "Precision injectables", "Skin health"]
  },
  {
    slug: "ty-petty",
    name: "Ty Petty",
    role: "Aesthetic Nurse",
    credentials: "BSN, RN, CCRN · 13 Years Clinical Experience",
    image: "assets/img/ty-petty.jpg",
    specialties: ["Injectable Therapy", "Critical Care", "Patient Safety"],
    profile: "Ty Petty brings over 13 years of healthcare experience, including EMS and critical care nursing, to aesthetic medicine.",
    approach: "His work emphasizes precision, attention to detail, patient safety, and natural-looking results.",
    background: ["Five years in EMS", "Eight years as a Critical Care RN", "BSN, RN, CCRN"],
    services: ["Injectable therapy", "Personalized aesthetic treatment planning"]
  },
  {
    slug: "sydney-stansell",
    name: "Sydney Stansell",
    role: "Aesthetic Nurse",
    credentials: "BSN, RN, AACM-CI · DNP-FNP Candidate",
    image: "assets/img/sydney-stansell.jpg",
    specialties: ["Injectable Therapy", "Critical Care", "Customized Treatment Plans"],
    profile: "Sydney Stansell brings nearly nine years of healthcare experience across EMT work, critical care, post-operative orthopedic care, and hospice.",
    approach: "She specializes in customized treatment plans that enhance natural beauty while supporting balanced, refreshed outcomes.",
    background: ["Nearly nine years of healthcare experience", "DNP-FNP candidate", "BSN, RN, AACM-CI"],
    services: ["Injectable therapy", "Customized aesthetic treatment planning"]
  }
];

const neuroServices = [
  ["Chronic Migraine", "Care for eligible chronic migraine patients, including documentation of diagnosis, prior treatment response, and treatment planning."],
  ["Episodic Migraine", "Evaluation and prevention planning for episodic migraine presentations."],
  ["Headache Disorders", "Cluster headache, tension headache, post-traumatic headache, and complex headache patterns."],
  ["Neurological Pain", "Neuralgia, facial pain, occipital pain, and related neurological pain concerns."],
  ["Botox for Chronic Migraine", "OnabotulinumtoxinA for eligible chronic migraine patients where clinically indicated."],
  ["CGRP Therapies", "CGRP pathway therapies coordinated for eligible migraine patients through individualized evaluation."],
  ["Nerve Blocks & Trigger Points", "Occipital nerve blocks and trigger point injections where clinically appropriate."],
  ["Infusion Rescue", "Provider-directed acute migraine rescue infusion support when clinically appropriate."]
];

const aestheticServices = [
  ["Facial Balance", "Anatomical assessment and facial structural refinement."],
  ["Injectables", "Neuromodulator and injectable treatment planning within a physician-led framework."],
  ["Regenerative Aesthetics", "Regenerative and cellular approaches as part of long-horizon aesthetic planning."],
  ["Energy-Based Treatments", "Laser-based skin rejuvenation and energy-based treatment categories referenced by current content."],
  ["Skin Quality", "Clinical skincare support through authorized partner dispensaries and treatment planning."]
];

const infusionFramework = [
  ["Optimize", "Wellness, performance, immune resilience, metabolism, and aesthetic support."],
  ["Recover", "Migraine rescue, hydration, acute recovery, post-exertion support, and symptom relief."],
  ["Restore", "Neurological health, longevity-oriented care, mitochondrial support, and restorative protocols."]
];

function mark(name, cls = "") {
  return `<span class="icon-mark ${cls}" aria-hidden="true"><img src="assets/img/official-logo.png" alt=""></span>`;
}

function mediaSlot(kind, label, img = "") {
  const image = img ? `<img src="${img}" alt="${label}" loading="lazy">` : "";
  return `<figure class="media-slot ${kind}" aria-label="${label}">${image}<span>${mark("", "icon-mark--ghost")}</span></figure>`;
}

function shell(content) {
  return `${utility()}${header()}<main id="main">${content}</main>${footer()}${conciergeModal()}`;
}

function utility() {
  return `<div class="utility"><div class="wrap utility__inner"><span>${CONFIG.city}</span><nav aria-label="Patient utility"><a href="${CONFIG.bookingUrl}">Patient Portal</a><a href="${CONFIG.phoneHref}">Call ${CONFIG.phoneDisplay}</a></nav></div></div>`;
}

function header() {
  return `<header class="site-header">
    <div class="wrap header__inner">
      <a class="brand" href="index.html" aria-label="Monti Institute home">${mark()}<span><strong>Monti Institute</strong><small>of Neuro Aesthetics</small></span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span><b>Menu</b></button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
        ${menuGroup("Care", nav.care)}
        ${menuGroup("The Institute", nav.institute)}
        <a href="providers.html">Providers</a>
        <a href="shop.html">Shop</a>
        ${menuGroup("Patient Resources", nav.resources)}
      </nav>
      <a class="schedule" href="${CONFIG.bookingUrl}">Schedule</a>
    </div>
  </header>`;
}

function menuGroup(label, items) {
  const grouped = {
    "The Institute": [
      ["The Institute", items.slice(0, 3)],
      ["Visit", items.slice(3, 5)],
      ["Legacy", items.slice(5)]
    ],
    "Patient Resources": [
      ["Patient Resources", items]
    ]
  }[label];
  const content = grouped
    ? grouped.map(([groupLabel, groupItems]) => `<div class="mega-menu__group"><p>${groupLabel}</p>${groupItems.map(([title, href]) => `<a href="${href}">${title}</a>`).join("")}</div>`).join("")
    : items.map(([title, href, children]) => `<a href="${href}"><strong>${title}</strong>${children ? `<span>${children.join(" · ")}</span>` : ""}</a>`).join("");
  return `<div class="nav-group nav-group--${label.toLowerCase().replace(/[^a-z]+/g, "-")}"><button type="button" aria-expanded="false">${label}</button><div class="mega-menu">${content}</div></div>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap footer__grid">
    <div><a class="brand brand--footer" href="index.html">${mark()}<span><strong>Monti Institute</strong><small>of Neuro Aesthetics</small></span></a><p>Physician-led neurological medicine, aesthetic medicine, and infusion therapy under one clinical philosophy in Reno, Nevada.</p></div>
    <div><h2>Care</h2><a href="neurological-medicine.html">Neurology</a><a href="aesthetic-medicine.html">Aesthetics</a><a href="infusion-therapy.html">Infusion</a></div>
    <div><h2>The Institute</h2><a href="the-institute.html">Approach</a><a href="dr-monti.html">Dr. Monti</a><a href="providers.html">Providers</a><a href="contact.html">Visit</a></div>
    <div><h2>Patient</h2><a href="${CONFIG.bookingUrl}">Patient Portal</a><a href="insurance-payment.html">Insurance & Payment</a><a href="faqs.html">FAQs</a><a href="contact.html">Contact</a></div>
    <div><h2>Contact</h2><p>${CONFIG.address}</p><a href="${CONFIG.phoneHref}">${CONFIG.phoneDisplay}</a><a href="mailto:${CONFIG.email}">${CONFIG.email}</a><a href="shop.html">Shop</a></div>
  </div><div class="wrap footer__bottom"><p>© 2026 Monti Institute of Neuro Aesthetics.</p><nav><a href="privacy-policy.html">Privacy Policy</a><a href="medical-disclaimer.html">Medical Disclaimer</a><a href="accessibility.html">Accessibility</a></nav></div></footer>`;
}

function pageHero(kicker, title, text, tone = "") {
  return `<section class="page-hero ${tone}"><div class="wrap page-hero__inner"><div><p class="kicker">${kicker}</p><h1>${title}</h1></div><p>${text}</p></div></section>`;
}

function home() {
  return `
  <section class="hero-home reveal" data-media="hero-media" data-video-ready="true">
    <div class="hero-home__video" aria-hidden="true"></div>
    <img class="hero-home__watermark" src="assets/img/official-logo.png" alt="">
    <div class="wrap hero-home__inner hero-home__layout">
      <div class="hero-home__copy"><p class="kicker">Physician-led institute · Reno, Nevada</p>
      <h1>Where neurology meets aesthetics. Care that is personal by design.</h1>
      <p class="hero-home__lead">Physician-led neurological and aesthetic medicine — designed to restore comfort, confidence, and natural vitality.</p>
      <p class="hero-home__sub">Specialized care for migraine, headache disorders, neurological pain, facial aesthetics, and regenerative medicine.</p>
      <div class="actions"><a class="button button--primary" href="${CONFIG.bookingUrl}">Schedule a Consultation</a><a class="button button--secondary" href="#care">Explore Our Services</a></div></div>
      <div class="hero-home__media">${mediaSlot("media-hero-interior","Monti Institute interior media slot","assets/img/Vassar.PNG")}</div>
    </div>
  </section>
  <section class="duality reveal" id="care"><div class="wrap"><div class="duality__intro"><p class="kicker kicker--center">Neurology × Aesthetics</p><h2>Two disciplines. One standard of care.</h2><p>Monti brings neurological medicine and physician-led aesthetics into one standard: anatomy, evidence, precision, and restraint.</p></div><div class="duality__split"><article class="duality-panel duality-panel--neuro">${mediaSlot("media-neurology","Neurological medicine media slot")}<div><p class="kicker">Neurology</p><h3>Migraine, headache, and neurological care.</h3><ul>${["Migraine & Headache","Neurological Pain","Diagnostic Neurology","Advanced Therapies"].map(li).join("")}</ul><a class="text-link" href="neurological-medicine.html">Explore Neurological Care</a></div></article><span class="duality__mark">${mark()}</span><article class="duality-panel duality-panel--aesthetic">${mediaSlot("media-aesthetics","Aesthetic medicine media slot")}<div><p class="kicker">Aesthetics</p><h3>Facial balance through physician-led restraint.</h3><ul>${["Facial Balance","Injectables","Regenerative Aesthetics","Energy-Based Treatments"].map(li).join("")}</ul><a class="text-link" href="aesthetic-medicine.html">Explore Aesthetic Medicine</a></div></article></div></div></section>
  <section class="approach reveal"><div class="wrap"><p class="kicker kicker--center">The Monti Approach</p><h2>Anatomy. Evidence. Precision. Restraint.</h2><div class="approach__grid">${approachItem("Anatomy","Deep understanding of structure and function guides every decision.")}${approachItem("Evidence","Treatments are rooted in science and documented indications.")}${approachItem("Precision","Advanced training, experience, and careful treatment planning.")}${approachItem("Restraint","Careful calibration and the confidence to know when less is more.")}</div></div></section>
  <section class="difference reveal"><div class="wrap difference__inner"><div><p class="kicker">The Monti Difference</p><h2>Precision over volume.</h2><p>Longer appointments, individualized planning, clinical continuity, and physician-led decisions keep care focused and considered.</p></div><div class="difference__list">${["Longer Appointments","Individualized Evaluation","Clinical Continuity","Physician-Led Decisions"].map((x,i)=>`<article><span>0${i+1}</span><h3>${x}</h3><p>${["Time to understand the full history, prior treatments, and what matters now.","Plans built from anatomy, clinical history, goals, and documented reasoning.","Follow-up that evaluates response and recalibrates care over time.","A smaller practice model centered on direct clinical oversight and restraint."][i]}</p></article>`).join("")}</div></div></section>
  <section class="founder founder-team reveal"><div class="wrap founder-team__grid"><div class="founder__media">${mediaSlot("media-founder","Dr. Ryan Monti portrait media slot","assets/img/dr-monti.jpg")}</div><div class="founder-team__bio"><p class="kicker">The Founder</p><h2>Ryan Monti, MD</h2><p>Founder and medical director of Monti Institute of Neuro Aesthetics, Dr. Monti bridges migraine medicine, interventional neurological care, and medical aesthetics through direct physician reasoning.</p><p class="credentials">Board-Certified Internal Medicine · ACP · NBPAS · FAACM · Assoc. Prof. MCG</p><a class="button button--primary" href="dr-monti.html">Meet Dr. Monti</a></div><aside class="founder-team__team"><p class="kicker">The Monti Team</p><h2>Meet the people behind your care.</h2><p>Meet the clinicians who bring the Monti approach to every area of care.</p>${teamMiniGrid(providers.slice(1,5))}<a class="text-link" href="providers.html">Meet the Full Team</a></aside></div></section>
  <section class="infusion-feature reveal"><div class="wrap">${mediaSlot("media-infusion","Infusion suite media slot")}<div class="infusion-feature__copy"><p class="kicker">Infusion Therapy</p><h2>Restore from within.</h2><p>Private, low-stimulation infusion therapy with physician oversight, clinical monitoring, and individualized protocols.</p><div class="infusion-tabs" role="tablist" aria-label="Infusion therapy categories">${infusionFramework.map(([t],i)=>`<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="infusion-panel" data-infusion-tab="${i}">${t}</button>`).join("")}</div><div class="infusion-panel" id="infusion-panel" role="tabpanel" aria-live="polite"><h3>${infusionFramework[0][0]}</h3><p>${infusionFramework[0][1]}</p></div><a class="text-link" href="infusion-therapy.html">Explore Infusion Therapy</a></div></div></section>
  <section class="experience reveal"><div class="wrap experience__grid"><div>${mediaSlot("media-patient-experience","Patient experience media slot")}</div><div><p class="kicker">The Experience</p><h2>Care should feel unhurried.</h2><p>Monti's current philosophy emphasizes longer appointments, individualized planning, continuity, thoughtful care, and a private clinical environment.</p><div class="experience__attributes"><span>Private</span><span>Considered</span><span>Unhurried</span><span>Individualized</span></div><a class="text-link text-link--light" href="the-institute.html">Visit the Institute</a></div></div></section>
  <section class="concierge-cta reveal"><div class="wrap"><p class="kicker">Digital Concierge</p><h2>Not sure where to begin?</h2><p>We'll help you find the right care pathway without replacing a clinical consultation.</p><button class="button button--primary" type="button" data-open-concierge>Find My Care Path</button></div></section>
  <section class="shop-preview reveal"><div class="wrap"><div class="shop-preview__intro"><p class="kicker">The Monti Edit</p><h2>Selected for continued care.</h2><p>Curated partner dispensaries that extend appropriate care beyond the Institute.</p><a class="button button--secondary" href="shop.html">Visit the Shop</a></div><div class="shop-preview__grid">${["Fullscript Dispensary","SkinCeuticals Dispensary","Home Protocols"].map((title,i)=>`<article>${mediaSlot("media-shop-product","Product media slot")}<h3>${title}</h3><p>${["Practitioner-grade supplements through the practice partner account.","Clinical skincare through an authorized physician account.","Recommended and adjusted as treatment plans evolve."][i]}</p></article>`).join("")}</div></div></section>
  <section class="access reveal"><div class="wrap"><p class="kicker">Patient Access</p><div class="access__grid">${[["Patient Portal","Boulevard scheduling and patient access.",CONFIG.bookingUrl],["Insurance & Payment","Neurology insurance, private-pay aesthetics, and financing details.", "insurance-payment.html"],["Financing","Cherry financing is referenced by current content.", "insurance-payment.html"],["Contact","Address, phone, email, parking, and scheduling.", "contact.html"]].map(([t,d,h])=>`<a href="${h}"><h3>${t}</h3><p>${d}</p></a>`).join("")}</div></div></section>
  ${finalCta()}
  `;
}

function approachItem(title, text) {
  const icon = { Anatomy: "M4 28c8-18 24-18 32 0M18 9v38M32 9v38", Evidence: "M18 8h20M28 8v38M20 46h16M15 20h26", Precision: "M28 5v46M5 28h46M14 28a14 14 0 1 0 28 0 14 14 0 0 0-28 0", Restraint: "M28 8v38M12 18h32M16 18l-7 18h14l-7-18M40 18l-7 18h14l-7-18" }[title];
  return `<article><svg viewBox="0 0 56 56" aria-hidden="true"><path d="${icon}"/></svg><h3>${title}</h3><p>${text}</p></article>`;
}

function li(text) { return `<li>${text}</li>`; }

function providerGrid(list) {
  return `<div class="provider-grid">${list.map(p => `<article class="provider-card"><a href="provider-${p.slug}.html">${mediaSlot("media-provider", `${p.name} portrait`, p.image)}<div><p class="kicker">${p.role}</p><h3>${p.name}</h3><p>${p.credentials}</p><span>View Profile</span></div></a></article>`).join("")}</div>`;
}

function teamMiniGrid(list) {
  return `<div class="team-mini-grid">${list.map(p => `<a href="provider-${p.slug}.html">${mediaSlot("media-provider", `${p.name} portrait`, p.image)}<span><strong>${p.name}</strong><small>${p.credentials}</small></span></a>`).join("")}</div>`;
}

function finalCta() {
  return `<section class="final-cta"><div class="wrap"><p class="kicker kicker--center">Begin</p><h2>Begin your care.</h2><a class="button button--primary" href="${CONFIG.bookingUrl}">Schedule a Consultation</a><div class="final-cta__links"><a href="neurological-medicine.html">Neurology</a><a href="aesthetic-medicine.html">Aesthetics</a><a href="infusion-therapy.html">Infusion</a><a href="${CONFIG.phoneHref}">Call ${CONFIG.phoneDisplay}</a></div></div></section>`;
}

function neuroPage() {
  return pageHero("Neurological Medicine", "Migraine, headache, and neurological care with continuity.", "Evaluation, treatment pathways, interventional care, and longitudinal planning for complex neurological concerns.") +
  section(`<div class="content-rail"><aside>${rail(["Who We Help","Conditions","Treatments","Process","Access"])}</aside><div>${block("Who We Help","Monti supports patients managing chronic migraine, episodic migraine, headache disorders, neuralgia, facial pain, neurological pain, and treatment-refractory symptoms.")}${listBlock("Conditions Treated", neuroServices.slice(0,4))}${listBlock("Treatment Pathways", neuroServices.slice(4))}${block("Patient Process","Care begins with a comprehensive evaluation of history, previous treatments, current symptoms, goals, and response patterns. Follow-up is used to recalibrate care over time.")}${providerGrid(providers.filter(p=>["ryan-monti-md","sean-kump","zack-ballingham"].includes(p.slug)))}${accessNote()}</div></div>`);
}

function aestheticsPage() {
  return pageHero("Aesthetic Medicine", "Physician-led aesthetics informed by anatomy and restraint.", "Aesthetic care organized by concern and treatment, with natural outcomes and individualized planning at the center.") +
  section(`<div class="split-content"><div><p class="kicker">By Concern</p>${listBlock("Concerns", [["Facial Balance","Structural assessment and facial proportion."],["Expression Lines","Neuromodulator planning when appropriate."],["Volume Change","Conservative injectable planning."],["Skin Quality","Clinical skincare and texture-focused support."],["Regeneration","Regenerative and cellular aesthetic planning."]])}</div><div><p class="kicker">By Treatment</p>${listBlock("Treatments", aestheticServices)}</div></div>${providerGrid(providers.filter(p=>["ryan-monti-md","morgan-melton","addison-jensen","ty-petty","sydney-stansell"].includes(p.slug)))}`);
}

function infusionPage() {
  return pageHero("Infusion Therapy", "Private infusion care for optimize, recover, restore, and migraine rescue pathways.", "A low-stimulation clinical experience with provider assessment, monitoring, and individualized protocols.") +
  section(`${mediaSlot("media-infusion","Infusion suite media slot")}<div class="inline-list inline-list--large">${infusionFramework.map(([t,d])=>`<article><h2>${t}</h2><p>${d}</p></article>`).join("")}</div>${block("Migraine Rescue","The current site describes Acute Migraine Rescue Infusion as a provider-directed clinical program in a low-stimulus environment. Detailed ingredients and add-ons are preserved deeper for clinical review and consultation context.")}${block("Dedication","The Monti Institute Infusion Suite is dedicated to the memory of Sara Zivich.")}<a class="text-link" href="legacy-sara-zivich.html">Read the full legacy note</a>`);
}

function institutePage() {
  return pageHero("The Institute", "A different kind of private medical practice.", "Neurological medicine and aesthetic care practiced together within a single physician-led standard.") +
  section(`${block("Why Monti Exists","Monti was founded for patients who want more than a rushed appointment and a standard answer. The practice is intentionally small, with longer appointments, considered follow-up, and physician continuity.")}${block("Neurology and Aesthetics, Seen Together","How patients experience energy, pain, confidence, and sense of self is connected. Every consultation begins with what matters most and what would improve quality of life.")}${listBlock("Operating Principles",[["Precision","Details guide care."],["Evidence","Recommendations require a clinical rationale."],["Restraint","Knowing when not to intervene matters."],["Continuity","Plans evolve with response over time."]])}`);
}

function drMontiPage() {
  const p = providers[0];
  return pageHero("Dr. Ryan Monti", "Founder and Medical Director.", "A profile of Dr. Monti's philosophy, expertise, credentials, and professional background.") + providerProfile(p);
}

function providersPage() {
  return pageHero("Providers", "Your Care Team.", "Verified provider details from current Monti content, organized for discovery and scheduling.") + section(providerGrid(providers));
}

function providerProfile(p) {
  return section(`<div class="profile-layout">${mediaSlot("media-provider", `${p.name} portrait`, p.image)}<div><p class="kicker">${p.role}</p><h2>${p.name}</h2><p class="credentials">${p.credentials}</p><p>${p.profile}</p><h3>Approach</h3><p>${p.approach}</p><h3>Areas of Expertise</h3><ul>${p.specialties.map(li).join("")}</ul><h3>Professional Background</h3><ul>${p.background.map(li).join("")}</ul><a class="button button--primary" href="${CONFIG.bookingUrl}">Schedule with ${p.name.split(",")[0]}</a></div></div>`);
}

function shopPage() {
  return pageHero("Shop", "The Monti Edit.", "Physician-selected wellness and skincare access through verified partner dispensaries.") +
  section(`<div class="shop-preview__grid">${[["Fullscript Dispensary","Practitioner-grade supplements, prescribed and dispensed directly through the practice partner account."],["SkinCeuticals Dispensary","Science-backed topical therapeutics through an authorized physician account."],["Home Protocols","Product recommendations are part of care planning and can evolve during follow-up."]].map(([t,d])=>`<article>${mediaSlot("media-shop-product",`${t} media slot`)}<h2>${t}</h2><p>${d}</p></article>`).join("")}</div>${block("Clinical Disclosure","Products available through partner accounts are curated for patient convenience. Individual protocols should be discussed with Dr. Monti or a licensed member of the clinical team, especially during pregnancy, nursing, chronic illness, or prescription medication use.")}`);
}

function resourcesPage() {
  return pageHero("Patient Resources", "Practical access for patients.", "Scheduling, insurance, payment, FAQs, portal access, and contact information.") +
  section(`<div class="resource-hub">${nav.resources.map(([t,h])=>`<a href="${h}"><h2>${t}</h2><p>Open ${t.toLowerCase()} information.</p></a>`).join("")}</div>`);
}

function newPatientsPage() {
  return pageHero("New Patients", "What to expect.", "Clear first steps for consultation and care at Monti Institute.") + section(`${block("Scheduling","New patient consultations are scheduled by appointment. Inquiries are reviewed by the care team for appropriate next steps.")}${block("Your First Visit","The first visit is an extended consultation to review full history, previous treatments, current symptoms, and what has or has not worked.")}${block("Preparation","Use the patient portal and team instructions for intake forms and appointment preparation where applicable.")}`);
}

function insurancePage() {
  return pageHero("Insurance & Payment", "Coverage, private pay, and financing.", "Practical payment information without guaranteeing coverage.") + section(`${block("Insurance","Insurance is accepted for neurological services, with verification available on request prior to the first visit. Coverage is not guaranteed.")}${block("Aesthetic Care","Aesthetic care is private-pay.")}${block("Cherry Financing","Cherry patient financing is available where applicable. Terms and availability are reviewed through Cherry.")}`);
}

function faqsPage() {
  return pageHero("FAQs", "Common questions.", "Answers based on verified current Monti content.") + section(`<div class="faq-list">${faq("How do I schedule?","Use Boulevard self-booking or contact the team by phone or email.")}${faq("Where is Monti Institute?","Monti Institute is located at 2440 Vassar Street, Suite 3, Reno, NV 89502.")}${faq("Is insurance accepted?","Current content states insurance is accepted for neurological services; aesthetic care is private-pay. Coverage is not guaranteed.")}${faq("Is the website medical advice?","No. Website content is informational and does not establish a provider-patient relationship.")}</div>`);
}

function travelPage() {
  return pageHero("Traveling to Monti", "Planning a visit to Reno.", "Information for regional and traveling patients, organized away from the main Contact page.") + section(`${mediaSlot("media-interior","Institute interior media slot")}<div class="inline-list">${[["Regional Access","The current site references Reno, Sparks, Carson City, Fernley, Lake Tahoe, Northern Nevada, and the Western United States."],["Scheduling Considerations","Multi-appointment blocks may support patients combining neurological, aesthetic, or infusion care."],["Parking & Arrival","Current content references in-office appointments at Vassar Street and convenient on-site parking."],["Transportation","Current content references private transportation options and Uber Black / Lyft Premium availability in the greater Reno metro area."]].map(([t,d])=>`<article><h3>${t}</h3><p>${d}</p></article>`).join("")}</div>`);
}

function contactPage() {
  return pageHero("Contact", "Reach the Monti Institute team.", "Simple access to scheduling, phone, email, address, map, and general inquiries.") +
  section(`<div class="contact-layout"><div><h2>${CONFIG.address}</h2><p><a href="${CONFIG.phoneHref}">${CONFIG.phoneDisplay} / ${CONFIG.phoneFull}</a><br><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p><p>Appointments are scheduled in advance. Saturday appointments may be available by appointment only.</p><a class="button button--primary" href="${CONFIG.bookingUrl}">Schedule</a></div>${mediaSlot("media-interior","Monti Institute location","assets/img/Vassar.PNG")}</div><form class="contact-form" action="mailto:${CONFIG.email}" method="post" enctype="text/plain"><label>Name<input required name="name"></label><label>Email<input required type="email" name="email"></label><label>Inquiry Type<select name="type"><option>Neurological Consultation</option><option>Aesthetic Consultation</option><option>Infusion Therapy</option><option>Other</option></select></label><label>Message<textarea name="message" rows="5"></textarea></label><p>Do not include sensitive medical details in this form. Use the secure portal for clinical communication once established as a patient.</p><button class="button button--primary" type="submit">Send Inquiry</button></form>`);
}

function legacyPage() {
  return pageHero("Legacy / In Memoriam", "In memory of Sara Zivich.", "A respectful preservation area for the Infusion Center dedication.") + section(`${block("Infusion Suite Dedication","The Monti Institute Infusion Suite is dedicated to the memory of Sara Zivich.")}${block("A Lasting Presence","This page preserves space for the Institute's full memorial and dedication content in a calm, respectful setting.")}`);
}

function patientExperiencePage() {
  return pageHero("Patient Experience", "Care should feel unhurried.", "Longer appointments, individualized planning, continuity, private environment, and thoughtful treatment decisions.") + section(`${mediaSlot("media-patient-experience","Patient experience media slot")}${block("What It Feels Like","The current site describes care as an unhurried conversation with a physician who is genuinely paying attention.")}${listBlock("Experience Principles",[["Longer appointments","Time to review full history and current goals."],["Individualized planning","Plans built from the patient rather than a generic pathway."],["Continuity","Follow-up evaluates what changed and what needs recalibration."],["Private environment","A clinical environment designed around attention and comfort."]])}`);
}

function legalPage(type) {
  if (type === "privacy") return pageHero("Privacy Policy", "Privacy and communication practices.", "How Monti Institute describes website inquiries, SMS consent, data rights, secure portal use, data retention, and contact information.") + section(block("Policy Summary","This page summarizes privacy and communication practices for website visitors, prospective patients, and established patients using secure clinical systems."));
  if (type === "accessibility") return pageHero("Accessibility", "Accessibility statement.", "Monti Institute aims to provide an accessible website experience.") + section(block("Accessibility Features","The current site references responsive design, readable navigation, keyboard access, reduced visual strain options, and contact channels for accessibility issues."));
  return pageHero("Medical Disclaimer", "Important medical and legal information.", "Website content is informational and does not establish a provider-patient relationship.") + section(`${block("Purpose & Scope","Website content is for general informational purposes only and is not medical advice, diagnosis, or a treatment recommendation.")}${block("No Provider-Patient Relationship","Browsing, submitting a form, or requesting consultation does not itself establish a provider-patient relationship.")}${block("Emergency Notice","This website is not monitored for emergencies. In a medical emergency, call 911 or go to the nearest emergency room.")}`);
}

function section(content, cls = "") { return `<section class="section ${cls}"><div class="wrap">${content}</div></section>`; }
function block(title, text) { return `<article class="copy-block"><h2>${title}</h2><p>${text}</p></article>`; }
function listBlock(title, items) { return `<article class="copy-block"><h2>${title}</h2><div class="detail-list">${items.map(([t,d])=>`<div><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></article>`; }
function rail(items) { return items.map(i=>`<a href="#">${i}</a>`).join(""); }
function accessNote() { return block("Insurance & Access", "Insurance is accepted for neurological services, with verification available on request. Coverage is not guaranteed."); }
function faq(q,a) { return `<details><summary>${q}</summary><p>${a}</p></details>`; }

function conciergeModal() {
  return `<dialog class="concierge-modal"><form method="dialog"><button class="modal-close" aria-label="Close">×</button><div class="concierge-progress"><span>Step 1 of 2</span><b></b></div><p class="kicker">Digital Concierge</p><h2>Find the right starting point.</h2><p class="concierge-copy">This guide supports navigation and does not provide medical triage.</p><div class="concierge-options">${[["Neurological Medicine","Migraine, headache, or neurological pain."],["Aesthetic Medicine","Facial balance, skin quality, or injectables."],["Infusion Therapy","Hydration, recovery, restore, or migraine rescue."],["Integrated Care","Exploring more than one pathway."]].map(([t,d])=>`<button type="button" data-path="${t}"><strong>${t}</strong><span>${d}</span></button>`).join("")}</div><div class="concierge-actions"><button class="button button--secondary" value="cancel">Back</button><a class="button button--primary concierge-result" href="${CONFIG.bookingUrl}" aria-live="polite">Continue</a></div></form></dialog>`;
}

const pages = {
  home,
  neurology: neuroPage,
  aesthetics: aestheticsPage,
  infusion: infusionPage,
  institute: institutePage,
  "dr-monti": drMontiPage,
  providers: providersPage,
  shop: shopPage,
  resources: resourcesPage,
  "new-patients": newPatientsPage,
  "insurance-payment": insurancePage,
  faqs: faqsPage,
  "traveling-to-monti": travelPage,
  contact: contactPage,
  "legacy-sara-zivich": legacyPage,
  "patient-experience": patientExperiencePage,
  "privacy-policy": () => legalPage("privacy"),
  accessibility: () => legalPage("accessibility"),
  disclaimer: () => legalPage("disclaimer")
};

for (const p of providers) pages[`provider-${p.slug}`] = () => pageHero(p.role, p.name, p.credentials) + providerProfile(p);

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "home";
  document.getElementById("site-shell").innerHTML = shell((pages[page] || home)());
  const header = document.querySelector(".site-header");
  const setHeaderState = () => document.body.classList.toggle("is-scrolled", window.scrollY > 18);
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
  const menu = document.querySelector(".menu-toggle");
  menu?.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav-group > button").forEach(button => {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      document.querySelectorAll(".nav-group > button").forEach(b => b.setAttribute("aria-expanded", "false"));
      button.setAttribute("aria-expanded", String(open));
    });
  });
  document.querySelector("[data-open-concierge]")?.addEventListener("click", () => document.querySelector(".concierge-modal")?.showModal());
  const infusionDescriptions = infusionFramework;
  const infusionPanel = document.querySelector(".infusion-panel");
  document.querySelectorAll("[data-infusion-tab]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.infusionTab);
      document.querySelectorAll("[data-infusion-tab]").forEach(tab => tab.setAttribute("aria-selected", String(tab === button)));
      if (infusionPanel) infusionPanel.innerHTML = `<h3>${infusionDescriptions[index][0]}</h3><p>${infusionDescriptions[index][1]}</p>`;
    });
  });
  const revealItems = document.querySelectorAll(".reveal, .approach__grid article, .provider-card, .shop-preview article");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.14 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }
  document.querySelectorAll("[data-path]").forEach(button => {
    button.addEventListener("click", () => {
      const text = button.dataset.path;
      const result = document.querySelector(".concierge-result");
      if (result) result.textContent = `${text}: Continue to scheduling`;
      document.querySelector(".concierge-progress span").textContent = "Step 2 of 2";
    });
  });
});
