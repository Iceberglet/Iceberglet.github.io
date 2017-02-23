export const camelToDash = (str)=>str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z])/g, '$1-$2').toLowerCase();
