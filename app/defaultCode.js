export const defaultCode = 
`// Enter your C code with Verifast annotations here...
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
            
    int result = h->value;
    s->head = h->next;
    s->cnt = s->cnt-1;
    free(h);
           
    return result;
}
        
void dispose(struct stack *s)
    /*@ requires malloc_block_stack(s) &*& 
                 stack_head(s, 0) &*&
                 stack_cnt(s, 0);
    @*/
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
    assert(r3 == 30);
    assert(r2 == 20);
    assert(r1 == 10);
    assert(s->cnt == 0);
            
    dispose(s);
    return 0;
}
`;        