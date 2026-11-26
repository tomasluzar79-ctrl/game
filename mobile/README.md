# Fíbí pro iOS a Android

Mobilní aplikace používají stejný Canvas a herní logiku jako verze na GitHub Pages. Každé sestavení obsahuje soubory hry a funguje i bez připojení. Na dotykovém displeji je pohyb vlevo a akce vpravo. Hra podporuje obě orientace.

Z kořene repozitáře připrav oba projekty po každé změně hry:

```sh
cd mobile
npm ci
npm run sync
```

## Android

Použij JDK 21 a Android SDK 36. Pro ladicí APK spusť v adresáři `mobile`:

```sh
cd android
./gradlew assembleDebug
```

Výsledný balíček je v `app/build/outputs/apk/debug/app-debug.apk` uvnitř adresáře `android`. Projekt můžeš také otevřít v Android Studiu příkazem `npm run open:android`.

## iOS

Na macOS s Xcode 26+ spusť v adresáři `mobile` příkaz `npm run open:ios`. V Xcode zvol schéma App a simulátor nebo vlastní iPhone. Pro instalaci na iPhone nastav v Signing & Capabilities svůj vývojářský tým.

## Verze v prohlížeči

Na iPhonu otevři hru v Safari a zvol **Sdílet → Přidat na plochu**. Chrome na Androidu nabízí instalaci v nabídce stránky. Po prvním načtení online může uložená webová hra běžet i offline.
