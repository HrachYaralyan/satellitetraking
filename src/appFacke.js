import React, { useEffect, useState } from "react";
import { Viewer, Entity } from "resium";
import { Cartesian3 ,Color  } from "cesium";


const proxyUrl = 'http://localhost:8080'; 

function App() {
    const [longANDlat , setongANDlat] =useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${proxyUrl}/https://api.n2yo.com/rest/v1/satellite/above/91.702/-40.014/0/70/18/&apiKey=PHYRDT-U9G4PG-5LS74C-5269`,
            {
              headers: {
                "X-Requested-With": "XMLHttpRequest"
              }
            }
          );
          const data = await response.json();
          console.log(data.above , "<<<---- my daya");
          setongANDlat(data.above)
        } catch (error) {
          console.log(error , "<<<---- my eerrror");
        }
      };
      
      fetchData();
      const intervalId = setInterval(fetchData, 10000); 

      return () => {
        clearInterval(intervalId); 
      };
    }, []);


    let satArr = longANDlat && longANDlat.map((item)=>{
      return Cartesian3.fromDegrees(item.satlng,item.satlat )

    })
      
  const pointGraphics = { pixelSize: 10, color: Color.YELLOW };
  return (
    <Viewer full>

      {
        satArr && satArr.map((item , index)=>{
          return <Entity key={index} position={item} point={pointGraphics} onClick={()=>{alert(`${longANDlat[index].satname} --- SatName` + " " + `${longANDlat[index].satid} --- Satid`)}} />
        })
      }
    </Viewer>
  );
}
export default App;





























// import React, { useEffect, useState } from "react";
// import { Viewer, Entity } from "resium";
// import { Cartesian3 } from "cesium";


// const proxyUrl = 'http://localhost:8080'; 

// function App() {
//     const [longANDlat , setongANDlat] =useState([{lat:"" , long:"" ,lat1:"" , long1:"" , }])
//     const [getNewPosition , setGetNewPosition] = useState(true)




//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(
//             `${proxyUrl}/https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=PHYRDT-U9G4PG-5LS74C-5269`,
//             {
//               headers: {
//                 "X-Requested-With": "XMLHttpRequest"
//               }
//             }
//           );
//           const data = await response.json();
//           console.log(data , "<<<---- my daya");
//           console.log(data.above[0].satlat , "<---- 0 satlat");
//           console.log(data.above[0].satlng , "<---- 0 satlng");
//             console.log("_________________");
//           console.log(data.above[1].satlat , "<---- 1 satlat");
//           console.log(data.above[1].satlng , "<---- 1 satlng");
//           setongANDlat({lat:data.above[0].satlat,long:data.above[0].satlng })
//           setongANDlat({lat1:data.above[1].satlat,long1:data.above[1].satlng })

//         } catch (error) {
//           console.log(error , "<<<---- my eerrror");
//         }
//       };
    
//       fetchData();

//       const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 seconds

//       return () => {
//         clearInterval(intervalId); // Clear the interval when the component unmounts
//       };
//     }, []);


//     // setInterval(()=>{
//     //   alert("new pos")
//     //   setGetNewPosition(!getNewPosition)
//     // },10000)

    
//     const position2 = Cartesian3.fromDegrees( longANDlat.lat1?longANDlat.lat1 :-74.0707383,
//       longANDlat.long1? longANDlat.long1 :  40.7117244, 100);
      
//       // const position = Cartesian3.fromDegrees( longANDlat.lat?longANDlat.lat :-74.0707383,
//       //                                          longANDlat.long? longANDlat.long :  40.7117244, 100);
//   // const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
//   const pointGraphics = { pixelSize: 10 };
//   return (
//     <Viewer full>
//       <Entity position={position2} point={pointGraphics} onClick={()=>{alert("yes 1")}} />
//       {/* <Entity position={position} point={pointGraphics} onClick={()=>{alert("yes 0")}} /> */}

//     </Viewer>
//   );
// }

// export default App;





// import React from "react";
// import { Viewer } from "resium";

// function App() {
//   return <Viewer />;
// }

// export default App;





// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
