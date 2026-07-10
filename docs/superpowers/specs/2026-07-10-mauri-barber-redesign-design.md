# Mauri Barber — Visual Redesign

Date : 2026-07-10

## Contexte

Le site (voir [2026-07-10-mauri-barber-landing-design.md](./2026-07-10-mauri-barber-landing-design.md)) est fonctionnel mais le client a fourni une référence de style qu'il préfère : `4-mauri-plata.html`, un template éditorial fort (typographie condensée en majuscules, dégradé "argent" en accent, bandeau diagonal façon enseigne de barbier, liste de services numérotée avec prix, section équipe, citation client). Objectif : reprendre cette identité visuelle en remplaçant l'argent par la charte noir/blanc/doré déjà en place, sans repartir de zéro (le contenu, l'i18n, WhatsApp, les vrais avis Google, les horaires/contact restent identiques).

Décisions validées avec le client via aperçus visuels :

- **Doré** : couleur pleine et mate (pas de dégradé brillant type "métal qui brille" — jugé trop voyant). Les tokens existants `--color-gold` (fond sombre) et `--color-gold-dark` (fond clair, contraste accessible) sont réutilisés tels quels, aucun nouveau token de couleur nécessaire.
- **Typographie** : remplacement de Playfair Display + Inter par **Bebas Neue** (titres, condensé majuscules) + **Work Sans** (texte courant), jugé plus cohérent avec l'identité "barbershop".
- **Bandeau diagonal animé** : conservé (élément signature, ex. "FADES DE PRECISIÓN · AFEITADO CLÁSICO · DISEÑO DE BARBA" en défilement continu), placé entre le Hero et les Services.
- **Section Équipe** : non reprise (pas d'infos sur une équipe). Remplacée par une nouvelle section **"Nuestra historia"** : photo du barbier (placeholder, comme les autres photos du site) + texte de présentation.
- **Prix des services** : ajoutés en placeholder (prix d'exemple, clairement à corriger avec le client avant mise en ligne), remplaçant la grille de cartes actuelle par une liste numérotée (index / nom+description / prix) comme dans la référence.
- **Citation client en grand format** : non reprise. La grille d'avis Google existante (3 vrais avis) suffit.
- **Photos** : restent en couleur (pas de filtre noir et blanc appliqué).

## Ce qui ne change pas

- Contenu bilingue ES/EN via `lib/dictionaries.ts` + `messages/{es,en}.json`
- Bouton/CTA WhatsApp (+34664301664), flottant + inline
- Menu mobile hamburger de la Navbar
- Section Horaires/Contact avec carte Google Maps embed
- Les 3 vrais avis Google (Ronaldo, Augusto De Chico, Henrique Nascimento) — non modifiés
- SEO : JSON-LD `HairSalon`, sitemap, robots.txt, génération statique ES/EN
- Structure du dépôt, pas de nouvelle dépendance (toujours pas de librairie i18n)

## Changements par fichier

**Design tokens** (`app/globals.css`, `app/layout.tsx`) :
- Remplacer les polices chargées via `next/font/google` : `Inter` → `Work_Sans`, `Playfair_Display` → `Bebas_Neue`.
- Renommer le token Tailwind `--font-serif` en `--font-display` (Bebas Neue n'est pas une serif — le nom doit refléter son usage réel : titres/accents en majuscules condensées). Toutes les utilisations de la classe `font-serif` dans les composants existants deviennent `font-display`.
- Couleurs : aucun changement (`--color-ink`, `--color-paper`, `--color-gold`, `--color-gold-dark`, `--color-gold-soft` réutilisés tels quels).

**Logo** (`components/Logo/Logo.tsx`) :
- Ajout d'une petite icône ronde décorative à rayures diagonales (noir/blanc/doré, en CSS pur, pas d'image) à côté du texte, comme repère visuel temporaire en attendant le vrai logo du client. Le texte passe en `font-display` majuscules.

**Navbar** (`components/Navbar/Navbar.tsx`) :
- Reskin visuel uniquement (police, logo avec icône) — la logique (menu mobile, switch de langue, CTA WhatsApp) ne change pas.

**Hero** (`components/Hero/Hero.tsx`) :
- Titre en `font-display`, majuscules, plus imposant (tailles `clamp` plus grandes façon éditoriale). Le mot mis en avant reste en doré plein (`text-gold`), pas de dégradé.

**Nouveau composant `StripeBand`** (`components/StripeBand/StripeBand.tsx`) :
- Bandeau de rayures diagonales CSS (`repeating-linear-gradient`, noir/blanc/doré) avec un texte qui défile en boucle (`@keyframes`), 3 courtes phrases tirées du dictionnaire (`stripeBand.items`). Placé entre `Hero` et `Services` dans `app/[locale]/page.tsx`.

**Services** (`components/Services/Services.tsx`) :
- Remplacement de la grille de cartes par une liste de lignes numérotées (index `01`–`06`, nom + description, prix aligné à droite), séparées par des bordures fines, comme dans la référence. Ajout d'un champ `price` par item dans `messages/{es,en}.json` (prix d'exemple) et d'une note `services.priceNote` visible sous la liste indiquant que les prix sont indicatifs.

**Nouveau composant `Historia`** (`components/Historia/Historia.tsx`) :
- Section deux colonnes (photo du barbier + texte : eyebrow, titre, un ou deux paragraphes), fond sombre (`bg-ink`/`text-paper`), placée entre `Gallery` et `Reviews`. Nouveau contenu dans `messages/{es,en}.json` sous une clé `historia` (`eyebrow`, `title`, `paragraph`). Nouvelle photo placeholder (`public/images/historia.jpg`, portrait, à sourcer comme les autres photos du site).

**Gallery** (`components/Gallery/Gallery.tsx`) :
- Passage à une grille asymétrique éditoriale (première photo en 2×2, une autre en pleine largeur sur 2 colonnes) plutôt qu'une grille uniforme carrée, comme dans la référence. Les photos restent en couleur (pas de `filter: grayscale`).

**Footer** (`components/Footer/Footer.tsx`) :
- Reskin visuel (logo avec icône, police).

**Page** (`app/[locale]/page.tsx`) :
- Insertion de `StripeBand` après `Hero`, insertion de `Historia` entre `Gallery` et `Reviews`.

## Hors périmètre (pour l'instant)

- Filtre noir et blanc sur les photos (explicitement refusé par le client).
- Section citation client séparée (explicitement refusée, la grille d'avis suffit).
- Section équipe (pas d'infos disponibles, remplacée par Historia).
- Vrais tarifs, vraie photo du barbier, vrai logo — restent des placeholders à remplacer plus tard (déjà le cas pour le reste du site).
