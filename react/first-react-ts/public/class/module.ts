import { connection} from './database/connection';

function acessarSistema(){
    connection({host: '192.168.0.2', user: 'dp_lucas', password: 'mudar123', database: 'dp_lucas'});
}

acessarSistema();