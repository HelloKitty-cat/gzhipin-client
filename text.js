let obj = {
  username:'xxxx',
  password:12344
};

let obj2 = Object.keys(obj);

obj2.forEach(key =>{
  console.log(key);
  // console.log(obj[key]);
});


console.log(obj2);   //[ 'username', 'password' ]

