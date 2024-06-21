function relate(me) {
    const relations = {};

    function bfs() {
        const queue = [{ node: me, relation: '', generation: 0 }];
        const visited = new Set();
        visited.add(me);

        while (queue.length > 0) {
            const { node, relation, generation } = queue.shift();
            
            // Add the current node's relation to the relations object if it exists
            if (node !== me) {
                relations[node.name] = relation;
            }

            // Add children to the queue
            if (node.children) {
                for (let child of node.children) {
                    if (!visited.has(child)) {
                        visited.add(child);
                        const childRelation = getChildRelation(relation, node.sex, generation);
                        queue.push({ node: child, relation: childRelation, generation: generation + 1 });
                    }
                }
            }

            // Add siblings to the queue
            if (node.siblings) {
                for (let sibling of node.siblings) {
                    if (!visited.has(sibling)) {
                        visited.add(sibling);
                        const siblingRelation = getSiblingRelation(sibling.sex);
                        queue.push({ node: sibling, relation: siblingRelation, generation: generation });
                    }
                }
            }

            // Add parents to the queue
            if (node.parents) {
                for (let parent of node.parents) {
                    if (!visited.has(parent)) {
                        visited.add(parent);
                        const parentRelation = getParentRelation(relation, parent.sex, generation);
                        queue.push({ node: parent, relation: parentRelation, generation: generation - 1 });
                    }
                }
            }
        }
    }

    function getChildRelation(currentRelation, sex, generation) {
        if (!currentRelation) {
            return sex === 'male' ? 'son' : 'daughter';
        }
        return sex === 'male' ? `great-${currentRelation}-son` : `great-${currentRelation}-daughter`;
    }

    function getSiblingRelation(sex) {
        return sex === 'male' ? 'brother' : 'sister';
    }

    function getParentRelation(currentRelation, sex, generation) {
        if (!currentRelation) {
            return sex === 'male' ? 'father' : 'mother';
        }
        return sex === 'male' ? `great-${currentRelation}-father` : `great-${currentRelation}-mother`;
    }

    bfs();
    return relations;
}

// Example family tree node structure
const familyTree = {
    name: "Güyük",
    sex: "male",
    children: [
        { name: "Son1", sex: "male", children: [], siblings: [], parents: [] },
        { name: "Daughter1", sex: "female", children: [], siblings: [], parents: [] }
    ],
    siblings: [
        { name: "Kublai", sex: "male", children: [], siblings: [], parents: [] },
        { name: "Hulagu", sex: "male", children: [], siblings: [], parents: [] }
    ],
    parents: [
        { name: "Ogedei", sex: "male", children: [], siblings: [], parents: [] }
    ]
};

console.log(relate(familyTree)); // Example usage
