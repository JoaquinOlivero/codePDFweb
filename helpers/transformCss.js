function transformRules(self, rules, result) {
    rules.forEach(function (rule) {
        const obj = {};
        if (rule.type === 'rule') {
            rule.declarations.forEach(function (declaration) {
                if (declaration.type === 'declaration') {
                    const cleanValue = declaration.value.replace(/'/g, '') // remove extra apostrophes from value
                    const cleanProperty = cleanPropertyName(declaration.property);
                    obj[cleanProperty] = cleanValue;
                }
            });
            rule.selectors.forEach(function (selector) {
                const name = nameGenerator(selector.trim());

                // if selector is a class transform it into special syntax for react-pdf-html's stylesheet -> ['.class']
                if (selector.includes('.')) {
                    const className = `.${name}`
                    result[className] = obj;
                } else {
                    result[name] = obj;
                }
            });
        }
    });
}

const cleanPropertyName = function(name) {

    // turn css properties like 'align-items' into 'alignItems'
    name = name.replace(/(-.)/g, function(v) { return v[1].toUpperCase(); })

    return name;
}

const nameGenerator = function (name) {
    // clean up for css selectors
    name = name.replace(/\s\s+/g, ' ');
    name = name.replace(/[^a-zA-Z0-9]/g, '_');
    name = name.replace(/^_+/g, '');
    name = name.replace(/_+$/g, '');
    return name;
};

export function transformCss (parsedCss) {
    const result = {};
    transformRules(this, parsedCss.stylesheet.rules, result);
    return result;
}