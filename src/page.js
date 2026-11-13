import {initializeLanguage} from './i18n.js';
let local=null;try{local=localStorage;}catch{}
initializeLanguage(document,location,local);
