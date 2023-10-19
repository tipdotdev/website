import PostListItem from "./postListItem";

export default function PostList(props:any) {
    return (
        <div className="flex flex-col justify-center items-center w-full gap-4">

            {props.posts?.length > 0 ?
                props.posts?.map((post:any) => {
                    return (
                        <PostListItem post={post} key={post.id} />
                    )
                })
            :
                <div className="rounded-xl bg-base-200 p-6 w-full items-center">
                    <h1 className="text-4xl font-black">No posts yet 😔</h1>

                    <p className="text-base-content text-opacity-80 mt-4 text-lg">Subscribe below to get updates!</p>
                </div>
            }
            

        </div>
    )
}