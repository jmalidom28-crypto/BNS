(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  let language = "en";
  const today = new Date();
  const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  $("visit").value = iso(today);

  $("langBtn").addEventListener("click", () => {
    language = language === "en" ? "fil" : "en";
    document.documentElement.lang = language === "fil" ? "fil" : "en";
    document.querySelectorAll("[data-en][data-fil]").forEach(el => {
      el.textContent = el.dataset[language];
    });
    $("langBtn").textContent = language === "en" ? "Filipino" : "English";
  });

  function completedMonths(birth, visit) {
    let months = (visit.getFullYear() - birth.getFullYear()) * 12 + (visit.getMonth() - birth.getMonth());
    if (visit.getDate() < birth.getDate()) months--;
    return months;
  }
  function showError(message) {
    $("error").textContent = message;
    $("error").classList.add("visible");
  }
  $("calculate").addEventListener("click", () => {
    $("error").classList.remove("visible");
    const bval = $("birth").value, vval = $("visit").value;
    const w = Number($("weight").value), h = Number($("height").value);
    if (!bval || !vval || !$("weight").value || !$("height").value) {
      showError(language === "fil" ? "Pakilagay ang lahat ng kinakailangang impormasyon." : "Please complete all required fields.");
      return;
    }
    const birth = new Date(bval + "T12:00:00"), visit = new Date(vval + "T12:00:00");
    if (visit < birth) {
      showError(language === "fil" ? "Hindi maaaring mas maaga sa kapanganakan ang petsa ng monitoring." : "Monitoring date cannot be earlier than birthdate.");
      return;
    }
    if (visit.getTime() - birth.getTime() >= 5 * 366 * 86400000) {
      showError(language === "fil" ? "Para lamang ito sa mga batang wala pang limang taong gulang." : "This prototype is intended for children under five years old.");
      return;
    }
    if (w < 0.5 || w > 40 || h < 30 || h > 130 || !Number.isFinite(w) || !Number.isFinite(h)) {
      showError(language === "fil" ? "Suriin ang timbang at haba/taas at tiyaking tama ang mga unit." : "Check the weight and length/height values and make sure the units are correct.");
      return;
    }
    const ageDays = Math.floor((visit - birth) / 86400000);
    const months = completedMonths(birth, visit);
    const ageText = language === "fil"
      ? `Edad: ${months} buwang gulang (${ageDays} araw)`
      : `Age: ${months} completed month(s) (${ageDays} days)`;
    $("ageResult").textContent = ageText;
    const expected = ageDays < 730 ? "lying" : "standing";
    let method = $("method").value;
    if (method === "auto") method = expected;
    let adjustedHeight = h;
    if (expected === "lying" && method === "standing") adjustedHeight += 0.7;
    if (expected === "standing" && method === "lying") adjustedHeight -= 0.7;
    $("methodResult").textContent = language === "fil"
      ? `Paraan: ${method === "lying" ? "nakahiga" : "nakatayo"}. Inayos na haba/taas para sa pamantayan: ${adjustedHeight.toFixed(1)} cm.`
      : `Method: ${method === "lying" ? "lying down" : "standing"}. Adjusted length/height for age convention: ${adjustedHeight.toFixed(1)} cm.`;
    const pending = language === "fil"
      ? "Hindi pa available — kailangang idagdag at beripikahin ang opisyal na reference data."
      : "Not available yet — official reference data must be integrated and validated.";
    $("wfaResult").textContent = pending;
    $("wfhResult").textContent = pending;
    $("hfaResult").textContent = pending;
    $("wfhTitle").textContent = ageDays < 730 ? "Weight-for-Length (WFL) / Timbang-ayon-sa-Haba" : "Weight-for-Height (WFH) / Timbang-ayon-sa-Taas";
    $("hfaTitle").textContent = ageDays < 730 ? "Length-for-Age (LFA) / Haba-ayon-sa-Edad" : "Height-for-Age (HFA) / Taas-ayon-sa-Edad";
    $("results").classList.add("visible");
    $("results").scrollIntoView({behavior:"smooth", block:"start"});
  });
  $("clear").addEventListener("click", () => {
    $("birth").value = "";
    $("weight").value = "";
    $("height").value = "";
    $("sex").value = "female";
    $("method").value = "auto";
    $("visit").value = iso(new Date());
    $("error").classList.remove("visible");
    $("results").classList.remove("visible");
    window.scrollTo({top:0, behavior:"smooth"});
  });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();