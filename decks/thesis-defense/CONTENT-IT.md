# Contenuti in italiano — apertura e Parte I

Punti di contenuto per la difesa, in italiano. Servono a due cose: Sirio li legge
mentre parla, e sono la base del mazzo ospite italiano (`it/`) da costruire più
avanti. **Contenuto soltanto: nessuna slide italiana va ancora costruita.**

**Regola permanente:** ogni volta che una slide viene costruita o il suo contenuto
cambia, questi punti vanno aggiornati nello stesso lavoro, senza aspettare che
qualcuno lo chieda. Se i punti e le note inglesi divergono, vuol dire che la slide
è cambiata e i punti no.

Apertura e Parte I (blocchi 1–15) riscritte il 23 settembre 2026 come didascalie per
passo: una riga per clic, identica al `div.notes-it` dentro le note della slide, da cui
la vista ospite legge la didascalia corrente.

Aggiornato al 22 settembre 2026 · 78 slide, 49 nel discorso (aggiunte `s30b`,
il divisore `s37a` e la slide di appendice `b25`; `s39` è passata in appendice). La Parte I ha perso
la slide sui moduli montati sulla macchina (tolta del tutto) e quella su precisione
e accuratezza (spostata in appendice come B24).

---

## Apertura

### 0 · `s00` — schermata di attesa
*Nessun numero, nessun cronometro. Resta su finché la sala non è pronta.*

- Titolo della tesi e nome. Nient'altro.
- Il cronometro parte quando si passa alla slide 1, non prima.

### 1 · `s01` — copertina

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 28 s:*

- **0** — Questa è la macchina che ho costruito, mentre dosa. Tesi magistrale al DTU Bioengineering, gruppo NaBIS; relatori Maria Dimaki, Winnie Svendsen e Lars Hvam. Per raccontare che cosa ha ispirato la tesi, immaginate questo: una passeggera atterra in una sala arrivi affollata, nelle prime settimane di un’epidemia, con la febbre.

### 2 · `s02` — la sala arrivi, e una giornata intera su un asse

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 62 s:*

- **0** — Eccola al controllo sanitario degli arrivi.
- **1** — L’operatrice fa un tampone nasale. Ma per confermare il virus la provetta va mandata a un laboratorio centrale, e bisogna aspettare.
- **2** — Trattenerla un giorno è impraticabile; lasciarla passare vuol dire far uscire un’infezione non confermata. L’asse in basso è una giornata intera.
- **3** — Il test molecolare standard: più di 26 ore. E l’ospedale ha il laboratorio in casa.
- **4** — Un test molecolare portatile, stesso studio, stesso ospedale, stessi pazienti: 2,6 ore. Il test può arrivare al gate. La preparazione del campione non ancora.

### 3 · `s03` — indice
*Sulla slide, cinque righe: «Background, Requirements and Methods», «The modules»,
«The machine», «Live demo», «Discussion & Outlook».*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 30 s:*

- **0** — La presentazione ha cinque tappe.
- **1** — Parte I: perché serve questa macchina, cosa deve fare, e come ho lavorato.
- **2** — Parte II: i moduli, uno alla volta, a partire dal modulo Pump.
- **3** — Parte III: la macchina intera — elettronica, integrazione, validazione.
- **4** — Poi cinque minuti di dimostrazione dal vivo, qui in sala.
- **5** — Infine discussione e prospettive. Le domande alla fine.

---

## Parte I — contesto, requisiti e metodi

### 4 · `s05` — divisore
*Sulla slide: «Background, Requirements and Methods.», e sotto «Why this machine
exists, what it has to do, and how I worked.» — lo stesso nome che la slide
dell’indice dà a questa parte.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 5 s:*

- **0** — Parte I: perché questa macchina esiste, cosa deve fare, e come ho lavorato.

### 5 · `s05b` — che cos'è la preparazione del campione
*Sulla slide: tre disegni, uno per clic, con le didascalie «Locked inside»,
«Separated from everything else» e «And the chemistry washed out»; sul primo
pannello una freccia indica il **target**. In chiusura: «Nearly every step is a
liquid.»*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 45 s:*

- **0** — Prima di tutto: che cos’è la preparazione del campione.
- **1** — Tampone, terreno, acqua: nessuno si legge così com’è. Il materiale genetico che il test cerca è chiuso dentro cellule o virus, in mezzo a proteine e detriti.
- **2** — Quindi si rompe il campione, si estrae il bersaglio e lo si separa da tutto il resto.
- **3** — Poi anche quella chimica aggressiva va lavata via, altrimenti blocca la reazione che legge il risultato. Quasi ogni passaggio aggiunge o toglie un volume misurato: serve un dosatore.
- *Se chiedono:* la tesi cita prove che il campionamento e la preparazione del campione pesano sulla variabilità di un risultato più della misura stessa.

### 6 · `s06` — il divario
*Prezzi sulla slide: Tecan Fluent 25–80k$ (usato), Roche cobas liat 11k$ con
~100$ a test, Sidekick 710$ di costruzione. I due dati del cobas liat **non** sono
nella tesi: la macchina è un prezzo di rivendita (Dipylon Medical), il costo a test
viene dalla revisione CADTH sui test rapidi per l'influenza (~100 US$, cifra del
2015). Da dire a voce se qualcuno chiede.*

*Prima riga (dal 23 settembre): **manual pipetting**, la pipetta manuale, con la foto
del kit da campo dell'appendice A01 (Carlier et al. 2022), mostrata intera. Segni:
precisione sull'intervallo «/» parziale, portatile ✓, senza presidio ✗, qualunque
protocollo ✓; prezzo **~1.000 $** (sulla slide «~$1k», un kit di pipette manuali
da circa 1 a 1000 µL; cifra fornita da Sirio, non dalla tesi). Sirio tiene in mano una pipetta vera mentre la riga entra.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 50 s:*

- **0** — In alto quattro proprietà.
- **1** — Lo standard di ogni laboratorio: la pipetta manuale.
- **2** — Sistemi da laboratorio come il Tecan Fluent: precisi e aperti a ogni protocollo, ma anche il più piccolo è grande come un armadio.
- **3** — Piattaforme integrate come il cobas liat: portatili e autonome, ma i volumi sono fissati nella cartuccia, legati a un solo test.
- **4** — Progetti open source come il Sidekick: aperti e autonomi, ma calibrati sull’acqua e portatili solo in parte.
- **5** — Ogni famiglia manca almeno una proprietà, mai la stessa. La riga vuota è ciò che serve sul campo: questa macchina.
- *Se chiedono:* il Fluent copre da 0,5 a 1000 µL, ma a mezzo microlitro la sua imprecisione è circa trenta volte quella migliore, e Tecan stessa dice che sotto i 5 µL può servire una calibrazione.
- *Se chiedono:* i prezzi del cobas liat non sono nella tesi: la macchina è un prezzo di rivendita (Dipylon Medical), il costo a test (~100 $) viene dalla revisione CADTH sui test rapidi per l'influenza, cifra del 2015.

### 7 · `s04b` — da dove viene l'intervallo
*Due clic: prima i campi, poi i numeri che ne escono. La frase introduttiva non è
più sulla slide: restano i cinque campi, e la si dice a voce.*

*Titolo sulla slide: «One machine engineered for generalized sample preparation,
grounded in five field protocols.»*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 35 s:*

- **0** — Che cosa deve coprire una sola macchina? La preparazione del campione in generale, in campi diversi.
- **1** — Cinque protocolli di campo, con ogni volume annotato: clinico e veterinario, vegetale, acque, agricoltura e suolo. Quello clinico, il protocollo PANPOC, ha ispirato questa tesi.
- **2** — Sono abbastanza coerenti: volumi da 5 a 1000 µL, e fino a sei liquidi, in decine di provette da 1,5 e 2 mL.
- *Se chiedono:* nessuna rassegna raccoglie i volumi dosati fra tipi di protocollo; la tabella a cinque righe, con l'intervallo di ciascun protocollo, è in appendice.

### 8 · `s07` — il problema di progetto e i vincoli

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 35 s:*

- **0** — Tutto questo diventa un unico problema di progetto.
- **1** — Dosare da 5 a 1000 µL di fino a sei reagenti in decine di provette, senza presidio, precisa almeno quanto una pipetta manuale, usata da personale non specializzato.
- **2** — Ognuno di questi è un vincolo: se un’idea ne manca uno, è esclusa prima di qualunque valutazione.
- **3** — Solo le idee rimaste vengono ordinate, su otto criteri.
- *Se chiedono:* gli otto criteri non sono pesati a livello di sistema; ogni modulo riceve i propri pesi quando la decomposizione esiste.

### 9 · `s07b` — la macchina divisa in 8 moduli
*Titolo: «La macchina è divisa in 8 moduli, collegati da trasferimenti di liquido
e segnali di controllo». Sulla slide c'è **solo il diagramma**: le due righe di lettura
in fondo sono state tolte, quei due punti ora si dicono a voce.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 40 s:*

- **0** — Dalla sequenza delle operazioni sono uscite otto funzioni, quindi otto moduli.
- **1** — Stoccaggio, Pump, Nozzle, Alignment, supporto provette, elettronica, User Interface e involucro: una funzione ciascuno.
- **2** — Il liquido va in una sola direzione: stoccaggio, Pump, Nozzle, provetta. Il supporto provette è stato poi assorbito nel modulo Alignment.
- **3** — Tutto il resto, fra i moduli, sono dati e segnali di controllo.
- **4** — Nessun liquido raggiunge l’elettronica. L’involucro è rimasto una specifica: la sua forma dipende da tutto ciò che contiene.
- *Se chiedono:* lo stoccaggio dei reagenti è lavoro di Marius Schiller, non uno dei miei moduli.

### 10 · `s10` — la gerarchia
*Sulla slide c'è **solo una piramide** di sette moduli, ricostruita dalla figura 5.2
della tesi: in cima la **Pompa**, alla base l'**Involucro** (tratteggiato, mai
costruito). Niente frecce, niente note, nessun elenco dell'ordine: l'ordine si legge
dalla piramide stessa, dall'alto verso il basso.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 25 s:*

- **0** — Ordinando i moduli per quanto dipendono l’uno dall’altro si ottiene l’ordine del lavoro.
- **1** — In cima il modulo Pump: ha il requisito di volume più severo e detta il principio di funzionamento a tutti gli altri.
- **2** — Ogni modulo più in basso eredita vincoli; in caso di conflitto cedeva quello più in basso.
- *Se chiedono:* la matrice di valutazione della pompa ha trentuno righe; quella dell'elettronica ha tre requisiti e undici criteri, e non nomina né tensioni né numero di driver.

### 11 · `s09a` — divisore: i metodi
*Sullo schermo ci sono **solo due righe**: «Methods, & engineering with AI.»
Nient'altro. Cinque secondi, si passa oltre. Sono i titoli dei capitoli tre e
quattro della tesi.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 10 s:*

- **0** — Adesso il come: progettare, costruire, provare, imparare, in un ciclo che gira alla velocità del suo passo più lento.

### 12 · `s09b` — stampa 3D
*Sulla slide: il titolo, a sinistra il pezzo che si costruisce strato su strato
(animazione) con **±0,1 mm** sotto, a destra la fotografia della stampante. Nessuna
didascalia, nessun testo piccolo, e **«weeks → hours» non c'è più**: il passaggio da
settimane a ore si dice a voce.*

*Una sola frase per tutta la slide, detta in meno di dieci secondi: vale per tutti e tre i clic.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 8 s:*

- **0** — Ogni pezzo su misura è stato stampato in 3D qui, con una precisione di ±0,1 mm.

### 13 · `s08a` — Engineering with AI
*Sullo schermo ci sono **solo il simbolo di Claude Code e il titolo «Engineering
with AI»**, al centro, in grande. È il titolo del capitolo quattro. Tutto il
resto si dice a voce. Il gruppo simbolo + titolo passa poi alla slide seguente,
rimpicciolito nell'angolo in alto a destra, e ci resta.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 15 s:*

- **0** — L’IA è stata nel progetto dalla prima settimana: Claude Code, sui file veri del progetto. Ha scritto e calcolato; stampa, cablaggio, montaggio e collaudo sono rimasti miei, e ogni fonte l’ho controllata io.
- *Se chiedono:* il capitolo quattro è su questo, e un'appendice documenta l'uso.

### 14 · `s08` — la casa
*La slide **si apre con il solo titolo «Engineering with AI»**, al centro e in
grande, ereditato dalla slide precedente: c'è tutto il tempo per introdurre
l'argomento. Al primo clic il gruppo si rimpicciolisce nell'angolo in alto a
destra e solo allora compaiono il titolo della slide, la lavagna e le schede.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 40 s:*

- **0** — Usata senza regole, l’IA sbaglia sempre negli stessi modi, per struttura.
- **1** — Supponiamo di chiederle di progettare una casa.
- **2** — Una villa o una casa a schiera: entrambe valide, nessuna delle due quella voluta.
- **3** — Chiedi una finestra al piano di sopra: finisce mezza fuori dal muro, perché niente di scritto diceva dov’era il muro.
- **4** — Poi torna un’istruzione di tre sessioni prima, un muro portante si sposta, e il tetto viene giù con lui.
- **5** — Come in tutta l’ingegneria, il lavoro con l’IA deve procedere per passi, ognuno scritto e verificato prima del successivo.

### 15 · `s09` — l'ambiente di lavoro
*Le frecce percorrono **solo** «the specs» e «the loop»: due pressioni e si passa
oltre. «The sources» e «the tools» sono **pulsanti** (bordo tratteggiato e un +):
si aprono cliccandoci sopra, uno alla volta, e servono per le domande. Cliccare
non fa avanzare la presentazione.*

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 25 s:*

- **0** — Quindi l’IA ha lavorato dentro regole precise.
- **1** — Ogni decisione è fissata per iscritto prima di pianificare o costruire: discutere, pianificare, eseguire, verificare, consegnare. E la memoria resta su disco.
- **2** — Per tutto il lavoro l’IA ha documentato il processo, e quella documentazione è sempre stata il suo riferimento. Adesso, i moduli.
- *Se chiedono:* le fonti? Si clicca il pannello: sette banche dati, quaranta candidati riordinati, dodici restituiti, e ogni riferimento approvato da me.
- *Se chiedono:* i modelli? Si clicca il pannello degli strumenti: il sito è online, e tre strumenti si aprono più avanti.

---

## Parte II — i moduli

### 16 · `s11` — divisore: i moduli

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 10 s:*

- **0** — La Parte II sono i quattro moduli che ho progettato e costruito: pompa, allineamento, ugello, interfaccia utente.

### 17 · `s12b` — trenta idee, due costruite

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 10 s:*

- **0** — Trenta meccanismi in sei famiglie, compresi alcuni stravaganti.
- **2** — Sette hanno superato i filtri, cinque li abbiamo sviluppati con Marius, e due sono arrivati a hardware funzionante.
- **3** — La pompa peristaltica ha vinto per la pulibilità.
- *Se chiedono:* la matrice dava alla pompa rotativa 300 punti di margine su ingombro, massa e pulibilità.

### 18 · `s13` — la dose viene dalla geometria

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 90 s:*

- **0** — La decisione è stata la dose, 5 µL per corsa; il tubo da 0,51 mm di diametro interno ne è la conseguenza.
- **2** — Ho costruito tre strumenti per guidare il progetto, e con questi ho scelto quattro rulli.
- **3** — Il solutore geometrico dimensiona il rotore per una dose data e verifica quali numeri di rulli si possono costruire.

### 19 · `s14` — la prima pompa non sigillava, e il sensore di flusso si è rivelato inadeguato

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 30 s:*

- **0** — La pompa stampata non schiacciava il tubo fino a chiuderlo; ho dovuto aggiungere nastro e uno spessore di carta per far passare il liquido.
- **2** — Il sensore di flusso in linea oscillava più del flusso stesso; un campione su sette segnava all’indietro.
- **3** — Così sono passato a una bilancia analitica; da qui in poi ogni volume è pesato.
- **4** — La pompa erogava molto meno del previsto, ma in modo costante e molto preciso.
- *Se chiedono:* sullo stesso dosaggio il sensore di flusso leggeva l'11,5 % in meno della bilancia; il controllo in anello chiuso è stato accantonato.

### 20 · `s15` — altre tre costruzioni: hanno sistemato la stampa, non la fisica

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 30 s:*

- **0** — Ho fatto alcune altre iterazioni. La più significativa è stata caratterizzare la stampante, perché stampi le dimensioni che ho progettato.
- **1** — Ho misurato la stampante su anelli di prova. Le misure esterne si riducono dello 0,65 %, i fori interni perdono sempre 0,14 mm.
- **2** — Questa è la v2.3, smontata. Con tutte le correzioni, il gioco misurava 1,52 mm in tutte e tre le fessure di controllo.
- *Se chiedono:* nella v2.1 il supporto stava 0,45 mm troppo in alto, così il gioco si apriva in cima alla pista; nella v2.2 i perni stampati erano conici e inclinavano i rulli, risolto con un solo cuscinetto sulla base larga; e un corpo disegnato con un gioco di 1,52 mm misurava 1,75 mm, ed è per questo che ho caratterizzato la stampante.

### 21 · `s16` — la pompa ripete una dose come una mano con una pipetta

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 40 s:*

- **0** — La linea tratteggiata è una pipetta manuale sulla stessa bilancia, un CV dello 0,27 %. Le due serie sono la pompa a 100 e 300 corse, a quattro velocità.
- **2** — A 180 giri al minuto la pompa varia meno, alla pari della pipetta, e dosa tre volte più in fretta che a 60. È diventata la velocità di lavoro.
- **3** — A quella velocità una corsa dà 4,53 µL, il 9,4 % sotto i 5 µL di progetto. Il firmware lo corregge una volta sola.
- *Se chiedono:* i punti della pompa sono totali da 100 e da 300 corse; più piano dosa un po' di più, ma ripete peggio.

### 22 · `s17` — muovere le provette, tenere fermi gli ugelli

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 40 s:*

- **0** — Ho valutato i concetti di progetto su carta e ho scelto di muovere le provette e tenere fermi gli ugelli, così il tubo non si piega mai.
- **2** — Le regole principali erano pulibilità e fattibilità. Hanno escluso il layout circolare, cinghia e puleggia, e la spinta della rastrelliera dal basso.
- **3** — La rastrelliera tiene otto provette, perché le attrezzature di laboratorio lavorano a multipli di otto, a 22 mm l’una dall’altra per lasciare spazio a un apritappi. È questa distanza a fissare la lunghezza della macchina.
- *Se chiedono:* i 22 mm sono stati misurati sul prototipo funzionante di apritappi di Pulkit.

### 23 · `s18` — tre costruzioni, un modulo che trova da solo il proprio zero

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 35 s:*

- **0** — v1: pignone e cremagliera stampati spostano le provette a passi di 22 mm, in modo ripetibile. Così il resto del modulo è potuto restare stampato.
- **2** — La v2 mette il motore sopra i campioni. Le gocce cadono verso il basso, lontano dalla trasmissione, quindi non serve una guarnizione.
- **3** — La v2.1 aggiunge un finecorsa e trova lo zero in tre passate, entro 0,03 mm.
- *Se chiedono:* quella guida dava 140 dei 154 mm necessari, sei spostamenti su sette; il telaio finale ha risolto la lunghezza.

### 24 · `s19` — il telaio finale: coda, corsia, vassoio

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 40 s:*

- **0** — Le rastrelliere aspettano nella coda di ingresso, e un secondo asse spinge ciascuna nella corsia di dosaggio. Ne tiene cinque per lotto.
- **2** — La rastrelliera avanza in sette passi da 22 mm e si ferma a ogni passo mentre gli ugelli dosano.
- **3** — All’ultima spinta, due nervature sotto la rastrelliera entrano in due scanalature inclinate nel pavimento, e la rastrelliera cade nel vassoio di uscita. Nessun motore in più.
- **4** — Alla fine il telaio è diventato la struttura dell’intero strumento.
- *Se chiedono:* un tappo aperto fino in piano può sfregare contro la parete smussata. La trasmissione non lo sente, quindi la rastrelliera resta indietro e la dose finisce accanto alla provetta; l'istruzione è lasciare i tappi in piedi.

### 25 · `s20` — il modulo ugello, ricostruito da zero

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 40 s:*

- **0** — È arrivato che non funzionava: troppo debole per staccare una goccia, niente per montarlo, e un modello non modificabile in CAD.
- **2** — Ho tenuto l’idea di Marius, staccare la goccia con la vibrazione, e ho ridisegnato il modulo da zero. Le colonnine verticali lo lasciano muovere solo su e giù.
- **3** — Un magnete e tre dadi d’acciaio hanno sostituito il peso stampato sul motore a vibrazione. L’elastico impedisce al carrello di sfilarsi dalle colonnine. Gli aghi stanno a 22 mm l’uno dall’altro, come le provette.
- *Se chiedono:* la sede è il negativo stampato dell'attacco dell'ago, quindi ogni calibro si monta senza attrezzi.

### 26 · `s21` — è il foro dell'ago a decidere se la goccia si forma

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 35 s:*

- **0** — Cinque punte, provate con acqua e lo stesso impulso di vibrazione. Cambia solo il diametro interno.
- **2** — A 0,21 e 0,26 mm l’acqua esce come un getto, quindi l’impulso non ha niente da staccare.
- **3** — A 0,41 e 0,51 mm si forma una goccia che cresce, e l’impulso stacca la maggior parte delle gocce.
- **4** — Le punte di plastica sono andate meglio: nove gocce su dieci staccate, nessuna di lato. La macchina ha lavorato con aghi d’acciaio 22 G.
- *Se chiedono:* il foro delle punte di plastica non è mai stato misurato, ed erano fissate col nastro, non inserite nella sede.

### 27 · `s22` — l'interfaccia ereditata non aveva cablaggio dietro: un collegamento necessario è diventato una riprogettazione completa

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 35 s:*

- **0** — L’interfaccia che ho ereditato mostrava solo i livelli dello stoccaggio. Non comandava nessun motore, e dalla schermata di calibrazione si usciva solo spegnendo la macchina. Collegarla voleva dire riprogettarla.
- **3** — Ho prototipato nove candidate come pagine web, molto più in fretta con l’IA, e ognuna verificava da sola un contrasto di 7:1, perché la macchina si usa all’aperto, in piena luce.
- *Se chiedono:* la verifica ha bocciato la prima palette a 6,2:1, nel browser, prima che arrivasse sul dispositivo.

### 28 · `s23` — una corsa intera, dall'inizio alla fine, su un solo schermo

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 60 s:*

- **0** — L’interfaccia è pensata per essere visiva e intuitiva: una ricetta disegna ogni volume in proporzione dentro una provetta, e la schermata della corsa simula il rack.
- **2** — Questa è una simulazione dal vivo dell’interfaccia, costruita con le vere schermate della macchina.

### 29 · `s24` — il reagente aspetta in un flaconcino sigillato, letto da un sensore e prelevato da due aghi

*Didascalie per passo (una per clic, le stesse di `aside.notes .notes-it` nella slide) · circa 10 s:*

- **0** — Lo stoccaggio dei reagenti è di Marius: la cartuccia, il manicotto e il portaaghi.
- **3** — Io ho aggiunto il filtro sull’ingresso dell’aria; il modello è arrivato come mesh, non modificabile.
- *Se chiedono:* il filtro è da 0,22 µm, abbastanza fine da tenere fuori i microrganismi.

---

## Parte III — la macchina

*Scritti il 22 settembre 2026. **La Parte III è completa**: da `s25` fino alla
chiusura `s43`, compresi i divisori `s25` e `s37a`, ogni slide ha i suoi punti
in italiano. `s39` non è più qui: il 22 settembre è stata spostata in
**appendice**, e i suoi punti stanno in fondo, nella sezione dell'appendice. La
numerazione qui sotto è stata richiusa di conseguenza.*

### 30 · `s25` — divisore: Parte III-A. Una sola macchina.
- Da qui in poi i moduli diventano una macchina sola: come è stata cablata, come è stata montata e che cosa ha ottenuto.

### 31 · `s26` — venticinque architetture di sistema, scremate con due strumenti interattivi
- C'erano venticinque modi di cablare questa macchina, e serviva un modo onesto per scegliere.
- Bisognava comandare uno schermo, sei pompe, due assi e un motorino a vibrazione, con quanti processori servissero.
- Il primo strumento ha prezzato ogni opzione e ne ha controllato i collegamenti: hanno deciso i collegamenti, non il prezzo.
- Il secondo strumento ha misurato i tempi. Una seconda pompa fa risparmiare quasi tutto il tempo, l'86 %, e le altre aggiungono poco.
- Entrambi gli strumenti sono pagine vere, che si possono aprire dal vivo.
- *Se chiesto del prezzo:* ogni opzione con abbastanza collegamenti costa entro il 10 % circa delle altre.

### 32 · `s27` — un solo clock muove sei pompe, perché una dose è un numero di passi
- Un solo microcontrollore comanda tutto: lo schermo, le sei pompe, i due motori dell'allineamento, il motorino a vibrazione e i sensori di livello.
- Com'è costruita, tutto parte da un'unica linea a 12 volt, da una batteria per utensili o dall'alimentatore da banco.
- Per la produzione userei un power bank USB-C regolato, perché una batteria semplice perde tensione sotto sforzo, ed è questo che ha fermato il prototipo.
- *Se chiesto:* i condensatori sulla scheda reggono 16 volt, e vanno sostituiti prima di una linea motori a 24 volt.

### 33 · `s28` — ogni pompa e il suo stoccaggio del reagente stanno nello stesso supporto stampato
- Quanto a come è stata montata la macchina: ogni pompa e il suo stoccaggio del reagente condividono un unico supporto stampato.
- Il supporto centrale, vuoto, visto davanti e dietro.
- La pompa entra dall'alto, a sinistra; lo stoccaggio scivola dentro da davanti, a destra.
- Il supporto caricato, con la pompa e lo stoccaggio al loro posto.
- Quello di sinistra si avvita anche alla parete laterale.
- I supporti si incastrano tra loro e sono avvitati.
- La sua immagine scende nella barra in basso, che raccoglie i pezzi della macchina.

### 34 · `s29` — l'ugello si avvita al telaio, lo schermo si inclina a 45 gradi
- L'ugello non ha richiesto pezzi nuovi: tre viti lo fissano al vano dell'elettronica, una di lato.
- Ogni pompa porta il liquido al suo ago con un tubo che si stacca a mano.
- Il supporto dello schermo ha anche due clip per il pennino.
- Inclina lo schermo a 45 gradi, perché questa macchina si guarda dall'alto, su un tavolo o sul cassone di un furgone.
- Il supporto dello schermo entra nella barra in basso.

### 35 · `s30` — un supporto batteria già pubblicato e tre viti
- Il supporto della batteria è adattato alla batteria da trapano che ho usato, e ho rifatto in CAD i fori delle viti.
- Lo tengono tre viti, e la batteria si collega alla presa dell'alimentatore da banco, quindi dentro non si è ricablato niente.
- Era l'ultimo pezzo che mancava alla macchina.
- Qui lavora all'aperto, a batteria. È uno scenario possibile, non un risultato: senza un involucro funziona in modo affidabile solo al chiuso.

### 36 · `s30b` — quattro giunzioni, e i moduli diventano un oggetto solo
- Messi insieme, questi quattro pezzi fanno dei moduli un oggetto solo.
- Pesa 3,3 chili con i rack e la batteria, e si solleva con due mani.
- *Se chiesto:* 50 per 35 per 18 centimetri; la batteria aggiunge 5,5 centimetri alla profondità.

### 37 · `s31` — calibrata su se stessa, la macchina resta entro il 3,4 % del bersaglio
- Per provare la precisione ho chiesto alla macchina intera mille microlitri e ho pesato la provetta.
- La fascia chiara è quanto ammette il requisito: il 10 % in più o in meno.
- Con la taratura della pompa fatta al banco, la macchina dava circa il 18 % in meno.
- Così l'ho ricalibrata sulla macchina stessa, ed entrambi i canali sono finiti dentro la fascia.
- Montata, ogni pompa dà circa il 10 % in meno a colpo che al banco, e la ricalibrazione corregge proprio questo.
- Ma la taratura si sposta fra una sessione e l'altra, del +1,3 % e del −5,0 %, quindi una macchina da campo deve sapersi ricalibrare da sola.
- *Se chiesto:* nella stessa sessione, da una dose all'altra, variava solo dello 0,71 % e dello 0,37 %.
- *Se chiesto:* una pipetta a mano variava dello 0,27 % sulla stessa bilancia, ma a 50 microlitri: stesso ordine di grandezza, non una vittoria alla pari.

### 38 · `s32` — dosaggio non presidiato, validato su cinque rack e quaranta provette
- Poi la prova vera: la macchina riesce a completare un lotto intero senza che nessuno la tocchi?
- Si parte con quaranta provette vuote in cinque rack, con l'alimentatore da banco, non a batteria.
- Le ha riempite tutte e quaranta con entrambi i reagenti, senza nessun aiuto.
- Una provetta del primo rack e una dell'ultimo contengono, a occhio, la stessa quantità.
- Solo tre gocce sono finite sul rack o sulla corsia. I tappi hanno causato un problema a parte, che viene subito dopo.
- *Se chiesto come:* i motori sono stati rallentati, e così avevano la forza di spingere cinque rack carichi.
- *Se chiesto quanto è durata la corsa:* la tesi non riporta nessun tempo.

### 39 · `s33` — i tre modi di guasto: attrito dei tappi, batteria che si scarica, setto che perde
- Tre cose sono andate storte, nessuna nella meccanica dei movimenti, e ognuna ha una soluzione nota.
- Un tappo lasciato piatto sfrega contro la parete, il motore perde passi senza accorgersene, e la goccia cade accanto alla provetta.
- A batteria ha completato due rack, sedici campioni. Poi la batteria si è scaricata, le due pompe si sono bloccate, e il programma non sa ancora farne girare una sola.
- Il terzo riguarda il contenitore di Marius: la sua guarnizione di gomma comincia a perdere dopo circa cinque forature dell'ago.

### 40 · `s34` — valutazione dei requisiti
- Ora i requisiti, un gruppo alla volta.
- Precisione e ripetibilità sono soddisfatte. Anche la versatilità, anche se la dose più piccola, 5 microlitri, non è ancora confermata.
- Ha completato un lotto intero da sola; l'addestramento di un nuovo utente non è stato provato.
- La portabilità è soddisfatta in parte.
- I reagenti non possono mescolarsi, per come è costruita la macchina, non grazie ai lavaggi.
- La sicurezza è soddisfatta in parte, e quella elettrica è stata esclusa: l'elettronica è ancora su basette di prova.
- Ciò che è stato escluso aspetta un involucro, un circuito stampato e un materiale lavabile, non nuova meccanica.
- *Se chiesto della pulizia:* la plastica stampata non si disinfetta, quindi le parti che scorrono vanno in metallo o polipropilene.
- *Se chiesto della fattibilità:* era un controllo nella scelta del concetto, non una prova della macchina finita.

### 41 · `s35` — la macchina funziona ed è pronta a lavorare dal vivo
- Ecco la macchina al lavoro, e tra un momento la vedrete dal vivo.

### 42 · `s36` — dimostrazione dal vivo
- Ora la macchina vera: si carica un rack, si sceglie una ricetta sullo schermo, si riempiono una o due provette con il colorante e il rack esce.

### 43 · `s37a` — divisore: Parte III-B. Discussione e prospettive.
- Avete visto la macchina funzionare. Ora vediamo che cosa dimostra, che cosa no, e che cosa viene dopo.

### 44 · `s37` — il prototipo dimostra il concetto, non uno strumento finito
- La macchina funziona, ma non è ancora uno strumento finito.
- Ho costruito solo due dei sei canali per i liquidi.
- L'ho provata solo con acqua e colorante, mai con i reagenti veri.
- Non ho mai verificato la dose più piccola, 5 µL, sulla macchina montata.
- E nessuno senza formazione l'ha ancora usata.
- Quindi vengono prima due prove: il protocollo PANPOC con i reagenti veri, e una persona alla prima volta che maneggia rack, provette, tappi e flaconi.

### 45 · `s38` — profondità e ampiezza nella prototipazione: il modulo pompa e il modulo allineamento
- Un modulo si può sviluppare in profondità o in ampiezza.
- Profondità vuol dire costruire tante volte la stessa idea, ma se ne sceglie la forma prima di provare le altre.
- Ampiezza vuol dire costruire più idee, ma una prova frettolosa può fallire per la costruzione, non per l'idea.
- La pompa le ha avute tutte e due: Marius ha costruito una pompa lineare, io ho provato una pompa a siringa, e ho costruito quattro volte quella peristaltica rotativa.
- L'allineamento ha avuto ampiezza solo sulla carta: una cinquantina di idee, una costruita, anche se è il modulo che decide quanto è grande la macchina.
- E il modello della pompa non è mai stato verificato: puntava a 5 µL per colpo, e le due pompe ne danno meno.
- *Se chiesto:* le due pompe danno 3,94 e 4,10 µL a colpo. La pompa rotativa ha battuto quella lineare 3485 a 3185 nel punteggio. Con la stampa ora precisa a ±0,10 mm, vale la pena fare una vera serie di prove sui rotori.

### 46 · `s40` — il prossimo prototipo parte dai moduli, nell'ordine in cui la geometria dipende
- Il prossimo prototipo dovrebbe partire dai moduli, in ordine.
- Prima la pompa, i contenitori dei reagenti e l'ugello insieme, perché insieme decidono la dose.
- Poi l'apri-tappi, l'ultimo passaggio ancora fatto a mano, prima di fissare il rack delle provette.
- Poi il modulo di allineamento, con motori più forti, un modo per fermarsi se un motore slitta, e un pulsante di arresto di sicurezza.
- Poi l'elettronica, su una sola scheda che misura anche la batteria.
- L'involucro viene per ultimo, perché avvolge tutto il resto.
- *Se chiesto:* stavolta il tubo della pompa è arrivato sei settimane in ritardo, e ci ha costretti a sviluppare i moduli in parallelo. La prossima volta, in ordine. Il modulo dei contenitori dei reagenti è di Marius.

### 47 · `s41` — un campione preparato non è una risposta: accanto al dosatore ci vuole un lettore
- Sul campo si vuole un risultato, non solo un campione preparato.
- Questa macchina prepara il campione, ma non misura niente.
- La macchina che prepara i campioni è di uso generale, quindi anche il lettore che la accompagna dovrebbe esserlo.
- Per questo propongo un lettore modulare: un solo alloggiamento, con un rivelatore per ogni tipo di test.
- Un codice sul kit del test configura tutte e due le macchine: chi le usa deve solo caricare e scansionare.
- *Se chiesto:* preparare un campione è in gran parte uguale da un test all'altro, rivelare il risultato no. Per questo il rivelatore sta in un lettore separato, non chiuso dentro il dosatore.

### 48 · `s42` — di nuovo la sala arrivi
- Torno al viaggiatore: oggi il suo tampone deve ancora viaggiare fino a un laboratorio centrale.
- Questa tesi mostra che la preparazione del campione non è costretta a farlo. Uno strumento portatile può dosare liquidi con precisione e da solo.
- Prima di poter stare a un varco d'aeroporto, deve essere ricostruito da moduli maturi, provato con reagenti veri e utenti veri, e affiancato a un lettore.
- Se quel viaggiatore potrà un giorno essere testato prima di lasciare il terminal è ancora aperto. Ma non è più una domanda a cui può rispondere solo un laboratorio centrale.

### 49 · `s43` — grazie
- Grazie ai miei relatori, Maria Dimaki, Winnie Edith Svendsen e Lars Hvam, e a Marius e Pulkit. Aspetto le vostre domande.

---

## Appendice

Slide tolte dal discorso ma tenute in fondo, per le domande. Nella panoramica
compaiono dentro il loro stesso argomento, dopo le slide mostrate. Una slide sta
nell'appendice perché porta `data-part="backup"`, mai per il prefisso della sua
sigla — la regola completa è in `SLIDE-ORDER.md`.

**Sulla numerazione.** Sullo schermo queste slide portano `A01`, `A02`, … nella
tinta ardesia dell'appendice, ma quel numero è **calcolato dall'ordine in cui
stanno nel file**: se una slide si sposta, cambiano tutti i numeri sotto di lei.
Nessuno indirizza una slide con il suo numero, e **qui sotto non ne è scritto
nessuno**: l'indirizzo di una slide è la sua sigla (`s12`, `s39`, `b25`), che non
cambia mai.

### `s04` — il laboratorio da campo
*Spostata in appendice il 23 settembre 2026. Era la slide 3 del discorso.
Resta nel suo argomento — l'apertura — e si raggiunge dalla panoramica.*

*Sulla slide: una sola fotografia, il titolo e la didascalia. Titolo nuovo:
«Bringing the lab to the sample often still requires pipetting and an expert.»*

- Il laboratorio si può già portare dove sta il campione: questa è una valigia da
  campo vera, con il ciclatore, il blocco magnetico, l'agitatore e le pipette.
- Ma guardate che cosa c'è ancora in mezzo: **quattro pipette manuali**. Il
  laboratorio viaggia; il lavoro di mano no.
- Serve comunque qualcuno che sappia pipettare. È esattamente il punto da cui parte
  questa tesi.
- *(Foto: Carlier et al. 2022, CC BY 4.0.)*

### `s04c` — PANPOC e il protocollo a biglie magnetiche
*Spostata in appendice il 21 settembre 2026. Resta nel suo argomento — Parte I,
«The gap» — e si raggiunge dalla panoramica.*

- **PANPOC** è lo strumento portatile del progetto PAIR: influenza, SARS-CoV-2,
  qualunque cosa abbia potenziale pandemico. È pensato per aeroporti e controlli
  di frontiera — la stessa sala da cui siamo partiti.
- Ma prima che possa leggere un tampone, un banco deve trasformarlo in RNA
  purificato. Questa è la figura della tesi ridisegnata: una provetta, sette
  stadi, e la legenda di ciò che ci galleggia dentro.
- **Rilascio e lisi:** il tampone viene agitato in tiocianato di guanidinio, che
  rompe le cellule e blocca gli enzimi che distruggerebbero l'RNA.
- **Controllo interno:** una quantità nota di RNA sintetico. Serve a distinguere un
  risultato negativo da un'estrazione fallita: se il controllo non passa, la
  corsa è fallita.
- **Legame:** etanolo e biglie magnetiche rivestite di silice. L'RNA si attacca
  alla superficie delle biglie, tutto il resto resta libero nel liquido.
- **Cattura e scarto:** un magnete tiene le biglie contro la parete e il liquido
  viene aspirato via. **È il magnete che elimina la centrifuga**, ed è la ragione
  per cui questo protocollo può uscire da un laboratorio.
- **Due lavaggi** con etanolo al 70 %, **asciugatura** (l'unico stadio che
  aspetta soltanto) e infine **eluizione**: si toglie il magnete, si aggiunge
  acqua, l'RNA torna in soluzione. Quello va al rivelatore.
- Il punto: **quattro dei sette stadi sono un volume misurato che entra**, e un
  quinto aggiunge oltre a togliere. Un dispositivo generico per la preparazione
  dei campioni è un dispositivo che **dosa volumi misurati**: è tutto qui il
  lavoro.
- «*Detection can travel to the gate; the upstream preparation cannot*» — perché
  ogni volume di quella preparazione è posato a mano, su un banco.

### `s12` — dove il liquido tocca la macchina
*(modulo pompa, capitolo 6; tolta dal discorso il 21-09-2026, mantiene la sigla `s12`)*
- Tre modi di muovere pochi microlitri: spingere uno stantuffo dentro una canna,
  flettere una membrana fra due valvole di non ritorno, oppure schiacciare un tubo.
- Nei primi due è la macchina stessa a bagnarsi: faccia dello stantuffo e canna nella
  siringa; membrana e lamelle di entrambe le valvole nella pompa alternativa.
- **Non è stata l'accuratezza a decidere**: una pompa a siringa da laboratorio è
  rimasta entro il nominale da 20 µL in su. Ha deciso il lavaggio — e a un varco di
  frontiera non c'è un lavandino.
- La peristalsi chiude il confine bagnato sul **solo tubo**, e il tubo è un
  consumabile: si butta.

### `s39` — l'intelligenza artificiale è stata la base del lavoro digitale; il lavoro fisico è rimasto nelle mie mani
*(discussione e riflessione, capitolo 13; tolta dal discorso il 22-09-2026 e
alleggerita — mantiene la sigla `s39`. Sirio: «solo l'AI, più semplice, e in
appendice». **La linea del tempo è sparita del tutto**, e con lei la nota su
quando è arrivata la ricerca di mercato.)*

*Al centro il ciclo di lavoro — progettare, costruire, provare, imparare — con
la documentazione nel mezzo. A destra due elenchi: dove l'AI è stata decisiva, e
dove si è fermata.*

- **Decisiva per cinque cose**: **ricerca bibliografica**, **protocolli
  sperimentali**, **analisi delle misure**, **firmware** e **specifiche
  tecniche**. Non un aiuto accessorio messo di lato: una base su cui ha poggiato
  tutto il lavoro digitale.
- **Il confine è puramente fisico.** Stampa 3D, **montaggio**, **cablaggio**,
  **prove di laboratorio**: tutto a mano. E l'**assieme CAD**, che non è riuscita
  a costruire — la disposizione nello spazio, le tolleranze fra i pezzi e il
  montaggio sono rimasti compiti strettamente umani.
- E la frase con cui chiudo il capitolo: **«Senza l'intelligenza artificiale
  integrata in tutto il flusso di lavoro ingegneristico, completare un prototipo
  integrato e questa profondità di validazione sperimentale nei tempi di una
  tesi magistrale non sarebbe stato possibile.»**

### `b25` — sei modi di leggere il risultato, e ognuno è un conto diverso di hardware
*(conclusione e prospettive, capitolo 14; nuova il 22-09-2026. È la slide di
riserva dietro il lettore modulare di `s41`: se qualcuno chiede «e il lettore
che cosa farebbe, di preciso?», la risposta è qui.)*

*Una tabella sola: sei righe, e sempre le stesse cinque colonne — **luce in
ingresso**, **filtro**, **rivelatore**, **calore**, **serve anche**. Ogni metodo
è messo in conto sulle stesse cinque voci, quindi è il **disegno delle caselle
piene contro i trattini vuoti** a fare il discorso. Una barra scorre da una riga
all'altra e sotto cambia il commento.*

- La cornice, prima di tutto: **il dosatore compone la reazione, il lettore la
  trasforma in un numero.** Sono due mestieri diversi.
- **Fluorescenza** — LED blu, **due filtri**, fotodiodo, blocco a **65 °C**,
  scatola scura. Si eccita in blu e si legge il verde che torna indietro. È la
  **migliore sensibilità per euro speso**, e **l'analisi del PANPOC funziona
  già così**. Nota per la batteria: a consumare è il **riscaldatore**, non
  l'ottica.
- **Colorimetrico** — LED, fotodiodo, blocco a 65 °C. Il pH scende e la
  miscela vira dal rosa al giallo: si vede a occhio nudo. È **il lettore più
  economico che funzioni**, ma un campione sporco può soffocare il viraggio e
  farlo leggere come **falso negativo** — che è poi l'argomento di tutta questa
  tesi in piccolo: vale quanto vale la preparazione.
- **Torbidimetria** — LED a 650 nm, fotodiodo, riscaldatore. La reazione
  intorbida la provetta mentre va avanti. Segnale **debole**, e legge un solo
  tipo di reazione: sta nell'elenco perché i pezzi sono gli stessi che serve
  già avere per il colorimetrico.
- **Striscia a flusso laterale** — LED bianco, **telecamera**, portastriscia, e
  **nessun riscaldatore**: è quello che consuma meno di tutti. Si legge la linea
  del test contro quella di controllo. E qui la parte difficile **non è
  l'ottica, è tenere ferma la striscia nella posizione giusta** — cioè
  esattamente quello che il **modulo di allineamento** sa già fare.
- **Elettrochimico** — nessuna ottica, solo un potenziostato e una strisciolina
  stampata. Il legame diventa corrente su un elettrodo. Siccome non c'è luce di
  mezzo, **torbidità, colore e luce ambiente smettono di contare**: è forse
  quello che si sposa meglio con quello che questa macchina consegna. (È la
  famiglia del glucometro: la prova che questa classe di strumenti funziona a
  batteria e in mano a chi non è addestrato.)
- **Chemiluminescenza ed ECL** — sotto la riga, **il caso limite**: l'etichetta
  emette luce da sola, quindi non serve nessuna lampada, ma vuole un
  **fotomoltiplicatore** e una camera **davvero a tenuta di luce**. Più scatola
  di quanta ne abbia un modulo portatile.
- *Se chiedono perché non basta un telefono:* dà gratis una telecamera e un
  calcolatore, ma non dà controllo dell'esposizione, né filtri, né calore. Copre
  la striscia e il colorimetrico, e niente sotto.

### `b26` — il modello dà un punto di partenza ragionato; è la prototipazione sistematica a rendere affidabile il risultato
*(modulo pompa — sta nell'argomento della pompa, ma il testo viene dal capitolo 13 della tesi; nuova il 22-09-2026. È l'altra metà del discorso di
`s38`: lì si parla di **profondità contro ampiezza**, qui di **partire dal
modello contro partire dai prototipi**. L'ha chiesta Sirio apposta.)*

*Non sono due colonne: sono i due capi di **un ciclo**. A sinistra il pannello
«partire dal modello», a destra «partire dai prototipi», e nello spazio in mezzo
i due bracci della freccia: **all'andata le dimensioni da cui cominciare**, **al
ritorno le misure che tarano il modello**. Il braccio di ritorno è disegnato
**spezzato, con una × sopra**.*

- **Le due strade.** O si **ricavano le dimensioni da un modello** prima di
  costruire, oppure si **costruiscono molte varianti** e si ricava il modello
  dai dati.
- **Partire dal modello** dà un insieme di dimensioni ragionato da cui
  cominciare; ma **vale solo quanto la sua validazione**, e validarlo richiede
  a sua volta molte costruzioni.
- **Partire dai prototipi** misura il pezzo vero su tutta una gamma di
  dimensioni; ma **pretende una stampa abbastanza precisa** da far sì che le
  differenze fra i risultati vengano dalle dimensioni e non dalla stampante.
- **Per la pompa ho preso la prima strada**, e la ragione è semplice: scegliere
  diametri del rotore e luci di occlusione **senza** un modello sarebbe stato
  tirare a indovinare.
- **Ma il modello non è mai stato validato sperimentalmente**, ed è il braccio
  spezzato: le costruzioni sono servite a far venire i pezzi **come erano
  disegnati**, non a verificare quello che il modello prevedeva. Così il
  bersaglio di **5,0 µL a passo** è rimasto un bersaglio — sulla slide viene
  barrato — contro i **3,94 e 4,10 µL** che danno le due teste montate.
- **Che cosa chiude il cerchio: ±0,10 mm.** *Attenzione a come si legge:* non
  è una proprietà del liquido né una precisione di dosaggio, è una tolleranza
  **di fabbricazione** — quanto da vicino un pezzo stampato somiglia al suo
  disegno CAD, una volta applicate le regole di compensazione. Lo conferma la
  **v2.3**, che ha centrato la sua luce nominale di **1,52 mm**.
- Ed è proprio questo che rende sensata **adesso** una campagna sperimentale
  vera: se la stampante ripete, le differenze fra due rotori di prova sarebbero
  **geometria voluta** e non dispersione di stampa. La × sparisce, il ciclo si
  chiude.
- **La conclusione è che le due strade sono complementari**: il modello dà il
  punto di partenza, una campagna sistematica lo tara, e a quel punto si possono
  **stampare pompe per un volume per passo scelto a tavolino**.
- **Quello che resta aperto**, detto chiaro: tubi con diametro interno diverso
  da **0,51 mm**, liquidi diversi dall'acqua, e **corse da dieci ore** con una
  pesata prima e una dopo, per misurare quanto deriva il dosaggio mentre il tubo
  si consuma.

### `b13` — la costante della pompa non si trasferisce da una testa all'altra, né da una sessione all'altra
*(ricostruita il 23-09-2026. **È la slide che Sirio mette se qualcuno della
commissione nota che il capitolo 6 e il capitolo 12 danno numeri diversi.** La
risposta è semplice: non sono due risultati in contraddizione, **sono due
sessioni di misura diverse**, e la tesi le riporta tutte e due.)*

*Sullo schermo due schede **identiche nella forma**, una accanto all'altra: una
per sessione. Proprio perché sono costruite uguali, quello che salta all'occhio
è **in che cosa differiscono**.*

- **Che cosa hanno in comune**, scritto in cima: tutte e due il **10 settembre
  2026**, **le stesse due teste** di pompa, e sempre **1000 µL comandati a 180
  giri al minuto**. Non è che una sia una prova seria e l'altra no: cambiano le
  **condizioni**, e sono scritte sulle schede.
- **Tre numeri in alto, per inquadrare:**
  - **4,53 µL a passo** — quanto dava la testa provata **da sola al banco**, con
    una dispersione fra lo 0,25 % e lo 0,34 %.
  - **≈ 10 %** — quanto **meno** di quel valore danno tutte e due le teste una
    volta **montate nella macchina**, pur avendo luci di occlusione di 1,45 e
    1,52 mm.
  - **+1,3 / −5,0 %** — di quanto si è spostata, fra una sessione e l'altra, la
    quantità misurata che ogni testa dosa a ogni passo.
- **Sessione 1 — le due teste insieme** (è quella che pubblica il **capitolo
  12**): alimentazione **di rete a 3 A**, **una sola costante** uguale per tutte
  e due, **tre dosi** per canale, perché la quarta svuotava il flaconcino.
  Canale 1: impostato su 4,08, misurato 3,940, errore **−3,4 %**, dispersione
  **0,71 %**. Canale 2: impostato su 4,08, misurato 4,103, errore **+0,6 %**,
  dispersione **0,37 %**.
- **Sessione 2 — una testa per volta** (è la colonna del **capitolo 6**): a
  **batteria**, **ogni testa con la sua costante**, **linee ri-innescate**, tre
  dosi. Canale 1: impostato su 3,94, misurato 3,990, errore **+1,3 %**,
  dispersione **1,04 %**. Canale 2: impostato su 4,08, misurato 3,896, errore
  **−4,5 %**, dispersione **2,94 %**.
- **Il trucco per leggerle è la coppia «impostato su» / «misurato».** Guardando
  quelle due colonne si vede la deriva senza bisogno di una terza tabella. E in
  fondo alla slide c'è scritto a chiare lettere: **la sessione 2 ha comandato il
  canale 1 proprio con il 3,94 che la sessione 1 aveva misurato**, quindi quel
  **+1,3 %** non è un errore nuovo: è **la deriva stessa**, la stessa cosa
  raccontata in due modi.
- **La conclusione, ed è il motivo per cui la slide esiste:** dentro una
  sessione la macchina ripete bene, intorno all'1 %; **fra una sessione e
  l'altra** la costante si sposta di qualche punto percentuale. Non è
  un'incoerenza della tesi: è **la ragione per cui uno strumento da campo deve
  potersi ricalibrare da solo**, invece di fidarsi di un numero fissato in
  fabbrica. E per la stessa ragione **ogni canale si porta dietro la propria
  costante**.

### `b21` — i verdetti sui requisiti, uno per riga, con la motivazione
*(una cifra corretta il 23-09-2026.)*

- È la tabella completa dei **quindici requisiti**, quella che nel discorso
  compare riassunta in targhette: gruppo, requisito, verdetto e **su che cosa si
  basa quel verdetto**.
- Il conteggio in fondo diceva «6 soddisfatti» ed era sbagliato: la tabella
  della tesi ne ha **5 soddisfatti più 1 «per come è progettata»** — quello
  sulla contaminazione incrociata, che la riga stessa già chiamava così. Adesso
  legge: **5 soddisfatti · 1 per progetto · 3 in parte · 4 esclusi · 1 non
  provato · 1 non applicabile**, che fa **15**.
- L'asterisco sulla versatilità resta e dice quello che deve dire: **il limite
  inferiore da 5 µL non è ancora stato validato**.

## Da fare

- Parte II: **completa** (23-09-2026). Tutte le slide da `s11` a `s24` riscritte
  come didascalie brevi, una per passo, allineate alle note inglesi.
- Parte III: **completa** (22-09-2026). Da `s25` fino alla chiusura `s43`,
  divisori compresi: non manca nessuna slide. `s39` è stata spostata in
  appendice e i suoi punti sono lì.
- Appendice: scritte `s12`, `s39`, `s04c`, `b25`, `b26`, `b13` e `b21`. Le
  altre `B01`–`B24` non sono ancora state scritte in italiano.
- Rileggere i numeri: i punti qui sopra devono riportare le stesse cifre delle slide
  inglesi, mai arrotondate diversamente.
