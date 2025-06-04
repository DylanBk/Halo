export default interface Post {
    author: string,
    content: string,
    created_at: string,
    reposts: number,
    likes: number,
    saves: number,
    shares: number,
    tags: string[]
};