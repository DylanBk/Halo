export default interface Post {
    id: number,
    uid: number,
    tags: string[],
    content: string,
    likes: number,
    reposts: number,
    shares: number,
    saves: number,
    comments: number[],
    created_at: string,
};