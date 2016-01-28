'use strict';

function getParamNames(code, docletParams) {
  const result = {};
  let docParamId = 0;
  for (let i = 0; i < code.paramnames.length; i++) {
    let param = code.paramnames[i];
    if (param) {
      result[i] = param;
      docParamId = docletParams.findIndex(p => p.name === param) + 1;
    } else {
      while (docParamId < docletParams.length) {
        const docParam = docletParams[docParamId];
        if (docParam && docParam.name && !~docParam.name.indexOf('.')){
          result[i] = docParam.name;
          docParamId++;
          break;
        }
        docParamId++;
      }
    }
  }
  return result;
}

exports.handlers = {
  newDoclet(e) {
    const doclet  = e.doclet;
    if (!doclet.params || !doclet.params.length) return;
    const code = e.doclet.meta.code;
    let codeParams;
    if (code.type === 'MethodDefinition') {
      codeParams = code.node && code.node.value.params;
    } else if (code.type === 'FunctionDeclaration') {
      codeParams = code.node && code.node.params;
    }
    if (!codeParams || (codeParams.length === doclet.params)) return;

    const codeParamNames = getParamNames(code, doclet.params);

    for (let i = 0; i < codeParams.length; i++) {
      const param = codeParams[i];
      const paramName = codeParamNames[i];
      let namedParams;
      if (param.type === 'AssignmentPattern') {
        namedParams = param.left && param.left.properties;
      } else if (param.type === 'ObjectPattern') {
        namedParams = param.properties;
      }
      if (!namedParams) continue;
      for (const namedParam of namedParams) {
        if (namedParam.value.type !== "AssignmentPattern") continue;
        let namedParamName = namedParam.key.name;
        let namedParamDefault = namedParam.value.right;
        if (namedParamDefault && namedParamDefault.type === 'Literal') {
          const namedParamDefaultValue = namedParamDefault.value;
          const namedParamFullName = paramName + '.' + namedParamName;
          const paramDoclet = doclet.params.find( param => param.name === namedParamFullName );
          if (paramDoclet && !paramDoclet.defaultvalue) {
            paramDoclet.defaultvalue = namedParamDefaultValue;
          }
        }
      }
    }
  }
};