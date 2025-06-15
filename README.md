# Bad UX React Native Expo Uppgift 👋

Detta är ett React Native Expo-projekt som demonstrerar dåliga UX-mönster för utbildningsändamål.

## Installationsinstruktioner

### Förutsättningar
- Node.js (v16 eller högre)
- npm eller yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Klona repositoriet:
   ```bash
   git clone https://github.com/ChikiChirp/bad-ux-react-native-expo-assignment.git
   cd bad-ux-react-native-expo-assignment
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Konfigurera Firebase:
   - Kopiera `.env.example` till `.env`:
     ```bash
     cp .env.example .env
     ```
   - Ersätt placeholder-värdena i `.env` med din faktiska Firebase-konfiguration

4. Starta utvecklingsservern:
   ```bash
   npx expo start
   ```

## För Bedömare

### Firebase Setup (Obligatorisk för att appen ska fungera)

För att kunna testa denna app behöver du konfigurera Firebase:

1. **Skapa ett Firebase-projekt:**
   - Gå till https://console.firebase.google.com
   - Klicka på "Skapa projekt"
   - Följ instruktionerna för att skapa ett nytt projekt

2. **Aktivera Authentication:**
   - I Firebase Console, gå till "Authentication" > "Komma igång"
   - Gå till fliken "Sign-in method"
   - Aktivera "Email/lösenord" som inloggningsmetod

3. **Konfigurera Firestore Database:**
   - I Firebase Console, gå till "Firestore Database" > "Skapa databas"
   - Välj "Starta i testläge" för säkerhetsregler
   - Välj en plats för din databas (europe-west1 rekommenderas)

4. **Hämta Firebase-konfiguration:**
   - Gå till "Projektinställningar" (kugghjulet)
   - Scrolla ner till "Dina appar"
   - Klicka på "Lägg till app" och välj "Web"
   - Registrera appen med ett namn
   - Kopiera konfigurationsvärdena till din `.env`-fil

5. **Konfigurera .env-filen:**
   ```
   FIREBASE_API_KEY=din_api_nyckel
   FIREBASE_AUTH_DOMAIN=ditt_projekt_id.firebaseapp.com
   FIREBASE_PROJECT_ID=ditt_projekt_id
   FIREBASE_STORAGE_BUCKET=ditt_projekt_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=ditt_messaging_sender_id
   FIREBASE_APP_ID=ditt_app_id
   ```

**Viktigt:** Todo-funktionen kräver att Firestore Database är korrekt konfigurerad!

Om du behöver hjälp med Firebase-konfigurationen, kontakta studenten för demo-access eller test-credentials.

## Funktioner

Denna app demonstrerar olika dåliga UX-mönster inklusive:
- Dåligt navigationsflöde
- Förvirrande användargränssnittselement
- Dåliga tillgänglighetsmetoder
- Inkonsekventa designmönster
- Problematisk todo-funktionalitet

## Teknologier

- React Native
- Expo
- TypeScript
- Firebase (Authentication & Firestore)
- Expo Router
