/**
 * Mock-mode preview switches (design QA without the sidecar):
 *   ?theme=dark|light  &locale=en|it|pt  &material=glass|solid  &private=1  &hue=200
 *   &pill=idle-hint|listening|thinking|speaking|clarify|approval-low|approval-medium|approval-high|error|muted
 *   &sessions=0 (empty state)  &onboarding=1
 * Sample copy mirrors the Claude Design handoff (docs/design/handoff/).
 */
import type { PillState } from '../types/ui';
import { type MockSnapshot, mockApproval } from './index';

type PreviewLocale = 'en' | 'it' | 'pt';

const PREVIEW_LOCALES: readonly PreviewLocale[] = ['en', 'it', 'pt'];

/** Picks the copy for the active locale: `t(english, italian, portuguese)`. */
const pick =
  (locale: PreviewLocale) =>
  <T>(en: T, it: T, pt: T): T =>
    locale === 'it' ? it : locale === 'pt' ? pt : en;

const CLARIFY_REPLIES = {
  en: ['The two in my open tabs', 'MacBook Air vs XPS 13', 'Never mind'],
  it: ['I due nelle schede aperte', 'MacBook Air vs XPS 13', 'Lascia stare'],
  pt: ['Os dois das abas abertas', 'MacBook Air vs XPS 13', 'Deixa pra lá'],
} as const;

export function previewPill(kind: string, locale: PreviewLocale, privateMode = false): PillState | null {
  const t = pick(locale);
  switch (kind) {
    case 'idle-hint':
      return { kind: 'idle-hint', shortcut: ['Alt', 'Space'] };
    case 'listening':
      return privateMode
        ? {
            kind: 'listening',
            level: 0.6,
            committed: t('Jarvis, summarise what I', 'Jarvis, riassumi quello che', 'Jarvis, resuma o que eu'),
            partial: '',
          }
        : {
            kind: 'listening',
            level: 0.6,
            committed: t(
              'Jarvis, in project shop add a',
              'Jarvis, nel progetto shop aggiungi',
              'Jarvis, no projeto shop adicione',
            ),
            partial: t('foo', 'un fo', 'um ro'),
          };
    case 'thinking':
      return {
        kind: 'thinking',
        transcript: t(
          'Jarvis, in project shop add a footer',
          'Jarvis, nel progetto shop aggiungi un footer',
          'Jarvis, no projeto shop adicione um rodapé',
        ),
        brain: 'chatgpt',
      };
    case 'speaking':
      return {
        kind: 'speaking',
        text: t(
          'On it — Claude Code is starting in shop. I’ll tell you when it’s done.',
          'Ci penso io — Claude Code parte in shop. Ti avviso quando ha finito.',
          'Deixa comigo — o Claude Code está começando no shop. Aviso quando terminar.',
        ),
        progress: 0.45,
        level: 0.5,
      };
    case 'clarify':
      return {
        kind: 'clarify',
        question: t('Which two laptops?', 'Quali due portatili?', 'Quais dois notebooks?'),
        quickReplies: [...CLARIFY_REPLIES[locale]],
      };
    case 'approval-low':
    case 'approval-medium':
    case 'approval-high':
      return { kind: 'approval', request: mockApproval(locale, kind.slice(9) as 'low' | 'medium' | 'high') };
    case 'error':
      return {
        kind: 'error',
        message: t(
          'I can’t search your Documents folder yet.',
          'Non posso ancora cercare nella cartella Documenti.',
          'Ainda não consigo pesquisar na pasta Documentos.',
        ),
        actionLabel: t('Open settings', 'Apri impostazioni', 'Abrir configurações'),
      };
    case 'muted':
      return { kind: 'muted', reason: 'focus' };
    default:
      return null;
  }
}

export function previewPatch(snap: MockSnapshot, search: string): Partial<MockSnapshot> {
  const q = new URLSearchParams(search);
  const requested = q.get('locale') as PreviewLocale | null;
  const locale: PreviewLocale = requested && PREVIEW_LOCALES.includes(requested) ? requested : snap.settings.locale;
  const theme = q.get('theme');
  const material = q.get('material');
  const hue = Number(q.get('hue'));
  const settings: MockSnapshot['settings'] = {
    ...snap.settings,
    locale,
    ...(theme === 'dark' || theme === 'light' ? { theme: theme as 'dark' | 'light' } : {}),
    ...(material === 'glass' || material === 'solid' ? { material: material as 'glass' | 'solid' } : {}),
    ...(q.get('private') === '1' ? { privateMode: true } : {}),
    ...(q.get('onboarding') === '1' ? { onboardingComplete: false } : {}),
    ...(Number.isFinite(hue) && hue > 0 && hue <= 360 ? { accentHue: hue } : {}),
  };
  const pillState = previewPill(q.get('pill') ?? '', locale, settings.privateMode);
  return {
    settings,
    pill: { state: pillState ?? snap.pill.state, privateMode: settings.privateMode },
    pending: pillState?.kind === 'approval' ? [pillState.request] : snap.pending,
    sessions: q.get('sessions') === '0' ? [] : snap.sessions,
    // First run: nothing is connected yet.
    ...(q.get('onboarding') === '1'
      ? {
          providers: [
            { id: 'chatgpt', connected: false, state: 'needs-login', primary: false },
            { id: 'claude', connected: false, state: 'needs-login', primary: false },
            { id: 'api-anthropic', connected: false, state: 'not-installed', primary: false },
            { id: 'local', connected: false, state: 'not-installed', primary: false },
          ],
        }
      : {}),
  };
}
