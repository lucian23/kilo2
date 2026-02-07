# 800m Athletics Blog

Un blog Jekyll dedicat probei de atletism de 800 metri, cu articole despre tehnică, strategie, antrenament și pregătire mentală.

## 📋 Despre Proiect

Acest blog oferă resurse complete pentru atleți care practică proba de 800m, de la începători la avansați. Conține articole detaliate despre:

- Tehnica de alergare
- Strategii de cursă
- Programe de antrenament
- Pregătire mentală și psihologie sportivă
- Nutriție și recuperare

## 🚀 Instalare și Rulare

### Cerințe

- Ruby (versiunea 2.5 sau mai nouă)
- RubyGems
- Jekyll
- Bundler

### Pași de Instalare

1. **Clonează repository-ul**
```bash
git clone <repository-url>
cd 800m-athletics-blog
```

2. **Instalează dependențele**
```bash
bundle install
```

3. **Rulează serverul local**
```bash
bundle exec jekyll serve
```

4. **Vizualizează blogul**
Deschide browserul la `http://localhost:4000`

### Comenzi Utile

- **Build site-ul**: `bundle exec jekyll build`
- **Serve cu draft-uri**: `bundle exec jekyll serve --drafts`
- **Serve cu live reload**: `bundle exec jekyll serve --livereload`

## 📁 Structura Proiectului

```
.
├── _config.yml          # Configurare Jekyll
├── _layouts/            # Template-uri pentru pagini
│   ├── default.html     # Layout principal
│   └── post.html        # Layout pentru articole
├── _posts/              # Articolele blogului
│   ├── 2026-02-01-introducere-in-proba-de-800m.md
│   ├── 2026-02-02-tehnica-de-alergare-la-800m.md
│   ├── 2026-02-03-strategii-de-cursa-la-800m.md
│   ├── 2026-02-04-program-antrenament-800m.md
│   └── 2026-02-05-pregatire-mentala-800m.md
├── assets/
│   └── css/
│       └── style.css    # Stiluri CSS
├── index.html           # Pagina principală
├── despre.md            # Pagina "Despre"
└── README.md            # Acest fișier
```

## ✍️ Adăugarea de Articole Noi

Pentru a adăuga un articol nou:

1. Creează un fișier în directorul `_posts/` cu formatul: `YYYY-MM-DD-titlu-articol.md`

2. Adaugă front matter-ul la începutul fișierului:
```yaml
---
layout: post
title: "Titlul Articolului"
date: 2026-02-06 10:00:00 +0000
author: "Numele Autorului"
---
```

3. Scrie conținutul în format Markdown

4. Salvează și Jekyll va genera automat pagina

## 🎨 Personalizare

### Modificarea Culorilor

Editează fișierul `assets/css/style.css` pentru a schimba schema de culori:

```css
/* Gradient principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modificarea Configurației

Editează `_config.yml` pentru a schimba:
- Titlul site-ului
- Descrierea
- URL-ul de bază
- Alte setări Jekyll

## 📝 Articole Publicate

1. **Introducere în Proba de 800 Metri** - Prezentare generală a probei
2. **Tehnica Perfectă de Alergare** - Detalii despre forma corectă
3. **Strategii de Cursă** - Planificarea efortului și tactici
4. **Program de Antrenament** - Planuri pentru toate nivelurile
5. **Pregătirea Mentală** - Psihologia competiției

## 🤝 Contribuții

Contribuțiile sunt binevenite! Pentru a contribui:

1. Fork repository-ul
2. Creează un branch pentru feature-ul tău
3. Commit modificările
4. Push la branch
5. Deschide un Pull Request

## 📄 Licență

Acest proiect este open source și disponibil sub licența MIT.

## 📧 Contact

Pentru întrebări sau sugestii:
- Email: contact@800mathletics.ro
- Twitter: @800mAthletics

---

**Creat cu ❤️ pentru comunitatea de atletism**
