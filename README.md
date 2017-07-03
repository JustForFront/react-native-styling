# react-native-styling
Style helper for react native.

## Install
```
npm install react-native-styling
```
```javascript
import {CreateNestedStyleSheet,GetStyleValueById,GetStyle} from 'react-native-styling';
```

## CreateNestedStyleSheet
Complie nested style tree to react-native style ID.
```javascript
const styles = {
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    Counter:{
        button: {
            backgroundColor: '#ccc',
            color: 'yellow'
        },
        stateTest: {    //nested state style
            default: {
                color: '#333'
            },
            1:{
                color: 'yellow'
            },
            2:{
                color: 'orange'
            },
            3:{
                color: 'red'
            }
        }
    }
};

export const compliedStyle = CreateNestedStyleSheet(styles);
```
## GetStyleValueById
Get original style properties from complid react native style ID.
```javascript
GetStyleValueById(compliedStyle.Counter.stateTest.default); //return {color:'#333'}
```

## GetStyle
Get style array with state.
```javascript
<Component style={GetStyle('weclome',{fontSize:25})}>Welcome</Component>
/*
return [
      50, /*ID of compliedStyle.welcome*/
      {fontSize:25}
];
*/

//OR


<InputComponent style={GetStyle(compliedStyle.Counter.stateTest,{fontSize:15},stateValue)} value={stateValue}/>
/*
return [
      55, /*ID of compliedStyle.Counter.stateTest.defualt*/
      56, /*ID of compliedStyle.Counter.stateTest[1], assume stateValue = 1*/
      {fontSize:15}
];
*/
```