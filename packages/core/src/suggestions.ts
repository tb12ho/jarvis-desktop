import type { Locale } from './model.js';

export type SuggestionCategory =
  | 'day'
  | 'reminders'
  | 'writing'
  | 'screen'
  | 'files'
  | 'web'
  | 'home'
  | 'developer'
  | 'memory'
  | 'privacy';

export type SuggestionRequirement = 'mcp-calendar' | 'mcp-email' | 'screen' | 'clipboard' | 'developer' | 'agent';

export interface Suggestion {
  id: string;
  category: SuggestionCategory;
  icon: string;
  label: string;
  utterance: string;
  requires?: SuggestionRequirement[];
}

type Pair = [string, string];

type Entry = Omit<Suggestion, 'label' | 'utterance'> & {
  en: Pair;
  it: Pair;
  pt: Pair;
  hours?: [number, number];
};

const CATALOGUE: Entry[] = [
  {
    id: 'briefing',
    category: 'day',
    icon: 'sunrise',
    hours: [5, 12],
    requires: ['agent'],
    en: ['Morning briefing', 'Jarvis, good morning'],
    it: ['Briefing del mattino', 'Jarvis, buongiorno'],
    pt: ['Briefing da manhã', 'Jarvis, bom dia'],
  },
  {
    id: 'today',
    category: 'day',
    icon: 'calendar-days',
    requires: ['mcp-calendar'],
    en: ["What's on today?", 'Jarvis, what do I have today?'],
    it: ['Cosa ho oggi?', 'Jarvis, cosa ho in programma oggi?'],
    pt: ['O que tenho hoje?', 'Jarvis, o que eu tenho hoje?'],
  },
  {
    id: 'meeting-prep',
    category: 'day',
    icon: 'users',
    requires: ['mcp-calendar', 'agent'],
    en: ['Prep my next meeting', 'Jarvis, prepare me for my next meeting'],
    it: ['Prepara la prossima riunione', 'Jarvis, preparami per la prossima riunione'],
    pt: ['Preparar minha próxima reunião', 'Jarvis, me prepare para a próxima reunião'],
  },
  {
    id: 'timer',
    category: 'reminders',
    icon: 'timer',
    en: ['Set a timer', 'Jarvis, timer for 10 minutes'],
    it: ['Imposta un timer', 'Jarvis, timer di 10 minuti'],
    pt: ['Definir um timer', 'Jarvis, timer de 10 minutos'],
  },
  {
    id: 'remind',
    category: 'reminders',
    icon: 'bell',
    en: ['Remind me later', 'Jarvis, remind me in 20 minutes to call Marco'],
    it: ['Ricordamelo dopo', 'Jarvis, ricordami tra 20 minuti di chiamare Marco'],
    pt: ['Me lembre depois', 'Jarvis, me lembra daqui a 20 minutos de ligar para o Marcos'],
  },
  {
    id: 'alarm',
    category: 'reminders',
    icon: 'alarm-clock',
    hours: [18, 24],
    en: ['Wake me up', 'Jarvis, alarm at 7:30'],
    it: ['Svegliami', 'Jarvis, sveglia alle 7:30'],
    pt: ['Me acorda', 'Jarvis, alarme às 7:30'],
  },
  {
    id: 'summarise-clip',
    category: 'writing',
    icon: 'clipboard-list',
    requires: ['clipboard'],
    en: ['Summarise what I copied', 'Jarvis, summarise what I copied'],
    it: ['Riassumi quello che ho copiato', 'Jarvis, riassumi quello che ho copiato'],
    pt: ['Resuma o que copiei', 'Jarvis, resuma o que eu copiei'],
  },
  {
    id: 'translate-clip',
    category: 'writing',
    icon: 'languages',
    requires: ['clipboard'],
    en: ['Translate clipboard', 'Jarvis, translate what I copied into English'],
    it: ['Traduci gli appunti', 'Jarvis, traduci in inglese quello che ho copiato'],
    pt: ['Traduzir a área de transferência', 'Jarvis, traduza o que eu copiei para o inglês'],
  },
  {
    id: 'fix-clip',
    category: 'writing',
    icon: 'spell-check',
    requires: ['clipboard'],
    en: ['Fix my writing', 'Jarvis, fix the grammar of what I copied'],
    it: ['Correggi il testo', 'Jarvis, correggi quello che ho copiato'],
    pt: ['Corrigir meu texto', 'Jarvis, corrija a gramática do que eu copiei'],
  },
  {
    id: 'dictate',
    category: 'writing',
    icon: 'keyboard',
    en: ['Dictate here', 'Jarvis, dictate'],
    it: ['Detta qui', 'Jarvis, dettatura'],
    pt: ['Ditar aqui', 'Jarvis, ditado'],
  },
  {
    id: 'reply-mail',
    category: 'writing',
    icon: 'mail',
    requires: ['mcp-email', 'agent'],
    en: ['Reply politely', 'Jarvis, write a polite reply to the last email'],
    it: ['Rispondi con garbo', "Jarvis, scrivi una risposta gentile all'ultima mail"],
    pt: ['Responder com educação', 'Jarvis, escreva uma resposta educada para o último e-mail'],
  },
  {
    id: 'screen',
    category: 'screen',
    icon: 'scan-eye',
    requires: ['screen'],
    en: ['What am I looking at?', "Jarvis, what's on my screen?"],
    it: ['Cosa sto guardando?', 'Jarvis, cosa vedo sullo schermo?'],
    pt: ['O que estou vendo?', 'Jarvis, o que tem na minha tela?'],
  },
  {
    id: 'explain-error',
    category: 'screen',
    icon: 'bug',
    requires: ['screen'],
    en: ['Explain this error', 'Jarvis, explain this error'],
    it: ['Spiegami questo errore', 'Jarvis, spiegami questo errore'],
    pt: ['Explique este erro', 'Jarvis, explique este erro'],
  },
  {
    id: 'find-doc',
    category: 'files',
    icon: 'file-search',
    requires: ['agent'],
    en: ['Find a document', 'Jarvis, find the September electricity bill PDF'],
    it: ['Trova un documento', 'Jarvis, trova il PDF della bolletta della luce di settembre'],
    pt: ['Encontrar um documento', 'Jarvis, encontre o PDF da conta de luz de setembro'],
  },
  {
    id: 'tidy-downloads',
    category: 'files',
    icon: 'folder-sync',
    requires: ['agent'],
    en: ['Tidy my Downloads', 'Jarvis, tidy up my Downloads folder'],
    it: ['Riordina i Download', 'Jarvis, metti in ordine la cartella Download'],
    pt: ['Organizar meus Downloads', 'Jarvis, organize a pasta Downloads'],
  },
  {
    id: 'research',
    category: 'web',
    icon: 'globe',
    requires: ['agent'],
    en: ['Research something', 'Jarvis, look up reviews of the latest Pixel'],
    it: ['Fai una ricerca', "Jarvis, cerca le recensioni dell'ultimo Pixel"],
    pt: ['Fazer uma pesquisa', 'Jarvis, pesquise avaliações do Pixel mais recente'],
  },
  {
    id: 'compare',
    category: 'web',
    icon: 'scale',
    requires: ['agent'],
    en: ['Compare two products', 'Jarvis, compare the two laptops I copied'],
    it: ['Confronta due prodotti', 'Jarvis, confronta i due portatili che ho copiato'],
    pt: ['Comparar dois produtos', 'Jarvis, compare os dois notebooks que eu copiei'],
  },
  {
    id: 'shopping',
    category: 'home',
    icon: 'shopping-cart',
    en: ['Shopping list', 'Jarvis, add milk to the shopping list'],
    it: ['Lista della spesa', 'Jarvis, aggiungi il latte alla lista della spesa'],
    pt: ['Lista de compras', 'Jarvis, adicione leite à lista de compras'],
  },
  {
    id: 'weather',
    category: 'home',
    icon: 'cloud-sun',
    requires: ['agent'],
    en: ["Tomorrow's weather", "Jarvis, what's the weather tomorrow?"],
    it: ['Meteo di domani', 'Jarvis, che tempo fa domani?'],
    pt: ['Previsão para amanhã', 'Jarvis, como vai estar o tempo amanhã?'],
  },
  {
    id: 'recipe',
    category: 'home',
    icon: 'chef-hat',
    hours: [11, 21],
    en: ['Cook with what I have', 'Jarvis, a recipe with eggs, spinach and feta'],
    it: ['Cucina con quello che hai', 'Jarvis, una ricetta con uova, spinaci e feta'],
    pt: ['Cozinhar com o que tenho', 'Jarvis, uma receita com ovos, espinafre e queijo feta'],
  },
  {
    id: 'build',
    category: 'developer',
    icon: 'hammer',
    requires: ['developer'],
    en: ['Build something', 'Jarvis, in project shop add a footer'],
    it: ['Costruisci qualcosa', 'Jarvis, nel progetto shop aggiungi il footer'],
    pt: ['Construir algo', 'Jarvis, no projeto shop adicione um rodapé'],
  },
  {
    id: 'status',
    category: 'developer',
    icon: 'activity',
    requires: ['developer'],
    en: ["How's it going?", "Jarvis, how's it going?"],
    it: ['A che punto sei?', 'Jarvis, a che punto sei?'],
    pt: ['Como está indo?', 'Jarvis, em que pé estamos?'],
  },
  {
    id: 'open-result',
    category: 'developer',
    icon: 'external-link',
    requires: ['developer'],
    en: ['Open the result', 'Jarvis, open the result'],
    it: ['Apri il risultato', 'Jarvis, apri il risultato'],
    pt: ['Abrir o resultado', 'Jarvis, abra o resultado'],
  },
  {
    id: 'codex',
    category: 'developer',
    icon: 'repeat',
    requires: ['developer'],
    en: ['Switch to Codex', 'Jarvis, do the same with Codex'],
    it: ['Passa a Codex', 'Jarvis, rifallo con Codex'],
    pt: ['Trocar para o Codex', 'Jarvis, faça o mesmo com o Codex'],
  },
  {
    id: 'teach',
    category: 'memory',
    icon: 'brain',
    en: ['Teach me something about you', 'Jarvis, remember that I prefer short answers'],
    it: ['Insegnami qualcosa di te', 'Jarvis, ricordati che preferisco risposte brevi'],
    pt: ['Me ensine algo sobre você', 'Jarvis, lembra que eu prefiro respostas curtas'],
  },
  {
    id: 'what-you-know',
    category: 'memory',
    icon: 'book-user',
    en: ['What do you know about me?', 'Jarvis, what do you know about me?'],
    it: ['Cosa sai di me?', 'Jarvis, cosa sai di me?'],
    pt: ['O que você sabe sobre mim?', 'Jarvis, o que você sabe sobre mim?'],
  },
  {
    id: 'go-local',
    category: 'privacy',
    icon: 'shield-check',
    en: ['Go fully local', 'Jarvis, switch to local mode'],
    it: ['Tutto in locale', 'Jarvis, passa alla modalità locale'],
    pt: ['Tudo local', 'Jarvis, mude para o modo local'],
  },
  {
    id: 'forget-today',
    category: 'privacy',
    icon: 'eraser',
    en: ['Forget today', "Jarvis, delete today's history"],
    it: ['Dimentica oggi', 'Jarvis, cancella la cronologia di oggi'],
    pt: ['Esquecer hoje', 'Jarvis, apague o histórico de hoje'],
  },
];

export interface SuggestionContext {
  locale: Locale;
  hour: number;
  capabilities: Set<SuggestionRequirement>;
}

const pickPair = (entry: Entry, locale: Locale): Pair => {
  if (locale === 'it') return entry.it;
  if (locale === 'pt') return entry.pt;
  return entry.en;
};

export function allSuggestions(locale: Locale): Suggestion[] {
  return CATALOGUE.map((entry) => {
    const { en: _en, it: _it, pt: _pt, hours: _h, ...rest } = entry;
    const [label, utterance] = pickPair(entry, locale);
    return { ...rest, label, utterance };
  });
}

/** "For you": suggestions whose requirements are met, ranked by time-of-day relevance, then catalogue order. */
export function suggestionsFor(ctx: SuggestionContext, limit = 8): Suggestion[] {
  const usable = CATALOGUE.filter((e) => (e.requires ?? []).every((r) => ctx.capabilities.has(r)));
  const inHours = (e: Entry) => (e.hours ? ctx.hour >= e.hours[0] && ctx.hour < e.hours[1] : false);
  const ranked = [
    ...usable.filter(inHours),
    ...usable.filter((e) => !inHours(e) && !e.hours),
    ...usable.filter((e) => e.hours && !inHours(e)),
  ];
  const all = allSuggestions(ctx.locale);
  return ranked.slice(0, limit).flatMap((e) => all.filter((s) => s.id === e.id));
}
