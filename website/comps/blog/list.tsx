import PostListItem from "./postListItem";

export default function PostList(props:any) {
    return (
        <div className="flex flex-col justify-center items-center w-full gap-4">

            {props.posts?.map((post:any) => (
                <PostListItem post={post} />
            ))}

        </div>
    )
}