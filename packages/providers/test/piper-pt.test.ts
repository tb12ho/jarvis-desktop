import { describe, expect, it } from 'vitest';
import { DEFAULT_VOICES, lang } from '../src/tts/defaults.js';
import { PIPER_VOICES } from '../src/tts/piper.js';

describe('pt-BR voices', () => {
  it('maps Portuguese locales to the pt voice language', () => {
    expect(lang('pt-BR')).toBe('pt');
    expect(lang('pt')).toBe('pt');
    expect(lang('it-IT')).toBe('it');
    expect(lang('en-GB')).toBe('en');
  });

  it('defaults Piper to the pt_BR voice for Portuguese', () => {
    expect(DEFAULT_VOICES.piper.pt).toBe('pt_BR-faber-medium');
  });

  it('pins the pt_BR Piper voice with SHA-256 hashes for model and config', () => {
    const voice = PIPER_VOICES['pt_BR-faber-medium'];
    expect(voice?.locale).toBe('pt');
    expect(voice?.model.sha256).toBe('858555e3a064209c57088fe6bd70c4c3dc54d03eaa00c45d5ecaf43a33f95aa7');
    expect(voice?.config.sha256).toBe('7e694de195ae3fc36dd732c445eb04fb49b649854893cb5506b978f0d50a1d6f');
    expect(voice?.model.url).toContain('/pt/pt_BR/faber/medium/');
  });
});
