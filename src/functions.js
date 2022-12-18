import { menuCategories } from "./constants";

export const different = (a,b,prop) => {
  let short,long,filtered,main;
  
  if(a[0].hasOwnProperty(prop)){
    short = a.length < b.length ? a.map(obj=>obj[`${prop}`]) : b.map(obj=>obj[`${prop}`]);
    long =  a.length > b.length ? a.map(obj=>obj[`${prop}`]) : b.map(obj=>obj[`${prop}`]);
    main =  a.length > b.length ? a : b;




    filtered=long.filter((item)=>{
      return !short.includes(item)
    });


    let result = main.filter((item)=>{
      return  filtered.includes(item[`${prop}`])
    })

      return result;
    }else{
      const props = Object.keys(main[0]);
      throw `THE PROP "${prop}" DOES NOT EXIST!!! CHECK THESE PROPS: ${props.join(',')}`;
    }
}

export const printOrders = (orders)=>{
  const printedTime = new Date().toLocaleTimeString();
  orders.forEach((order)=>{
 

  switch (order._category) {
    case menuCategories.SOUPS:
      console.log('=============SOUP===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      
      
      break;

    case menuCategories.SALATS:
      console.log('=============SALAT===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      break;

    case menuCategories.MAIN:
      console.log('=============MAIN===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      break;

    case menuCategories.DESERTS:
      console.log('=============DESERTS===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      break;
    
    case menuCategories.COLD_DRINKS:
      console.log('=============COLD===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      break;

    case menuCategories.HOT_DRINKS:
      console.log('=============HOT===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      break;

    case menuCategories.ALCOHOL:
      console.log('=============ALCOHOL===============');
      console.log('recieved: ',printedTime);
      console.log('name: ',order._name);
      order._comment && console.log('comment: ',order._comment);
      order._takeAway && console.log('TAKE AWAY');
      order._delivery && console.log('DELIVERY');
      break;
}//SWITCH
})//FOR EACH
}//FUNCTION