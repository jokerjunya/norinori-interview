import { AIProvider } from './types';
import { LocalLLMProvider } from './local-llm-provider';

export function getAIProvider(): AIProvider {
  // MVPではローカルLLMを使用
  return new LocalLLMProvider('http://127.0.0.1:1234');
}

// 便利な再エクスポート
export * from './types';
export { LocalLLMProvider } from './local-llm-provider';

