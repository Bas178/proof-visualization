import { MonacoEditorLanguageClientWrapper } from './monaco-editor-wrapper/index.js';
import { buildWorkerDefinition } from "./monaco-editor-workers/index.js";
import monarchSyntax from "./syntaxes/c-parser-3.monarch.js";
// modify your previous import to bring in the appropriate monaco-vscode-api version
import { vscode } from './monaco-editor-wrapper/index.js';

const defaultCode = `// Enter your C code with Verifast annotations here...

        
struct node {
    int value;
    struct node *next;
};
        
struct stack {
    struct node *head;
    int cnt;
};
        
struct stack *createStack()
    //@ requires true;
    /*@ ensures  malloc_block_stack(result) &*&
                 result->head |-> 0 &*&
                 result->cnt  |-> 0;
    @*/
{
    struct stack *s = malloc(sizeof(struct stack));
    if (s == 0) { abort(); }
    s->head = 0;
    s->cnt = 0;
    
    return s;
}
        
struct node *createNode(int v)
    //@ requires true;
    /*@ ensures  malloc_block_node(result) &*&
                 result->value |-> v &*&
                 result->next  |-> 0;
    @*/
{
    struct node *n = malloc(sizeof(struct node));
    if (n == 0) { abort(); }
    n->value = v;
    n->next = 0;
    
    return n;
}
        
void push(struct stack *s, int v)
    /*@ requires s->head |-> ?h &*&
                 s->cnt |-> ?c &*& c < INT_MAX;
    @*/
    /*@ ensures  s->head |-> ?n &*& s->cnt |-> c+1 &*&
                 n->value |-> v &*& n->next |-> h &*&
                 malloc_block_node(n);
    @*/
{
    struct node *n = createNode(v);
    n->next = s->head;
    s->head = n;
    s->cnt = s->cnt+1;
}
        
int pop(struct stack *s)
    /*@ requires s->head |-> ?he &*&
                 s->cnt |-> ?c &*& c > 0 &*&
                 he->value |-> ?res &*& 
                 he->next |-> ?n &*&
                 malloc_block_node(he);
    @*/
    /*@ ensures  s->head |-> n &*& 
                 s->cnt |-> c-1 &*&
                 result == res;   
    @*/              
{
    struct node *h = s->head;
            
    int res = h->value;
    s->head = h->next;
    s->cnt = s->cnt-1;
    free(h);
           
    return res;
}
        
void dispose(struct stack *s)
    /*@ requires malloc_block_stack(s) &*& 
                 s->head |-> 0  &*&
                 s->cnt |-> 0;
    @*/
    //@ ensures  true;
{
    free(s);
}
        
int main()
    //@ requires true;
    //@ ensures  true;
{
  
    return 0;
}

`;


buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
console.log("defaultCode: ", defaultCode);
editorConfig.setMainLanguageId('c-parser-3');

editorConfig.setMonarchTokensProvider(monarchSyntax);

editorConfig.setMainCode(defaultCode);

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