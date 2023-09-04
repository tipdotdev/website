export default function Avatar(props:any) {
    return (
        <div className="avatar w-full">
            <div className="w-full mask mask-circle">
                <img src={props.user.pictures?.avatar}/>
            </div>
        </div>
    )
}