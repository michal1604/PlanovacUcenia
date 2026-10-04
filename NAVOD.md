# Emkin plánovač učenia – nasadenie na Netlify

Ukladanie online používa Netlify Functions a Netlify Blobs. Pri obyčajnom
pretiahnutí priečinka na app.netlify.com/drop sa funkcia nespustí, preto
treba jeden z týchto dvoch spôsobov.

## Spôsob A – cez GitHub (odporúčané)
1. Vytvor nový repozitár na GitHube a nahraj doň obsah tohto priečinka.
2. Na Netlify: Add new project → Import an existing project → GitHub → vyber repozitár.
3. Build command nechaj prázdny, Publish directory `.` (nastaví sa z netlify.toml).
4. Deploy. Každá ďalšia zmena v repozitári sa nasadí sama.

## Spôsob B – cez Netlify CLI
V priečinku spusti:
```
npm install
npx netlify-cli login
npx netlify-cli deploy --prod
```

## Prvé spustenie
1. Otvor stránku a ťukni na stav vpravo hore („Nastav synchronizáciu“).
2. Zadaj kód (aspoň 8 znakov), napr. `emka-ucenie-2026`.
3. Rovnaký kód zadaj na mobile. Plán sa potom synchronizuje medzi zariadeniami.

Na mobile si stránku pridaj na plochu (Safari: Zdieľať → Pridať na plochu).
