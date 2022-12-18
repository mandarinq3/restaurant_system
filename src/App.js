import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import Main from './components/Main/Main';
import LoadingFullScreen from './components/Loading/LoadingFullScreen';
import InformationModal from './components/InformationModal/InformationModal';
import { useEffect, useState} from 'react';
import { collection, doc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore";
import {db} from './firebase_config';
import { monthNames } from './constants';
import { observer } from 'mobx-react-lite';
import Header from './components/Header/Header';




function App() {

  const date = new Date();
  const monthDocumentId = monthNames[date.getMonth()] + date.getFullYear();
  const dayCollectionId = date.getDate();

  const [showLoading, setShowLoading] = useState(true);

  const docRefs = ['tables','archive'];
  
  const checkIfCurrentMonthExist = async ()=>{
    const snapshot = await getDocs(collection(db, "tables"));
    snapshot.forEach(async (document) => {
      return document.id !== 'empty' && document.id === monthDocumentId ? true : false;
    });
  }

  const checkIfCurrentDayExist = async () => {
    const snapshot = await getDocs(collection(db, `tables/${monthDocumentId}/${dayCollectionId}`));
    return !snapshot.empty;
  }


  const addTable = (change) => {
    const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
    source === "Server" && !change.doc.data().hasOwnProperty('empty') && store.addTableHandler(change.doc.data().table);
  }
    
  const setMonthDocToServer = async (docName) => {
    const ref = collection(db, docName);
    await setDoc(doc(ref, `${monthDocumentId}`),{ empty: 'empty'});
  }

  const setDayDocToServer = async (docName) => {
    await setDoc(doc(db, `${docName}/${monthDocumentId}/${dayCollectionId}` ,'empty'),{ empty: 'empty'});
  }

// ============================creates new current year-month-day document in server
  useEffect(()=>{
    checkIfCurrentMonthExist()
      .then( async(isMonthExist)=>{
        if(!isMonthExist){
          docRefs.forEach((docName)=>{
            setMonthDocToServer(docName);
          })
        } 
        return checkIfCurrentDayExist();
      })
      .then( async(isDayExist)=>{
        if(!isDayExist){
          docRefs.forEach((docName)=>{
            setDayDocToServer(docName);
          })
        }
      })
      .then(()=>{
        store.monthDocumentIdHandler(monthDocumentId);
        store.dayCollectionIdHandler(dayCollectionId);
      })
  },[])//USEEFFECT 

//==============================listen for new orders coming from server
  useEffect(()=>{
    if(store.monthDocumentId && store.dayCollectionId){
      const queryOrders = query(
        collection(db, `tables/${store.monthDocumentId}/${store.dayCollectionId}`)
      );
      const unsubscribe = onSnapshot(queryOrders, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          setShowLoading(false);
          if(change.type === 'added'){
            addTable(change);
          }
        })           
      })  
        return ()=>{unsubscribe()}
    }    
  },[store.monthDocumentId,store.dayCollectionId]);//USEEFFECT 

//==============================listen for stop list item changes
  useEffect(()=>{
    const queryStoppedItems = query( collection(db, `stopList`) );
    const unsubscribe = onSnapshot(queryStoppedItems, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        change.doc.id!=='empty' && store.changeFoodIsAvailableProperty({
          type:change.type,
          name:change.doc.data().name
        });
      })           
    })  
      return ()=>{unsubscribe()}
  },[]);//USEEFFECT 

  return (
    <div className="App">
      <Header/>
      <Main/>
      <LoadingFullScreen show={showLoading}/>
    </div>
  );
}

export default observer(App);