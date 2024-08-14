# Portfolio Alexander Mersseman

Dit is een API ontwikkeld voor een gesloten forum waar EhB-studenten vragen kunnen stellen (anoniem of niet) en docenten deze vragen kunnen beantwoorden en bespreken in de reacties. De API is ontworpen met het oog op modulariteit, onderhoudbaarheid en gebruiksgemak.

## Projectstructuur

- **`src/`**: Bevat de broncode van het project.
  - **`controllers/`**: Behandelt de logica van de applicatie. Hier worden de inkomende verzoeken afgehandeld en de juiste reacties teruggestuurd.
  - **`models/`**: Definieert de datamodellen die de structuur van de gegevens in de database specificeren.
  - **`routes/`**: Behandelt de API-routes en koppelt ze aan de juiste controllers.
  - **`services/`**: Bevat de services en businesslogica die door de controllers worden aangeroepen.

- **`public/`**: Bevat statische bestanden zoals CSS, JavaScript en HTML.
  - **`css/`**: Stijlbladen voor de webpagina's.
  - **`js/`**: JavaScript-bestanden voor client-side logica.
  - **`index.html`**: De startpagina van de applicatie.
  - **`chat.html`**: De pagina voor chatfunctionaliteit.

- **`tests/`**: Bevat de tests voor de applicatie.
  - **`unit/`**: Unit tests voor afzonderlijke functies en modules.
  - **`integration/`**: Integratietests voor het testen van de interacties tussen verschillende onderdelen van de applicatie.
  - **`e2e/`**: End-to-end tests voor volledige gebruiksscenario's.

- **`.github/`**: Bevat GitHub workflows en CI/CD-configuraties.
  - **`workflows/`**: Automatische workflows voor continue integratie en levering (CI/CD).

- **`docker/`**: Bevat Docker-gerelateerde bestanden.
  - **`Dockerfile`**: Het Docker-bestand voor het bouwen van de applicatiecontainer.
  - **`docker-compose.develop.yml`**: Docker Compose-configuratie voor de ontwikkelomgeving.
  - **`docker-compose.production.yml`**: Docker Compose-configuratie voor de productieomgeving.
  - **`docker-compose.test.yml`**: Docker Compose-configuratie voor de testomgeving.

- **`.env`**: Bevat omgevingsvariabelen voor de applicatie. Dit bestand bevat gevoelige gegevens zoals databaseverbindingen en API-sleutels. Zorg ervoor dat dit bestand niet wordt opgenomen in versiebeheer.

- **`.gitignore`**: Lijst van bestanden en mappen die door Git worden genegeerd.

- **`CODE_OF_CONDUCT.md`**: Gedragscode voor bijdragers aan het project.

- **`CONTRIBUTING.md`**: Richtlijnen voor bijdragen aan het project.

- **`LICENSE`**: De licentie waaronder het project wordt verspreid.

- **`README.md`**: Dit bestand met informatie over het project.

- **`app.js`**: De hoofdapplicatiecode voor het starten van de server.

- **`package.json`**: Bevat metadata over het project en de afhankelijkheden.

- **`package-lock.json`**: Bevat de exacte versie van alle geïnstalleerde afhankelijkheden.

## Installatie

Volg de onderstaande stappen om het project op je lokale machine te installeren en te draaien:

1. **Clone de repository**:
   ```sh
   git clone https://github.com/gebruikersnaam/repository.git
   cd repository