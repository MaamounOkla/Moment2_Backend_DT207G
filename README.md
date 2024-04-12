# Arbetslivserfarenhet API
# moment2_backend_DT207GG
## Författare
- Maamoun Okla 
## Senaste uppdatering: 
- 2024-04-11

Detta repository innehåller kod för en enkel REST API byggd med Express och MySQL. API:et är utformat för att hantera arbetslivserfarenheter. Grundläggande CRUD (Create, Read, Update, Delete) funktionalitet är implementerad.


## Installation och Databas
API:et använder en MySQL-databas.
För att konfigurera projektet, följ dessa steg:
1. Klona repositoryt.
2. Kör `npm install` för att installera de nödvändiga npm-paketen.
3. Kör installationskriptet `install.js` för att skapa de nödvändiga databastabellerna.

Installationskriptet skapar följande databastabeller:

| Tabellnamn    | Fält                                         |
|---------------|----------------------------------------------|
| workExperience| **id** (int), **companyname** (varchar), **jobtitle** (varchar), **location** (varchar), **startdate** (date), **enddate** (date), **description** (text) |

## Användning
Nedan finns de tillgängliga endpoints och metoderna för att interagera med API:et:

| Metod | Ändpunkt             | Beskrivning                                                |
|-------|----------------------|------------------------------------------------------------|
| GET   | /experiences | Hämtar alla arbetslivserfarenheter.                       |
| POST  | /experiences | Skapar en ny arbetslivserfarenhet. |
| ** PUT **  | /experiences/:id | Uppdaterar en befintlig arbetslivserfarenhet med dess ID. (inte än implementerad)|
| DELETE| /experiences/:id | Raderar en arbetslivserfarenhet med dess ID.               |

Ett experiences-objekt returneras/skickas som JSON med följande struktur:
```json
{
   "companyname": "Exempel AB",
   "jobtitle": "Utvecklare",
   "location": "Stad, Land",
   "startdate": "ÅÅÅÅ-MM-DD",
   "enddate": "ÅÅÅÅ-MM-DD",
   "description": "En beskrivning av arbetslivserfarenheten."
}
