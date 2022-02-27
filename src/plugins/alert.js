import Swal  from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // @ts-ignore

    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const CONFIRMATION = async (title, text, icon, confirmButtonText) => {
    try {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText

        });
        if (result.value){
            return result.value
        }
    }catch (e) {
        console.log(e)
    }
};

export const MESSAGE =  async (title, text, type,) => {
    await Swal.fire(
        title,
        text,
        type
    )
};

export const newToast = async (icon, title) => {
    await Toast.fire({
        icon: icon,
        title: title
    })
};