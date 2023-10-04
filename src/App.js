// node proxy.js
// new teminal 
// npm start
// `${proxyUrl}/https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=PHYRDT-U9G4PG-5LS74C-5269`,

import React, { useEffect, useState } from "react";
import { Viewer, Entity } from "resium";
import { Cartesian3, Color ,Ion } from "cesium";
import img1 from "./sat1U.png"
import { BillboardGraphics, Resource } from "resium";
import Swal from "sweetalert2";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YzUxNjQ4NS0xMGQ3LTQyNjMtODA2OC1iMGRlMGE1NTQzZjEiLCJpZCI6MTYzNDk3LCJpYXQiOjE2OTMzODQ0NDh9.-Hdx36IP2k9bmSDmQ990Gdlw726S9o6BXX3teivgpnk";


const proxyUrl = 'http://localhost:8080';

function App() {
  const [longANDlat, setongANDlat] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //// https://api.n2yo.com/rest/v1/satellite/above/91.702/-40.014/0/70/18/&apiKey=PHYRDT-U9G4PG-5LS74C-5269
      // "https://api.n2yo.com/rest/v1/satellite/above/91.702/-40.014/0/70/18/&apiKey=PHYRDT-U9G4PG-5LS74C-5269",
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
        setongANDlat(data.above)
      } catch (error) {
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  let satArr = longANDlat && longANDlat.map((item) => {
    let { x, y, z } = Cartesian3.fromDegrees(item.satlng, item.satlat)
    return { x, y, z, id: item.satid }

  })

  // const pointGraphics = { pixelSize: 10, color: Color.YELLOW };

  const pointGraphics1 = { pixelSize: 5, color: Color.YELLOW };


  const showSatDetails = (item) => {
    let filterItemId = longANDlat.filter((satItem) => {
      return satItem.satid == item.id
    });
    Swal.fire(`Name: ${filterItemId[0].satname} 
               \n lat:${filterItemId[0].satlat}
              \n long:${filterItemId[0].satlng}`)
  }




  return (
    <Viewer full>

      {
        satArr && satArr.map((item) => {
          return <Entity key={item.id} position={item} point={pointGraphics1} onClick={() => showSatDetails(item)} >
            <BillboardGraphics
              image={img1}
              width={32}
              height={32} />
          </Entity>
        })
      }


    </Viewer>
  );
}

export default App;


// intDesignator: "1965-016F"
// launchDate: "1965-03-09"
// satalt: 867.4462
// satid: 1293
// satlat: 48.3841
// satlng: -91.0772
// satname: "OSCAR 3"



























