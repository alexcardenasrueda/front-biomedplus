import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export function show_alert(mesagge, icon, focus='') {

    onFocus(focus);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mesagge,
        icon: icon
    });
}

function onFocus(focus) {
    if (focus !== '') {
        document.getElementById(focus).focus();
    }
}