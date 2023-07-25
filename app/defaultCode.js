export const defaultCode = 
`
// Enter your C code with Verifast annotations here...
#include "stdlib.h"
#include "assert.h"
        
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
    //@ ensures  true;
{
    struct stack *s = malloc(sizeof(struct stack));
    if (s == 0) { abort(); }
    s->head = 0;
    s->cnt = 0;
    
    return s;
}
        
struct node *createNode(int v)
    //@ requires true;
    //@ ensures  true;
{
    struct node *n = malloc(sizeof(struct node));
    if (n == 0) { abort(); }
    n->value = v;
    n->next = 0;
    
    return n;
}
        
void push(struct stack *s, int v)
//@ requires true;
//@ ensures  true;
{
    struct node *n = createNode(v);
    n->next = s->head;
    s->head = n;
    s->cnt = s->cnt+1;
}
        
int pop(struct stack *s)
//@ requires true;
//@ ensures  true;             
{
    struct node *h = s->head;
            
    int result = h->value;
    s->head = h->next;
    s->cnt = s->cnt-1;
    free(h);
           
    return result;
}
        
void dispose(struct stack *s)
    //@ requires true;
    //@ ensures  true;
{
    free(s);
}
        
int main()
    //@ requires true;
    //@ ensures  true;
{
    struct stack *s = createStack();
    push(s, 10);
    assert(s->cnt == 1);
    push(s, 20);
    push(s, 30);
    int r3 = pop(s);
    int r2 = pop(s);
    int r1 = pop(s);
//    assert(r3 == 30);
//    assert(r2 == 20);
//    assert(r1 == 10);
//    assert(s->cnt == 0);
            
//    dispose(s);
//    return 0;
}

`;        