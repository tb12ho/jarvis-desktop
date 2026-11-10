import { describe, expect, it } from 'vitest';
import { intlLocale } from '../src/model.js';
import { parseYesNo, phrases, spokenDuration } from '../src/phrases.js';
import { matchFastIntent } from '../src/router/fastpath.js';
import { matchWakeUtterance } from '../src/voice/transcript.js';

describe('pt-BR locale', () => {
  it('maps the short locale code to a BCP 47 tag for Intl', () => {
    expect(intlLocale('pt')).toBe('pt-BR');
    expect(intlLocale('it')).toBe('it-IT');
    expect(intlLocale('en')).toBe('en-GB');
  });

  it('has the same phrase keys as English', () => {
    expect(Object.keys(phrases('pt')).sort()).toEqual(Object.keys(phrases('en')).sort());
  });

  it('speaks durations in Portuguese', () => {
    expect(spokenDuration(40, 'pt')).toBe('40 segundos');
    expect(spokenDuration(60, 'pt')).toBe('um minuto');
    expect(spokenDuration(3600, 'pt')).toBe('uma hora');
    expect(spokenDuration(3900, 'pt')).toBe('uma hora e 5 minutos');
  });
});

describe('pt-BR yes/no for voice approvals', () => {
  it.each(['sim', 'pode ir', 'claro', 'pode fazer'])('reads "%s" as yes', (text) => {
    expect(parseYesNo(text)).toBe('yes');
  });

  it.each(['não', 'nao faça', 'pare', 'de jeito nenhum'])('reads "%s" as no', (text) => {
    expect(parseYesNo(text)).toBe('no');
  });
});

describe('pt-BR fast path', () => {
  it('stops speaking on "pare"', () => {
    expect(matchFastIntent('Jarvis, pare')).toEqual({ kind: 'stop-speaking' });
  });

  it('cancels everything on "cancela tudo"', () => {
    expect(matchFastIntent('cancela tudo')).toEqual({ kind: 'cancel-all' });
  });

  it('ends dictation on "para de ditar"', () => {
    expect(matchFastIntent('para de ditar')).toEqual({ kind: 'dictate-stop' });
  });

  it('answers "bom dia" with the morning briefing', () => {
    expect(matchFastIntent('bom dia')).toEqual({ kind: 'briefing' });
  });

  it('switches to private mode on "tudo local"', () => {
    expect(matchFastIntent('tudo local')).toEqual({ kind: 'private-mode', on: true });
  });
});

describe('pt-BR wake word', () => {
  it('accepts "Djarvis" and splits off the request', () => {
    expect(matchWakeUtterance('Djarvis, que horas?')).toEqual({ matched: true, rest: 'que horas?' });
  });

  it('accepts a Portuguese greeting before the wake word', () => {
    expect(matchWakeUtterance('oi jarvis, que horas?')).toEqual({ matched: true, rest: 'que horas?' });
  });

  it('ignores speech that does not start with the wake word', () => {
    expect(matchWakeUtterance('que horas são').matched).toBe(false);
  });
});
