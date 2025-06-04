import { useEffect, useState } from "react";
import PostType from '../../types/post';
import Post from "./Post";

const Feed = () => {
    const [posts, setPosts] = useState<PostType[] | null>(null);

    // example posts
    // const posts = [
    //     {
    //         author: "Cortana",
    //         content: "Remember, knowledge is power. Stay curious, Spartans!",
    //         created_at: "2025-06-01T10:15:00Z",
    //         reposts: 2,
    //         likes: 34,
    //         saves: 5,
    //         shares: 3,
    //         tags: ["motivation", "ai", "halo"]
    //     },
    //     {
    //         author: "Master Chief",
    //         content: "I need a weapon.",
    //         created_at: "2025-06-01T09:00:00Z",
    //         reposts: 10,
    //         likes: 120,
    //         saves: 20,
    //         shares: 15,
    //         tags: ["quote", "chief", "halo"]
    //     },
    //     {
    //         author: "Arbiter",
    //         content: "A new journey begins. Honor guides us.",
    //         created_at: "2025-06-01T08:30:00Z",
    //         reposts: 5,
    //         likes: 60,
    //         saves: 8,
    //         shares: 6,
    //         tags: ["journey", "covenant", "halo"]
    //     },
    //     {
    //         author: "Dr. Halsey",
    //         content: "Innovation is born from necessity.",
    //         created_at: "2025-05-31T21:45:00Z",
    //         reposts: 3,
    //         likes: 42,
    //         saves: 12,
    //         shares: 4,
    //         tags: ["science", "innovation", "halo"]
    //     },
    //     {
    //         author: "UNSC News",
    //         content: "New update: Forge mode now live! Build your own maps.",
    //         created_at: "2025-05-31T20:00:00Z",
    //         reposts: 12,
    //         likes: 98,
    //         saves: 25,
    //         shares: 18,
    //         tags: ["update", "forge", "news"]
    //     },
    //     {
    //         author: "Grunt",
    //         content: "Why do I always get the short end of the plasma stick?",
    //         created_at: "2025-05-31T19:10:00Z",
    //         reposts: 1,
    //         likes: 27,
    //         saves: 2,
    //         shares: 1,
    //         tags: ["funny", "grunt", "halo"]
    //     },
    //     {
    //         author: "Spartan Locke",
    //         content: "Teamwork makes the dream work.",
    //         created_at: "2025-05-31T18:00:00Z",
    //         reposts: 4,
    //         likes: 55,
    //         saves: 10,
    //         shares: 7,
    //         tags: ["teamwork", "spartan", "halo"]
    //     },
    //     {
    //         author: "343 Guilty Spark",
    //         content: "Protocol dictates action. Shall we begin?",
    //         created_at: "2025-05-31T17:30:00Z",
    //         reposts: 2,
    //         likes: 38,
    //         saves: 6,
    //         shares: 3,
    //         tags: ["protocol", "forerunner", "halo"]
    //     },
    //     {
    //         author: "Blue Team",
    //         content: "Mission accomplished. Returning to base.",
    //         created_at: "2025-05-31T16:45:00Z",
    //         reposts: 6,
    //         likes: 70,
    //         saves: 14,
    //         shares: 9,
    //         tags: ["mission", "blue team", "halo"]
    //     },
    //     {
    //         author: "ODST",
    //         content: "Feet first into hell.",
    //         created_at: "2025-05-31T15:00:00Z",
    //         reposts: 8,
    //         likes: 88,
    //         saves: 19,
    //         shares: 11,
    //         tags: ["odst", "quote", "halo"]
    //     }
    // ];

    const getPosts = async () => {
        try {
            const req = await fetch('/api/post/feed', {
                method: 'GET'
            });
            const res = await req.json();

            console.log(req, res)

            setPosts(res);
        } catch (e) {
            console.error(`Error getting posts: ${e}`);
        };
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="w-11/12 sm:w-3/4 lg:w-1/2 flex flex-col gap-4 items-center">
            {posts ? (
                posts.map((p, i) => (
                    <Post
                        key={i}
                        author={p.author}
                        content={p.content}
                        created_at={p.created_at}
                        reposts={p.reposts}
                        likes={p.likes}
                        saves={p.saves}
                        shares={p.shares}
                        tags={p.tags}
                    />
                ))
            ) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center">
                    <h2 className="text-4xl text-snow">Looks like there's nothing here yet...</h2>
                    <p className="text-smoke">Be the first to post!</p>
                </div>
            )}
        </div>
    );
};

export default Feed;