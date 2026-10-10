# Backup de conversation — Projet livre-al-istibsar

> Sauvegarde de l'échange ayant conduit à la création / validation du projet
> **Next.js 14 (App Router) + Tailwind CSS** pour le livre historique
> **« الاستبصار في عجائب الأمصار »**.

---

## 1. Demande initiale (utilisateur)

> Projet Next.js pour livre Al-Istibsar
>
> Voici un prompt complet, structuré et autonome spécialement rédigé pour
> OpenCode. Il contient l'intégralité des instructions pas à pas pour créer le
> projet Next.js 14 + Tailwind CSS d'Al-Istibsar, écrire les fichiers, intégrer
> la recherche en temps réel et le lecteur avec réglage de typographie et
> navigation entre chapitres.
>
> **Mission :** générer et organiser l'intégralité du projet web pour
> « الاستبصار في عجائب الأمصار » (le livre historique) en utilisant
> **Next.js 14 (App Router)** et **Tailwind CSS**.
>
> Le projet doit être configuré pour une **exportation statique**
> (`output: 'export'`) afin d'être hébergé sur **Vercel / GitHub Pages**.

### Structure demandée

```
livre-al-istibsar/
├── package.json
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
├── postcss.config.js
├── lib/
│   └── data.js
└── app/
    ├── layout.js
    ├── page.js
    ├── globals.css
    └── [...slug]/
        └── page.js
```

### Contenu attendu des config

- `next.config.js` → `output: 'export'`, `trailingSlash: true`
- `tailwind.config.js` → couleurs `parchment: #f8f4eb`, `ink: #2c1810`, `gold: #9a7b4f`
- `jsconfig.json` → alias `@/* → ./*`
- `package.json` → Next 14.0.0, React 18.2.0, Tailwind 3.3.0

---

## 2. Données du livre (`lib/data.js`)

5 chapitres / 16 sections :

| Chapitre | Titre | Sections |
|----------|-------|----------|
| `part1` | الباب الأول: مكة المكرمة والمدينة المنورة | 1-1 → 1-5 |
| `part2` | الباب الثاني: مصر وعجائبها | 2-1 → 2-4 |
| `part3` | الباب الثالث: إفريقية (تونس والجزائر) | 3-1 → 3-2 |
| `part4` | الباب الرابع: المغرب الأقصى | 4-1 → 4-3 |
| `part5` | الباب الخامس: الأندلس | 5-1 |

`siteInfo` : titre, sous-titre (auteur anonyme, Marrakchi, VIe s. H. / XIIe s.),
description (édition dr. Saad Zaghloul Abdel Hamid).

---

## 3. Fonctionnalités implémentées

- **Page d'accueil** (`app/page.js`) : introduction, moteur de recherche en
  temps réel (filtre titres + contenus), accordéon du sommaire par chapitre.
- **Lecteur** (`app/[...slug]/client.js`) : affichage d'une section, contrôle de
  taille de police (صغير / متوسط / كبير / كبير جداً), navigation section
  précédente / suivante, génération statique de toutes les routes via
  `generateStaticParams`.
- **Design** : thème « parchemin / encre », RTL, typographie serif arabe.

---

## 4. Réponse de l'agent (OpenCode)

Vérification de l'état du projet :

- Tous les fichiers de configuration présents (`package.json`,
  `next.config.js` avec `output: 'export'`, `tailwind.config.js`,
  `jsconfig.json`, `postcss.config.js`).
- `lib/data.js` : 5 chapitres / 16 sections.
- `app/page.js` (recherche temps réel + accordéon) et
  `app/[...slug]/client.js` (lecteur + typographie + navigation prev/next)
  complets.
- `npm run build` → **succès**, 19 pages statiques générées dans `out/`.

```
Route (app)                              Size     First Load JS
┌ ○ /                                    4.7 kB         99.9 kB
├ ○ /_not-found                          875 B          88.6 kB
└ ● /[...slug]                           4.63 kB        99.8 kB
    ├ /part1/1-1
    ├ /part1/1-2
    ├ /part1/1-3
    └ [+12 more paths]
```

---

## 5. Push / Déploiement (fait)

- `git init`, `.gitignore` (node_modules, .next, out), commit initial sur `main`.
- Repo public créé : `ucfzem/livre-al-istibsar`.
- `next.config.js` rendu compatible GitHub Pages : `basePath`/`assetPrefix`
  activés via `GITHUB_PAGES=true`, `images.unoptimized`, `.nojekyll`.
- Build statique exporté et publié sur la branche **`gh-pages`**.
- **GitHub Pages** activé : source = branche `gh-pages`, dossier `/`.

> Le token utilisé n'avait pas le scope `workflow`, donc le déploiement se fait
> par la branche `gh-pages` (pas d'Actions). Rebuild + push `gh-pages` pour
> republier.

---

## 6. Intégration au link tree `/works`

- Hub : `ucfzem/ucfzem.github.io`, fichier `works/index.html`.
- Ajout de **Al-Istibsar** dans la section **« Projets publics »** (la section
  ouverte), **au milieu** de la liste : position **8** (après MicroInvoice),
  les suivants renumérotés 9 → 16.
- Icône choisie : **🧭** (boussole — géographie / récit de voyage).
- Tag : `Geography` · URL : `https://ucfzem.github.io/livre-al-istibsar/`
  (ouvre dans un nouvel onglet).
- Sous-titre mis à jour : « 15 projets publics » → « **16 projets publics** ».
- JSON-LD (`ItemList`) mis à jour en conséquence.
- Modification vérifiée par `diff` strict avant publication (aucune perte).

---

## 7. Liens

| Ressource | URL |
|-----------|-----|
| Site en ligne | https://ucfzem.github.io/livre-al-istibsar/ |
| Dépôt (source) | https://github.com/ucfzem/livre-al-istibsar |
| Branche de déploiement | https://github.com/ucfzem/livre-al-istibsar/tree/gh-pages |
| Link tree `/works` | https://ucfzem.github.io/works/ |
| Commit link tree | https://github.com/ucfzem/ucfzem.github.io/commit/724e5c84a549d4205221c851bd7c8bdeb300a9d0 |
| Commit correctif chunk (source) | https://github.com/ucfzem/livre-al-istibsar/commit/32e95c9 |
| Commit contenu texte intégral | https://github.com/ucfzem/livre-al-istibsar/commit/df65ae3 |
| Déploiement `gh-pages` (texte intégral) | https://github.com/ucfzem/livre-al-istibsar/commit/2396bfc |
| Déploiement `gh-pages` (correctif chunk) | https://github.com/ucfzem/livre-al-istibsar/commit/083837f |
| Ce backup | https://github.com/ucfzem/livre-al-istibsar/blob/main/CONVERSATION_BACKUP.md |

## 8. Thème clair/sombre + typographie (Nuzhat style)

Retour utilisateur : « pas de mode sombre/clair » et « polices différentes de
nuzhat-al-mushtaq ».

- **Polices** alignées sur `nuzhat-al-mushtaq.vercel.app` :
  - **Cairo** (interface) et **Amiri** (contenu du livre), chargées via
    `next/font/google` → auto-hébergées (aucune dépendance réseau au runtime).
- **Thème clair/sombre** :
  - Variables CSS `:root` (clair) et `[data-theme="dark"]` (sombre).
  - Bouton bascule 🌙/☀️ dans l'en-tête (`components/ThemeToggle.js`).
  - Préférence sauvegardée dans `localStorage['istibsar_theme']`.
  - Script d'amorçage **inline** pour éviter le flash au chargement.
- Palette alignée sur Nuzhat (vert / or / parchemin).

## 9. Correctif : « Application error » (chunk double-encodé)

**Symptôme** : « Application error: a client-side exception has occurred » lors de
la navigation côté client vers une section (ex. `/part4/4-1/`). La requête de
chunk partait double-encodée : `.../app/%255B...slug%255D/page-*.js` → **404** →
`ChunkLoadError`.

**Cause** : bug Next.js **#57829** — la présence d'un script
`beforeInteractive` déclenche un *monkey patch* webpack qui double-encode les
noms de chunks des routes dynamiques (segment `[...slug]`) en export statique.
Le chargement direct de l'URL fonctionnait, seule la navigation client cassait.

**Correctif** : remplacement du `<Script strategy="beforeInteractive">`
(amorçage du thème) par un `<script dangerouslySetInnerHTML>` inline dans
`app/layout.js` — commit **`32e95c9`**.

**Vérification** (Playwright, contre le site en ligne) : navigation client vers
les **15 sections** → 0 erreur applicative, 0 requête de chunk en 4xx, thème
sombre OK sans avertissement d'hydratation.

**Déploiement** : branche `gh-pages` mise à jour (force) → `083837f`.

## 10. Contenu : textes originaux intégrés

Retour utilisateur : les sections ne contenaient que des **résumés**, pas le
**texte original intégral**. Corrigé : le texte authentique a été extrait de
**المكتبة الشاملة** (https://shamela.ws/book/11684) et intégré.

- Nouveau fichier `lib/book-texts.js` (~500 Ko) : texte verbatim des **14
  sections** (la 15ᵉ, `5-1 الأندلس`, est conservée telle quelle — le livre n'a
  pas de chapitre sur l'Andalousie).
- `lib/data.js` fusionne `bookTexts` dans chaque section (`section.content`).
- `app/[...slug]/client.js` rend désormais le texte **paragraphe par
  paragraphe** (justifié, interligne `leading-loose`).
- Nettoyage : suppression des marqueurs de notes de bas de page (« ١ », « ا »…)
  et des numéros de page isolés.

### Répartition des pages (édition papier) par section

| Section | Pages | Contenu |
|---------|-------|---------|
| 1-1 | 1–9 | خطبة الكتاب، حدود حرم مكة، وصف مكة والجبال، الأرباض |
| 1-2 | 10–18 | ذرع الكعبة، البيت، السقف، الباب، الحجر الأسود |
| 1-3 | 19–36 | المقام، زمزم، المسجد الحرام، الصفا والمروة، المشاعر |
| 1-4 | 37–41 | مسجد النبي، الروضة، المنبر، المحراب، العمد |
| 1-5 | 42–44 | بقيع المدينة، مسجد قبا، قبور الشهداء |
| 2-1 | 45–49 | بلاد مصر والنيل وعجائبه |
| 2-2 | 50–77 | أخبار ملوك مصر، بناء الأهرام، شوندين، خبر يوسف |
| 2-3 | 78–81 + 92–96 | فتح مصر، الإسكندرية وصفة المنارة |
| 2-4 | 82–91 + 97–108 | مدن مصر (الفسطاط، الفيوم، تنيس…)، انتصار صلاح الدين |
| 3-1 | 109–120 + 142–153 | طرابلس، القيروان، سفاقس، تونس، البلاد الصحراوية، الجريد |
| 3-2 | 121–137 + 140–141 + 154–178 | قرطاجنة، المهدية، سوسة، بجاية، قسطيلية، المغرب الأوسط |
| 4-1 | 179–186 + 208–210 | بلاد المغرب، فاس، مراكش |
| 4-2 | 187–210 | مكناسة، غمارة، سجلماسة، درعة، أغمات، السوس، لمتونة، أودغست |
| 4-3 | 138–139 | طنجة، أصيلا، بحر الظلمات |
| 5-1 | 211–226 | بلاد السودان، صنغانة، تكرور، سلى، غانة، غياروا، تادمكة، دمدم (نصّ الكتاب الحقيقي، منقول من نهاية 4-2) |

Couverture : **pages 1–226 = 100 % du texte** (0 page manquante), vérifié.

### Vérification (Playwright, live)

Navigation client vers les 15 sections → 0 erreur, 0 chunk 4xx ; ex. `4-2`
affiche ~52 800 caractères / 173 paragraphes.

Source (domaine public) : `https://shamela.ws/book/11684` — édition
د. سعد زغلول عبد الحميد (دار النشر المغربية 1985 / بغداد 1986).

## 11. Contenu : remplacement de « الأندلس » par « بلاد السودان »

**Demande utilisateur** : remplacer le chapitre 5 (la section `5-1 الأندلس`,
qui n'existe pas dans le livre) par un chapitre sur **بلاد السودان**.

**Clarification** : le texte arabe joint par l'utilisateur portait en réalité sur
la **fondation de القيروان** (déjà couverte par la section `3-1`) ; il n'a donc
pas été utilisé. Pour rester fidèle au livre, le chapitre sur le Soudan a été
constitué à partir du **texte authentique de l'ouvrage lui-même**.

**Modifications** :

- `lib/book-texts.js` :
  - nouvelle clé `5-1` = chapitre verbatim
    « ذكر بلاد السودان ومدنها المشهورة وعجائبها ونبذ من سير ملوكها »
    (صنغانة، تكرور، سلى، قلنبوا، ترنكة، **غانة**، غياروا، تادمكة، دمدم، كوكوا…)
    — 13 760 caractères ;
  - clé `4-2` tronquée à 37 638 caractères (le chapitre Soudan + la خاتمة + le
    فهرس en ont été retirés / déplacés).
- `lib/data.js` : `part5.title` → « الباب الخامس: بلاد السودان » ; titre et
  résumé de `5-1` ; `siteInfo.description` (الأندلس → بلاد السودان).
- `app/page.js` : introduction de la page d'accueil mise à jour.
- `app/[...slug]/client.js` : inchangé (rendu paragraphe par paragraphe).

**Vérification** : `GITHUB_PAGES=true npm run build` → **19 pages statiques** ;
`out/part5/5-1/index.html` contient bien le texte du Soudan, et
`out/part4/4-2/index.html` ne contient plus le chapitre Soudan.

**Commits** :

| Étape | Commit |
|-------|--------|
| Source (`main`) | `09759c5` |
| Déploiement (`gh-pages`) | `8611e92` |

---

## 12. Améliorations UI : barre sticky + cartes de navigation rapide (Highlight Cards)

**Demande utilisateur** : deux améliorations sur le site `livre-al-istibsar` :
(1) **Highlight Cards** en tête du livre pour un accès en un clic aux
« عجائب » (القيروان، آبار ورجلان، غانة، العقيق، توريرى…) ; (2) **barre de
recherche collante (sticky)** pour continuer la recherche pendant le scroll.
La version HTML fournie par l'utilisateur était un démo statique ; les deux
améliorations ont donc été intégrées **dans le vrai projet Next.js** en
conservant tout de lui (accordéon, recherche plein texte, pages par section,
thème clair/sombre, polices Amiri/Aref).

**Modifications** :

- `app/page.js` :
  - tableau `highlights` (5 cartes : 🏛️ وضع القيروان، 🌴 آبار ورجلان العجيبة،
    🏺 بلاد غانة والذهب، 💎 معادن العقيق والسنبادج، 🌿 شجرة توريرى) ;
  - **cartes** (grid `sm:2`/`lg:3`) : icône + titre + note descriptive issue du
    réel texte (depuis Git) ; clic → `setSearchQuery(term)` (re-clic = efface),
    carte **active dorée** (`bg-gold`) + `aria-pressed` ;
  - encadré de recherche enveloppé dans `sticky top-2 z-40` (bg `paper`)
    → reste visible pendant le scroll.

  **Astuce déploiement** : pousser le commit de déploiement sur le branch
  `gh-pages` depuis un **détached HEAD** — `git worktree add` sur
  `origin/gh-pages` ne crée pas de branche locale nommée `gh-pages` ; puis
  `git -C <worktree> push <url> HEAD:gh-pages` (⚠️ toujours `-C` le worktree :
  depuis le repo principal, **HEAD = main** et le push serait rejeté).

- `app/globals.css` : inchangé en fin de compte (l'utilitaire `scrollbar-thin`
  ajouté pour les chips a été retiré après passage aux cartes grille).

**Vérification** : `npm run build` → OK (19 pages) ; live HTTP 200 sur
`/livre-al-istibsar/` et `/livre-al-istibsar/index.txt` ; le HTML servi contient
`sticky top-2`, « ✨ عجائب » et « ورجلان ».

⚠️ **Erreur de build corrigée (important)** : le premier déploiement (`07665ef`)
a été construit avec `npm run build` **sans** `GITHUB_PAGES=true`. Comme
`next.config.js` active `basePath`/`assetPrefix` uniquement avec cette variable,
le HTML exporté référençait des assets racine `/_next/...` → **404** sur GitHub
Pages (aucun CSS/JS : l'utilisateur ne voyait pas les cartes). Correctif :
**toujours construire avec `GITHUB_PAGES=true npm run build`**, puis vérifier
qu'`out/index.html` référence `/livre-al-istibsar/_next/...`.

**V2 des cartes** : après un deuxième retour « toujours pas de cartes »,
nouvelles **cartes-boutons dans une grille** (titre + note du réel texte) — 200.

**Commits** :

| Étape | Commit |
|-------|--------|
| Source (`main`) | `48b544a` (UI), puis commit de ce backup |
| Déploiement corrigé (`gh-pages`) | `2e453b8` → `360b2f1` (cartes V2) |

---

*Généré automatiquement par OpenCode.*
