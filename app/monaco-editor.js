import { useEffect } from 'react';
import { MonacoEditorLanguageClientWrapper } from '@/public/monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "@/public/monaco-editor-workers/index.js";
import monarchSyntax from "@/public/syntaxes/c-parser-3.monarch.js";
import { vscode } from '@/public/monaco-editor-wrapper/index.js';
import { defaultCode } from '@/util/defaultCode';

function MonacoEditor() {
  useEffect(() => {
    buildWorkerDefinition('@/public/monaco-editor-workers/workers', new URL('', window.location.href).href, false);
    MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');
    const client = new MonacoEditorLanguageClientWrapper();
    const editorConfig = client.getEditorConfig();
    editorConfig.setMainLanguageId('c-parser-3');
    editorConfig.setMonarchTokensProvider(monarchSyntax);
    editorConfig.setMainCode(defaultCode);
    editorConfig.theme = 'vs-dark';
    editorConfig.useLanguageClient = true;
    editorConfig.useWebSocket = false;

    const workerURL = new URL('@/public/c-parser-3-server-worker.js', import.meta.url);
    const lsWorker = new Worker(workerURL.href, {
      type: 'classic',
      name: 'CParser3 Language Server'
    });
    client.setWorker(lsWorker);

    // Start the editor
    client.startEditor(document.getElementById("monaco-editor-root"));

  }, []);

  return (
    <div id="monaco-editor-root"></div>
  );
}

export default MonacoEditor;
