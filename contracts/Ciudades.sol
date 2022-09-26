// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract cityData is Ownable{

    struct Ciudad {
      string nombre;
      uint poblacion;
      string gentilicio;
      uint tamano;
      bool isValue;
   }

   mapping(string => Ciudad) public paises;

    constructor() {

    }

    function REGISTRAR (string memory _pais, string memory _nombre, uint _poblacion, string memory _gentilicio, uint _tamano) 
    public 
    onlyOwner
    {
        require(!paises[_pais].isValue,"Ya fue registrada una ciudad en este pais");        
        paises[_pais] = Ciudad(
                            _nombre,
                            _poblacion,
                            _gentilicio,
                            _tamano,
                            true
                        );
    }

    function CONSULTAR (string memory _pais) 
    public 
    view
    returns(Ciudad memory)
    {
        require(paises[_pais].isValue,"El pais aun no ha sido registrado");
        Ciudad memory data = paises[_pais];
        return data;
    }

}