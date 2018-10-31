
import {composeWithDevTools} from 'redux-devtools-extension';

const xxxState = 123;

function xxx(preState=xxxState,action) {
  switch (action.type) {
    default :
      return preState;
  }
}
const yyyState = {};
function yyy(preState=yyyState,action) {
  switch (action.type) {
    default :
      return preState;
  }
}

export default composeWithDevTools ({
  xxx,
  yyy
})