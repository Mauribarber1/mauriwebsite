# Landing page Mauri Barber — Design

Date : 2026-07-10

## Contexte

Site vitrine (landing page) pour un salon de barbier à Barcelone, client de l'agence. Objectif : présenter le salon, ses services, ses horaires et pousser vers une prise de contact WhatsApp. Pas de logo ni de vraies photos disponibles pour le moment — placeholders à remplacer plus tard.

## Informations client

- Nom : Mauri Barber
- Téléphone / WhatsApp : 664301664 (indicatif Espagne +34)
- Email : mauribcn@gmail.com
- Adresse : Carrer de Bilbao 38, 08005 Barcelona (quartier Sant Martí)
- Instagram : @maurilima71
- Horaires :
  - Lundi-Vendredi : 10h00-14h30, 15h30-20h00
  - Samedi : 9h00-18h00
  - Dimanche : fermé
- Couleurs de marque : blanc, noir, doré
- Avis Google (réels, fiche "Mauri barber", 5,0★ - 3 avis) :
  - Ronaldo : "I've been getting my hair cut by Mauricio since his previous barbershop, and I'm glad he didn't move far. He's an excellent barber with great attention to..."
  - Augusto De Chico : "Muy bueno. Increíble peluquero."
  - Henrique Nascimento : "Mauricio é excelente"

## Stack technique

- Next.js (App Router) + TypeScript + React
- Tailwind CSS v4
- Routing par locale `/es` (par défaut) et `/en`, structure `app/[locale]/...`, avec un système de dictionnaires JSON maison (`lib/dictionaries.ts` + `messages/{es,en}.json`) — pas de librairie i18n externe (`next-intl` etc.), pour rester cohérent avec le pattern déjà utilisé sur klentcreative et éviter une dépendance superflue
- `next/image` pour l'optimisation des images
- Contenu statique en dur dans `messages/es.json` et `messages/en.json` (pas de CMS/BDD)
- Déploiement visé : Vercel

Choix aligné sur la stack déjà utilisée par l'agence (projet klentcreative), pour cohérence et réutilisation de patterns connus.

## Structure de la page

1. **Navbar** — wordmark texte "MAURI BARBER" (placeholder, noir/doré), liens ancre (Servicios, Galería, Reseñas, Contacto), sélecteur de langue ES/EN, bouton WhatsApp visible.
2. **Hero** — photo de fond barbershop (temporaire, Unsplash), accroche + sous-titre, CTA principal "Reservar por WhatsApp", CTA secondaire "Ver servicios".
3. **Services** — grille de prestations types (à valider avec le client par la suite) : Corte de pelo, Corte + Barba, Arreglo de barba, Afeitado clásico, Corte niño, Coloración. Pas de prix affichés pour l'instant.
4. **Galería** — grille de photos temporaires (Unsplash, style barbershop noir/blanc/doré), remplaçables plus tard par les vraies réalisations.
5. **Reseñas** — les 3 avis Google réels listés ci-dessus, avec badge "5.0 ★ Google Reviews" et lien vers la fiche Google Maps du salon.
6. **Horarios & Contacto** — bloc horaires, adresse, téléphone, email, lien Instagram, carte Google Maps (iframe embed) sur l'adresse du salon.
7. **Footer** — wordmark, liens rapides, réseaux sociaux, mentions légères.

## Détails de contenu

- **Palette** : noir `#0A0A0A`, blanc `#FAFAFA`, doré `#C9A227` en accent.
- **Typographie** : serif élégante pour les titres (Playfair Display), sans-serif pour le texte courant (Inter).
- **Images** : recherche et téléchargement de photos libres de droits (Unsplash) sur le thème barbershop/coupe homme, stockées dans `public/images/`. Remplacement futur par les vraies photos du salon.
- **Logo** : aucun logo fourni → wordmark texte stylisé en attendant, facilement remplaçable par un composant `<Logo />` isolé.
- **WhatsApp** : bouton flottant + CTA principal, lien `https://wa.me/34664301664?text=...` avec message pré-rempli ("Hola, quiero reservar una cita").
- **Carte** : Google Maps embed (iframe) sur "Carrer de Bilbao 38, 08005 Barcelona".
- **i18n** : contenu ES par défaut, EN disponible via toggle, chaque section traduite dans `messages/{es,en}.json`.

## Hors périmètre (pour l'instant)

- Vraies photos du salon et vrai logo (à intégrer par le développeur plus tard).
- Système de réservation en ligne (remplacé par WhatsApp).
- Tarifs des prestations (non fournis par le client).
- Ajout d'avis Google supplémentaires (le client/développeur les ajoutera au fil de l'eau).
