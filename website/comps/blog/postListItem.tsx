export default function PostListItem(props:any) {

    const { post } = props

    return (
        <a className="flex flex-col p-6 rounded-xl w-full items-start bg-base-100
            hover:bg-base-200 transition-all duration-200 ease-in-out cursor-pointer
        "
            href={`/blog/${post.slug}`}
        >
            <div className="flex md:flex-row flex-col w-full gap-8 items-center">
                <img src={post.thumbnail} className="rounded-lg md:h-28 w-fit" />
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">{post.title}</h1>
                    <p className="text-sm text-zinc-400 mt-2">{post.description}</p>
                </div>
            </div>
        </a>
    )
}