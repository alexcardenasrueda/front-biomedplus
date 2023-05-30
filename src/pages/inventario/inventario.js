import Menu from '../../components/menu/menu';
import Equipos from './equipos';
import Repuestos from './repuestos';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';


function Inventario() {
    return (
        <div class="container">
            <div>
                Modulo Iventario
                <Tabs>
                    <TabList>
                        <Tab>Equipos</Tab>
                        <Tab>Repuestos</Tab>
                    </TabList>

                    <TabPanel>
                        <Equipos />
                    </TabPanel>
                    <TabPanel>
                        <Repuestos />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}
export default Inventario;