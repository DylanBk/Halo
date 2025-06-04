export default interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    role: number,
    pfp: string | null,
    following: number[],
    followers: number[],
    mutuals: number[],
    posts: number[],
    comments: number[],
    liked_posts: number[],
    reposted_posts: number[],
    shared_posts: number[],
    saved_posts: number[],
    created_at: string
};