import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { cookies } from "next/headers";
import { verifyJWT } from "@/utils/jwt";
// import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
type Props = {
  posts: Post[];
};

export async function MoreStories({ posts }: Props) {
  // const user: string = "default";
  let cookieStore = await cookies();
  let session = cookieStore.get("session")?.value;
  let user;
  if (!session) {
    user = "Anonymous";
  } else {
    let data = await verifyJWT(session);
    user = data.data;
  }

  return (
    <section>
      {/* <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          (!post.priv || post.author.name == user || user == "admin") ?
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              priv={post.priv}
            /> : null
        ))}
      </div>
    </section>
  );
}
