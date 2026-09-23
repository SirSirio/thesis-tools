# Contenuti in italiano — apertura e Parte I

Punti di contenuto per la difesa, in italiano. Servono a due cose: Sirio li legge
mentre parla, e sono la base del mazzo ospite italiano (`it/`) da costruire più
avanti. **Contenuto soltanto: nessuna slide italiana va ancora costruita.**

**Regola permanente:** ogni volta che una slide viene costruita o il suo contenuto
cambia, questi punti vanno aggiornati nello stesso lavoro, senza aspettare che
qualcuno lo chieda. Se i punti e le note inglesi divergono, vuol dire che la slide
è cambiata e i punti no.

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
- *Design of an Automated and Portable Liquid Dispensing System in the µL scale for
  Biological Applications* — sottotitolo: *Bringing sample preparation to the point
  of care*.
- Tesi magistrale, DTU Bioengineering, gruppo NaBIS. Relatori: Maria Dimaki, Winnie
  Edith Svendsen, Lars Hvam. 28 settembre 2026.
- Il video sotto è la macchina che dosa davvero. Lasciarlo correre qualche secondo
  prima di parlare: l'audio fa parte della scena.

### 2 · `s02` — la sala arrivi, e una giornata intera su un asse
- Un passeggero atterra in una sala arrivi affollata nelle prime settimane di
  un'epidemia. Ha la febbre.
- L'operatore fa un tampone nasale, ma confermare il virus significa mandare quella
  provetta a un laboratorio centrale.
- Trattenerlo un giorno o due è impraticabile; lasciarlo passare significa mandare
  un'infezione non confermata su treni e autobus.
- Tutto l'asse è **una giornata**. Il test molecolare standard richiede **più di
  26 ore** — e quello è l'ospedale che usa il proprio laboratorio interno, non un
  campione spedito altrove.
- Un test molecolare portatile, **stesso studio, stesso ospedale, stessi pazienti**:
  **2,6 ore**. Accanto a una giornata è quasi niente, ed è esattamente il punto.
- **Sotto un'ora** è l'obiettivo, non una misura: è ciò che risolverebbe il dilemma
  al gate.
- La frase che chiude: *il test può arrivare al gate; la preparazione del campione
  ancora no.*

### 3 · `s04` — il laboratorio da campo
*Sulla slide: una sola fotografia, il titolo e la didascalia. Titolo nuovo:
«Bringing the lab to the sample often still requires pipetting and an expert.»*

- Il laboratorio si può già portare dove sta il campione: questa è una valigia da
  campo vera, con il ciclatore, il blocco magnetico, l'agitatore e le pipette.
- Ma guardate che cosa c'è ancora in mezzo: **quattro pipette manuali**. Il
  laboratorio viaggia; il lavoro di mano no.
- Serve comunque qualcuno che sappia pipettare. È esattamente il punto da cui parte
  questa tesi.
- *(Foto: Carlier et al. 2022, CC BY 4.0.)*

### 4 · `s03` — indice
- Parte I: il divario che questa macchina colma, e il modo di lavorare dietro.
- Parte II: i cinque moduli, nell'ordine in cui il liquido li incontra.
- Parte III: elettronica, integrazione, validazione.
- Poi: la dimostrazione dal vivo — cinque minuti, la macchina che lavora qui in sala.
- Infine: cosa ho imparato, cosa viene dopo, e la chiusura.
- I cinque segni accanto a ogni riga sono gli stessi che restano nell'angolo in basso
  per tutto il resto: uno si accende per la sezione in cui siamo.
- Domande alla fine; ci sono slide di riserva per i dettagli.

---

## Parte I — perché questa macchina, e come ho lavorato

### 5 · `s05` — divisore
- Due domande in questa parte: perché costruirla, e come è stato condotto il lavoro.

### 6 · `s06` — il divario
*Prezzi sulla slide: Tecan Fluent 25–80k$ (usato), Roche cobas liat 11k$ con
~100$ a test, Sidekick 710$ di costruzione. I due dati del cobas liat **non** sono
nella tesi: la macchina è un prezzo di rivendita (Dipylon Medical), il costo a test
viene dalla revisione CADTH sui test rapidi per l'influenza (~100 US$, cifra del
2015). Da dire a voce se qualcuno chiede.*
- Quattro proprietà in alto, tre famiglie di strumenti, una riga ciascuna.
- **Sistemi da laboratorio** (Tecan Fluent): precisi e aperti a qualunque protocollo,
  ma non lasciano il banco. Anche il Fluent più piccolo occupa 1,15 × 0,79 metri.
  Dai **25 agli 80 mila dollari**, usato.
- **Piattaforme integrate** (Roche cobas liat): portatili e autonome, ma i volumi sono
  fissati dentro la cartuccia e lo strumento resta legato a un solo saggio.
  **11 mila dollari** la macchina, circa **100 dollari** a test.
- **Portatili e open-source** (Sidekick): aperti e autonomi, ma calibrati sull'acqua
  e ancora legati a un banco. Costo di costruzione: **710 dollari**.
- Ogni famiglia fallisce almeno una proprietà, e mai la stessa.
- La quarta riga non ha fotografia perché non esiste uno strumento che la riempia.
  Quella riga è la macchina.

### 7 · `s04b` — da dove viene l'intervallo
*Due clic: prima i campi, poi i numeri che ne escono.*

- Non una stima, e non un solo protocollo: **cinque**, scelti perché utilizzabili
  fuori da un laboratorio e perché coprono campi diversi — clinico e veterinario,
  molecolare vegetale, chimica delle acque, agricoltura, chimica del suolo.
- Ciascuno letto integralmente, annotando ogni volume dichiarato.
- Nessuna rassegna aggrega i volumi dosati tra tipi di protocollo — le rassegne
  descrivono strumenti, gli articoli riportano solo il proprio protocollo — quindi
  sono stati letti uno per uno.
- **Quello clinico e veterinario è il protocollo PANPOC stesso**: il protocollo di
  riferimento sta dentro l'indagine, non è un sesto caso.
- *(secondo clic)* Ne esce la specifica. **Da 5 a 1000 µL per liquido**: sulla scala
  logaritmica si vede la differenza fra una goccia da 5 µL e una da un millilitro.
  E **fino a sei reagenti** in una sola sessione, uno per ogni fiala del disegno.
- Il tutto in decine di provette da 1,5 e 2 mL, senza presidio.

### 8 · `s07` — il problema di progetto e i vincoli
- Questo è il problema di progetto, nelle parole in cui la tesi lo formula:
  progettare un dosatore di liquidi portatile capace di erogare 5–1000 µL di fino a
  sei reagenti in decine di provette da 1,5 e 2 mL, non presidiato, con una precisione
  pari o superiore alla pipettatura manuale, usato sul posto da personale non
  specializzato.
- Ognuno di questi è un **cancello**, non un punteggio: un concetto che ne fallisce
  uno è escluso prima che si pesi qualunque cosa.
- Solo dopo i sopravvissuti vengono ordinati, su otto opportunità — prestazione,
  manutenzione, automazione, portabilità, contaminazione, sicurezza, fattibilità,
  sostenibilità — **non pesate a livello di sistema**. I pesi arrivano dopo, uno per
  modulo, quando la decomposizione esiste.
- Un punteggio alto non ricompra mai un requisito fallito.

### 9 · `s07b` — come i moduli si rapportano
- Mappare la sequenza operativa ha dato otto funzioni, quindi otto moduli: pompa,
  allineamento, ugello, stoccaggio, supporto provette, interfaccia utente,
  elettronica e software, e l'involucro attorno a tutto.
- Una macchina che dosa microlitri, posiziona provette, stacca gocce, gestisce
  reagenti, parla con un operatore e coordina l'attuazione **non può essere progettata
  come un sistema monolitico**.
- La regola che ha fissato i confini: un confine di interfaccia è fisicamente
  giustificato solo se la massa o l'informazione trasferita può essere definita con
  precisione. Qui ogni interazione è **o un trasferimento di fluido definito, o un
  segnale elettrico di controllo**. Nient'altro attraversa.
- Il supporto provette è tratteggiato perché concepito a sé e poi assorbito
  nell'allineamento. L'involucro è tratteggiato perché specificato e mai costruito.

### 10 · `s10` — la gerarchia
*Sulla slide c'è **solo una piramide** di sette moduli, ricostruita dalla figura 5.2
della tesi: in cima la **Pompa**, alla base l'**Involucro** (tratteggiato, mai
costruito). Niente frecce, niente note, nessun elenco dell'ordine: l'ordine si legge
dalla piramide stessa, dall'alto verso il basso.*

- Ordinando i moduli per quanto dipendono l'uno dall'altro si ottiene l'ordine che il
  lavoro ha dovuto seguire.
- La **pompa** sta in cima perché porta il requisito volumetrico più stringente e detta
  il principio di funzionamento a tutto il resto: nella sua matrice di valutazione ci
  sono una trentina di righe.
- Più si scende, più un modulo eredita vincoli dagli altri. L'elettronica ha tre
  requisiti e undici criteri e non nomina né tensioni né numero di driver: le sue
  richieste sono la somma di tutto ciò che sta sopra.
- L'involucro è alla base perché la sua geometria dipende da tutto il resto: per
  questo è stato specificato ma non costruito.
- Quando due moduli erano in conflitto, cedeva quello più in basso. **E la Parte II
  percorre la piramide dall'alto**: pompa, allineamento, ugello, interfaccia,
  stoccaggio.

### 11 · `s09a` — divisore: i metodi
*Sullo schermo ci sono **solo due righe**: «Methods, & engineering with AI.»
Nient'altro. Cinque secondi, si passa oltre. Sono i titoli dei capitoli tre e
quattro della tesi.*

- La Parte I poneva due domande. Il perché ha risposta; adesso il come.
- Quattro principi, dal design thinking: divergere e poi decidere, dividere la
  macchina in moduli, costruire fisicamente presto, lasciare che lo scarto
  sperimentale indichi la mossa successiva.
- Il ciclo — disegnare, costruire, provare, imparare — gira alla velocità del suo
  passo più lento. Stampare in casa lo ha portato da settimane a ore.
- E l'IA è stata parte del lavoro, dentro regole che ho scritto io. Stampa,
  cablaggio, montaggio e collaudo sono rimasti miei.

### 12 · `s09b` — stampa 3D
*Sulla slide: il titolo, a sinistra il pezzo che si costruisce strato su strato
(animazione) con **±0,1 mm** sotto, a destra la fotografia della stampante. Nessuna
didascalia, nessun testo piccolo, e **«weeks → hours» non c'è più**: il passaggio da
settimane a ore si dice a voce.*

- Ogni parte meccanica di questa macchina è uscita da una stampante nella stessa
  stanza in cui è stata disegnata: una **Bambu Lab P1S**, in PLA, con un profilo di
  slicing bloccato.
- È questo che ha fatto girare il ciclo: una modifica disegnata la mattina era sul
  banco lo stesso giorno. **Da settimane a ore.**
- Il prezzo: un pezzo stampato non è il pezzo che hai disegnato. Le interfacce di
  precisione chiedevano un decimo di millimetro, quindi è stata misurata la stampante
  stessa, come si calibra uno strumento: **±0,1 mm** di ripetibilità reale.
- *(Ugelli: 0,4 mm di default, 0,2 mm per gli accoppiamenti critici — non è più
  scritto sulla slide. Anche «0,01 mm» compare nella tesi ma è esplicitamente
  dichiarato inaffidabile: non citarlo.)*

### 13 · `s08a` — Engineering with AI
*Sullo schermo ci sono **solo il simbolo di Claude Code e il titolo «Engineering
with AI»**, al centro, in grande. È il titolo del capitolo quattro. Tutto il
resto si dice a voce. Il gruppo simbolo + titolo passa poi alla slide seguente,
rimpicciolito nell'angolo in alto a destra, e ci resta.*

- L'IA è stata nel progetto dalla prima settimana, come strumento di lavoro: **Claude
  Code**, dentro Visual Studio Code, sul progetto vero — legge file, scrive file,
  esegue i comandi che li verificano. È per questo che si può vincolare a qualcosa
  di scritto, e non soltanto conversarci.
- La sua parte è stata lo scritto e il calcolato: documenti di progetto, i calcoli,
  i modelli interattivi pubblicati sul sito della tesi, gli strumenti attorno al lavoro.
- **Stampare, cablare, montare e collaudare sono rimasti miei**, e ogni riferimento
  bibliografico è stato controllato e approvato a mano.
- Usata senza vincoli non sbaglia ogni tanto: **fallisce sempre negli stessi modi
  strutturali.** Ed è esattamente la slide successiva, e la ragione per cui la
  risposta è stato un ambiente con regole, non prompt migliori.
- Il capitolo quattro della tesi è su questo, e un'appendice documenta l'uso.

### 14 · `s08` — la casa
*La slide **si apre con il solo titolo «Engineering with AI»**, al centro e in
grande, ereditato dalla slide precedente: c'è tutto il tempo per introdurre
l'argomento. Al primo clic il gruppo si rimpicciolisce nell'angolo in alto a
destra e solo allora compaiono il titolo della slide, la lavagna e le schede.*
- Chiedendo solo "progetta una casa" ottieni una villa o una casa a schiera: entrambe
  valide, nessuna delle due quella che intendevi — ed è finita, completa, prima che
  qualcosa vada storto.
- Chiedi una finestra al piano di sopra e finisce mezza fuori dal muro, perché niente
  su disco aveva registrato dov'era quel muro.
- Poi riaffiora un'istruzione di tre sessioni prima, un muro portante si sposta, e il
  tetto viene con lui.
- Costruire senza specifica è decidere le stanze dopo aver alzato i muri: se controlli
  che il piano sia in bolla dopo aver portato dentro i mobili, o svuoti la casa o ti
  tieni un pavimento storto.
- Sono **fallimenti strutturali, non sbagli**: la risposta è un ambiente, non prompt
  migliori.

### 15 · `s09` — l'ambiente di lavoro
*Le frecce percorrono **solo** «the specs» e «the loop»: due pressioni e si passa
oltre. «The sources» e «the tools» sono **pulsanti** (bordo tratteggiato e un +):
si aprono cliccandoci sopra, uno alla volta, e servono per le domande. Cliccare
non fa avanzare la presentazione.*
- Le decisioni vengono fissate per iscritto prima che qualcosa venga pianificato o
  costruito: discutere, pianificare, eseguire, verificare, consegnare.
- Le fasi fisiche sono rimaste mie: stampare, cablare, montare, collaudare.
- Le fonti passavano da una pipeline di ricerca: sette banche dati in parallelo, poi
  un cross-encoder legge i quaranta candidati migliori e ne restituisce dodici — gli
  unici che l'assistente vede. Nessun riferimento è entrato senza un umano.
  *(Sulla slide: «AI-powered search tool». I numeri si dicono a voce.)*
- I modelli dietro queste decisioni sono pubblicati come strumenti funzionanti sul
  sito della tesi; tre si apriranno più avanti. *(Sulla slide: «Live website».)*

---

## Parte II — i moduli

### 16 · `s11` — divisore: i moduli
- La Parte II sono i **quattro moduli** che ho progettato e costruito: **pompa,
  allineamento, ugello, interfaccia utente**, nell'ordine in cui la tesi li affronta.
- La pompa viene per prima perché decide la dose; ogni altro modulo la serve.
- Nove minuti per i quattro. Lo stoccaggio dei reagenti, alla fine della parte, è
  lavoro di Marius Schiller: si mostra per completezza, non è un quinto modulo mio.
- *(I quattro simboli della striscia sono gli stessi disegni del marchio di modulo
  che compare nell'angolo di ogni slide di modulo: dal 2026-09-22 vengono da una
  sola mappa, così non possono divergere.)*

### 17 · `s12b` — trenta idee, due costruite
- Trenta meccanismi in sei famiglie, con dentro di proposito un martelletto di
  pianoforte e una macchinetta da tatuaggi: un'ideazione che restituisce solo idee
  praticabili non ha cercato abbastanza lontano.
- Tre delle trenta caselle non sono vuote: portano i **tre principi di dosaggio**
  disegnati nella tesi, un pannello ciascuno — **siringa, alternativa a membrana,
  peristaltica** — così che lo schermo mostri meccanismi veri in mezzo alle idee
  anonime. Le trenta idee restano trenta: 25 caselle vuote, 3 principi, 2 finalisti.
- Sette hanno superato i filtri — i tre principi sono fra questi — cinque sono stati
  sviluppati, divisi con Marius, due sono stati costruiti.
- A decidere è stata la **pulibilità**, non il punteggio: 3485 contro 3185 sono
  300 punti di scarto, e la matrice li attribuisce a ingombro, massa e pulibilità.
- Non è una questione di accuratezza: schiacciare avanti e indietro richiede una
  batteria di valvole di non ritorno per smistare più reagenti, e rimette così dentro
  la macchina proprio le parti bagnate in movimento che avevano escluso le altre.

### 18 · `s13` — la dose viene dalla geometria
- Due scelte e una conseguenza: **tubo da 0,51 mm di diametro interno** e **quattro
  rulli**; ogni corsa sposta **5 µL**.
- Dosare non è quindi cronometrare un flusso: è contare i passi del motore.
- Quattro rulli è il numero più piccolo che non lascia mai il tubo aperto, e il più
  grande che conserva margine di coppia a 12 V.
- Tre strumenti hanno fissato quel punto di progetto, e sono pubblicati e funzionanti
  sul sito della tesi: quale numero di rulli è realizzabile; quanto il rullo schiaccia
  il tubo, ed è per questo che il rotore è cresciuto da 15,6 a 19,70 mm; quanto un
  tubo in tensione sposta la dose, al massimo il 2 %.
- Sono stati costruiti mentre le decisioni erano aperte, non scritti dopo.

### 19 · `s14` — la prima pompa non sigillava, e il sensore di flusso si è rivelato inadeguato
*La slide è su due colonne: a sinistra **il prototipo**, aperto al primo passo e
chiuso all'ultimo; a destra **il metodo di misura**, che si decide nel mezzo. Il
blocco che si sta presentando è grande, quelli già presentati arretrano di una
taglia e restano in vista: alla fine la storia si legge tutta in un colpo d'occhio.*

- **Sinistra, il prototipo.** Due parametri sono arrivati sbagliati alla
  costruzione: il raggio del rotore, **2 mm troppo piccolo** (17,70 mm invece di
  19,70), e lo spessore della parete del tubo, stimato e non misurato. Nella foto
  la testa è tenuta giù da una striscia di nastro adesivo: non chiudeva. Un pezzo
  di carta piegata, infilato sotto, ha forzato l'occlusione.
- **Destra, il metodo.** Il sensore di flusso termico stava in linea fra la testa
  della pompa e il recipiente — nella foto del banco è l'oggetto cerchiato al
  centro — perché doveva essere l'elemento di retroazione di un anello chiuso.
- Ha restituito una **deviazione standard di 1159 µL/min attorno a una media di
  1104**: la dispersione è più grande della grandezza misurata. Lo zero è sull'asse
  orizzontale, così si vede che una deviazione standard scende sotto zero e che
  **un campione su sette** segna flusso inverso, con rapidi cambi di segno.
- **Destra, il metodo.** Nel blocco della bilancia c'è il **video della pesata**
  accanto all'inquadratura che porta la lettura, con il quadrilatero inclinato
  disegnato sul display: si vede la misura mentre avviene. Testa a testa sullo
  stesso millilitro comandato: la traccia
  integrata dà 600,1 µL con CV 17,6 % su cinque repliche, la bilancia analitica
  678,0 µL con CV 4,5 % su tre pesate. L'integrale del flusso sottostima
  dell'11,5 %. Da qui in poi **ogni volume della tesi è pesato**; le tracce di flusso
  restano solo per quello che una bilancia non può mostrare: innesco, ondulazione,
  riflusso.
- **Sinistra, il verdetto.** 678 µL su 1000 comandati sono **3,39 µL a corsa** contro
  i **5,00 nominali**, con un **CV del 4,5 %**: uno scarto sistematico **ripetibile**.
  Si ripete, quindi viene dalla forma dei pezzi, non dal motore. Il controllo in
  anello chiuso è stato accantonato qui.
- *(La tesi pubblica la media e il CV di quelle tre pesate, mai le tre masse
  singole: per questo la slide disegna una barra sola. Sullo schermo restano solo
  2 mm, 1104, 1159, 3,39, 5,00 e 4,5 % — gli altri numeri sono nelle note e si
  dicono a voce. Dal 2026-09-22 **nessuna fotografia è ritagliata**: ogni immagine
  si vede intera e viene solo rimpicciolita quando il suo blocco arretra.)*

### 20 · `s15` — altre tre costruzioni: hanno sistemato la stampa, non la fisica
- **v2.1**: la sede del cuscinetto stava **0,45 mm più in alto** dell'albero, così
  al vertice dell'arco il gioco si apriva a **2,22 mm** contro la soglia di
  chiusura di **1,82 mm**. Lì il tubo non era schiacciato.
- **v2.2**: i perni stampati sono conici — **0,085 mm** — e due cuscinetti
  impilati inclinavano il rullo di **0,6°**, che faceva camminare il tubo.
  Risolto con un solo cuscinetto, sulla base larga del perno.
- Una sede disegnata a **1,52 mm** è stata stampata a **1,75**: da qui la
  caratterizzazione della stampante su anelli di prova — **cinque corpi in tre
  misure**, quella intermedia stampata tre volte per misurare la ripetibilità
  della macchina con se stessa.
- Due regole, e sono diverse: un **diametro esterno perde lo 0,65 % della propria
  misura** (0,18 mm a 28 mm, 0,57 mm a 88 mm), un **foro interno perde 0,14 mm
  costanti**, a 22 mm come a 82. Da lì i pezzi diventano prevedibili a
  **± 0,10 mm**.
- **v2.3, la pompa smontata.** Nell'ultimo pannello c'è la pompa intera nei suoi
  pezzi: il motore passo-passo con il suo cavo, il supporto stampato, il corpo
  stampato con inciso sulla faccia **Gap: 1.52 V2.3**, e sotto quattro
  cuscinetti, cinque viti a brugola, le due metà del rotore e il tubo con i
  raccordi. Il valore per cui la pompa è stata costruita è scritto sul pezzo
  stesso.
- **v2.3, la misura**: il gioco, misurato con il calibro attraverso tre fessure
  di ispezione, legge **1,52 mm** al vertice e a entrambe le estremità. La
  figura a destra mostra dove: i tre anelli rossi sono le tre fessure, e ognuno
  porta fuori la propria lettura.
- Il punto: **una quota in CAD è un'ipotesi finché non è ancorata a un
  riferimento fisico.**

### 21 · `s16` — la pompa ripete una dose come una mano con una pipetta
- **Il riferimento, disegnato per primo.** Una pipetta da laboratorio usata a mano,
  **dieci repliche da 50 µL** sulla stessa bilancia, ha una dispersione dello
  **0,27 %**. È la linea tratteggiata del grafico. Il confronto vale per i **volumi
  cumulativi**: i punti della pompa sono consegne da 100 e da 300 corse.
- **Il motivo della prova.** Sulla slide c'è scritto soltanto che **la pompa è stata
  provata a quattro velocità**. Le velocità sono 60, 120, 180 e 240 giri al minuto;
  il perché si dice a voce, se lo chiedono: la rotazione mette in conflitto due cose
  — più piano si va, più volume esce a ogni corsa ma meno si ripete; più veloce si
  va, si perdono tutt'e due.
- **La scelta: 180 giri al minuto.** È la velocità con la dispersione più bassa,
  costa solo l'1,7 % del volume per corsa rispetto alla più lenta, e dosa **tre volte
  più in fretta** che a 60. Per questo è la velocità di esercizio. Lì il modulo sta
  allo 0,25 % su 100 corse e allo 0,34 % su 300: come una mano con la pipetta.
- **Il risultato: 4,53 µL a corsa**, media delle prove da 100 e da 300 corse, che
  concordano entro lo 0,02 %. È la **costante di calibrazione** del dispositivo:
  **dosa il 9,4 % in meno** del nominale di 5,0 µL, corretto una volta sola nel
  firmware. Il filmato accanto al grafico è una di queste pesate sulla bilancia
  analitica: ogni dose viene pesata, non guardata. *(Sulla slide: «4,53 µL — a corsa a quella velocità, un 9,4 % di
  sottodosaggio», e il riferimento della pipetta è etichettato solo
  «pipetta manuale — 0,27 %»; le dieci repliche si dicono a voce.)*
- *(Le due teste stampate dagli stessi file, 3,94 e 4,10 µL, si raccontano nella
  parte sulla validazione, non qui.)*


### 22 · `s17` — muovere le provette, tenere fermi gli aghi

- **La decisione cinematica.** Si muovono le provette, non gli aghi. Tre ragioni:
  il tubo che porta il liquido non si flette mai, quindi non si affatica e non si
  occlude; la posizione della rastrelliera mostra da sola a che punto è la corsa;
  e gli aghi fermi restano accessibili per ispezione, adescamento e sostituzione
  del tubo.
- **Da cinquanta idee a dieci.** La prima fase è stata fatta insieme a Marius:
  circa **cinquanta concetti** in sei famiglie — bracci robotici, caroselli
  rotanti, scivoli a gravità, guide lineari, e anche idee non convenzionali come
  spostare le gocce con campi magnetici o getti d'aria. Dopo uno screening
  qualitativo ne sono rimasti **dieci**; quattro di questi portano una
  rastrelliera sotto un ago fermo, ed è da quel gruppo che è nato il modulo.
- **La regola che ha deciso tutto, riquadrata sul foglio a mano: la pulibilità è
  la preoccupazione principale.** Prima la pulibilità, poi la fattibilità; e meno
  parti, giunzioni e fessure ci sono, meglio è.
- **Che cosa ha escluso.** Il **design circolare**, cioè il carosello: il moto
  lineare ha vinto su fattibilità e pulibilità. La **cinghia con pulegge** e in
  generale le trasmissioni chiuse: un pignone e una cremagliera stampati si
  smontano, si ispezionano e si lavano. La **spinta dal basso**: mettere la
  trasmissione sotto provette aperte vuol dire infiltrazioni, e nei punteggi del
  quarto foglio prende **9 punti** contro i **17** della spinta laterale e di
  quella dall'alto.
- **La rastrelliera detta le dimensioni della macchina.** Otto provette, perché
  l'automazione in biologia molecolare conta a multipli di otto (piastre 8 × 12,
  strip da otto, pipette multicanale) e perché lo strumento PANPOC a valle
  analizza 16 campioni, cioè esattamente due rastrelliere. Passo **22 mm**,
  misurato sul prototipo funzionante di apri-tappi di Pulkit: è lo spazio che
  serve alle dita della pinza. Quel passo, moltiplicato per sette, dà **154 mm
  di corsa**, e da lì viene l'ingombro dell'intero strumento: **a decidere le
  dimensioni della macchina è il consumabile, non la trasmissione.**

### 23 · `s18` — tre costruzioni, un modulo che trova da solo il proprio zero

- **V1.** Un pignone e una cremagliera stampati, a profilo a evolvente: la
  rastrelliera indicizza **22 mm** in modo ripetibile. È questa prova che ha
  permesso di lasciare stampata tutta la trasmissione.
- **V2.** Il motore sale **sopra il piano dei campioni**: a proteggere la
  trasmissione è la gravità, non una guarnizione — e una guarnizione è comunque una
  parte che si consuma e che a sua volta va pulita.
- **V2.1.** Un finecorsa normalmente chiuso e un azzeramento in tre passate: lo
  zero si ritrova entro **0,03 mm**, **nessun passo perso su 132 mm** di corsa, e
  l’azzeramento scende da **110 s a 22 s**.
- *(Se me lo chiedono: quella guida ha eseguito sei passi di indicizzazione prima
  che la rastrelliera arrivasse a fine pignone, dove otto posizioni ne richiedono
  sette. È un limite della lunghezza della guida, non della trasmissione, e il
  telaio V3 della slide successiva è la risposta.)*

### 24 · `s19` — il telaio finale: coda, corsia, vassoio

*(La slide inglese non ha testo: la pianta porta già scritto IN QUEUE, RAIL e OUT
QUEUE e il resto lo racconta il movimento. Questi punti sono il testo italiano.)*

- **Il percorso a U.** A sinistra la **coda di ingresso**, al centro la **corsia di
  dosaggio**, a destra il **vassoio di uscita**.
- **La coda di ingresso: quattro rastrelliere in attesa.** Un secondo asse
  trasversale spinge in avanti tutta la fila in attesa e porta la prima sulla
  corsia all'inizio di ogni ciclo. Il telaio è **progettato per cinque
  rastrelliere per lotto — quaranta provette**: quattro in attesa e una già
  caricata sulla corsia. *(È la capacità di progetto: la prova con il colorante
  del 10 settembre ne ha portate due.)*
- **La corsia di dosaggio: un passo alla volta.** L'asse 1 porta la rastrelliera
  da sinistra a destra a passi di **22 mm** — **sette passi, 154 mm** — e a ogni
  posizione si ferma mentre gli aghi dosano.
- **Il vassoio di uscita: due nervature, due scanalature, un ultimo passo da
  22 mm.** Sotto ogni rastrelliera ci sono due nervature inclinate; nel pavimento
  della corsia, alla stazione di espulsione, ci sono due scanalature inclinate
  corrispondenti. L'ultima corsa in avanti dell'asse 1 fa scorrere le nervature
  lungo le pareti inclinate e trasforma la spinta longitudinale in uno
  **scivolamento diagonale** che deposita la rastrelliera nel vassoio, un
  millimetro più in basso. **Nessun secondo motore, nessuna molla, nessun perno.**
- **E il modulo ha smesso di essere un modulo: è diventato il telaio.** Circa
  **500 mm** di ingombro, **309 mm di corsa utile**, stampato in **tre sezioni**
  (così, se cambia una scanalatura, se ne ristampa solo un terzo), con il vano
  elettronica al centro.
- *(Se me lo chiedono: il modo di guasto noto è un tappo lasciato aperto piatto
  invece che in piedi. Tocca la parete smussata accanto alla corsia e frena la
  rastrelliera con un attrito che la trasmissione non può percepire, quindi il
  firmware crede di essere in una posizione che la rastrelliera non ha
  raggiunto.)*

### 25 · `s20` — il modulo ago, ricostruito da zero

- **Il prototipo consegnato da Marius non funzionava.** Al momento del passaggio
  il principio era valido ma il meccanismo era **inoperativo**: la massa
  eccentrica era un braccetto stampato in plastica, troppo debole per staccare la
  goccia appesa. Non c'era **nessuna interfaccia meccanica** per montarlo sul
  telaio. E il file era in OpenSCAD, che esporta soltanto **mesh**: aperto in
  Fusion 360 dava un corpo solido non modificabile.
- **Quindi l'ho rimodellato da zero**, prendendo le quote con il calibro dal pezzo
  fisico. Il principio del distacco per vibrazione è di Marius e l'ho tenuto:
  con i tempi del progetto aveva senso rendere funzionante un principio già
  verificato invece di esplorarne uno nuovo.
- **La sede dell'ago è lo stampo in negativo del suo stesso cono Luer.** Su tutti
  i calibri commerciali il cono e la geometria Luer sono identici: cambia solo il
  diametro interno della cannula. Una sede stampata come negativo del cono accetta
  **qualunque ago** con un accoppiamento scorrevole, **giusta alla prima stampa** e
  **senza attrezzi**. Prima c'era un grano che stringeva direttamente sull'acciaio:
  serviva una chiave a ogni cambio e, stringendo troppo, si schiacciava la cannula.
- **Un solo grado di libertà: verticale.** Il carrello scorre su colonnine
  cilindriche che assorbono tutte le componenti laterali della forza generata
  dall'eccentrico. È questo che impedisce alla goccia di partire di lato.
- **Il motore e la fascetta.** Al posto del braccetto stampato: un magnete e **tre
  dadi d'acciaio** sfalsati sull'albero, che danno un momento sbilanciato molte
  volte maggiore. Con quella vibrazione il carrello ha cominciato a risalire le
  colonnine fino a sfilarsi, quindi sono stati fatti due fori e passate delle
  **fascette elastiche** — nella foto ne è montata una. Restano lente per tutta
  la corsa utile e vanno in tensione solo ai fine corsa: trattengono senza togliere
  la cedevolezza che serve alla vibrazione.
- *(I tre trattini azzurri dei punti elenco sono allineati al centro ottico del
  testo per costruzione dal 2026-09-22.)*

### 27 · `s22` — lo schermo ereditato intrappolava l'operatore, quindi è stato ridisegnato in un browser che si controllava da solo

- **V1 consegnata.** Il firmware ereditato si portava sul nuovo microcontrollore
  senza problemi — bastava rimappare i pin del display — ma **finirlo era un'altra
  cosa**. La schermata di calibrazione non aveva né annulla né indietro: chi ci
  entrava per sbaglio **poteva uscirne solo spegnendo la macchina**. E i comandi
  scendevano fino a **25 × 14 px**, contro i **44 × 44 px** che ogni standard
  ergonomico indica come minimo — su questo pannello sono appena **8,9 mm**.
- **V2.2 ricostruita.** Su una tela alta **240 px** una riga leggibile con il suo
  margine tattile ne occupa da 50 a 60: **entrano tre righe e basta**. Quindi
  l'interfaccia ha smesso di essere un elenco ed è diventata **un'immagine della
  macchina** — le bottiglie mostrano il livello reale, il rack è disegnato al suo
  passo vero, ogni provetta ha la sua banda di colore.
- **Nove candidate, tre giri, e ogni pagina si misurava da sola.** Le candidate sono
  state disegnate come pagine web **alla risoluzione nativa 320 × 240**, e ogni
  pagina a ogni render misurava il proprio comando più piccolo, le etichette
  troncate e il contrasto di ogni testo sul colore davvero disegnato dietro —
  **calcolato dopo la riduzione a 16 bit del pannello**.
- **7:1 è l'asticella**, non un risultato: è il rapporto di contrasto che le linee
  guida internazionali raccomandano per il testo piccolo, ed è il valore contro cui
  ogni pagina si verificava. *(Da dire a voce, non è sullo schermo: la prima
  palette ha fallito il proprio requisito a **6,2:1**, ed è stata corretta nel
  browser, prima che arrivasse sul dispositivo.)*

### 28 · `s23` — una corsa intera, dall'inizio alla fine, su un solo schermo

- **Sei schermate sono tutta la corsa**: home, scelta della ricetta, assegnazione
  dei liquidi ai canali, verifica prima della partenza, dosaggio, fine. Arrivano
  tutte insieme: **non le racconto una per una.**
- **La verifica è il punto.** Confronta il volume che la ricetta chiede con il
  volume che le bottiglie hanno: se manca, il pulsante di avvio si disabilita e
  **si rinomina in REFILL FIRST**; se il margine è sotto il 10 %, un avviso ambra
  chiede una conferma esplicita. Il blocco **tiene da ogni pagina della verifica**.
- **Poi apro lo strumento dal vivo** — *Live User Interface* — e faccio una corsa
  lì: sono le catture reali del pannello, e ogni pulsante porta dove porta il
  firmware. La macchina qui sotto fa la stessa cosa.
- **La regola di fondo: l'interfaccia non mostra mai un numero di cui non può
  rispondere.** Dove il livello non si legge, lo scrive e non mostra cifre.

### 29 · `s24` — il reagente aspetta in un flaconcino sigillato, letto da un sensore e prelevato da due aghi

- **Da dove viene.** È **l'unico modulo della macchina che non ho progettato io**:
  Marius Schiller l'ha progettato e costruito nel progetto parallelo e me l'ha
  consegnato come **hardware funzionante**. Sullo schermo il credito lo dice per
  esteso; io dico solo questo e passo oltre.
- **Come si monta**: la cartuccia scende dentro il manicotto, il manicotto si
  infila sul porta-aghi. Il flaconcino sta **capovolto**, chiuso da un setto che
  **si richiude** quando l'ago esce.
- **Il filtro dell'aria — è l'unica cosa cerchiata sulla slide.** Ogni flaconcino
  è forato da **due** aghi: uno preleva il reagente, l'altro **sfiata** il
  contenitore, perché altrimenti la pressione interna cala e l'estrazione si ferma
  molto prima che il flaconcino sia vuoto. E siccome **quell'aria di rimpiazzo
  finisce dritta nel reagente**, la linea dell'aria termina in un filtro a siringa
  da **0,22 µm**: abbastanza fine da trattenere i microrganismi, quindi l'aria che
  entra è di fatto sterile.
- **È arrivato come mesh, non come modello**, e questo ha condizionato
  l'integrazione: i file non si convertivano in geometria parametrica, quindi il
  supporto è stato progettato **attorno all'hardware fisico**, misurato al banco.


---

## Parte III — la macchina

*Scritti il 22 settembre 2026. **La Parte III è completa**: da `s25` fino alla
chiusura `s43`, compresi i divisori `s25` e `s37a`, ogni slide ha i suoi punti
in italiano. `s39` non è più qui: il 22 settembre è stata spostata in
**appendice**, e i suoi punti stanno in fondo, nella sezione dell'appendice. La
numerazione qui sotto è stata richiusa di conseguenza.*

### 30 · `s25` — divisore: Parte III-A. Una sola macchina.

- Da qui in poi i moduli spariscono: c’è un oggetto solo.
- Tre tappe, la stessa figura del divisore della Parte II: **architettura di
  sistema ed elettronica**, **integrazione**, **validazione**. La goccia
  percorre la linea e le accende una per una.
- Cablata, montata, validata: è l'ordine in cui la racconto.

### 31 · `s26` — venticinque architetture di sistema, scremate con due strumenti interattivi

*Sulla slide c'è la domanda, e sotto due strumenti veri, che apro dal vivo. Non
sono schermate: sono pagine pubblicate sul sito della tesi. In alto, la
targhetta del modulo dice «architettura ed elettronica».*

- **La domanda.** **Un solo microcontrollore** deve far funzionare **uno
  schermo, sei pompe, due assi e un motore a vibrazione**. (È il motorino che
  stacca la goccia dalla punta dell'ago. Da non confondere con lo *shaker*: nella
  tesi lo shaker è la **piastra agitatrice esterna** che la macchina serve a
  risparmiare all'operatore.)
- **Il primo strumento — System Architecture Explorer.** **Venticinque
  architetture di sistema**, raggruppate in **quattro famiglie**, ognuna costata
  su un **catalogo reale di distributore** e verificata **piedino per piedino**
  contro le linee di ingresso e uscita davvero disponibili sul processore.
- **E il verdetto, sullo schermo, sta in una riga: «hanno deciso i piedini e
  l'intelligenza dei driver, non il costo».** È l'unica frase della slide che è
  un giudizio mio e non una citazione, e mette insieme tre cose.
  - **I piedini.** Sono il **vero collo di bottiglia**. Un ESP32 mette a
    disposizione una **sedicina** di linee di ingresso e uscita utilizzabili: lo
    schermo se ne prende **otto**, il lettore di schede una **nona**, e ne
    restano **sette** prima ancora di collegare un motore — mentre sei driver
    «semplici» ne vogliono **dodici**, o **otto** se condividono la linea dei
    passi. Molte combinazioni cadono già qui, prima di ogni altra
    considerazione.
  - **L'intelligenza dei driver.** Non conta la velocità del processore, conta
    **che cosa sa fare il driver da solo**. Un driver «semplice», a passo e
    direzione, obbliga il microcontrollore a commutare un piedino **a ogni
    micropasso**: con sei pompe il processore non fa altro. Un driver
    «intelligente» si genera da solo il treno di impulsi, e allora far girare
    **più canali insieme** diventa possibile.
  - **E non il costo.** Tutte le soluzioni che stanno dentro il bilancio dei
    piedini si tengono entro un **10 %** circa l'una dall'altra: il prezzo dei
    componenti, da solo, **non decide l'architettura**.
- **Il secondo strumento — Dispense Choreography Simulator.** Un rack di otto
  provette che avanza sotto sei aghi, con i tempi veri di dosaggio. Risultato,
  scritto sullo schermo: **la seconda pompa cattura l'86 %** del tempo che si
  può guadagnare lavorando in parallelo; **quelle dopo rendono sempre meno**.
- *Da dire:* una revisione di datasheet sarebbe finita **sull'ultima opzione
  esaminata**, qualunque fosse. Gli strumenti sono serviti a misurare tutte e
  venticinque con lo stesso metro — ed erano aperti mentre la decisione era
  ancora da prendere, non scritti dopo.

### 32 · `s27` — un solo clock muove sei pompe, perché una dose è un numero di passi

*Sulla slide ci sono soltanto due figure intere e tre parole: «Control»,
«Power» e lo stato della seconda figura. In alto, come nella slide precedente,
la targhetta del modulo dice «architettura ed elettronica».*

- Due disegni, uno dopo l'altro: quello che porta i **segnali** e quello che
  porta la **potenza**.
- **Segnali.** Un solo processore. I sei driver delle pompe condividono lo
  stesso treno di impulsi di passo e direzione, e ognuno ha la propria linea di
  abilitazione: una dose è un numero di passi, quindi il clock può essere lo
  stesso per tutte e sei. Le parti lente — il controllore del sensore di livello
  e l'espansore di porte — stanno su un bus a due fili.
- **Potenza, come costruita.** Un'unica linea a 12 V, dalla batteria per utensili
  o dall'alimentatore da banco, passando dall'interruttore. Da lì partono i sei
  driver delle pompe, i due motori dell'allineamento e la scheda del processore;
  un convertitore ricava la linea a 5 V per il motore a vibrazione.
- **Potenza, di produzione** — sono le parti tratteggiate che compaiono al
  secondo clic. Un pacco batteria a 24 V e una linea motori a 24 V, con uno
  stadio di riduzione prima della scheda. Non è montata: i condensatori di bulk
  da 16 V oggi installati vanno sostituiti prima che quella linea possa entrare.

### 33 · `s28` — ogni pompa e il suo flaconcino stanno nello stesso supporto stampato

*La slide si apre **con il solo titolo**: le immagini arrivano al primo clic. Da
qui e per tre slide, in fondo allo schermo cresce poi una **barra**: una sola
immagine per ogni cosa che l'integrazione ha prodotto, con una targhetta
colorata. Resta lì, e alla fine ce ne sono quattro.*

- Un supporto per canale: la **pompa scende dall'alto**, il **flaconcino entra
  da davanti**. Assi perpendicolari, e la linea di aspirazione resta la più
  corta possibile.
- Caricato: dal flaconcino all'ago il percorso del liquido non si dirama mai.
  Ogni canale è un modulo a sé.
- Due varianti, identiche dentro. Quello centrale ha tre linguette avvitate
  alla parete posteriore; quello di sinistra, al posto della terza, ha una
  **flangia alta** con tre fori in colonna che si appoggia alla parete laterale
  esterna.
- Montati: incastri a coda di rondine **più** viti, e **ogni vite è
  orizzontale** — «uno strumento che si prende in mano deve sopravvivere a chi
  non sa quale pezzo porta il carico».
- Costruiti **2 canali su 6**: gli altri quattro sono capacità prevista, non
  hardware.

### 34 · `s29` — l'ago si avvita al telaio, lo schermo si inclina a 45 gradi

- **L'ago**: una sola immagine, perché il modulo è già stato mostrato nella
  Parte II. Qui conta una cosa sola: **non è servito nessun pezzo nuovo**. Il
  supporto si appoggia direttamente sul vano elettronico. Le viti sono **tre,
  ma una non si vede**: due scendono dall'alto e la terza è **orizzontale**,
  dentro la parete del vano, fuori dall'inquadratura — sulla fotografia sono
  cerchiate le due visibili e la targhetta lo dice, **«3 viti, 1 nascosta»**.
  Delle sei posizioni per gli aghi ne sono montate **due**. Poi la miniatura
  scende nella barra in fondo come **ago montato**, e **la fotografia resta
  dov'è**: se ne va solo al passaggio successivo, quando arrivano i disegni
  dello schermo.
- **Il supporto dello schermo**, in CAD: diviso in due metà unite da una coda di
  rondine scorrevole, così quando sono state aggiunte le clip per il pennino è
  bastato ristampare **mezza** parte. In tutto **una decina di stampe**.
- **Sulla macchina**, inclinato a **45°**: lo strumento è pensato per stare
  sotto il livello degli occhi — su un tavolo o sul cassone di un furgone — e a
  45° lo schermo guarda in faccia chi sta in piedi davanti.
- Il pennino sta in due clip ed è legato con un filo: regge come prova di
  concetto, non come soluzione definitiva.

### 35 · `s30` — un supporto batteria già pubblicato e tre viti

- Il pezzo **più economico di tutta l'integrazione**: un supporto DeWalt già
  pubblicato, importato senza errori — al contrario delle mesh del modulo di
  stoccaggio, che non si sono mai lasciate modificare. I fori originali sono
  stati **riempiti in CAD e rifatti per viti M3**.
- **Tre viti orizzontali** sulla parete anteriore e il pacco batteria viaggia
  con la macchina invece di stare accanto.
- Il pacco si attacca allo **stesso connettore** dell'alimentatore da banco:
  nessun cablaggio interno è stato toccato.
- Con questo la barra in fondo è **completa**: supporto pompa-flaconcino, ago,
  supporto schermo, supporto batteria.
- Il filmato: la macchina che lavora **all'aperto, a batteria**. È uno scenario,
  non una dichiarazione: senza involucro il funzionamento affidabile resta al
  chiuso.

### 36 · `s30b` — quattro giunzioni, e i moduli diventano un oggetto solo

*Una sola battuta, e poche cose sullo schermo: la macchina vista dall'alto con
le quote, il peso scritto grande accanto, e in fondo la barra ormai completa.*

- In fondo, tutte e quattro le cose che l'integrazione ha prodotto: supporto
  pompa-flaconcino, ago, supporto schermo, supporto batteria. Sopra, la macchina
  finita vista dall'alto.
- **50 × 35 × 18 cm** e **3,3 kg**: quattro giunzioni, e i moduli sono diventati
  **un oggetto solo**, che si prende in mano e si porta via.
- *Se serve, a voce:* la batteria vale **5,5 cm** della profondità, e l'altezza
  la decidono i moduli di stoccaggio.

### 37 · `s31` — calibrata su se stessa, la macchina resta entro il 3,4 % del bersaglio

*Un grafico solo, un filmato e un pannellino: la fascia è il margine ammesso, le
barre sono gli scarti, e la graffa arancione è il punto di tutta la slide.*

- **La prova.** **1000 µL comandati** attraverso tutto il percorso fluidico
  montato — dal flaconcino all'ago, macchina intera — raccolti in **provette
  tarate appoggiate nel rack**, chiuse subito e pesate così com'erano. Non in
  una navetta di pesata: è quello che dice la targhetta sul filmato, **«pesato
  nella provetta»**.
- **Prima i limiti, poi i risultati.** La fascia chiara è il **limite del 10 %**
  attorno al bersaglio: è il margine che il requisito concede.
- **Con la costante presa dalla pompa provata da sola al banco**, la macchina
  eroga circa il **18 % in meno**: la barra esce dalla fascia, a sinistra.
- **Dopo la ricalibrazione** — è la graffa arancione, e abbraccia i due canali.
  Rimisurando la costante **sulla macchina montata**, gli scarti diventano
  **−3,4 %** sul canale 1 e **+0,6 %** sul canale 2: tutti e due comodamente
  dentro il limite del 10 %.
- **Quanto dà davvero ogni testa a ogni passo**: **3,94 µL** il canale 1 e
  **4,10 µL** il canale 2, cioè circa il **10 % in meno** della stessa testa
  provata isolata al banco. È esattamente il divario che la ricalibrazione
  assorbe.
- **Quanto ripete, da una dose all'altra.** Sullo schermo c'è scritto per esteso
  di che numero si tratta: il **coefficiente di variazione** su **tre dosi
  consecutive da 1000 µL per ciascun canale, nella stessa sessione**. Viene
  **0,71 %** sul canale 1 e **0,37 %** sul canale 2 — e sono le stesse identiche
  dosi da cui vengono le barre qui sopra.
- **Attenzione a non confondere due cose diverse**, perché è tutto il punto:
  - **Ripetibilità dentro una sessione** è quanto una dose somiglia alla
    precedente, adesso, con la macchina montata e le linee già innescate:
    **0,71 %** e **0,37 %**. È quello che si vede sullo schermo.
  - **Accordo fra sessioni** è un'altra grandezza: se si svuotano le linee, si
    riempiono di nuovo e si riaccende la macchina un altro giorno, **la costante
    si sposta**. Fra le due sessioni del 10 settembre si è spostata
    del **+1,3 %** e del **−5,0 %**.
- *Non è scritto sulla slide, ma lo dico:* è proprio quel secondo numero la
  ragione per cui uno strumento da campo deve potersi **ricalibrare da solo**.
  Ripetere bene oggi non garantisce di ripetere lo stesso domani.

### 38 · `s32` — dosaggio non presidiato, validato su cinque rack e quaranta provette

*Una fotografia sola che si trasforma: la macchina prima della corsa e la
macchina dopo, senza niente disegnato sopra. A destra il conteggio e il filmato
accelerato; in basso, staccato dal resto, un riquadro tratteggiato.*

- **La prova.** Un protocollo a **due reagenti** — **100 µL** e **75 µL** in
  ogni provetta — su **quaranta provette in cinque rack**, dall'inizio alla fine
  **senza nessun intervento**. Alimentata dall'alimentatore da banco, non a
  batteria.
- Quello che ha reso possibile la corsa non presidiata è poco appariscente: gli
  assi lineari sono stati **rallentati**, così i motori passo-passo avevano la
  forza di spingere un caricatore da **cinque rack** carico senza bloccarsi.
  Costa un po' di tempo di ciclo, ed è tempo ben speso.
- **Primo rack e ultimo rack**, due provette accostate: livelli **uguali a
  occhio**. Fra la prima e l'ultima non si vede deriva.
- **Fuori bersaglio, e si conta a parte.** **Tre gocce** hanno bagnato il piano
  del rack o la corsia invece di finire in una provetta. **Tre gocce, non tre
  provette**: in una corsa a due reagenti su quaranta provette le gocce dosate
  sono ottanta. E il conto è **tenuto separato** dal problema dei tappi, che
  arriva nella slide successiva — la tesi li distingue apposta, e li distinguo
  anch'io.
- *Se qualcuno chiede quanto è durata la corsa:* **la tesi non riporta nessun
  tempo**, e non ne invento uno.

### 39 · `s33` — i tre modi di guasto: attrito dei tappi, batteria che si scarica, setto che perde

*Tre carte, una alla volta: quella di cui sto parlando si allarga, le altre due
restano strette ai lati. Le due fotografie si vedono **intere**, mai tagliate,
e i segni disegnati sopra spariscono insieme alla carta quando si richiude.*

- **Il tappo.** Nella stessa fotografia ci sono tutti e due i casi, e il
  confronto è tutto lì. Un tappo è **ripiegato indietro a 135°** e resta
  libero sopra il piano: è cerchiato in **verde**. Un altro è rimasto
  **piatto**, sporge di lato dalla sua provetta, e una **freccia rossa** lo
  accompagna fino alla parete della corsia: cerchiato in **rosso**. Quando
  succede, l'asse perde dei passi per l'attrito — ed è un asse **ad anello
  aperto**, senza nessun sensore che dica dove si trovi davvero il carrello —
  quindi **il firmware crede che il rack sia arrivato** mentre è rimasto
  indietro, e la goccia cade **accanto** alla provetta invece che dentro. È un
  problema di **preparazione del materiale di consumo**, non di cinematica
  della macchina.
- **La batteria.** Si vede nell'ordine in cui è successo. Prima il pacco
  **carico** e **le due teste che girano regolari**. Poi il pacco che si
  **scarica**, e **tutte e due che si inchiodano** insieme, vibrando sul posto
  senza più compiere un giro. Infine **una sola che gira**, mentre l'altra resta
  ferma. È esattamente il problema: un pacco scarico **non regge il dosaggio su
  due canali insieme**, e il firmware oggi **non sa far girare una pompa per
  volta**, quindi la prova si è dovuta fermare. Era arrivata a **due rack, 16
  campioni**; sullo schermo si legge **RUN STOPPED**.
- **Il setto.** Il flaconcino è chiuso da un setto di gomma che l'ago deve
  bucare a ogni prelievo, e sulla slide lo si vede fare: l'ago **entra** nel
  disco, resta dentro un istante, si **ritira**, e ricomincia — cinque volte,
  con un segno che resta a ogni entrata; poi le altre quindici arrivano tutte
  insieme. Il setto tiene per circa **cinque** punture; **oltre le venti non si
  richiude più in modo affidabile** e restano gocce sulla punta degli aghi. È
  lì che vive il rischio di sversamento. *Da dire chiaro:* questa **non è una
  debolezza di un mio modulo** — la tesi la attribuisce al **modulo di
  stoccaggio**, che è di **Marius Schiller**. I miei quattro sono **pompa,
  allineamento, ugello e interfaccia utente**.
- **Nessuno dei tre è un problema di cinematica**, e per tutti e tre la
  correzione è già individuata: pareti della corsia ridisegnate, motori più
  forti e rilevamento della perdita di passi; un sensore di corrente e un
  firmware che faccia girare una pompa alla volta; un setto richiudibile diverso,
  abbinato a una valvola a pinza sulla linea dell'aria.

### 40 · `s34` — valutazione dei requisiti

*Quindici targhette in cinque colonne: è la tabella dei verdetti della tesi,
portata sullo schermo una colonna alla volta. Verde soddisfatto, ambra in parte,
grigio escluso.*

- **Prestazioni.** Accuratezza e ripetibilità: **soddisfatte**. La versatilità
  è **soddisfatta con un asterisco**, e l'asterisco è scritto sotto la colonna:
  **il limite inferiore da 5 µL non è ancora stato validato**, anche se ci si
  aspetta che passi. La fattibilità non compare come esito di prova, perché non
  lo era: era **un filtro nella scelta del concetto**, non un test della
  macchina costruita.
- **Automazione.** Una corsa completa da **40 provette** portata a termine
  **senza nessun intervento**: soddisfatto. L'**addestramento** dell'operatore
  resta **non provato** — rimandato per mancanza di tempo.
- **Portabilità.** Soddisfatta **in parte**: la macchina si trasporta, ma
  l'intervallo ambientale in cui deve funzionare è **escluso** dalla verifica.
- **Contaminazione.** Il passaggio di liquido fra un campione e l'altro è
  impedito **per come è fatta la macchina**, non da un lavaggio: ogni canale ha
  la sua linea e non la condivide con nessuno. I percorsi fluidici sono a posto.
  **Vento** e **lavabilità** restano **esclusi**.
- **Sicurezza.** Versamenti ed esposizione dell'operatore: **in parte**. La
  **sicurezza elettrica** è **esclusa**, perché l'elettronica è ancora su
  breadboard.
- **E poi, con un clic tutto suo**, le linee tratteggiate raccolgono i quattro
  requisiti esclusi e li portano a **tre** destinazioni diverse, perché non
  aspettano tutti la stessa cosa: **involucro** (intervallo ambientale e vento), **materiali
  sanificabili** (lavabilità) e **circuito stampato (PCB)** (sicurezza
  elettrica).
- **Perché la lavabilità sta per conto suo.** Non è una questione di
  copertura: **il PLA stampato non è una superficie sanificabile** — è poroso,
  a strati, e non si disinfetta. Per quel requisito serve un **cambio di
  materiale**: metallo con rugosità di grado clinico certificata, oppure
  **polipropilene**, sulle superfici di scorrimento. **Un involucro non
  risolverebbe quel requisito**, ed è per questo che ha una pasticca sua.
- Detto in chiaro: quello che manca è dichiarato, e **nessuno dei quattro
  aspetta i meccanismi**.

### 41 · `s35` — la macchina funziona ed è pronta a lavorare dal vivo

*Quattro filmati insieme, tutti già in movimento, e nient'altro che il titolo.
Da qui Sirio va al banco.*

- **Primo piano dell'ugello** — il filmato verticale, alto quanto lo schermo: la
  goccia che si forma sulla punta dell'ago e si stacca.
- **Il motore che gira** — lo stesso filmato con cui si è aperta la difesa: la
  testa peristaltica in funzione.
- **Corsa in timelapse** — una corsa intera, accelerata.
- **Corsa a batteria, all'aperto** — la macchina fuori, alimentata dal pacco
  batteria. È l'unico filmato che porta l'audio.
- Qui **non si clicca per far succedere qualcosa**: una pressione qualsiasi porta
  alla **dimostrazione dal vivo**. Se Sirio clicca *sopra* un filmato, quello si
  ingrandisce a tutto schermo e prende l'audio; Esc rimette il mosaico.

### 42 · `s36` — dimostrazione dal vivo

- Sullo schermo due parole sole: **Live Demo**. Sotto, più piccolo e in
  secondo piano, l'indirizzo del sito.
- La macchina arriva in sala già pronta: colorante nei flaconcini, un rack
  caricato, le linee riempite.
- Per la famiglia, la scaletta dei cinque minuti: si carica un rack, si sceglie
  una ricetta sullo schermo, si mostra il controllo dei reagenti prima della
  corsa, si dosano una o due provette con il colorante, si guarda la goccia
  staccarsi e si vede il rack uscire nella coda di uscita.

### 43 · `s37a` — divisore: Parte III-B. Discussione e prospettive.

- Solo il titolo: niente tappe, niente simboli, niente goccia che corre. La
  discussione e le prospettive sono un discorso unico.
- La macchina è stata mostrata e fatta funzionare; da qui si parla di che cosa
  significa.

### 44 · `s37` — il prototipo dimostra il concetto, non uno strumento finito

*Sopra la foto della macchina, in penombra, quattro righe si accendono una dopo
l'altra; poi arrivano due carte.*

- **Canali costruiti: 2 su 6.** Gli altri quattro sono capacità prevista, non
  hardware esistente.
- **Liquidi dosati: acqua e colorante.** Mai i reagenti veri.
- **Il limite inferiore da 5 µL: non verificato** sulla macchina montata.
- **Utenti non addestrati: nessuno.** Nessuno fuori dal progetto l'ha mai usata.
- Niente di tutto questo è un fallimento del concetto: è **il confine di quello
  che le prove dimostrano**, e conviene dirlo io prima che lo chieda qualcun
  altro.
- Prima di credere a qualsiasi altra cosa servono **due prove**: il **protocollo
  PANPOC con i suoi reagenti veri**, e **una persona alla sua prima volta** che
  maneggia rack, provette, tappi e flaconi — non soltanto lo schermo.

### 45 · `s38` — profondità e ampiezza nella prototipazione: il modulo pompa e il modulo allineamento

*Prima la tabella delle due strategie, una riga per volta; poi le prove, con due
intestazioni che dicono già tutto: a sinistra **«pompa — ampiezza e
profondità»**, con sotto **«3 concetti, 4 costruzioni»**; a destra
**«allineamento — ampiezza solo sulla carta»**, con **«1 concetto su una
cinquantina, costruito»**.*

- **Profondità** — che cosa dà e che cosa costa. Dà: porta un concetto scelto
  fino alla **precisione che può raggiungere**. Costa: **impegna su una forma
  prima che le alternative siano state costruite**.
- **Ampiezza** — dà: confronta le alternative **come hardware** e non sulla
  carta. Costa: una costruzione frettolosa rischia di confrontare **due
  realizzazioni invece di due meccanismi**.
- **La pompa ha avuto tutte e due, e i tre concetti stanno qui uno accanto
  all'altro.**
  - **Pinza lineare — è di Marius, ed è stata costruita.** Il capitolo 6 lo dice
    per esteso: due concetti peristaltici sono stati portati avanti **in
    parallelo** fino a prototipi funzionanti — quello rotativo mio, e una
    **pompa peristaltica lineare a camera sviluppata da Marius Schiller nella
    tesi parallela**. Adesso nel riquadro c'è **la fotografia della sua pompa**,
    che mi ha passato lui: prima c'era solo un disegnino schematico.
  - **Pompa a siringa — misurata, mai costruita.** L'ho **misurata su uno
    strumento da laboratorio commerciale**, per avere un termine di paragone
    sull'accuratezza di dosaggio. **Non ne ho costruita una**: è proprio questa
    distinzione il motivo per cui la slide è stata rifatta. Nel riquadro c'è il
    filmato della prova al banco — verticale, quindi ha un riquadro suo e le
    tre caselle sono state ribilanciate attorno a lui invece di tagliarlo. È uno
    spezzone corto, **solo il banco**: nella ripresa originale la camera si
    spostava via dalla pompa e metà del filmato mostrava lo schermo di un
    portatile.
  - **Rotativa — mia, ed è quella scelta.** Ha vinto il confronto a punteggio
    **3485 contro 3185**, e su quella sola sono arrivato a **4 costruzioni**: è
    lì che sta la profondità.
- **L'allineamento no.** Circa **cinquanta concetti** raccolti, i superstiti
  disegnati a mano, e **uno solo costruito**. Ed è il modulo che decide le
  dimensioni della macchina: una giostra circolare, o un portale che muove gli
  aghi sopra le provette ferme, potevano venire più compatti — a costo di molta
  più complessità di costruzione.
- **Il modello.** Il disegno della geometria del rotore ha dato un punto di
  partenza ragionato, e la testa v2.3 ne è uscita; ma **non è mai stato
  validato sperimentalmente**. Il bersaglio era **5,0 µL a passo** — sulla
  slide viene barrato — e le teste montate danno **3,94 e 4,10 µL**.
- Oggi la stampante tiene **±0,10 mm**, ed è questo che renderebbe sensata una
  vera campagna sperimentale di rotori: le differenze fra due rotori sarebbero
  geometria voluta, non dispersione di stampa. **La slide finisce qui**, sul
  modello: il discorso più lungo su «modello contro prototipi» sta in una slide
  di appendice, `b26`.

### 46 · `s40` — il prossimo prototipo parte dai moduli, nell'ordine in cui la geometria dipende

*Sei caselle in fila e un puntino che passa la geometria dall'una all'altra:
ogni stadio prende la forma da quello che lo precede.*

- **01 · Il nucleo fluidico: pompa, stoccaggio, ugello.** Vanno sviluppati
  **insieme**, finché le interfacce fluidiche non sono stabili, perché sono loro
  tre a decidere il volume erogato. (Lo **stoccaggio** è il modulo di **Marius
  Schiller**, non uno dei miei quattro: qui entra nel gruppo perché il liquido
  passa di lì.)
- **02 · L'apri-tappi.** È **l'ultimo gesto manuale** rimasto in una corsa per il
  resto automatica, e va risolto **prima** di congelare il rack: aprire i tappi
  da soli richiede di sapere dove sta ogni provetta con precisione.
- **03 · Il rack dei campioni**, che da quello prende le misure.
- **04 · L'allineamento**, con **motori più forti** e un **rilevamento della
  perdita di passi ad anello chiuso**, che fermi la macchina se nasce attrito.
- **05 · L'elettronica**: **una sola scheda** al posto delle breadboard, linea
  motori a **24 V**, e la misura dello stato di carica della batteria, che oggi
  manca.
- **06 · L'involucro, per ultimo**, perché la sua forma eredita tutto quello che
  ha sotto.
- *Da dire:* questa volta i moduli sono stati sviluppati in parallelo per forza,
  perché il tubo della pompa è arrivato con **sei settimane** di ritardo. La
  prossima volta, in ordine.

### 47 · `s41` — un campione preparato non è una risposta: accanto al dosatore ci vuole un lettore

*Questa slide è stata rifatta da capo: il disegnino di prima non diceva niente.
Adesso a sinistra c'è **una fotografia della macchina vera**, e a destra un
lettore **disegnato a tratteggio**. La differenza fra le due immagini è voluta:
una cosa esiste, l'altra è una proposta.*

- **A sinistra, quello che esiste**: la macchina, con la targhetta **«il
  dosatore · costruito»**. Prepara il campione e **non fa nessuna misura**: non
  sa dire se il campione è positivo o negativo.
- **A destra, quello che manca**: **«il lettore · proposto, non costruito»**, ed
  è disegnato tratteggiato apposta, perché non voglio far credere che esista.
  Fra i due, una freccia e una parola: **il campione**.
- **Una sola sede, cinque moduli.** Il lettore ha **un solo alloggiamento** per
  il rivelatore. Dentro c'è la **fluorescenza**, che è quella che il protocollo
  PANPOC implica; sotto, su una guida, ce ne sono altri quattro con **lo stesso
  ingombro e lo stesso aggancio**: **colorimetrico**, **torbidimetria**,
  **striscia a flusso laterale** ed **elettrochimico**. La frase sullo schermo lo
  dice: *«una sede, cinque moduli: il lettore è quello che ci infili dentro»*.
  Il conto preciso dell'hardware che serve a ciascuno è in una slide di
  appendice.
- **Un codice sul kit** che configura tutti e due gli strumenti: l'operatore
  **carica e scansiona** invece di impostare. È la differenza fra uno strumento
  da campo e uno strumento da laboratorio.
- *Il motivo di fondo, se qualcuno lo chiede:* la **preparazione** è in gran
  parte la stessa per analisi diverse, la **rivelazione** no. Per questo il
  rivelatore non deve stare chiuso dentro il dosatore.

### 48 · `s42` — di nuovo la sala arrivi

*Sullo schermo non c'è scritto niente. Torna la fotografia con cui ho aperto, e
alla fine lascia il posto alla macchina all'aperto. Tre tempi, detti piano.*

- **Uno.** Tornando, per finire, al viaggiatore della sala arrivi: oggi il suo
  tampone deve ancora **viaggiare fino a un laboratorio centrale**. Questa tesi
  mostra che **la preparazione del campione non è costretta a farlo**.
- **Due.** Uno strumento portatile può dosare liquidi **con precisione e senza
  nessuno che lo sorvegli**. Prima di poter stare a un varco d'aeroporto dovrà
  essere **ricostruito a partire da moduli maturi**, **provato con i reagenti
  veri e con utenti veri**, e **affiancato a un lettore** che dia il risultato
  diagnostico finale.
- **Tre**, mentre la sala arrivi lascia il posto alla macchina: se quel
  viaggiatore potrà un giorno essere testato e lasciato andare **prima di uscire
  dal terminal** resta **una domanda aperta** — ma non è più una domanda a cui
  possa rispondere **soltanto un laboratorio centrale**.

### 49 · `s43` — grazie

- **Grazie.** Sullo schermo restano due parole grandi, una per lato: a sinistra
  **«Thank you.»** sopra i nomi, a destra **«Questions?»** sopra il simbolo della
  pompa che gira. Il codice QR e l'indirizzo del sito **sono stati tolti**: non
  c'è più niente da leggere, solo da guardare.
- **I relatori: Maria Dimaki, Winnie Edith Svendsen, Lars Hvam.**
- **E poi Marius Dornonville de la Cour Schiller** — il progetto parallelo, e il
  **modulo di stoccaggio** che mi ha consegnato come hardware funzionante — **e
  Pulkit Saluja**.
- **È questa la slide che resterete a guardare per tutta la sessione di
  domande**: resta lì, ferma, mentre si parla. È composta per quello — due
  parole, i nomi, e il simbolo che continua a girare.
- *Un dettaglio, per chi lo nota:* il **simbolo della pompa che gira**, sotto
  la parola «Questions?», è **lo stesso identico** della schermata di attesa
  con cui si è aperta la
  difesa — stesso disegno, stesso alone, stessa rotazione lenta e continua. Si
  chiude come si era cominciato.
- Dopo questa slide ci sono le slide di riserva, tenute in fondo apposta per le
  domande.

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

- Parte II: scritti il divisore, le slide della pompa fino a `s16`, poi `s17`,
  `s19`, `s20`, e infine `s22`, `s23` e `s24` (riscritte il 2026-09-22 sui nuovi
  contenuti, non tradotte dalle vecchie didascalie). `s18` è stata scritta il
  2026-09-23. **Manca ancora `s21`.**
- Parte III: **completa** (22-09-2026). Da `s25` fino alla chiusura `s43`,
  divisori compresi: non manca nessuna slide. `s39` è stata spostata in
  appendice e i suoi punti sono lì.
- Appendice: scritte `s12`, `s39`, `s04c`, `b25`, `b26`, `b13` e `b21`. Le
  altre `B01`–`B24` non sono ancora state scritte in italiano.
- Rileggere i numeri: i punti qui sopra devono riportare le stesse cifre delle slide
  inglesi, mai arrotondate diversamente.
