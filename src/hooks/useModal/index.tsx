const useModal = () => {

    const openModal = (modalName:string) => {
        if (typeof window == "undefined") return 

        const modal = document.getElementById(`${modalName}_modal`) as HTMLDialogElement
        modal?.showModal()
    }

    return { openModal } as const
}

export default useModal