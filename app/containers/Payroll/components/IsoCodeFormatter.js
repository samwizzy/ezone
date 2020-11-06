import NigeriaFlag from '../../../images/flag/nigeria.png';
import UsaFlag from '../../../images/flag/usa.png';
import EnglandFlag from '../../../images/flag/great-britain.png';
import CanadaFlag from '../../../images/flag/canada.png';
import SpainFlag from '../../../images/flag/spain.png';
import AngolaFlag from '../../../images/flag/angola.png';
import JapanFlag from '../../../images/flag/japan.png';

export function IsoCodeToFlag(isoCode) {
    switch (isoCode) {
        case 'NGN':
            return NigeriaFlag;
        case 'USD':
            return UsaFlag;
        case 'EUR':
            return SpainFlag;
        case 'CAD':
            return CanadaFlag;
        case 'GBP':
            return EnglandFlag;
        case 'JPY':
            return JapanFlag;
        case 'AOA':
            return AngolaFlag;
    }
}