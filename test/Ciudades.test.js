const { expect } = require("chai");
//const { ethers } = require("hardhat");

describe("cityData Contract", function () {
    it("Cualquiera puede consultar", async function () {
        const [owner, someDudeOne, someDudeTwo] = await ethers.getSigners();
        console.log(owner.address)
        console.log(someDudeOne.address)
        const CityData = await ethers.getContractFactory("cityData");
        const cityData = await CityData.deploy();
        await cityData.deployed();
        console.log('cityData deployed at:'+ cityData.address)

        let data = {
            "pais": "Francia",
            "ciudad_nombre": "Lyon",
            "ciudad_poblacion": 3000000,
            "ciudad_gentilico": "Lyones",
            "ciudad_tamano": 100
        }

        await cityData.connect(owner).REGISTRAR(data.pais, 
                                                data.ciudad_nombre, 
                                                data.ciudad_poblacion, 
                                                data.ciudad_gentilico, 
                                                data.ciudad_tamano);
        
        data = {
            "pais": "Espana",
            "ciudad_nombre": "Vigo",
            "ciudad_poblacion": 2000000,
            "ciudad_gentilico": "Viguense",
            "ciudad_tamano": 85
        }

        await cityData.connect(owner).REGISTRAR(data.pais, 
                                                data.ciudad_nombre, 
                                                data.ciudad_poblacion, 
                                                data.ciudad_gentilico, 
                                                data.ciudad_tamano);

        let result = await cityData.connect(someDudeOne).CONSULTAR("Francia");
        console.log("consulta de someDudeOne");
        console.log(result);

        result = await cityData.connect(someDudeTwo).CONSULTAR("Espana");
        console.log("consulta de someDudeTwo");
        console.log(result);
    });

  it("Solo el owner puede registrar una ciudad", async function () {
    const [owner, someDudeOne, someDudeTwo] = await ethers.getSigners();    
    const CityData = await ethers.getContractFactory("cityData");
    const cityData = await CityData.deploy();
    await cityData.deployed();
    console.log('cityData deployed at:'+ cityData.address)

    let data = {
        "pais": "Venezuela",
        "ciudad_nombre": "Caracas",
        "ciudad_poblacion": 5000000,
        "ciudad_gentilico": "Caraqueno",
        "ciudad_tamano": 70
    }

    await cityData.connect(owner).REGISTRAR(data.pais, 
                                            data.ciudad_nombre, 
                                            data.ciudad_poblacion, 
                                            data.ciudad_gentilico, 
                                            data.ciudad_tamano);

    let dataTwo = {
        "pais": "Mexico",
        "ciudad_nombre": "MexicoDF",
        "ciudad_poblacion": 9000000,
        "ciudad_gentilico": "Mexicano",
        "ciudad_tamano": 200
    }
    console.log("HASTA ACA TODO BIEN");
    await expect(cityData.connect(someDudeTwo).REGISTRAR(dataTwo.pais, dataTwo.ciudad_nombre, dataTwo.ciudad_poblacion, dataTwo.ciudad_gentilico, dataTwo.ciudad_tamano,)).to.be.revertedWith("Ownable: caller is not the owner");

  });
  
});