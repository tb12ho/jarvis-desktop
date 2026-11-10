/**
 * Default voices per provider and locale, used when the user has not picked one
 * (`settings.ttsVoice["<provider>.<lang>"]` or `settings.ttsVoice["<provider>"]`).
 *
 * - ElevenLabs: premade "George" (warm, British, butler-like) — multilingual models speak Italian with it too.
 * - OpenAI:     "onyx" (deep, calm) for every locale; gpt-4o-mini-tts voices are multilingual.
 * - Fish Audio: no default — without `reference_id` Fish uses its built-in default speaker; users pick from `voices()`.
 * - Piper:      en → en_US-lessac-medium, it → it_IT-paola-medium (downloaded on demand).
 * - Kokoro:     en → bm_george (British male); Kokoro's JS build only phonemizes English.
 */
export const DEFAULT_VOICES = {
  elevenlabs: { en: 'JBFqnCBsd6RMkjVDRZzb', it: 'JBFqnCBsd6RMkjVDRZzb', pt: 'JBFqnCBsd6RMkjVDRZzb' },
  openai: { en: 'onyx', it: 'onyx', pt: 'onyx' },
  piper: { en: 'en_US-lessac-medium', it: 'it_IT-paola-medium', pt: 'pt_BR-faber-medium' },
  kokoro: { en: 'bm_george', it: 'bm_george', pt: 'bm_george' },
} as const;

export type VoiceLang = 'en' | 'it' | 'pt';

export const lang = (locale: string): VoiceLang => {
  const code = locale.slice(0, 2).toLowerCase();
  if (code === 'it') return 'it';
  if (code === 'pt') return 'pt';
  return 'en';
};

export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
