'use strict';

exports.handlers = {
  symbolFound(e) {
    const code = e.code;
    let params;
    if (code.type === 'MethodDefinition') {
      params = code.node && code.node.value.params;
    } else if (code.type === 'FunctionDeclaration') {
      params = code.node && code.node.params;
    }
    if (!params) return;
    for (const param of params) {
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
          if (e.comment) e.comment = e.comment.replace(`[options.${namedParamName}]`, `[options.${namedParamName}=${namedParamDefaultValue}]`);
        }
      }
    }
  },
};