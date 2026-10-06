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

                    body.append("registration[skillLevel]", 4);
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

                        const base64 = `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`;

                        const byteCharacters = atob(
                          base64.replace(/^data:image\/\w+;base64,/, ""),
                        );
                        const byteNumbers = new Uint8Array(
                          byteCharacters.length,
                        );
                        for (let i = 0; i < byteCharacters.length; i++) {
                          byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }

                        const boundary =
                          "------WebKitFormBoundaryKQ1b1MGIfUbEtvva";
                        const headerText = `${boundary}\r\nContent-Disposition: form-data; name="file"; filename="16.png"\r\nContent-Type: image/png\r\n\r\n`;
                        const footerText = `\r\n${boundary}--\r\n`;

                        const encoder = new TextEncoder();
                        const headerArray = encoder.encode(headerText);
                        const footerArray = encoder.encode(footerText);

                        const body = new Uint8Array(
                          headerArray.length +
                            byteNumbers.length +
                            footerArray.length,
                        );
                        body.set(headerArray, 0);
                        body.set(byteNumbers, headerArray.length);
                        body.set(
                          footerArray,
                          headerArray.length + byteNumbers.length,
                        );

                        fetch(
                          "https://www.chess.com/callback/member/upload/avatar",
                          {
                            headers: {
                              accept: "application/json, text/plain, */*",
                              "accept-language":
                                "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                              "cache-control": "no-cache",
                              "content-type":
                                "multipart/form-data; boundary=----WebKitFormBoundaryKQ1b1MGIfUbEtvva",
                              pragma: "no-cache",
                              priority: "u=1, i",
                              "x-chesscom-csrf-token":
                                "b8.QcOIaLFFJSC2VCDrH0jm_xXAS8d0O0a65EmYfZjV3zY.MaC_G95oX2bjElLfUwyRjUKsIYxGbDzUrX3AEaiYumUO8tg-_ARwbYdjFA",
                            },
                            referrer:
                              "https://www.chess.com/member/e_4rtqgpgg0owry7jsm_nhaxo",
                            body: body,
                            method: "POST",
                            mode: "cors",
                            credentials: "include",
                          },
                        );

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
