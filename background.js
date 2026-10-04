importScripts("./lib/chess_min.js");

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("popup/index.html") });
});

function getStartFEN(fen) {
  const board = fen.split(" ")[0];
  const rows = board.split("/");

  const blackBackRank = rows[0];
  const whiteBackRank = blackBackRank.toUpperCase();

  return `${blackBackRank}/pppppppp/8/8/8/8/PPPPPPPP/${whiteBackRank} w KQkq - 0 1`;
}

const game = Chess();

function pgnToFenArray(pgn) {
  const fenTag = pgn.match(/\[FEN\s+"([^"]+)"\]/);
  const initialFen = fenTag ? fenTag[1] : undefined;

  game.reset();
  if (initialFen) game.load(initialFen);

  const success = game.load_pgn(pgn);
  if (!success) {
    throw new Error("PGN invalide");
  }

  const moves = game.history({ verbose: true });

  game.reset();
  if (initialFen) game.load(initialFen);

  const fenArray = [game.fen()];

  for (let move of moves) {
    game.move(move);
    fenArray.push(game.fen());
  }

  return fenArray;
}

function makeAccount(
  custom_email = null,
  custom_username = null,
  custom_password = null,
) {
  chrome.windows.create(
    {
      incognito: true,
      url: "https://www.chess.com/register",
      state: "maximized",
    },
    (win) => {
      const tabId = win.tabs[0].id;

      const listener = (updatedTabId, changeInfo) => {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);

          chrome.scripting
            .executeScript({
              target: { tabId: tabId },
              args: [custom_email, custom_username, custom_password],
              func: async (cEmail, cUsername, cPassword) => {
                // ================= OVERLAY =================
                const OVERLAY_ID = "__ext_overlay";

                function getRoot() {
                  return document.getElementById(OVERLAY_ID)?.shadowRoot;
                }

                function showOverlay(label = "Loading…") {
                  if (document.getElementById(OVERLAY_ID)) return;
                  const host = document.createElement("div");
                  host.id = OVERLAY_ID;
                  const root = host.attachShadow({ mode: "open" });
                  root.innerHTML = `
                    <style>
                      .wrap{position:fixed;inset:0;z-index:2147483647;display:flex;
                        flex-direction:column;align-items:center;justify-content:center;gap:16px;
                        background:rgba(0,0,0,.65);font-family:system-ui,sans-serif;color:#fff;
                        pointer-events:none}
                      .wrap.interactive{pointer-events:auto}
                      .spin{width:48px;height:48px;border:4px solid rgba(255,255,255,.25);
                        border-top-color:#5a8a30;border-radius:50%;animation:r .8s linear infinite}
                      .spin.error{animation:none;border-color:#c0392b}
                      @keyframes r{to{transform:rotate(360deg)}}
                      .bar{width:260px;height:6px;background:rgba(255,255,255,.2);
                        border-radius:6px;overflow:hidden}
                      .fill{height:100%;width:0;background:#5a8a30;transition:width .25s}
                      .fill.error{background:#c0392b}
                      .txt{font-size:13px}
                      .card{background:#faf8f5;color:#2e2a24;border-radius:14px;padding:24px 28px;
                        min-width:320px;max-width:90vw;box-shadow:0 24px 70px rgba(0,0,0,.35);
                        border:1px solid rgba(74,124,31,.3)}
                      .card h1{font-family:ui-monospace,monospace;font-size:14px;letter-spacing:3px;
                        text-transform:uppercase;text-align:center;margin:0 0 18px;color:#4a7c1f}
                      .row{display:flex;gap:10px;margin-bottom:8px;font-size:13px;align-items:baseline}
                      .row b{font-family:ui-monospace,monospace;font-size:11px;letter-spacing:1px;
                        text-transform:uppercase;color:#7a7060;min-width:78px}
                      .row span{font-family:ui-monospace,monospace;word-break:break-all;
                        user-select:all}
                      .warn{font-size:11px;color:#7a7060;margin:14px 0 18px;text-align:center}
                      .btns{display:flex;gap:10px}
                      button{flex:1;padding:10px 22px;font-family:ui-monospace,monospace;
                        font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
                        border-radius:8px;border:1px solid #5a8a30;background:#4a7c1f;color:#fff;
                        cursor:pointer}
                      button.ghost{background:rgba(74,124,31,.1);color:#4a7c1f}
                      button:hover{filter:brightness(1.08)}
                    </style>
                    <div class="wrap" id="wrap">
                      <div class="spin" id="spin"></div>
                      <div class="bar" id="bar"><div class="fill"></div></div>
                      <div class="txt">${label}</div>
                    </div>`;
                  document.documentElement.appendChild(host);
                }

                function setOverlay(pct, label) {
                  const root = getRoot();
                  if (!root) return;
                  const fill = root.querySelector(".fill");
                  if (fill) fill.style.width = `${pct}%`;
                  const txt = root.querySelector(".txt");
                  if (label && txt) txt.textContent = label;
                }

                function errorOverlay(label) {
                  const root = getRoot();
                  if (!root) return;
                  root.querySelector(".spin")?.classList.add("error");
                  root.querySelector(".fill")?.classList.add("error");
                  const txt = root.querySelector(".txt");
                  if (txt) txt.textContent = label;
                  setTimeout(hideOverlay, 3000);
                }

                function hideOverlay() {
                  document.getElementById(OVERLAY_ID)?.remove();
                }

                // Result card: replaces the alert, resolves when OK is clicked
                function showResult({ username, email, password }) {
                  return new Promise((resolve) => {
                    const root = getRoot();
                    if (!root) return resolve();
                    const wrap = root.getElementById("wrap");
                    wrap.classList.add("interactive");
                    wrap.innerHTML = `
                      <div class="card">
                        <h1>⟡ Account created ⟡</h1>
                        <div class="row"><b>Username</b><span id="u"></span></div>
                        <div class="row"><b>Email</b><span id="e"></span></div>
                        <div class="row"><b>Password</b><span id="p"></span></div>
                        <div class="warn">⚠️ Save these credentials or change them.</div>
                        <div class="btns">
                          <button class="ghost" id="copy">Copy</button>
                          <button id="ok">OK</button>
                        </div>
                      </div>`;
                    root.getElementById("u").textContent = username;
                    root.getElementById("e").textContent = email;
                    root.getElementById("p").textContent = password;

                    root.getElementById("copy").onclick = async (ev) => {
                      const txt = `Username: ${username}\nEmail: ${email}\nPassword: ${password}`;
                      try {
                        await navigator.clipboard.writeText(txt);
                        ev.target.textContent = "Copied ✓";
                      } catch {
                        ev.target.textContent = "Failed";
                      }
                    };
                    root.getElementById("ok").onclick = () => {
                      hideOverlay();
                      resolve();
                    };
                  });
                }

                // ================= Helpers =================

                function randomString(length, chars) {
                  let result = "";

                  for (let i = 0; i < length; i++) {
                    result += chars[Math.floor(Math.random() * chars.length)];
                  }

                  return result;
                }

                function generateEmail() {
                  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

                  const domains = [
                    "aol.com",
                    "arcor.de",
                    "att.net",
                    "free.fr",
                    "zonnet.nl",
                    "earthlink.net",
                    "comcast.net",
                    "sbcglobal.net",
                    "neuf.fr",
                    "uol.com.br",
                    "orange.fr",
                    "planet.nl",
                    "terra.com.br",
                    "juno.com",
                    "live.com",
                    "verizon.net",
                    "wanadoo.fr",
                  ];

                  const length = Math.floor(Math.random() * 9) + 12;

                  return `${randomString(length, chars)}@${
                    domains[Math.floor(Math.random() * domains.length)]
                  }`;
                }

                function secureRandomInt(max) {
                  const buf = new Uint32Array(1);
                  const limit = Math.floor(0x100000000 / max) * max; // avoids modulo bias
                  do {
                    crypto.getRandomValues(buf);
                  } while (buf[0] >= limit);
                  return buf[0] % max;
                }

                function securePick(chars) {
                  return chars[secureRandomInt(chars.length)];
                }

                function generatePassword() {
                  const lower = "abcdefghijklmnopqrstuvwxyz";
                  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  const digits = "0123456789";
                  const all = lower + upper + digits;
                  const length = 12 + secureRandomInt(5); // 12 to 16

                  // at least 1 lowercase, 1 uppercase, 1 digit
                  const out = [
                    securePick(lower),
                    securePick(upper),
                    securePick(digits),
                  ];
                  while (out.length < length) out.push(securePick(all));

                  // Fisher-Yates shuffle
                  for (let i = out.length - 1; i > 0; i--) {
                    const j = secureRandomInt(i + 1);
                    [out[i], out[j]] = [out[j], out[i]];
                  }
                  return out.join("");
                }

                function generateUsername() {
                  const chars =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

                  const length = Math.floor(Math.random() * 11) + 15;

                  return randomString(length, chars);
                }

                async function startGenerating() {
                  let attempts = 0;

                  while (true) {
                    attempts++;
                    // progress 30% -> 90% during the search
                    setOverlay(
                      Math.min(90, 30 + attempts * 3),
                      `Searching for a valid email/username… (attempt ${attempts})`,
                    );

                    const email = generateEmail();
                    const username = generateUsername();

                    try {
                      const emailResponse = await fetch(
                        "https://api.chess.com/rpc/chesscom.authentication.v1.EmailValidationService/Validate",
                        {
                          headers: {
                            accept: "application/json, text/plain, */*",
                            "accept-language": "en-US",
                            "cache-control": "no-cache",
                            "connect-protocol-version": "1",
                            "content-type": "application/json",
                          },
                          referrer: "https://www.chess.com/",
                          body: JSON.stringify({ email }),
                          method: "POST",
                          mode: "cors",
                          credentials: "include",
                        },
                      );

                      const emailResult = await emailResponse.json();

                      const usernameResponse = await fetch(
                        `https://www.chess.com/callback/user/valid?username=${encodeURIComponent(
                          username,
                        )}`,
                        {
                          headers: {
                            accept: "application/json, text/plain, */*",
                            "accept-language":
                              "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                            "cache-control": "no-cache",
                          },
                          referrer:
                            "https://www.chess.com/register?step=username",
                          method: "GET",
                          mode: "cors",
                          credentials: "include",
                        },
                      );

                      const usernameResult = await usernameResponse.json();

                      if (
                        emailResult.status === "EMAIL_STATUS_AVAILABLE" &&
                        usernameResult.valid === true
                      ) {
                        return {
                          email,
                          username,
                        };
                      }
                    } catch (e) {
                      // On network/API error, retry
                    }
                  }
                }

                // Counts the filled required fields
                function checkFields() {
                  const requiredSelectors = {
                    skill: '[name="registration[skillLevel]"]',
                    turnstileToken: '[name="registration[turnstile_token]"]',
                    token: '[name="registration[_token]"]',
                    kount: '[name="kountSessionId"]',
                    fingerprint: '[name="fingerprint"]',
                  };

                  const optionalSelectors = {
                    friend: '[name="registration[friend]"]',
                  };

                  const entries = Object.entries(requiredSelectors);
                  let ok = 0;

                  for (const [label, selector] of entries) {
                    const value =
                      document.querySelector(selector)?.value?.trim() ?? "";
                    console.log(`${label}:`, value || "(empty or not found)");
                    if (value) ok++;
                  }

                  for (const [label, selector] of Object.entries(
                    optionalSelectors,
                  )) {
                    const value =
                      document.querySelector(selector)?.value?.trim() ?? "";
                    console.log(`${label} (optional):`, value || "(empty)");
                  }

                  return {
                    ok,
                    total: entries.length,
                    valid: ok === entries.length,
                  };
                }

                // ================= Main loop =================
                let isExecuting = false;

                showOverlay("Checking fields…");

                const interval = setInterval(async () => {
                  if (isExecuting) return;

                  const buttons = document.querySelectorAll("button");
                  const btn = buttons[1];

                  const { ok, total, valid } = checkFields();
                  // progress 0% -> 30% while waiting for the fields
                  setOverlay((ok / total) * 30, `Fields ready: ${ok}/${total}`);

                  if (valid) {
                    isExecuting = true;
                    clearInterval(interval); // Stop the polling immediately

                    const inputSkill = document.querySelector(
                      '[name="registration[skillLevel]"]',
                    );
                    const turnstileTokens = document.querySelectorAll(
                      '[name="registration[turnstile_token]"]',
                    );
                    const tokenEl = document.querySelector(
                      '[name="registration[_token]"]',
                    );
                    const kountEl = document.querySelector(
                      '[name="kountSessionId"]',
                    );
                    const fpEl = document.querySelector('[name="fingerprint"]');
                    const friendEl = document.querySelector(
                      '[name="registration[friend]"]',
                    );
                    const logEl = document.querySelector(
                      '[name="registration[turnstile_log_data]"]',
                    );

                    setOverlay(30, "Searching for a valid email/username…");
                    const result = await startGenerating();
                    if (!result) {
                      console.log("No valid email/username pair found.");
                      errorOverlay("No valid email/username pair found.");
                      return;
                    }

                    const email =
                      typeof cEmail !== "undefined" && cEmail !== null
                        ? cEmail
                        : result.email;
                    const password =
                      typeof cPassword !== "undefined" && cPassword !== null
                        ? cPassword
                        : generatePassword();
                    const username =
                      typeof cUsername !== "undefined" && cUsername !== null
                        ? cUsername
                        : result.username;

                    setOverlay(95, "Creating account…");

                    const body = new URLSearchParams();

                    body.append("registration[skillLevel]", inputSkill.value);
                    body.append("registration[email]", email);
                    body.append("registration[password]", password);
                    body.append("registration[timezone]", "Europe/Istanbul");

                    if (tokenEl)
                      body.append("registration[_token]", tokenEl.value);
                    if (kountEl) body.append("kountSessionId", kountEl.value);
                    if (fpEl) body.append("fingerprint", fpEl.value);
                    if (friendEl && friendEl.value)
                      body.append("registration[friend]", friendEl.value);

                    if (turnstileTokens[0]) {
                      body.append(
                        "registration[turnstile_token]",
                        turnstileTokens[0].value,
                      );
                    }
                    body.append("registration[username]", username);
                    if (turnstileTokens[1]) {
                      body.append(
                        "registration[turnstile_token]",
                        turnstileTokens[1].value,
                      );
                    }

                    if (logEl) {
                      body.append(
                        "registration[turnstile_log_data]",
                        logEl.value,
                      );
                    }

                    try {
                      const response = await fetch(
                        "https://www.chess.com/register",
                        {
                          headers: {
                            accept:
                              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                            "accept-language":
                              "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                            "content-type": "application/x-www-form-urlencoded",
                            "upgrade-insecure-requests": "1",
                          },
                          body: body,
                          method: "POST",
                          mode: "cors",
                          credentials: "include",
                        },
                      );

                      console.log("HTTP status:", response.status);

                      if (response.ok) {
                        setOverlay(100, "Done");
                        // Wait for the OK click, then continue
                        await showResult({ username, email, password });
                        window.location.reload();
                      } else {
                        console.log("Request failed");
                        errorOverlay(
                          `Request failed (HTTP ${response.status}).`,
                        );
                      }
                    } catch (err) {
                      console.error("Fetch error:", err);
                      errorOverlay("Network error. Please try again.");
                    }
                  } else if (btn) {
                    // Fields not ready yet: click the button to advance the steps
                    btn.click();
                  }
                }, 200);
              },
            })
            .catch(console.error);
        }
      };

      chrome.tabs.onUpdated.addListener(listener);
    },
  );
}

function reviewChessCom(url = "https://www.chess.com/") {
  chrome.windows.create(
    {
      incognito: true,
      url: "https://www.chess.com/register",
      state: "maximized",
    },
    (win) => {
      const tabId = win.tabs[0].id;

      const listener = (updatedTabId, changeInfo) => {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);

          chrome.scripting
            .executeScript({
              target: { tabId: tabId },
              args: [url],
              func: async (targetUrl) => {
                // ================= OVERLAY =================
                const OVERLAY_ID = "__ext_overlay";

                function getRoot() {
                  return document.getElementById(OVERLAY_ID)?.shadowRoot;
                }

                function showOverlay(label = "Loading…") {
                  if (document.getElementById(OVERLAY_ID)) return;
                  const host = document.createElement("div");
                  host.id = OVERLAY_ID;
                  const root = host.attachShadow({ mode: "open" });
                  root.innerHTML = `
                    <style>
                      .wrap{position:fixed;inset:0;z-index:2147483647;display:flex;
                        flex-direction:column;align-items:center;justify-content:center;gap:16px;
                        background:rgba(0,0,0,.65);font-family:system-ui,sans-serif;color:#fff;
                        pointer-events:none}
                      .spin{width:48px;height:48px;border:4px solid rgba(255,255,255,.25);
                        border-top-color:#5a8a30;border-radius:50%;animation:r .8s linear infinite}
                      .spin.error{animation:none;border-color:#c0392b}
                      @keyframes r{to{transform:rotate(360deg)}}
                      .bar{width:260px;height:6px;background:rgba(255,255,255,.2);
                        border-radius:6px;overflow:hidden}
                      .fill{height:100%;width:0;background:#5a8a30;transition:width .25s}
                      .fill.error{background:#c0392b}
                      .txt{font-size:13px}
                    </style>
                    <div class="wrap" id="wrap">
                      <div class="spin" id="spin"></div>
                      <div class="bar"><div class="fill"></div></div>
                      <div class="txt">${label}</div>
                    </div>`;
                  document.documentElement.appendChild(host);
                }

                function setOverlay(pct, label) {
                  const root = getRoot();
                  if (!root) return;
                  const fill = root.querySelector(".fill");
                  if (fill) fill.style.width = `${pct}%`;
                  const txt = root.querySelector(".txt");
                  if (label && txt) txt.textContent = label;
                }

                function errorOverlay(label) {
                  const root = getRoot();
                  if (!root) return;
                  root.querySelector(".spin")?.classList.add("error");
                  root.querySelector(".fill")?.classList.add("error");
                  const txt = root.querySelector(".txt");
                  if (txt) txt.textContent = label;
                  setTimeout(hideOverlay, 3000);
                }

                function hideOverlay() {
                  document.getElementById(OVERLAY_ID)?.remove();
                }

                // ================= Helpers =================

                function randomString(length, chars) {
                  let result = "";

                  for (let i = 0; i < length; i++) {
                    result += chars[Math.floor(Math.random() * chars.length)];
                  }

                  return result;
                }

                function generateEmail() {
                  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

                  const domains = [
                    "aol.com",
                    "arcor.de",
                    "att.net",
                    "free.fr",
                    "zonnet.nl",
                    "earthlink.net",
                    "comcast.net",
                    "sbcglobal.net",
                    "neuf.fr",
                    "uol.com.br",
                    "orange.fr",
                    "planet.nl",
                    "terra.com.br",
                    "juno.com",
                    "live.com",
                    "verizon.net",
                    "wanadoo.fr",
                  ];

                  const length = Math.floor(Math.random() * 9) + 12;

                  return `${randomString(length, chars)}@${
                    domains[Math.floor(Math.random() * domains.length)]
                  }`;
                }

                function secureRandomInt(max) {
                  const buf = new Uint32Array(1);
                  const limit = Math.floor(0x100000000 / max) * max; // avoids modulo bias
                  do {
                    crypto.getRandomValues(buf);
                  } while (buf[0] >= limit);
                  return buf[0] % max;
                }

                function securePick(chars) {
                  return chars[secureRandomInt(chars.length)];
                }

                function generatePassword() {
                  const lower = "abcdefghijklmnopqrstuvwxyz";
                  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  const digits = "0123456789";
                  const all = lower + upper + digits;
                  const length = 12 + secureRandomInt(5); // 12 to 16

                  // at least 1 lowercase, 1 uppercase, 1 digit
                  const out = [
                    securePick(lower),
                    securePick(upper),
                    securePick(digits),
                  ];
                  while (out.length < length) out.push(securePick(all));

                  // Fisher-Yates shuffle
                  for (let i = out.length - 1; i > 0; i--) {
                    const j = secureRandomInt(i + 1);
                    [out[i], out[j]] = [out[j], out[i]];
                  }
                  return out.join("");
                }

                function generateUsername() {
                  const chars =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

                  const length = Math.floor(Math.random() * 11) + 15;

                  return randomString(length, chars);
                }

                async function startGenerating() {
                  let attempts = 0;

                  while (true) {
                    attempts++;
                    // progress 30% -> 90% during the search
                    setOverlay(
                      Math.min(90, 30 + attempts * 3),
                      `Searching for a valid email/username… (attempt ${attempts})`,
                    );

                    const email = generateEmail();
                    const username = generateUsername();

                    try {
                      const emailResponse = await fetch(
                        "https://api.chess.com/rpc/chesscom.authentication.v1.EmailValidationService/Validate",
                        {
                          headers: {
                            accept: "application/json, text/plain, */*",
                            "accept-language": "en-US",
                            "cache-control": "no-cache",
                            "connect-protocol-version": "1",
                            "content-type": "application/json",
                          },
                          referrer: "https://www.chess.com/",
                          body: JSON.stringify({ email }),
                          method: "POST",
                          mode: "cors",
                          credentials: "include",
                        },
                      );

                      const emailResult = await emailResponse.json();

                      const usernameResponse = await fetch(
                        `https://www.chess.com/callback/user/valid?username=${encodeURIComponent(
                          username,
                        )}`,
                        {
                          headers: {
                            accept: "application/json, text/plain, */*",
                            "accept-language":
                              "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                            "cache-control": "no-cache",
                          },
                          referrer:
                            "https://www.chess.com/register?step=username",
                          method: "GET",
                          mode: "cors",
                          credentials: "include",
                        },
                      );

                      const usernameResult = await usernameResponse.json();

                      if (
                        emailResult.status === "EMAIL_STATUS_AVAILABLE" &&
                        usernameResult.valid === true
                      ) {
                        return {
                          email,
                          username,
                        };
                      }
                    } catch (e) {
                      // On network/API error, retry
                    }
                  }
                }

                // Counts the filled required fields
                function checkFields() {
                  // Required fields to allow submission
                  const requiredSelectors = {
                    skill: '[name="registration[skillLevel]"]',
                    turnstileToken: '[name="registration[turnstile_token]"]',
                    token: '[name="registration[_token]"]',
                    kount: '[name="kountSessionId"]',
                    fingerprint: '[name="fingerprint"]',
                  };

                  // Optional field
                  const optionalSelectors = {
                    friend: '[name="registration[friend]"]',
                  };

                  const entries = Object.entries(requiredSelectors);
                  let ok = 0;

                  for (const [label, selector] of entries) {
                    const value =
                      document.querySelector(selector)?.value?.trim() ?? "";
                    console.log(`${label} :`, value || "(empty or not found)");
                    if (value) ok++;
                  }

                  for (const [label, selector] of Object.entries(
                    optionalSelectors,
                  )) {
                    const value =
                      document.querySelector(selector)?.value?.trim() ?? "";
                    console.log(`${label} (optional) :`, value || "(empty)");
                  }

                  return {
                    ok,
                    total: entries.length,
                    valid: ok === entries.length,
                  };
                }

                // ================= Main loop =================
                let isExecuting = false;

                showOverlay("Checking fields…");

                const interval = setInterval(async () => {
                  if (isExecuting) return;

                  const buttons = document.querySelectorAll("button");
                  const btn = buttons[1];

                  const { ok, total, valid } = checkFields();
                  // progress 0% -> 30% while waiting for the fields
                  setOverlay((ok / total) * 30, `Fields ready: ${ok}/${total}`);

                  // As soon as all required fields are valid
                  if (valid) {
                    isExecuting = true;
                    clearInterval(interval); // Stop the polling immediately

                    const inputSkill = document.querySelector(
                      '[name="registration[skillLevel]"]',
                    );
                    const turnstileTokens = document.querySelectorAll(
                      '[name="registration[turnstile_token]"]',
                    );
                    const tokenEl = document.querySelector(
                      '[name="registration[_token]"]',
                    );
                    const kountEl = document.querySelector(
                      '[name="kountSessionId"]',
                    );
                    const fpEl = document.querySelector('[name="fingerprint"]');
                    const friendEl = document.querySelector(
                      '[name="registration[friend]"]',
                    );
                    const logEl = document.querySelector(
                      '[name="registration[turnstile_log_data]"]',
                    );

                    setOverlay(30, "Searching for a valid email/username…");
                    const result = await startGenerating();
                    if (!result) {
                      console.log("No valid email/username pair found.");
                      errorOverlay("No valid email/username pair found.");
                      return;
                    }

                    const email = result.email;
                    const password = generatePassword();
                    const username = result.username;

                    setOverlay(95, "Submitting registration…");

                    const body = new URLSearchParams();

                    body.append("registration[skillLevel]", inputSkill.value);
                    body.append("registration[email]", email);
                    body.append("registration[password]", password);
                    body.append("registration[timezone]", "Europe/Istanbul");

                    if (tokenEl)
                      body.append("registration[_token]", tokenEl.value);
                    if (kountEl) body.append("kountSessionId", kountEl.value);
                    if (fpEl) body.append("fingerprint", fpEl.value);
                    if (friendEl && friendEl.value) {
                      body.append("registration[friend]", friendEl.value);
                    }

                    if (turnstileTokens[0]) {
                      body.append(
                        "registration[turnstile_token]",
                        turnstileTokens[0].value,
                      );
                    }

                    body.append("registration[username]", username);

                    if (turnstileTokens[1]) {
                      body.append(
                        "registration[turnstile_token]",
                        turnstileTokens[1].value,
                      );
                    }

                    if (logEl) {
                      body.append(
                        "registration[turnstile_log_data]",
                        logEl.value,
                      );
                    }

                    try {
                      const response = await fetch(
                        "https://www.chess.com/register",
                        {
                          headers: {
                            accept:
                              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                            "accept-language":
                              "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                            "content-type": "application/x-www-form-urlencoded",
                            "upgrade-insecure-requests": "1",
                          },
                          body: body,
                          method: "POST",
                          mode: "cors",
                          credentials: "include",
                        },
                      );

                      console.log("HTTP status :", response.status);

                      if (response.ok) {
                        setOverlay(100, "Done! Redirecting…");
                        // Short delay so the 100% state is visible
                        await new Promise((r) => setTimeout(r, 300));
                        window.location.href = targetUrl;
                      } else {
                        console.log("Request failed");
                        errorOverlay(
                          `Request failed (HTTP ${response.status}).`,
                        );
                      }
                    } catch (err) {
                      console.error("Fetch error :", err);
                      errorOverlay("Network error. Please try again.");
                    }
                  } else if (btn) {
                    // Fields not ready yet: click the button to advance/validate the steps
                    btn.click();
                  }
                }, 200);
              },
            })
            .catch(console.error);
        }
      };

      chrome.tabs.onUpdated.addListener(listener);
    },
  );
}

function pgnToUciString(pgn) {
  const fenTag = pgn.match(/\[FEN\s+"([^"]+)"\]/);
  const startFen = fenTag ? fenTag[1] : null;

  const game = new Chess();

  if (startFen) {
    game.load(startFen);
  } else {
    game.reset();
  }

  const success = game.load_pgn(pgn);
  if (!success) {
    throw new Error("PGN invalide");
  }

  const moves = game.history({ verbose: true });

  const uciMoves = moves.map((m) => {
    // roque
    if (m.flags.includes("k")) {
      return m.color === "w" ? "e1g1" : "e8g8";
    }
    if (m.flags.includes("q")) {
      return m.color === "w" ? "e1c1" : "e8c8";
    }

    // promotion
    if (m.promotion) {
      return `${m.from}${m.to}${m.promotion}`;
    }

    // normal + en passant inclus automatiquement
    return `${m.from}${m.to}`;
  });

  const positionPart = startFen
    ? `position fen ${startFen}`
    : `position startpos`;

  return `${positionPart} moves ${uciMoves.join(" ")}`;
}

let popupTabs = [];

function sendConfigToSite(type, config, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, config });
    }
  });
}

function sendMovesToSite(type, moves, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, moves });
    }
  });
}

const activeListeners = {};

async function safeResume(source) {
  try {
    await chrome.debugger.sendCommand(source, "Debugger.resume");
  } catch (e) {
    console.log("safeResume: resume ignoré:", e?.message || e);
  }
}

self.addEventListener("unhandledrejection", (event) => {
  const msg = event.reason?.message || "";
  if (msg.includes("Can only perform operation while paused")) {
    event.preventDefault();
    return;
  }

  const isDebuggerError =
    msg.includes("Debugger") ||
    msg.includes("debugger") ||
    msg.includes("Attaching");
  if (isDebuggerError) {
    event.preventDefault();
    console.log("Erreur debugger inattendue, tentative de réattachement:", msg);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) return;
      const tabId = tab.id;
      if (activeListeners[tabId]) {
        chrome.debugger.onEvent.removeListener(
          activeListeners[tabId].scriptParsed,
        );
        chrome.debugger.onEvent.removeListener(
          activeListeners[tabId].debuggerEvent,
        );
        delete activeListeners[tabId];
      }
      chrome.debugger.detach({ tabId }, () => {
        chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" });
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!sender.tab || !sender.tab.id) return;
  const tabId = sender.tab.id;
  if (message.type === "ATTACH_DEBUGGER") {
    chrome.tabs.get(tabId, async (tab) => {
      if (!tab || !tab.url) {
        sendResponse({ success: false, error: "No tab URL" });
        return;
      }

      const urlTab = new URL(tab.url);
      const host = urlTab.hostname;

      const allowedDomains = ["lichess.org", "worldchess.com"];
      if (!allowedDomains.includes(host)) {
        sendResponse({ success: false, error: "Domain not allowed" });
        return;
      }

      let TARGET = "";
      let BREAK_SEARCH = "";

      if (host === "lichess.org") {
        TARGET = "this.onMove=(e,t,s)=>{s||this.enpassant(e,t)";
        BREAK_SEARCH = "s||";
      }

      if (host === "worldchess.com") {
        TARGET = `i.on("history",e=>{this.clearAll()`;
        BREAK_SEARCH = `this.clearAll()`;
      }
      // if (host === "worldchess.com") {
      //   TARGET = `e.on("history",(i,s)=>{if(i.length===s.length)`;
      //   BREAK_SEARCH = `if(i.length===s.length)`;
      // }

      let breakpointId = null;

      async function trySetBreakpoint(url) {
        try {
          const res = await fetch(url);
          const code = await res.text();

          let index = -1;

          if (host === "lichess.org") {
            const targetIndex = code.indexOf(TARGET);
            if (targetIndex === -1) return false;
            index = targetIndex + TARGET.indexOf(BREAK_SEARCH);
          }

          if (host === "worldchess.com") {
            const targetIndex = code.indexOf(TARGET);
            if (targetIndex === -1) return false;
            index = targetIndex + TARGET.indexOf(BREAK_SEARCH);
          }

          if (index === -1) return false;

          const before = code.slice(0, index);
          const lines = before.split("\n");
          const lineNumber = lines.length - 1;
          const columnNumber = lines[lines.length - 1].length;

          const bpRes = await new Promise((resolve) => {
            chrome.debugger.sendCommand(
              { tabId },
              "Debugger.setBreakpointByUrl",
              { url, lineNumber, columnNumber },
              resolve,
            );
          });

          if (bpRes && bpRes.breakpointId) {
            breakpointId = bpRes.breakpointId;
            return true;
          }
        } catch (e) {
          console.log("trySetBreakpoint error:", e);
        }
        return false;
      }

      if (activeListeners[tabId]) {
        chrome.debugger.onEvent.removeListener(
          activeListeners[tabId].scriptParsed,
        );
        chrome.debugger.onEvent.removeListener(
          activeListeners[tabId].debuggerEvent,
        );
        delete activeListeners[tabId];
      }

      chrome.debugger.detach({ tabId }, () => {
        chrome.debugger.attach({ tabId }, "1.3", async () => {
          if (chrome.runtime.lastError) {
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message,
            });
            return;
          }

          await chrome.debugger.sendCommand({ tabId }, "Debugger.enable");

          let urls = [];
          try {
            const results = await chrome.scripting.executeScript({
              target: { tabId },
              func: () =>
                [...document.scripts].map((s) => s.src).filter(Boolean),
            });
            urls = results[0]?.result || [];
          } catch (err) {
            console.log(err);
          }

          let found = false;
          for (const url of urls) {
            if (await trySetBreakpoint(url)) {
              found = true;
              break;
            }
          }

          if (!found) console.log("Code Not found");

          const scriptParsedListener = async (source, method, params) => {
            if (source.tabId !== tabId) return;
            if (method !== "Debugger.scriptParsed") return;
            if (!params.url) return;

            const newBp = await trySetBreakpoint(params.url);
            if (newBp) {
            }
          };

          const debuggerEventListener = async (source, method, params) => {
            if (source.tabId !== tabId) return;
            if (method !== "Debugger.paused") return;

            if (
              !params.hitBreakpoints ||
              !breakpointId ||
              !params.hitBreakpoints.includes(breakpointId)
            ) {
              await safeResume(source);
              return;
            }

            if (!params.callFrames || params.callFrames.length === 0) {
              await safeResume(source);
              return;
            }

            try {
              if (host === "lichess.org") {
                const evalRes = await chrome.debugger.sendCommand(
                  source,
                  "Debugger.evaluateOnCallFrame",
                  {
                    callFrameId: params.callFrames[0].callFrameId,
                    expression: "this.data.steps",
                    returnByValue: true,
                  },
                );

                const evalRes2 = await chrome.debugger.sendCommand(
                  source,
                  "Debugger.evaluateOnCallFrame",
                  {
                    callFrameId: params.callFrames[0].callFrameId,
                    expression: "({ e, t })",
                    returnByValue: true,
                  },
                );

                const { e, t } = evalRes2.result.value;
                const lastMove = e + t;
                const movesHistory = evalRes.result?.value || [];
                let fenhistory = [];

                let uciHistory = `position fen ${movesHistory[0]?.fen ?? ""} moves`;

                if (movesHistory.length > 0) {
                  game.load(movesHistory[0].fen);

                  for (let i = 1; i < movesHistory.length; i++) {
                    const move = movesHistory[i].san || movesHistory[i].uci;
                    if (!move) continue;
                    const result = game.move(move, { sloppy: true });
                    if (!result)
                      console.log(
                        "Impossible de jouer le coup:",
                        move,
                        "index",
                        i,
                      );
                  }

                  game.move(lastMove, { sloppy: true });
                  game.header(
                    "Variant",
                    "Chess960",
                    "SetUp",
                    "1",
                    "FEN",
                    movesHistory[0].fen,
                  );

                  fenhistory = pgnToFenArray(game.pgn());
                  uciHistory = pgnToUciString(game.pgn());

                  chrome.tabs.query({}, (tabs) => {
                    for (const tab of tabs) {
                      if (tab.url && tab.url.includes("lichess")) {
                        chrome.tabs.sendMessage(tab.id, {
                          type: "history",
                          data: fenhistory,
                          uci: uciHistory,
                          last: lastMove,
                        });
                      }
                    }
                  });
                }
              }

              if (host === "worldchess.com") {
                const evalRes = await chrome.debugger.sendCommand(
                  source,
                  "Debugger.evaluateOnCallFrame",
                  {
                    callFrameId: params.callFrames[0].callFrameId,
                    expression: "e",
                    returnByValue: true,
                  },
                );

                const movesHistory = evalRes.result?.value || [];
                const fenhistory = [];
                const fenInit = movesHistory[0].fen;
                const startFen = getStartFEN(fenInit);

                game.load(startFen);
                fenhistory.push(game.fen());

                movesHistory.forEach((e) => {
                  game.move(e.lan, { sloppy: true });
                  fenhistory.push(game.fen());
                });
                game.header(
                  "Variant",
                  "Chess960",
                  "SetUp",
                  "1",
                  "FEN",
                  startFen,
                );

                let uciHistory = pgnToUciString(game.pgn());

                console.clear();
                console.log(uciHistory);
                console.log(fenhistory);

                chrome.tabs.query({}, (tabs) => {
                  for (const tab of tabs) {
                    if (tab.url && tab.url.includes("worldchess")) {
                      chrome.tabs.sendMessage(tab.id, {
                        type: "history",
                        data: fenhistory,
                        uci: uciHistory,
                      });
                    }
                  }
                });
              }
            } catch (e) {
              console.log(e);
            } finally {
              await safeResume(source);
            }
          };

          activeListeners[tabId] = {
            scriptParsed: scriptParsedListener,
            debuggerEvent: debuggerEventListener,
          };

          chrome.debugger.onEvent.addListener(scriptParsedListener);
          chrome.debugger.onEvent.addListener(debuggerEventListener);

          sendResponse({ success: true });
        });
      });
    });

    return true;
  }

  if (message.type === "DETACH_DEBUGGER") {
    if (activeListeners[tabId]) {
      chrome.debugger.onEvent.removeListener(
        activeListeners[tabId].scriptParsed,
      );
      chrome.debugger.onEvent.removeListener(
        activeListeners[tabId].debuggerEvent,
      );
      delete activeListeners[tabId];
    }

    chrome.debugger.detach({ tabId }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
        return;
      }

      sendResponse({ success: true });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type !== "DRAG_MOVE") return;

  const { fromX, fromY, toX, toY } = message;

  const tabs = await chrome.tabs.query({});

  const allowedDomains = ["lichess.org", "worldchess.com"];
  const targetTabs = tabs.filter((tab) => {
    if (!tab.url) return false;
    const url = new URL(tab.url);
    return allowedDomains.includes(url.hostname);
  });

  for (const tab of targetTabs) {
    const tabId = tab.id;

    if (!tabId) continue;

    await sendMouseEvent(tabId, {
      type: "mousePressed",
      x: fromX,
      y: fromY,
      button: "left",
      clickCount: 1,
    });

    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const x = fromX + (toX - fromX) * (i / steps);
      const y = fromY + (toY - fromY) * (i / steps);
      await sendMouseEvent(tabId, { type: "mouseMoved", x, y, button: "left" });
    }

    await sendMouseEvent(tabId, {
      type: "mouseReleased",
      x: toX,
      y: toY,
      button: "left",
      clickCount: 1,
    });
  }
});

function sendMouseEvent(tabId, params) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      params,
      (res) => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
        resolve(res);
      },
    );
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "FETCH_AUDIO") {
    fetch(msg.url)
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        sendResponse({ buffer: Array.from(new Uint8Array(buffer)) });
      })
      .catch((err) => sendResponse({ error: err.message }));
    return true;
  }

  if (msg.type === "eval") {
    currentEval = msg.eval;

    fetch("http://127.0.0.1:5000/api/eval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eval: msg.eval,
        side: msg.side,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse /api/eval :", data);
        sendResponse(data);
      })
      .catch((err) => {
        console.error("Erreur /api/eval :", err);
        sendResponse({ error: err.message });
      });

    return true;
  }

  if (msg.type === "STREAM") {
    fetch("http://127.0.0.1:5000/api/arrowEngine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moves: msg.moves,
        side: msg.side, //
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sendResponse(data);
      })
      .catch((err) => {
        console.log(err);
        sendResponse({ error: err.message });
      });

    return true; // Obligatoire car sendResponse est appelé plus tard
  }

  if (msg.type === "FEN_UPDATE") {
    fetch("http://127.0.0.1:5000/api/update_fen", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    fetch("http://127.0.0.1:5000/api/color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg.colors),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  if (msg.type === "ACC") {
    fetch("http://127.0.0.1:5000/api/accuracy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accWhite: msg.whiteAcc,
        EloWhite: msg.whiteElo,
        accBlack: msg.blackAcc,
        EloBlack: msg.blackElo,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Succès:", data))
      .catch((error) => console.log("Erreur:", error));
  }

  if (msg.type === "open_review") {
    chrome.tabs.create({ url: chrome.runtime.getURL("analyze/index.html") });
  }

  if (msg.type === "HINT") {
    fetch("http://127.0.0.1:5000/api/hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: msg.from, // Case de départ
        to: msg.to, // Case d'arrivée
        side: msg.side, // "w" pour Blancs, "b" pour Noirs
        tags: msg.tags,
        mateIn: msg.mateIn,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Réponse API:", data));
  }

  if (msg.type === "PV") {
    fetch("http://127.0.0.1:5000/api/pv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        side: msg.side,
        fen: msg.fen,
        pv: msg.pv,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Réponse API:", data));
  }

  if (msg.type === "analysis") {
    // reviewChessCom(msg.url);
    // console.log(msg.url)
    if (msg.url.includes("analysis")) {
      reviewChessCom(msg.url);
    }
  }

  if (msg.type === "create") {
    makeAccount(msg.email, msg.username, msg.password);
  }

  if (msg.type === "SVG") {
    fetch("http://127.0.0.1:5000/api/placeSVG", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        side: msg.side, // "white" ou "black"
        square: msg.square, // La case cible (ex: "e4", "g1")
        moveclassification: msg.moveClassification, // "brilliant", "greatFind", "best", "blunder", etc.
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("SVG placé avec succès :", data);
      })
      .catch((error) => {
        console.log("Erreur lors de l'envoi du SVG :", error);
      });
  }
});

// account maker
