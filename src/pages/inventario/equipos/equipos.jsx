import './equipos.css';
import { Component, useEffect, useState } from "react";
import { EquipmentService } from '../../../services/equiposAxiosService'
import { render } from '@testing-library/react';


class Equipments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equipments: []
        }
    }


    componentDidMount() {
        EquipmentService.getEquipments().then((res) => {
            this.setState({ equipment: res.data })
        });
    }

    render() {
        return (
            <div class="container">
                <h2 className="text-center">Modulo equipos</h2>
                <div class="container-button">
                    <button type="button" class="btn btn-info">Agregar equipo</button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Servicio</th>
                            <th scope="col">Area</th>
                            <th scope="col">Item</th>
                            <th scope="col">Serie</th>
                            <th scope="col">No. Activo</th>
                            <th scope="col">Accesorios</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Tipo de equipo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.equipments.map(
                            equipment =>
                            <tr key={equipment.id}>
                                <td>{equipment.provider.name}</td>
                                <td>{equipment.service}</td>
                                <td>{equipment.area}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.series}</td>
                                <td>{equipment.activeNumber}</td>
                                <td>{equipment.accessories}</td>
                                <td>{equipment.brand}</td>
                                <td>{equipment.model}</td>
                                <td>{equipment.equipmentType}</td>
                                <td>
                                    <div>
                                        <button type="button" class="btn btn-info">Editar</button>
                                    </div>
                                </td>

                                <table class="table table-hover"></table>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
