export const createVisualization = (expressions) => {
    const links = [];
    const nodes = [];
    const constraints = [];
    expressions.forEach(expr => {

        const node = {
            name: '',
            type: '',
            variables: {},
            isnull: false,
            iscreated: false,
        };
        const link = {
            from: '',
            linkName: '',
            to: ''
        };
        if (
            expr.$type === "VeriFastExpression" &&
            expr.vfstatement?.$type === "VeriFastStatement" &&
            expr.vfstatement.lexp?.$type === "ComponentArrowAccess"
        ) {

            //console.log("VeriFastExpression: ", expr);
            const receiverRef = (expr.vfstatement.lexp.receiver.ref)
                ? expr.vfstatement.lexp.receiver.ref
                : undefined;
            //console.log("receiverRef: ", receiverRef);
            const receiverName = (receiverRef.ref?.$refText)
                ? receiverRef.ref.$refText
                : (receiverRef.r)
                    ? receiverRef.r
                    : undefined;
            //console.log("receiverName: ", receiverName);
            const receiverType = (receiverRef.ref?.ref?.type?.structRef?.$refText)
                ? receiverRef.ref.ref.type?.structRef?.$refText
                : undefined;
            //console.log("receiverType: ", receiverType);

            const componentArrow = expr.vfstatement.lexp.compArrow;
            //console.log("componentArrow: ", componentArrow);
            const componentArrowType = componentArrow.ref.tr.structRef?.ref.name;
            //console.log("componentArrowType: ", componentArrowType);
            const componentName = componentArrow.$refText;
            //console.log("componentName: ", componentName);


            //const rightExpression = extractExpression(expr.vfstatement.rexp);
            //console.log('Right Expression:', rightExpression); // "c + 1"
            //console.log("expr.vfstatement: ", expr.vfstatement);
            const variableName = (expr.vfstatement.vdecl) ? expr.vfstatement.vdecl.name : (expr.vfstatement.rexp) ? extractExpression(expr.vfstatement.rexp) : null;
            //console.log("variableName: ", variableName);

            const variableType = componentArrow.ref.tr.structRef?.$refText
            //console.log("variableType: ", variableType);

            // Bestimmen Sie den Typ der Komponente
            const componentType = componentArrow.ref.tr.$type; // "StructTypeRef" || "PredefinedTypeRef"
            //console.log("componentType: ", componentType);



            if (componentType === "PredefinedTypeRef") {

                // Füllen Sie das Knotenobjekt aus
                //console.log("if componentType: ", componentType);

                node.name = receiverName;
                node.type = receiverType; // Hier können Sie den Typ festlegen, wenn Sie ihn kennen
                // Speichere die Verbindung zu einer primitiven Variable
                node.variables[componentName] = `${variableName}`;
                //console.log("node: ", node);
                //console.log("nodes: ", nodes);
                const nodeIndex = nodes.findIndex(n => n.name === receiverName);
                //console.log("nodeIndex: ", nodeIndex);
                if (nodeIndex >= 0) {
                    (receiverType !== undefined) ? nodes[nodeIndex].type = receiverType : {};
                    nodes[nodeIndex].variables[componentName] = `${variableName}`;
                } else {
                    // Wenn die Node nicht existiert, erstellen Sie sie und fügen Sie sie hinzu
                    nodes.push(node);
                }



            } else if (componentType === "StructTypeRef") {
                // Speichere die Verbindungen wie bisher zu einer "node or null" Variable
                //console.log("if componentType: ", componentType);
                link.from = `${receiverName}:${(receiverType) ? receiverType : componentArrowType}`;
                link.linkName = componentName;
                link.to = `${variableName}:${variableType}`;
                //console.log("variableName: ", variableName);
                //console.log("nodes: ", nodes);
                links.push(link);

                const nodeIndex = nodes.findIndex(n => n.name === variableName);
                //console.log("nodeIndex: ", nodeIndex);
                if (nodeIndex >= 0) {
                    (componentArrowType !== undefined) ? nodes[nodeIndex].type = componentArrowType : {};

                } else {
                    //console.log("else componentType: ", componentType);
                    // Wenn die Node nicht existiert, erstellen Sie sie und fügen Sie sie hinzu
                    node.name = variableName;
                    node.type = componentArrowType;
                    node.isnull = true;
                    nodes.push(node);
                }

            }

        } else if (expr.$type === "VeriFastExpression" && expr.vffuncref?.$type === "VeriFastFunctionRef") {
            //console.log("VeriFastFunctionRef: ");
            //console.log("expr.vffuncref: ", expr.vffuncref);
            //console.log("extractExpression(expr): ", extractExpression(expr.vffuncref.args[0].loe));

            //const receiverName2 = expr.vffuncref.args[0].loe.expl[0].expl[0].expl[0].expl[0].expl[0].expl[0].expl[0].expl[0].exp[0].exp[0].pexp.ref.ref.ref.name;
            const receiverName = extractExpression(expr.vffuncref.args[0].loe);
            //console.log("receiverName: ", receiverName);
            const receiverType = expr.vffuncref.vfstruct.$refText;
            //console.log("receiverType: ", receiverType);
            //console.log("nodes: ", nodes);

            const nodeIndex = nodes.findIndex(n => n.name === receiverName);
            if (nodeIndex >= 0) {
                nodes[nodeIndex].type = receiverType;
                nodes[nodeIndex].iscreated = true;
            } else {
                // Wenn die Node nicht existiert, erstellen Sie sie und fügen Sie sie hinzu
                nodes.push({
                    name: receiverName,
                    type: receiverType,
                    iscreated: true,
                    variables: {} // Initialisieren Sie 'variables' oder legen Sie es gemäß Ihren Anforderungen fest
                });
            }
        } else if (expr.$type === "VeriFastExpression" && expr.exp ) {
            //console.log("Constraints: ");
            //console.log("expr: ", expr);
            constraints.push(extractConstraints(expr));
            //console.log("constraints: ", constraints);
            
        }
    });



    return { links, nodes, constraints };
};



function extractExpression(expr) {
    //console.log("extractExpression(expr): ", expr);
    // Falls wir an der Stelle sind, wo wir den Namen der Variable finden können
    if (expr !== undefined && expr.$type === 'VariableReference' && expr.ref && expr.ref.ref && expr.ref.ref.name) {
        //console.log("expr !== undefined && expr.$type === 'VariableReference' && expr.ref && expr.ref.ref && expr.ref.ref.name: ", expr.ref.ref.name);
        return expr.ref.ref.name;
    }

    // Falls wir an der Stelle sind, wo wir den konstanten Wert finden können
    if (expr !== undefined && expr.$type === 'ConstantExpression' && expr.c) {
        //console.log("expr !== undefined && expr.$type === 'ConstantExpression' && expr.c: ", expr.c);
        return expr.c;
    }

    // Falls wir einen Additiven Ausdruck haben
    if (expr !== undefined && expr.$type === 'AdditiveExpression' && expr.exp && expr.exp.length === 2 && expr.opl && expr.opl.length === 1) {
        //console.log("expr !== undefined && expr.$type === 'AdditiveExpression' && expr.exp && expr.opl: ", expr);
        const left = extractExpression(expr.exp[0]);
        const operator = expr.opl[0];
        const right = extractExpression(expr.exp[1]);
        return `${left} ${operator} ${right}`;
    }
    // Falls wir einen Additiven Ausdruck haben
    if (expr !== undefined && expr.$type === 'VariableReference' && expr.r) {
        //console.log("expr !== undefined && expr.$type === 'VariableReference': ", expr.r);
        return expr.r;
    }

    // Hier fügen Sie weitere Bedingungen hinzu, um andere Ausdruckstypen zu behandeln

    // Als letzte Ressource, versuchen wir, rekursiv in alle Objekte und Arrays zu schauen
    for (const key in expr) {
        if (typeof expr[key] === 'object' && expr[key] !== undefined) {
            //console.log("extractExpression(expr[key]): ", expr[key], " key: ", key);
            const result = extractExpression(expr[key]);
            if (result) return result;
        }
    }

    // Falls nichts gefunden wurde
    return null;
}

function extractConstraints(expr) {
    //console.log("extractConstraints(expr): ", expr);
    

    // Falls wir einen Constraints Ausdruck haben
    if (expr !== undefined && expr.exp && expr.exp.length === 2 && expr.opl && expr.opl.length === 1) {
        //console.log("expr !== undefined && expr.exp && expr.exp.length === 2 && expr.opl && expr.opl.length === 1: ", expr);
        const left = extractConstraints(expr.exp[0]);
        const operator = expr.opl[0];
        const right = extractConstraints(expr.exp[1]);
        return `${left} ${operator} ${right}`;
    }
    if (expr !== undefined && expr.expl && expr.expl.length === 2 && expr.opl && expr.opl.length === 1) {
        //console.log("expr !== undefined && expr.expl && expr.expl.length === 2 && expr.opl && expr.opl.length === 1: ", expr);
        const left = extractConstraints(expr.expl[0]);
        const operator = expr.opl[0];
        const right = extractConstraints(expr.expl[1]);
        return `${left} ${operator} ${right}`;
    }
// Durchsuche die exp
    if (expr !== undefined && expr.exp && Array.isArray(expr.exp)) {
        //console.log("expr !== undefined && expr.exp: ", expr);
        return extractConstraints(expr.exp[0]);  
    }
    if (expr !== undefined && expr.loe ) {
        //console.log("expr !== undefined && expr.exp: ", expr);
        return extractConstraints(expr.loe);
    }
    if (expr !== undefined && expr.expl ) {
        //console.log("expr !== undefined && expr.exp: ", expr);
        return extractConstraints(expr.expl[0]);
    }
    if (expr !== undefined && expr.exp ) {
        //console.log("expr !== undefined && expr.exp: ", expr);
        return extractConstraints(expr.exp);  
    }
    if (expr !== undefined && expr.$type === 'ConstantExpression' && expr.max ) {
        //console.log("expr !== undefined && expr.max: ", expr);
        return expr.max;  
    }
    if (expr !== undefined && expr.$type === 'VariableDeclaration' && expr.name ) {
        //console.log("expr !== undefined && expr.$type === 'VariableDeclaration' && expr.name: ", expr);
        return expr.name;  
    }
    // Falls wir an der Stelle sind, wo wir den konstanten Wert finden können
    if (expr !== undefined && expr.$type === 'ConstantExpression' && expr.c) {
        //console.log("expr !== undefined && expr.$type === 'ConstantExpression' && expr.c: ", expr.c);
        return expr.c;
    }
   
    //console.log("extractConstraints() no match: ", expr);
    // Hier fügen Sie weitere Bedingungen hinzu, um andere Ausdruckstypen zu behandeln

    // Als letzte Ressource, versuchen wir, rekursiv in alle Objekte und Arrays zu schauen
    for (const key in expr) {
        //console.log("expr[key]: ", expr[key], " typeof: ", typeof expr[key])
        if (typeof expr[key] === 'object' && expr[key] !== undefined) {
            //console.log("extractConstraints(expr[key]): ", expr[key], " key: ", key);
            const result = extractConstraints(expr[key]);
            if (result) return result;
        }
        
        
    }

    // Falls nichts gefunden wurde
    return null;
}
