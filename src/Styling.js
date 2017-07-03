import { StyleSheet } from 'react-native';

let nodesName = [],styleList = {},styles = {};

export const CreateNestedStyleSheet = (nestedStyles,loop)=>{

    let result = {}, toStyle = {},key,styleObj,styleObjKeys,styleKey,
        styleTree = {};
    for (key in nestedStyles) {
        styleObj = nestedStyles[key];
        styleObjKeys = Object.keys(styleObj);

        if (typeof styleObj[styleObjKeys[0]] === 'object') {

            if(typeof styleObj.transition==="undefined"){

                nodesName.push(key);

                result[key] = CreateNestedStyleSheet(styleObj,true);

                nodesName.pop();

            }else{

                let obj = {...styleObj};

                delete obj.transition;

                toStyle[key] = obj;

                styleTree[key] = styleObj;

            }

        } else {

            toStyle[key] = styleObj;

            styleTree[key] = styleObj;

        }

    }

    toStyle = StyleSheet.create(toStyle);

    for(styleKey in styleTree){

        styleList[toStyle[styleKey]] = styleTree[styleKey];

    }

    const res = {...result,...toStyle};

    if(typeof loop==="undefined"){

        styles = {...styles,...res};

    }

    return res;

};

export const GetStyleValueById = (id)=>{

    return styleList[id]?styleList[id]:{};

};

export const GetStyle = (styleSet,adHoc,state)=>{

    let style = typeof styleSet==="string"?(styles[styleSet]?styles[styleSet]:{}):styleSet;

    if(typeof style!=="number"){

        style = style.default?style.default:style;

    }

    style = state&&styleSet[state]?[
        style,
        styleSet[state]
    ]:[style];

    if(adHoc){

        if(Array.isArray(adHoc)){

            style = [...style,...adHoc];

        }else{

            style.push(adHoc)

        }

    }

    return style;

};