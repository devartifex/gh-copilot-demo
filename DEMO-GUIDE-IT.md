# Guida Pratica al Workshop su GitHub Copilot

> Una guida pratica e dettagliata per condurre un workshop hands-on su GitHub Copilot. Copre le funzionalità di personalizzazione, le modalità operative, la selezione dei modelli, la meccanica delle premium request e casi d'uso reali — con teoria e comandi sia per VS Code che per Copilot CLI.

## Indice

- [Parte 1 — Introduzione](#parte-1--introduzione-5-min)
- [Parte 2 — Personalizzare Copilot: Le Leve Potenti](#parte-2--personalizzare-copilot-le-leve-potenti-35-min)
  - [2.1 Custom Instructions](#21-custom-instructions)
  - [2.2 Prompt Files](#22-prompt-files)
  - [2.3 Custom Agents](#23-custom-agents)
  - [2.4 Skills](#24-skills-)
  - [2.5 Funzionalità di Personalizzazione Aggiuntive (CLI)](#25-funzionalità-di-personalizzazione-aggiuntive-cli)
  - [2.6 Dove Può Risiedere Ogni Personalizzazione: Repo vs Utente vs Org](#26-dove-può-risiedere-ogni-personalizzazione-repo-vs-utente-vs-org)
  - [2.7 Le Modalità Operative: Ask, Plan, Agent, Autopilot, Fleet](#27-le-modalità-operative-ask-plan-agent-autopilot-fleet)
- [Parte 3 — Approfondimento CLI: Funzionalità Esclusive](#parte-3--approfondimento-cli-funzionalità-esclusive-%EF%B8%8F-10-min)
- [Parte 4 — Best Practice: Modelli, Premium Request e Casi d'Uso Reali](#parte-4--best-practice-modelli-premium-request-e-casi-duso-reali--30-min)
  - [4.1 Scegliere il Modello Giusto](#41-scegliere-il-modello-giusto)
  - [4.2 Premium Request: Come Funzionano DAVVERO](#42-premium-request-come-funzionano-davvero-)
- [Parte 5 — Copilot Oltre il Codice: Excel e PowerPoint](#parte-5--copilot-oltre-il-codice-excel-e-powerpoint--10-min)
- [Parte 6 — Prossimi Passi e Argomenti Proposti](#parte-6--prossimi-passi-e-argomenti-proposti-10-min--qa)
- [Appendice A — Riferimento Completo alle Personalizzazioni](#appendice-a--riferimento-completo-alle-personalizzazioni)
- [Appendice B — Riferimento Rapido dei Comandi](#appendice-b--riferimento-rapido-dei-comandi)
- [Appendice C — Link alla Documentazione Ufficiale](#appendice-c--link-alla-documentazione-ufficiale)

---

## Parte 1 — Introduzione (~5 min)

Obiettivi della sessione:

- Andare oltre le basi di Copilot verso workflow avanzati e produttivi
- Imparare a personalizzare Copilot per il proprio progetto e team
- Comprendere la selezione dei modelli e l'economia delle premium request
- Confrontare i workflow di VS Code e CLI fianco a fianco

### Prerequisiti

- Node.js 18+
- VS Code con l'estensione GitHub Copilot Chat
- GitHub Copilot CLI installato
- Un account GitHub con accesso a Copilot

### Setup — L'App Demo

```bash
git clone https://github.com/devartifex/gh-copilot-demo.git
cd gh-copilot-demo
npm install
npm run dev
```

Verifica: Frontend su http://localhost:4321, Backend su http://localhost:3000

### Setup — Copilot CLI

Durante questo workshop useremo sia VS Code che Copilot CLI. La CLI è lo stesso Copilot — stesse personalizzazioni, stessi modelli — ma nel terminale. Ha inoltre funzionalità esclusive come Fleet Mode, plugin e Hooks.

**Installazione:**

```bash
# macOS
brew install copilot-cli

# Windows
winget install GitHub.Copilot

# Verify
copilot --version
```

**Integrazione con VS Code:** Le sessioni CLI appaiono nella vista "Sessions" di Copilot Chat in VS Code, e viceversa. Condividono gli stessi file di personalizzazione (istruzioni, agenti, skill, prompt).

**Riferimento rapido per i comandi CLI usati in questa guida:**

| Cosa | Comando |
|---|---|
| Inviare un prompt | `copilot -p "your prompt"` |
| Pianificare prima di agire | `/plan "task"` |
| Esecuzione parallela | `/fleet "task"` |
| Elencare le skill | `/skills list` |
| Saltare tutti i permessi | `--allow-all` (o `--yolo`) |
| Selezionare un modello | `--model MODEL-NAME` |
| Disabilitare le Custom Instructions | `--no-custom-instructions` |

📎 [Documentazione CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)

---

## Parte 2 — Personalizzare Copilot: Le Leve Potenti (~35 min)

Copilot non è solo autocompletamento — è un assistente profondamente personalizzabile. Questa sezione illustra ogni leva che puoi utilizzare per adattare Copilot al tuo progetto, al tuo team e al tuo workflow. Queste funzionalità sono disponibili sia in VS Code che in Copilot CLI, anche se non tutte hanno piena parità su ogni piattaforma.

📎 [Confronto funzionalità CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)
📎 [Cheat sheet personalizzazione](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

---

### 2.1 Custom Instructions
**Cosa sono:** Contesto sempre attivo che si applica automaticamente a ogni interazione con Copilot nell'ambito definito. Copilot le legge silenziosamente — non devi mai ripetere le convenzioni del progetto.

**Dove risiedono:**

| Ambito | Posizione | Attivazione |
|---|---|---|
| A livello di repository | `.github/copilot-instructions.md` | Automatica |
| Specifico per percorso | `.github/instructions/*.instructions.md` | Automatica (quando i file corrispondono al glob `applyTo`) |
| Istruzioni per agenti | `AGENTS.md` nella root del repo | Automatica |
| **A livello utente (personale)** | `$HOME/.copilot/copilot-instructions.md` | Automatica, cross-repo |
| **A livello utente (avanzato)** | Directory nella variabile d'ambiente `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` | Automatica |

**Quando usarle:** Standard che dovrebbero applicarsi in modo ampio — stile di codifica, regole di sicurezza, checklist di revisione.
**Quando NON usarle:** Se vuoi il comportamento solo in un workflow → usa una Skill. Se le istruzioni sono troppo grandi/specifiche → usa un Custom Agent.

📎 [Aggiungere Custom Instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions)

**🔧 Demo Pratica:**

1. Apri `backend/index.js` in VS Code e chiedi a Copilot: *"Add a new PATCH /todos/:id endpoint to update the todo text"*
   - Osserva: Copilot segue le convenzioni Express da `express-backend.instructions.md`
2. Apri `frontend/src/pages/index.astro` e chiedi: *"Add an edit button to each todo item"*
   - Osserva: Copilot segue i pattern Astro + Bootstrap da `astro-frontend.instructions.md`
3. Equivalente CLI:
   ```bash
   copilot -p "Add a new PATCH /todos/:id endpoint to update the todo text"
   ```
   - Le stesse istruzioni vengono caricate automaticamente
4. Disabilita le istruzioni per vedere la differenza:
   ```bash
   copilot --no-custom-instructions -p "Add a new PATCH /todos/:id endpoint"
   ```

**📁 File in questo repo:**

- `copilot-instructions.md` — convenzioni generali del progetto
- `instructions/express-backend.instructions.md` — pattern Express + SQLite
- `instructions/astro-frontend.instructions.md` — pattern Astro + Bootstrap
- `instructions/security.instructions.md` — regole di sicurezza basate su OWASP
- `instructions/accessibility.instructions.md` — linee guida WCAG 2.2 AA
- `instructions/code-review.instructions.md` — priorità di revisione
- `instructions/code-comments.instructions.md` — regole per i commenti
- `instructions/github-actions.instructions.md` — best practice CI/CD

---

### 2.2 Prompt Files

**Cosa sono:** Template Markdown riutilizzabili che alleghi in Copilot Chat. Scrivi le istruzioni una volta, riusale con input diversi. Supportano frontmatter YAML per modello, strumenti e selezione dell'agente, oltre a placeholder `${input:variable}`.

**Dove risiedono:**

- **Repo**: `.github/prompts/*.prompt.md`
- **A livello utente (VS Code)**: cartella `prompts/` nel profilo utente di VS Code

**Quando usarli:** Attività mirate e specifiche che esegui ripetutamente con input diversi.
**Quando NON usarli:** Se le indicazioni devono applicarsi a tutto → usa le Custom Instructions.

**🔧 Demo Pratica:**

1. In Copilot Chat di VS Code, digita `/add-dark-mode` per invocare il prompt file
2. Osserva: Copilot segue il template del prompt per implementare il toggle modalità chiara/scura
3. Prova `generate-backend-tests.prompt.md` — genera una suite di test Jest completa
4. CLI: i Prompt Files sono disponibili come contesto anche nella CLI

**📁 File in questo repo:**

- `add-dark-mode.prompt.md` — toggle modalità chiara/scura
- `add-rest-endpoint.prompt.md` — nuovo endpoint API
- `create-astro-component.prompt.md` — nuovo componente UI
- `generate-backend-tests.prompt.md` — suite di test Jest
- `generate-frontend-tests.prompt.md` — test E2E Playwright
- `add-todo-filtering.prompt.md` — pulsanti di filtro
- `refactor-routes.prompt.md` — modularizzazione delle route

---

### 2.3 Custom Agents

**Cosa sono:** Personalità specializzate con istruzioni proprie, restrizioni sugli strumenti e contesto dedicato. Come compagni di team su misura che conoscono già un'area specifica del tuo progetto.

**Dove risiedono:**

| Ambito | Posizione |
|---|---|
| Repository | `.github/agents/AGENT-NAME.md` |
| Organizzazione/Enterprise | `agents/AGENT-NAME.md` nel repo `.github-private` |
| A livello utente | Profilo utente |

Conflitti di denominazione: il livello più basso prevale (repo > org > enterprise).

**Quando usarli:** Progetti con aree distinte che necessitano di competenze diverse (backend, frontend, testing, database).
**Quando NON usarli:** Se non hai bisogno di specializzazione e l'agente predefinito funziona bene.

📎 [Configurazione Custom Agents](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

**🔧 Demo Pratica:**

1. In VS Code, apri Copilot Chat → seleziona l'agente `todo-backend` dal menu a tendina
2. Chiedi: *"Add input validation to the POST /todos endpoint"*
   - Osserva: l'agente conosce le convenzioni Express.js e si concentra solo sul backend
3. Passa all'agente `todo-frontend` → chiedi: *"Create a loading spinner component"*
   - Osserva: competenze diverse, focus su Astro + Bootstrap
4. Prova l'agente `todo-testing` → chiedi: *"Generate tests for the DELETE /todos/:id endpoint"*
5. Agenti integrati nella CLI:
   ```bash
   copilot -p "Review the staged changes for security issues"
   # Copilot può delegare automaticamente all'agente code-review
   ```

**📁 Agenti in questo repo:**

- `todo-backend.agent.md` — specialista backend Express.js
- `todo-frontend.agent.md` — specialista frontend Astro
- `todo-testing.agent.md` — specialista testing Jest + Playwright
- `todo-database.agent.md` — specialista database SQLite

---

### 2.4 Skills ⭐

**Cosa sono:** Cartelle di istruzioni, script e risorse che Copilot carica quando sono rilevanti per migliorare le prestazioni su attività specializzate. L'innovazione chiave: le skill possono migliorare drasticamente i risultati anche con modelli leggeri.

**Dove risiedono:**

| Ambito | Posizione | Note |
|---|---|---|
| Repository | `.github/skills/<name>/SKILL.md` | Condivise con il team |
| A livello utente (personale) | `~/.copilot/skills/<name>/SKILL.md` | Riutilizzo cross-progetto (solo CLI + coding agent) |
| Org/Enterprise | 🔜 In arrivo | — |

**Quando usarle:** Workflow multi-step che devono essere ripetibili e rilevati automaticamente.
**Quando NON usarle:** Se le indicazioni devono applicarsi sempre → usa le Custom Instructions. Se hai bisogno di nuove capacità → usa gli MCP Servers.

📎 [Informazioni sulle Skills degli agenti](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

**🔧 Demo Pratica:**

1. Chiedi a Copilot: *"Create a new REST endpoint for managing todo categories"*
   - Osserva: Copilot carica automaticamente la skill `create-rest-endpoint`
   - La skill fornisce istruzioni passo-passo per la creazione di route Express.js
2. Chiedi: *"Create a new Astro component for todo statistics"*
   - Osserva: la skill `create-astro-component` si carica automaticamente
3. CLI:
   ```bash
   /skills list    # List available skills
   # Skills auto-load based on your prompt. Just describe the task:
   copilot -p "Add a GET /todos/stats endpoint"   # create-rest-endpoint skill loads automatically
   ```

**📁 Skills in questo repo:**

- `create-rest-endpoint/` — guida alla creazione di route Express.js
- `create-astro-component/` — builder per componenti Astro
- `add-database-migration/` — script di migrazione SQLite
- `generate-jest-tests/` — generazione suite di test Jest
- `generate-playwright-tests/` — test E2E Playwright
- `frontend-error-handling/` — feedback errori Bootstrap

---

### 2.5 Funzionalità di Personalizzazione Aggiuntive (CLI)

Oltre alle quattro leve principali, Copilot CLI supporta primitive di personalizzazione aggiuntive:

📎 [Confronto funzionalità CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)

| Funzionalità | Cosa fa | Quando usarla | Quando NON usarla |
|---|---|---|---|
| **Tools** | Capacità operative (lettura, modifica, ricerca, esecuzione) | Integrati; l'utente può consentire/negare per ogni tool | N/A — sempre presenti |
| **MCP Servers** | Connessione a sistemi esterni, API, database | Necessità di dati esterni o azioni specifiche del dominio | I tool integrati coprono le tue esigenze |
| **Hooks** | Comandi shell personalizzati in momenti del ciclo di vita (`preToolUse`, `postToolUse`, `userPromptSubmitted`, `sessionStart`, `sessionEnd`, `errorOccurred`, `agentStop`, `subagentStop`) | Guardrail, logging, applicazione di policy | Hai solo bisogno di prompting coerente → usa le Skills |
| **Subagents** | Processi agente delegati con finestra di contesto separata | Copilot decide automaticamente | N/A — comportamento runtime |
| **Plugins** | Bundle installabili (skill + agenti + hook + MCP) | Bundle per il team, distribuzione semplice | Sperimentazione locale → usa file locali |

---

### 2.6 Dove Può Risiedere Ogni Personalizzazione: Repo vs Utente vs Org

📎 [Cheat sheet personalizzazione](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
📎 [Matrice funzionalità](https://docs.github.com/en/copilot/reference/copilot-feature-matrix)
📎 [Supporto Custom Instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support)

> **Importante:** Non tutte le funzionalità di personalizzazione sono disponibili in tutti gli ambienti. La tabella seguente mostra cosa è supportato e dove — le differenze tra VS Code, CLI e GitHub.com sono significative.

#### Disponibilità delle Funzionalità: VS Code vs CLI vs GitHub.com

| Funzionalità | VS Code | CLI | GitHub.com | Note |
|---|---|---|---|---|
| **Custom Instructions** | ✅ | ✅ | ✅ | Tutti gli ambienti supportano il livello repo; la CLI aggiunge il file a livello utente |
| **Prompt Files** | ✅ | ✅ | ❌ | Non disponibili su GitHub.com |
| **Custom Agents** | ✅ | ✅ | ✅ | Tutti gli ambienti |
| **Skills** | ✅ (dalla 1.108) | ✅ | ✅ (coding agent) | Non in Visual Studio |
| **Hooks** | Preview | ✅ | ✅ (coding agent) | Principalmente CLI + GitHub.com coding agent |
| **MCP Servers** | ✅ | ✅ | ✅ | Tutti gli ambienti |
| **Subagents** | ✅ | ✅ | ❌ | Processo runtime, non configurato dall'utente |
| **Plugins** | ❌ | ✅ | ❌ | Funzionalità esclusiva CLI |
| **Fleet Mode** | ❌ | ✅ | ❌ | Funzionalità esclusiva CLI |

#### Dove Può Risiedere Ogni Personalizzazione: Repo vs Utente vs Org

| Funzionalità | Repo (`.github/`) | Livello utente | Org/Enterprise | Differenze chiave |
|---|---|---|---|---|
| **Custom Instructions** | ✅ `copilot-instructions.md`, `instructions/*.instructions.md`, `AGENTS.md` | ✅ **CLI**: `$HOME/.copilot/copilot-instructions.md` + variabile d'ambiente `COPILOT_CUSTOM_INSTRUCTIONS_DIRS`. **VS Code**: file in `~/.copilot/instructions/` o cartella istruzioni nel profilo VS Code (UI impostazioni deprecata dalla 1.102). **GitHub.com**: istruzioni personali nelle impostazioni | ✅ Istruzioni organizzazione tramite UI GitHub | CLI a livello utente è basata su file; VS Code/GitHub.com è basata su impostazioni |
| **Prompt Files** | ✅ `prompts/*.prompt.md` | ✅ **Solo VS Code**: cartella `prompts/` nel profilo utente. **CLI**: ❌ nessun livello utente | ❌ | I Prompt Files a livello utente sono una funzionalità esclusiva di VS Code |
| **Custom Agents** | ✅ `agents/*.agent.md` | ✅ Profilo utente (VS Code + CLI) | ✅ repo `.github-private` | Il livello più basso prevale sui conflitti di nome |
| **Skills** | ✅ `skills/<name>/SKILL.md` | ✅ **CLI + coding agent**: `~/.copilot/skills/`. **VS Code**: ✅ (dalla 1.108) | 🔜 In arrivo | Skill personali condivise tra progetti |
| **Hooks** | ✅ `hooks/*.json` | ❌ | ❌ | Solo a livello repo |
| **MCP Servers** | ✅ `mcp.json` + impostazioni repo | ✅ Config IDE utente (VS Code `.vscode/mcp.json`, config CLI) | ✅ tramite proprietà `mcp-servers` nelle config degli agenti | Il formato di configurazione varia per ambiente |
| **Subagents** | N/A (runtime) | N/A | N/A | Non configurati dall'utente |
| **Plugins** | N/A | ✅ Sistema plugin CLI (installati globalmente dall'utente) | N/A | Solo CLI |

> **Punto chiave:** Se la tua organizzazione non consente di committare file di configurazione AI nei repository, la soluzione alternativa è la configurazione a livello utente. Custom Instructions, Skills e Custom Agents supportano tutti il livello utente sia in VS Code che nella CLI. I Prompt Files sono a livello utente solo in VS Code (cartella `prompts/` nel profilo). Hooks e Plugins sono specifici per ambiente — gli hook sono solo a livello repo, i plugin sono solo CLI.

---

### 2.7 Le Modalità Operative: Ask, Plan, Agent, Autopilot, Fleet

| Modalità | VS Code | CLI | Quando usarla |
|---|---|---|---|
| **Ask** | Pannello chat (predefinito) | Prompt diretto | Domande rapide, spiegazioni |
| **Plan** | Modalità Plan nella chat | `/plan` | Analizzare il contesto → pianificare → confermare prima di agire |
| **Agent** | Modalità Agent (menu a tendina) | Modalità standard (agentica di default) | Attività complesse e iterative |
| **Autopilot** | Agent → Autopilot (VS Code 1.111+) | `--autopilot --allow-all` | Completamente autonomo, senza approvazioni |
| **Fleet** | N/A | `/fleet` | Attività parallelizzabili, subagent multipli |

#### Autopilot in VS Code (NOVITÀ!)

VS Code 1.111+ introduce tre livelli di approvazione per la modalità agent:

| Livello | Comportamento |
|---|---|
| **Default Approvals** | Chiede il permesso per ogni azione rischiosa (modifiche file, comandi terminale) |
| **Bypass Approvals** | Approva automaticamente tutte le esecuzioni degli strumenti, ma si ferma per domande bloccanti |
| **Autopilot** | Completamente autonomo — approva automaticamente gli strumenti E risolve le domande bloccanti |

Come modificare: Impostazioni VS Code → cerca "Copilot" → "Chat: Agent Approval Mode"

#### Fleet Mode (CLI) 🚀

📎 [Fleet Mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)

Il comando `/fleet` suddivide un'attività complessa in sotto-attività parallelizzabili e lancia subagent per eseguirle simultaneamente.

```bash
# Example: implement multiple features at once
/fleet "Add priority field to todos: update the database schema, add API endpoints for filtering by priority, and create a frontend priority selector component"
```

Ogni subagent ottiene la propria finestra di contesto. Ideale per implementazioni multi-file, refactoring su larga scala e operazioni batch.

**🔧 Demo Pratica — Confronto tra Modalità:**

Stessa attività in tutte le modalità per vedere la differenza:

1. **Modalità Ask:** *"How would you add a priority field to the todos?"*
   - Risultato: solo spiegazione, nessuna modifica al codice
2. **Modalità Plan (VS Code):** Passa a Plan → *"Add a priority field to todos"*
   - Risultato: Copilot produce un piano, attende l'approvazione
   - CLI: `/plan "Add a priority field to todos"`
3. **Modalità Agent:** Passa ad Agent → stesso prompt
   - Risultato: Copilot itera autonomamente — modifica file, esegue test, si auto-corregge
4. **Autopilot:** Abilita il livello di approvazione Autopilot → stesso prompt
   - Risultato: nessun prompt di approvazione, completamente autonomo
5. **Fleet (CLI):** `/fleet "Add priority field: schema + API + frontend component"`
   - Risultato: parallelizza in 3 subagent che lavorano simultaneamente

---

## Parte 3 — Approfondimento CLI: Funzionalità Esclusive 🖥️ (~10 min)

> Le basi della CLI e l'installazione sono state trattate nella [Parte 1](#setup--copilot-cli). Questa sezione si concentra sulle funzionalità esclusive della CLI.

📎 [Modalità Autopilot](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot)

### Perché usare la CLI invece di VS Code?

| Vantaggio CLI | Descrizione |
|---|---|
| **Fleet Mode** (`/fleet`) | Esecuzione parallela di subagent — non disponibile in VS Code |
| **Delegate** (`/delegate`) | Delega attività al Copilot coding agent nel cloud |
| **Plugins** (`/plugin install`) | Bundle di funzionalità installabili |
| **Hooks** | Guardrail programmabili negli eventi del ciclo di vita |
| **Autonomia completa** | `--allow-all` + `--autopilot` per lavoro batch non presidiato |
| **Scriptabile** | Pipe dei prompt, concatenamento con CI/CD, automazione di attività ripetitive |

### Delegate — Delega Attività al Cloud

📎 [Delegare attività](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-agents/delegate-tasks-to-cca)

Il comando `/delegate` invia la sessione CLI corrente al **Copilot coding agent su GitHub**. Questo ti permette di delegare il lavoro preservando tutto il contesto di cui Copilot ha bisogno. Copilot committa le modifiche non staged su un nuovo branch, apre una **pull request in bozza**, lavora in background e richiede la tua revisione al termine.

```bash
# Delegate a task — Copilot creates a branch, opens a draft PR, and works autonomously
/delegate Add comprehensive unit tests for all API endpoints and fix any failures

# Alternative syntax: prefix with &
& Refactor the Express routes into separate module files under backend/routes/
```

**Cosa succede:**
1. Copilot chiede di committare le modifiche non staged come checkpoint
2. Crea un nuovo branch
3. Apre una PR in bozza su GitHub
4. Lavora autonomamente nel cloud — ricevi un link per monitorare l'avanzamento
5. Al termine, richiede la tua revisione

**Ideale per:** modifiche massive, refactoring, generazione di test, documentazione — attività che preferisci non dover seguire manualmente.

### Hooks — Eventi del Ciclo di Vita

Gli Hooks ti permettono di eseguire comandi shell personalizzati in momenti specifici. Configurati in `.github/hooks/*.json`.

| Hook | Quando viene eseguito |
|---|---|
| `preToolUse` / `postToolUse` | Prima/dopo l'esecuzione di un tool |
| `userPromptSubmitted` | Quando l'utente invia un prompt |
| `sessionStart` / `sessionEnd` | All'inizio/fine della sessione |
| `errorOccurred` | Quando si verifica un errore |
| `agentStop` / `subagentStop` | Quando l'agente principale o un subagent completa |

Casi d'uso: bloccare modifiche a percorsi protetti, logging delle attività, applicazione di policy, logica di retry personalizzata.

### 🔧 Demo Pratica

```bash
# Full autonomy for batch work
copilot --autopilot --allow-all -p "Run all tests and fix any failures"

# Fleet mode — parallel execution
/fleet "Add todo categories: create the database table, API endpoints, and frontend selector"

# Disable instructions to see the difference
copilot --no-custom-instructions -p "Add a new endpoint"
```

> **Punto chiave:** La CLI è lo stesso Copilot con le stesse personalizzazioni, solo nel terminale. Usala quando hai bisogno di Fleet Mode, Hooks, Plugins o automazione non presidiata.

---

## Parte 4 — Best Practice: Modelli, Premium Request e Casi d'Uso Reali ⭐ (~30 min)

**Il cuore della sessione.** Orientato ai casi d'uso, con esempi concreti.

### 4.1 Scegliere il Modello Giusto

📎 [Confronto modelli](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)

#### Raccomandazioni Ufficiali GitHub

GitHub fornisce raccomandazioni organizzate per area di attività. Sono un utile **punto di partenza**, ma non l'ultima parola:

| Area di Attività | Modelli Raccomandati | Perché |
|---|---|---|
| **Coding general-purpose** | GPT-5.3-Codex, GPT-5 mini, Grok Code Fast 1, Raptor mini | Veloci, accurati, buon default per la maggior parte delle attività |
| **Aiuto rapido / attività semplici** | Claude Haiku 4.5, Gemini 3 Flash | Ultra-veloci, basso costo, ideali per modifiche rapide |
| **Ragionamento approfondito e debug** | GPT-5.4, Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro | Analisi complessa, comprensione multi-file |
| **Sviluppo agentico** | GPT-5.4 mini, GPT-5.2-Codex, GPT-5.3-Codex, GPT-5.1-Codex-Max | Ottimizzati per workflow agentici autonomi |
| **Elementi visivi (screenshot, UI)** | GPT-5 mini, Claude Sonnet 4.6, Gemini 3.1 Pro | Supporto input multimodale |

#### Benchmark Pubblici — Fai le Tue Ricerche

Oltre alle raccomandazioni di GitHub, diversi **benchmark indipendenti e pubblici** monitorano le prestazioni dei modelli su attività di coding reali. Sono utili per formarsi un'opinione propria:

| Benchmark | Cosa misura | Link |
|---|---|---|
| **SWE-bench** | Issue reali di GitHub — il modello è in grado di generare patch che superano i test? | [swebench.com](http://www.swebench.com/) |
| **Aider Polyglot** | Editing di codice multi-linguaggio (C++, Go, Java, JS, Python, Rust) — 225 casi pratici | [aider.chat/docs/leaderboards](https://aider.chat/docs/leaderboards/) |
| **LiveCodeBench** | Problemi freschi di programmazione competitiva — previene la memorizzazione | [livecodebench.github.io](https://livecodebench.github.io/) |
| **LiveBench** | Attività diverse e aggiornate regolarmente con categorie di coding, ragionamento e agentic | [livebench.ai](https://livebench.ai/) |

> **Un parere onesto:** I benchmark e le raccomandazioni ufficiali sono punti di partenza, non verità assolute. I modelli evolvono rapidamente — quello che era il migliore il mese scorso potrebbe non esserlo oggi. Le differenze tra i modelli di punta sono spesso **marginali** (pochi punti percentuali nei benchmark), e **il tuo specifico codebase, linguaggio e workflow** contano più di qualsiasi classifica.
>
> L'approccio migliore: **prova diversi modelli sulle tue attività reali**, confronta i risultati e sviluppa la tua intuizione. Quello che funziona per una pipeline dati Python potrebbe non essere la scelta migliore per un frontend React. Usa `/model` nella CLI o il selettore modelli in VS Code per sperimentare.

#### Casi d'Uso Pratici

| Caso d'Uso | Modello Raccomandato | Moltiplicatore | Punto Chiave |
|---|---|---|---|
| Revisione approfondita PR | Claude Opus 4.6 (premium) | 3x | L'analisi complessa merita un modello premium |
| Pianificazione/architettura + revisione | Opus per l'analisi → GPT-5.4 per il fix | 3x + 1x | Pattern multi-modello: revisione premium, fix standard |
| Refactoring / implementazione | GPT-5.4 | 1x | GPT + Codex unificati, supporto agent nativo |
| Attività rapide e leggere | GPT-5.4 mini | 1x | Benchmark quasi premium a costo standard |
| Documentazione / commenti | Modello del tier gratuito | 0x | Mantieni la scrittura ripetitiva leggera |
| Auto-compilazione descrizione PR | Modello gratuito + prompt file | 0x | Automatizza con selezione automatica del modello |
| Generazione messaggi di commit | Modello gratuito + prompt file | 0x | Cronologia git coerente a costo zero |
| **Manipolazione Excel** ⭐ | GPT-5.4 o Claude Sonnet | 1x | Aggiungere colonne, confrontare file, creare riepiloghi |
| Generazione PowerPoint | GPT-5.4 + script Python | 1x | Automazione report con agent |
| Controlli basilari (git status) | Gratuito o manuale | 0x | Non sprecare premium per attività banali |
| **Code Review su PR** 🔍 | Selezionato automaticamente da GitHub | variabile | Revisione AI direttamente sulla pull request |

> **Nota:** I moltiplicatori dei modelli cambiano nel tempo. Usa `/model` nella CLI o controlla il selettore modelli in VS Code per vedere i moltiplicatori attuali. Consulta i [modelli supportati](https://docs.github.com/en/copilot/reference/ai-models/supported-models) per le informazioni più recenti.

#### Pattern Multi-Modello

Combina i modelli in base ai loro punti di forza, non solo al costo:

1. **Analizza** con un modello di ragionamento profondo (Opus 4.6 a 3x, o GPT-5.4 a 1x) — ottieni una comprensione approfondita
2. **Implementa** con un modello veloce e general-purpose (GPT-5 mini a 0x sui piani a pagamento) — applica le modifiche rapidamente a costo premium zero
3. **Revisiona** il risultato con il modello di ragionamento profondo — cattura i casi limite

> Il vero risparmio viene dall'usare **modelli inclusi (costo 0x)** per il lavoro semplice, riservando i modelli premium per attività che necessitano genuinamente di un ragionamento più profondo.

#### Selezione Automatica del Modello

In VS Code, abilitare la selezione automatica del modello permette a Copilot di scegliere il modello migliore per ogni attività.
**Bonus:** La selezione automatica del modello offre uno **sconto del 10%** sul moltiplicatore del modello.

📎 [Informazioni sulla selezione automatica del modello](https://docs.github.com/en/copilot/concepts/auto-model-selection)

**🔧 Demo Pratica:**

1. In VS Code, clicca il selettore modelli → scegli modelli diversi per lo stesso prompt
2. Confronta: chiedi *"Review backend/index.js for security issues"* con GPT-5 mini vs Claude Opus 4.6
3. Nella CLI:
   ```bash
   copilot --model claude-opus-4.6 -p "Review backend/index.js for security vulnerabilities"
   copilot --model gpt-5-mini -p "Add a comment to the GET /todos endpoint"
   ```

#### Errori Comuni da Evitare

- ❌ Usare una premium request per chiedere *"Did I commit my changes?"* — controlla manualmente o usa un modello gratuito
- ❌ Usare Opus (3x) per attività che GPT-5.4 (1x) gestisce altrettanto bene — 3 volte il costo per un miglioramento marginale
- ❌ Non selezionare il modello appropriato — rende Copilot frustrante quando è solo un mismatch di modello
- ❌ Scrivere prompt vaghi — anche con modelli premium, prompt scadenti sprecano l'intera quota

---

### 4.2 Premium Request: Come Funzionano DAVVERO ⭐⭐

📎 [Richieste in GitHub Copilot](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)
📎 [Premium request (fatturazione)](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests)

#### La Regola Fondamentale

> *"For agentic features, only the prompts you send count as premium requests; actions Copilot takes autonomously to complete your task, such as tool calls, do not."*
> — [GitHub Docs](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)

Questa è la cosa più importante da capire sulla fatturazione delle premium request.

#### Cosa Conta vs. Cosa Non Conta

| La Tua Azione | Conta come Premium? | Costo |
|---|---|---|
| Ogni prompt che invii nella chat | ✅ Sì | 1 × moltiplicatore del modello |
| Chiamate autonome dei tool dell'agente (lettura file, modifiche, test) | ❌ No | Gratuito |
| Comando `/plan` nella CLI | ✅ Sì | 1 premium request |
| Ogni prompt di follow-up dopo `/plan` | ✅ Sì | 1 × moltiplicatore del modello |
| Messaggio di orientamento durante la sessione dell'agente | ✅ Sì | 1 × moltiplicatore del modello |
| L'agente che itera internamente (modifica → test → fix → retry) | ❌ No | Gratuito |

#### Premium Request per Contesto

##### 1. VS Code Chat

- Ogni prompt = **1 × moltiplicatore del modello**
- Selezione automatica del modello = **sconto del 10%** sul moltiplicatore
- Modelli inclusi (GPT-5 mini, GPT-4.1, GPT-4o) = **0 premium request** sui piani a pagamento
- 📎 [Selezione automatica del modello](https://docs.github.com/en/copilot/concepts/auto-model-selection)

##### 2. Copilot CLI

- Stessa logica: ogni prompt = **1 × moltiplicatore del modello**
- Nessun moltiplicatore aggiuntivo per l'interfaccia
- Fleet Mode: `/fleet` — ⚠️ ogni subagent interagisce con l'LLM indipendentemente, quindi fleet **potrebbe consumare PIÙ premium request** rispetto a una singola sessione agent. Il compromesso è velocità vs. costo.

##### 3. Coding Agent (remoto, su GitHub)

- **1 premium request per sessione × moltiplicatore del modello** — una sessione con un modello 3x costa 3 premium request
- Una sessione inizia quando assegni un'attività → termina quando viene completata
- Un nuovo commento di steering su una sessione esistente = **nuova premium request**
- SKU di fatturazione dedicato da novembre 2025 per il tracciamento separato
- 📎 [Gestione agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/agent-management)

##### 4. Code Review su PR

- La fatturazione delle premium request per la code review è trattata nella [Parte 5](#code-review-su-pull-request-).

##### 5. Pianificazione + Esecuzione (Pattern Agentico)

- `/plan` = **1 premium request**
- Approvazione del piano e inizio esecuzione = **1 premium request**
- Tutte le chiamate ai tool durante l'esecuzione = **❌ Gratuite**
- Steering durante l'esecuzione = **1 premium request per messaggio**

##### 6. Fleet Mode

- ⚠️ **Fleet può consumare PIÙ premium request**, non meno
- Ogni subagent interagisce con l'LLM indipendentemente → più interazioni LLM = più premium request consumate
- Il beneficio è la **velocità** (esecuzione parallela), non il risparmio sui costi
- I subagent usano un modello a basso costo per default, ma puoi specificare modelli premium per sotto-attività
- **Compromesso:** completamento più rapido vs. consumo maggiore di premium request
- Usa `/model` per controllare il modello corrente e il suo moltiplicatore prima di eseguire `/fleet`
- 📎 [Fleet Mode](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)

#### Chi Paga? (Enterprise/Organizzazione)

| Domanda | Risposta |
|---|---|
| Chi viene fatturato? | L'**organizzazione o enterprise** proprietaria della licenza Copilot — NON l'utente individuale |
| Licenze multiple? | L'utente deve selezionare quale entità viene fatturata tramite il menu a tendina "Usage billed to" |
| Controlli di budget? | Gli amministratori possono impostare limiti **per org**, **per SKU** (coding agent vs chat vs review) |
| Cosa succede in caso di eccedenza? | $0.04/richiesta oltre la quota (se abilitato dalla policy dell'amministratore) |

📎 [Gestione della quota di premium request](https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances)

#### Quota per Piano

| Piano | Premium Request/mese | Modelli Inclusi (costo 0x) | Eccedenza |
|---|---|---|---|
| Free | 50 (limite rigido) | Selezione limitata | Non disponibile |
| Pro | 300 | GPT-5 mini, GPT-4.1, GPT-4o | $0.04/richiesta |
| Pro+ | 1.500 | Come Pro | $0.04/richiesta |
| Business | 300/utente | Come Pro | $0.04/richiesta |
| Enterprise | 1.000/utente | Come Pro | $0.04/richiesta |

#### Budget e Governance

- Modelli diversi hanno moltiplicatori diversi (vedi la documentazione sul confronto modelli)
- Imposta limiti di spesa a livello di organizzazione o enterprise per centro di costo
- Dashboard di analisi delle premium request disponibile da settembre 2025
- Coding Agent e Spark hanno SKU di fatturazione dedicati per un tracciamento granulare

---

## Parte 5 — Copilot Oltre il Codice: Excel e PowerPoint 📊 (~10 min)

Copilot non è solo per sviluppatori. Può manipolare file come Excel e generare presentazioni.

### Lavorare con Excel

Chiedi a Copilot di lavorare con file Excel in linguaggio naturale:

```
"Analyze the structure of this Excel file — how many rows, columns, what data does it contain?"
"Add a calculated column that is the sum of columns A and B"
"Create a new summary sheet with totals per category"
"Compare these two Excel files and give me a diff report"
"Reformat this Excel with colored headers and auto-filters"
```

> **Come funziona:** Copilot genera ed esegue script Python (openpyxl/pandas) dietro le quinte. Descrivi quello che vuoi in linguaggio naturale — non è richiesto alcun codice.

### Generazione PowerPoint — Esempio Reale con una Skill di Copilot

Un esempio concreto di Copilot che genera presentazioni PowerPoint è la skill **[copilot-updates](https://github.com/devartifex/copilot-updates)**. È una skill open-source per Copilot che:

- Recupera articoli dal [GitHub Changelog](https://github.blog/changelog/) per intervallo di date e label
- Genera riepiloghi strutturati con note per il relatore
- Produce un deck `.pptx` completo con python-pptx — pronto per aggiornamenti agli stakeholder

Installala come **skill personale** (disponibile in tutti i tuoi progetti):

```bash
# Clone into your user skills directory
git clone https://github.com/devartifex/copilot-updates ~/.copilot/skills/copilot-updates

# Install Python dependencies
cd ~/.copilot/skills/copilot-updates/scripts && pip install -e .
```

Poi chiedi semplicemente a Copilot:

```
"Generate a PowerPoint with all GitHub Copilot updates from the last 2 weeks in Italian"
"Summarize the GitHub changelog for Actions and Security from March 1 to March 15"
```

Copilot carica automaticamente la skill ed esegue l'intera pipeline: recupero → riepilogo → traduzione → generazione `.pptx`.

> Questo è un ottimo esempio di **skill come strumenti riutilizzabili cross-progetto** — installate una volta in `~/.copilot/skills/`, disponibili ovunque, senza modifiche al repo.

### Code Review su Pull Request 🔍

📎 [Informazioni sulla code review](https://docs.github.com/en/copilot/concepts/agents/code-review)

| Aspetto | Dettaglio |
|---|---|
| **Come attivarla** | Dalla PR → clicca "Copilot" → "Review", oppure configura la revisione automatica a livello org/repo |
| **Modello utilizzato** | Selezionato automaticamente da GitHub (non configurabile dall'utente) |
| **Costo premium** | 1 premium request (fisso). **Revisioni automatiche:** addebitate alla quota dell'autore della PR. **Revisioni manuali:** addebitate alla quota dell'utente richiedente |
| **Configurare la severità** | Usa `.github/copilot-instructions.md` (a livello repo) o `.github/instructions/code-review.instructions.md` (specifico per percorso) |

**🔧 Demo Pratica:**

1. Crea una PR con le modifiche della modalità scura fatte in precedenza
2. Clicca "Copilot" → "Review" sulla PR
3. Osserva i commenti della revisione
4. Mostra il file `instructions/code-review.instructions.md` che controlla cosa Copilot segnala durante la revisione
5. Discuti: senza questo file, Copilot potrebbe segnalare problemi banali (come `todo` vs `TODO:`)

---

## Parte 6 — Prossimi Passi e Argomenti Proposti (~10 min + Q&A)

### Sessioni Future Proposte

| Argomento | Descrizione |
|---|---|
| **Approfondimento Coding Agent** | Agenti remoti, costi, workflow completi da issue a PR |
| **Governance della Personalizzazione di Copilot** | Condivisione di istruzioni, agenti, skill tra organizzazioni |
| **MCP in Enterprise** | Integrazioni GitHub + Azure, scenari di governance |
| **Jira + Coding Agent** | Workflow da issue a PR automatizzata |
| **GitHub Copilot SDK** | Costruire app personalizzate con integrazione Copilot |

### Q&A

Invia le domande durante la sessione — saranno affrontate nel corso dell'evento e in questo segmento finale.

---

## Appendice A — Riferimento Completo alle Personalizzazioni

📎 [Confronto funzionalità CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features)

| Requisito | Opzione Migliore |
|---|---|
| Convenzioni del repository sempre attive | **Custom Instructions** |
| Workflow ripetibile su richiesta | **Skills** |
| Attività singola e mirata con input diversi | **Prompt Files** |
| Aiuto specializzato per un'area specifica | **Custom Agents** |
| Guardrail e policy sugli strumenti | **Hooks** |
| Integrazione con servizi esterni | **MCP Servers** |
| Attività complesse delegate automaticamente | **Subagents** (automatici) |
| Bundle di funzionalità distribuibile | **Plugins** |

---

## Appendice B — Riferimento Rapido dei Comandi

### VS Code

| Azione | Come |
|---|---|
| Aprire Copilot Chat | `Ctrl+Alt+I` (Windows) / `Cmd+Alt+I` (Mac) |
| Cambiare modalità (Ask/Plan/Agent) | Menu a tendina in cima al pannello chat |
| Selezionare un agente | Menu a tendina agenti nella chat |
| Allegare un prompt file | Digita `/` e seleziona il prompt file |
| Cambiare modello | Menu a tendina selettore modelli |
| Abilitare Autopilot | Impostazioni → "Chat: Agent Approval Mode" → Autopilot |

### CLI

| Azione | Comando |
|---|---|
| Avviare la chat | `copilot -p "your prompt"` |
| Modalità Plan | `/plan "task description"` |
| Fleet Mode | `/fleet "complex task"` |
| Elencare le skill | `/skills list` |
| Invocare una skill | Le skill si caricano automaticamente; usa `/skills list` per vedere quelle disponibili |
| Installare un plugin | `/plugin install PLUGIN-NAME` |
| Consentire un tool specifico | `--allow-tool TOOL` |
| Saltare tutti i permessi | `--allow-all` (o `--yolo`) |
| Disabilitare le istruzioni | `--no-custom-instructions` |
| Selezionare un modello | `--model MODEL-NAME` |

---

## Appendice C — Link alla Documentazione Ufficiale

| Argomento | URL |
|---|---|
| Confronto Modelli | https://docs.github.com/en/copilot/reference/ai-models/model-comparison |
| Funzionalità di Personalizzazione CLI | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features |
| Cheat Sheet Personalizzazione | https://docs.github.com/en/copilot/reference/customization-cheat-sheet |
| Premium Request | https://docs.github.com/en/copilot/concepts/billing/copilot-requests |
| Premium Request (Fatturazione) | https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests |
| Selezione Automatica del Modello | https://docs.github.com/en/copilot/concepts/auto-model-selection |
| Code Review | https://docs.github.com/en/copilot/concepts/agents/code-review |
| Fleet Mode | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet |
| Autopilot (CLI) | https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot |
| Coding Agent | https://docs.github.com/en/copilot/concepts/agents/coding-agent/agent-management |
| Configurazione Custom Agents | https://docs.github.com/en/copilot/reference/custom-agents-configuration |
| Skills degli Agenti | https://docs.github.com/en/copilot/concepts/agents/about-agent-skills |
| Custom Instructions | https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions |
| Gestione Quota Premium | https://docs.github.com/en/copilot/how-tos/manage-and-track-spending/manage-request-allowances |

---

*Questa guida è stata creata come compagna per un workshop hands-on su GitHub Copilot. Tutte le informazioni provengono dalla documentazione ufficiale GitHub.*
