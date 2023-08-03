export const createVisualization = (expressions) => {
    const links = [];
    const nodes = [];
    expressions.forEach(expr => {

        const node = {
            name: '',
            type: '',
            variables: {}
        };
        const link ={
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
            const receiverRef = expr.vfstatement.lexp.receiver.ref.ref;
            //console.log("receiverRef: ", receiverRef);
            const receiverName = receiverRef.$refText;
            //console.log("receiverName: ", receiverName);
            const receiverType = receiverRef.ref.type?.structRef?.$refText;
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
            console.log("variableName: ", variableName);

            const variableType = componentArrow.ref.tr.structRef?.$refText
            //console.log("variableType: ", variableType);

            // Bestimmen Sie den Typ der Komponente
            const componentType = componentArrow.ref.tr.$type; // "StructTypeRef" || "PredefinedTypeRef"
            //console.log("componentType: ", componentType);



            if (componentType === "PredefinedTypeRef") {

                // Füllen Sie das Knotenobjekt aus
                //console.log("receiverName: ", receiverName);
                node.name = receiverName;
                node.type = receiverType; // Hier können Sie den Typ festlegen, wenn Sie ihn kennen
                // Speichere die Verbindung zu einer primitiven Variable
                node.variables[componentName] = `${variableName}`;
                const nodeIndex = nodes.findIndex(n => n.name === receiverName);
                if (nodeIndex >= 0) {
                    (receiverType !== undefined) ? nodes[nodeIndex].type = receiverType : {};
                    node.variables[componentName] = `${variableName}`;
                } else {
                    // Wenn die Node nicht existiert, erstellen Sie sie und fügen Sie sie hinzu
                    nodes.push(node);
                }


            } else if (componentType === "StructTypeRef") {
                // Speichere die Verbindungen wie bisher zu einer "node or null" Variable
                link.from = `${receiverName}:${(receiverType)?receiverType:componentArrowType}`;
                link.linkName = componentName;
                link.to = `${variableName}:${variableType}`;
                console.log("link: ", link);
                links.push(link);
                /*
                links.push({
                    from: `${receiverName}:${receiverType}`,
                    linkName: componentName,
                    to: `${variableName}:${variableType}`
                });
                */
            }

        } else if (expr.$type === "VeriFastExpression" && expr.vffuncref?.$type === "VeriFastFunctionRef") {
            //console.log("VeriFastFunctionRef: ");

            const receiverName = expr.vffuncref.args[0].loe.expl[0].expl[0].expl[0].expl[0].expl[0].expl[0].expl[0].expl[0].exp[0].exp[0].pexp.ref.ref.ref.name;
            //console.log("receiverName: ", receiverName);
            const receiverType = expr.vffuncref.vfstruct.$refText;
            //console.log("receiverType: ", receiverType);
            //console.log("nodes: ", nodes);

            const nodeIndex = nodes.findIndex(n => n.name === receiverName);
            if (nodeIndex >= 0) {
                nodes[nodeIndex].type = receiverType;
            } else {
                // Wenn die Node nicht existiert, erstellen Sie sie und fügen Sie sie hinzu
                nodes.push({
                    name: receiverName,
                    type: receiverType,
                    variables: {} // Initialisieren Sie 'variables' oder legen Sie es gemäß Ihren Anforderungen fest
                });
            }
        }
    });



    return { links, nodes };
};



function extractExpression(expr) {
    //console.log("extractExpression(expr): ", expr);
    // Falls wir an der Stelle sind, wo wir den Namen der Variable finden können
    if (expr !== undefined && expr.$type === 'VariableReference' && expr.ref && expr.ref.ref && expr.ref.ref.name) {
        console.log("expr !== undefined && expr.$type === 'VariableReference' && expr.ref && expr.ref.ref && expr.ref.ref.name: ", expr.ref.ref.name);
        return expr.ref.ref.name;
    }

    // Falls wir an der Stelle sind, wo wir den konstanten Wert finden können
    if (expr !== undefined && expr.$type === 'ConstantExpression' && expr.c) {
        console.log("expr !== undefined && expr.$type === 'ConstantExpression' && expr.c: ", expr.c);
        return expr.c;
    }

    // Falls wir einen Additiven Ausdruck haben
    if (expr !== undefined && expr.$type === 'AdditiveExpression' && expr.exp && expr.exp.length === 2 && expr.opl && expr.opl.length === 1) {
        console.log("expr !== undefined && expr.$type === 'AdditiveExpression' && expr.exp && expr.opl: ", expr);
        const left = extractExpression(expr.exp[0]);
        const operator = expr.opl[0];
        const right = extractExpression(expr.exp[1]);
        return `${left} ${operator} ${right}`;
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


