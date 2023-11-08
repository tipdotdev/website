export default function ErrorModal(props:any) {
    return (
        <dialog id="error_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <h3 className="font-bold text-2xl">Something went wrong.</h3>
                <p className="text-sm text-zinc-400 mt-2">{props.error.message}</p>

                <a className="btn btn-primary w-full mt-10" href={props.buttonHref}>{props.buttonText}</a>

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}