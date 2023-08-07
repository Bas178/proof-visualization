export function formatArgs(args) {
    return args.map(arg => {
        let type = "";

        // Typ-Handling je nachdem, welche Eigenschaft vorhanden ist
        if (arg.type && arg.type.v) {
            // vordefinierte Typen wie 'int'
            type = arg.type.v;
        } else if (arg.type && arg.p && arg.type.structRef && arg.type.structRef.ref) {
            // Strukturtypen wie 'struct stack'
            type = `struct ${arg.type.structRef.ref.name}*`;
        } else if (arg.type && arg.type.structRef && arg.type.structRef.ref) {
            // Strukturtypen wie 'struct stack'
            type = `struct ${arg.type.structRef.ref.name}`;
        }

        // Kombinieren von Typ und Name
        return `${type} ${arg.name}`;
    }).join(', ');
}