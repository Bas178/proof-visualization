import { MonacoEditorLanguageClientWrapper } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/c-parser-3.monarch.js";
// modify your previous import to bring in the appropriate monaco-vscode-api version
import { vscode } from './monaco-editor-wrapper/index.js';

buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('c-parser-3');

editorConfig.setMonarchTokensProvider(monarchSyntax);

editorConfig.setMainCode(`// c-parser3 is running in the web!`);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const workerURL = new URL('./c-parser-3-server-worker.js', import.meta.url);
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'CParser3 Language Server'
});
client.setWorker(lsWorker);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
const startingPromise = client.startEditor(document.getElementById("monaco-editor-root"));

const generateAndDisplay = (async () => {
    console.info('generating & running current code...');
    const value = client.editor.getValue();
    // parse & generate commands for drawing an image
    // execute custom LSP command, and receive the response
    const ast = await vscode.commands.executeCommand('parseAndGenerate', value);
    updateAST(ast);
});

// Updates the parser3 
window.generateAndDisplay = generateAndDisplay;

// Takes generated AST, and process it
function updateAST(ast) {
    // print the commands out, so we can verify what we have received.
    // TODO, will change in th next section...
    console.log("AST: ",ast);
    window.parent.postMessage(ast, '*');
}